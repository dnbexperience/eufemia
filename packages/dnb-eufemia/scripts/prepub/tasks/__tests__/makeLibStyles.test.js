/**
 * Scripts test
 *
 */

import { runFactory } from '../makeLibStyles'
import isCI from 'is-ci'

if (isCI) {
  beforeAll(async () => {
    global.css = await runFactory(
      './src/components/button/style/dnb-button.scss',
      {
        returnResult: true
      }
    )
  })

  describe('makeLibStyles transform main SASS to CSS', () => {
    it('has to contain a button selector', () => {
      expect(global.css).toMatch(new RegExp('.dnb-button\\s?{'))
    })
    it('has to contain a icon selector as it is a dependdency', () => {
      expect(global.css).toMatch(new RegExp('.dnb-icon\\s?{'))
    })
    it('has to contain a polyfil for font-family', () => {
      // because else we have font-family:var(--font-family-default)
      expect(global.css).toMatch(
        new RegExp('font-family:\\s?.*,\\s?sans-serif;')
      )
    })
    // NB: New from 24. mars 2019 - we relay on the css style packages (e.g. basic)
    // it('has to have correct path to fonts', () => {
    //   expect(global.css).toContain('"../../../assets/fonts/')
    // })
  })
} else {
  it('skipping local tests', () => {})
}
