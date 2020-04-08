/**
 * Abstract Test
 *
 */

import '../core/jest/jestSetup'
import lib, { Button } from '../lib'
import { registeredElements } from '../shared/custom-element'

describe('Library', () => {
  it('has to have a enableWebComponents function', () => {
    expect(lib.enableWebComponents).toBeType('function')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('have no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
