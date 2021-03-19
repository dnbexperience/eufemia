/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { PaymentCard } from '../dnb-ui-extensions'
import { registeredElements } from '../../shared/custom-element'

describe('ESM extensions library package', () => {
  it('has to have a PaymentCard Component', () => {
    expect(PaymentCard).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-payment-card')
  })
})
