/**
 * Abstract Test
 *
 */

import '../../core/jest/jestSetup'
import lib, { MainNav } from '../lib'
import { registeredElements } from '../../shared/custom-element'

describe('Library', () => {
  it('has to have a enableWebComponents function', () => {
    expect(lib.enableWebComponents).toBeType('function')
  })
  it('has to have a MainNav Component', () => {
    expect(MainNav).toBeType('function')
  })
  it('have no Web Components enabled in registeredElements', () => {
    expect(registeredElements).not.toContain('dnb-main-nav')
  })
})
