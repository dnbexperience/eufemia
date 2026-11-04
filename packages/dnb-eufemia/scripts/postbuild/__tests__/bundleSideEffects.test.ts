import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { JSDOM } from 'jsdom'
import { build } from 'vite'

const packageRoot = path.resolve(__dirname, '../../..')

// Import a re-exported helper so retaining setup does not depend on using
// a function defined in component-helper itself. Run after publish:prepare.
it.each([
  ['root ESM', ''],
  ['es ESM', 'es/'],
])(
  'preserves import-time setup in a production %s bundle',
  async (_, prefix) => {
    const entry = path.join(
      packageRoot,
      `build/${prefix}shared/component-helper.js`
    )
    const result = await build({
      configFile: false,
      root: packageRoot,
      logLevel: 'warn',
      define: { 'process.env.NODE_ENV': JSON.stringify('production') },
      plugins: [
        {
          name: 'setup-test-entry',
          resolveId(id) {
            if (id === 'virtual:setup-test') {
              return '\0virtual:setup-test'
            }
            return null
          },
          load(id) {
            if (id === '\0virtual:setup-test') {
              return `import { warn } from ${JSON.stringify(entry)}; globalThis.testWarn = warn;`
            }
            return null
          },
        },
      ],
      build: {
        write: false,
        minify: true,
        rolldownOptions: {
          input: 'virtual:setup-test',
          output: { format: 'iife' },
        },
      },
    })
    if (Array.isArray(result) || !('output' in result)) {
      throw new Error('Expected a single production bundle')
    }
    const chunks = result.output.filter((file) => file.type === 'chunk')
    expect(chunks).toHaveLength(1)
    const code = chunks[0].code
    expect(code.length).toBeGreaterThan(0)

    // The same bundled entry must also remain safe to load without a DOM.
    const sandbox = { testWarn: undefined }
    runInNewContext(code, sandbox)
    expect(sandbox.testWarn).toBeTypeOf('function')

    const dom = new JSDOM('<!doctype html><button>Test</button>', {
      runScripts: 'outside-only',
      url: 'http://localhost',
    })
    const { window } = dom
    Object.defineProperty(window.navigator, 'platform', {
      value: 'Win32',
    })
    try {
      window.eval(code)
      await vi.waitFor(() => {
        expect(
          window.document.documentElement.getAttribute('data-whatinput')
        ).toBe('initial')
        expect(
          window.document.documentElement.getAttribute('data-os')
        ).toBe('win')
      })
      const html = window.document.documentElement
      expect(window.Eufemia).toBeDefined()
      expect(html.getAttribute('data-whatintent')).toBe('initial')

      window.document.querySelector('button').focus()
      window.dispatchEvent(
        new window.KeyboardEvent('keydown', { key: 'Tab' })
      )
      expect(html.getAttribute('data-whatinput')).toBe('keyboard')
      expect(html.getAttribute('data-whatintent')).toBe('keyboard')

      window.dispatchEvent(new window.MouseEvent('mousedown'))
      expect(html.getAttribute('data-whatinput')).toBe('mouse')
      expect(html.getAttribute('data-whatintent')).toBe('mouse')
    } finally {
      window.close()
    }
  }
)
