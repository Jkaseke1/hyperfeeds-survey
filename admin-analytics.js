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
            Export to CSV
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
  const rows = [
    ['Department', 'Respondent', 'Role', 'Date', 'GitHub URL']
  ];
  
  State.responses.forEach(r => {
    rows.push([r.department, r.respondent, r.role, r.date, r.url]);
  });

  const csv = rows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
  downloadFile('hyperfeeds-survey-responses.csv', csv, 'text/csv');
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
