# Trading Command Center — Live Analytics Dashboard

## Deploy to Vercel (3 steps)

### Step 1: Push to GitHub
1. Create a new repository on github.com (e.g. "trading-dashboard")
2. Upload ALL files from this folder maintaining the structure:
   ```
   trading-dashboard/
   ├── public/
   │   └── index.html        ← The dashboard
   ├── api/
   │   └── notion.js          ← The Notion API proxy
   ├── vercel.json             ← Vercel config
   ├── package.json
   └── README.md
   ```

### Step 2: Deploy on Vercel
1. Go to vercel.com and sign up (free) with your GitHub account
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Deploy" — no settings to change, it works out of the box
5. Vercel gives you a URL like: https://trading-dashboard-xyz.vercel.app

### Step 3: Connect Notion
1. Go to notion.so/profile/integrations → Create new integration
2. Name it "Trading Dashboard", copy the secret token
3. Open your Trade Log in Notion → ... menu → Connections → Add your integration
4. Copy the database ID from the Notion URL
5. Open your Vercel dashboard URL
6. Paste token + database ID → Click Connect
7. Your live analytics appear!

## How it works
- Student opens the dashboard URL
- Enters their Notion integration token + Trade Log database ID
- Dashboard calls YOUR Vercel proxy (/api/notion)
- Proxy calls Notion API server-side (no CORS issues)
- Data returns → charts render with their real trade data
- Credentials saved in browser localStorage for next visit
