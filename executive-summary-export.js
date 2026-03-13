// ============================================================
// EXECUTIVE SUMMARY EXPORT FUNCTION
// ============================================================

function exportExecutiveSummaryReport() {
  const analyticsData = State.analyticsData || Analytics.analyzeResponses(State.responses);
  const summary = ExecutiveSummary.generateSummary(State.responses, analyticsData);
  const timestamp = new Date().toISOString().split('T')[0];
  
  let content = '';
  
  // Header
  content += `${summary.overview.title}\n`;
  content += `${summary.overview.subtitle}\n`;
  content += `Report Date: ${summary.overview.date}\n`;
  content += `${'='.repeat(80)}\n\n`;
  
  // Key Metrics
  content += `KEY METRICS AT A GLANCE\n`;
  content += `${'-'.repeat(80)}\n`;
  content += `Total Responses: ${summary.overview.metrics.totalResponses}\n`;
  content += `Departments Covered: ${summary.overview.metrics.departmentsCovered}\n`;
  content += `Completion Rate: ${summary.overview.metrics.completionRate}%\n`;
  content += `Overall Sentiment: ${summary.overview.metrics.overallSentiment}\n`;
  content += `Positive Responses: ${summary.overview.metrics.positiveResponses}%\n`;
  content += `Change Readiness: ${summary.overview.metrics.readinessForChange}\n\n`;
  
  // Executive Summary
  content += `EXECUTIVE SUMMARY\n`;
  content += `${'-'.repeat(80)}\n`;
  const summaryText = summary.overview.executiveSummaryText
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/&quot;/g, '"');
  content += summaryText + '\n\n';
  
  // Department Feedback
  content += `DEPARTMENT FEEDBACK SUMMARY\n`;
  content += `${'-'.repeat(80)}\n`;
  summary.departmentFeedback.forEach(dept => {
    content += `\n${dept.name} (${dept.responseCount} ${dept.responseCount === 1 ? 'Response' : 'Responses'})\n`;
    
    if (dept.keyThemes && dept.keyThemes.length > 0) {
      content += `\nKey Themes:\n`;
      dept.keyThemes.forEach(theme => content += `  - ${theme}\n`);
    }
    
    if (dept.challenges && dept.challenges.length > 0) {
      content += `\nCurrent Challenges:\n`;
      dept.challenges.forEach(challenge => content += `  - ${challenge}\n`);
    }
    
    if (dept.expectations && dept.expectations.length > 0) {
      content += `\nExpectations from New System:\n`;
      dept.expectations.forEach(expectation => content += `  - ${expectation}\n`);
    }
    content += '\n';
  });
  
  // Top Pain Points
  content += `\nTOP PAIN POINTS HIGHLIGHTED\n`;
  content += `${'-'.repeat(80)}\n`;
  content += `Critical issues identified by stakeholders, ranked by severity and frequency\n\n`;
  
  summary.topPainPoints.forEach(pain => {
    content += `#${pain.rank} - ${pain.description}\n`;
    content += `   Department: ${pain.department}\n`;
    content += `   Severity: ${pain.severity.toUpperCase()}\n`;
    content += `   Impact: ${pain.impact}\n`;
    content += `   Recommended Action: ${pain.recommendation}\n\n`;
  });
  
  // Key Recommendations
  content += `\nKEY RECOMMENDATIONS\n`;
  content += `${'-'.repeat(80)}\n`;
  content += `Actionable recommendations based on stakeholder feedback and pain point analysis\n\n`;
  
  summary.keyRecommendations.forEach((rec, index) => {
    content += `${index + 1}. ${rec.recommendation} [${rec.priority}]\n`;
    content += `   Category: ${rec.category}\n`;
    content += `   Rationale: ${rec.rationale}\n`;
    content += `   Timeline: ${rec.timeline}\n`;
    content += `   Expected ROI: ${rec.estimatedROI}\n`;
    content += `\n   Expected Benefits:\n`;
    rec.benefits.forEach(benefit => content += `     - ${benefit}\n`);
    content += '\n';
  });
  
  // Next Steps
  content += `\nRECOMMENDED NEXT STEPS\n`;
  content += `${'-'.repeat(80)}\n`;
  content += `Phased approach to implementing the digital transformation\n\n`;
  
  content += `IMMEDIATE ACTIONS (Next 2-4 Weeks):\n`;
  summary.nextSteps.immediate.forEach((step, i) => content += `  ${i + 1}. ${step}\n`);
  
  content += `\nSHORT-TERM ACTIONS (1-3 Months):\n`;
  summary.nextSteps.shortTerm.forEach((step, i) => content += `  ${i + 1}. ${step}\n`);
  
  content += `\nMEDIUM-TERM ACTIONS (3-9 Months):\n`;
  summary.nextSteps.mediumTerm.forEach((step, i) => content += `  ${i + 1}. ${step}\n`);
  
  content += `\nLONG-TERM ACTIONS (9-15 Months):\n`;
  summary.nextSteps.longTerm.forEach((step, i) => content += `  ${i + 1}. ${step}\n`);
  
  content += `\n${'='.repeat(80)}\n`;
  content += `End of Executive Summary Report\n`;
  content += `Generated from Hyperfeeds Stakeholder Discovery System\n`;
  
  // Download the file
  downloadFile('Hyperfeeds_Executive_Summary_' + timestamp + '.txt', content, 'text/plain;charset=utf-8;');
}
