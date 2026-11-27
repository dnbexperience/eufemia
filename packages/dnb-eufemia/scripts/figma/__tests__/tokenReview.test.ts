import {
  type CrossBrandReference,
  changedTokens,
  contrastRatio,
  findCrossBrandReferences,
  holdBackContrastRegressions,
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
      '--token-color-stroke-action-focus': '#000',
      '--token-color-stroke-action': '#000',
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

it('holds back a token that would lower contrast and keeps the other changes', () => {
  const before = mode('#000', '#fff')[0].tokens
  const after = {
    ...before,
    '--token-color-background-neutral-alternative': '#555',
    '--token-color-background-neutral-subtle': '#eee',
  }

  const { tokens, heldBack } = holdBackContrastRegressions(
    'DNB light',
    before,
    after
  )

  expect(tokens).toEqual({
    ...after,
    ...{ '--token-color-background-neutral-alternative': '#fff' },
  })
  expect(heldBack).toEqual([
    {
      theme: 'DNB light',
      token: '--token-color-background-neutral-alternative',
      keptValue: '#fff',
      rejectedValue: '#555',
      checkedAgainst: '--token-color-text-neutral',
      oldContrast: 21,
      rejectedContrast: 2.82,
      target: 4.5,
      cause: undefined,
    },
  ])
})

it('holds back tokens that regress because another token was held back', () => {
  const before = mode('#000', '#fff')[0].tokens
  const after = {
    ...before,
    '--token-color-background-info-subtle': '#000',
    '--token-color-icon-info': '#fff',
  }

  const { tokens, heldBack } = holdBackContrastRegressions(
    'DNB light',
    before,
    after
  )

  expect(tokens).toEqual(before)
  expect(
    heldBack.map(({ token, checkedAgainst, cause }) => ({
      token,
      checkedAgainst,
      cause,
    }))
  ).toEqual([
    {
      token: '--token-color-background-info-subtle',
      checkedAgainst: '--token-color-text-neutral',
      cause: undefined,
    },
    {
      token: '--token-color-icon-info',
      checkedAgainst: '--token-color-background-info-subtle',
      cause: '--token-color-background-info-subtle',
    },
  ])
})

it('holds back the token that conflicts with many others instead of all of them', () => {
  const before = mode('#000', '#fff')[0].tokens
  const after = {
    ...mode('#000', '#999')[0].tokens,
    '--token-color-text-neutral': '#595959',
  }

  const { tokens, heldBack } = holdBackContrastRegressions(
    'DNB light',
    before,
    after
  )

  expect(tokens).toEqual({
    ...after,
    '--token-color-text-neutral': '#000',
  })
  expect(heldBack.map(({ token }) => token)).toEqual([
    '--token-color-text-neutral',
  ])
})

it('checks the transparency background only for transparent backgrounds', () => {
  const before = {
    ...mode('#000', '#fff')[0].tokens,
    '--token-color-background-info-subtle': 'rgba(0 0 0 / 0%)',
  }
  const after = {
    ...before,
    '--token-color-background-page-background': '#000',
    '--token-color-stroke-info': '#fff',
  }

  const { tokens, heldBack } = holdBackContrastRegressions(
    'DNB light',
    before,
    after
  )

  expect(tokens).toEqual(before)
  expect(
    heldBack.map(({ token, checkedAgainst, cause }) => ({
      token,
      checkedAgainst,
      cause,
    }))
  ).toEqual([
    {
      token: '--token-color-background-page-background',
      checkedAgainst:
        '--token-color-text-neutral on --token-color-background-info-subtle',
      cause: undefined,
    },
    {
      token: '--token-color-stroke-info',
      checkedAgainst: '--token-color-background-page-background',
      cause: '--token-color-background-page-background',
    },
  ])

  const opaque = { '--token-color-background-info-subtle': '#fff' }
  expect(
    holdBackContrastRegressions(
      'DNB light',
      { ...before, ...opaque },
      { ...after, ...opaque }
    ).heldBack
  ).toEqual([])
})

it('does not hold back pairs that stay below the target without losing contrast', () => {
  const before = mode('#909090', '#fff')[0].tokens
  const after = { ...before, '--token-color-text-error': '#808080' }

  expect(holdBackContrastRegressions('DNB light', before, after)).toEqual({
    tokens: after,
    heldBack: [],
  })
})

it('renders held back tokens with their contrast and cascade cause', () => {
  const { markdown, regressions } = reviewTokenChanges(
    mode('#000', '#fff'),
    mode('#000', '#fff'),
    [
      {
        theme: 'DNB light',
        token: '--token-color-icon-info',
        keptValue: '#000',
        rejectedValue: '#fff',
        checkedAgainst: '--token-color-background-info-subtle',
        oldContrast: 21,
        rejectedContrast: 1,
        target: 3,
        cause: '--token-color-background-info-subtle',
      },
    ]
  )

  expect(regressions).toEqual([])
  expect(markdown).toContain(
    '## Held back tokens\n\nThese Figma values would lower contrast below the target'
  )
  expect(markdown).toContain(
    '| DNB light | --token-color-icon-info | #000 | #fff | --token-color-background-info-subtle | 21.00:1 | 1.00:1 | 3:1 | --token-color-background-info-subtle held back |'
  )
  expect(markdown).not.toContain('## Contrast regressions')
})

it('ignores support fallbacks when reviewing the modern token values', () => {
  expect(
    resolveTokenValues(
      ':root { --token-color-text-error: #123; } @supports not (color: color-mix(in srgb, red, red)) { :root { --token-color-text-error: #456; } }'
    )
  ).toEqual({ '--token-color-text-error': '#123' })
})

it('lists only new references to another brand foundation', () => {
  const references = findCrossBrandReferences(
    ':root { --carnegie-blue: #00f; --dnb-blue: #00f; --dnb-green: #0f0; --token-cross-a: var(--carnegie-blue); --token-cross-b: var(--dnb-blue); --token-cross-c: var(--dnb-green); }',
    'carnegie'
  )
  expect(references).toEqual([
    { token: '--token-cross-b', reference: '--dnb-blue' },
    { token: '--token-cross-c', reference: '--dnb-green' },
  ])

  const withReferences = (crossBrandReferences: CrossBrandReference[]) => [
    { ...mode('#000', '#fff')[0], crossBrandReferences },
  ]
  const { markdown } = reviewTokenChanges(
    withReferences(references.slice(0, 1)),
    withReferences(references)
  )
  expect(markdown).toContain(
    '| DNB light | --token-cross-c | --dnb-green |'
  )
  expect(markdown).not.toContain('--token-cross-b')
  expect(
    reviewTokenChanges(withReferences(references), withReferences([]))
      .markdown
  ).toContain(
    '## New cross-brand foundation references\n\nTokens that now use a foundation color from another brand. Check in Figma that this is intended.\n\nNone.'
  )
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

it('checks focus contrast on each neutral surface', () => {
  const before = mode('#000', '#fff')
  const after = mode('#000', '#fff')
  after[0].tokens['--token-color-stroke-action-focus'] = '#aaa'

  expect(reviewTokenChanges(before, after).regressions).toEqual(
    ['neutral', 'neutral-subtle', 'neutral-base'].map((background) =>
      expect.stringContaining(
        '--token-color-stroke-action-focus on --token-color-background-' +
          background
      )
    )
  )
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

it('checks control boundary contrast on each neutral surface', () => {
  const before = mode('#000', '#fff')
  const after = mode('#000', '#fff')
  after[0].tokens['--token-color-stroke-action'] = '#aaa'
  expect(reviewTokenChanges(before, after).regressions).toEqual(
    ['neutral', 'neutral-subtle', 'neutral-base'].map((background) =>
      expect.stringContaining(
        '--token-color-stroke-action on --token-color-background-' +
          background
      )
    )
  )
})
