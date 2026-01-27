/**
 * Abstract Test
 *
 */

import '../core/jest/jestSetup'
import { getComponents, Button } from '../lib'

describe('Library', () => {
  it('should have a named export of getComponents', () => {
    expect(getComponents).toBeType('function')
  })
  it('should have a Button Component', () => {
    expect(Button).toBeType('function')
  })
})
