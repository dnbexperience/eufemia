/**
 * Scripts test
 *
 */

import { loadScss } from '../../../../src/core/jest/jestSetup'
import { runFactory } from '../makeMainStyle'
import isCI from 'is-ci'

if (isCI) {
  jest.setTimeout(30e3)

  beforeAll(async () => {
    global.core = await runFactory('./src/style/dnb-ui-core.scss', {
      returnResult: true,
    })
    global.components = await runFactory(
      './src/style/dnb-ui-components.scss',
      {
        returnResult: true,
      }
    )
    global.elements = await runFactory(
      './src/style/dnb-ui-elements.scss',
      {
        returnResult: true,
      }
    )
    global.theme = await runFactory(
      './src/style/themes/theme-ui/dnb-theme-ui.scss',
      {
        returnResult: true,
      }
    )
  })

  describe('makeMainStyle transforms "core" SASS to CSS', () => {
    it('has to have valid core css', () => {
      const css = loadScss(null, { data: global.core })
      expect(/^Error/.test(css)).toBe(false)
    })
    it('has to have correct core path to fonts', () => {
      expect(global.core).toMatch(new RegExp('("|\\()../assets/fonts/'))
    })
  })

  describe('makeMainStyle transforms "components" SASS to CSS', () => {
    it('has to have valid components css', () => {
      const css = loadScss(null, { data: global.components })
      expect(/^Error/.test(css)).toBe(false)
    })
    it('has to contain a button selector', () => {
      expect(global.components).toMatch(new RegExp('.dnb-button\\s?{'))
    })
    it('has proper animation names after the cssnano transform', () => {
      expect(global.components).not.toMatch(/animation:[a-z] /)
    })
  })

  describe('makeMainStyle transforms "elements" SASS to CSS', () => {
    it('has to have valid elements css', () => {
      const css = loadScss(null, { data: global.elements })
      expect(/^Error/.test(css)).toBe(false)
    })
  })

  describe('makeMainStyle transforms "theme" SASS to CSS', () => {
    it('has to have valid theme css', () => {
      const css = loadScss(null, { data: global.theme })
      expect(/^Error/.test(css)).toBe(false)
    })
    it('has to have correct custom properties', () => {
      expect(global.theme).toMatch(
        new RegExp('--color-sea-green:\\s?#007272;')
      )
      expect(global.theme).toMatch(
        new RegExp('color:\\s?var\\(--color-sea-green\\);')
      )
      expect(global.theme).toMatch(new RegExp('color:\\s?#007272;'))
      expect(global.theme).not.toContain('fuchsia')
    })
  })
} else {
  it('skipping local tests', () => {})
}
