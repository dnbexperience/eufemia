/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import * as dnbIcons from '../dnb-ui-icons'
import { chevron_left } from '../dnb-ui-icons'

describe('ESM icons package', () => {
  it('has to have no default export', () => {
    expect(typeof dnbIcons['default']).toBe('undefined')
  })

  it('has to have a chevron_left icon as named import', () => {
    expect(typeof dnbIcons.chevron_left).toBe('function')
    expect(typeof chevron_left).toBe('function')
  })
})
