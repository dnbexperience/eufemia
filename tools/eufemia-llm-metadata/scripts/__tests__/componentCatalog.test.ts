import fs from 'fs'
import os from 'os'
import path from 'path'

import {
  cleanComponentTitle,
  componentCategoryOrder,
  getComponentCategoryTitle,
  loadComponentCatalog,
  normalizeComponentSlug,
  toRelatedReason,
} from '../../src/extensions/mdx/componentCatalog.ts'

function writeComponent(
  componentsDir: string,
  fileName: string,
  frontmatter: string[]
) {
  const filePath = path.join(componentsDir, fileName)
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(
    filePath,
    ['---', ...frontmatter, '---', '', '# Page'].join('\n')
  )
}

describe('componentCatalog', () => {
  it('normalizeComponentSlug strips edge slashes and tab suffixes', () => {
    expect(normalizeComponentSlug('/uilib/components/accordion/')).toBe(
      'uilib/components/accordion'
    )
    expect(normalizeComponentSlug('uilib/components/accordion/info')).toBe(
      'uilib/components/accordion'
    )
    expect(
      normalizeComponentSlug('uilib/components/accordion/demos')
    ).toBe('uilib/components/accordion')
    expect(
      normalizeComponentSlug('uilib/components/accordion/properties')
    ).toBe('uilib/components/accordion')
    // Nested component pages are not treated as tab suffixes.
    expect(
      normalizeComponentSlug(
        'uilib/components/pagination/infinity-scroller'
      )
    ).toBe('uilib/components/pagination/infinity-scroller')
  })

  it('cleanComponentTitle removes trailing parenthetical', () => {
    expect(cleanComponentTitle('Anchor (Text Link)')).toBe('Anchor')
    expect(cleanComponentTitle('Button')).toBe('Button')
  })

  it('toRelatedReason strips the "Use <Component>" prefix', () => {
    expect(
      toRelatedReason('Use Anchor to take people to another page.')
    ).toBe('to take people to another page.')
    expect(toRelatedReason('A standalone sentence.')).toBe(
      'A standalone sentence.'
    )
    expect(toRelatedReason(null)).toBeUndefined()
  })

  it('builds a catalog and applies frontmatter filters', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'catalog-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    const componentsDir = path.join(docsRoot, 'uilib', 'components')

    writeComponent(componentsDir, 'button.mdx', [
      'title: Button',
      "category: 'actions'",
      "description: 'Use Button to confirm.'",
    ])
    writeComponent(componentsDir, 'anchor.mdx', [
      'title: Anchor',
      "category: 'actions'",
    ])
    // No category -> falls back to "other".
    writeComponent(componentsDir, 'mystery.mdx', ['title: Mystery'])
    // category: false -> excluded entirely.
    writeComponent(componentsDir, 'nocat.mdx', [
      'title: NoCat',
      'category: false',
    ])
    // draft / hideInMenu -> excluded.
    writeComponent(componentsDir, 'draft.mdx', [
      'title: Draft',
      "category: 'content'",
      'draft: true',
    ])
    writeComponent(componentsDir, 'hidden.mdx', [
      'title: Hidden',
      "category: 'content'",
      'hideInMenu: true',
    ])
    // Missing title -> excluded (e.g. an info/demos tab file).
    writeComponent(componentsDir, 'notitle.mdx', ['showTabs: true'])
    // excludedSlugs -> excluded.
    writeComponent(componentsDir, 'overview.mdx', ['title: Overview'])
    writeComponent(componentsDir, 'fragments.mdx', ['title: Fragments'])
    // Fragment sub-pages are still included.
    writeComponent(componentsDir, 'fragments/scroll-view.mdx', [
      'title: ScrollView',
      "category: 'other'",
    ])

    const catalog = await loadComponentCatalog(docsRoot)

    const actions = catalog.byCategory.get('actions') || []
    expect(actions.map((entry) => entry.title)).toEqual([
      'Anchor',
      'Button',
    ])

    const other = (catalog.byCategory.get('other') || []).map(
      (entry) => entry.title
    )
    expect(other).toContain('Mystery')
    expect(other).toContain('ScrollView')

    expect(catalog.byNormalizedSlug.has('uilib/components/button')).toBe(
      true
    )
    expect(
      catalog.byNormalizedSlug.has(
        'uilib/components/fragments/scroll-view'
      )
    ).toBe(true)

    const allTitles = Array.from(catalog.byNormalizedSlug.values()).map(
      (entry) => entry.title
    )
    expect(allTitles).not.toContain('NoCat')
    expect(allTitles).not.toContain('Draft')
    expect(allTitles).not.toContain('Hidden')
    expect(allTitles).not.toContain('Overview')
    expect(allTitles).not.toContain('Fragments')
  })

  it('getComponentCategoryTitle returns the mapped title', () => {
    expect(getComponentCategoryTitle('actions')).toBe('Actions')
    expect(getComponentCategoryTitle('input')).toBe('Input')
  })

  it('stays in sync with the portal componentCategories source', () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const portalSource = fs.readFileSync(
      path.join(
        repoRoot,
        'packages',
        'dnb-design-system-portal',
        'src',
        'shared',
        'parts',
        'componentCategories.ts'
      ),
      'utf-8'
    )

    const blockMatch = portalSource.match(
      /categoryOrder\s*=\s*\[([\s\S]*?)\]\s*as const/
    )
    expect(blockMatch).not.toBeNull()

    const portalCategories: Array<{ id: string; title: string }> = []
    const entryRegex = /\{\s*id:\s*'([^']+)',\s*title:\s*'([^']+)'/g
    let match: RegExpExecArray | null

    while ((match = entryRegex.exec(blockMatch?.[1] || ''))) {
      portalCategories.push({ id: match[1], title: match[2] })
    }

    expect(portalCategories.length).toBeGreaterThan(0)
    expect(
      componentCategoryOrder.map(({ id, title }) => ({ id, title }))
    ).toEqual(portalCategories)
  })
})
