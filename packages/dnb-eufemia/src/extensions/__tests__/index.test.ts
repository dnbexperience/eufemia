// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { PaymentCard, SidebarMenu } from '../index'

describe('Library', () => {
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })

  it('has to have a SidebarMenu extension', () => {
    expect(typeof SidebarMenu.Container).toBe('function')
  })
})
