/**
 * Figma test
 *
 */

import '../../../../src/core/jest/jestSetup'
import { getFigmaDoc } from '../../helpers/docHelpers'

const localFile = require.resolve('./files/FigmaTestDoc.json')

describe('FigmaDoc', () => {
  it('has to match selector criteria', async () => {
    const figmaDoc = await getFigmaDoc({
      figmaFile: process.env.FIGMA_ICONS_FILE,
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })

    expect(typeof figmaDoc).toBe('object')
    expect(figmaDoc).toHaveProperty('name')
    expect(figmaDoc).toHaveProperty('lastModified')
  })
})
