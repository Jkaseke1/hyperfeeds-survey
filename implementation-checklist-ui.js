// ============================================================
// IMPLEMENTATION CHECKLIST UI RENDERER
// ============================================================

function renderImplementationChecklist() {
  // Load checklist data
  const checklist = ImplementationChecklist.generateChecklist(State.responses, State.analyticsData);
  
  // Load saved progress from state
  if (State.checklistProgress) {
    applyChecklistProgress(checklist, State.checklistProgress);
  }
  
  // Calculate overall progress
  const progress = ImplementationChecklist.calculateProgress(checklist);
  checklist.overview.totalItems = progress.totalItems;
  checklist.overview.completedItems = progress.completedItems;

  return `
    <div class="implementation-checklist-page">
      
      <!-- Header -->
      <div class="checklist-header">
        <h1>🎯 ${checklist.overview.title}</h1>
        <p class="checklist-description">${checklist.overview.description}</p>
      </div>

      <!-- Overall Progress -->
      <div class="overall-progress-section">
        <div class="progress-stats">
          <div class="stat-box">
            <div class="stat-value">${progress.completedItems}</div>
            <div class="stat-label">Completed</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${progress.totalItems - progress.completedItems}</div>
            <div class="stat-label">Remaining</div>
          </div>
          <div class="stat-box">
            <div class="stat-value">${progress.totalItems}</div>
            <div class="stat-label">Total Items</div>
          </div>
          <div class="stat-box stat-percentage">
            <div class="stat-value">${progress.percentage}%</div>
            <div class="stat-label">Complete</div>
          </div>
        </div>
        
        <div class="progress-bar-container">
          <div class="progress-bar-fill" style="width: ${progress.percentage}%"></div>
          <div class="progress-bar-text">${progress.percentage}% Complete</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="checklist-actions">
        <button class="btn-save-progress" id="saveChecklistProgress">
          💾 Save Progress
        </button>
        <button class="btn-export-checklist" id="exportChecklist">
          📥 Export Checklist
        </button>
        <button class="btn-reset-checklist" id="resetChecklist">
          🔄 Reset All
        </button>
      </div>

      <!-- Phases -->
      ${checklist.phases.map(phase => {
        const phaseProgress = calculatePhaseProgress(phase);
        return `
          <div class="phase-section" style="border-left-color: ${phase.color}">
            <div class="phase-header">
              <div class="phase-info">
                <h2>${phase.name}</h2>
                <span class="phase-duration">${phase.duration}</span>
              </div>
              <div class="phase-progress">
                <span class="phase-progress-text">${phaseProgress.completed}/${phaseProgress.total} items</span>
                <div class="phase-progress-bar">
                  <div class="phase-progress-fill" style="width: ${phaseProgress.percentage}%; background: ${phase.color}"></div>
                </div>
              </div>
            </div>

            <!-- Categories within Phase -->
            ${phase.categories.map(category => {
              const categoryProgress = calculateCategoryProgress(category);
              return `
                <div class="category-section">
                  <div class="category-header">
                    <h3>${category.name}</h3>
                    <span class="category-progress">${categoryProgress.completed}/${categoryProgress.total}</span>
                  </div>
                  
                  <!-- Checklist Items -->
                  <div class="checklist-items">
                    ${category.items.map(item => `
                      <div class="checklist-item ${item.completed ? 'completed' : ''}">
                        <label class="checkbox-container">
                          <input 
                            type="checkbox" 
                            class="checklist-checkbox" 
                            data-item-id="${item.id}"
                            ${item.completed ? 'checked' : ''}
                          />
                          <span class="checkbox-custom"></span>
                          <span class="item-text">${item.text}</span>
                        </label>
                        <div class="success-criteria">
                          <strong>Success Criteria:</strong> ${item.successCriteria}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      }).join('')}

      <!-- Summary Footer -->
      <div class="checklist-footer">
        <h3>📊 Implementation Summary</h3>
        <p>This checklist is based on stakeholder feedback from ${State.responses.length} responses across 11 departments. Each item addresses specific pain points and requirements identified during the discovery phase.</p>
        <p><strong>Remember:</strong> Check items as you complete them and save your progress regularly. The system will track your implementation journey.</p>
      </div>

    </div>
  `;
}

// Helper function to calculate phase progress
function calculatePhaseProgress(phase) {
  let total = 0;
  let completed = 0;
  
  phase.categories.forEach(category => {
    category.items.forEach(item => {
      total++;
      if (item.completed) completed++;
    });
  });
  
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}

// Helper function to calculate category progress
function calculateCategoryProgress(category) {
  let total = category.items.length;
  let completed = category.items.filter(item => item.completed).length;
  
  return {
    total,
    completed,
    percentage: total > 0 ? Math.round((completed / total) * 100) : 0
  };
}

// Apply saved progress to checklist
function applyChecklistProgress(checklist, savedProgress) {
  checklist.phases.forEach(phase => {
    phase.categories.forEach(category => {
      category.items.forEach(item => {
        if (savedProgress[item.id] !== undefined) {
          item.completed = savedProgress[item.id];
        }
      });
    });
  });
}

// Save checklist progress to GitHub
async function saveChecklistProgress() {
  const checkboxes = document.querySelectorAll('.checklist-checkbox');
  const progress = {};
  
  checkboxes.forEach(checkbox => {
    progress[checkbox.dataset.itemId] = checkbox.checked;
  });
  
  // Save to state
  State.checklistProgress = progress;
  
  // Save to GitHub
  try {
    const timestamp = new Date().toISOString();
    const progressData = {
      lastUpdated: timestamp,
      progress: progress
    };
    
    await GitHub.saveFile(
      'checklist-progress.json',
      JSON.stringify(progressData, null, 2),
      'Update implementation checklist progress'
    );
    
    alert('✅ Progress saved successfully!');
    render();
  } catch (error) {
    console.error('Error saving progress:', error);
    alert('❌ Error saving progress. Please try again.');
  }
}

// Export checklist to Word document
function exportChecklistToWord() {
  const checklist = ImplementationChecklist.generateChecklist(State.responses, State.analyticsData);
  
  if (State.checklistProgress) {
    applyChecklistProgress(checklist, State.checklistProgress);
  }
  
  const progress = ImplementationChecklist.calculateProgress(checklist);
  const timestamp = new Date().toISOString().split('T')[0];
  
  let html = `
<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
  <meta charset='utf-8'>
  <title>Implementation Checklist</title>
  <style>
    body {
      font-family: 'Calibri', 'Arial', sans-serif;
      font-size: 11pt;
      line-height: 1.6;
      color: #333;
    }
    h1 {
      font-size: 20pt;
      font-weight: bold;
      color: #2563EB;
      border-bottom: 3px solid #2563EB;
      padding-bottom: 10px;
    }
    h2 {
      font-size: 16pt;
      font-weight: bold;
      color: #1E40AF;
      margin-top: 25px;
    }
    h3 {
      font-size: 13pt;
      font-weight: bold;
      color: #475569;
      margin-top: 20px;
    }
    .progress-box {
      background: #EFF6FF;
      border: 2px solid #2563EB;
      padding: 15px;
      margin: 20px 0;
      text-align: center;
    }
    .checklist-item {
      margin: 10px 0;
      padding: 10px;
      background: #F8FAFC;
      border-left: 4px solid #CBD5E1;
    }
    .checklist-item.completed {
      background: #D1FAE5;
      border-left-color: #10B981;
    }
    .checkbox {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #333;
      margin-right: 10px;
      vertical-align: middle;
    }
    .checkbox.checked {
      background: #10B981;
      position: relative;
    }
    .checkbox.checked::after {
      content: '✓';
      color: white;
      font-weight: bold;
      position: absolute;
      left: 2px;
      top: -2px;
    }
    .success-criteria {
      margin-left: 30px;
      font-size: 10pt;
      color: #64748B;
      font-style: italic;
    }
  </style>
</head>
<body>
  <h1>🎯 IT Implementation Checklist & Success Criteria</h1>
  <p><strong>Report Date:</strong> ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  
  <div class="progress-box">
    <h3>Overall Progress</h3>
    <p style="font-size: 24pt; font-weight: bold; color: #2563EB; margin: 10px 0;">${progress.percentage}%</p>
    <p>${progress.completedItems} of ${progress.totalItems} items completed</p>
  </div>

  ${checklist.phases.map(phase => {
    const phaseProgress = calculatePhaseProgress(phase);
    return `
      <div style="page-break-before: always;">
        <h2>${phase.name} (${phase.duration})</h2>
        <p><strong>Progress:</strong> ${phaseProgress.completed}/${phaseProgress.total} items (${phaseProgress.percentage}%)</p>
        
        ${phase.categories.map(category => `
          <h3>${category.name}</h3>
          ${category.items.map(item => `
            <div class="checklist-item ${item.completed ? 'completed' : ''}">
              <div>
                <span class="checkbox ${item.completed ? 'checked' : ''}"></span>
                <strong>${item.text}</strong>
              </div>
              <div class="success-criteria">
                Success Criteria: ${item.successCriteria}
              </div>
            </div>
          `).join('')}
        `).join('')}
      </div>
    `;
  }).join('')}

  <div style="margin-top: 60px; padding-top: 20px; border-top: 2px solid #E2E8F0; text-align: center; color: #94A3B8; font-size: 9pt;">
    <p>Implementation Checklist - Hyperfeeds Digital Transformation</p>
    <p>Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
  </div>
</body>
</html>
  `;
  
  const blob = new Blob(['\ufeff', html], {
    type: 'application/msword'
  });
  
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Hyperfeeds_Implementation_Checklist_' + timestamp + '.doc';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Reset checklist
function resetChecklistProgress() {
  if (confirm('Are you sure you want to reset all checklist items? This cannot be undone.')) {
    State.checklistProgress = {};
    render();
  }
}
