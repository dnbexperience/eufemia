/**
 * Scripts test
 *
 */

import { loadScss } from '../../../../src/core/jest/jestSetup'
import { getFontBasePath } from '../../../../src/plugins/postcss-font-url-rewrite/config'
import { runFactory } from '../makeMainStyle'
import { isCI } from 'repo-utils'

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }))
})

if (isCI) {
  jest.setTimeout(50e3)

  describe('makeMainStyle transforms "core" SASS to CSS', () => {
    beforeAll(async () => {
      global.core = await runFactory('./src/style/dnb-ui-core.scss', {
        returnResult: true,
      })
    })

    it('has to have valid core css', () => {
      global.console.error = jest.fn()
      const css = loadScss(null, { data: global.core[0] })
      expect(/^Error/.test(css)).toBe(false)
      expect(global.console.error).toHaveBeenCalled()
    })

    it('has to have correct core path to fonts', () => {
      expect(global.core[0]).not.toContain('/fonts/dnb/')
    })
  })

  describe('makeMainStyle transforms "components" SASS to CSS', () => {
    beforeAll(async () => {
      global.components = await runFactory(
        './src/style/themes/theme-ui/ui-theme-components.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/style/themes/theme-ui/ui-theme-components.scss',
        {
          returnFiles: true,
        }
      )
    })

    it('has to have valid components css', () => {
      const css = loadScss(null, { data: global.components[0] })
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to contain a button selector', () => {
      expect(global.components[0]).toMatch(new RegExp('.dnb-button\\s?{'))
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
        '/style/themes/theme-ui/ui-theme-components.css'
      )
      expect(global.files[1]).toContain(
        '/style/themes/theme-ui/ui-theme-components.min.css'
      )
    })
  })

  describe('makeMainStyle transforms "elements" SASS to CSS', () => {
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
      expect(/^Error/.test(css)).toBe(false)
    })
  })

  describe('makeMainStyle transforms "theme" SASS to CSS', () => {
    beforeAll(async () => {
      global.theme = await runFactory(
        './src/style/themes/theme-ui/ui-theme-basis.scss',
        {
          returnResult: true,
        }
      )
    })

    it('has to have valid theme css', () => {
      const css = loadScss(null, { data: global.theme[0] })
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to have correct custom properties', () => {
      expect(global.theme[0]).toMatch(
        new RegExp('--color-sea-green:\\s?#007272;')
      )
      expect(global.theme[0]).toMatch(
        new RegExp('color:\\s?var\\(--color-sea-green\\);')
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
      jest.resetModules()
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
        './src/style/themes/theme-ui/ui-theme-basis.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/style/themes/theme-ui/ui-theme-basis.scss',
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
