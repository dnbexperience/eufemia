import type { Plugin } from 'vite'

/**
 * Dev-only `/collect` endpoint that logs received page-view beacons, so the
 * tracking pipeline can be exercised locally (same-origin, no CORS) without
 * the real analytics collector. Not part of production builds.
 */
export default function analyticsCollectDevPlugin(): Plugin {
  return {
    name: 'analytics-collect-dev',
    apply: 'serve',

    configureServer(server) {
      server.middlewares.use('/collect', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }

        const chunks: Buffer[] = []
        req.on('data', (chunk) => chunks.push(chunk))
        req.on('end', () => {
          const body = Buffer.concat(chunks).toString('utf8')
          server.config.logger.info(`[analytics] /collect ${body}`)

          res.statusCode = 202
          res.setHeader('Content-Type', 'application/json')
          res.end('{"accepted":true}')
        })
      })
    },
  }
}
