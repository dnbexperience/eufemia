import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { build } from 'vite'
import chunkLoadErrorHandlerPlugin from '../../client/plugins/chunk-load-error-handler'

describe('chunk load recovery HTML', () => {
  it('installs a classic inline handler before entry scripts and module preloads', async () => {
    const result = await build({
      configFile: false,
      root: path.resolve(__dirname, '../../client'),
      publicDir: false,
      logLevel: 'silent',
      plugins: [
        {
          name: 'recovery-test-entry',
          load(id) {
            if (id.endsWith('/entry.tsx')) {
              return 'window.entryRan = true'
            }
          },
        },
        chunkLoadErrorHandlerPlugin(),
      ],
      build: { write: false },
    })
    if (!('output' in result)) {
      throw new Error('Expected the test HTML bundle')
    }
    const html = result.output.find(
      (item) => item.fileName === 'index.html'
    )
    expect(html?.type).toBe('asset')
    if (html?.type !== 'asset') {
      return
    }
    const document = new DOMParser().parseFromString(
      String(html.source),
      'text/html'
    )
    const script = document.head.querySelector('script')
    expect(document.head.firstElementChild.tagName).toBe('META')
    expect(document.head.firstElementChild.getAttribute('charset')).toBe(
      'UTF-8'
    )
    expect(script.getAttribute('type')).toBeNull()
    expect(script.getAttribute('src')).toBeNull()
    expect(script.textContent).toContain('vite:preloadError')
    expect(
      document.head.querySelector('script, link[rel="modulepreload"]')
    ).toBe(script)

    // A classic script must parse and install without the module entry.
    const isolatedWindow = new EventTarget()
    const run = new Function('window', script.textContent)
    expect(() => run(isolatedWindow)).not.toThrow()
  })
})
