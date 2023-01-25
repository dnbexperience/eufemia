/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Anchor } from '../dnb-ui-elements'

describe('ESM elements library package', () => {
  it('has to have a Anchor Component', () => {
    expect(Anchor).toBeType('object')
  })
})
