/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { Button } from '../lib'

describe('Library', () => {
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
})
