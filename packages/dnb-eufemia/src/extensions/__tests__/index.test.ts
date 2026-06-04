/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { PaymentCard } from '../index'

describe('Library', () => {
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })
})
