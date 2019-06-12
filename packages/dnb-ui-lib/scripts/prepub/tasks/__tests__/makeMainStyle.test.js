/**
 * Scripts test
 *
 */

import { loadScss } from '../../../../src/core/jest/jestSetup'
import { runFactory } from '../makeMainStyle'

// just to make sure we re-run the test in watch mode due to changes in theese files
import dnb_ui_core from '../../../../src/style/dnb-ui-core.scss' // eslint-disable-line
import dnb_ui_components from '../../../../src/style/dnb-ui-components.scss' // eslint-disable-line
import dnb_ui_elements from '../../../../src/style/dnb-ui-elements.scss' // eslint-disable-line
import dnb_theme_ui from '../../../../src/style/themes/theme-ui/dnb-theme-ui.scss' // eslint-disable-line

jest.setTimeout(30e3)

beforeAll(async () => {
  global.core = await runFactory('./src/style/dnb-ui-core.scss', {
    returnResult: true
  })
  global.components = await runFactory(
    './src/style/dnb-ui-components.scss',
    {
      returnResult: true
    }
  )
  global.elements = await runFactory('./src/style/dnb-ui-elements.scss', {
    returnResult: true
  })
  global.theme = await runFactory(
    './src/style/themes/theme-ui/dnb-theme-ui.scss',
    {
      returnResult: true
    }
  )
})

describe('makeMainStyle transforms "core" SASS to CSS', () => {
  it('has to have valid core css', () => {
    const css = loadScss(null, { data: global.core })
    expect(/^Error/.test(css)).toBe(false)
  })
  it('has to have correct core path to fonts', () => {
    expect(global.core).toContain('"../assets/fonts/')
  })
})

describe('makeMainStyle transforms "components" SASS to CSS', () => {
  it('has to have valid components css', () => {
    const css = loadScss(null, { data: global.components })
    expect(/^Error/.test(css)).toBe(false)
  })
  it('has to contain a button selector', () => {
    expect(global.components).toContain('.dnb-button {')
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
    expect(global.theme).toContain('--color-sea-green: #007272;')
    expect(global.theme).toContain('color: var(--color-sea-green);')
    expect(global.theme).toContain('color: #007272;')
    expect(global.theme).not.toContain('fuchsia')
  })
})
