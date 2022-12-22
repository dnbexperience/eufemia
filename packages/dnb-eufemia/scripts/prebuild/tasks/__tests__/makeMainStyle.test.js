/**
 * Scripts test
 *
 */

import { loadScss } from '../../../../src/core/jest/jestSetup'
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
  jest.setTimeout(30e3)

  describe('makeMainStyle transforms "core" SASS to CSS', () => {
    beforeAll(async () => {
      global.core = await runFactory('./src/style/dnb-ui-core.scss', {
        returnResult: true,
      })
    })

    it('has to have valid core css', () => {
      const css = loadScss(null, { data: global.core[0] })
      expect(/^Error/.test(css)).toBe(false)
    })

    it('has to have correct core path to fonts', () => {
      expect(global.core[0]).toMatch(new RegExp('("|\\()../assets/fonts/'))
    })
  })

  describe('makeMainStyle transforms "components" SASS to CSS', () => {
    beforeAll(async () => {
      global.components = await runFactory(
        './src/style/dnb-ui-components.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/style/dnb-ui-components.scss',
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
      expect(global.components[1]).toMatch(/^:root{--/)
    })

    it('includes correct files', () => {
      expect(global.files).toHaveLength(2)
      expect(global.files[0]).toContain('/style/dnb-ui-components.css')
      expect(global.files[1]).toContain('/style/dnb-ui-components.min.css')
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
        './src/style/themes/theme-ui/dnb-theme-ui.scss',
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
  })
} else {
  it('skipping local tests', () => {})
}
