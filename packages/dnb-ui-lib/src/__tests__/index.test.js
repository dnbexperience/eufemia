/**
 * Abstract Test
 *
 */

import '../core/jest/jestSetup'
// eslint-disable-next-line import/named
import { enableWebComponents, Button } from '../index'
import { registeredElements } from '../shared/custom-element'

describe('Library', () => {
  it('has to have no enableWebComponents function', () => {
    expect(enableWebComponents).toBeType('undefined')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
