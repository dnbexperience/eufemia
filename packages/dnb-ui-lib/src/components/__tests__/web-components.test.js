/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import lib, {
  enableWebComponents,
  getComponents,
  Button
} from '../web-components'
import { registeredElements } from '../../shared/custom-element'

describe('Web Components', () => {
  it('hast to have a enableWebComponents function', () => {
    expect(lib.enableWebComponents).toBeType('function')
  })
  it('hast to have a named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('hast to have a named export of getComponents', () => {
    expect(getComponents).toBeType('function')
  })
  it('hast to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('have to be enabled by including "dnb-button" in registeredElements', () => {
    expect(registeredElements).toContain('dnb-button')
  })
})
