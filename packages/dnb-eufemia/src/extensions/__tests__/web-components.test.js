/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import {
  enableWebComponents,
  getExtensions,
  PaymentCard
} from '../web-components'
import { registeredElements } from '../../shared/custom-element'

describe('Web Components', () => {
  it('has to have a named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getExtensions', () => {
    expect(getExtensions).toBeType('function')
  })
  it('has to have a PaymentCard Component', () => {
    expect(PaymentCard).toBeType('function')
  })
  it('have to be enabled by including "dnb-payment-card" in registeredElements', () => {
    expect(registeredElements).toContain('dnb-payment-card')
    expect(registeredElements).not.toContain('dnb-button')
  })
})
