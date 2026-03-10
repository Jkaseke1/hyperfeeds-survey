// ============================================================
// GITHUB ISSUES API — Store and retrieve survey responses
// ============================================================

// Get GitHub token from localStorage or config
function getGitHubToken() {
  return localStorage.getItem('github_token') || CONFIG.GITHUB_TOKEN;
}

// Set GitHub token in localStorage
function setGitHubToken(token) {
  localStorage.setItem('github_token', token);
  CONFIG.GITHUB_TOKEN = token;
}

const GitHub = {
  async submitResponse(department, respondentName, respondentRole, answers) {
    const { GITHUB_OWNER, GITHUB_REPO } = CONFIG;
    const GITHUB_TOKEN = getGitHubToken();

    if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
      throw new Error("GitHub is not configured. Please update config.js with your repo details and token.");
    }

    const dept = DEPARTMENTS.find(d => d.id === department);
    const timestamp = new Date().toISOString();

    const bodyLines = [
      `**Department:** ${dept.name}`,
      `**Respondent:** ${respondentName}`,
      `**Role/Title:** ${respondentRole}`,
      `**Submitted:** ${timestamp}`,
      ``,
      `---`,
      ``,
      `## Responses`,
      ``
    ];

    dept.questions.forEach((q, i) => {
      const answer = answers[q.id] || "_No answer provided_";
      const displayAnswer = Array.isArray(answer) ? answer.join(", ") : answer;
      bodyLines.push(`### Q${i + 1}: ${q.label}`);
      bodyLines.push(`${displayAnswer}`);
      bodyLines.push(``);
    });

    bodyLines.push(`---`);
    bodyLines.push(`_Submitted via Hyperfeeds Stakeholder Discovery System_`);

    const payload = {
      title: `[${dept.name}] ${respondentName} — ${respondentRole} (${new Date().toLocaleDateString()})`,
      body: bodyLines.join("\n"),
      labels: ["stakeholder-response", department]
    };

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues`,
      {
        method: "POST",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "GitHub API error");
    }

    return await response.json();
  },

  async fetchResponses() {
    const { GITHUB_OWNER, GITHUB_REPO } = CONFIG;
    const GITHUB_TOKEN = getGitHubToken();

    if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
      throw new Error("GitHub is not configured.");
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues?labels=stakeholder-response&state=open&per_page=100`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json"
        }
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "GitHub API error");
    }

    return await response.json();
  },

  parseIssueToResponse(issue) {
    const titleMatch = issue.title.match(/^\[(.+?)\] (.+?) — (.+?) \((.+?)\)$/);
    return {
      id: issue.number,
      url: issue.html_url,
      department: titleMatch ? titleMatch[1] : "Unknown",
      respondent: titleMatch ? titleMatch[2] : "Unknown",
      role: titleMatch ? titleMatch[3] : "Unknown",
      date: titleMatch ? titleMatch[4] : issue.created_at,
      createdAt: issue.created_at,
      body: issue.body,
      labels: issue.labels.map(l => l.name)
    };
  },

  async deleteResponse(issueNumber) {
    const { GITHUB_OWNER, GITHUB_REPO } = CONFIG;
    const GITHUB_TOKEN = getGitHubToken();

    if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
      throw new Error("GitHub is not configured.");
    }

    // Close the issue (GitHub doesn't allow permanent deletion via API)
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          state: "closed",
          labels: ["deleted"]
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to delete response");
    }

    return await response.json();
  },

  async updateResponse(issueNumber, title, body) {
    const { GITHUB_OWNER, GITHUB_REPO } = CONFIG;
    const GITHUB_TOKEN = getGitHubToken();

    if (!GITHUB_OWNER || !GITHUB_REPO || !GITHUB_TOKEN) {
      throw new Error("GitHub is not configured.");
    }

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${issueNumber}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ title, body })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.message || "Failed to update response");
    }

    return await response.json();
  }
};
