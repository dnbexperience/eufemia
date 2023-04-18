/**
 * CSS Package Test
 *
 */

import { loadScss } from '../../../../core/jest/jestSetup'

describe('ui-theme-tags.css', () => {
  const scss = loadScss(require.resolve('../ui-theme-tags.scss'))

  it('should contain ".dnb-core-style blockquote"', () => {
    expect(scss).toContain('.dnb-core-style blockquote')
  })

  it('should contain ".dnb-core-style ul"', () => {
    expect(scss).toContain('.dnb-core-style ul')
  })
})
