import fs from 'fs'
import os from 'os'
import path from 'path'
import { jest } from '@jest/globals'

jest.unstable_mockModule('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

const { createMarkdownCopies } = await import(
  '../../src/convertHelpers.ts'
)

describe('createMarkdownCopies', () => {
  it('appends properties and events markdown to output', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-md-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    const outputRoot = path.join(tmpRoot, 'out')
    const entryDir = path.join(docsRoot, 'components')
    const entryFile = path.join(entryDir, 'button.mdx')
    const extrasDir = path.join(entryDir, 'button')

    fs.mkdirSync(extrasDir, { recursive: true })

    fs.writeFileSync(
      path.join(entryDir, 'ButtonDocs.ts'),
      [
        'export const ButtonProperties = {',
        "  size: { doc: 'Size', type: 'string' },",
        '};',
        'export const ButtonEvents = {',
        "  onClick: { doc: 'Click', type: 'function' },",
        '};',
      ].join('\n')
    )

    fs.writeFileSync(
      entryFile,
      [
        '---',
        "title: 'Button'",
        '---',
        '',
        '# Button',
        '',
        'Main content.',
      ].join('\n')
    )

    fs.writeFileSync(
      path.join(extrasDir, 'properties.mdx'),
      [
        '---',
        'showTabs: true',
        '---',
        '',
        "import { ButtonProperties } from '../ButtonDocs'",
        '',
        '## Properties',
        '',
        '<PropertiesTable props={ButtonProperties} />',
      ].join('\n')
    )

    fs.writeFileSync(
      path.join(extrasDir, 'events.mdx'),
      [
        "import { ButtonEvents } from '../ButtonDocs'",
        '',
        '## Events',
        '',
        '<PropertiesTable props={ButtonEvents} />',
      ].join('\n')
    )

    await createMarkdownCopies({
      siteDir: tmpRoot,
      docsRoot,
      outputRoot,
      publicUrlBase: '',
    })

    const outputPath = path.join(
      outputRoot,
      'uilib',
      'components',
      'button.md'
    )
    const output = fs.readFileSync(outputPath, 'utf-8')

    expect(output).toContain('Main content.')
    expect(output).toContain('## Properties')
    expect(output).toContain('## Events')
    expect(output).not.toContain('properties.md')
    expect(output).not.toContain('showTabs: true')
    expect(output).not.toContain('PropertiesTable')
    expect(output).not.toContain('ButtonProperties')
    expect(output).not.toContain('ButtonEvents')

    const mainIndex = output.indexOf('Main content.')
    const propsIndex = output.indexOf('## Properties')
    const eventsIndex = output.indexOf('## Events')
    expect(mainIndex).toBeGreaterThan(-1)
    expect(propsIndex).toBeGreaterThan(mainIndex)
    expect(eventsIndex).toBeGreaterThan(propsIndex)

    const propsPath = path.join(
      outputRoot,
      'uilib',
      'components',
      'button',
      'properties.md'
    )
    const eventsPath = path.join(
      outputRoot,
      'uilib',
      'components',
      'button',
      'events.md'
    )
    expect(fs.existsSync(propsPath)).toBe(false)
    expect(fs.existsSync(eventsPath)).toBe(false)
  })

  it('adds metadata fields to frontmatter when available', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-md-meta-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    const outputRoot = path.join(tmpRoot, 'out')
    const entryDir = path.join(docsRoot, 'components')
    const entryFile = path.join(entryDir, 'button.mdx')

    fs.mkdirSync(entryDir, { recursive: true })

    fs.writeFileSync(
      entryFile,
      [
        '---',
        "title: 'Button'",
        '---',
        '',
        '# Button',
        '',
        'Main content.',
      ].join('\n')
    )

    await createMarkdownCopies({
      siteDir: tmpRoot,
      docsRoot,
      outputRoot,
      publicUrlBase: '',
      metadataBySlug: new Map([
        [
          '/uilib/components/button/',
          {
            version: '0.0.0-test',
            generatedAt: '2026-01-23T00:00:00.000Z',
            checksum: 'abc123',
          },
        ],
      ]),
    })

    const outputPath = path.join(
      outputRoot,
      'uilib',
      'components',
      'button.md'
    )
    const output = fs.readFileSync(outputPath, 'utf-8')
    expect(output).not.toContain('properties:')
    expect(output).not.toContain('events:')
    expect(output).toContain('version: 0.0.0-test')
    expect(output).toContain('generatedAt: 2026-01-23T00:00:00.000Z')
    expect(output).toContain('checksum: abc123')
  })
})
