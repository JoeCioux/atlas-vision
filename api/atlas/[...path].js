export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const baseUrl = (process.env.ATLAS_API_BASE || 'https://chimajoy7172--atlasvision-atlasvisionapi-web.modal.run').replace(/\/$/, '');
  const apiKey = process.env.ATLAS_API_KEY || '';

  const url = req.url || '';
  const prefix = '/api/atlas';
  let path = url.startsWith(prefix) ? url.slice(prefix.length) : url;
  if (!path.startsWith('/')) path = '/' + path;

  const target = baseUrl + path;

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = chunks.length ? Buffer.concat(chunks) : undefined;

  const headers = {};
  if (req.headers['content-type']) {
    headers['content-type'] = req.headers['content-type'];
  }
  if (apiKey) {
    headers['authorization'] = `Bearer ${apiKey}`;
  }

  try {
    const upstream = await fetch(target, {
      method: req.method || 'POST',
      headers,
      body,
      redirect: 'follow',
    });

    const text = await upstream.text();
    res.statusCode = upstream.status;
    res.setHeader('content-type', upstream.headers.get('content-type') || 'application/json');
    return res.end(text);
  } catch (err) {
    res.statusCode = 504;
    res.setHeader('content-type', 'application/json');
    return res.end(JSON.stringify({ detail: `Atlas Vercel proxy error: ${err.message}` }));
  }
}
