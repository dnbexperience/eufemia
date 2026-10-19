import path from 'node:path'
import vm from 'node:vm'
// @ts-expect-error Vite requires a newer module-resolution mode than the
// package's legacy typecheck; Vitest still resolves it through Vite itself.
import { build } from 'vite'

describe('HeadingCounter', () => {
  it('collects reports only outside of production in browser bundles, where there is no process global', async () => {
    // Bundlers replace process.env.NODE_ENV, but browsers have no process global
    const countReportsInBrowserBundle = async (nodeEnv: string) => {
      const result = await build({
        configFile: false,
        logLevel: 'silent',
        define: { 'process.env.NODE_ENV': JSON.stringify(nodeEnv) },
        build: {
          write: false,
          minify: false,
          lib: {
            entry: path.resolve(__dirname, '../HeadingCounter.ts'),
            formats: ['iife'],
            name: 'HeadingCounter',
          },
          rollupOptions: {
            external: (id: string) => id.includes('HeadingHelpers'),
            output: { globals: () => 'HeadingHelpers' },
          },
        },
      })
      const [output] = Array.isArray(result) ? result : [result]

      return vm.runInNewContext(
        `${output.output[0].code}
        const counter = new HeadingCounter.Counter()
        counter.report('message')
        counter.reports.length`,
        { HeadingHelpers: {} }
      )
    }

    expect(await countReportsInBrowserBundle('development')).toBe(1)
    expect(await countReportsInBrowserBundle('production')).toBe(0)
  })
})
