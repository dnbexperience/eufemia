// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { Ai, PaymentCard, SidebarMenu } from '../dnb-ui-extensions'

describe('ESM extensions library package', () => {
  it('has to have a PaymentCard Component', () => {
    expect(typeof PaymentCard).toBe('function')
  })

  it('has to have an Ai extension', () => {
    expect(typeof Ai.Response).toBe('function')
  })

  it('has to have a SidebarMenu extension', () => {
    expect(typeof SidebarMenu.Root).toBe('function')
  })
})
