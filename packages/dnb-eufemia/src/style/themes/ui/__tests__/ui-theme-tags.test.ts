/**
 * CSS Package Test
 *
 */

import { loadScss } from '../../../../core/jest/jestSetup'

describe('ui-theme-tags.css', () => {
  const css = loadScss(require.resolve('../ui-theme-tags.scss'))

  it('should contain ".dnb-core-style blockquote"', () => {
    expect(css).toContain('.dnb-core-style blockquote')
  })

  it('should contain ".dnb-core-style ul"', () => {
    expect(css).toContain('.dnb-core-style ul')
  })
})
