// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { Blockquote, Ul, Td } from '../dnb-ui-elements'

describe('ESM elements library package', () => {
  it('has to have a Blockquote Component', () => {
    expect(typeof Blockquote).toBe('function')
  })

  it('has to have a Ul Component', () => {
    expect(typeof Ul).toBe('function')
  })

  it('has to have a Td Component', () => {
    expect(typeof Td).toBe('function')
  })
})
