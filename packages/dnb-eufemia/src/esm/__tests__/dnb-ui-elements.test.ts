/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Blockquote, Ul, Td } from '../dnb-ui-elements'

describe('ESM elements library package', () => {
  it('has to have a Blockquote Component', () => {
    expect(Blockquote).toBeType('object')
  })

  it('has to have a Ul Component', () => {
    expect(Ul).toBeType('function')
  })

  it('has to have a Td Component', () => {
    expect(Td).toBeType('function')
  })
})
