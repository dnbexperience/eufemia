// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import * as dnbElements from '../dnb-ui-elements'

describe('UMD Web Elements package', () => {
  it('has to have a named export of dnbElements', () => {
    expect(typeof dnbElements).toBe('object')
  })

  it('has to have a Blockquote Component', () => {
    expect(typeof dnbElements.Blockquote).toBe('function')
  })
})
