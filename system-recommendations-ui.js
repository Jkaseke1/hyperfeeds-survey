// ============================================================
// SYSTEM RECOMMENDATIONS UI RENDERER
// ============================================================

function renderSystemRecommendations() {
  if (!State.systemRecommendations) {
    State.systemRecommendations = SystemRecommendations.generateSystemGuidance(State.responses, State.analyticsData || Analytics.analyzeResponses(State.responses));
  }

  const rec = State.systemRecommendations;

  return `
    <div class="system-recommendations-dashboard">
      
      <!-- Strategic Overview -->
      <div class="rec-section">
        <h2 class="section-title">🎯 ${rec.overview.title}</h2>
        
        <div class="current-state-card">
          <h3>Current System Landscape</h3>
          <p>${rec.overview.currentState.description}</p>
          <div class="systems-grid">
            ${rec.overview.currentState.systems.map(sys => `
              <div class="system-item ${sys.status.includes('No System') ? 'system-gap' : 'system-ok'}">
                <div class="system-header">
                  <strong>${sys.name}</strong>
                  <span class="system-status ${sys.status.includes('No System') ? 'status-critical' : sys.status.includes('Partially') ? 'status-warning' : 'status-ok'}">${sys.status}</span>
                </div>
                <div class="system-coverage">${sys.coverage}</div>
              </div>
            `).join('')}
          </div>
          
          <h4>Key Gaps Identified:</h4>
          <ul class="gap-list">
            ${rec.overview.currentState.keyGaps.map(gap => `<li>${gap}</li>`).join('')}
          </ul>
        </div>

        <div class="insights-card">
          <h3>Stakeholder Insights</h3>
          <div class="insights-metrics">
            <div class="insight-metric">
              <div class="metric-value">${rec.overview.stakeholderInsights.totalResponses}</div>
              <div class="metric-label">Survey Responses</div>
            </div>
            <div class="insight-metric">
              <div class="metric-value">${rec.overview.stakeholderInsights.overallSentiment}</div>
              <div class="metric-label">Overall Sentiment</div>
            </div>
            <div class="insight-metric">
              <div class="metric-value">${rec.overview.stakeholderInsights.readinessForChange}</div>
              <div class="metric-label">Change Readiness</div>
            </div>
          </div>
          <h4>Top Stakeholder Concerns:</h4>
          <ol class="concerns-list">
            ${rec.overview.stakeholderInsights.topConcerns.map(concern => `<li>${concern}</li>`).join('')}
          </ol>
        </div>

        <div class="strategic-direction-card">
          <h3>📌 Strategic Direction</h3>
          <div class="recommendation-highlight">
            ${rec.overview.strategicDirection.recommendation}
          </div>
          <h4>Rationale:</h4>
          <ul>
            ${rec.overview.strategicDirection.rationale.map(r => `<li>${r}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Core Requirements -->
      <div class="rec-section">
        <h2 class="section-title">📋 ${rec.coreRequirements.title}</h2>
        ${rec.coreRequirements.modules.map(module => `
          <div class="module-card priority-${module.priority.toLowerCase()}">
            <div class="module-header">
              <div>
                <h3>${module.module}</h3>
                <span class="priority-badge priority-${module.priority.toLowerCase()}">${module.priority}</span>
              </div>
              <div class="module-rationale">${module.rationale}</div>
            </div>
            <h4>Required Features:</h4>
            <ul class="features-list">
              ${module.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- System Architecture -->
      <div class="rec-section">
        <h2 class="section-title">🏗️ ${rec.systemArchitecture.title}</h2>
        <div class="architecture-approach">
          <strong>Recommended Approach:</strong> ${rec.systemArchitecture.approach}
        </div>

        <div class="erp-recommendation-card">
          <h3>Core ERP System</h3>
          <div class="erp-options">
            ${rec.systemArchitecture.coreERP.options.map(option => `
              <div class="erp-option ${option.fit.includes('EXCELLENT') ? 'erp-recommended' : ''}">
                <div class="erp-header">
                  <h4>${option.name}</h4>
                  <span class="fit-badge ${option.fit.includes('EXCELLENT') ? 'fit-excellent' : 'fit-good'}">${option.fit.split(' - ')[0]}</span>
                </div>
                <div class="erp-details">
                  <div class="erp-pros">
                    <strong>Pros:</strong>
                    <ul>${option.pros.map(pro => `<li>${pro}</li>`).join('')}</ul>
                  </div>
                  <div class="erp-cons">
                    <strong>Cons:</strong>
                    <ul>${option.cons.map(con => `<li>${con}</li>`).join('')}</ul>
                  </div>
                </div>
                <div class="erp-fit">${option.fit}</div>
              </div>
            `).join('')}
          </div>
          <div class="final-recommendation">
            ${rec.systemArchitecture.coreERP.recommendation}
          </div>
        </div>

        <div class="integration-card">
          <h3>Integration Strategy</h3>
          <p>${rec.systemArchitecture.integrationLayer.description}</p>
          <div class="integrations-list">
            ${rec.systemArchitecture.integrationLayer.keyIntegrations.map(int => `
              <div class="integration-item">
                <strong>${int.system}</strong>
                <div>Method: ${int.method}</div>
                <div>Data: ${int.data}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="data-strategy-card">
          <h3>Data Management Strategy</h3>
          <div><strong>Master Data:</strong> ${rec.systemArchitecture.dataStrategy.masterDataManagement}</div>
          <div><strong>Single Source of Truth:</strong> ${rec.systemArchitecture.dataStrategy.singleSourceOfTruth}</div>
          <h4>Data Flow:</h4>
          <ul>
            ${rec.systemArchitecture.dataStrategy.dataFlow.map(flow => `<li>${flow}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Integration Plan -->
      <div class="rec-section">
        <h2 class="section-title">🔗 ${rec.integrationStrategy.title}</h2>
        <div class="integration-approach">${rec.integrationStrategy.approach}</div>
        
        ${rec.integrationStrategy.phases.map(phase => `
          <div class="phase-card">
            <div class="phase-header">
              <h3>Phase ${phase.phase}: ${phase.name}</h3>
              <span class="phase-duration">${phase.duration}</span>
            </div>
            <h4>Activities:</h4>
            <ul>
              ${phase.activities.map(activity => `<li>${activity}</li>`).join('')}
            </ul>
            <div class="phase-systems"><strong>Systems Involved:</strong> ${phase.systems.join(', ')}</div>
          </div>
        `).join('')}

        <div class="critical-considerations-card">
          <h4>⚠️ Critical Considerations:</h4>
          <ul>
            ${rec.integrationStrategy.criticalConsiderations.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Implementation Roadmap -->
      <div class="rec-section">
        <h2 class="section-title">🗓️ ${rec.implementationRoadmap.title}</h2>
        <div class="roadmap-duration"><strong>Total Duration:</strong> ${rec.implementationRoadmap.totalDuration}</div>
        
        <div class="roadmap-timeline">
          ${rec.implementationRoadmap.phases.map(phase => `
            <div class="roadmap-phase">
              <div class="roadmap-header">
                <div class="roadmap-month">${phase.month}</div>
                <h3>${phase.phase}</h3>
              </div>
              <h4>Key Activities:</h4>
              <ul>
                ${phase.activities.map(activity => `<li>${activity}</li>`).join('')}
              </ul>
              <h4>Deliverables:</h4>
              <ul class="deliverables-list">
                ${phase.deliverables.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Success Factors -->
      <div class="rec-section">
        <h2 class="section-title">✅ ${rec.criticalSuccessFactors.title}</h2>
        ${rec.criticalSuccessFactors.factors.map(factor => `
          <div class="success-factor-card importance-${factor.importance.toLowerCase()}">
            <div class="factor-header">
              <h3>${factor.factor}</h3>
              <span class="importance-badge importance-${factor.importance.toLowerCase()}">${factor.importance}</span>
            </div>
            <p>${factor.description}</p>
            <h4>Required Actions:</h4>
            <ul>
              ${factor.actions.map(action => `<li>${action}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Risk Mitigation -->
      <div class="rec-section">
        <h2 class="section-title">⚠️ ${rec.riskMitigation.title}</h2>
        <div class="risks-grid">
          ${rec.riskMitigation.risks.map(risk => `
            <div class="risk-card risk-${risk.likelihood.toLowerCase()}">
              <h3>${risk.risk}</h3>
              <div class="risk-metrics">
                <span class="risk-metric">
                  <strong>Likelihood:</strong> 
                  <span class="badge badge-${risk.likelihood.toLowerCase()}">${risk.likelihood}</span>
                </span>
                <span class="risk-metric">
                  <strong>Impact:</strong> 
                  <span class="badge badge-${risk.impact.toLowerCase()}">${risk.impact}</span>
                </span>
              </div>
              <h4>Mitigation Strategy:</h4>
              <ul>
                ${risk.mitigation.map(m => `<li>${m}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}
