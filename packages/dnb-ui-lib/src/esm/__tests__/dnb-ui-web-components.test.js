/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button } from '../dnb-ui-web-components'
import { registeredElements } from '../../shared/custom-element'

describe('ESM components library package', () => {
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('has Web Components enabled in registeredElements', () => {
    expect(registeredElements).toContain('dnb-button')
  })
})
