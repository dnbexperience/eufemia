/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button, Anchor } from '../dnb-ui-lib'

describe('ESM main library package', () => {
  it('should have a Button Component', () => {
    expect(Button).toBeType('function')
  })
  it('should have a Anchor Element', () => {
    expect(Anchor).toBeType('object')
  })
})
