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
      JSON.stringify(['about', 'design-foundations'])
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
    await expect(view.getByTitle('Go to Eufemia home')).toBeInViewport()
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

for (const width of [1440, 1280]) {
  for (const storedPosition of [0, 400]) {
    test(
      'does not paint an unscrolled menu while its HTML is still arriving at ' +
        width +
        ' with saved scroll ' +
        storedPosition,
      async ({ page, request, baseURL }) => {
        await page.setViewportSize({ width, height: 900 })
        const html = await (
          await request.get('/web/components/button/')
        ).text()
        const marker = 'data-sidebar-menu-id="web-components-card"'
        const split = html.indexOf('<li ', html.indexOf(marker))
        expect(split).toBeGreaterThan(0)
        let finishResponse: () => void
        const server = createServer((req, res) => {
          if (req.url !== '/web/components/button/') {
            res.writeHead(302, {
              Location: new URL(req.url, baseURL).href,
            })
            res.end()
            return
          }
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.write(html.slice(0, split))
          finishResponse = () => {
            if (!res.writableEnded) {
              res.end(html.slice(split))
            }
          }
        })
        await new Promise<void>((resolve) =>
          server.listen(0, '127.0.0.1', resolve)
        )
        const address = server.address()
        if (typeof address !== 'object' || !address) {
          throw new Error('Expected local streaming server')
        }
        await page.addInitScript((storedPosition) => {
          sessionStorage.setItem(
            'portal-sidebar-menu-open-items-shared-scroll-position',
            String(storedPosition)
          )
          sessionStorage.setItem(
            'portal-sidebar-menu-open-items-shared',
            JSON.stringify(['design-foundations', 'about'])
          )
          sessionStorage.setItem(
            'portal-sidebar-menu-open-items-platform',
            JSON.stringify(['web-components'])
          )
        }, storedPosition)
        let resume: () => void
        const hydration = new Promise<void>((resolve) => {
          resume = resolve
        })
        await page.route(/\.m?js(?:\?|$)/, async (route) => {
          await hydration
          await route.continue()
        })
        try {
          await page.goto(
            'http://127.0.0.1:' + address.port + '/web/components/button/',
            { waitUntil: 'commit' }
          )
          const view = page.locator(
            '#portal-sidebar-menu .portal-sidebar-scroll-view'
          )
          await expect(view).toBeAttached()
          if (storedPosition > 0) {
            await expect(view).toBeHidden()
            await expect(
              view.locator('[aria-current="page"]')
            ).toBeHidden()
          } else {
            await expect(view).toBeVisible()
          }
          finishResponse()
          await expect(view).toBeVisible()
          await expect
            .poll(() => view.evaluate((element) => element.scrollTop))
            .toBe(storedPosition)
          await expect(page.locator('html')).not.toHaveAttribute(
            'data-portal-ready'
          )
          resume()
          await waitForApp(page)
          await expect
            .poll(() => view.evaluate((element) => element.scrollTop))
            .toBe(storedPosition)
        } finally {
          resume()
          finishResponse?.()
          await page.unrouteAll({ behavior: 'wait' })
          server.closeAllConnections()
          await new Promise<void>((resolve) =>
            server.close(() => resolve())
          )
        }
      }
    )
  }
}
