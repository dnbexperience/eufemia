// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { getExtensions, PaymentCard } from '../lib'

describe('Library', () => {
  it('has to have a named export of getExtensions', () => {
    expect(typeof getExtensions).toBe('function')
  })
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })
})
