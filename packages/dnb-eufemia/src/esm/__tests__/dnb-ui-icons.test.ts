/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbIcons from '../dnb-ui-icons'
import { chevron_left } from '../dnb-ui-icons'

describe('ESM icons package', () => {
  it('has to have no default export', () => {
    expect(dnbIcons['default']).toBeType('undefined')
  })

  it('has to have a chevron_left icon as named import', () => {
    expect(dnbIcons.chevron_left).toBeType('function')
    expect(chevron_left).toBeType('function')
  })
})
