// pages/api/proxy.js

export default async function handler(req, res) {
  const { id, url } = req.query;
  const rd_url = 'http://' + process.env.RD_URL;
  const apiToken = process.env.RD_TOKEN;
  const apiUrl = url ? url : `${rd_url}/api/46/execution/${id}/output`;
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'text/json',
        'X-Rundeck-Auth-Token': apiToken,
        'Content-Type': 'text/html',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();

    const logHtmlArray = data.entries.map((entry) => {
      if (entry.loghtml) {
        return entry.loghtml;
      } else {
        // Add an additional empty line when using log
        return entry.log + '\n';
      }
    });
    res.status(200).json({ logHtmlArray });
  } catch (error) {
    res.status(500).json({ error : 'Internal Server Error' });
  }
}

