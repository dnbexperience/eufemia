/**
 * Scripts test
 *
 */

import { loadScss } from '../../../../src/core/test-utils/testSetup'
import { getFontBasePath } from '../../../../src/plugins/postcss-font-url-rewrite/config'
import { runFactory } from '../makeMainStyle'
import { isCI } from 'repo-utils'

vi.mock('ora', () => {
  return {
    default: vi.fn(() => ({
      start: vi.fn(),
      info: vi.fn(),
      warn: vi.fn(),
      succeed: vi.fn(),
      fail: vi.fn(),
    })),
  }
})

// postcss-preset-env v11 is ESM-only; mock it with an ESM-shaped
// default export so the config resolves the plugin via `mod.default`.
vi.mock('postcss-preset-env', () => {
  const plugin = () => ({
    postcssPlugin: 'postcss-preset-env',
  })
  plugin.postcss = true
  return {
    __esModule: true,
    default: plugin,
  }
})

if (isCI) {
  vi.setConfig({ testTimeout: 50e3 })

  describe('makeMainStyle transforms "core" SCSS to CSS', () => {
    beforeAll(async () => {
      global.core = await runFactory('./src/style/dnb-ui-core.scss', {
        returnResult: true,
      })
    })

    it('has to have valid core css', () => {
      const css = loadScss(null, { data: global.core[0] })
      // @ts-expect-error - strictFunctionTypes
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to have correct core path to fonts', () => {
      expect(global.core[0]).not.toContain('/fonts/dnb/')
    })
  })

  describe('makeMainStyle transforms "components" SCSS to CSS', () => {
    beforeAll(async () => {
      global.components = await runFactory(
        './src/style/themes/ui/ui-theme-components.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/style/themes/ui/ui-theme-components.scss',
        {
          returnFiles: true,
        }
      )
    })

    it('has to have valid components css', () => {
      const css = loadScss(null, { data: global.components[0] })
      // @ts-expect-error - strictFunctionTypes
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to contain a button selector', () => {
      expect(global.components[0]).toMatch(new RegExp('.dnb-button\\s?{'))
    })

    it('keeps flag assets at the theme bundle depth (three levels up)', () => {
      // ui-theme-components lives at build/style/themes/ui/, so its assets
      // correctly resolve three levels up.
      expect(global.components[0]).toMatch(
        /url\(\s*["']?\.\.\/\.\.\/\.\.\/assets\/flags\/1x1\//
      )
    })

    it('has proper animation names after the cssnano transform', () => {
      expect(global.components[0]).not.toMatch(/animation:[a-z] /)
    })

    it('should contain a non minified and a minified content', () => {
      expect(global.components[0]).toContain(
        'ATTENTION: This file is auto generated'
      )
      expect(global.components[0]).toContain('@charset "UTF-8";')
      expect(global.components[0]).not.toContain(';--')
      expect(global.components[0]).not.toContain('}:root{--')

      expect(global.components[1]).toContain('@charset "UTF-8";')
      expect(global.components[1]).toContain(';--')
      expect(global.components[1]).toContain('}:root{--')
    })

    it('includes correct files', () => {
      expect(global.files).toHaveLength(2)
      expect(global.files[0]).toContain(
        '/style/themes/ui/ui-theme-components.css'
      )
      expect(global.files[1]).toContain(
        '/style/themes/ui/ui-theme-components.min.css'
      )
    })
  })

  describe('makeMainStyle transforms the "dnb-ui-components" bundle', () => {
    let base: string
    let min: string

    beforeAll(async () => {
      const result = (await runFactory(
        './src/style/dnb-ui-components.scss',
        {
          returnResult: true,
        }
      )) as string[]
      base = result[0]
      min = result[1]
    })

    it('has to have valid components css', () => {
      const css = loadScss(null, { data: base })
      // @ts-expect-error - strictFunctionTypes
      expect(/^Error/.test(css)).toBe(false)
    })

    // Regression for #8951: the bundle lives at build/style/, so its assets
    // must resolve one level up (../assets/…). The previous transform emitted a
    // path two levels too high, which broke webpack/Next.js bundling.
    it('references flag assets inside the package (../assets/…)', () => {
      expect(base).toMatch(/url\(\s*["']?\.\.\/assets\/flags\/1x1\//)
      expect(min).toMatch(/url\(\s*["']?\.\.\/assets\/flags\/1x1\//)
    })

    it('does not reference flag assets outside the package', () => {
      expect(base).not.toMatch(/\.\.\/\.\.\/\.\.\/assets\/flags\//)
      expect(min).not.toMatch(/\.\.\/\.\.\/\.\.\/assets\/flags\//)
    })

    it('references skeleton font assets inside the package', () => {
      expect(base).toMatch(
        /url\(\s*["']?\.\.\/assets\/fonts\/dnb\/skeleton\//
      )
      expect(base).not.toMatch(
        /\.\.\/\.\.\/\.\.\/assets\/fonts\/dnb\/skeleton\//
      )
    })
  })

  describe('makeMainStyle transforms "elements" SCSS to CSS', () => {
    beforeAll(async () => {
      global.elements = await runFactory(
        './src/style/dnb-ui-elements.scss',
        {
          returnResult: true,
        }
      )
    })

    it('has to have valid elements css', () => {
      const css = loadScss(null, { data: global.elements[0] })
      // @ts-expect-error - strictFunctionTypes
      expect(/^Error/.test(css)).toBe(false)
    })
  })

  describe('makeMainStyle transforms "theme" SCSS to CSS', () => {
    beforeAll(async () => {
      global.theme = await runFactory(
        './src/style/themes/ui/ui-theme-basis.scss',
        {
          returnResult: true,
        }
      )
    })

    it('has to have valid theme css', () => {
      const css = loadScss(null, { data: global.theme[0] })
      // @ts-expect-error - strictFunctionTypes
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to have correct custom properties', () => {
      expect(global.theme[0]).toMatch(
        new RegExp('--color-sea-green:\\s?#007272;')
      )
      expect(global.theme[0]).toMatch(
        new RegExp('color:\\s?var\\(--token-color-text-neutral\\);')
      )
      expect(global.theme[0]).not.toMatch(new RegExp('color:\\s?#007272;'))
      expect(global.theme[0]).not.toContain('fuchsia')
    })

    it('has to have correct core path to fonts', () => {
      expect(global.theme[0]).toMatch(
        new RegExp('("|\\()../../../assets/fonts/dnb/')
      )
    })
  })

  describe('makeMainStyle with enableBuildStyleScope', () => {
    // Ensure enableBuildStyleScope returns true
    let originalEnv
    beforeAll(() => {
      originalEnv = process.env.NODE_ENV
      process.env.NODE_ENV = 'production'
      vi.resetModules()
    })
    afterAll(() => {
      process.env.NODE_ENV = originalEnv
    })

    // Mock console.log to suppress lines containing '✨'
    const originalConsoleLog = console.log
    beforeAll(() => {
      console.log = (...args) => {
        if (
          args.some((arg) => typeof arg === 'string' && arg.includes('✨'))
        )
          return
        originalConsoleLog(...args)
      }
    })
    afterAll(() => {
      console.log = originalConsoleLog
    })

    // Run the factory
    beforeAll(async () => {
      const { runFactory } = await import('../makeLibStyles')
      global.css = await runFactory(
        './src/style/themes/ui/ui-theme-basis.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/style/themes/ui/ui-theme-basis.scss',
        {
          returnFiles: true,
        }
      )
    })

    it('should transform CSS to have scoped selectors', async () => {
      expect(global.css[0]).toContain('.eufemia-scope--default ')

      const count = (
        global.css[0].match(/\.eufemia-scope--default /g) || []
      ).length
      expect(count).toBeGreaterThan(50)
    })

    it('should contain the DNB Skeleton font URL in the CSS', () => {
      expect(global.css[0]).toContain(
        `${getFontBasePath()}dnb/DNB-Regular.woff2`
      )
    })

    it('should generate isolated CSS files when enableBuildStyleScope is true', async () => {
      expect(global.files.some((f) => f.includes('--isolated.css'))).toBe(
        true
      )
      expect(
        global.files.some((f) => f.includes('--isolated.min.css'))
      ).toBe(true)
    })
  })
} else {
  it('skipping local tests', () => {
    expect(true).toBe(true)
  })
}
