/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { getComponents, Button } from '../lib'

describe('Library', () => {
  it('has to have a named export of getComponents', () => {
    expect(typeof getComponents).toBe('function')
  })
  it('has to have a Button Component', () => {
    expect(typeof Button).toBe('function')
  })
})
