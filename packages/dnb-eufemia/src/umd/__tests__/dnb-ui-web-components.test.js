/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbWebComponents from '../dnb-ui-web-components'
import { registeredElements } from '../../shared/custom-element'

describe('UMD Web Components package', () => {
  it('has to have a named export of dnbWebComponents', () => {
    expect(dnbWebComponents).toBeType('object')
  })
  it('has to have a Button Component', () => {
    expect(dnbWebComponents.Button).toBeType('function')
  })
  it('have "dnb-button" enabled in registeredElements', () => {
    expect(registeredElements).toContain('dnb-button')
  })
})
