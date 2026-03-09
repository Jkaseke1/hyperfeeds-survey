# Hyperfeeds Stakeholder Discovery System

A web-based survey system for collecting stakeholder input during the Hyperfeeds digital transformation initiative.

## Features
- Department-specific surveys for all 7 departments
- Responses stored as GitHub Issues (searchable, filterable, permanent)
- Admin dashboard to view all responses by department
- Mobile-friendly, no server required

## Departments Covered
- Procurement
- Production / Manufacturing
- Raw Material Warehouse
- Finished Goods Warehouse & Dispatch
- Branch Sales (all 18 branches)
- Finance & Accounting
- Senior Management

## Setup Instructions

### Step 1 — Create a GitHub Repository
1. Go to [github.com](https://github.com) and log in
2. Create a **new repository** (e.g. `hyperfeeds-stakeholder-responses`)
3. Set it to **Private** so only you can see responses

### Step 2 — Create a Personal Access Token
1. Go to GitHub → Settings → Developer Settings → Personal Access Tokens → Tokens (classic)
2. Click **Generate new token**
3. Give it a name: `hyperfeeds-survey`
4. Select scope: **`repo`** (full repository access)
5. Click **Generate token** and copy it — you won't see it again

### Step 3 — Create the Labels
In your new GitHub repo, go to **Issues → Labels** and create these labels:
- `stakeholder-response`
- `procurement`
- `production`
- `warehouse_rm`
- `warehouse_fg`
- `sales_branches`
- `finance`
- `management`

### Step 4 — Configure the App
Open `config.js` and fill in your details:

```js
const CONFIG = {
  GITHUB_OWNER: "your-github-username",
  GITHUB_REPO: "hyperfeeds-stakeholder-responses",
  GITHUB_TOKEN: "ghp_your_token_here",
  ADMIN_PASSWORD: "your-secure-password",
};
```

### Step 5 — Run the App
Open `index.html` in any browser — no build step, no server required.

Or deploy to any static host (Netlify, GitHub Pages, Vercel).

## Security Note
- The GitHub token is embedded in the frontend `config.js`. For internal use on a trusted network this is acceptable.
- For public-facing deployment, use a backend proxy to hide the token.
- Change `ADMIN_PASSWORD` to something strong.

## How Responses Are Stored
Each survey submission creates a **GitHub Issue** in your repo with:
- A structured title: `[Department] Name — Role (Date)`
- Labels: `stakeholder-response` + department name
- Full formatted answers in the issue body
- Permanent, searchable, exportable

---
*Hyperfeeds Digital Transformation Initiative — 2026*
