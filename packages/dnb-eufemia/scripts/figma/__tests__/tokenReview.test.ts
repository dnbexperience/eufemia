import path from 'node:path'
import {
  loadTokenModes,
  changedTokens,
  contrastRatio,
  parseColor,
  resolveTokenValues,
  reviewTokenChanges,
} from '../tokenReview'

it('resolves aliases and rejects missing or circular references', () => {
  expect(
    resolveTokenValues(
      ':root { --foundation: #fff; --token-color-text-neutral: var(--foundation); }'
    )
  ).toEqual({ '--token-color-text-neutral': '#fff' })
  expect(() =>
    resolveTokenValues(':root { --token-x: var(--missing); }')
  ).toThrow('Missing token reference')
  expect(() =>
    resolveTokenValues(
      ':root { --token-x: var(--token-y); --token-y: var(--token-x); }'
    )
  ).toThrow('Circular token reference')
})

it('compares resolved values even when token names do not change', () => {
  expect(
    changedTokens(
      { '--token-color-text-neutral': '#fff' },
      { '--token-color-text-neutral': '#ffffff' }
    )
  ).toEqual([])
  expect(
    changedTokens(
      { '--token-color-background-neutral': '#fff' },
      { '--token-color-background-neutral': '#ccc' }
    )
  ).toHaveLength(1)
})

it('handles alpha compositions and equivalent color-mix values', () => {
  expect(parseColor('color-mix(in srgb, #000 30%, transparent)')).toEqual(
    parseColor('rgba(0 0 0 / 30%)')
  )
  expect(contrastRatio('#000', '#fff', '#fff')).toBe(21)
  expect(contrastRatio('rgba(0 0 0 / 50%)', '#fff', '#fff')).toBeCloseTo(
    3.98,
    2
  )
  expect(() => parseColor('unrecognized')).toThrow(
    'Unsupported token color'
  )
})

const mode = (text: string, background: string) => [
  {
    name: 'DNB light' as const,
    tokens: {
      '--token-color-icon-info': '#000',
      '--token-color-stroke-info': '#000',
      '--token-color-background-page-background': '#fff',
      ...Object.fromEntries(
        ['neutral', 'neutral-alternative', 'action', 'error'].map(
          (name) => ['--token-color-text-' + name, text]
        )
      ),
      ...Object.fromEntries(
        [
          'neutral',
          'neutral-subtle',
          'neutral-base',
          'neutral-alternative',
          'info-subtle',
        ].map((name) => ['--token-color-background-' + name, background])
      ),
    },
  },
]

it('flags the actual darker-background regression while retaining names', () => {
  const result = reviewTokenChanges(
    mode('#007272', '#f2f2f5'),
    mode('#007272', '#ccc')
  )
  expect(
    result.regressions.filter((item) =>
      item.includes('--token-color-text-')
    )
  ).toHaveLength(20)
  expect(result.markdown).toContain('5.15:1 → 3.58:1; target 4.5:1')
})

it('reports existing failures without blocking unchanged or improved pairs', () => {
  expect(
    reviewTokenChanges(mode('#909090', '#fff'), mode('#909090', '#fff'))
      .regressions
  ).toEqual([])
  expect(
    reviewTokenChanges(mode('#909090', '#fff'), mode('#808080', '#fff'))
      .regressions
  ).toEqual([])
  expect(
    reviewTokenChanges(mode('#808080', '#fff'), mode('#909090', '#fff'))
      .regressions
  ).toHaveLength(20)
})

it('ignores support fallbacks when reviewing the modern token values', () => {
  expect(
    resolveTokenValues(
      ':root { --token-color-text-error: #123; } @supports not (color: color-mix(in srgb, red, red)) { :root { --token-color-text-error: #456; } }'
    )
  ).toEqual({ '--token-color-text-error': '#123' })
})

it('reports added and removed tokens', () => {
  expect(
    changedTokens(
      { '--token-radius-old': '1rem' },
      { '--token-radius-new': '2rem' }
    )
  ).toEqual([
    { name: '--token-radius-new', before: undefined, after: '2rem' },
    { name: '--token-radius-old', before: '1rem', after: undefined },
  ])
})

it('loads every shipped palette and resolves the colors used by the contrast checks', () => {
  const modes = loadTokenModes(path.resolve(__dirname, '../../../../..'))
  expect(modes.map(({ name }) => name)).toEqual([
    'DNB light',
    'DNB dark',
    'Sbanken light',
    'Sbanken dark',
    // @deprecated Transitional "sbanken-new" brand
    'Sbanken New light',
    // @deprecated Transitional "sbanken-new" brand
    'Sbanken New dark',
    'Carnegie light',
  ])
  for (const { tokens } of modes) {
    const ratio = contrastRatio(
      tokens['--token-color-text-error'],
      tokens['--token-color-background-neutral-subtle'],
      tokens['--token-color-background-page-background']
    )
    expect(ratio).toBeGreaterThan(1)
    expect(ratio).toBeLessThanOrEqual(21)
  }
})

it('detects an invisible neutral UI fill on its parent surface', () => {
  const before = mode('#000', '#eee')
  const after = mode('#000', '#eee')
  after[0].tokens['--token-color-background-neutral-base'] = '#fff'
  expect(
    reviewTokenChanges(before, after).regressions.some((line) =>
      line.includes(
        'background-neutral-base on --token-color-background-page-background'
      )
    )
  ).toBe(true)
})

it('uses the 3:1 icon target independently of the 4.5:1 text target', () => {
  const before = mode('#000', '#fff')
  const after = mode('#000', '#fff')
  before[0].tokens['--token-color-icon-info'] = '#909090'
  after[0].tokens['--token-color-icon-info'] = '#aaaaaa'
  expect(
    reviewTokenChanges(before, after).regressions.some((line) =>
      line.includes('icon-info')
    )
  ).toBe(true)
})

it('rejects invalid channel and opacity ranges', () => {
  expect(() => parseColor('rgb(999 0 0)')).toThrow('Invalid token color')
  expect(() => parseColor('rgba(0 0 0 / 150%)')).toThrow(
    'Invalid token color'
  )
  expect(() =>
    parseColor('color-mix(in srgb, #000 150%, transparent)')
  ).toThrow('Invalid token color')
})

it('validates new color tokens as well as existing colors', () => {
  expect(() =>
    changedTokens({}, { '--token-color-new': 'unknown-color' })
  ).toThrow('Unsupported token color')
})

it('rejects malformed numeric color channels', () => {
  expect(() => parseColor('rgb(1 2 3 /)')).toThrow(
    'Unsupported token color'
  )
  expect(() =>
    parseColor('color-mix(in srgb, #000 1.2.3%, transparent)')
  ).toThrow('Invalid token color')
})

it('names missing tokens used by the contrast contract', () => {
  const before = mode('#000', '#fff')
  const after = mode('#000', '#fff')
  delete after[0].tokens['--token-color-text-error']
  expect(() => reviewTokenChanges(before, after)).toThrow(
    'Missing contrast token: --token-color-text-error'
  )
})

it('rejects conditional declarations that the report cannot model', () => {
  expect(() =>
    resolveTokenValues(
      '@media (prefers-contrast: more) { :root { --token-color-text-error: #123; } }'
    )
  ).toThrow('Unsupported conditional token declaration: media')
})

it('blocks a new threshold failure even when the ratio change is tiny', () => {
  const gray = (ratio: number) => {
    const luminance = 1.05 / ratio - 0.05
    const channel = 255 * (1.055 * luminance ** (1 / 2.4) - 0.055)
    return 'rgb(' + [channel, channel, channel].join(' ') + ')'
  }
  expect(
    reviewTokenChanges(
      mode(gray(4.5002), '#fff'),
      mode(gray(4.4998), '#fff')
    ).regressions
  ).toHaveLength(20)
})
