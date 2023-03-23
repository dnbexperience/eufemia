/**
 * CSS Package Test
 *
 */

import { loadScss } from '../../../../core/jest/jestSetup'

describe('dnb-ui-tags.css', () => {
  const scss = loadScss(require.resolve('../dnb-ui-tags.scss'))

  it('should contain ".dnb-core-style blockquote"', () => {
    expect(scss).toContain('.dnb-core-style blockquote')
  })

  it('should contain ".dnb-core-style ul"', () => {
    expect(scss).toContain('.dnb-core-style ul')
  })
})
