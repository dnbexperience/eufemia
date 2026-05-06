import fs from 'fs'
import os from 'os'
import path from 'path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

const {
  convertMdxToMd,
  formatUnhandledStandaloneMdxWarnings,
  findUnhandledStandaloneMdxComponents,
  loadTsDocsForDocPath,
  recordUnhandledStandaloneMdxWarning,
  resetUnhandledStandaloneMdxWarnings,
  toPublicUrl,
  toSlugAndDir,
} = await import('../../src/convertHelpers.ts')

describe('convertMdxToMd', () => {
  beforeEach(() => {
    resetUnhandledStandaloneMdxWarnings()
  })

  it('finds unhandled standalone MDX components outside code fences', () => {
    const content = [
      '<UnhandledWidget />',
      '<InlineImg />',
      '<Anchor />',
      '<Button />',
      '',
      '- inline <InlineThing />',
      '',
      '```tsx',
      '<CodeOnlyWidget />',
      '```',
      '',
      '<Another.Widget />',
    ].join('\n')

    expect(
      findUnhandledStandaloneMdxComponents(content, {
        importsByFile: new Map([['@dnb/eufemia/src', ['Button']]]),
      })
    ).toEqual(['Another.Widget', 'UnhandledWidget'])
  })

  it('groups repeated unhandled standalone MDX warnings into one summary', () => {
    recordUnhandledStandaloneMdxWarning({
      inputPath: '/repo/docs/uilib/layout/flex/item.mdx',
      docsRoot: '/repo/docs',
      components: [
        'Examples.UnsupportedAdvanced',
        'Examples.UnsupportedBasic',
      ],
    })
    recordUnhandledStandaloneMdxWarning({
      inputPath: '/repo/docs/uilib/layout/flex/item/demos.mdx',
      docsRoot: '/repo/docs',
      components: [
        'Examples.UnsupportedBasic',
        'Examples.UnsupportedAdvanced',
      ],
    })

    expect(formatUnhandledStandaloneMdxWarnings()).toBe(
      [
        '[llm-metadata] warnings: unhandled standalone MDX components in 2 files',
        '- Examples.UnsupportedAdvanced, Examples.UnsupportedBasic',
        '  uilib/layout/flex/item.mdx',
        '  uilib/layout/flex/item/demos.mdx',
      ].join('\n')
    )
  })

  it('only loads ts docs for uilib doc paths', async () => {
    const nonUilibTsDocs = await loadTsDocsForDocPath(
      'quickguide-designer/tools.mdx'
    )

    expect(nonUilibTsDocs).toEqual({
      tsDocsDir: null,
      props: {},
      events: {},
      related: [],
    })

    const uilibTsDocs = await loadTsDocsForDocPath(
      path.join('uilib', 'components', 'breadcrumb.mdx')
    )

    expect(uilibTsDocs.tsDocsDir).not.toBeNull()
    expect(Object.keys(uilibTsDocs.props)).toContain('data')
  })

  it('normalizes repeated slashes in slug bases and public url bases', () => {
    expect(
      toSlugAndDir('guides/getting-started.mdx', '////uilib////')
    ).toEqual({
      slug: '/uilib/guides/getting-started/',
      dirForExtras: 'uilib/guides/getting-started/',
    })

    expect(toSlugAndDir('icons.mdx', '////')).toEqual({
      slug: '/icons/',
      dirForExtras: 'icons/',
    })

    expect(toPublicUrl('/icons/', 'https://eufemia.dnb.no////')).toBe(
      'https://eufemia.dnb.no/icons/'
    )
  })

  it('replaces PropertiesTable with JSON block', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-json-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const docsFile = path.join(docsRoot, 'ButtonDocs.ts')
    fs.writeFileSync(
      docsFile,
      [
        'export const ButtonProperties = {',
        "  size: { doc: 'Size of button', type: 'string' },",
        '};',
      ].join('\n')
    )

    const mdxPath = path.join(docsRoot, 'button.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import { ButtonProperties } from './ButtonDocs'",
        '',
        '## Properties',
        '',
        '<PropertiesTable props={ButtonProperties} />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('```json')
    expect(output).toContain('"size"')
    expect(output).toContain('"Size of button"')
    expect(output).not.toContain('PropertiesTable')
  })

  it('includes extra attributes when converting PropertiesTable', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-attrs-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const docsFile = path.join(docsRoot, 'SliderDocs.ts')
    fs.writeFileSync(
      docsFile,
      [
        'export const SliderFieldProperties = {',
        "  min: { doc: 'Minimum value', type: 'number' },",
        '};',
      ].join('\n')
    )

    const mdxPath = path.join(docsRoot, 'slider.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import { SliderFieldProperties } from './SliderDocs'",
        '',
        '## General props',
        '',
        '<PropertiesTable',
        '  props={SliderFieldProperties}',
        '  valueType={["number","Array<number>"]}',
        '  omit={["min"]}',
        '  showDefaultValue',
        '/>',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('"valueType"')
    expect(output).toContain('Array<number>')
    expect(output).toContain('"omit"')
    expect(output).toContain('min')
    expect(output).toContain('"showDefaultValue"')
    expect(output).toContain('"min":')
    expect(output).not.toContain('{valueType}')
  })

  it('replaces TranslationsTable with JSON block using source', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-i18n-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const translationsFile = path.join(docsRoot, 'translations.ts')
    fs.writeFileSync(
      translationsFile,
      [
        'export const translations = {',
        "  'en-GB': { Breadcrumb: { label: 'Home' } },",
        "  'nb-NO': { Breadcrumb: { label: 'Hjem' } },",
        '};',
      ].join('\n')
    )

    const mdxPath = path.join(docsRoot, 'breadcrumb.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import { translations } from './translations'",
        '',
        '## Translations',
        '',
        '<TranslationsTable source={translations} localeKey="Breadcrumb" />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('```json')
    expect(output).toContain('"locales"')
    expect(output).toContain('"en-GB"')
    expect(output).toContain('"nb-NO"')
    expect(output).toContain('"Breadcrumb.label"')
    expect(output).toContain('"Home"')
    expect(output).toContain('"Hjem"')
    expect(output).not.toContain('TranslationsTable')
  })

  it('adds title heading from frontmatter when missing', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-title-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const mdxPath = path.join(docsRoot, 'title.mdx')
    fs.writeFileSync(
      mdxPath,
      ['---', 'title: Button', '---', '', 'Some intro text.'].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output.startsWith('# Button')).toBe(true)
    expect(output).toContain('Some intro text.')
  })

  it('inlines imported mdx fragments from Docs aliases', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-imports-'))
    const docsBaseRoot = path.join(tmpRoot, 'src')
    const docsRoot = path.join(docsBaseRoot, 'docs')
    const sectionDir = path.join(docsRoot, 'components', 'breadcrumb')
    fs.mkdirSync(sectionDir, { recursive: true })

    const infoPath = path.join(sectionDir, 'info.mdx')
    fs.writeFileSync(
      infoPath,
      ['## Description', '', 'Breadcrumb description.'].join('\n')
    )

    const demosPath = path.join(sectionDir, 'demos.mdx')
    fs.writeFileSync(
      demosPath,
      ['## Demos', '', '```tsx', 'render(<div />)', '```'].join('\n')
    )

    const mdxPath = path.join(sectionDir, 'breadcrumb.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import BreadcrumbInfo from 'Docs/components/breadcrumb/info'",
        "import BreadcrumbDemos from 'Docs/components/breadcrumb/demos'",
        '',
        '# Breadcrumb',
        '',
        '<BreadcrumbInfo />',
        '<BreadcrumbDemos />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).toContain('## Description')
    expect(output).toContain('Breadcrumb description.')
    expect(output).toContain('## Demos')
    expect(output).toContain('render(<div />)')
    expect(output).not.toContain('<BreadcrumbInfo />')
    expect(output).not.toContain('<BreadcrumbDemos />')
  })

  it('replaces ListAllIcons with a markdown icon list', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-icons-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const mdxPath = path.join(docsRoot, 'icons.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import ListAllIcons from 'dnb-design-system-portal/src/shared/parts/icons/ListAllIcons'",
        '',
        '# Icons',
        '',
        '<ListAllIcons variant="primary" />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('ListAllIcons')
    expect(output).toContain('`bell`')
    expect(output).toContain('Category:')
  })

  it('replaces ListAllBlocks with markdown sections from matching docs', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'blocks',
      'collection.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('ListAllBlocks')
    expect(output).toContain(
      '## [Block.ChildrenWithAge](/uilib/extensions/forms/blocks/ChildrenWithAge/)'
    )
    expect(output).toContain(
      '`ChildrenWithAge` is a block for displaying children with age.'
    )
  })

  it('replaces ListComponents with markdown sections from regex-matched docs', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(docsRoot, 'uilib', 'components.mdx')

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('ListComponents')
    expect(output).toContain(
      '## [Accordion](/uilib/components/accordion/)'
    )
    expect(output).toContain(
      'The Accordion component is a combination of an accessible button (header area) and a content container.'
    )
  })

  it('replaces ListElements with markdown list items', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(docsRoot, 'uilib', 'elements.mdx')

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('ListElements')
    expect(output).toContain('- [Paragraph](/uilib/elements/paragraph/):')
    expect(output).toContain('- [Span](/uilib/elements/span/):')
  })

  it('replaces re-exported examples referenced through a namespace import', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'Iterate',
      'Array',
      'demos.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('<Examples.AnimatedContainer />')
    expect(output).toContain(
      '<Iterate.AnimatedContainer title="Title {itemNo}">'
    )
    expect(output).toContain('text="Add new item"')
  })

  it('replaces imported example aliases referenced through a namespace import', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'layout',
      'flex',
      'item',
      'demos.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('<Examples.BasicSizeExample />')
    expect(output).not.toContain('<Examples.AdvancedSizeExample />')
    expect(output).toContain('FlexItem (8)')
    expect(output).toContain('sizeCount={4}')
  })

  it('replaces namespace-imported example usages that include JSX attributes', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'Value',
      'Name',
      'demos.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('<Examples.FirstName value="Nora" />')
    expect(output).not.toContain('<Examples.LastName value="Mørk" />')
    expect(output).not.toContain('<Examples.CompanyName value="DNB" />')
    expect(output).toContain('render(<Value.Name.First value="Nora" />)')
    expect(output).toContain('render(<Value.Name.Last value="Mørk" />)')
    expect(output).toContain('render(<Value.Name.Company value="DNB" />)')
  })

  it('injects MDX call-site props into extracted examples that depend on a props object', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'blocks',
      'ChildrenWithAge',
      'demos.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('<Examples.ChildrenWithAge')
    expect(output).toContain('const props = {}')
    expect(output).toContain(
      "const props = { enableAdditionalQuestions: ['joint-responsibility'] }"
    )
    expect(output).toContain(
      "const props = { enableAdditionalQuestions: ['daycare', 'joint-responsibility'] }"
    )
    expect(output).toContain('<Blocks.ChildrenWithAge {...props} />')
  })

  it('replaces nested ColorsTable content with rendered markdown tables', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'usage',
      'customisation',
      'colors.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('ColorTable')
    expect(output).not.toContain('ChangeStyleTheme')
    expect(output).not.toContain('data-visual-test="color-table"')
    expect(output).toContain(
      '| Sample | Type | Brand name | Hex | RGB | Figma Library name | CSS Custom Properties name |'
    )
    expect(output).toContain('`--color-black`')
    expect(output).toContain('## DNB Colors')
  })

  it('replaces TokenExample with inline markdown code', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-token-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const mdxPath = path.join(docsRoot, 'tokens.mdx')
    fs.writeFileSync(
      mdxPath,
      [
        "import { TokenExample } from './Examples'",
        '',
        '- semantic token: <TokenExample name="--token-color-text-neutral" />',
      ].join('\n')
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('TokenExample')
    expect(output).toContain(
      '- semantic token: `--token-color-text-neutral`'
    )
  })

  it('removes standalone br tags from markdown output', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'mdx-br-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    fs.mkdirSync(docsRoot, { recursive: true })

    const mdxPath = path.join(docsRoot, 'breaks.mdx')
    fs.writeFileSync(
      mdxPath,
      ['## Naming contract', '', '<br />', '', 'Typical examples:'].join(
        '\n'
      )
    )

    const output = await convertMdxToMd({
      inputPath: mdxPath,
      docsRoot,
      docsBaseRoot: docsRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('<br />')
    expect(output).toContain('## Naming contract')
    expect(output).toContain('Typical examples:')
  })

  it('replaces TokenSectionTable with markdown token tables', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'usage',
      'customisation',
      'theming',
      'design-tokens',
      'colors.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('TokenSectionTable')
    expect(output).toContain(
      '| Group | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |'
    )
    expect(output).toContain(
      '| Group | Name | Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |'
    )
    expect(output.indexOf('| First |')).toBeLessThan(
      output.indexOf('| Second |')
    )
    expect(output).toContain('`--token-color-text-neutral`')
    expect(output).toContain('## Text')
  })

  it('replaces RadiusTokenTable with a markdown radius table', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'usage',
      'customisation',
      'theming',
      'design-tokens',
      'radius.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('RadiusTokenTable')
    expect(output).not.toContain('```tsx')
    expect(output).toContain(
      '| Token | DNB Light | DNB Dark | Sbanken Light | Sbanken Dark | Carnegie |'
    )
    expect(output.indexOf('`--token-radius-0`')).toBeLessThan(
      output.indexOf('`--token-radius-xs`')
    )
    expect(output.indexOf('`--token-radius-xs`')).toBeLessThan(
      output.indexOf('`--token-radius-sm`')
    )
    expect(output.indexOf('`--token-radius-sm`')).toBeLessThan(
      output.indexOf('`--token-radius-md`')
    )
    expect(output).toContain('`--token-radius-sm`')
    expect(output).toContain('`0.25rem`')
  })

  it('replaces real feature-field PropertiesTable content in docs that import helper exports', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )

    const dateOfBirthEventsPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'feature-fields',
      'DateOfBirth',
      'events.mdx'
    )
    const selectCurrencyPropertiesPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'feature-fields',
      'SelectCurrency',
      'properties.mdx'
    )

    const [dateOfBirthEvents, selectCurrencyProperties] =
      await Promise.all([
        convertMdxToMd({
          inputPath: dateOfBirthEventsPath,
          docsRoot,
          docsBaseRoot,
          prettierConfig: {},
          includeFrontmatter: false,
          state: { mdxCache: new Map(), inProgress: new Set() },
        }),
        convertMdxToMd({
          inputPath: selectCurrencyPropertiesPath,
          docsRoot,
          docsBaseRoot,
          prettierConfig: {},
          includeFrontmatter: false,
          state: { mdxCache: new Map(), inProgress: new Set() },
        }),
      ])

    expect(dateOfBirthEvents).not.toContain('PropertiesTable')
    expect(dateOfBirthEvents).toContain('```json')
    expect(dateOfBirthEvents).toContain('"onChange"')
    expect(dateOfBirthEvents).toContain('"onBlur"')

    expect(selectCurrencyProperties).not.toContain('PropertiesTable')
    expect(selectCurrencyProperties).toContain('```json')
    expect(selectCurrencyProperties).toContain('"currencies"')
    expect(selectCurrencyProperties).toContain('"size"')
  })

  it('replaces AvailableCountriesTable with a markdown country table', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'forms',
      'feature-fields',
      'SelectCountry',
      'properties.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('AvailableCountriesTable')
    expect(output).toContain('| ISO 3166-1 alpha-2 code | en | nb |')
    expect(output).toContain('| `AF` | Afghanistan | Afghanistan |')
  })

  it('replaces CardProductsTable with a markdown card-product table', async () => {
    const repoRoot = path.resolve(process.cwd(), '..', '..')
    const docsRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src',
      'docs'
    )
    const docsBaseRoot = path.join(
      repoRoot,
      'packages',
      'dnb-design-system-portal',
      'src'
    )
    const inputPath = path.join(
      docsRoot,
      'uilib',
      'extensions',
      'payment-card',
      'products.mdx'
    )

    const output = await convertMdxToMd({
      inputPath,
      docsRoot,
      docsBaseRoot,
      prettierConfig: {},
      includeFrontmatter: false,
      state: { mdxCache: new Map(), inProgress: new Set() },
    })

    expect(output).not.toContain('CardProductsTable')
    expect(output).toContain(
      '| Product Id | Product name cards | Card name to show in app | Design | Bank Logo | Product Logo | Product Logo Variant | Type of Card | Type of Card Variant |'
    )
    expect(output).toContain(
      '| 043 | Sølv MasterCard | Pluss Mastercard | Pluss |'
    )
  })
})
