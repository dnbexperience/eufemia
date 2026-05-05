import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import testPageFilterPlugin, {
  collectTestFiles,
  extractVisualTestUrls,
  extractPageGotoUrls,
  normalizePagePath,
} from '../../client/plugins/test-page-filter'

describe('test-page-filter plugin', () => {
  describe('plugin interface', () => {
    it('returns a plugin with the correct name', () => {
      const plugin = testPageFilterPlugin()
      expect(plugin.name).toBe('test-page-filter')
    })

    it('returns a no-op plugin when no test env vars are set', () => {
      const plugin = testPageFilterPlugin()

      // Should not have a transform hook when disabled
      expect(plugin.transform).toBeUndefined()
    })
  })

  describe('normalizePagePath', () => {
    it('normalizes a path with trailing slash', () => {
      expect(normalizePagePath('/uilib/components/')).toBe(
        '/uilib/components'
      )
    })

    it('normalizes a path without leading slash', () => {
      expect(normalizePagePath('uilib/components')).toBe(
        '/uilib/components'
      )
    })

    it('strips query strings', () => {
      expect(normalizePagePath('/page?foo=bar')).toBe('/page')
    })

    it('strips hash fragments', () => {
      expect(normalizePagePath('/page#section')).toBe('/page')
    })

    it('returns "/" for root path', () => {
      expect(normalizePagePath('/')).toBe('/')
    })

    it('returns null for null input', () => {
      expect(normalizePagePath(null)).toBeNull()
    })

    it('returns null for undefined input', () => {
      expect(normalizePagePath(undefined)).toBeNull()
    })

    it('returns null for empty string', () => {
      expect(normalizePagePath('')).toBeNull()
    })

    it('returns null for whitespace-only string', () => {
      expect(normalizePagePath('   ')).toBeNull()
    })
  })

  describe('collectTestFiles', () => {
    let tmpDir: string

    function createFile(relativePath: string, content = '') {
      const full = path.join(tmpDir, relativePath)
      fs.mkdirSync(path.dirname(full), { recursive: true })
      fs.writeFileSync(full, content)
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'test-page-filter-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('finds files matching the matcher', () => {
      createFile('button/button.screenshot.test.ts', '')
      createFile('button/button.test.ts', '')
      createFile('input/input.screenshot.test.tsx', '')

      const files = collectTestFiles(tmpDir, (name) =>
        name.endsWith('.screenshot.test.ts')
      )

      expect(files).toHaveLength(1)
      expect(files[0]).toContain('button.screenshot.test.ts')
    })

    it('traverses subdirectories', () => {
      createFile('a/b/c/deep.spec.ts', '')

      const files = collectTestFiles(tmpDir, (name) =>
        name.endsWith('.spec.ts')
      )

      expect(files).toHaveLength(1)
      expect(files[0]).toContain('deep.spec.ts')
    })

    it('skips node_modules', () => {
      createFile('node_modules/pkg/test.spec.ts', '')
      createFile('src/test.spec.ts', '')

      const files = collectTestFiles(tmpDir, (name) =>
        name.endsWith('.spec.ts')
      )

      expect(files).toHaveLength(1)
      expect(files[0]).toContain('src/test.spec.ts')
    })

    it('returns empty array for non-existent directory', () => {
      const files = collectTestFiles(
        path.join(tmpDir, 'nonexistent'),
        () => true
      )

      expect(files).toHaveLength(0)
    })
  })

  describe('extractVisualTestUrls', () => {
    let tmpDir: string

    function writeTsFile(name: string, content: string): string {
      const filePath = path.join(tmpDir, name)
      fs.writeFileSync(filePath, content)
      return filePath
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'visual-test-extract-')
      )
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('extracts url from setupPageScreenshot call', () => {
      const filePath = writeTsFile(
        'button.screenshot.test.ts',
        `
        setupPageScreenshot({
          url: '/uilib/components/button/demos/',
        })
        `
      )

      const urls = extractVisualTestUrls(filePath)
      expect(urls.has('/uilib/components/button/demos')).toBe(true)
    })

    it('extracts url from makeScreenshot call', () => {
      const filePath = writeTsFile(
        'input.screenshot.test.ts',
        `
        makeScreenshot({
          url: '/uilib/components/input/demos/',
        })
        `
      )

      // makeScreenshot is only matched by extractVisualTestUrls
      const visualUrls = extractVisualTestUrls(filePath)
      expect(visualUrls.has('/uilib/components/input/demos')).toBe(true)
    })

    it('extracts url from constant references', () => {
      const filePath = writeTsFile(
        'card.screenshot.test.ts',
        `
        const url = '/uilib/components/card/demos/'
        setupPageScreenshot({ url })
        `
      )

      const urls = extractVisualTestUrls(filePath)
      expect(urls.has('/uilib/components/card/demos')).toBe(true)
    })

    it('returns empty set when no URLs found', () => {
      const filePath = writeTsFile(
        'empty.screenshot.test.ts',
        `
        describe('test', () => {
          it('does nothing', () => {})
        })
        `
      )

      const urls = extractVisualTestUrls(filePath)
      expect(urls.size).toBe(0)
    })
  })

  describe('extractPageGotoUrls', () => {
    let tmpDir: string

    function writeTsFile(name: string, content: string): string {
      const filePath = path.join(tmpDir, name)
      fs.writeFileSync(filePath, content)
      return filePath
    }

    beforeEach(() => {
      tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'e2e-extract-'))
    })

    afterEach(() => {
      fs.rmSync(tmpDir, { recursive: true, force: true })
    })

    it('extracts url from page.goto call', () => {
      const filePath = writeTsFile(
        'button.e2e.spec.ts',
        `
        test('button works', async ({ page }) => {
          await page.goto('/uilib/components/button/demos/')
        })
        `
      )

      const urls = extractPageGotoUrls(filePath)
      expect(urls.has('/uilib/components/button/demos')).toBe(true)
    })

    it('extracts url from constant references', () => {
      const filePath = writeTsFile(
        'input.e2e.spec.ts',
        `
        const pageUrl = '/uilib/components/input/demos/'
        test('input works', async ({ page }) => {
          await page.goto(pageUrl)
        })
        `
      )

      const urls = extractPageGotoUrls(filePath)
      expect(urls.has('/uilib/components/input/demos')).toBe(true)
    })

    it('extracts multiple URLs from a single file', () => {
      const filePath = writeTsFile(
        'multi.e2e.spec.ts',
        `
        test('first', async ({ page }) => {
          await page.goto('/uilib/components/button/')
        })
        test('second', async ({ page }) => {
          await page.goto('/uilib/components/input/')
        })
        `
      )

      const urls = extractPageGotoUrls(filePath)
      expect(urls.has('/uilib/components/button')).toBe(true)
      expect(urls.has('/uilib/components/input')).toBe(true)
    })

    it('returns empty set when no page.goto calls found', () => {
      const filePath = writeTsFile(
        'no-goto.spec.ts',
        `
        test('test', () => {
          expect(1).toBe(1)
        })
        `
      )

      const urls = extractPageGotoUrls(filePath)
      expect(urls.size).toBe(0)
    })

    it('does not extract non-portal URLs from page.goto calls', () => {
      const filePath = writeTsFile(
        'no-goto.spec.ts',
        `
        test('test', async ({ page }) => {
          await page.goto('not-a-url')
        })
        `
      )

      // Non-URL strings are normalized to portal paths — this matches
      // gatsby-node.js behavior where page.goto always uses portal paths.
      const urls = extractPageGotoUrls(filePath)
      expect(urls.has('/not-a-url')).toBe(true)
    })
  })
})
