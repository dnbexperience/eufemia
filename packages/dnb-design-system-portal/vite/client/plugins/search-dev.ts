import type { Plugin } from 'vite'
import type { SearchRecord } from '../../search/search-records.ts'

/** Use the new corpus locally without changing a hosted Algolia index. */
export default function searchDevPlugin(): Plugin {
  return {
    name: 'portal-search-dev',
    apply: 'serve',
    configureServer(server) {
      let records: Promise<SearchRecord[]> | undefined
      server.watcher.on('all', (_event, file) => {
        if (/\.(mdx|tsx?)$/.test(file)) {
          records = undefined
        }
      })
      server.middlewares.use('/_search', async (req, res) => {
        try {
          const params = new URL(req.url, 'http://localhost').searchParams
          const query = params.get('q') ?? ''
          const requestedPlatform = params.get('platform')
          const platform =
            requestedPlatform === 'ios' || requestedPlatform === 'android'
              ? requestedPlatform
              : 'web'
          const { generateSearchRecords } =
            await import('../../search/generate-search-records.ts')
          const { searchRecords } =
            await import('../../search/search-records.ts')
          records ??= generateSearchRecords()
          const currentRecords = records
          const corpus = await currentRecords.catch((error) => {
            if (records === currentRecords) {
              records = undefined
            }
            throw error
          })
          const result = searchRecords(
            corpus,
            query.slice(0, 200),
            platform
          )
          res.setHeader('Content-Type', 'application/json')
          res.setHeader('Cache-Control', 'no-store')
          res.end(JSON.stringify(result))
        } catch (error) {
          server.config.logger.error(String(error))
          res.statusCode = 500
          res.end('Search index generation failed')
        }
      })
    },
  }
}
