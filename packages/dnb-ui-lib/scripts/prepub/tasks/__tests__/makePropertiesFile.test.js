/**
 * Scripts test
 *
 */

import { runFactory } from '../makePropertiesFile'

// just to make sure we re-run the test in watch mode due to changes in theese files
import properties from '../../../../src/style/core/properties.scss' // eslint-disable-line

beforeAll(async () => {
  global.content = await runFactory({
    returnResult: true
  })
})

describe('The properties file factory', () => {
  it('has to create a valid js object with properties', () => {
    expect(global.content).toContain(
      '"--font-size-large": "1.5rem"'
      // '\\"--font-size-large\\": \\"1.5rem\\"'// NB: if uglifyed
    )
  })
})
