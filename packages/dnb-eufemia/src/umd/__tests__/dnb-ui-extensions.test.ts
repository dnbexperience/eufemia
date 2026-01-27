/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbExtensions from '../dnb-ui-extensions'

describe('UMD Web Extensions package', () => {
  it('should have a named export of dnbExtensions', () => {
    expect(dnbExtensions).toBeType('object')
  })

  it('should have a PaymentCard Component', () => {
    expect(dnbExtensions.PaymentCard).toBeType('function')
  })
})
