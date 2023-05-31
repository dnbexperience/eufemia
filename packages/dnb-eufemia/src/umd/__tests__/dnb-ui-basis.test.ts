/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { isTouchDevice } from '../dnb-ui-basis'

describe('UMD basis package', () => {
  it('has to have a named export of isTouchDevice', () => {
    expect(isTouchDevice).toBeType('function')
  })
})
