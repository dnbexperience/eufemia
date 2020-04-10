/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import dnbIcons, { chevron_left } from '../dnb-ui-icons'

describe('ESM icons package', () => {
  it('has to have no defualt export', () => {
    expect(dnbIcons).toBeType('undefined')
  })
  it('has to have a chevron_left icon as named import', () => {
    expect(chevron_left).toBeType('function')
  })
})
