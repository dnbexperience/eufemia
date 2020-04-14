/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button, Anchor, enableWebComponents } from '../dnb-ui-lib'
import { registeredElements } from '../../shared/custom-element'

describe('ESM main library package', () => {
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has to have a Anchor Element', () => {
    expect(Anchor).toBeType('object')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
  it('has Web Components enabled in registeredElements', () => {
    enableWebComponents()
    expect(registeredElements).toContain('dnb-button')
  })
})
