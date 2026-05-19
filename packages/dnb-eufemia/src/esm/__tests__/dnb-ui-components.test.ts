/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button, Anchor } from '../dnb-ui-components'

describe('ESM components library package', () => {
  it('has to have a Button Component', () => {
    expect(typeof Button).toBe('function')
  })

  it('has to have a Anchor Component', () => {
    expect(typeof Anchor).toBe('function')
  })
})
