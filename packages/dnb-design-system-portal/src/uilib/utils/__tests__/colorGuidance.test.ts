// @vitest-environment node

import { readFileSync } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import { assert, describe, expect, it } from 'vitest'
import { themeCapabilities } from '@dnb/eufemia/src/style/themes/capabilities'

const documentedThemes = ['ui', 'sbanken', 'eiendom', 'carnegie'] as const

const docsRoot = path.resolve(
  __dirname,
  '../../../docs/web/styling-and-themes'
)
const themesRoot = path.resolve(
  __dirname,
  '../../../../../dnb-eufemia/src/style/themes'
)
const guidance = readFileSync(
  path.join(docsRoot, 'color-guidance.mdx'),
  'utf8'
)

function tablePairs(heading: string) {
  const section = guidance
    .split('## ' + heading + '\n')[1]
    ?.split('\n## ')[0]
  const tokens = (cell: string) =>
    [...cell.matchAll(/`([\w-]+)`/g)].map((match) => match[1])

  return (section ?? '')
    .split('\n')
    .filter((line) => line.startsWith('|'))
    .flatMap((line) => {
      const [, background, foreground] = line.split('|')
      return tokens(background).flatMap((background) =>
        tokens(foreground).map((foreground) => ({
          background: '--token-color-' + background,
          foreground: '--token-color-' + foreground,
        }))
      )
    })
}

function luminance(value: string) {
  if (!/^#([\da-f]{3}|[\da-f]{6})$/i.test(value)) {
    throw new Error('Expected an opaque hex color, received ' + value)
  }

  const hex = value.slice(1)
  const expanded = hex.length === 3 ? hex.replace(/./g, '$&$&') : hex
  return [0, 2, 4].reduce((sum, offset, index) => {
    const channel = parseInt(expanded.slice(offset, offset + 2), 16) / 255
    const linear =
      channel <= 0.04045
        ? channel / 12.92
        : ((channel + 0.055) / 1.055) ** 2.4
    return sum + linear * [0.2126, 0.7152, 0.0722][index]
  }, 0)
}

for (const brand of documentedThemes) {
  for (const scheme of themeCapabilities[brand].colorSchemes) {
    describe(brand + ' ' + scheme + ' color guidance', () => {
      const files = ['foundation', 'tokens']
      if (scheme === 'dark') {
        files.push('tokens-dark')
      }
      const css = files
        .map(
          (file) =>
            sass.compile(path.join(themesRoot, brand, file + '.scss')).css
        )
        .join('\n')
      const properties = Object.fromEntries(
        [...css.matchAll(/(--[\w-]+):\s*([^;]+);/g)].map((match) => [
          match[1],
          match[2].trim(),
        ])
      )
      const resolve = (name: string): string => {
        const value = properties[name]
        const reference = value?.match(/^var\(\s*(--[\w-]+)\s*\)$/)
        if (reference) {
          return resolve(reference[1])
        }
        if (!value) {
          throw new Error('Missing color token ' + name)
        }
        return value
      }
      const contrast = (foreground: string, background: string) => {
        const first = luminance(resolve(foreground))
        const second = luminance(resolve(background))
        return (
          (Math.max(first, second) + 0.05) /
          (Math.min(first, second) + 0.05)
        )
      }

      it('keeps the documented text pairs at or above 4.5:1', () => {
        const pairs = tablePairs('Text and background pairs')
        expect(pairs.length).toBeGreaterThan(0)
        for (const { foreground, background } of pairs) {
          assert.isAtLeast(
            contrast(foreground, background),
            4.5,
            foreground + ' on ' + background
          )
        }
      })

      it('keeps the filled action example readable', () => {
        const info = readFileSync(
          path.join(docsRoot, 'design-tokens/info.mdx'),
          'utf8'
        )
        const example = info.match(/\.my-button \{([^}]+)\}/)?.[1] ?? ''
        const foreground = example.match(
          /\n\s*color: var\((--[\w-]+)\)/
        )?.[1]
        const background = example.match(
          /background-color: var\((--[\w-]+)\)/
        )?.[1]
        if (!foreground || !background) {
          throw new Error(
            'Missing foreground or background in action example'
          )
        }
        expect(contrast(foreground, background)).toBeGreaterThanOrEqual(
          4.5
        )
      })

      it('keeps the documented outlines at or above 3:1', () => {
        const pairs = tablePairs('Strokes and icons')
        expect(pairs.length).toBeGreaterThan(0)
        for (const { foreground, background } of pairs) {
          assert.isAtLeast(
            contrast(foreground, background),
            3,
            foreground + ' on ' + background
          )
        }
      })
    })
  }
}
