import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'

export const tokenModes = [
  { brand: 'ui', mode: 'light', name: 'DNB light' },
  { brand: 'ui', mode: 'dark', name: 'DNB dark' },
  { brand: 'sbanken', mode: 'light', name: 'Sbanken light' },
  { brand: 'sbanken', mode: 'dark', name: 'Sbanken dark' },
  // @deprecated Transitional "coconut" brand, removed later
  { brand: 'coconut', mode: 'light', name: 'Coconut light' },
  // @deprecated Transitional "coconut" brand, removed later
  { brand: 'coconut', mode: 'dark', name: 'Coconut dark' },
  { brand: 'carnegie', mode: 'light', name: 'Carnegie light' },
  { brand: 'eiendom', mode: 'light', name: 'Eiendom light' },
  { brand: 'eiendom', mode: 'dark', name: 'Eiendom dark' },
  { brand: 'birdhouse', mode: 'light', name: 'Birdhouse light' },
  { brand: 'birdhouse', mode: 'dark', name: 'Birdhouse dark' },
] as const

type Color = [number, number, number, number]
export type TokenValues = Record<string, string>

export const parseColor = (value: string): Color => {
  const hex = value.match(/^#([a-f\d]{3}|[a-f\d]{6})$/i)?.[1]
  if (hex) {
    const expanded =
      hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex
    return [0, 2, 4]
      .map((i) => parseInt(expanded.slice(i, i + 2), 16))
      .concat(1) as Color
  }
  if (value === 'transparent') {
    return [0, 0, 0, 0]
  }
  if (/^rgba?\(/i.test(value) && value.endsWith(')')) {
    const channels = value
      .slice(value.indexOf('(') + 1, -1)
      .trim()
      .split(/[\s,/]+/)
    if (
      channels.some((channel) => !channel) ||
      (channels.length !== 3 && channels.length !== 4)
    ) {
      throw new Error('Unsupported token color: ' + value)
    }
    const rgb = channels.slice(0, 3).map(Number)
    const opacity = channels[3]
    const alpha =
      opacity === undefined
        ? 1
        : Number(opacity.replace('%', '')) /
          (opacity.endsWith('%') ? 100 : 1)
    if (
      rgb.some(
        (channel) =>
          !Number.isFinite(channel) || channel < 0 || channel > 255
      ) ||
      !Number.isFinite(alpha) ||
      alpha < 0 ||
      alpha > 1
    ) {
      throw new Error('Invalid token color: ' + value)
    }
    return [...rgb, alpha] as Color
  }
  const mix = value.match(
    /^color-mix\(\s*in srgb,\s*(.+?)\s+([\d.]+)%,\s*transparent\s*\)$/i
  )
  if (mix) {
    const weight = Number(mix[2]) / 100
    if (!Number.isFinite(weight) || weight < 0 || weight > 1) {
      throw new Error('Invalid token color: ' + value)
    }
    const color = parseColor(mix[1])
    color[3] *= weight
    return color
  }
  throw new Error('Unsupported token color: ' + value)
}

const composite = (foreground: Color, background: Color): Color => {
  const alpha = foreground[3] + background[3] * (1 - foreground[3])
  if (alpha === 0) {
    return [0, 0, 0, 0]
  }
  return [0, 1, 2]
    .map(
      (i) =>
        (foreground[i] * foreground[3] +
          background[i] * background[3] * (1 - foreground[3])) /
        alpha
    )
    .concat(alpha) as Color
}

const luminance = (color: Color) =>
  color.slice(0, 3).reduce((sum, channel, index) => {
    const value = channel / 255
    return (
      sum +
      (value <= 0.04045
        ? value / 12.92
        : ((value + 0.055) / 1.055) ** 2.4) *
        [0.2126, 0.7152, 0.0722][index]
    )
  }, 0)

export const contrastRatio = (
  foreground: string,
  background: string,
  page: string
) => {
  const pageColor = parseColor(page)
  if (pageColor[3] !== 1) {
    throw new Error('The page background must be opaque')
  }
  const surface = composite(parseColor(background), pageColor)
  const text = composite(parseColor(foreground), surface)
  const a = luminance(text)
  const b = luminance(surface)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export const resolveTokenValues = (css: string): TokenValues => {
  const declarations: TokenValues = {}
  postcss.parse(css).walkDecls((declaration) => {
    if (!declaration.prop.startsWith('--')) {
      return
    }
    let parent: postcss.AnyNode = declaration.parent
    while (parent) {
      if (
        parent.type === 'atrule' &&
        parent.name === 'supports' &&
        parent.params === 'not (color: color-mix(in srgb, red, red))'
      ) {
        return
      }
      if (parent.type === 'atrule') {
        throw new Error(
          'Unsupported conditional token declaration: ' + parent.name
        )
      }
      parent = parent.parent
    }
    declarations[declaration.prop] = declaration.value
  })
  const resolve = (name: string, chain: string[] = []): string => {
    if (chain.includes(name)) {
      throw new Error(
        'Circular token reference: ' + [...chain, name].join(' -> ')
      )
    }
    const value = declarations[name]
    if (value === undefined) {
      throw new Error('Missing token reference: ' + name)
    }
    return value.replace(/var\(\s*(--[\w-]+)\s*\)/g, (_, reference) =>
      resolve(reference, [...chain, name])
    )
  }
  return Object.fromEntries(
    Object.keys(declarations)
      .filter((name) => name.startsWith('--token-'))
      .sort()
      .map((name) => [name, resolve(name)])
  )
}

export const loadTokenModes = (
  repositoryRoot: string,
  revision?: string
) => {
  const read = (file: string) =>
    revision
      ? execFileSync('git', ['show', revision + ':' + file], {
          cwd: repositoryRoot,
          encoding: 'utf8',
        })
      : readFileSync(path.join(repositoryRoot, file), 'utf8')
  return tokenModes.map(({ brand, mode, name }) => {
    const themeRoot = 'packages/dnb-eufemia/src/style/themes/'
    let sourceBrand: string = brand
    if (revision && brand === 'birdhouse') {
      const existing = execFileSync(
        'git',
        [
          'ls-tree',
          '--name-only',
          revision,
          '--',
          themeRoot + brand + '/foundation.scss',
        ],
        { cwd: repositoryRoot, encoding: 'utf8' }
      )
      // Compare the new identity with legacy Eiendom on its first introduction.
      if (!existing.trim()) {
        sourceBrand = 'eiendom'
      }
    }
    const root = themeRoot + sourceBrand + '/'
    const sourceUrl = new URL('token-review:/' + root + 'entry.scss')
    const css = sass.compileString(
      read(root + 'foundation.scss') +
        '\n' +
        read(root + 'tokens.scss') +
        (mode === 'dark' ? '\n' + read(root + 'tokens-dark.scss') : ''),
      {
        url: sourceUrl,
        importers: [
          {
            canonicalize: (url, { containingUrl }) =>
              new URL(url, containingUrl ?? sourceUrl),
            load: (url) => ({
              contents: read(decodeURIComponent(url.pathname).slice(1)),
              syntax: 'scss',
            }),
          },
        ],
      }
    ).css
    return { name, tokens: resolveTokenValues(css) }
  })
}

const sameValue = (name: string, a: string, b: string) =>
  name.startsWith('--token-color-')
    ? JSON.stringify(parseColor(a)) === JSON.stringify(parseColor(b))
    : a === b

export const changedTokens = (before: TokenValues, after: TokenValues) =>
  [...new Set([...Object.keys(before), ...Object.keys(after)])]
    .sort()
    .flatMap((name) => {
      for (const value of [before[name], after[name]]) {
        if (name.startsWith('--token-color-') && value !== undefined) {
          parseColor(value)
        }
      }
      if (
        before[name] !== undefined &&
        after[name] !== undefined &&
        sameValue(name, before[name], after[name])
      ) {
        return []
      }
      return [{ name, before: before[name], after: after[name] }]
    })

// Normal text requires 4.5:1. These pairs cover application surfaces and filled form containers.
export const textContrastPairs = [
  'neutral',
  'neutral-alternative',
  'action',
  'error',
].flatMap((text) =>
  [
    'neutral',
    'neutral-subtle',
    'neutral-base',
    'neutral-alternative',
    'info-subtle',
  ].map((background) => ({
    foreground: '--token-color-text-' + text,
    background: '--token-color-background-' + background,
    minimum: 4.5,
  }))
)

// Decorative status fills need to remain visible against their parent surface.
// This 1.01 threshold detects identical fills; it is not a WCAG requirement.
export const surfaceContrastPairs = [
  {
    foreground: '--token-color-background-neutral-base',
    background: '--token-color-background-page-background',
    minimum: 1.01,
  },
  {
    foreground: '--token-color-background-neutral-base',
    background: '--token-color-background-neutral',
    minimum: 1.01,
  },
]

export const iconContrastPairs = [
  ...['action-focus', 'action'].flatMap((stroke) =>
    ['neutral', 'neutral-subtle', 'neutral-base'].map((background) => ({
      foreground: '--token-color-stroke-' + stroke,
      background: '--token-color-background-' + background,
      minimum: 3,
    }))
  ),
  {
    foreground: '--token-color-icon-info',
    background: '--token-color-background-info-subtle',
    minimum: 3,
  },
  {
    foreground: '--token-color-stroke-info',
    background: '--token-color-background-page-background',
    minimum: 3,
  },
]

// Remove these temporary acceptances when the Coconut error colors and the
// Birdhouse dark error and action colors are corrected in Figma.
const acceptedContrastChanges = [
  {
    theme: 'Coconut light',
    foreground: '--token-color-text-error',
    background: '--token-color-background-neutral-base',
    before: ['#d8134b', '#f2f2f7'],
    after: ['#c82610', '#dedfd8'],
  },
  {
    theme: 'Coconut light',
    foreground: '--token-color-text-error',
    background: '--token-color-background-neutral-alternative',
    before: ['#d8134b', '#ebebf1'],
    after: ['#c82610', '#dedfd8'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-text-error',
    background: '--token-color-background-neutral-subtle',
    before: ['#fcdddd', '#003842'],
    after: ['#ff5959', '#003842'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-text-error',
    background: '--token-color-background-neutral-base',
    before: ['#fcdddd', '#0a4e5a'],
    after: ['#ff5959', '#0a4e5a'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-stroke-action-focus',
    background: '--token-color-background-neutral',
    before: ['#e1e9f9', '#0b2b34'],
    after: ['#276ace', '#0b2b34'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-stroke-action-focus',
    background: '--token-color-background-neutral-subtle',
    before: ['#e1e9f9', '#003842'],
    after: ['#276ace', '#003842'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-stroke-action-focus',
    background: '--token-color-background-neutral-base',
    before: ['#e1e9f9', '#0a4e5a'],
    after: ['#276ace', '#0a4e5a'],
  },
  {
    theme: 'Birdhouse dark',
    foreground: '--token-color-stroke-action',
    background: '--token-color-background-neutral-base',
    before: ['#8bb1bb', '#0a4e5a'],
    after: ['#578f9b', '#0a4e5a'],
  },
]

export const reviewTokenChanges = (
  before: ReturnType<typeof loadTokenModes>,
  after: ReturnType<typeof loadTokenModes>
) => {
  const lines = [
    '## Resolved design token changes',
    '',
    '| Theme / mode | Token | Before | After |',
    '| --- | --- | --- | --- |',
  ]
  const regressions: string[] = []
  const acceptedRegressions: string[] = []
  const existingFailures: string[] = []
  for (const current of after) {
    const previous = before.find(({ name }) => name === current.name)
    if (!previous) {
      throw new Error('Missing base theme: ' + current.name)
    }
    for (const change of changedTokens(previous.tokens, current.tokens)) {
      lines.push(
        '| ' +
          [
            current.name,
            change.name,
            change.before ?? 'Not present',
            change.after ?? 'Removed',
          ].join(' | ') +
          ' |'
      )
    }
    for (const pair of [
      ...textContrastPairs,
      ...iconContrastPairs,
      ...surfaceContrastPairs,
    ]) {
      const ratio = (tokens: TokenValues) => {
        for (const name of [
          pair.foreground,
          pair.background,
          '--token-color-background-page-background',
        ]) {
          if (tokens[name] === undefined) {
            throw new Error('Missing contrast token: ' + name)
          }
        }
        return contrastRatio(
          tokens[pair.foreground],
          tokens[pair.background],
          tokens['--token-color-background-page-background']
        )
      }
      const oldRatio = ratio(previous.tokens)
      const newRatio = ratio(current.tokens)
      if (newRatio >= pair.minimum) {
        continue
      }
      const detail =
        current.name +
        ': ' +
        pair.foreground +
        ' on ' +
        pair.background +
        ' (' +
        oldRatio.toFixed(2) +
        ':1 → ' +
        newRatio.toFixed(2) +
        ':1; target ' +
        pair.minimum +
        ':1)'
      // A sub-threshold pair must not lose contrast. The tolerance only covers numerical noise.
      if (oldRatio >= pair.minimum || newRatio < oldRatio - 0.001) {
        const accepted = acceptedContrastChanges.some(
          (change) =>
            change.theme === current.name &&
            change.foreground === pair.foreground &&
            change.background === pair.background &&
            [pair.foreground, pair.background].every(
              (name, index) =>
                sameValue(
                  name,
                  previous.tokens[name],
                  change.before[index]
                ) &&
                sameValue(name, current.tokens[name], change.after[index])
            )
        )
        if (accepted) {
          acceptedRegressions.push(detail)
        } else {
          regressions.push(detail)
        }
      } else {
        existingFailures.push(detail)
      }
    }
  }
  lines.push(
    '',
    '## Contrast regressions',
    '',
    ...(regressions.length
      ? regressions.map((line) => '- ' + line)
      : ['None.']),
    ...(acceptedRegressions.length
      ? [
          '',
          '## Accepted temporary contrast regressions',
          '',
          'Accepted by [Snorre](https://github.com/dnbexperience/eufemia/pull/10759#issuecomment-6917082027) pending the Coconut UX contrast fixes. These pairs remain below their contrast target.',
          '',
          ...acceptedRegressions.map((line) => '- ' + line),
        ]
      : []),
    '',
    '## Existing pairs below their contrast target',
    '',
    ...(existingFailures.length
      ? existingFailures.map((line) => '- ' + line)
      : ['None.'])
  )
  return { markdown: lines.join('\n') + '\n', regressions }
}
