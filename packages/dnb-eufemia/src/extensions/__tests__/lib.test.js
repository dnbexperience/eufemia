/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { getExtensions, PaymentCard } from '../lib'

describe('Library', () => {
  it('has to have a named export of getExtensions', () => {
    expect(getExtensions).toBeType('function')
  })
  it('has to have a PaymentCard Component', () => {
    expect(PaymentCard).toBeType('function')
  })
})
