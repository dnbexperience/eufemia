/**
 * Post generateTypes tests
 *
 */

import fs from 'fs-extra'

describe('generateTypes did generate', () => {
  it('Input index', async () => {
    const content = await fs.readFile(
      require.resolve('@dnb/eufemia/src/components/Input.d.ts'),
      'utf-8'
    )
    expect(content).toContain('export default Input')
  })

  it('Input components', async () => {
    const content = await fs.readFile(
      require.resolve('@dnb/eufemia/src/components/input/Input.d.ts'),
      'utf-8'
    )
    expect(content).toContain('export interface InputProps')
  })
})
