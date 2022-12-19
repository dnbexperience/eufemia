/**
 * Scripts test
 *
 */

import { runFactory } from '../makeLibStyles'
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

  describe('makeLibStyles transform main SASS to CSS', () => {
    beforeAll(async () => {
      global.css = await runFactory(
        './src/components/button/style/dnb-button.scss',
        {
          returnResult: true,
        }
      )
      global.files = await runFactory(
        './src/components/button/style/dnb-button.scss',
        {
          returnFiles: true,
        }
      )
    })

    it('has to contain a button selector', () => {
      expect(global.css[0]).toMatch(new RegExp('.dnb-button\\s?{'))
    })

    it('has to contain a icon selector as it is a dependency', () => {
      expect(global.css[0]).toMatch(new RegExp('.dnb-icon\\s?{'))
    })

    it('should not contain a polyfill for font-family', () => {
      expect(global.css[0]).toContain(
        'font-family: var(--font-family-default);'
      )
    })

    it('should contain a non minified and a minified content', () => {
      expect(global.css[0]).toContain(
        'This file is only used to make components independent'
      )
      expect(global.css[1]).toContain(':root{--')
    })

    it('includes correct files', () => {
      expect(global.files).toHaveLength(2)
      expect(global.files[0]).toContain(
        '/components/button/style/dnb-button.css'
      )
      expect(global.files[1]).toContain(
        '/components/button/style/dnb-button.min.css'
      )
    })
  })
} else {
  it('skipping local tests', () => {})
}
