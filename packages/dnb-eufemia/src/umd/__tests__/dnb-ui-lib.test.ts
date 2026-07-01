// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import * as dnbLib from '../dnb-ui-lib'

describe('UMD main package', () => {
  it('has to have a named export of dnbLib', () => {
    expect(typeof dnbLib).toBe('object')
  })

  it('has to have a Button Component', () => {
    expect(typeof dnbLib.Button).toBe('function')
  })

  it('has to have a Anchor Component', () => {
    expect(typeof dnbLib.Anchor).toBe('function')
  })
})
