/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbComponents from '../dnb-ui-components'
import { registeredElements } from '../../shared/custom-element'

describe('UMD Web Components package', () => {
  it('has to have a named export of dnbComponents', () => {
    expect(dnbComponents).toBeType('object')
  })
  it('has to have a Button Component', () => {
    expect(dnbComponents.Button).toBeType('function')
  })
  it('have "dnb-button" enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-button')
  })
})
