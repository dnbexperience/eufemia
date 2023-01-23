/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { getComponents, Button } from '../lib'

describe('Library', () => {
  it('has to have a named export of getComponents', () => {
    expect(getComponents).toBeType('function')
  })
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
})
