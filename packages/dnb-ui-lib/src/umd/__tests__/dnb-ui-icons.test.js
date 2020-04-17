/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import dnbIcons, { chevron_left } from '../dnb-ui-icons'

describe('UMD icons package', () => {
  it('has to have no defualt export', () => {
    expect(dnbIcons).toBeType('undefined')
  })
  it('has to have a chevron_left icon', () => {
    expect(chevron_left).toBeType('function')
  })
})
