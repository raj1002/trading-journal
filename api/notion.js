// File: api/notion.js
// Deploy this to Vercel alongside your dashboard HTML.
// It proxies requests to the Notion API, bypassing browser CORS restrictions.
//
// Setup:
// 1. Create a folder with: index.html (your dashboard) + api/notion.js (this file)
// 2. Run: npm i -g vercel && vercel deploy
// 3. Your dashboard will be at: https://your-app.vercel.app
// 4. The proxy will be at: https://your-app.vercel.app/api/notion
// 5. In the dashboard, select "Via Vercel proxy" and paste the proxy URL

export default async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();

  try {
    const { token, dbId, cursor } = req.body;

    if (!token || !dbId) {
      return res.status(400).json({ message: "Missing token or dbId" });
    }

    const body = {
      page_size: 100,
      sorts: [{ property: "Date", direction: "ascending" }],
    };
    if (cursor) body.start_cursor = cursor;

    const response = await fetch(
      `https://api.notion.com/v1/databases/${dbId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message || "Proxy error" });
  }
}
