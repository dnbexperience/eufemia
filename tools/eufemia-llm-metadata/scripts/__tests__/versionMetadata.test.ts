import {
  parseDocsExports,
  deriveFileVersions,
  mergeComponentVersions,
  applyVersionMetadata,
  buildMigrationComponent,
  buildMigrationsIndex,
  extractReplacementNote,
  compareSemver,
  parseSemver,
  type HistoryEntry,
  type ComponentVersionInfo,
} from '../../src/versionMetadata.ts'

describe('parseDocsExports', () => {
  it('extracts literal prop keys and status, classifying props vs events', () => {
    const source = [
      "import type { PropertiesTableProps } from '../../shared/types'",
      '',
      'export const ButtonProperties: PropertiesTableProps = {',
      "  variant: { doc: 'x', type: 'string', status: 'optional' },",
      "  'aria-label': { doc: 'y', type: 'string', status: 'optional' },",
      "  legacy: { doc: 'z', type: 'string', status: 'deprecated' },",
      '}',
      '',
      'export const ButtonEvents: PropertiesTableProps = {',
      "  onClick: { doc: 'c', type: 'function', status: 'optional' },",
      '}',
    ].join('\n')

    const parsed = parseDocsExports(source)

    expect(Object.keys(parsed.props).sort()).toEqual([
      'aria-label',
      'legacy',
      'variant',
    ])
    expect(parsed.props.legacy.status).toBe('deprecated')
    expect(parsed.props.variant.status).toBe('optional')
    expect(Object.keys(parsed.events)).toEqual(['onClick'])
  })

  it('unwraps `as` assertions and skips spreads and computed keys', () => {
    const source = [
      'const shared = { a: { doc: "a" } }',
      'export const XProperties = {',
      '  ...shared,',
      "  keep: { doc: 'k', status: 'optional' },",
      '  [dynamic]: { doc: "nope" },',
      '} as PropertiesTableProps',
    ].join('\n')

    const parsed = parseDocsExports(source)
    // Spread and computed keys cannot be resolved statically → only `keep`.
    expect(Object.keys(parsed.props)).toEqual(['keep'])
  })

  it('returns empty maps for unparseable input rather than throwing', () => {
    expect(parseDocsExports('this is (not valid !! ts')).toEqual({
      props: {},
      events: {},
    })
  })
})

describe('deriveFileVersions', () => {
  const h = (
    version: string | null,
    props: Record<string, string | null>
  ): HistoryEntry => ({
    version,
    parsed: {
      props: Object.fromEntries(
        Object.entries(props).map(([k, status]) => [k, { status }])
      ),
      events: {},
    },
  })

  it('floors `since` for props present in the first tracked commit', () => {
    const derived = deriveFileVersions([
      h('10.21.0', { a: 'optional' }),
      h('10.30.0', { a: 'optional', b: 'optional' }),
    ])
    expect(derived.props.a).toEqual({ since: '10.21.0', sinceFloor: true })
    // `b` appeared later → exact since, no floor.
    expect(derived.props.b).toEqual({ since: '10.30.0' })
  })

  it('records deprecatedIn when status first becomes deprecated', () => {
    const derived = deriveFileVersions([
      h('11.0.0', { a: 'optional' }),
      h('11.4.0', { a: 'deprecated' }),
      h('11.6.0', { a: 'deprecated' }),
    ])
    expect(derived.props.a.since).toBe('11.0.0')
    expect(derived.props.a.deprecatedIn).toBe('11.4.0')
  })

  it('records removedIn when a prop disappears and stays gone', () => {
    const derived = deriveFileVersions([
      h('10.63.0', { old: 'optional' }),
      h('11.0.0', {}),
      h('11.2.0', {}),
    ])
    expect(derived.props.old.since).toBe('10.63.0')
    expect(derived.props.old.removedIn).toBe('11.0.0')
  })

  it('does not report removal when a prop reappears', () => {
    const derived = deriveFileVersions([
      h('11.0.0', { a: 'optional' }),
      h('11.1.0', {}),
      h('11.2.0', { a: 'optional' }),
    ])
    expect(derived.props.a.removedIn).toBeUndefined()
    expect(derived.props.a.since).toBe('11.0.0')
  })

  it('marks pending when the introducing commit is unreleased', () => {
    const derived = deriveFileVersions([h(null, { a: 'optional' })])
    expect(derived.props.a).toEqual({
      since: null,
      sinceFloor: true,
      pending: true,
    })
  })
})

describe('mergeComponentVersions', () => {
  it('keeps the earliest since when a key appears in two files', () => {
    const a: ComponentVersionInfo = {
      props: { x: { since: '11.2.0' } },
      events: {},
    }
    const b: ComponentVersionInfo = {
      props: { x: { since: '10.50.0', sinceFloor: true } },
      events: {},
    }
    const merged = mergeComponentVersions(a, b)
    expect(merged.props.x.since).toBe('10.50.0')
  })
})

describe('applyVersionMetadata', () => {
  it('lets author annotations win and fills gaps from inference', () => {
    const props = {
      authored: { doc: 'a', since: '11.1.0' },
      inferredOnly: { doc: 'b' },
    } as any
    const events = {} as any

    applyVersionMetadata(props, events, {
      props: {
        authored: { since: '9.0.0', sinceFloor: true },
        inferredOnly: { since: '11.3.0', sinceFloor: true },
      },
      events: {},
    })

    // Author annotation preserved, not marked inferred.
    expect(props.authored.since).toBe('11.1.0')
    expect(props.authored.sinceInferred).toBeUndefined()
    // Gap filled from inference, marked.
    expect(props.inferredOnly.since).toBe('11.3.0')
    expect(props.inferredOnly.sinceInferred).toBe(true)
    expect(props.inferredOnly.sinceFloor).toBe(true)
  })

  it('never infers `removedIn` for an entry that is currently documented', () => {
    // `locale` is in the extracted map, so it exists in today's docs. The
    // inferred history says it was removed only because the static parse
    // could not see it (its table is composed with a spread). Stamping that
    // removal would tell agents a live prop is gone.
    const props = { locale: { doc: 'a' } } as any
    const events = { onChange: { doc: 'b' } } as any

    applyVersionMetadata(props, events, {
      props: { locale: { since: '10.21.0', removedIn: '11.0.0' } },
      events: { onChange: { since: '10.21.0', removedIn: '11.0.0' } },
    })

    expect(props.locale.removedIn).toBeUndefined()
    expect(events.onChange.removedIn).toBeUndefined()
    // The rest of the inference still applies.
    expect(props.locale.since).toBe('10.21.0')
  })

  it('keeps an author-set `removedIn` on a documented entry', () => {
    const props = { legacy: { doc: 'a', removedIn: '11.6.0' } } as any

    applyVersionMetadata(props, {} as any, {
      props: { legacy: { since: '10.0.0', removedIn: '11.0.0' } },
      events: {},
    })

    expect(props.legacy.removedIn).toBe('11.6.0')
  })

  it('keeps the original `since` for a member moved between the tables', () => {
    // `onClick` was a documented prop from 11.4.0 and moved to the events
    // table in 11.11.0. It is one prop either way, so 11.4.0 is its `since`.
    const events = { onClick: { doc: 'a' } } as any

    applyVersionMetadata({} as any, events, {
      props: { onClick: { since: '11.4.0', removedIn: '11.11.0' } },
      events: { onClick: { since: '11.11.0' } },
    })

    expect(events.onClick.since).toBe('11.4.0')
    expect(events.onClick.sinceInferred).toBe(true)
    expect(events.onClick.removedIn).toBeUndefined()
  })

  it('carries `sinceFloor` from whichever table holds the earliest since', () => {
    const events = { onSubmitResult: { doc: 'a' } } as any

    applyVersionMetadata({} as any, events, {
      props: {
        onSubmitResult: {
          since: '10.51.0',
          sinceFloor: true,
          removedIn: '10.67.0',
        },
      },
      events: { onSubmitResult: { since: '10.67.0' } },
    })

    expect(events.onSubmitResult.since).toBe('10.51.0')
    expect(events.onSubmitResult.sinceFloor).toBe(true)
  })
})

describe('buildMigrationsIndex', () => {
  it('aggregates added/deprecated/removed and a component-level added entry', () => {
    const components = [
      {
        id: 'uilib/components/button',
        name: 'Button',
        props: [
          { name: 'variant', since: '11.0.0', sinceInferred: true },
          {
            name: 'legacy',
            since: '10.63.0',
            deprecatedIn: '11.4.0',
            removedIn: '11.6.0',
            doc: 'Deprecated. Use `variant` instead.',
          },
        ],
        events: [{ name: 'onClick', since: '10.50.0', sinceFloor: true }],
      },
    ]

    const index = buildMigrationsIndex(components, {
      eufemiaVersion: '11.11.0',
      generatedAt: '2026-08-31T00:00:00.000Z',
    })

    expect(Object.keys(index.versions).sort(compareSemver)).toEqual([
      '10.50.0',
      '10.63.0',
      '11.0.0',
      '11.4.0',
      '11.6.0',
    ])
    // Component-level added lands on the earliest member since (onClick 10.50.0).
    const compAdded = index.versions['10.50.0'].added.find(
      (c) => c.kind === 'component'
    )
    expect(compAdded?.name).toBe('Button')
    // Deprecation carries a replacement note extracted from the doc.
    expect(index.versions['11.4.0'].deprecated[0].note).toBe(
      'Use `variant` instead.'
    )
    expect(index.versions['11.6.0'].removed[0].name).toBe('legacy')
  })

  it('skips doc-table rows that are not API members', () => {
    const components = [
      {
        id: 'uilib/elements/ingress',
        name: 'Ingress',
        props: [
          { name: 'size', since: '10.50.0' },
          // Cross-reference rows in the rendered properties table.
          {
            name: '[Space](/uilib/layout/space/properties)',
            since: '10.50.0',
            removedIn: '10.57.0',
          },
          { name: 'Card properties', since: '10.50.0' },
        ],
        events: [],
      },
    ]

    const index = buildMigrationsIndex(components, {
      eufemiaVersion: '11.11.0',
      generatedAt: '2026-08-31T00:00:00.000Z',
    })

    expect(index.versions['10.57.0']).toBeUndefined()
    expect(
      index.versions['10.50.0'].added
        .filter((c) => c.kind === 'prop')
        .map((c) => c.name)
    ).toEqual(['size'])
    // The rows are still documented members of the page, so they must keep
    // counting towards the component's own "added" release.
    expect(
      index.versions['10.50.0'].added.find((c) => c.kind === 'component')
        ?.name
    ).toBe('Ingress')
    // Hyphenated and underscored names are real members and must survive.
    const withRealNames = buildMigrationsIndex(
      [
        {
          id: 'x',
          name: 'X',
          props: [
            { name: 'aria-label', since: '11.0.0' },
            { name: 'icon_position', since: '11.0.0' },
          ],
          events: [],
        },
      ],
      {
        eufemiaVersion: '11.11.0',
        generatedAt: '2026-08-31T00:00:00.000Z',
      }
    )
    expect(
      withRealNames.versions['11.0.0'].added
        .filter((c) => c.kind === 'prop')
        .map((c) => c.name)
        .sort()
    ).toEqual(['aria-label', 'icon_position'])
  })

  it('keeps the component-level entry when only a doc-table row carries a since', () => {
    // Wizard.Buttons documents nothing but a `[ButtonRow](…)` reference row.
    // Skipping that row for member changes must not erase the component.
    const index = buildMigrationsIndex(
      [
        {
          id: 'uilib/extensions/forms/Wizard/Buttons',
          name: 'Wizard.Buttons',
          props: [
            {
              name: '[ButtonRow](/uilib/extensions/forms/Form/ButtonRow/properties/)',
              since: '10.70.1',
              sinceInferred: true,
            },
          ],
          events: [],
        },
      ],
      {
        eufemiaVersion: '11.11.0',
        generatedAt: '2026-08-31T00:00:00.000Z',
      }
    )

    const added = index.versions['10.70.1'].added
    expect(added.map((c) => c.kind)).toEqual(['component'])
    expect(added[0].name).toBe('Wizard.Buttons')
  })
})

describe('buildMigrationComponent', () => {
  it('folds removed props (absent from current docs) back in from inference', () => {
    const meta = {
      id: 'uilib/components/button',
      name: 'Button',
      props: [{ name: 'iconPosition', since: '11.0.0' }],
      events: [],
    }
    const componentMeta = {
      props: {
        iconPosition: { since: '11.0.0' },
        // Removed in 11.0.0 (snake_case → camelCase), not in current docs.
        icon_position: {
          since: '10.63.0',
          sinceFloor: true,
          removedIn: '11.0.0',
        },
      },
      events: {},
    }

    const result = buildMigrationComponent(meta, componentMeta)
    const names = result.props!.map((p) => p.name).sort()
    expect(names).toEqual(['iconPosition', 'icon_position'])
    const removed = result.props!.find((p) => p.name === 'icon_position')
    expect(removed?.removedIn).toBe('11.0.0')
    expect(removed?.sinceInferred).toBe(true)
  })

  it('does not duplicate props that still exist', () => {
    const meta = {
      id: 'x',
      name: 'X',
      props: [{ name: 'a', since: '11.0.0' }],
      events: [],
    }
    const result = buildMigrationComponent(meta, {
      props: { a: { since: '11.0.0' } },
      events: {},
    })
    expect(result.props).toHaveLength(1)
  })

  it('does not report a removal for an entry now documented as an event', () => {
    // `onClick` was declared in the properties table and later moved to the
    // events table. It is still a prop of the component — not a removal.
    const meta = {
      id: 'uilib/components/card',
      name: 'Card',
      props: [],
      events: [{ name: 'onClick', since: '11.11.0' }],
    }
    const result = buildMigrationComponent(meta, {
      props: { onClick: { since: '10.0.0', removedIn: '11.11.0' } },
      events: {},
    })
    expect(result.props).toHaveLength(0)
  })
})

describe('extractReplacementNote', () => {
  it('finds replacement hints', () => {
    expect(
      extractReplacementNote('Deprecated, use `variant` instead.')
    ).toBe('Use `variant` instead.')
    expect(extractReplacementNote('Replaced by `size`.')).toBe(
      'Use `size` instead.'
    )
    expect(extractReplacementNote('No hint here')).toBeUndefined()
  })

  it('ignores ordinary usage prose that names a value, not a replacement', () => {
    // These are real doc strings. A loose `use \`X\`` match turns each of them
    // into "Use `X` instead.", which is wrong in every case.
    expect(
      extractReplacementNote(
        'Use `false` to disable the auto copy feature. Defaults to `true`.'
      )
    ).toBeUndefined()
    expect(
      extractReplacementNote(
        'Use `tel` (default) or `sms` to enable a clickable / touchable anchor link.'
      )
    ).toBeUndefined()
    expect(
      extractReplacementNote(
        'Use `auto` to detect the locale from the browser (`navigator.language`).'
      )
    ).toBeUndefined()
  })

  it('does not invert a dependency into a replacement', () => {
    // `rememberState` requires `id`; it does not replace it.
    expect(
      extractReplacementNote(
        'If you use `rememberState`, an id is required to keep the state.'
      )
    ).toBeUndefined()
  })
})

describe('semver helpers', () => {
  it('parses and compares', () => {
    expect(parseSemver('v11.2.3')).toEqual([11, 2, 3])
    expect(parseSemver('nope')).toBeNull()
    expect(compareSemver('11.0.0', '10.63.0')).toBeGreaterThan(0)
    expect(compareSemver('11.2.0', '11.10.0')).toBeLessThan(0)
    expect(compareSemver('11.2.0', '11.2.0')).toBe(0)
  })
})
