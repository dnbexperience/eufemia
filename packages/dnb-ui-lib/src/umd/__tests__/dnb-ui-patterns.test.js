/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbPatterns from '../dnb-ui-patterns'
import { registeredElements } from '../../shared/custom-element'

describe('UMD Web Patterns package', () => {
  it('has to have a named export of dnbPatterns', () => {
    expect(dnbPatterns).toBeType('object')
  })
  it('has to have a MainNav Component', () => {
    expect(dnbPatterns.MainNav).toBeType('function')
  })
  it('have "dnb-main-nav" enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
