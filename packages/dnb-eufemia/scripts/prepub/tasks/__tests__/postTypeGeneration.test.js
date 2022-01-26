/**
 * Post generateTypes tests
 *
 */

import fs from 'fs-extra'

if (process.env.TEST_POST_TYPES === '1') {
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
} else {
  describe('TEST_POST_TYPES', () => {
    it('pass', () => {})
  })
}
