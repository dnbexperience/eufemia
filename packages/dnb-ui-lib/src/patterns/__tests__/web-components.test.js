/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import {
  enableWebComponents,
  getPatterns,
  MainNav
} from '../web-components'
import { registeredElements } from '../../shared/custom-element'

describe('Web Components', () => {
  it('has to have a named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getPatterns', () => {
    expect(getPatterns).toBeType('function')
  })
  it('has to have a MainNav Component', () => {
    expect(MainNav).toBeType('function')
  })
  it('have to be enabled by including "dnb-main-nav" in registeredElements', () => {
    expect(registeredElements).toContain('dnb-main-nav')
    expect(registeredElements).not.toContain('dnb-button')
  })
})
