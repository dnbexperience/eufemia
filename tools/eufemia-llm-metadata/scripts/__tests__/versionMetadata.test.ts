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
