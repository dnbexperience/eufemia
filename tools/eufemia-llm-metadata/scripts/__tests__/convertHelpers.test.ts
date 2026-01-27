import fs from 'fs'
import os from 'os'
import path from 'path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

const { convertMdxToMd } = await import('../../src/convertHelpers.ts')

describe('convertMdxToMd', () => {
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
})
