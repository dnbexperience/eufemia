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
    glob: './src/style/themes/theme-ui/properties.scss',
    returnResult: true,
  })
  global.sbanken = await runFactory({
    glob: './src/style/themes/theme-sbanken/properties.scss',
    returnResult: true,
  })
})

describe('Properties for ui', () => {
  it('has to validate', () => {
    expect(global.ui).toMatchSnapshot()
    expect(global.ui).toContain(`'--font-size-large': '1.625rem'`)
  })
})

describe('Properties for sbanken', () => {
  it('has to validate', () => {
    expect(global.sbanken).toMatchSnapshot()
    expect(global.sbanken).toContain(
      `'--sb-font-family-default': '"Roboto", "Helvetica", "Arial", sans-serif'`
    )
  })
})
