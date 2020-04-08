/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import dnbIcons, { chevron_left } from '../dnb-ui-icons'

describe('ESM icons package', () => {
  it('has to have a named export of dnbLib', () => {
    expect(dnbIcons).toBeType('object')
  })
  it('has to have a chevron_left icon as named import', () => {
    expect(chevron_left).toBeType('function')
  })
  it('has to have a chevron_left icon from default import', () => {
    expect(dnbIcons.chevron_left).toBeType('function')
  })
})
