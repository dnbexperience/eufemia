/**
 * Abstract Test
 *
 */

import '../core/jest/jestSetup'
// eslint-disable-next-line import/named
import { Button } from '../index'

describe('Library', () => {
  it('has to have a Button Component', () => {
    expect(Button).toBeType('function')
  })
})
