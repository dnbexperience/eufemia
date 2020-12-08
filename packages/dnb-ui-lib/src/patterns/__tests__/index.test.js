/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
// eslint-disable-next-line import/named
import { enableWebComponents, MainNav } from '../index'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have no named export of enableWebComponents', () => {
    expect(enableWebComponents).toBeType('undefined')
  })
  it('has to have a MainNav Component', () => {
    expect(MainNav).toBeType('function')
  })
  it('has no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
