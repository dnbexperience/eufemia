/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbElements from '../dnb-ui-elements'

describe('UMD Web Elements package', () => {
  it('should have a named export of dnbElements', () => {
    expect(dnbElements).toBeType('object')
  })

  it('should have a Blockquote Component', () => {
    expect(dnbElements.Blockquote).toBeType('object')
  })
})
