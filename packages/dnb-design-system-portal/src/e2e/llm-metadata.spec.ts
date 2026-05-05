import { test, expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'

test.describe('LLM integration', () => {
  test('index exposes llms.txt via alternate link and is reachable', async ({
    page,
    request,
  }) => {
    // Visit home to inspect head links
    await page.goto('/')

    const llmsLink = await page
      .locator(
        'head link[rel="alternate"][type="text/plain"][href="/llms.txt"]'
      )
      .first()
    await expect(llmsLink).toHaveCount(1)

    const res = await request.get('/llms.txt')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toContain('# Eufemia')
    expect(body).toMatch(/GeneratedAt:\s*\d{4}-\d{2}-\d{2}T/) // ISO timestamp
    expect(body).toContain('/uilib/usage/first-steps/quick-reference.md')
    expect(body).toContain('## Machine-readable docs')
    // Ensure visual-tests entries are excluded from llms.txt
    expect(body).not.toContain('/visual-tests/')
    expect(body).not.toContain('Metadata:')
    expect(body).not.toContain('Docs:')
    expect(body).not.toContain('Checksum:')
    expect(body).toMatch(/^##\s+\w+/m)
    expect(body).toMatch(/^- \[[^\]]+\]\([^)]+\):/m)
    const othersIndex = body.indexOf('## General')
    const componentsIndex = body.indexOf('## Components')
    if (othersIndex !== -1 && componentsIndex !== -1) {
      expect(othersIndex).toBeLessThan(componentsIndex)
    }
  })

  test('component page exposes per-page docs', async ({ page }) => {
    // Use a well-known docs page
    const slug = '/uilib/components/card/'
    await page.goto(slug)

    const mdPath = slug.replace(/\/$/, '.md')
    const mdBody = await page.request.get(mdPath).then((r) => r.text())
    expect(mdBody).toContain('# Card')
    expect(mdBody).not.toContain('showTabs:')
    expect(mdBody).not.toContain('hideTabs:')
  })

  test('top-level docs pages expose markdown copies', async ({ page }) => {
    const mdPaths = ['/icons.md', '/uilib.md']

    for (const mdPath of mdPaths) {
      const mdBody = await page.request.get(mdPath).then((r) => r.text())
      expect(mdBody.startsWith('---\n')).toBeTruthy()
      expect(mdBody).toMatch(/^#\s+/m)
    }

    const iconsBody = await page.request
      .get('/icons.md')
      .then((r) => r.text())
    expect(iconsBody).not.toContain('ListAllIcons')
    expect(iconsBody).toContain('`bell`')
    expect(iconsBody).toContain('`user_feedback`')
    expect(iconsBody).toContain('## Essentials')
  })

  test('known .md pages have matching html pages', async ({ request }) => {
    const mdPaths = [
      '/uilib/components/button.md',
      '/uilib/components/card.md',
      '/icons.md',
      '/uilib.md',
    ]
    const mdPathsWithCodeBlocks = new Set([
      '/uilib/components/button.md',
      '/uilib/components/card.md',
    ])
    const publicDir = path.resolve(__dirname, '..', '..', 'public')
    const firstMdFile = path.join(publicDir, mdPaths[0].replace(/^\//, ''))
    if (!fs.existsSync(firstMdFile)) {
      test.skip(
        true,
        'portal public .md files not found (run build:e2e from portal package first)'
      )
      return
    }

    for (const mdPath of mdPaths) {
      const mdFile = path.join(publicDir, mdPath.replace(/^\//, ''))
      expect(fs.existsSync(mdFile)).toBeTruthy()
      const mdBody = fs.readFileSync(mdFile, 'utf-8')
      expect(mdBody).not.toContain('doc:')

      if (mdPathsWithCodeBlocks.has(mdPath)) {
        expect(mdBody).toMatch(/```[a-z]*\n[\s\S]*```/)
      } else {
        expect(mdBody).toMatch(/^#\s+/m)
      }

      const htmlPath = mdPath.replace(/\.md$/, '/')
      const htmlResponse = await request.get(htmlPath)

      expect(htmlResponse.ok()).toBeTruthy()

      const htmlBody = await htmlResponse.text()
      expect(htmlBody.toLowerCase()).toContain('<!doctype html')
    }
  })
})
