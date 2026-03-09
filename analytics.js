// ============================================================
// ANALYTICS ENGINE — Transform responses into actionable insights
// ============================================================

const Analytics = {
  // Parse all responses and extract structured data
  analyzeResponses(responses) {
    const analysis = {
      overview: this.getOverview(responses),
      departmentBreakdown: this.getDepartmentBreakdown(responses),
      painPoints: this.extractPainPoints(responses),
      priorities: this.extractPriorities(responses),
      sentiment: this.analyzeSentiment(responses),
      scaleData: this.aggregateScaleQuestions(responses),
      recommendations: this.generateRecommendations(responses),
      keywords: this.extractKeywords(responses)
    };
    return analysis;
  },

  // Overview metrics
  getOverview(responses) {
    const totalDepts = DEPARTMENTS.length;
    const deptsWithResponses = new Set(responses.map(r => 
      DEPARTMENTS.find(d => r.labels.includes(d.id))?.id
    ).filter(Boolean)).size;

    const avgResponseTime = this.calculateAvgResponseTime(responses);
    const completionRate = (deptsWithResponses / totalDepts) * 100;

    return {
      totalResponses: responses.length,
      departmentsCovered: deptsWithResponses,
      totalDepartments: totalDepts,
      completionRate: completionRate.toFixed(1),
      avgResponseTime,
      lastUpdated: responses.length > 0 ? responses[0].createdAt : null
    };
  },

  calculateAvgResponseTime(responses) {
    if (responses.length === 0) return "N/A";
    const now = new Date();
    const avgDays = responses.reduce((sum, r) => {
      const days = (now - new Date(r.createdAt)) / (1000 * 60 * 60 * 24);
      return sum + days;
    }, 0) / responses.length;
    return avgDays < 1 ? "< 1 day" : `${Math.round(avgDays)} days ago`;
  },

  // Department breakdown
  getDepartmentBreakdown(responses) {
    return DEPARTMENTS.map(dept => {
      const deptResponses = responses.filter(r => r.labels.includes(dept.id));
      return {
        id: dept.id,
        name: dept.name,
        icon: dept.icon,
        color: dept.color,
        responseCount: deptResponses.length,
        respondents: deptResponses.map(r => r.respondent)
      };
    });
  },

  // Extract pain points from textarea responses
  extractPainPoints(responses) {
    const painKeywords = [
      'challenge', 'problem', 'issue', 'difficult', 'pain', 'struggle',
      'bottleneck', 'delay', 'error', 'manual', 'slow', 'inefficient',
      'lack', 'no visibility', 'cannot', 'unable', 'missing', 'confusion'
    ];

    const painPoints = [];
    responses.forEach(response => {
      const text = response.body.toLowerCase();
      
      // Extract sentences containing pain keywords
      const sentences = text.split(/[.!?]+/);
      sentences.forEach(sentence => {
        const hasPainKeyword = painKeywords.some(kw => sentence.includes(kw));
        if (hasPainKeyword && sentence.length > 20 && sentence.length < 300) {
          const dept = DEPARTMENTS.find(d => response.labels.includes(d.id));
          painPoints.push({
            text: sentence.trim(),
            department: dept?.name || 'Unknown',
            respondent: response.respondent,
            severity: this.assessSeverity(sentence)
          });
        }
      });
    });

    // Group and rank by frequency
    const grouped = this.groupSimilarPainPoints(painPoints);
    return grouped.slice(0, 15); // Top 15 pain points
  },

  assessSeverity(text) {
    const highSeverity = ['critical', 'major', 'severe', 'urgent', 'cannot', 'impossible', 'broken'];
    const medSeverity = ['difficult', 'challenge', 'problem', 'slow', 'delay'];
    
    if (highSeverity.some(kw => text.includes(kw))) return 'high';
    if (medSeverity.some(kw => text.includes(kw))) return 'medium';
    return 'low';
  },

  groupSimilarPainPoints(painPoints) {
    // Simple grouping by common keywords
    const groups = {};
    painPoints.forEach(pp => {
      const key = pp.text.substring(0, 50); // Group by first 50 chars
      if (!groups[key]) {
        groups[key] = { ...pp, count: 1, mentions: [pp.respondent] };
      } else {
        groups[key].count++;
        groups[key].mentions.push(pp.respondent);
      }
    });
    return Object.values(groups).sort((a, b) => b.count - a.count);
  },

  // Extract priorities and feature requests
  extractPriorities(responses) {
    const priorityKeywords = [
      'need', 'must', 'require', 'essential', 'critical', 'important',
      'priority', 'urgent', 'should', 'want', 'would like', 'ideal'
    ];

    const priorities = [];
    responses.forEach(response => {
      const text = response.body.toLowerCase();
      const sentences = text.split(/[.!?]+/);
      
      sentences.forEach(sentence => {
        const hasPriorityKeyword = priorityKeywords.some(kw => sentence.includes(kw));
        if (hasPriorityKeyword && sentence.length > 20 && sentence.length < 300) {
          const dept = DEPARTMENTS.find(d => response.labels.includes(d.id));
          priorities.push({
            text: sentence.trim(),
            department: dept?.name || 'Unknown',
            urgency: this.assessUrgency(sentence),
            impact: this.assessImpact(sentence)
          });
        }
      });
    });

    return priorities.slice(0, 20);
  },

  assessUrgency(text) {
    if (text.includes('urgent') || text.includes('critical') || text.includes('must')) return 'high';
    if (text.includes('should') || text.includes('important')) return 'medium';
    return 'low';
  },

  assessImpact(text) {
    const highImpact = ['all', 'entire', 'whole', 'every', 'complete', 'full', 'total'];
    if (highImpact.some(kw => text.includes(kw))) return 'high';
    return 'medium';
  },

  // Sentiment analysis (simple keyword-based)
  analyzeSentiment(responses) {
    const positive = ['good', 'great', 'excellent', 'easy', 'efficient', 'helpful', 'satisfied', 'working well'];
    const negative = ['bad', 'poor', 'difficult', 'hard', 'slow', 'problem', 'issue', 'frustrating', 'confusing'];

    let positiveCount = 0, negativeCount = 0, neutralCount = 0;

    responses.forEach(response => {
      const text = response.body.toLowerCase();
      const posScore = positive.reduce((sum, kw) => sum + (text.match(new RegExp(kw, 'g')) || []).length, 0);
      const negScore = negative.reduce((sum, kw) => sum + (text.match(new RegExp(kw, 'g')) || []).length, 0);

      if (posScore > negScore) positiveCount++;
      else if (negScore > posScore) negativeCount++;
      else neutralCount++;
    });

    const total = responses.length || 1;
    return {
      positive: ((positiveCount / total) * 100).toFixed(1),
      negative: ((negativeCount / total) * 100).toFixed(1),
      neutral: ((neutralCount / total) * 100).toFixed(1),
      overall: positiveCount > negativeCount ? 'Positive' : negativeCount > positiveCount ? 'Negative' : 'Neutral'
    };
  },

  // Aggregate scale question responses
  aggregateScaleQuestions(responses) {
    const scaleData = {};
    
    responses.forEach(response => {
      const dept = DEPARTMENTS.find(d => response.labels.includes(d.id));
      if (!dept) return;

      dept.questions.forEach((q, idx) => {
        if (q.type === 'scale') {
          const qKey = `${dept.id}_q${idx + 1}`;
          if (!scaleData[qKey]) {
            scaleData[qKey] = {
              question: q.label,
              department: dept.name,
              responses: [],
              average: 0
            };
          }

          // Extract rating from response body
          const match = response.body.match(new RegExp(`Q${idx + 1}:.*?\\n([1-5])`, 's'));
          if (match) {
            scaleData[qKey].responses.push(parseInt(match[1]));
          }
        }
      });
    });

    // Calculate averages
    Object.values(scaleData).forEach(data => {
      if (data.responses.length > 0) {
        data.average = (data.responses.reduce((a, b) => a + b, 0) / data.responses.length).toFixed(1);
      }
    });

    return Object.values(scaleData).filter(d => d.responses.length > 0);
  },

  // Extract top keywords
  extractKeywords(responses) {
    const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those', 'i', 'you', 'we', 'they', 'it', 'what', 'which', 'who', 'when', 'where', 'why', 'how']);
    
    const wordCount = {};
    responses.forEach(response => {
      const words = response.body.toLowerCase().match(/\b[a-z]{4,}\b/g) || [];
      words.forEach(word => {
        if (!stopWords.has(word)) {
          wordCount[word] = (wordCount[word] || 0) + 1;
        }
      });
    });

    return Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 30)
      .map(([word, count]) => ({ word, count }));
  },

  // Generate actionable recommendations
  generateRecommendations(responses) {
    const recommendations = [];
    
    // Calculate metrics directly without calling analyzeResponses (to avoid infinite recursion)
    const totalDepts = DEPARTMENTS.length;
    const deptsWithResponses = new Set(responses.map(r => 
      DEPARTMENTS.find(d => r.labels.includes(d.id))?.id
    ).filter(Boolean)).size;
    const completionRate = (deptsWithResponses / totalDepts) * 100;

    // Based on completion rate
    if (completionRate < 50) {
      recommendations.push({
        priority: 'high',
        category: 'Data Collection',
        title: 'Increase Survey Participation',
        description: `Only ${completionRate.toFixed(1)}% of departments have responded. Follow up with non-responding departments to ensure comprehensive input.`,
        action: 'Send reminder emails to departments with no responses'
      });
    }

    // Based on response count
    if (responses.length > 0) {
      recommendations.push({
        priority: 'high',
        category: 'Analysis',
        title: 'Review Survey Insights',
        description: `${responses.length} responses collected. Analyze pain points and priorities to inform system requirements.`,
        action: 'Schedule stakeholder meetings to validate findings'
      });
    }

    // Generic recommendations
    recommendations.push({
      priority: 'medium',
      category: 'Next Steps',
      title: 'Conduct Follow-Up Workshops',
      description: 'Use survey insights to design targeted workshops with each department to validate findings and co-create solutions.',
      action: 'Schedule department-specific design workshops within 2 weeks'
    });

    recommendations.push({
      priority: 'medium',
      category: 'Documentation',
      title: 'Create Requirements Document',
      description: 'Consolidate survey findings into a formal requirements specification document for vendor/developer evaluation.',
      action: 'Draft functional requirements based on pain points and priorities'
    });

    return recommendations;
  }
};
