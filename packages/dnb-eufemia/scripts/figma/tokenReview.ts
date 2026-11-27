import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { foundationPrefixMap } from '../prebuild/tasks/foundationPrefixMap.ts'

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
  transparencyBackground: string
) => {
  const base = parseColor(transparencyBackground)
  if (base[3] !== 1) {
    throw new Error('The transparency background must be opaque')
  }
  const surface = composite(parseColor(background), base)
  const text = composite(parseColor(foreground), surface)
  const a = luminance(text)
  const b = luminance(surface)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

type Brand = (typeof tokenModes)[number]['brand']

export type CrossBrandReference = { token: string; reference: string }

type TokenMode = {
  name: (typeof tokenModes)[number]['name']
  tokens: TokenValues
  crossBrandReferences?: CrossBrandReference[]
}

export const findCrossBrandReferences = (
  css: string,
  brand: Brand
): CrossBrandReference[] => {
  // The legacy Eiendom theme uses the DNB foundation
  const ownPrefix =
    brand === 'eiendom'
      ? foundationPrefixMap.ui.css
      : foundationPrefixMap[brand].css
  const prefixes = Object.values(foundationPrefixMap).map(({ css }) => css)
  const referencePattern = new RegExp(
    `var\\(\\s*(--(${prefixes.join('|')})-[\\w-]+)\\s*\\)`,
    'g'
  )
  return Object.entries(collectDeclarations(css))
    .filter(([name]) => name.startsWith('--token-'))
    .sort(([a], [b]) => a.localeCompare(b))
    .flatMap(([token, value]) =>
      [...value.matchAll(referencePattern)]
        .filter(([, , prefix]) => prefix !== ownPrefix)
        .map(([, reference]) => ({ token, reference }))
    )
}

const collectDeclarations = (css: string): TokenValues => {
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
  return declarations
}

export const resolveTokenValues = (css: string): TokenValues => {
  const declarations = collectDeclarations(css)
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
): TokenMode[] => {
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
    return {
      name,
      tokens: resolveTokenValues(css),
      crossBrandReferences: findCrossBrandReferences(css, brand),
    }
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

// A transparent background is blended onto its transparency background, the page background by default.
type ContrastPair = {
  foreground: string
  background: string
  minimum: number
  transparencyBackground?: string
}

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

export const contrastPairs: ContrastPair[] = [
  ...textContrastPairs,
  ...iconContrastPairs,
  ...surfaceContrastPairs,
]

const defaultTransparencyBackground =
  '--token-color-background-page-background'

export const makePropertiesLockFile =
  'packages/dnb-eufemia/src/style/themes/figma/makeProperties.lock.json'

/** A held back token as stored in the lock file, with the declaration make-properties writes instead of the Figma value */
export type LockedToken = HeldBackToken & {
  declaration: string
  fallback?: string
}

export type HeldBackToken = {
  theme: string
  token: string
  keptValue: string
  rejectedValue: string
  checkedAgainst: string
  oldContrast: number
  rejectedContrast: number
  target: number
  cause?: string
}

const pairRatio = (tokens: TokenValues, pair: ContrastPair) => {
  const transparencyBackground =
    pair.transparencyBackground ?? defaultTransparencyBackground
  for (const name of [
    pair.foreground,
    pair.background,
    transparencyBackground,
  ]) {
    if (tokens[name] === undefined) {
      throw new Error('Missing contrast token: ' + name)
    }
  }
  return contrastRatio(
    tokens[pair.foreground],
    tokens[pair.background],
    tokens[transparencyBackground]
  )
}

// A sub-threshold pair must not lose contrast. The tolerance only covers numerical noise.
const isContrastRegression = (
  oldRatio: number,
  newRatio: number,
  minimum: number
) =>
  newRatio < minimum &&
  (oldRatio >= minimum || newRatio < oldRatio - 0.001)

const round = (ratio: number) => Math.round(ratio * 100) / 100

// Maps each decided token to true when it is held back and false when it is kept
type Decisions = Map<string, boolean>

const heldCount = (decisions: Decisions) =>
  [...decisions.values()].filter(Boolean).length

/**
 * Keeps the previous value of as few tokens as possible, so that no contrast pair regresses.
 * Certain decisions are locked first. The remaining conflicts are decided by two greedy
 * passes, and the one that holds back fewer tokens is used. See scripts/figma/TOKEN_REVIEW.md.
 */
export const holdBackContrastRegressions = (
  theme: string,
  before: TokenValues,
  after: TokenValues
) => {
  const pairs = contrastPairs.map((pair) => {
    const members = [pair.foreground, pair.background]
    const transparencyBackground =
      pair.transparencyBackground ?? defaultTransparencyBackground
    const isTransparent = [before, after].some(
      (tokens) =>
        tokens[pair.background] !== undefined &&
        parseColor(tokens[pair.background])[3] < 1
    )
    if (isTransparent && !members.includes(transparencyBackground)) {
      members.push(transparencyBackground)
    }
    const oldRatio = pairRatio(before, pair)
    pairRatio(after, pair)

    return {
      pair,
      members,
      oldRatio,
      passes: (tokens: TokenValues) =>
        !isContrastRegression(
          oldRatio,
          pairRatio(tokens, pair),
          pair.minimum
        ),
    }
  })

  const role = (name: string) =>
    pairs.some(({ pair }) => pair.foreground === name)
      ? 0
      : pairs.some(({ pair }) => pair.background === name)
        ? 1
        : 2
  const changed = [...new Set(pairs.flatMap(({ members }) => members))]
    .filter((name) => !sameValue(name, before[name], after[name]))
    .sort((a, b) => role(a) - role(b) || a.localeCompare(b))
  const isChanged = new Set(changed)

  const valuesOf = (decisions: Decisions, held = new Set<string>()) =>
    new Proxy(after, {
      get: (target, name: string) =>
        decisions.get(name) || held.has(name)
          ? before[name]
          : target[name],
    })
  const openOf = (decisions: Decisions) =>
    changed.filter((name) => !decisions.has(name))

  // Locks every decision that follows from a single pair. Returns null when a pair can't pass.
  const propagate = (start: Decisions): Decisions | null => {
    const decisions = new Map(start)
    for (let locked = true; locked; ) {
      locked = false
      const safeKeeps = new Set(openOf(decisions))
      for (const entry of pairs) {
        const open = entry.members.filter(
          (name) => isChanged.has(name) && !decisions.has(name)
        )
        const combinations = Array.from(
          { length: 2 ** open.length },
          (_, bits) =>
            new Set(open.filter((_, index) => bits & (1 << index)))
        )
        const passing = combinations.filter((held) =>
          entry.passes(valuesOf(decisions, held))
        )
        if (!passing.length) {
          return null
        }
        for (const name of open) {
          const keptPassing = passing.filter((held) => !held.has(name))
          if (keptPassing.length < combinations.length / 2) {
            safeKeeps.delete(name)
          }
          if (passing.every((held) => held.has(name))) {
            decisions.set(name, true)
            locked = true
          } else if (passing.every((held) => !held.has(name))) {
            decisions.set(name, false)
            locked = true
          }
        }
      }
      for (const name of safeKeeps) {
        if (!decisions.has(name)) {
          decisions.set(name, false)
          locked = true
        }
      }
    }
    return decisions
  }

  // Also holds back tokens that can't be kept because keeping them eventually forces their own hold
  const settle = (start: Decisions | null): Decisions | null => {
    for (let decisions = start && propagate(start); decisions; ) {
      const impossible = openOf(decisions).filter(
        (name) => !propagate(new Map(decisions).set(name, false))
      )
      if (!impossible.length) {
        return decisions
      }
      for (const name of impossible) {
        decisions.set(name, true)
      }
      decisions = propagate(decisions)
    }
    return null
  }

  const allHeld = new Map(changed.map((name) => [name, true]))
  const locked = settle(new Map()) ?? allHeld

  type Option = {
    kept: Decisions | null
    held: Decisions | null
    kill: number
    bundle: number
  }
  const greedy = (pick: (options: Option[]) => Decisions | null) => {
    let decisions: Decisions | null = locked
    while (decisions && openOf(decisions).length) {
      const current = decisions
      const options = openOf(current).map((name) => {
        const kept = propagate(new Map(current).set(name, false))
        const held = propagate(new Map(current).set(name, true))
        return {
          kept,
          held,
          kill: kept ? heldCount(kept) - heldCount(current) : Infinity,
          bundle: held ? heldCount(held) - heldCount(current) : Infinity,
        }
      })
      decisions = settle(pick(options))
    }

    // Holding every open token is always safe, because only safe keeps are locked
    const result = new Map(
      decisions ?? [
        ...locked,
        ...openOf(locked).map((name) => [name, true] as const),
      ]
    )

    // A greedy hold can become unnecessary after later holds, so release it again if possible
    for (const name of changed) {
      if (result.get(name)) {
        result.set(name, false)
        if (
          !pairs.every(
            (entry) =>
              !entry.members.includes(name) ||
              entry.passes(valuesOf(result))
          )
        ) {
          result.set(name, true)
        }
      }
    }
    return result
  }

  const holdHighest = greedy((options) => {
    const option = options.reduce((best, next) =>
      next.kill > best.kill ? next : best
    )
    return option.kill > option.bundle ? option.held : option.kept
  })
  const keepLowest = greedy(
    (options) =>
      options.reduce((best, next) => (next.kill < best.kill ? next : best))
        .kept
  )
  const decisions =
    heldCount(keepLowest) < heldCount(holdHighest)
      ? keepLowest
      : holdHighest

  const tokens = { ...after }
  const heldBack: HeldBackToken[] = []
  for (const name of [...changed].sort()) {
    if (!decisions.get(name)) {
      continue
    }
    tokens[name] = before[name]

    const rejected = new Map(decisions).set(name, false)
    const entry = pairs.find(
      (entry) =>
        entry.members.includes(name) && !entry.passes(valuesOf(rejected))
    )
    const { pair } = entry

    // A pair that passes with the Figma values only regresses because another member was held back
    const cause = entry.passes(after)
      ? entry.members.find(
          (member) => member !== name && decisions.get(member)
        )
      : undefined

    heldBack.push({
      theme,
      token: name,
      keptValue: before[name],
      rejectedValue: after[name],
      checkedAgainst:
        name === pair.foreground
          ? pair.background
          : name === pair.background
            ? pair.foreground
            : pair.foreground + ' on ' + pair.background,
      oldContrast: round(entry.oldRatio),
      rejectedContrast: round(pairRatio(valuesOf(rejected), pair)),
      target: pair.minimum,
      cause,
    })
  }

  return { tokens, heldBack }
}

const table = (
  description: string,
  header: string[],
  rows: string[][]
) => [
  description,
  '',
  ...(rows.length
    ? [
        '| ' + header.join(' | ') + ' |',
        '| ' + header.map(() => '---').join(' | ') + ' |',
        ...rows.map((row) => '| ' + row.join(' | ') + ' |'),
      ]
    : ['None.']),
]

const ratioText = (ratio: number) => ratio.toFixed(2) + ':1'

export const reviewTokenChanges = (
  before: ReturnType<typeof loadTokenModes>,
  after: ReturnType<typeof loadTokenModes>,
  heldBack: HeldBackToken[] = []
) => {
  const changes: string[][] = []
  const regressions: string[] = []
  const existingFailures: string[][] = []
  const newCrossBrandReferences: string[][] = []
  for (const current of after) {
    const previous = before.find(({ name }) => name === current.name)
    if (!previous) {
      throw new Error('Missing base theme: ' + current.name)
    }
    for (const { token, reference } of current.crossBrandReferences ??
      []) {
      const existed = (previous.crossBrandReferences ?? []).some(
        (item) => item.token === token && item.reference === reference
      )
      if (!existed) {
        newCrossBrandReferences.push([current.name, token, reference])
      }
    }
    for (const change of changedTokens(previous.tokens, current.tokens)) {
      changes.push([
        current.name,
        change.name,
        change.before ?? 'Not present',
        change.after ?? 'Removed',
      ])
    }
    for (const pair of contrastPairs) {
      const oldRatio = pairRatio(previous.tokens, pair)
      const newRatio = pairRatio(current.tokens, pair)
      if (newRatio >= pair.minimum) {
        continue
      }
      if (isContrastRegression(oldRatio, newRatio, pair.minimum)) {
        regressions.push(
          current.name +
            ': ' +
            pair.foreground +
            ' on ' +
            pair.background +
            ' (' +
            ratioText(oldRatio) +
            ' → ' +
            ratioText(newRatio) +
            '; target ' +
            pair.minimum +
            ':1)'
        )
      } else {
        existingFailures.push([
          current.name,
          pair.foreground,
          pair.background,
          ratioText(oldRatio),
          ratioText(newRatio),
          pair.minimum + ':1',
        ])
      }
    }
  }
  const lines = [
    '## Held back tokens',
    '',
    ...table(
      'These Figma values would lower contrast below the target, so the previous value is kept until Figma fixes them.',
      [
        'Theme / mode',
        'Token',
        'Kept value',
        'Rejected Figma value',
        'Checked against',
        'Old contrast',
        'Rejected contrast',
        'Target',
        'Cascade cause',
      ],
      heldBack.map((item) => [
        item.theme,
        item.token,
        item.keptValue,
        item.rejectedValue,
        item.checkedAgainst,
        ratioText(item.oldContrast),
        ratioText(item.rejectedContrast),
        item.target + ':1',
        item.cause ? item.cause + ' held back' : '–',
      ])
    ),
    '',
    '## Resolved design token changes',
    '',
    ...table(
      'Semantic tokens whose generated value changed, compared with the base.',
      ['Theme / mode', 'Token', 'Before', 'After'],
      changes
    ),
    '',
    '## New cross-brand foundation references',
    '',
    ...table(
      'Tokens that now use a foundation color from another brand. Check in Figma that this is intended.',
      ['Theme / mode', 'Token', 'Foundation variable'],
      newCrossBrandReferences
    ),
    '',
    '## Existing pairs below their contrast target',
    '',
    ...table(
      "Pairs that were already below the target. They don't block anything, but should be fixed in Figma.",
      [
        'Theme / mode',
        'Token',
        'Checked against',
        'Old contrast',
        'New contrast',
        'Target',
      ],
      existingFailures
    ),
  ]
  if (regressions.length) {
    lines.push(
      '',
      '## Contrast regressions',
      '',
      'These pairs lost contrast in the generated files, which the token generator should have prevented.',
      '',
      ...regressions.map((line) => '- ' + line)
    )
  }
  return { markdown: lines.join('\n') + '\n', regressions }
}
