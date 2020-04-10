/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { enableWebComponents, Button } from '../lib'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have a enableWebComponents function', () => {
    expect(enableWebComponents).toBeType('function')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
