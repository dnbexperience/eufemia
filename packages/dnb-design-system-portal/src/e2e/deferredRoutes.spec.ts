import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import isDev from './shared/isDev'

const registry = /_virtual_portal-pages-.*\.js/

test('opens Home as a document when its lazy module fails', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/web/getting-started/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  const module = await page
    .locator('#portal-initial-route')
    .evaluate(
      (element) => JSON.parse(element.textContent).links['/'].module
    )
  let navigating = false
  page.on('request', (request) => {
    if (request.resourceType() === 'document') {
      navigating = true
    }
  })
  await page.route(module, (route) =>
    navigating
      ? route.continue()
      : route.fulfill({ status: 404, body: 'Not found' })
  )
  await page
    .locator('#portal-sidebar-menu')
    .getByRole('link', { name: 'Go to Eufemia home', exact: true })
    .evaluate((element: HTMLAnchorElement) => element.click())
  await expect(page.locator('[data-portal-home]')).toBeVisible()
  await expect(
    page.getByText('Unexpected Application Error!')
  ).toHaveCount(0)
})

test('keeps hinted prefetch failures local', async ({ page, request }) => {
  const html = await (await request.get('/')).text()
  const hintsUrl = html.match(/data-hints="([^"]+)"/)?.[1]
  test.skip(!hintsUrl, 'Production route splitting')
  const data = await (await request.get(hintsUrl)).json()
  const hint = data.links['/web/getting-started'].module
  let failures = 0
  await page.route(hint, (route) => {
    failures++
    return route.fulfill({ status: 404, body: 'Not found' })
  })
  await page.goto('/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  await page.evaluate(() => {
    document.documentElement.dataset.prefetchMarker = 'present'
  })
  await page
    .locator('[data-portal-home]')
    .getByRole('link', { name: /Develop/ })
    .dispatchEvent('pointerover')
  await expect.poll(() => failures).toBeGreaterThan(0)
  await page.waitForTimeout(300)
  await expect(page.locator('html')).toHaveAttribute(
    'data-prefetch-marker',
    'present'
  )
})

test('loads tabs after client navigation without the registry', async ({
  page,
}) => {
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  await page.goto('/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  await page.evaluate(() => {
    const link = document.createElement('a')
    link.href = '/web/components/button/'
    link.textContent = 'Button route test'
    document.body.appendChild(link)
    link.click()
  })
  await expect(page).toHaveURL(/\/web\/components\/button\//)
  await page.getByRole('tab', { name: 'Properties', exact: true }).click()
  await expect(page).toHaveURL(/button\/properties\/?$/)
  expect(requests.filter((url) => registry.test(url))).toEqual([])
})

test('keeps registry lazy-page prefetch failures local', async ({
  page,
  request,
}) => {
  const html = await (await request.get('/')).text()
  const hintsUrl = html.match(/data-hints="([^"]+)"/)?.[1]
  test.skip(!hintsUrl, 'Production route splitting')
  const data = await (await request.get(hintsUrl)).json()
  const pathname =
    '/web/components/card/visual-tests/action-with-nested-card'
  const module = data.links[pathname].module
  delete data.links[pathname]
  await page.route(hintsUrl, (route) => route.fulfill({ json: data }))
  let failures = 0
  await page.route(module, (route) => {
    failures++
    return route.fulfill({ status: 404, body: 'Not found' })
  })
  await page.goto('/')
  await waitForApp(page)
  await page.evaluate((pathname) => {
    document.documentElement.dataset.prefetchMarker = 'present'
    const link = document.createElement('a')
    link.href = pathname
    document.body.appendChild(link)
    link.dispatchEvent(new Event('pointerover', { bubbles: true }))
  }, pathname)
  await expect.poll(() => failures).toBeGreaterThan(0)
  await page.waitForTimeout(300)
  await expect(page.locator('html')).toHaveAttribute(
    'data-prefetch-marker',
    'present'
  )
})

test('prepares legacy search navigation on focus', async ({ page }) => {
  await page.goto('/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  const loaded = page.waitForResponse(registry)
  await page.locator('#portal-home-search, #portal-search').first().focus()
  await (await loaded).finished()
  await page.evaluate(() => {
    const link = document.createElement('a')
    link.href = '/uilib/components/button/'
    document.body.appendChild(link)
    link.click()
  })
  await expect(page).toHaveURL(/\/web\/components\/button\//)
  await expect(
    page.getByRole('heading', { name: 'Button', exact: true })
  ).toBeVisible()
})

for (const interaction of ['hover', 'focus', 'click'] as const) {
  test(
    'loads routes on ' + interaction + ' and preserves SPA navigation',
    async ({ page }) => {
      const requests: string[] = []
      const errors: string[] = []
      page.on('request', (request) => requests.push(request.url()))
      page.on('pageerror', (error) => errors.push(error.message))
      await page.goto('/')
      await waitForApp(page)
      test.skip(await isDev(page), 'Production route splitting')
      expect(requests.filter((url) => registry.test(url))).toEqual([])

      const link = page
        .locator('[data-portal-home]')
        .getByRole('link', { name: /Develop/ })
      await page.evaluate(() => {
        document.documentElement.dataset.navigationMarker = 'present'
      })
      if (interaction === 'click') {
        // Click without pointer movement or focus, as imperative navigation can.
        await link.evaluate((element: HTMLAnchorElement) =>
          element.click()
        )
      } else {
        await link[interaction]()
        expect(requests.filter((url) => registry.test(url))).toHaveLength(
          0
        )
        await link.click()
      }
      await expect(page).toHaveURL(/\/web\/getting-started\//)
      await expect(
        page.getByRole('heading', { name: 'Quick start', exact: true })
      ).toContainText('Quick start')
      await expect(page.locator('html')).toHaveAttribute(
        'data-navigation-marker',
        'present'
      )
      await page.goBack()
      await expect(page.locator('[data-portal-home]')).toBeVisible()
      await page.goForward()
      await expect(page).toHaveURL(/\/web\/getting-started\//)
      expect(requests.filter((url) => registry.test(url))).toHaveLength(0)
      expect(errors).toEqual([])
    }
  )
}

test('does not fetch routes for hash, external, download or new-tab links', async ({
  page,
}) => {
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  await page.goto('/web/components/button/demos/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  await page.evaluate(() => {
    for (const [href, attributes] of [
      ['#example', {}],
      ['https://example.com/', {}],
      ['/web/getting-started/', { rel: 'nofollow external' }],
      ['/web/getting-started/', { download: 'guide' }],
      ['/web/getting-started/', { target: '_blank' }],
    ] as const) {
      const link = document.createElement('a')
      link.href = href
      Object.entries(attributes).forEach(([name, value]) =>
        link.setAttribute(name, value)
      )
      document.body.appendChild(link)
      link.dispatchEvent(new Event('pointerover', { bubbles: true }))
      link.focus()
      link.remove()
    }
  })
  expect(requests.filter((url) => registry.test(url))).toEqual([])
})

test('keeps the page usable when speculative route loading fails', async ({
  page,
}) => {
  await page.route(/route-hints-.*[.]json/, async (route) => {
    const response = await route.fetch()
    const data = await response.json()
    delete data.links[
      '/web/components/card/visual-tests/action-with-nested-card'
    ]
    await route.fulfill({ json: data })
  })
  await page.goto('/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production route splitting')
  let documentLoads = 0
  page.on('request', (request) => {
    if (request.resourceType() === 'document') {
      documentLoads++
    }
  })
  await page.evaluate(() => {
    const link = document.createElement('a')
    link.href =
      '/web/components/card/visual-tests/action-with-nested-card/'
    link.textContent = 'Deferred route test'
    document.body.appendChild(link)
  })
  await page.route(registry, (route) => route.abort())
  const failed = page.waitForEvent('requestfailed', (request) =>
    registry.test(request.url())
  )
  const link = page.getByRole('link', {
    name: 'Deferred route test',
    exact: true,
  })
  await link.dispatchEvent('pointerover')
  await failed
  await page.waitForTimeout(500)
  expect(documentLoads).toBe(0)
  await expect(page.locator('[data-portal-home]')).toBeVisible()
  await page.unroute(registry)
  await link.evaluate((element: HTMLAnchorElement) => element.click())
  await expect(page).toHaveURL(/action-with-nested-card/)
  await expect(page.locator('.dnb-card').first()).toBeVisible()
})
