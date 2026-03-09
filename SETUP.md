# GitHub Token Setup

To enable survey submissions and admin dashboard functionality, you need to configure your GitHub Personal Access Token in the browser.

## One-Time Setup (Do this once)

1. **Open the live site**: https://jkaseke1.github.io/hyperfeeds-survey/

2. **Open Browser Console**:
   - Press `F12` or `Ctrl+Shift+J` (Windows/Linux)
   - Or right-click → "Inspect" → "Console" tab

3. **Run this command** (replace YOUR_TOKEN with your actual token, paste and press Enter):
   ```javascript
   setGitHubToken('YOUR_TOKEN_HERE')
   ```

4. **Verify it worked**:
   ```javascript
   getGitHubToken()
   ```
   You should see your token displayed.

5. **Close the console** - you're done! The token is now stored in your browser's localStorage.

## How It Works

- The token is stored **only in your browser** (localStorage)
- It's **never** sent to GitHub's public repository
- It persists across page refreshes
- Only you (the admin) need to configure it
- Stakeholders filling out surveys don't need any setup

## Testing

1. Fill out a test survey
2. Check https://github.com/Jkaseke1/hyperfeeds-stakeholder-responses/issues
3. You should see a new issue created with the survey response

## Admin Dashboard

- Click "Admin" button
- Password: `hyperfeeds2026`
- View analytics and all responses

## Security Note

The token is stored in your browser's localStorage. Only configure it on your personal computer, not on shared/public computers.
