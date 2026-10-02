// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { Ai, getExtensions, PaymentCard, SidebarMenu } from '../lib'

describe('Library', () => {
  it('has to have a named export of getExtensions', () => {
    expect(typeof getExtensions).toBe('function')
  })
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })

  it('has to have an Ai extension', () => {
    expect(typeof Ai.Response).toBe('function')
    expect(getExtensions().Ai).toBe(Ai)
  })

  it('has to have a SidebarMenu extension', () => {
    expect(typeof SidebarMenu.Root).toBe('function')
    expect(getExtensions().SidebarMenu).toBe(SidebarMenu)
  })
})
