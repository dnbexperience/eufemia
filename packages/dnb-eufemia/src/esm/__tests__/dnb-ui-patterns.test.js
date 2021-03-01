/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import { MainNav } from '../dnb-ui-patterns'
import { registeredElements } from '../../shared/custom-element'

describe('ESM patterns library package', () => {
  it('has to have a MainNav Component', () => {
    expect(MainNav).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
