/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { enableWebComponents, getExtensions, PaymentCard } from '../lib'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have a enableWebComponents function', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getExtensions', () => {
    expect(getExtensions).toBeType('function')
  })
  it('has to have a PaymentCard Component', () => {
    expect(PaymentCard).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-payment-card')
  })
  it('have to have valid Web Components enabled in registeredElements', () => {
    enableWebComponents()
    expect(registeredElements).toContain('dnb-payment-card')
    expect(registeredElements).not.toContain('dnb-button')
  })
})
