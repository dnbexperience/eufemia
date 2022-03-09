/**
 * Figma test
 *
 */

import '../../../../src/core/jest/jestSetup'
import { getFigmaDoc } from '../../helpers/docHelpers'
import { ComponentsStyleConverter } from '../componentsStyleConverter'

const selector = 'dnb-ui-components'
const localFile = require.resolve('./files/FigmaTestDoc.json')

describe.skip('ComponentsStyleConverter', () => {
  // not used anymore
  it.skip('has to convert correctly from a figma doc', async () => {
    const figmaDoc = await getFigmaDoc({
      figmaFile: process.env.FIGMA_ICONS_FILE,
      forceRefetch: false,
      preventUpdate: true,
      localFile,
    })
    const result = await ComponentsStyleConverter(figmaDoc, {
      mainLayerSelector: { name: selector },
    })

    expect(result).toBeType('object')
    const keys = Object.keys(result)
    expect(keys.length).toBeGreaterThanOrEqual(1)

    for (const name in result) {
      expect(name).toBeType('string')
      expect(result[name]).toHaveProperty('scssStyle')
      expect(result[name]).toHaveProperty('scssVars')
      expect(result[name]).toHaveProperty('replaceScssVars')
      expect(result[name].scssStyle).toBeType('string')
      expect(result[name].scssVars).toEqual({
        asymmetricMatch: (actual) =>
          typeof actual === 'string' || actual === null,
      })
      expect(result[name].replaceScssVars).toEqual({
        asymmetricMatch: (actual) =>
          typeof actual === 'string' || actual === null,
      })
    }
  })
})
