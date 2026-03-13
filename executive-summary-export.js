// ============================================================
// EXECUTIVE SUMMARY EXPORT FUNCTION - WORD DOCUMENT
// ============================================================

function exportExecutiveSummaryReport() {
  const analyticsData = State.analyticsData || Analytics.analyzeResponses(State.responses);
  const summary = ExecutiveSummary.generateSummary(State.responses, analyticsData);
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Create professional Word document using HTML format
  let html = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Executive Summary Report</title>
  <style>
    @page {
      size: A4;
      margin: 2.5cm;
    }
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
    }
    .cover-page {
      text-align: center;
      margin-top: 100px;
      page-break-after: always;
    }
    .company-logo {
      font-size: 48pt;
      font-weight: bold;
      color: #2563EB;
      margin-bottom: 20px;
    }
    .report-title {
      font-size: 28pt;
      font-weight: bold;
      color: #1E3A8A;
      margin: 40px 0 20px 0;
    }
    .report-subtitle {
      font-size: 18pt;
      color: #64748B;
      margin-bottom: 40px;
    }
    .report-date {
      font-size: 12pt;
      color: #64748B;
      margin-top: 60px;
    }
    h1 {
      font-size: 20pt;
      font-weight: bold;
      color: #2563EB;
      border-bottom: 3px solid #2563EB;
      padding-bottom: 10px;
      margin-top: 30px;
      margin-bottom: 20px;
      page-break-after: avoid;
    }
    h2 {
      font-size: 16pt;
      font-weight: bold;
      color: #1E40AF;
      margin-top: 25px;
      margin-bottom: 15px;
      page-break-after: avoid;
    }
    h3 {
      font-size: 13pt;
      font-weight: bold;
      color: #475569;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .metrics-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      background: #F8FAFC;
    }
    .metrics-table th {
      background: #2563EB;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: bold;
    }
    .metrics-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #E2E8F0;
    }
    .metrics-table tr:nth-child(even) {
      background: #F1F5F9;
    }
    .pain-points-table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 10pt;
    }
    .pain-points-table th {
      background: #2563EB;
      color: white;
      padding: 10px 8px;
      text-align: left;
      font-weight: bold;
      font-size: 10pt;
    }
    .pain-points-table td {
      padding: 8px;
      border-bottom: 1px solid #E2E8F0;
      vertical-align: top;
    }
    .severity-high {
      background: #FEE2E2;
      color: #991B1B;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .severity-medium {
      background: #FEF3C7;
      color: #92400E;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .severity-low {
      background: #D1FAE5;
      color: #065F46;
      font-weight: bold;
      padding: 4px 8px;
      border-radius: 4px;
    }
    .dept-box {
      background: #F8FAFC;
      border-left: 4px solid #2563EB;
      padding: 15px;
      margin: 15px 0;
      page-break-inside: avoid;
    }
    .dept-header {
      font-size: 13pt;
      font-weight: bold;
      color: #1E40AF;
      margin-bottom: 10px;
    }
    .dept-section {
      margin: 10px 0;
    }
    .dept-section-title {
      font-weight: bold;
      color: #2563EB;
      margin-bottom: 5px;
    }
    ul {
      margin: 5px 0 10px 20px;
      padding: 0;
    }
    li {
      margin: 5px 0;
    }
    .recommendation-box {
      background: #FFFBEB;
      border-left: 4px solid #F59E0B;
      padding: 15px;
      margin: 15px 0;
      page-break-inside: avoid;
    }
    .recommendation-box.priority-critical {
      background: #FEF2F2;
      border-left-color: #EF4444;
    }
    .recommendation-box.priority-high {
      background: #FEF3C7;
      border-left-color: #F59E0B;
    }
    .recommendation-box.priority-medium {
      background: #EFF6FF;
      border-left-color: #3B82F6;
    }
    .priority-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 4px;
      font-weight: bold;
      font-size: 9pt;
      margin-left: 10px;
    }
    .priority-critical {
      background: #FEE2E2;
      color: #991B1B;
    }
    .priority-high {
      background: #FEF3C7;
      color: #92400E;
    }
    .priority-medium {
      background: #DBEAFE;
      color: #1E40AF;
    }
    .next-steps-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 20px 0;
    }
    .next-steps-box {
      background: #F8FAFC;
      border: 2px solid #E2E8F0;
      border-radius: 8px;
      padding: 15px;
      page-break-inside: avoid;
    }
    .next-steps-box h3 {
      color: #2563EB;
      margin-top: 0;
    }
    .executive-text {
      text-align: justify;
      line-height: 1.8;
      margin: 15px 0;
    }
    .executive-text p {
      margin: 15px 0;
    }
    .page-break {
      page-break-before: always;
    }
    strong {
      color: #1E40AF;
    }
  </style>
</head>
<body>

  <!-- Cover Page -->
  <div class="cover-page">
    <div class="company-logo">HYPERFEEDS</div>
    <div style="font-size: 14pt; color: #64748B; margin-bottom: 60px;">ANIMAL NUTRITION</div>
    <div class="report-title">${summary.overview.title}</div>
    <div class="report-subtitle">${summary.overview.subtitle}</div>
    <div class="report-date">Report Date: ${summary.overview.date}</div>
    <div style="margin-top: 80px; font-size: 10pt; color: #94A3B8;">
      <p>CONFIDENTIAL</p>
      <p>For Internal Use Only</p>
    </div>
  </div>

  <!-- Executive Summary -->
  <h1>Executive Summary</h1>
  <div class="executive-text">
    ${summary.overview.executiveSummaryText}
  </div>

  <!-- Key Metrics -->
  <h1>Key Metrics at a Glance</h1>
  <table class="metrics-table">
    <tr>
      <th>Metric</th>
      <th>Value</th>
    </tr>
    <tr>
      <td><strong>Total Responses</strong></td>
      <td>${summary.overview.metrics.totalResponses}</td>
    </tr>
    <tr>
      <td><strong>Departments Covered</strong></td>
      <td>${summary.overview.metrics.departmentsCovered}</td>
    </tr>
    <tr>
      <td><strong>Completion Rate</strong></td>
      <td>${summary.overview.metrics.completionRate}%</td>
    </tr>
    <tr>
      <td><strong>Overall Sentiment</strong></td>
      <td>${summary.overview.metrics.overallSentiment}</td>
    </tr>
    <tr>
      <td><strong>Positive Responses</strong></td>
      <td>${summary.overview.metrics.positiveResponses}%</td>
    </tr>
    <tr>
      <td><strong>Change Readiness</strong></td>
      <td>${summary.overview.metrics.readinessForChange}</td>
    </tr>
  </table>

  <div class="page-break"></div>

  <!-- Department Feedback Summary -->
  <h1>Department Feedback Summary</h1>
  <p style="color: #64748B; margin-bottom: 20px;">Key themes, challenges, and expectations from each department</p>
  
  ${summary.departmentFeedback.map(dept => `
    <div class="dept-box">
      <div class="dept-header">${dept.name} <span style="font-size: 10pt; color: #64748B;">(${dept.responseCount} ${dept.responseCount === 1 ? 'Response' : 'Responses'})</span></div>
      
      ${dept.keyThemes && dept.keyThemes.length > 0 ? `
        <div class="dept-section">
          <div class="dept-section-title">Key Themes:</div>
          <ul>
            ${dept.keyThemes.map(theme => `<li>${theme}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${dept.challenges && dept.challenges.length > 0 ? `
        <div class="dept-section">
          <div class="dept-section-title">Current Challenges:</div>
          <ul>
            ${dept.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
      
      ${dept.expectations && dept.expectations.length > 0 ? `
        <div class="dept-section">
          <div class="dept-section-title">Expectations from New System:</div>
          <ul>
            ${dept.expectations.map(expectation => `<li>${expectation}</li>`).join('')}
          </ul>
        </div>
      ` : ''}
    </div>
  `).join('')}

  <div class="page-break"></div>

  <!-- Top Pain Points -->
  <h1>Top Pain Points Highlighted</h1>
  <p style="color: #64748B; margin-bottom: 20px;">Critical issues identified by stakeholders, ranked by severity and frequency</p>
  
  <table class="pain-points-table">
    <tr>
      <th style="width: 5%;">Rank</th>
      <th style="width: 30%;">Pain Point</th>
      <th style="width: 15%;">Department</th>
      <th style="width: 10%;">Severity</th>
      <th style="width: 40%;">Recommended Action</th>
    </tr>
    ${summary.topPainPoints.map(pain => `
      <tr>
        <td style="text-align: center; font-weight: bold;">#${pain.rank}</td>
        <td>${pain.description}</td>
        <td>${pain.department}</td>
        <td><span class="severity-${pain.severity}">${pain.severity.toUpperCase()}</span></td>
        <td style="font-size: 9pt; color: #475569;">${pain.recommendation}</td>
      </tr>
    `).join('')}
  </table>

  <div class="page-break"></div>

  <!-- Key Recommendations -->
  <h1>Key Recommendations</h1>
  <p style="color: #64748B; margin-bottom: 20px;">Actionable recommendations based on stakeholder feedback and pain point analysis</p>
  
  ${summary.keyRecommendations.map((rec, index) => `
    <div class="recommendation-box priority-${rec.priority.toLowerCase()}">
      <h3>${index + 1}. ${rec.recommendation}<span class="priority-badge priority-${rec.priority.toLowerCase()}">${rec.priority}</span></h3>
      <p><strong>Category:</strong> ${rec.category}</p>
      <p><strong>Rationale:</strong> ${rec.rationale}</p>
      <p><strong>Expected Benefits:</strong></p>
      <ul>
        ${rec.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
      </ul>
      <p><strong>Timeline:</strong> ${rec.timeline} | <strong>Expected ROI:</strong> ${rec.estimatedROI}</p>
    </div>
  `).join('')}

  <div class="page-break"></div>

  <!-- Next Steps -->
  <h1>Recommended Next Steps</h1>
  <p style="color: #64748B; margin-bottom: 20px;">Phased approach to implementing the digital transformation</p>
  
  <div class="next-steps-grid">
    <div class="next-steps-box">
      <h3>🔴 Immediate Actions (Next 2-4 Weeks)</h3>
      <ul>
        ${summary.nextSteps.immediate.map(step => `<li>${step}</li>`).join('')}
      </ul>
    </div>
    
    <div class="next-steps-box">
      <h3>🟡 Short-Term Actions (1-3 Months)</h3>
      <ul>
        ${summary.nextSteps.shortTerm.map(step => `<li>${step}</li>`).join('')}
      </ul>
    </div>
    
    <div class="next-steps-box">
      <h3>🟢 Medium-Term Actions (3-9 Months)</h3>
      <ul>
        ${summary.nextSteps.mediumTerm.map(step => `<li>${step}</li>`).join('')}
      </ul>
    </div>
    
    <div class="next-steps-box">
      <h3>🔵 Long-Term Actions (9-15 Months)</h3>
      <ul>
        ${summary.nextSteps.longTerm.map(step => `<li>${step}</li>`).join('')}
      </ul>
    </div>
  </div>

  <div style="margin-top: 60px; padding-top: 20px; border-top: 2px solid #E2E8F0; text-align: center; color: #94A3B8; font-size: 9pt;">
    <p>End of Executive Summary Report</p>
    <p>Generated from Hyperfeeds Stakeholder Discovery System | ${summary.overview.date}</p>
    <p>© ${new Date().getFullYear()} Hyperfeeds Animal Nutrition. All rights reserved.</p>
  </div>

</body>
</html>
  `;
  
  // Download as Word document
  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Hyperfeeds_Executive_Summary_' + timestamp + '.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
