// @vitest-environment node

/**
 * Abstract Test
 *
 */

import '../../core/test-utils/testSetup'
import * as dnbComponents from '../dnb-ui-components'

describe('UMD Components package', () => {
  it('has to have a named export of dnbComponents', () => {
    expect(typeof dnbComponents).toBe('object')
  })

  it('has to have a Button Component', () => {
    expect(typeof dnbComponents.Button).toBe('function')
  })

  it('has to have a Anchor Component', () => {
    expect(typeof dnbComponents.Anchor).toBe('function')
  })
})
