// ============================================================
// EXECUTIVE SUMMARY UI RENDERER
// ============================================================

function renderExecutiveSummary() {
  // Always recalculate to ensure summary reflects latest responses
  const analyticsData = State.analyticsData || Analytics.analyzeResponses(State.responses);
  const summary = ExecutiveSummary.generateSummary(State.responses, analyticsData);

  return `
    <div class="executive-summary-page">
      
      <!-- Header Section -->
      <div class="exec-header">
        <h1>${summary.overview.title}</h1>
        <p class="exec-subtitle">${summary.overview.subtitle}</p>
        <p class="exec-date">Report Date: ${summary.overview.date}</p>
      </div>

      <!-- Key Metrics Dashboard -->
      <div class="exec-section">
        <h2 class="section-title">📊 Key Metrics at a Glance</h2>
        <div class="metrics-grid">
          <div class="metric-card">
            <div class="metric-icon">📝</div>
            <div class="metric-value">${summary.overview.metrics.totalResponses}</div>
            <div class="metric-label">Total Responses</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">🏢</div>
            <div class="metric-value">${summary.overview.metrics.departmentsCovered}</div>
            <div class="metric-label">Departments Covered</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">✅</div>
            <div class="metric-value">${summary.overview.metrics.completionRate}%</div>
            <div class="metric-label">Completion Rate</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">😊</div>
            <div class="metric-value">${summary.overview.metrics.overallSentiment}</div>
            <div class="metric-label">Overall Sentiment</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">👍</div>
            <div class="metric-value">${summary.overview.metrics.positiveResponses}%</div>
            <div class="metric-label">Positive Responses</div>
          </div>
          <div class="metric-card">
            <div class="metric-icon">🚀</div>
            <div class="metric-value">${summary.overview.metrics.readinessForChange}</div>
            <div class="metric-label">Change Readiness</div>
          </div>
        </div>
      </div>

      <!-- Executive Summary Text -->
      <div class="exec-section">
        <h2 class="section-title">📄 Executive Summary</h2>
        <div class="exec-summary-text">
          ${summary.overview.executiveSummaryText}
        </div>
      </div>

      <!-- Department Feedback Summary -->
      <div class="exec-section">
        <h2 class="section-title">🏢 Department Feedback Summary</h2>
        <p class="section-description">Key themes, challenges, and expectations from each department</p>
        
        <div class="department-summaries">
          ${summary.departmentFeedback.map(dept => `
            <div class="dept-summary-card">
              <div class="dept-summary-header">
                <h3>${dept.name}</h3>
                <span class="response-badge">${dept.responseCount} ${dept.responseCount === 1 ? 'Response' : 'Responses'}</span>
              </div>
              
              ${dept.keyThemes && dept.keyThemes.length > 0 ? `
                <div class="dept-summary-section">
                  <h4>Key Themes:</h4>
                  <ul class="theme-list">
                    ${dept.keyThemes.map(theme => `<li>${theme}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              
              ${dept.challenges && dept.challenges.length > 0 ? `
                <div class="dept-summary-section">
                  <h4>Current Challenges:</h4>
                  <ul class="challenge-list">
                    ${dept.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
              
              ${dept.expectations && dept.expectations.length > 0 ? `
                <div class="dept-summary-section">
                  <h4>Expectations from New System:</h4>
                  <ul class="expectation-list">
                    ${dept.expectations.map(expectation => `<li>${expectation}</li>`).join('')}
                  </ul>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Top Pain Points -->
      <div class="exec-section">
        <h2 class="section-title">⚠️ Top Pain Points Highlighted</h2>
        <p class="section-description">Critical issues identified by stakeholders, ranked by severity and frequency</p>
        
        <div class="pain-points-table">
          <div class="pain-point-header">
            <div class="pp-rank">Rank</div>
            <div class="pp-description">Pain Point</div>
            <div class="pp-dept">Department</div>
            <div class="pp-severity">Severity</div>
            <div class="pp-impact">Impact</div>
            <div class="pp-recommendation">Recommended Action</div>
          </div>
          
          ${summary.topPainPoints.map(pain => `
            <div class="pain-point-row severity-${pain.severity}">
              <div class="pp-rank">
                <span class="rank-badge">#${pain.rank}</span>
              </div>
              <div class="pp-description">${pain.description}</div>
              <div class="pp-dept">${pain.department}</div>
              <div class="pp-severity">
                <span class="severity-badge severity-${pain.severity}">${pain.severity.toUpperCase()}</span>
              </div>
              <div class="pp-impact">${pain.impact}</div>
              <div class="pp-recommendation">${pain.recommendation}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Key Recommendations -->
      <div class="exec-section">
        <h2 class="section-title">💡 Key Recommendations</h2>
        <p class="section-description">Actionable recommendations based on stakeholder feedback and pain point analysis</p>
        
        <div class="recommendations-grid">
          ${summary.keyRecommendations.map(rec => `
            <div class="recommendation-card priority-${rec.priority.toLowerCase()}">
              <div class="rec-header">
                <div>
                  <h3>${rec.recommendation}</h3>
                  <span class="rec-category">${rec.category}</span>
                </div>
                <span class="priority-badge priority-${rec.priority.toLowerCase()}">${rec.priority}</span>
              </div>
              
              <div class="rec-rationale">
                <strong>Rationale:</strong> ${rec.rationale}
              </div>
              
              <div class="rec-benefits">
                <strong>Expected Benefits:</strong>
                <ul>
                  ${rec.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                </ul>
              </div>
              
              <div class="rec-footer">
                <div class="rec-timeline">
                  <strong>Timeline:</strong> ${rec.timeline}
                </div>
                <div class="rec-roi">
                  <strong>ROI:</strong> ${rec.estimatedROI}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Next Steps -->
      <div class="exec-section">
        <h2 class="section-title">🎯 Recommended Next Steps</h2>
        <p class="section-description">Phased approach to implementing the digital transformation</p>
        
        <div class="next-steps-grid">
          <div class="next-steps-card">
            <h3>🔴 Immediate Actions (Next 2-4 Weeks)</h3>
            <ul>
              ${summary.nextSteps.immediate.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          
          <div class="next-steps-card">
            <h3>🟡 Short-Term Actions (1-3 Months)</h3>
            <ul>
              ${summary.nextSteps.shortTerm.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          
          <div class="next-steps-card">
            <h3>🟢 Medium-Term Actions (3-9 Months)</h3>
            <ul>
              ${summary.nextSteps.mediumTerm.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          
          <div class="next-steps-card">
            <h3>🔵 Long-Term Actions (9-15 Months)</h3>
            <ul>
              ${summary.nextSteps.longTerm.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>

      <!-- Export Button -->
      <div class="exec-section">
        <div class="export-summary-section">
          <h3>Export Executive Summary</h3>
          <p>Download this executive summary for presentation to leadership and stakeholders</p>
          <button class="btn-export-summary" id="exportExecutiveSummary">
            <span class="export-icon">📄</span>
            Download Executive Summary (PDF-Ready)
          </button>
        </div>
      </div>

    </div>
  `;
}
