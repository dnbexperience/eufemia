import fs from 'node:fs'
import path from 'node:path'
import prismTheme from '../dnb-prism-theme'

const themesDir = path.resolve(__dirname, '../../..')

function readProperties(files: Array<string>) {
  const properties: Record<string, string> = {}

  for (const file of files) {
    const content = fs.readFileSync(path.join(themesDir, file), 'utf-8')
    const pattern = /(--[\w-]+):\s*([^;]+);/g
    let match: RegExpExecArray | null
    while ((match = pattern.exec(content))) {
      properties[match[1]] = match[2].trim()
    }
  }

  return properties
}

function toRgb(
  value: string,
  properties: Record<string, string>
): Array<number> {
  const reference = value.match(/^var\((--[\w-]+)\)$/)
  if (reference) {
    return toRgb(properties[reference[1]], properties)
  }

  const mix = value.match(/^color-mix\(in srgb, (.+), (.+)\)$/)
  if (mix) {
    const first = toRgb(mix[1], properties)
    const second = toRgb(mix[2], properties)

    return first.map((channel, index) => (channel + second[index]) / 2)
  }

  const hex =
    value.length === 4
      ? value.replace(/\w/g, (char) => char + char)
      : value

  return [1, 3, 5].map((index) =>
    parseInt(hex.slice(index, index + 2), 16)
  )
}

function luminance(rgb: Array<number>) {
  const [r, g, b] = rgb.map((value) => {
    const channel = value / 255
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(first: Array<number>, second: Array<number>) {
  const [light, dark] = [luminance(first), luminance(second)].sort(
    (a, b) => b - a
  )

  return (light + 0.05) / (dark + 0.05)
}

describe('dnb-prism-theme deleted', () => {
  // The Pre element uses --color-black-80 as background in every theme and color scheme
  it.each([
    ['ui', 'tokens.scss'],
    ['ui', 'tokens-dark.scss'],
    ['sbanken', 'tokens.scss'],
    ['sbanken', 'tokens-dark.scss'],
    ['carnegie', 'tokens.scss'],
  ])(
    'should give deleted lines enough contrast on the Pre background in %s/%s',
    (theme, tokensFile) => {
      const properties = readProperties([
        'ui/properties.scss',
        'ui/foundation.scss',
        `${theme}/properties.scss`,
        `${theme}/foundation.scss`,
        `${theme}/${tokensFile}`,
      ])
      const { style } = prismTheme.styles.find(({ types }) =>
        types.includes('deleted')
      )

      expect(
        contrast(
          toRgb(style.color, properties),
          toRgb('var(--color-black-80)', properties)
        )
      ).toBeGreaterThanOrEqual(4.5)
    }
  )
})
