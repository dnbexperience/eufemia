import path from 'node:path'
import { build, type Plugin } from 'vite'
import buildTargets from '@dnb/browserslist-config/buildTargets.mjs'

export default function chunkLoadErrorHandlerPlugin(): Plugin {
  return {
    name: 'portal-chunk-load-error-handler',
    transformIndexHtml: {
      order: 'post',
      async handler(html) {
        const result = await build({
          configFile: false,
          publicDir: false,
          logLevel: 'silent',
          build: {
            write: false,
            minify: true,
            target: buildTargets,
            lib: {
              entry: path.resolve(
                __dirname,
                '../chunk-load-error-handler.ts'
              ),
              name: 'portalChunkRecovery',
              formats: ['iife'],
            },
          },
        })
        const bundle = Array.isArray(result) ? result[0] : result
        if (!('output' in bundle)) {
          throw new Error('Expected the Portal chunk recovery bundle')
        }
        const chunk = bundle.output.find((item) => item.type === 'chunk')

        const script = `<script>(function(){${chunk.code};portalChunkRecovery.setupChunkLoadErrorHandler()})()</script>`

        // Keep the charset first, then install before module scripts and preloads.
        return html.replace(
          /<meta charset="UTF-8"\s*\/>/i,
          (charset) => `${charset}\n${script}`
        )
      },
    },
  }
}
