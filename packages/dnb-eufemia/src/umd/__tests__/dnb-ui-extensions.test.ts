// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import * as dnbExtensions from '../dnb-ui-extensions'

describe('UMD Web Extensions package', () => {
  it('has to have a named export of dnbExtensions', () => {
    expect(typeof dnbExtensions).toBe('object')
  })

  it('has to have a PaymentCard Component', () => {
    expect(typeof dnbExtensions.PaymentCard).toBe('function')
  })
})
