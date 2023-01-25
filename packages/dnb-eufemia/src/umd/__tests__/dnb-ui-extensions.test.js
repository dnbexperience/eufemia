/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbExtensions from '../dnb-ui-extensions'

describe('UMD Web Extensions package', () => {
  it('has to have a named export of dnbExtensions', () => {
    expect(dnbExtensions).toBeType('object')
  })
  it('has to have a PaymentCard Component', () => {
    expect(dnbExtensions.PaymentCard).toBeType('function')
  })
})
