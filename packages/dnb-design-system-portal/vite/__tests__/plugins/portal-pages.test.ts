import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import {
  shouldIgnore,
  scanPageFiles,
  slugify,
  extractTableOfContents,
} from '../../client/plugins/portal-pages'
import portalPagesPlugin from '../../client/plugins/portal-pages'

describe('portal-pages plugin', () => {
  describe('shouldIgnore', () => {
    it('ignores Examples files', () => {
      expect(shouldIgnore('/src/docs/button/Examples.tsx')).toBe(true)
      expect(shouldIgnore('/src/docs/button/Examples.mdx')).toBe(true)
    })

    it('ignores _not_in_use directories', () => {
      expect(shouldIgnore('/src/docs/_not_in_use/old-page.mdx')).toBe(true)
    })

    it('ignores assets directories', () => {
      expect(shouldIgnore('/src/docs/uilib/assets/icon.tsx')).toBe(true)
    })

    it('ignores __utils__ directories', () => {
      expect(shouldIgnore('/src/docs/uilib/__utils__/helper.tsx')).toBe(
        true
      )
    })

    it('ignores CardProductsTable.js', () => {
      expect(
        shouldIgnore('/src/docs/extensions/CardProductsTable.js')
      ).toBe(true)
    })

    it('ignores ColorTable.tsx', () => {
      expect(shouldIgnore('/src/docs/uilib/ColorTable.tsx')).toBe(true)
    })

    it('ignores underscore-prefixed files', () => {
      expect(shouldIgnore('/src/docs/uilib/typography/_helpers.tsx')).toBe(
        true
      )
      expect(
        shouldIgnore(
          '/src/docs/uilib/components/drawer-list/_prop-data.mdx'
        )
      ).toBe(true)
    })

    it('does not ignore regular page files', () => {
      expect(shouldIgnore('/src/docs/button/info.mdx')).toBe(false)
      expect(shouldIgnore('/src/docs/uilib/index.tsx')).toBe(false)
    })
  })

  describe('scanPageFiles', () => {
    let tmpDir: string

    function createFile(relativePath: string, content = '') {
      const full = path.join(tmpDir, relativePath)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-pages-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('finds MDX and TSX files', () => {
      createFile('button/info.mdx', '---\ntitle: Button\n---\n# Button')
      createFile('index.tsx', 'export default () => <div/>')

      const files = scanPageFiles(tmpDir)
      expect(files).toHaveLength(2)

      const mdxFile = files.find((f) => f.type === 'mdx')
      expect(mdxFile).toBeDefined()
      expect(mdxFile!.slug).toBe('button/info')
      expect(mdxFile!.frontmatter).toEqual({ title: 'Button' })

      const tsxFile = files.find((f) => f.type === 'tsx')
      expect(tsxFile).toBeDefined()
      expect(tsxFile!.slug).toBe('')
    })

    it('ignores files matching IGNORE_PATTERNS', () => {
      createFile('button/info.mdx', '# Button')
      createFile('button/Examples.tsx', 'export default () => null')

      const files = scanPageFiles(tmpDir)
      expect(files).toHaveLength(1)
      expect(files[0].slug).toBe('button/info')
    })

    it('ignores MDX files starting with underscore', () => {
      createFile('_draft.mdx', '# Draft')
      createFile('public.mdx', '# Public')

      const files = scanPageFiles(tmpDir)
      expect(files).toHaveLength(1)
      expect(files[0].slug).toBe('public')
    })

    it('strips index from slug', () => {
      createFile('uilib/index.mdx', '---\ntitle: UILib\n---')

      const files = scanPageFiles(tmpDir)
      expect(files[0].slug).toBe('uilib')
    })

    it('extracts frontmatter from MDX files', () => {
      createFile(
        'page.mdx',
        '---\ntitle: My Page\norder: 3\ndraft: true\n---\n# Content'
      )

      const files = scanPageFiles(tmpDir)
      expect(files[0].frontmatter).toEqual({
        title: 'My Page',
        order: 3,
        draft: true,
      })
    })

    it('returns empty frontmatter for TSX files', () => {
      createFile('page.tsx', 'export default () => <div/>')

      const files = scanPageFiles(tmpDir)
      expect(files[0].frontmatter).toEqual({})
    })

    it('ignores non-page file extensions', () => {
      createFile('styles.scss', '.foo {}')
      createFile('utils.js', 'module.exports = {}')
      createFile('page.mdx', '# Page')

      const files = scanPageFiles(tmpDir)
      expect(files).toHaveLength(1)
    })
  })

  describe('first-tab detection', () => {
    let tmpDir: string

    function createFile(relativePath: string, content = '') {
      const full = path.join(tmpDir, relativePath)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-first-tab-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('identifies info.mdx with showTabs but no title as first-tab page', () => {
      createFile(
        'uilib/components/button.mdx',
        '---\ntitle: Button\nshowTabs: true\n---\n# Button'
      )
      createFile(
        'uilib/components/button/info.mdx',
        '---\nshowTabs: true\n---\n# Info'
      )
      createFile(
        'uilib/components/button/demos.mdx',
        '---\nshowTabs: true\n---\n# Demos'
      )

      const files = scanPageFiles(tmpDir)

      const infoFile = files.find(
        (f) => f.slug === 'uilib/components/button/info'
      )
      expect(infoFile).toBeDefined()
      expect(infoFile!.frontmatter.showTabs).toBe(true)
      expect(infoFile!.frontmatter.title).toBeUndefined()

      // The first-tab detection condition from portal-pages plugin
      const isFirstTab =
        infoFile!.type === 'mdx' &&
        infoFile!.frontmatter.showTabs &&
        !infoFile!.frontmatter.title &&
        infoFile!.slug.endsWith('/info')
      expect(isFirstTab).toBe(true)

      // Demos should NOT be a first-tab page
      const demosFile = files.find(
        (f) => f.slug === 'uilib/components/button/demos'
      )
      const isDemosFirstTab =
        demosFile!.type === 'mdx' &&
        demosFile!.frontmatter.showTabs &&
        !demosFile!.frontmatter.title &&
        demosFile!.slug.endsWith('/info')
      expect(isDemosFirstTab).toBe(false)
    })

    it('does not flag info.mdx with a title as first-tab', () => {
      createFile(
        'uilib/components/widget/info.mdx',
        '---\ntitle: Widget Info\nshowTabs: true\n---\n# Info'
      )

      const files = scanPageFiles(tmpDir)
      const infoFile = files.find(
        (f) => f.slug === 'uilib/components/widget/info'
      )

      const isFirstTab =
        infoFile!.type === 'mdx' &&
        infoFile!.frontmatter.showTabs &&
        !infoFile!.frontmatter.title &&
        infoFile!.slug.endsWith('/info')
      expect(isFirstTab).toBe(false)
    })

    it('does not flag info.mdx without showTabs as first-tab', () => {
      createFile(
        'uilib/components/standalone/info.mdx',
        '---\n---\n# Info'
      )

      const files = scanPageFiles(tmpDir)
      const infoFile = files.find(
        (f) => f.slug === 'uilib/components/standalone/info'
      )

      const isFirstTab =
        infoFile!.type === 'mdx' &&
        infoFile!.frontmatter.showTabs &&
        !infoFile!.frontmatter.title &&
        infoFile!.slug.endsWith('/info')
      expect(isFirstTab).toBeFalsy()
    })
  })

  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = portalPagesPlugin()
      expect(plugin.name).toBe('vite-plugin-portal-pages')
    })

    it('resolves the virtual module ID', () => {
      const plugin = portalPagesPlugin()
      const resolveId = plugin.resolveId as (
        id: string
      ) => string | undefined
      expect(resolveId('virtual:portal-pages')).toBe(
        '\0virtual:portal-pages'
      )
      expect(resolveId('some-other-module')).toBeUndefined()
    })

    it('generates code with routes and allMdxNodes from load()', () => {
      const plugin = portalPagesPlugin()
      const load = plugin.load as (id: string) => string | undefined
      const code = load('\0virtual:portal-pages')

      expect(code).toBeDefined()
      expect(code).toContain('export const routes')
      expect(code).toContain('export const allMdxNodes')
      expect(code).toContain('import React')
      expect(code).toContain('redirect')
    })

    it('returns nothing for non-virtual module IDs', () => {
      const plugin = portalPagesPlugin()
      const load = plugin.load as (id: string) => string | undefined
      expect(load('some-other-id')).toBeUndefined()
    })
  })

  describe('slugify', () => {
    it('converts text to lowercase kebab-case', () => {
      expect(slugify('Hello World')).toBe('hello-world')
    })

    it('strips special characters', () => {
      expect(slugify("What's new?")).toBe('whats-new')
    })

    it('collapses multiple dashes', () => {
      expect(slugify('foo -- bar')).toBe('foo-bar')
    })

    it('trims leading and trailing dashes', () => {
      expect(slugify(' -Hello- ')).toBe('hello')
    })
  })

  describe('extractTableOfContents', () => {
    it('extracts h2 headings as top-level items', () => {
      const content = '## First\n\nSome text\n\n## Second\n'
      const toc = extractTableOfContents(content)

      expect(toc).toEqual({
        items: [
          { url: '#first', title: 'First' },
          { url: '#second', title: 'Second' },
        ],
      })
    })

    it('nests h3 headings under the preceding h2', () => {
      const content =
        '## Parent\n\n### Child One\n\n### Child Two\n\n## Another\n'
      const toc = extractTableOfContents(content)

      expect(toc).toEqual({
        items: [
          {
            url: '#parent',
            title: 'Parent',
            items: [
              { url: '#child-one', title: 'Child One' },
              { url: '#child-two', title: 'Child Two' },
            ],
          },
          { url: '#another', title: 'Another' },
        ],
      })
    })

    it('returns undefined for content without headings', () => {
      expect(extractTableOfContents('Just text')).toBeUndefined()
    })

    it('ignores h1 headings', () => {
      const content = '# Title\n\n## Section\n'
      const toc = extractTableOfContents(content)

      expect(toc).toEqual({
        items: [{ url: '#section', title: 'Section' }],
      })
    })

    it('ignores h4+ headings', () => {
      const content = '## Section\n\n#### Deep\n'
      const toc = extractTableOfContents(content)

      expect(toc).toEqual({
        items: [{ url: '#section', title: 'Section' }],
      })
    })
  })

  describe('scanPageFiles tableOfContents', () => {
    let tmpDir: string

    function createFile(relativePath: string, content = '') {
      const full = path.join(tmpDir, relativePath)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'portal-pages-toc-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('includes tableOfContents for MDX files with headings', () => {
      createFile(
        'page.mdx',
        '---\ntitle: Page\norder: 1\n---\n\n## Getting started\n\n### Step one\n\n### Step two\n'
      )

      const files = scanPageFiles(tmpDir)
      expect(files[0].tableOfContents).toEqual({
        items: [
          {
            url: '#getting-started',
            title: 'Getting started',
            items: [
              { url: '#step-one', title: 'Step one' },
              { url: '#step-two', title: 'Step two' },
            ],
          },
        ],
      })
    })

    it('omits tableOfContents for MDX files without headings', () => {
      createFile(
        'page.mdx',
        '---\ntitle: Page\n---\n\nJust some content.\n'
      )

      const files = scanPageFiles(tmpDir)
      expect(files[0].tableOfContents).toBeUndefined()
    })

    it('omits tableOfContents for TSX files', () => {
      createFile('page.tsx', 'export default () => <div/>')

      const files = scanPageFiles(tmpDir)
      expect(files[0].tableOfContents).toBeUndefined()
    })
  })
})
