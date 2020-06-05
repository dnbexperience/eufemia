/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Anchor } from '../dnb-ui-elements'
import { registeredElements } from '../../shared/custom-element'

describe('ESM elements library package', () => {
  it('has to have a Anchor Component', () => {
    expect(Anchor).toBeType('object')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-anchor')
  })
})
