// @vitest-environment node

import fs from 'fs'
import path from 'path'
import { themeCapabilities, themeNames } from '../capabilities'

describe('themeCapabilities', () => {
  it('defines every supported Theme name', () => {
    expect(Object.keys(themeCapabilities)).toEqual(themeNames)
  })

  it('only declares dark mode styles that exist', () => {
    for (const capability of Object.values(themeCapabilities)) {
      const colorSchemes: ReadonlyArray<string> = capability.colorSchemes
      expect(colorSchemes.includes('dark')).toBe(
        Boolean(capability.darkModeStyle)
      )

      if (!capability.darkModeStyle) {
        continue
      }

      const relativePath = capability.darkModeStyle
        .replace('@dnb/eufemia/style/themes/', '')
        .replace('.min.css', '.scss')

      expect(
        fs.existsSync(path.resolve(__dirname, '..', relativePath))
      ).toBe(true)
    }
  })

  it('declares Carnegie as light-only', () => {
    expect(themeCapabilities.carnegie).toMatchObject({
      colorSchemes: ['light'],
      darkModeStyle: null,
      supportsDarkSurface: true,
    })
  })
})
