/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import webComponent from '../web-components'
import { registeredElements } from '../../shared/custom-element'

describe('Web Components', () => {
  it('hast to have a Button Component', () => {
    expect(webComponent.Button).toBeType('function')
  })
  it('have to be enabled by including "dnb-button" in registeredElements', () => {
    expect(registeredElements).toContain('dnb-button')
  })
})
