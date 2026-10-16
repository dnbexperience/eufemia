import fs from 'node:fs'
import path from 'node:path'
import prismTheme from '../dnb-prism-theme'

const uiDir = path.resolve(__dirname, '../..')

function readProperties(files: Array<string>) {
  const properties: Record<string, string> = {}

  for (const file of files) {
    const content = fs.readFileSync(path.join(uiDir, file), 'utf-8')
    for (const [, name, value] of content.matchAll(
      /(--[\w-]+):\s*([^;]+);/g
    )) {
      properties[name] = value.trim()
    }
  }

  return properties
}

function resolveColor(value: string, properties: Record<string, string>) {
  const reference = value.match(/^var\((--[\w-]+)\)$/)
  if (reference) {
    return resolveColor(properties[reference[1]], properties)
  }

  return value
}

function luminance(hex: string) {
  const full =
    hex.length === 4
      ? `#${[...hex.slice(1)].map((char) => char + char).join('')}`
      : hex
  const [r, g, b] = [1, 3, 5].map((index) => {
    const channel = parseInt(full.slice(index, index + 2), 16) / 255
    return channel <= 0.03928
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

function contrast(first: string, second: string) {
  const [light, dark] = [luminance(first), luminance(second)].sort(
    (a, b) => b - a
  )

  return (light + 0.05) / (dark + 0.05)
}

describe('dnb-prism-theme', () => {
  // The Pre element uses --color-black-80 as background in every color scheme
  it.each([
    ['light', 'tokens.scss'],
    ['dark', 'tokens-dark.scss'],
  ])(
    'should give booleans and selectors enough contrast on the Pre background in %s mode',
    (_, tokensFile) => {
      const properties = readProperties([
        'properties.scss',
        'foundation.scss',
        tokensFile,
      ])
      const background = resolveColor('var(--color-black-80)', properties)

      for (const type of ['boolean', 'selector']) {
        const { style } = prismTheme.styles.find(({ types }) =>
          types.includes(type)
        )
        const color = resolveColor(style.color, properties)

        expect(contrast(color, background)).toBeGreaterThanOrEqual(4.5)
      }
    }
  )
})
