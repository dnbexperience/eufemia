import fs from 'fs'
import os from 'os'
import path from 'path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

const { convertMdxToMd, loadTsDocsForDocPath, toPublicUrl, toSlugAndDir } =
  await import('../../src/convertHelpers.ts')

describe('convertMdxToMd', () => {
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
})
