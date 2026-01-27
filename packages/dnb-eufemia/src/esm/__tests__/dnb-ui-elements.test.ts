/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Blockquote, Ul, Td } from '../dnb-ui-elements'

describe('ESM elements library package', () => {
  it('should have a Blockquote Component', () => {
    expect(Blockquote).toBeType('object')
  })

  it('should have a Ul Component', () => {
    expect(Ul).toBeType('function')
  })

  it('should have a Td Component', () => {
    expect(Td).toBeType('function')
  })
})
