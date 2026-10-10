import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

const API_PREFIX = '/api/atlas'

// Proxy /api/atlas/* to the AtlasVision API, injecting the bearer key
// server-side so it never reaches the browser (the upstream API enables no
// CORS, so the playground must call a same-origin path in dev and preview).
function atlasApiProxy({ baseUrl, apiKey }) {
  const handle = async (req, res, next) => {
    const url = req.url || ''
    if (!url.startsWith(API_PREFIX + '/')) return next()

    const target = baseUrl + url.slice(API_PREFIX.length)
    const method = req.method || 'GET'

    // Forward the request body untouched (multipart with its boundary).
    const chunks = []
    for await (const chunk of req) chunks.push(chunk)
    const body = chunks.length ? Buffer.concat(chunks) : undefined

    const headers = {}
    const contentType = req.headers['content-type']
    if (contentType) headers['content-type'] = contentType
    if (apiKey) headers['authorization'] = `Bearer ${apiKey}`

    try {
      // The API redirects requests that run >150s; fetch follows by default.
      // 600s matches the documented cold-start budget.
      const upstream = await fetch(target, {
        method,
        headers,
        body,
        redirect: 'follow',
        signal: AbortSignal.timeout(600_000),
      })
      const text = await upstream.text()
      res.statusCode = upstream.status
      res.setHeader('content-type', upstream.headers.get('content-type') || 'application/json')
      res.end(text)
    } catch (err) {
      res.statusCode = 504
      res.setHeader('content-type', 'application/json')
      res.end(JSON.stringify({ detail: `Atlas API proxy error: ${err.message}` }))
    }
  }

  return {
    name: 'atlas-api-proxy',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      atlasApiProxy({
        baseUrl:
          env.ATLAS_API_BASE ||
          'https://chimajoy7172--atlasvision-atlasvisionapi-web.modal.run',
        apiKey: env.ATLAS_API_KEY || '',
      }),
    ],
  }
})
