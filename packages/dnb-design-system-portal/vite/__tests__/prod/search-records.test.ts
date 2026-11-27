import { describe, expect, it } from 'vitest'
import {
  buildSearchRecords,
  searchRecords,
  searchIndexSettings,
} from '../../search/search-records.ts'

describe('section search records', () => {
  const page = {
    slug: 'web/components/button',
    title: 'Button',
    keywords: 'action',
  }

  it('includes collections and other routes outside platform directories in every platform', () => {
    const slugs = [
      'web/icons',
      'ios/icons',
      'android/icons',
      'collections/icons',
      'design-system/icons',
    ]
    const records = slugs.flatMap((slug) =>
      buildSearchRecords({
        slug,
        title: 'Icons',
        markdown: 'Icon guidance.',
      })
    )
    for (const platform of ['web', 'ios', 'android'] as const) {
      expect(
        searchRecords(records, 'icons', platform).hits.map(
          ({ slug }) => slug
        )
      ).toEqual([
        `${platform}/icons`,
        'collections/icons',
        'design-system/icons',
      ])
    }
  })

  it('filters platforms before limiting results and includes shared guidance in every platform', () => {
    const records = ['web', 'ios', 'android', 'design-system'].flatMap(
      (platform) =>
        buildSearchRecords({
          slug: `${platform}/button`,
          title: 'Button',
          markdown: Array.from(
            { length: 25 },
            (_, index) => `## Button ${index}\nPlatform guidance.`
          ).join('\n\n'),
        })
    )
    expect(records[0].platform).toEqual(['web'])
    expect(searchIndexSettings.attributesForFaceting).toContain(
      'filterOnly(platform)'
    )
    for (const platform of ['web', 'ios', 'android'] as const) {
      const { hits } = searchRecords(records, 'button', platform)
      expect(hits).toHaveLength(20)
      expect(
        hits.every((hit) => hit.slug.startsWith(platform + '/'))
      ).toBe(true)
      const shared = searchRecords(
        records.filter(({ slug }) => slug.startsWith('design-system/')),
        'button',
        platform
      )
      expect(shared.hits).toHaveLength(20)
    }
    expect(searchRecords(records, 'button')).toEqual(
      searchRecords(records, 'button', 'web')
    )
  })

  it('indexes section prose and inline code, excluding example source and translation dumps', () => {
    const records = buildSearchRecords({
      ...page,
      markdown: [
        '# Button',
        'Overview prose.',
        '## Keyboard {#keyboard-controls}',
        'Use `aria-label` for an accessible name.',
        '```tsx',
        'const exampleOnly = true',
        '```',
        '```json',
        '{"translations":{"secretTranslation":"ignored"}}',
        '```',
        '### Focus',
        'Restore focus after closing.',
      ].join('\n\n'),
    })
    expect(records.map(({ url }) => url)).toEqual([
      '/web/components/button/',
      '/web/components/button/#keyboard-controls',
      '/web/components/button/#focus',
    ])
    expect(records[1].content).toContain('aria-label')
    expect(records[2].headings).toEqual(['Keyboard'])
    expect(JSON.stringify(records)).not.toMatch(
      /exampleOnly|secretTranslation/
    )
    expect(searchRecords(records, 'restore focus').hits[0].hash).toBe(
      'focus'
    )
  })

  it('retains property names and descriptions from the shared converter', () => {
    const records = buildSearchRecords({
      ...page,
      markdown:
        '## Properties\n```json\n{"props":{"aria-label":{"doc":"Accessible [name](/documentation) for `Input`.","type":"string"}},"usageGuidance":"boilerplate"}\n```',
    })
    expect(records.find(({ hash }) => hash === 'properties').content).toBe(
      'aria-label: Accessible name for Input.'
    )
    expect(JSON.stringify(records)).not.toContain('boilerplate')
  })

  it('indexes prose inside HTML wrappers without markup, scripts or example source', () => {
    const records = buildSearchRecords({
      ...page,
      markdown: [
        '## Setup',
        '<ol start={5}><li>Create a <strong>new</strong> file.</li><li>Enable the library &amp; grid.</li></ol>',
        '<Blockquote className="internal-class">Helpful prose.</Blockquote>',
        '<script>scriptOnly()</script>',
        '<style>.styleOnly { color: red }</style>',
        '<pre><code>exampleOnly()</code></pre>',
        '<Img\n  src={FigmaLibrary}\n  style={{ height: "auto" }}\n  caption="Source-only caption"\n/>',
      ].join('\n\n'),
    })
    expect(records[1].content).toBe(
      'Create a new file. Enable the library & grid. Helpful prose.'
    )
  })

  it('keeps inline punctuation and starts new chunks at word boundaries', () => {
    const records = buildSearchRecords({
      ...page,
      markdown: `Use **Input**.\n\n## Long\n${'A complete sentence. '.repeat(400)}`,
    })
    expect(records[0].content).toBe('Use Input.')
    expect(
      records
        .filter(({ hash }) => hash === 'long')
        .every(
          ({ content }) =>
            /^(A|complete|sentence)/.test(content) &&
            /(A|complete|sentence\.)$/.test(content)
        )
    ).toBe(true)
  })

  it('uses rendered anchors and folds synthetic headings into their real parent', () => {
    const records = buildSearchRecords({
      ...page,
      markdown:
        '# Button\n## Keyboard\nDescription.\n### Generated heading\nUseful prose.',
      renderedHeadings: [
        { id: 'keyboard-controls', level: 2, text: ['Keyboard'] },
      ],
    })
    expect(records.map(({ hash }) => hash)).toEqual([
      '',
      'keyboard-controls',
    ])
    expect(records[1].content).toContain('Useful prose.')
  })

  it('chunks long sections within record limits and deduplicates by anchor, not page', () => {
    const records = buildSearchRecords({
      ...page,
      markdown: `# Button\n## First\n${'Long content. '.repeat(1000)}needle\n## Second\nneedle`,
    })
    expect(
      records.filter(({ hash }) => hash === 'first').length
    ).toBeGreaterThan(1)
    expect(
      records.every(
        (record) => Buffer.byteLength(JSON.stringify(record)) < 9000
      )
    ).toBe(true)
    expect(new Set(records.map(({ objectID }) => objectID)).size).toBe(
      records.length
    )
    expect(
      searchRecords(records, 'needle').hits.map(({ hash }) => hash)
    ).toEqual(['first', 'second'])
  })

  it('keeps complete words around a local snippet match', () => {
    const records = buildSearchRecords({
      ...page,
      markdown: `## Snippets\n${'contextword '.repeat(20)}needle ${'followingword '.repeat(20)}`,
    })
    const snippet = searchRecords(records, 'needle').hits[0]._snippetResult
      .content.value
    expect(snippet).toMatch(/^…contextword /)
    expect(snippet).toMatch(/ followingword…$/)
    expect(snippet).toContain('needle')
  })
})
