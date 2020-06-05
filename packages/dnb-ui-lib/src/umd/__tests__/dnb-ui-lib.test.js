/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbLib from '../dnb-ui-lib'
import { registeredElements } from '../../shared/custom-element'

describe('UMD main package', () => {
  it('has to have a named export of dnbLib', () => {
    expect(dnbLib).toBeType('object')
  })
  it('has to have a Button Component', () => {
    expect(dnbLib.Button).toBeType('function')
  })
  it('has to have a Anchor Component', () => {
    expect(dnbLib.Anchor).toBeType('object')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
