/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button } from '../dnb-ui-components'
import { registeredElements } from '../../shared/custom-element'

describe('ESM components library package', () => {
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
