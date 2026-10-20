import fs from 'fs'
import os from 'os'
import path from 'path'
import { vi } from 'vitest'

vi.mock('prettier', () => ({
  format: async (code: string) => code,
  default: { format: async (code: string) => code },
}))

import { createMarkdownCopies } from '../../src/convertHelpers.ts'

describe('createMarkdownCopies', () => {
  it('keeps old Markdown URLs and skips contentless navigation documents', async () => {
    const tmpRoot = fs.mkdtempSync(
      path.join(os.tmpdir(), 'llm-md-migration-')
    )
    const docsRoot = path.join(tmpRoot, 'docs')
    const outputRoot = path.join(tmpRoot, 'out')
    fs.mkdirSync(path.join(docsRoot, 'web'), { recursive: true })
    fs.writeFileSync(
      path.join(docsRoot, 'web', 'introduction.mdx'),
      '---\ntitle: Web introduction\nredirect_from:\n  - /uilib\n  - /web\n---\nOriginal content.'
    )
    fs.writeFileSync(
      path.join(docsRoot, 'web.mdx'),
      '---\ntitle: Web\nroute: false\n---\n'
    )
    fs.writeFileSync(
      path.join(docsRoot, 'home.mdx'),
      '---\ntitle: Home\nslug: /\n---\nWelcome home.'
    )
    try {
      await createMarkdownCopies({
        siteDir: tmpRoot,
        docsRoot,
        outputRoot,
        slugBase: '',
        publicUrlBase: '',
      })
      const canonical = fs.readFileSync(
        path.join(outputRoot, 'web/introduction.md'),
        'utf8'
      )
      const home = fs.readFileSync(
        path.join(outputRoot, 'home.md'),
        'utf8'
      )
      expect(home).toContain('Welcome home.')
      expect(
        fs.readFileSync(path.join(outputRoot, 'index.md'), 'utf8')
      ).toBe(home)
      expect(fs.existsSync(path.join(outputRoot, '.md'))).toBe(false)
      expect(
        fs.readFileSync(path.join(outputRoot, 'uilib.md'), 'utf8')
      ).toBe(canonical)
      expect(
        fs.readFileSync(path.join(outputRoot, 'web.md'), 'utf8')
      ).toBe(canonical)
    } finally {
      fs.rmSync(tmpRoot, { recursive: true, force: true })
    }
  })

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

  it('writes markdown copies for non-uilib routes when no slug base is used', async () => {
    const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'llm-md-route-'))
    const docsRoot = path.join(tmpRoot, 'docs')
    const outputRoot = path.join(tmpRoot, 'out')
    const entryDir = path.join(docsRoot, 'quickguide-designer')
    const entryFile = path.join(entryDir, 'tools.mdx')

    fs.mkdirSync(entryDir, { recursive: true })

    fs.writeFileSync(
      entryFile,
      [
        '---',
        "title: 'Tools'",
        '---',
        '',
        '# Tools',
        '',
        'Designer tooling docs.',
      ].join('\n')
    )

    await createMarkdownCopies({
      siteDir: tmpRoot,
      docsRoot,
      outputRoot,
      publicUrlBase: '',
      slugBase: '',
    })

    const outputPath = path.join(
      outputRoot,
      'quickguide-designer',
      'tools.md'
    )

    expect(fs.existsSync(outputPath)).toBe(true)
    expect(fs.readFileSync(outputPath, 'utf-8')).toContain(
      'Designer tooling docs.'
    )
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
