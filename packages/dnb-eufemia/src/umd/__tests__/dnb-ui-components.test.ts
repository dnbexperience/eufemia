/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbComponents from '../dnb-ui-components'

describe('UMD Components package', () => {
  it('should have a named export of dnbComponents', () => {
    expect(dnbComponents).toBeType('object')
  })

  it('should have a Button Component', () => {
    expect(dnbComponents.Button).toBeType('function')
  })

  it('should have a Anchor Component', () => {
    expect(dnbComponents.Anchor).toBeType('object')
  })
})
