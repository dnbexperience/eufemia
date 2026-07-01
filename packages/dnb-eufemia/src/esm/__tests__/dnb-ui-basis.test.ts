// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import { isTouchDevice } from '../dnb-ui-basis'

describe('ESM basis package', () => {
  it('has to have a named export of isTouchDevice', () => {
    expect(typeof isTouchDevice).toBe('function')
  })
})
