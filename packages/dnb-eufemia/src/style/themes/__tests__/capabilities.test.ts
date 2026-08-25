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

  it('documents every theme capability', () => {
    const docs = fs.readFileSync(
      path.resolve(
        __dirname,
        '../../../../../dnb-design-system-portal/src/docs/uilib/usage/customisation/theming.mdx'
      ),
      'utf-8'
    )
    const rows = docs
      .split('\n')
      .filter((line) => line.startsWith('| `'))
      .map((line) =>
        line
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim())
      )

    for (const [name, capability] of Object.entries(themeCapabilities)) {
      const colorSchemes = capability.colorSchemes
        .map((colorScheme) => `\`${colorScheme}\``)
        .join(', ')
      const darkModeStyle = capability.darkModeStyle
        ? `\`${capability.darkModeStyle}\``
        : 'None'
      const supportsDarkSurface = capability.supportsDarkSurface
        ? 'Yes'
        : 'No'

      expect(rows).toContainEqual([
        `\`${name}\``,
        colorSchemes,
        darkModeStyle,
        supportsDarkSurface,
      ])
    }
  })
})
