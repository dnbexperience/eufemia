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
        'head link[rel="alternate"][type="text/plain"][href="/llms.txt"]',
      )
      .first()
    await expect(llmsLink).toHaveCount(1)

    const res = await request.get('/llms.txt')
    expect(res.ok()).toBeTruthy()
    const body = await res.text()
    expect(body).toContain('# Eufemia')
    expect(body).toContain('/llm/index.json')
    expect(body).toMatch(/GeneratedAt:\s*\d{4}-\d{2}-\d{2}T/) // ISO timestamp
    expect(body).toContain('/uilib/usage/first-steps/quick-reference.md')
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

    const indexRes = await request.get('/llm/index.json')
    expect(indexRes.ok()).toBeTruthy()
    const indexBody = await indexRes.json()
    expect(Array.isArray(indexBody)).toBeTruthy()
    if (indexBody.length > 0) {
      const entry = indexBody[0]
      expect(entry).toHaveProperty('slug')
      expect(entry).toHaveProperty('metadataUrl')
      expect(entry.metadataUrl).toContain('/uilib/')
      expect(entry.metadataUrl).toContain('metadata.json')
      expect(entry).not.toHaveProperty('path')
    }
  })

  test('component page exposes per-page metadata link and serves JSON', async ({
    page,
    request,
  }) => {
    // Use a well-known docs page
    const slug = '/uilib/components/card/'
    await page.goto(slug)

    const altJson = page.locator(
      'head link[rel="alternate"][type="application/json"]',
    )
    await expect(altJson).toHaveCount(1)

    const href = await altJson.getAttribute('href')
    expect(href).toBe(`${slug}metadata.json`)

    const res = await request.get(href)
    expect(res.ok()).toBeTruthy()
    const json = await res.json()
    expect(json).toHaveProperty('name')
    expect(json).toHaveProperty('slug', slug)
    expect(Array.isArray(json.props)).toBeTruthy()
    expect(Array.isArray(json.events)).toBeTruthy()
    // checksum should be non-empty string
    expect(typeof json.checksum).toBe('string')
    expect((json.checksum as string).length).toBeGreaterThan(0)
    expect(typeof json?.source?.fileUrl).toBe('string')
    expect(typeof json?.source?.dirUrl).toBe('string')

    // metadata should include demos source link when present
    expect(json?.sources?.demos?.public).toContain(
      '/uilib/components/card/demos/',
    )

    const mdPath = slug.replace(/\/$/, '.md')
    const mdRes = await request.get(mdPath)
    expect(mdRes.ok()).toBeTruthy()
    const mdBody = await mdRes.text()
    expect(mdBody).toContain(
      'metadata: https://eufemia.dnb.no/uilib/components/card/metadata.json',
    )
    expect(mdBody).not.toContain('showTabs:')
    expect(mdBody).not.toContain('hideTabs:')
  })

  test('known .md pages have matching html pages', async () => {
    const mdPaths = [
      '/uilib/components/button.md',
      '/uilib/elements/image.md',
      '/uilib/components/icon.md',
    ]
    const publicDir = path.resolve(__dirname, '..', '..', 'public')

    for (const mdPath of mdPaths) {
      const mdFile = path.join(publicDir, mdPath.replace(/^\//, ''))
      expect(fs.existsSync(mdFile)).toBeTruthy()
      const mdBody = fs.readFileSync(mdFile, 'utf-8')
      expect(mdBody).toContain('metadata:')
      expect(mdBody).toMatch(/```[a-z]*\n[\s\S]*```/)

      const htmlFile = path.join(
        publicDir,
        mdPath.replace(/^\//, '').replace(/\.md$/, ''),
        'index.html',
      )
      expect(fs.existsSync(htmlFile)).toBeTruthy()
      const htmlBody = fs.readFileSync(htmlFile, 'utf-8')
      expect(htmlBody.toLowerCase()).toContain('<!doctype html')
    }
  })
})
