/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { enableWebComponents, getPatterns, MainNav } from '../lib'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have a enableWebComponents function', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getPatterns', () => {
    expect(getPatterns).toBeType('function')
  })
  it('has to have a MainNav Component', () => {
    expect(MainNav).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
  it('have to have valid Web Components enabled in registeredElements', () => {
    enableWebComponents()
    expect(registeredElements).toContain('dnb-main-nav')
    expect(registeredElements).not.toContain('dnb-button')
  })
})
