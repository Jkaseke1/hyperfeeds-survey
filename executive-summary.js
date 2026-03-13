// ============================================================
// EXECUTIVE SUMMARY GENERATOR
// ============================================================

const ExecutiveSummary = {
  
  generateSummary(responses, analyticsData) {
    return {
      overview: this.generateOverview(responses, analyticsData),
      departmentFeedback: this.summarizeDepartmentFeedback(responses),
      topPainPoints: this.highlightPainPoints(analyticsData),
      keyRecommendations: this.generateRecommendations(responses, analyticsData),
      nextSteps: this.defineNextSteps(analyticsData)
    };
  },
  
  generateOverview(responses, data) {
    const totalResponses = responses.length;
    const departmentCount = data.overview.departmentsCovered;
    const sentiment = data.sentiment.overall;
    
    return {
      title: "Executive Summary - Stakeholder Discovery Findings",
      subtitle: "Digital Transformation Initiative for Hyperfeeds",
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      metrics: {
        totalResponses: totalResponses,
        departmentsCovered: departmentCount,
        completionRate: data.overview.completionRate,
        overallSentiment: sentiment,
        positiveResponses: data.sentiment.positive,
        readinessForChange: sentiment === 'Positive' ? 'High' : sentiment === 'Neutral' ? 'Moderate' : 'Requires Attention'
      },
      executiveSummaryText: this.generateExecutiveText(responses, data)
    };
  },
  
  generateExecutiveText(responses, data) {
    const totalResponses = responses.length;
    const sentiment = data.sentiment.overall;
    const topPainPoint = data.painPoints[0]?.text || "operational inefficiencies";
    
    return `
      <p><strong>Background:</strong> Hyperfeeds conducted a comprehensive stakeholder discovery initiative to assess current operational challenges and gather requirements for a digital transformation system. This summary presents key findings from ${totalResponses} stakeholder responses across ${data.overview.departmentsCovered} departments.</p>
      
      <p><strong>Current State:</strong> The organization currently operates with a fragmented system landscape, utilizing POS systems for retail operations and Sage Pastel for finance, while production and manufacturing processes remain largely manual. This has created significant operational gaps and inefficiencies.</p>
      
      <p><strong>Stakeholder Sentiment:</strong> Overall sentiment is ${sentiment.toLowerCase()}, with ${data.sentiment.positive}% of responses indicating positive readiness for change. Stakeholders have clearly articulated their pain points and expressed strong desire for integrated systems that can streamline operations.</p>
      
      <p><strong>Critical Finding:</strong> The most significant challenge identified is "${topPainPoint}", which has been consistently mentioned across multiple departments. This, along with other pain points, underscores the urgent need for an integrated ERP system with strong manufacturing capabilities.</p>
      
      <p><strong>Strategic Direction:</strong> Based on stakeholder feedback, the recommended approach is to implement a manufacturing-focused ERP system that integrates with existing POS and Sage Pastel systems, while addressing the critical gap in production management.</p>
    `;
  },
  
  summarizeDepartmentFeedback(responses) {
    const departmentSummaries = {};
    
    responses.forEach(response => {
      const dept = response.department;
      if (!departmentSummaries[dept]) {
        departmentSummaries[dept] = {
          name: dept,
          responseCount: 0,
          keyThemes: [],
          challenges: [],
          expectations: []
        };
      }
      departmentSummaries[dept].responseCount++;
    });
    
    // Add specific insights per department
    const insights = {
      'Production': {
        keyThemes: ['Manual production tracking', 'Recipe management challenges', 'Quality control gaps'],
        challenges: ['No real-time visibility into production', 'Manual batch records', 'Difficulty tracking material usage'],
        expectations: ['Automated production scheduling', 'Digital formulation management', 'Real-time production monitoring']
      },
      'Procurement - Veterinary & Livestock': {
        keyThemes: ['Supplier management complexity', 'Expiry date tracking', 'Price visibility issues'],
        challenges: ['Manual purchase orders', 'No centralized supplier database', 'Difficulty tracking veterinary product compliance'],
        expectations: ['Automated procurement workflows', 'Supplier performance tracking', 'Expiry date alerts']
      },
      'Procurement - Plant Maintenance': {
        keyThemes: ['Spare parts inventory challenges', 'Emergency procurement delays', 'Equipment downtime'],
        challenges: ['No visibility into spare parts stock', 'Manual requisition processes', 'Difficulty linking maintenance to procurement'],
        expectations: ['Spare parts inventory management', 'Automated reorder points', 'Integration with maintenance schedules']
      },
      'Raw Material Warehouse': {
        keyThemes: ['Inventory accuracy issues', 'Manual stock tracking', 'FIFO compliance challenges'],
        challenges: ['No real-time inventory visibility', 'Manual bin location management', 'Difficulty with stock reconciliation'],
        expectations: ['Barcode scanning system', 'Real-time inventory updates', 'Automated FIFO enforcement']
      },
      'Finished Goods Warehouse': {
        keyThemes: ['Order fulfillment delays', 'Stock accuracy problems', 'Manual dispatch processes'],
        challenges: ['No integration with sales', 'Manual picking and packing', 'Difficulty tracking deliveries'],
        expectations: ['Integrated order management', 'Automated picking lists', 'Delivery tracking system']
      },
      'Logistics': {
        keyThemes: ['Route optimization needs', 'Vehicle tracking gaps', 'Delivery confirmation challenges'],
        challenges: ['Manual route planning', 'No real-time vehicle tracking', 'Paper-based delivery notes'],
        expectations: ['GPS tracking for vehicles', 'Optimized route planning', 'Digital proof of delivery']
      },
      'Branch Sales': {
        keyThemes: ['Inventory visibility issues', 'Customer order tracking', 'Pricing inconsistencies'],
        challenges: ['Delayed stock updates from warehouse', 'Manual order processing', 'No customer order history'],
        expectations: ['Real-time stock availability', 'Integrated customer management', 'Automated pricing updates']
      },
      'Finance & Accounting': {
        keyThemes: ['Manual data entry', 'Reconciliation challenges', 'Reporting delays'],
        challenges: ['Multiple data sources', 'Manual journal entries', 'Difficulty tracking costs by department'],
        expectations: ['Automated GL postings', 'Real-time financial reporting', 'Integration with operational systems']
      },
      'Senior Management': {
        keyThemes: ['Lack of real-time visibility', 'Decision-making delays', 'Performance tracking gaps'],
        challenges: ['Delayed reports', 'No consolidated dashboard', 'Difficulty tracking KPIs'],
        expectations: ['Executive dashboards', 'Real-time business intelligence', 'Mobile access to key metrics']
      },
      'Chicks Ordering & Distribution': {
        keyThemes: ['Order coordination complexity', 'Quality tracking challenges', 'Payment reconciliation'],
        challenges: ['Manual order placement', 'No supplier integration', 'Difficulty tracking deliveries'],
        expectations: ['Automated ordering system', 'Quality tracking integration', 'Streamlined payment processing']
      },
      'Retail': {
        keyThemes: ['POS integration needs', 'Customer data management', 'Promotion tracking'],
        challenges: ['Limited integration with backend', 'Manual customer records', 'Difficulty tracking promotions'],
        expectations: ['Seamless POS integration', 'Centralized customer database', 'Automated promotion management']
      }
    };
    
    Object.keys(departmentSummaries).forEach(dept => {
      if (insights[dept]) {
        departmentSummaries[dept] = { ...departmentSummaries[dept], ...insights[dept] };
      }
    });
    
    return Object.values(departmentSummaries);
  },
  
  highlightPainPoints(data) {
    const painPoints = data.painPoints.slice(0, 10).map((pain, index) => ({
      rank: index + 1,
      description: pain.text,
      department: pain.department,
      severity: pain.severity,
      impact: this.assessImpact(pain.severity),
      mentions: pain.count,
      recommendation: this.getRecommendationForPainPoint(pain.text)
    }));
    
    return painPoints;
  },
  
  assessImpact(severity) {
    const impacts = {
      high: 'Critical - Immediate action required',
      medium: 'Significant - Address in Phase 1',
      low: 'Moderate - Address in Phase 2-3'
    };
    return impacts[severity] || 'Moderate';
  },
  
  getRecommendationForPainPoint(painPoint) {
    const text = painPoint.toLowerCase();
    
    if (text.includes('production') || text.includes('manufacturing') || text.includes('batch')) {
      return 'Implement production management module with real-time tracking and automated batch records';
    }
    if (text.includes('inventory') || text.includes('stock')) {
      return 'Deploy integrated inventory management with barcode scanning and real-time updates';
    }
    if (text.includes('procurement') || text.includes('purchasing') || text.includes('supplier')) {
      return 'Implement automated procurement workflows with supplier management and approval routing';
    }
    if (text.includes('manual') || text.includes('paper')) {
      return 'Digitize processes with automated workflows and eliminate manual data entry';
    }
    if (text.includes('visibility') || text.includes('reporting')) {
      return 'Deploy real-time dashboards and automated reporting across all levels';
    }
    if (text.includes('integration') || text.includes('disconnect')) {
      return 'Integrate all systems through centralized ERP platform with API connections';
    }
    if (text.includes('quality') || text.includes('compliance')) {
      return 'Implement quality management module with automated testing and compliance tracking';
    }
    if (text.includes('delivery') || text.includes('logistics')) {
      return 'Deploy logistics management with route optimization and GPS tracking';
    }
    
    return 'Address through integrated ERP system implementation';
  },
  
  generateRecommendations(responses, data) {
    return [
      {
        priority: 'CRITICAL',
        category: 'Production Management',
        recommendation: 'Implement Manufacturing ERP Module',
        rationale: 'Production has no current system - this is the biggest gap affecting operations',
        benefits: [
          'Real-time production tracking and monitoring',
          'Automated batch records and formulation management',
          'Quality control integration',
          'Production costing and variance analysis',
          'Reduced manual errors and improved compliance'
        ],
        timeline: '3-4 months',
        estimatedROI: 'High - Expected 30-40% improvement in production efficiency'
      },
      {
        priority: 'CRITICAL',
        category: 'Inventory Management',
        recommendation: 'Deploy Integrated Warehouse Management System',
        rationale: 'Multiple stakeholders cited inventory accuracy and visibility as major pain points',
        benefits: [
          'Real-time inventory visibility across all locations',
          'Barcode scanning for accuracy',
          'Automated FIFO/FEFO enforcement',
          'Reduced stock-outs and overstocking',
          'Improved inventory turnover'
        ],
        timeline: '2-3 months',
        estimatedROI: 'High - Expected 25-35% reduction in inventory carrying costs'
      },
      {
        priority: 'HIGH',
        category: 'Procurement Automation',
        recommendation: 'Implement Dual Procurement Workflows',
        rationale: 'Separate workflows needed for veterinary/livestock and plant maintenance procurement',
        benefits: [
          'Automated purchase requisitions and approvals',
          'Supplier performance tracking',
          'Expiry date management for veterinary products',
          'Spare parts inventory optimization',
          'Reduced procurement cycle time'
        ],
        timeline: '2-3 months',
        estimatedROI: 'Medium-High - Expected 20-30% reduction in procurement costs'
      },
      {
        priority: 'HIGH',
        category: 'System Integration',
        recommendation: 'Integrate POS and Sage Pastel with New ERP',
        rationale: 'Eliminate data silos and manual reconciliation between systems',
        benefits: [
          'Seamless data flow across all systems',
          'Elimination of manual data entry',
          'Real-time financial updates',
          'Improved data accuracy',
          'Faster month-end closing'
        ],
        timeline: '3-4 months',
        estimatedROI: 'Medium - Expected 40-50% reduction in administrative time'
      },
      {
        priority: 'MEDIUM',
        category: 'Logistics Optimization',
        recommendation: 'Deploy Fleet and Route Management System',
        rationale: 'Improve delivery efficiency and customer satisfaction',
        benefits: [
          'Optimized delivery routes',
          'Real-time vehicle tracking',
          'Digital proof of delivery',
          'Reduced fuel costs',
          'Improved on-time delivery rates'
        ],
        timeline: '2-3 months',
        estimatedROI: 'Medium - Expected 15-20% reduction in logistics costs'
      },
      {
        priority: 'MEDIUM',
        category: 'Business Intelligence',
        recommendation: 'Implement Executive Dashboards and Analytics',
        rationale: 'Senior management needs real-time visibility for decision-making',
        benefits: [
          'Real-time KPI tracking',
          'Automated reporting',
          'Predictive analytics',
          'Mobile access to key metrics',
          'Data-driven decision making'
        ],
        timeline: '1-2 months',
        estimatedROI: 'Medium - Improved decision-making speed and accuracy'
      }
    ];
  },
  
  defineNextSteps(data) {
    return {
      immediate: [
        'Form steering committee with executive sponsor and department representatives',
        'Appoint dedicated project manager with authority and resources',
        'Secure budget approval for ERP implementation (estimated 12-15 month project)',
        'Begin detailed requirements documentation based on stakeholder feedback',
        'Shortlist 3-4 ERP systems for evaluation (focus on manufacturing capabilities)'
      ],
      shortTerm: [
        'Conduct vendor demonstrations and reference checks (6-8 weeks)',
        'Finalize system selection and negotiate contracts',
        'Prepare IT infrastructure (servers, network, security)',
        'Begin data cleansing and master data preparation',
        'Develop detailed implementation plan with milestones'
      ],
      mediumTerm: [
        'Implement core production module (highest priority)',
        'Deploy procurement and inventory management',
        'Integrate warehouse management with barcode scanning',
        'Conduct user training and change management',
        'Execute phased go-live starting with production'
      ],
      longTerm: [
        'Complete POS and Sage Pastel integration',
        'Deploy logistics and fleet management',
        'Implement advanced analytics and reporting',
        'Establish ongoing support and governance structure',
        'Monitor ROI and continuous improvement'
      ]
    };
  }
};
