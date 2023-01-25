/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { PaymentCard } from '../dnb-ui-extensions'

describe('ESM extensions library package', () => {
  it('has to have a PaymentCard Component', () => {
    expect(PaymentCard).toBeType('function')
  })
})
