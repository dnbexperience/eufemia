// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { Button } from '../lib'

describe('Library', () => {
  it('has to have a Button Component', () => {
    expect(typeof Button).toBe('function')
  })
})
