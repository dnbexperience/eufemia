/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbLib from '../dnb-ui-lib'

describe('UMD main package', () => {
  it('should have a named export of dnbLib', () => {
    expect(dnbLib).toBeType('object')
  })

  it('should have a Button Component', () => {
    expect(dnbLib.Button).toBeType('function')
  })

  it('should have a Anchor Component', () => {
    expect(dnbLib.Anchor).toBeType('object')
  })
})
