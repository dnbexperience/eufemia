/**
 * Scripts test
 *
 */

import { runFactory } from '../makePropertiesFile'

beforeAll(async () => {
  global.content = await runFactory({
    returnResult: true
  })
})

describe('The properties file factory', () => {
  it('has to create a valid js object with properties', () => {
    expect(global.content).toContain(
      "'--font-size-large': '1.625rem'"
      // "\\'--font-size-large\\': \\'1.625rem\\'" // NB: if uglified
    )
  })
})
