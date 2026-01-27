/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { chevron_left } from '../dnb-ui-icons'
import * as dnbIcons from '../dnb-ui-icons'

describe('UMD icons package', () => {
  it('should have no default export', () => {
    expect(dnbIcons['default']).toBeType('undefined')
  })

  it('should have a chevron_left icon', () => {
    expect(dnbIcons.chevron_left).toBeType('function')
    expect(chevron_left).toBeType('function')
  })
})
