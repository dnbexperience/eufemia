/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { dnbIcons } from '../dnb-ui-icons'

describe('UMD icons package', () => {
  it('has to have a named export of dnbLib', () => {
    expect(dnbIcons).toBeType('object')
  })
  it('has to have a chevron_left icon', () => {
    expect(dnbIcons.chevron_left).toBeType('function')
  })
})
