/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { enableWebComponents, getComponents, Button } from '../lib'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have a named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getComponents', () => {
    expect(getComponents).toBeType('function')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
  it('have to have valid Web Components enabled in registeredElements', () => {
    enableWebComponents()
    expect(registeredElements).toContain('dnb-button')
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
