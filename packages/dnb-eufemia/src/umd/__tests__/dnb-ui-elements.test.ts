/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbElements from '../dnb-ui-elements'

describe('UMD Web Elements package', () => {
  it('has to have a named export of dnbElements', () => {
    expect(dnbElements).toBeType('object')
  })

  it('has to have a Blockquote Component', () => {
    expect(dnbElements.Blockquote).toBeType('object')
  })
})
