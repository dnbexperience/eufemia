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

  test('top-level docs pages generate markdown copies', async () => {
    const mdPaths = ['/quickguide-designer.md', '/uilib.md']
    const publicDir = path.resolve(__dirname, '..', '..', 'public')

    for (const mdPath of mdPaths) {
      const mdFile = path.join(publicDir, mdPath.replace(/^\//, ''))
      expect(fs.existsSync(mdFile)).toBeTruthy()
      const mdBody = fs.readFileSync(mdFile, 'utf-8')
      expect(mdBody.startsWith('---\n')).toBeTruthy()
      expect(mdBody).toMatch(/^#\s+/m)
    }

    const uilibBody = fs.readFileSync(
      path.join(publicDir, 'uilib.md'),
      'utf-8'
    )
    expect(uilibBody).toContain('# UI library')
    expect(uilibBody).toContain('The DNB UI library contains ready-to-use')

    const iconsMdFile = path.join(publicDir, 'icons.md')
    expect(fs.existsSync(iconsMdFile)).toBeFalsy()
  })

  test('icons pages list concrete icons in rendered output', async ({
    page,
  }) => {
    await page.goto('/icons/primary/')
    await expect(
      page.getByRole('heading', { name: 'Primary Icons', exact: true })
    ).toBeVisible()
    await expect(page.getByRole('heading', { name: 'bell' })).toBeVisible()

    await page.goto('/icons/secondary/')
    await expect(page.locator('main')).toContainText(
      'A list of all Secondary Icons'
    )
    await expect(
      page.getByRole('heading', { name: 'user_feedback' })
    ).toBeVisible()
  })

  test('known .md pages have matching html pages', async ({ request }) => {
    const mdPaths = [
      '/uilib/components/button.md',
      '/uilib/components/card.md',
      '/quickguide-designer.md',
      '/uilib.md',
    ]
    const excludedMdPaths = [
      '/icons.md',
      '/uilib/extensions/payment-card/products.md',
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

    for (const mdPath of excludedMdPaths) {
      const mdFile = path.join(publicDir, mdPath.replace(/^\//, ''))
      expect(fs.existsSync(mdFile)).toBeFalsy()
    }
  })
})
