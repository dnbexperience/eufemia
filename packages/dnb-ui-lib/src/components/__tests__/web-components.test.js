/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import {
  enableWebComponents,
  getComponents,
  Button
} from '../web-components'
import { registeredElements } from '../../shared/custom-element'

describe('Web Components', () => {
  it('has to have a named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a named export of getComponents', () => {
    expect(getComponents).toBeType('function')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('have to be enabled by including "dnb-button" in registeredElements', () => {
    expect(registeredElements).toContain('dnb-button')
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
