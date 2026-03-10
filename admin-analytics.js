// ============================================================
// ADMIN ANALYTICS DASHBOARD RENDERER
// ============================================================

function renderAnalyticsDashboard() {
  if (!State.analyticsData) {
    State.analyticsData = Analytics.analyzeResponses(State.responses);
  }

  const data = State.analyticsData;
  const overview = data.overview;

  return `
    <div class="analytics-dashboard">
      <!-- Executive Summary -->
      <div class="analytics-section">
        <h2 class="section-title">📊 Executive Summary</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon">📝</div>
            <div class="metric-value">${overview.totalResponses}</div>
            <div class="metric-label">Total Responses</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">🏢</div>
            <div class="metric-value">${overview.departmentsCovered} / ${overview.totalDepartments}</div>
            <div class="metric-label">Departments Covered</div>
          </div>
          <div class="metric-card ${parseFloat(overview.completionRate) < 50 ? 'metric-warning' : ''}">
            <div class="metric-icon">📈</div>
            <div class="metric-value">${overview.completionRate}%</div>
            <div class="metric-label">Completion Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">⏱️</div>
            <div class="metric-value">${overview.avgResponseTime}</div>
            <div class="metric-label">Avg Response Time</div>
          </div>
        </div>
      </div>

      <!-- Department Participation -->
      <div class="analytics-section">
        <h2 class="section-title">🏢 Department Participation</h2>
        <div class="chart-container">
          ${Charts.renderBarChart(
            data.departmentBreakdown.map(d => ({
              label: `${d.icon} ${d.name}`,
              value: d.responseCount,
              color: d.color
            })),
            Math.max(...data.departmentBreakdown.map(d => d.responseCount), 1)
          )}
        </div>
      </div>

      <!-- Sentiment Analysis -->
      <div class="analytics-section">
        <h2 class="section-title">💭 Overall Sentiment</h2>
        <div class="sentiment-container">
          ${Charts.renderDonutChart([
            { label: 'Positive', value: parseFloat(data.sentiment.positive), color: '#10B981' },
            { label: 'Neutral', value: parseFloat(data.sentiment.neutral), color: '#6B7280' },
            { label: 'Negative', value: parseFloat(data.sentiment.negative), color: '#EF4444' }
          ])}
          <div class="sentiment-summary">
            <div class="sentiment-badge ${data.sentiment.overall.toLowerCase()}">
              ${data.sentiment.overall} Sentiment
            </div>
            <p class="sentiment-note">
              ${data.sentiment.overall === 'Negative' 
                ? 'Stakeholders express frustration with current processes. Strong change management will be critical.'
                : data.sentiment.overall === 'Positive'
                ? 'Stakeholders are optimistic about the transformation. Leverage this momentum.'
                : 'Mixed sentiment indicates both opportunities and challenges ahead.'}
            </p>
          </div>
        </div>
      </div>

      <!-- Top Pain Points -->
      <div class="analytics-section">
        <h2 class="section-title">🚨 Top Pain Points</h2>
        <div class="pain-points-list">
          ${data.painPoints.slice(0, 10).map((pain, i) => `
            <div class="pain-point-item severity-${pain.severity}">
              <div class="pain-point-rank">#${i + 1}</div>
              <div class="pain-point-content">
                <div class="pain-point-text">"${pain.text}"</div>
                <div class="pain-point-meta">
                  <span class="pain-dept">${pain.department}</span>
                  ${pain.count > 1 ? `<span class="pain-mentions">Mentioned ${pain.count}× by ${pain.mentions.length} respondents</span>` : ''}
                  <span class="pain-severity severity-badge-${pain.severity}">${pain.severity} severity</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Priority Matrix -->
      <div class="analytics-section">
        <h2 class="section-title">🎯 Priority Matrix</h2>
        <p class="section-desc">Priorities mapped by urgency and impact to guide system design decisions.</p>
        ${Charts.renderPriorityMatrix(data.priorities)}
      </div>

      <!-- Scale Question Insights -->
      ${data.scaleData.length > 0 ? `
        <div class="analytics-section">
          <h2 class="section-title">📊 Rating Insights</h2>
          <div class="scale-charts-grid">
            ${data.scaleData.slice(0, 6).map(scale => 
              Charts.renderScaleChart(scale.question, scale.average, scale.responses)
            ).join('')}
          </div>
        </div>
      ` : ''}

      <!-- Top Keywords -->
      <div class="analytics-section">
        <h2 class="section-title">🔤 Most Mentioned Keywords</h2>
        <div class="keywords-cloud">
          ${data.keywords.slice(0, 20).map(kw => {
            const size = Math.min(Math.max(kw.count / 2, 0.8), 2.5);
            return `<span class="keyword-tag" style="font-size: ${size}rem">${kw.word} <sup>${kw.count}</sup></span>`;
          }).join('')}
        </div>
      </div>

      <!-- Actionable Recommendations -->
      <div class="analytics-section recommendations-section">
        <h2 class="section-title">💡 Actionable Recommendations</h2>
        <div class="recommendations-list">
          ${data.recommendations.map(rec => `
            <div class="recommendation-card priority-${rec.priority}">
              <div class="rec-header">
                <span class="rec-priority">${rec.priority.toUpperCase()}</span>
                <span class="rec-category">${rec.category}</span>
              </div>
              <h3 class="rec-title">${rec.title}</h3>
              <p class="rec-description">${rec.description}</p>
              <div class="rec-action">
                <strong>Next Action:</strong> ${rec.action}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Export Options -->
      <div class="analytics-section">
        <h2 class="section-title">📥 Export Data</h2>
        <div class="export-buttons">
          <button class="btn-export" id="exportCSV">
            <span class="export-icon">📊</span>
            Export Professional Excel Report
          </button>
          <button class="btn-export" id="exportPDF">
            <span class="export-icon">📄</span>
            Generate PDF Report
          </button>
          <button class="btn-export" id="exportJSON">
            <span class="export-icon">💾</span>
            Download Raw Data (JSON)
          </button>
        </div>
      </div>
    </div>
  `;
}

// Export functions
function exportToCSV() {
  exportToExcel();
}

function exportToExcel() {
  const data = State.analyticsData;
  const timestamp = new Date().toISOString().split('T')[0];
  
  // Create workbook with multiple sheets
  let excel = '<?xml version="1.0"?>\n';
  excel += '<?mso-application progid="Excel.Sheet"?>\n';
  excel += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n';
  excel += ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n';
  
  // Styles
  excel += '<Styles>\n';
  excel += '<Style ss:ID="Header"><Font ss:Bold="1" ss:Size="12" ss:Color="#FFFFFF"/><Interior ss:Color="#2563EB" ss:Pattern="Solid"/><Alignment ss:Horizontal="Center" ss:Vertical="Center"/></Style>\n';
  excel += '<Style ss:ID="Title"><Font ss:Bold="1" ss:Size="16" ss:Color="#1E3A8A"/></Style>\n';
  excel += '<Style ss:ID="Subtitle"><Font ss:Bold="1" ss:Size="11" ss:Color="#64748B"/></Style>\n';
  excel += '<Style ss:ID="MetricValue"><Font ss:Bold="1" ss:Size="14" ss:Color="#2563EB"/></Style>\n';
  excel += '<Style ss:ID="HighPriority"><Interior ss:Color="#FEE2E2" ss:Pattern="Solid"/><Font ss:Color="#991B1B"/></Style>\n';
  excel += '<Style ss:ID="MediumPriority"><Interior ss:Color="#FEF3C7" ss:Pattern="Solid"/><Font ss:Color="#92400E"/></Style>\n';
  excel += '<Style ss:ID="LowPriority"><Interior ss:Color="#D1FAE5" ss:Pattern="Solid"/><Font ss:Color="#065F46"/></Style>\n';
  excel += '<Style ss:ID="Date"><NumberFormat ss:Format="Short Date"/></Style>\n';
  excel += '</Styles>\n';
  
  // Sheet 1: Executive Summary
  excel += '<Worksheet ss:Name="Executive Summary">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="200"/><Column ss:Width="150"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Hyperfeeds Digital Transformation - Stakeholder Discovery Report</Data></Cell></Row>\n';
  excel += '<Row><Cell ss:StyleID="Subtitle"><Data ss:Type="String">Generated: ' + new Date().toLocaleDateString() + '</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Key Metric</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Value</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Total Responses</Data></Cell><Cell ss:StyleID="MetricValue"><Data ss:Type="Number">' + data.overview.totalResponses + '</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Departments Covered</Data></Cell><Cell ss:StyleID="MetricValue"><Data ss:Type="String">' + data.overview.departmentsCovered + ' / ' + data.overview.totalDepartments + '</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Completion Rate</Data></Cell><Cell ss:StyleID="MetricValue"><Data ss:Type="String">' + data.overview.completionRate + '%</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Overall Sentiment</Data></Cell><Cell ss:StyleID="MetricValue"><Data ss:Type="String">' + data.sentiment.overall + '</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  
  excel += '<Row><Cell ss:StyleID="Subtitle"><Data ss:Type="String">Sentiment Breakdown</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Positive</Data></Cell><Cell><Data ss:Type="String">' + data.sentiment.positive + '%</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Neutral</Data></Cell><Cell><Data ss:Type="String">' + data.sentiment.neutral + '%</Data></Cell></Row>\n';
  excel += '<Row><Cell><Data ss:Type="String">Negative</Data></Cell><Cell><Data ss:Type="String">' + data.sentiment.negative + '%</Data></Cell></Row>\n';
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 2: Department Breakdown
  excel += '<Worksheet ss:Name="Department Analysis">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="150"/><Column ss:Width="100"/><Column ss:Width="120"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Department Participation Analysis</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Department</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Responses</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">% of Total</Data></Cell></Row>\n';
  
  data.departmentBreakdown.forEach(dept => {
    const percentage = data.overview.totalResponses > 0 ? ((dept.responseCount / data.overview.totalResponses) * 100).toFixed(1) : 0;
    excel += '<Row><Cell><Data ss:Type="String">' + dept.icon + ' ' + dept.name + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="Number">' + dept.responseCount + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + percentage + '%</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 3: Top Pain Points
  excel += '<Worksheet ss:Name="Pain Points">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="50"/><Column ss:Width="400"/><Column ss:Width="120"/><Column ss:Width="100"/><Column ss:Width="100"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Top Pain Points Identified</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Rank</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Pain Point</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Department</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Mentions</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Severity</Data></Cell></Row>\n';
  
  data.painPoints.slice(0, 20).forEach((pain, i) => {
    const styleID = pain.severity === 'high' ? 'HighPriority' : pain.severity === 'medium' ? 'MediumPriority' : 'LowPriority';
    excel += '<Row><Cell><Data ss:Type="Number">' + (i + 1) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(pain.text) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + pain.department + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="Number">' + pain.count + '</Data></Cell>';
    excel += '<Cell ss:StyleID="' + styleID + '"><Data ss:Type="String">' + pain.severity.toUpperCase() + '</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 4: Action Items & Recommendations
  excel += '<Worksheet ss:Name="Action Items">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="100"/><Column ss:Width="120"/><Column ss:Width="250"/><Column ss:Width="300"/><Column ss:Width="300"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Actionable Recommendations</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Priority</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Category</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Recommendation</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Description</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Next Action</Data></Cell></Row>\n';
  
  data.recommendations.forEach(rec => {
    const styleID = rec.priority === 'high' ? 'HighPriority' : rec.priority === 'medium' ? 'MediumPriority' : 'LowPriority';
    excel += '<Row><Cell ss:StyleID="' + styleID + '"><Data ss:Type="String">' + rec.priority.toUpperCase() + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + rec.category + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(rec.title) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(rec.description) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(rec.action) + '</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 5: Priority Matrix
  excel += '<Worksheet ss:Name="Priority Matrix">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="250"/><Column ss:Width="100"/><Column ss:Width="100"/><Column ss:Width="120"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Priority Matrix - Urgency vs Impact</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Item</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Urgency</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Impact</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Quadrant</Data></Cell></Row>\n';
  
  data.priorities.forEach(priority => {
    const quadrant = priority.urgency >= 7 && priority.impact >= 7 ? 'DO FIRST' :
                     priority.urgency >= 7 && priority.impact < 7 ? 'SCHEDULE' :
                     priority.urgency < 7 && priority.impact >= 7 ? 'DELEGATE' : 'ELIMINATE';
    const styleID = quadrant === 'DO FIRST' ? 'HighPriority' : quadrant === 'SCHEDULE' ? 'MediumPriority' : 'LowPriority';
    
    excel += '<Row><Cell><Data ss:Type="String">' + escapeXml(priority.item) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="Number">' + priority.urgency + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="Number">' + priority.impact + '</Data></Cell>';
    excel += '<Cell ss:StyleID="' + styleID + '"><Data ss:Type="String">' + quadrant + '</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 6: Keywords
  excel += '<Worksheet ss:Name="Top Keywords">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="150"/><Column ss:Width="100"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">Most Mentioned Keywords</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Keyword</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Mentions</Data></Cell></Row>\n';
  
  data.keywords.slice(0, 30).forEach(kw => {
    excel += '<Row><Cell><Data ss:Type="String">' + kw.word + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="Number">' + kw.count + '</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  // Sheet 7: Raw Responses
  excel += '<Worksheet ss:Name="All Responses">\n';
  excel += '<Table>\n';
  excel += '<Column ss:Width="120"/><Column ss:Width="150"/><Column ss:Width="150"/><Column ss:Width="100"/><Column ss:Width="250"/>\n';
  
  excel += '<Row><Cell ss:StyleID="Title"><Data ss:Type="String">All Survey Responses</Data></Cell></Row>\n';
  excel += '<Row/>\n';
  excel += '<Row><Cell ss:StyleID="Header"><Data ss:Type="String">Department</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Respondent</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Role</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">Date</Data></Cell><Cell ss:StyleID="Header"><Data ss:Type="String">GitHub URL</Data></Cell></Row>\n';
  
  State.responses.forEach(r => {
    excel += '<Row><Cell><Data ss:Type="String">' + escapeXml(r.department) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(r.respondent) + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + escapeXml(r.role) + '</Data></Cell>';
    excel += '<Cell ss:StyleID="Date"><Data ss:Type="String">' + r.date + '</Data></Cell>';
    excel += '<Cell><Data ss:Type="String">' + r.url + '</Data></Cell></Row>\n';
  });
  
  excel += '</Table>\n</Worksheet>\n';
  
  excel += '</Workbook>';
  
  downloadFile('Hyperfeeds_Stakeholder_Discovery_Report_' + timestamp + '.xls', excel, 'application/vnd.ms-excel');
}

function escapeXml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function exportToJSON() {
  const data = {
    exportDate: new Date().toISOString(),
    totalResponses: State.responses.length,
    analytics: State.analyticsData,
    responses: State.responses
  };
  downloadFile('hyperfeeds-survey-data.json', JSON.stringify(data, null, 2), 'application/json');
}

function exportToPDF() {
  alert('PDF export requires a backend service. For now, use Print to PDF from your browser (Ctrl+P).');
  window.print();
}

function downloadFile(filename, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
