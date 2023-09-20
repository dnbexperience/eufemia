/**
 * Scripts test
 *
 */

import { runFactory } from '../makePropertiesFile'

jest.mock('ora', () => {
  return jest.fn(() => ({
    start: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
    succeed: jest.fn(),
    fail: jest.fn(),
  }))
})

beforeAll(async () => {
  global.ui = await runFactory({
    glob: './src/style/themes/theme-ui/_properties-js.scss',
    returnResult: true,
  })
  global.sbanken = await runFactory({
    glob: './src/style/themes/theme-sbanken/_properties-js.scss',
    returnResult: true,
  })
})

describe('Properties for ui', () => {
  it('has to validate', () => {
    expect(global.ui).toMatchSnapshot()
    expect(global.ui).toContain(`'--font-size-large': '1.625rem'`)
    expect(global.ui).toContain(
      `'--font-family-default': '"DNB", sans-serif'`
    )
  })
})

describe('Properties for sbanken', () => {
  it('has to validate', () => {
    expect(global.sbanken).toMatchSnapshot()
    expect(global.sbanken).toContain(
      `'--sb-font-family-default': '"Roboto", "Helvetica", "Arial", sans-serif'`
    )
    expect(global.sbanken).toContain(
      `'--font-family-default': 'var(--sb-font-family-default)'`
    )
  })
})
