/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbComponents from '../dnb-ui-components'

describe('UMD Web Components package', () => {
  it('has to have a named export of dnbComponents', () => {
    expect(dnbComponents).toBeType('object')
  })
  it('has to have a Button Component', () => {
    expect(dnbComponents.Button).toBeType('function')
  })
})
