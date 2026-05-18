/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
// eslint-disable-next-line import/named
import { PaymentCard } from '../index'

describe('Library', () => {
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })
})
