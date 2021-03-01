/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbElements from '../dnb-ui-elements'
import { registeredElements } from '../../shared/custom-element'

describe('UMD Web Elements package', () => {
  it('has to have a named export of dnbElements', () => {
    expect(dnbElements).toBeType('object')
  })
  it('has to have a Anchor Component', () => {
    expect(dnbElements.Anchor).toBeType('object')
  })
  it('have "dnb-anchor" enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-anchor')
  })
})
