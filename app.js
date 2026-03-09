// ============================================================
// HYPERFEEDS STAKEHOLDER DISCOVERY SYSTEM — Main Application
// ============================================================

// ---- STATE ----
const State = {
  view: "home",           // home | survey | admin | success
  activeDept: null,
  adminUnlocked: false,
  responses: [],
  loadingResponses: false,
  submitting: false,
  error: null,
  filterDept: "all",
  selectedResponse: null,
  adminTab: "analytics",  // analytics | responses
  analyticsData: null,
};

// ---- HELPERS ----
function el(id) { return document.getElementById(id); }

function render() {
  const app = el("app");
  switch (State.view) {
    case "home":    app.innerHTML = renderHome(); break;
    case "survey":  app.innerHTML = renderSurvey(); break;
    case "admin":   app.innerHTML = renderAdmin(); break;
    case "success": app.innerHTML = renderSuccess(); break;
  }
  attachEvents();
}

function formatDate(iso) {
  return new Date(iso).toLocaleString("en-ZA", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit"
  });
}

// ---- HOME VIEW ----
function renderHome() {
  const deptCards = DEPARTMENTS.map(d => `
    <div class="dept-card" data-dept="${d.id}" style="--dept-color:${d.color}">
      <div class="dept-icon">${d.icon}</div>
      <div class="dept-info">
        <h3>${d.name}</h3>
        <p>${d.description}</p>
        <span class="question-count">${d.questions.length} questions</span>
      </div>
      <button class="btn-start" data-dept="${d.id}">Start Survey →</button>
    </div>
  `).join("");

  return `
    <div class="page home-page-compact">
      <header class="site-header-compact">
        <div class="header-inner-compact">
          <div class="logo-compact">
            <img src="logo.png.jpeg" alt="Hyperfeeds Animal Nutrition" class="header-logo-compact" />
            <div class="logo-text-fallback" style="display:none">
              <div class="logo-text-badge">HF</div>
              <div>
                <span class="logo-text-name">hyper<strong>feeds</strong></span>
                <span class="logo-text-tagline">ANIMAL NUTRITION</span>
              </div>
            </div>
          </div>
          <div class="header-title">
            <h1>Stakeholder Discovery Survey</h1>
            <p>Digital Transformation Initiative 2026 • Select your department below</p>
          </div>
          <button class="btn-admin-compact" id="adminBtn">Admin</button>
        </div>
      </header>

      <main class="main-compact">
        <div class="dept-grid-compact">${deptCards}</div>
      </main>
    </div>
  `;
}

// ---- SURVEY VIEW ----
function renderSurvey() {
  const dept = DEPARTMENTS.find(d => d.id === State.activeDept);
  if (!dept) return renderHome();

  const lastIdx = dept.questions.length - 1;
  const questions = dept.questions.map((q, i) => `
    <div class="question-card${i === lastIdx ? " catchall" : ""}" id="qcard-${q.id}">
      <div class="q-number">${i === lastIdx ? "💬 Anything else?" : `Q${i + 1}`}</div>
      <label class="q-label">${q.label}</label>
      ${renderInput(q)}
    </div>
  `).join("");

  return `
    <div class="page survey-page">
      <header class="site-header">
        <div class="header-inner">
          <button class="btn-back" id="backBtn">← Back</button>
          <div class="logo">
            <img src="logo.png.jpeg" alt="Hyperfeeds Animal Nutrition" class="header-logo" />
            <span class="logo-sub header-sub">Stakeholder Discovery</span>
          </div>
          <div></div>
        </div>
      </header>

      <div class="survey-container">
        <div class="survey-header" style="--dept-color:${dept.color}">
          <span class="survey-dept-icon">${dept.icon}</span>
          <div>
            <h2>${dept.name} Department</h2>
            <p>${dept.description}</p>
          </div>
        </div>

        <form id="surveyForm" class="survey-form">
          <div class="respondent-section">
            <h3>Your Details</h3>
            <div class="form-row">
              <div class="form-group">
                <label>Full Name *</label>
                <input type="text" id="respondentName" placeholder="e.g. John Smith" required />
              </div>
              <div class="form-group">
                <label>Job Title / Role *</label>
                <input type="text" id="respondentRole" placeholder="e.g. Procurement Manager" required />
              </div>
            </div>
          </div>

          <div class="questions-list">${questions}</div>

          ${State.error ? `<div class="error-banner">${State.error}</div>` : ""}

          <div class="form-actions">
            <button type="button" class="btn-secondary" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn-primary" id="submitBtn" ${State.submitting ? "disabled" : ""}>
              ${State.submitting ? '<span class="spinner"></span> Submitting...' : "Submit Survey →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

function renderInput(q) {
  switch (q.type) {
    case "text":
      return `<input type="text" class="q-input" name="${q.id}" placeholder="Your answer..." />`;

    case "textarea":
      return `<textarea class="q-textarea" name="${q.id}" rows="4" placeholder="Your answer..."></textarea>`;

    case "select":
      const opts = q.options.map(o => `<option value="${o}">${o}</option>`).join("");
      return `<select class="q-select" name="${q.id}"><option value="">— Select an option —</option>${opts}</select>`;

    case "scale":
      const nums = [1,2,3,4,5].map(n => `
        <label class="scale-label">
          <input type="radio" name="${q.id}" value="${n}" />
          <span class="scale-btn">${n}</span>
        </label>
      `).join("");
      return `<div class="scale-group">${nums}<span class="scale-hint">1 = Low &nbsp;|&nbsp; 5 = High</span></div>`;

    case "multicheck":
      const checks = q.options.map(o => `
        <label class="check-label">
          <input type="checkbox" name="${q.id}" value="${o}" />
          <span>${o}</span>
        </label>
      `).join("");
      return `<div class="check-group">${checks}</div>`;

    default:
      return `<input type="text" class="q-input" name="${q.id}" />`;
  }
}

// ---- SUCCESS VIEW ----
function renderSuccess() {
  return `
    <div class="page success-page">
      <div class="success-card">
        <div class="success-icon">✅</div>
        <h2>Thank You!</h2>
        <p>Your survey response has been submitted successfully and saved to the Hyperfeeds discovery repository.</p>
        <p>Your input will directly inform the design of our new integrated manufacturing system.</p>
        <button class="btn-primary" id="homeBtn">← Back to Home</button>
      </div>
    </div>
  `;
}

// ---- ADMIN VIEW ----
function renderAdmin() {
  if (!State.adminUnlocked) {
    return `
      <div class="page admin-login-page">
        <div class="admin-login-card">
          <img src="logo.png.jpeg" alt="Hyperfeeds" class="admin-login-logo" />
          <div id="loginLogoFallback" class="login-logo-fallback" style="display:none">
            <div class="login-logo-badge">HF</div>
            <div>
              <span class="login-logo-name">hyper<strong>feeds</strong></span>
              <span class="login-logo-tagline">ANIMAL NUTRITION</span>
            </div>
          </div>
          <h2>Admin Dashboard</h2>
          <p>Enter the admin password to view survey responses.</p>
          ${State.error ? `<div class="error-banner">${State.error}</div>` : ""}
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="adminPass" placeholder="Enter admin password" />
          </div>
          <div class="form-row mt-1">
            <button class="btn-secondary" id="backBtn">← Back</button>
            <button class="btn-primary" id="adminLoginBtn">Unlock →</button>
          </div>
        </div>
      </div>
    `;
  }

  const deptFilters = `
    <button class="filter-btn ${State.filterDept === "all" ? "active" : ""}" data-filter="all">All</button>
    ${DEPARTMENTS.map(d => `
      <button class="filter-btn ${State.filterDept === d.id ? "active" : ""}" data-filter="${d.id}" style="--dept-color:${d.color}">
        ${d.icon} ${d.name}
      </button>
    `).join("")}
  `;

  const filtered = State.responses.filter(r =>
    State.filterDept === "all" || r.labels.includes(State.filterDept)
  );

  const responseCards = filtered.length === 0
    ? `<div class="empty-state">${State.loadingResponses ? '<span class="spinner large"></span> Loading responses...' : 'No responses found. Responses submitted via this form will appear here.'}</div>`
    : filtered.map(r => `
      <div class="response-card" data-id="${r.id}">
        <div class="response-header">
          <div class="response-dept">${getDeptIcon(r.labels)} <strong>${r.department}</strong></div>
          <div class="response-meta">${formatDate(r.createdAt)}</div>
        </div>
        <div class="response-person">
          <span class="person-name">${r.respondent}</span>
          <span class="person-role">${r.role}</span>
        </div>
        <div class="response-actions">
          <a href="${r.url}" target="_blank" class="btn-ghost">View on GitHub →</a>
          <button class="btn-outline" data-view="${r.id}">View Details</button>
        </div>
      </div>
    `).join("");

  const deptSummary = DEPARTMENTS.map(d => {
    const count = State.responses.filter(r => r.labels.includes(d.id)).length;
    return `
      <div class="summary-item" style="--dept-color:${d.color}">
        <span class="summary-icon">${d.icon}</span>
        <span class="summary-name">${d.name}</span>
        <span class="summary-count">${count}</span>
      </div>
    `;
  }).join("");

  const detailPanel = State.selectedResponse ? renderResponseDetail(State.selectedResponse) : "";

  return `
    <div class="page admin-page">
      <header class="site-header">
        <div class="header-inner">
          <button class="btn-back" id="backBtn">← Back to Home</button>
          <div class="logo">
            <img src="logo.png.jpeg" alt="Hyperfeeds Animal Nutrition" class="header-logo" />
            <span class="logo-sub header-sub">Admin Dashboard</span>
          </div>
          <button class="btn-refresh" id="refreshBtn">↻ Refresh</button>
        </div>
      </header>

      <div class="admin-container">
        <div class="admin-tabs">
          <button class="tab-btn ${State.adminTab === 'analytics' ? 'active' : ''}" data-tab="analytics">
            📊 Analytics & Insights
          </button>
          <button class="tab-btn ${State.adminTab === 'responses' ? 'active' : ''}" data-tab="responses">
            📝 Raw Responses (${State.responses.length})
          </button>
        </div>

        ${State.adminTab === 'analytics' ? renderAnalyticsDashboard() : `
          <div class="admin-summary">
            <div class="summary-total">
              <span class="total-num">${State.responses.length}</span>
              <span class="total-label">Total Responses</span>
            </div>
            <div class="summary-grid">${deptSummary}</div>
          </div>

          <div class="admin-filters">
            <span class="filter-label">Filter by Department:</span>
            ${deptFilters}
          </div>

          <div class="responses-grid">
            <div class="responses-list">${responseCards}</div>
            ${detailPanel}
          </div>
        `}
      </div>
    </div>
  `;
}

function getDeptIcon(labels) {
  const dept = DEPARTMENTS.find(d => labels.includes(d.id));
  return dept ? dept.icon : "📋";
}

function renderResponseDetail(response) {
  return `
    <div class="response-detail">
      <div class="detail-header">
        <h3>${response.respondent} — ${response.role}</h3>
        <button class="btn-close" id="closeDetail">✕</button>
      </div>
      <div class="detail-meta">
        <span>${response.department}</span>
        <span>${formatDate(response.createdAt)}</span>
      </div>
      <div class="detail-body">${formatBody(response.body)}</div>
      <a href="${response.url}" target="_blank" class="btn-primary mt-1">Open in GitHub →</a>
    </div>
  `;
}

function formatBody(body) {
  if (!body) return "<p>No content.</p>";
  return body
    .replace(/^### (.+)$/gm, '<h4>$1</h4>')
    .replace(/^## (.+)$/gm, '<h3>$1</h3>')
    .replace(/^\*\*(.+?)\*\*: (.+)$/gm, '<p><strong>$1:</strong> $2</p>')
    .replace(/^---$/gm, '<hr/>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^_(.+)_$/gm, '<em>$1</em>');
}

// ---- EVENT HANDLING ----
function attachEvents() {
  // Start survey
  document.querySelectorAll(".btn-start").forEach(btn => {
    btn.addEventListener("click", e => {
      State.activeDept = e.target.dataset.dept;
      State.error = null;
      State.view = "survey";
      render();
      window.scrollTo(0, 0);
    });
  });

  // Back buttons
  const backBtn = el("backBtn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      State.view = "home";
      State.error = null;
      if (!State.adminUnlocked) State.adminUnlocked = false;
      render();
    });
  }

  // Cancel survey
  const cancelBtn = el("cancelBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      State.view = "home";
      State.error = null;
      render();
    });
  }

  // Home button (success page)
  const homeBtn = el("homeBtn");
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      State.view = "home";
      render();
    });
  }

  // Admin button
  const adminBtn = el("adminBtn");
  if (adminBtn) {
    adminBtn.addEventListener("click", () => {
      State.view = "admin";
      State.error = null;
      render();
    });
  }

  // Admin login
  const adminLoginBtn = el("adminLoginBtn");
  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", () => {
      const pass = el("adminPass").value;
      if (pass === CONFIG.ADMIN_PASSWORD) {
        State.adminUnlocked = true;
        State.error = null;
        loadResponses();
      } else {
        State.error = "Incorrect password. Please try again.";
        render();
      }
    });
    const adminPass = el("adminPass");
    if (adminPass) {
      adminPass.addEventListener("keydown", e => {
        if (e.key === "Enter") adminLoginBtn.click();
      });
    }
  }

  // Refresh
  const refreshBtn = el("refreshBtn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadResponses);
  }

  // Admin tab switching
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      State.adminTab = e.target.dataset.tab;
      State.analyticsData = null; // Recalculate analytics
      render();
    });
  });

  // Export buttons
  const exportCSV = el("exportCSV");
  if (exportCSV) exportCSV.addEventListener("click", exportToCSV);
  
  const exportJSON = el("exportJSON");
  if (exportJSON) exportJSON.addEventListener("click", exportToJSON);
  
  const exportPDF = el("exportPDF");
  if (exportPDF) exportPDF.addEventListener("click", exportToPDF);

  // Dept filters
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      State.filterDept = e.target.dataset.filter;
      State.selectedResponse = null;
      render();
    });
  });

  // View response detail
  document.querySelectorAll("[data-view]").forEach(btn => {
    btn.addEventListener("click", e => {
      const id = parseInt(e.target.dataset.view);
      State.selectedResponse = State.responses.find(r => r.id === id);
      render();
    });
  });

  // Close detail
  const closeDetail = el("closeDetail");
  if (closeDetail) {
    closeDetail.addEventListener("click", () => {
      State.selectedResponse = null;
      render();
    });
  }

  // Survey form submission
  const surveyForm = el("surveyForm");
  if (surveyForm) {
    surveyForm.addEventListener("submit", async e => {
      e.preventDefault();
      await handleSubmit();
    });
  }
}

// ---- FORM SUBMISSION ----
async function handleSubmit() {
  const name = el("respondentName").value.trim();
  const role = el("respondentRole").value.trim();

  if (!name || !role) {
    State.error = "Please enter your full name and job title.";
    render();
    return;
  }

  const dept = DEPARTMENTS.find(d => d.id === State.activeDept);
  const answers = {};

  dept.questions.forEach(q => {
    if (q.type === "multicheck") {
      const checked = document.querySelectorAll(`input[name="${q.id}"]:checked`);
      answers[q.id] = Array.from(checked).map(c => c.value);
    } else if (q.type === "scale") {
      const selected = document.querySelector(`input[name="${q.id}"]:checked`);
      answers[q.id] = selected ? selected.value : "Not answered";
    } else {
      const input = document.querySelector(`[name="${q.id}"]`);
      answers[q.id] = input ? input.value.trim() : "";
    }
  });

  State.submitting = true;
  State.error = null;
  render();

  try {
    await GitHub.submitResponse(State.activeDept, name, role, answers);
    State.submitting = false;
    State.view = "success";
    render();
    window.scrollTo(0, 0);
  } catch (err) {
    State.submitting = false;
    State.error = `Submission failed: ${err.message}. Please check your GitHub configuration in config.js.`;
    render();
  }
}

// ---- LOAD RESPONSES ----
async function loadResponses() {
  State.loadingResponses = true;
  State.error = null;
  render();

  try {
    const issues = await GitHub.fetchResponses();
    State.responses = issues.map(GitHub.parseIssueToResponse);
    State.loadingResponses = false;
    render();
  } catch (err) {
    State.loadingResponses = false;
    State.error = `Failed to load responses: ${err.message}`;
    render();
  }
}

// ---- BOOT ----
render();
