import { test, expect } from '@playwright/test'

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
    // Ensure visual-tests entries are excluded from llms.txt
    expect(body).not.toContain('/visual-tests/')
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
    expect(href).toBe(`/llm${slug}metadata.json`)

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

    // metadata should include demos source link when present
    expect(json?.sources?.demos?.public).toContain(
      '/uilib/components/card/demos/',
    )
  })
})
