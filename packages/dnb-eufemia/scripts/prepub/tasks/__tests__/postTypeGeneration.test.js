/**
 * Post generateTypes tests
 *
 */

import fs from 'fs-extra'

if (process.env.TEST_POST_TYPES === '1') {
  describe('generateTypes did generate', () => {
    it('Modal index', async () => {
      const content = await fs.readFile(
        require.resolve('@dnb/eufemia/src/components/Modal.d.ts'),
        'utf-8'
      )
      expect(content).toContain('export default Modal')
    })
    it('Modal components', async () => {
      const content = await fs.readFile(
        require.resolve('@dnb/eufemia/src/components/modal/Modal.d.ts'),
        'utf-8'
      )
      expect(content).toContain('export interface ModalProps')
    })
  })
} else {
  describe('TEST_POST_TYPES', () => {
    it('pass', () => {})
  })
}
