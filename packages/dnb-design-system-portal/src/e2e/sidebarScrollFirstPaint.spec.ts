import { createServer } from 'node:http'
import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('restores sidebar scroll before the rest of a streamed page arrives', async ({
  page,
  request,
  baseURL,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  const response = await request.get('/')
  const html = await response.text()
  const mainStart = html.indexOf('<main')
  expect(mainStart).toBeGreaterThan(0)
  let finishResponse: (() => void) | undefined
  const server = createServer((req, res) => {
    if (req.url !== '/') {
      res.writeHead(302, { Location: new URL(req.url, baseURL).href })
      res.end()
      return
    }
    res.writeHead(200, { 'Content-Type': 'text/html' })
    res.write(html.slice(0, mainStart))
    finishResponse = () => {
      if (!res.writableEnded) {
        res.end(html.slice(mainStart))
      }
    }
  })
  await new Promise<void>((resolve) =>
    server.listen(0, '127.0.0.1', resolve)
  )
  const address = server.address()
  if (typeof address !== 'object' || !address) {
    throw new Error('Expected local streaming test server')
  }
  await page.addInitScript(() => {
    sessionStorage.setItem(
      'portal-sidebar-menu-open-items-shared-scroll-position',
      '900'
    )
    sessionStorage.setItem(
      'portal-sidebar-menu-open-items-shared',
      JSON.stringify(['about', 'design-language'])
    )
    sessionStorage.setItem(
      'portal-sidebar-menu-open-items-platform',
      JSON.stringify(['web-get-started', 'web-components'])
    )
  })
  const navigation = page.goto('http://127.0.0.1:' + address.port, {
    waitUntil: 'commit',
  })
  try {
    await navigation
    const view = page.locator(
      '#portal-sidebar-menu .portal-sidebar-scroll-view'
    )
    await expect(view).toBeVisible()
    await expect
      .poll(() => view.evaluate((element) => element.scrollTop))
      .toBe(900)
    await expect
      .poll(() =>
        view
          .locator('[title="Go to Eufemia home"]')
          .evaluate((element) => element.getBoundingClientRect().bottom)
      )
      .toBeLessThan(0)
    await expect(page.locator('main')).toHaveCount(0)
    finishResponse()
    await waitForApp(page)
    await expect
      .poll(() => view.evaluate((element) => element.scrollTop))
      .toBe(900)
  } finally {
    finishResponse?.()
    server.closeAllConnections()
    await new Promise<void>((resolve) => server.close(() => resolve()))
  }
})
