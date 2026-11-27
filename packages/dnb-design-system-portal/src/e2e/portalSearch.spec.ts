import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.use({ trace: 'retain-on-failure', screenshot: 'only-on-failure' })

test.beforeEach(async ({ page }) => {
  const hits = [
    { title: 'Date picker', hash: 'date-picker' },
    { title: 'Translations', hash: 'translations' },
    { title: 'Shortcuts', hash: 'shortcuts' },
  ].map((section) => ({
    ...section,
    objectID: section.hash,
    slug: 'web/components/date-picker/properties',
    pageTitle: 'Date picker',
    _snippetResult: {
      content: {
        value: 'Custom update behavior described in the section body.',
      },
    },
  }))
  await page.route(/(?:algolia(net)?\.(net|com)\/|\/_search\?)/, (route) =>
    route.fulfill({ json: { hits } })
  )
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/web/components/overview/')
  await waitForApp(page)
})

test('keeps search and settings right aligned while search expands', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  const search = page.locator('header.sticky-menu .portal-search')
  const portalTools = page.locator('header.sticky-menu #portal-tools')

  for (const width of [1440, 1200, 1121, 1120, 800, 640, 375]) {
    await test.step(`aligns collapsed and focused search at ${width}px`, async () => {
      await page.setViewportSize({ width, height: 800 })
      for (const focused of [false, true]) {
        if (focused) {
          await search.locator('input').focus()
        } else {
          await page.locator('h1').click()
        }
        await expect(search).toBeVisible()
        await expect
          .poll(async () =>
            portalTools.evaluate((element) => {
              const padding = innerWidth > 960 ? 32 : 16
              return Math.abs(
                document.documentElement.clientWidth -
                  padding -
                  element.getBoundingClientRect().right
              )
            })
          )
          .toBeLessThan(1)
        const gap = await portalTools.evaluate((element) => {
          const search = document.querySelector('header .portal-search')
          return (
            element.getBoundingClientRect().left -
            search.getBoundingClientRect().right
          )
        })
        expect(gap).toBeCloseTo(8, 0)

        if (focused) {
          const input = search.locator('input')
          const before = await search.boundingBox()
          for (const value of ['b', 'button', '']) {
            await input.fill(value)
            await page.evaluate(
              () =>
                new Promise<void>((resolve) => {
                  requestAnimationFrame(() =>
                    requestAnimationFrame(() => resolve())
                  )
                })
            )
            const after = await search.boundingBox()
            expect(after.width).toBeCloseTo(before.width, 0)
            expect(after.x).toBeCloseTo(before.x, 0)
          }
        }
      }
    })
  }
})

test('keeps header and hero results aligned across screen sizes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const [id, url, widths] of [
    ['portal-search', '/web/components/overview/', [375, 640, 641, 1440]],
    ['portal-home-search', '/', [375, 639, 641, 1440]],
  ] as const) {
    await page.goto(url)
    await waitForApp(page)
    await page.evaluate(() => document.fonts.ready)
    const input = page.locator(`#${id}`)
    const search = page.locator('.portal-search').filter({ has: input })
    const results = page.locator(`#${id}-ul`)
    const panel = page.locator('.dnb-search__panel:visible')

    for (const width of widths) {
      await test.step(`${id} at ${width}px`, async () => {
        await page.setViewportSize({ width, height: 800 })
        await input.fill('')
        await input.focus()
        await input.fill('date')
        await expect(results.getByRole('option')).toHaveCount(3)

        await expect
          .poll(async () => (await panel.boundingBox()).width)
          .toBeCloseTo(Math.min(512, width - 32), 0)
        const box = await panel.boundingBox()
        const inputBox = await search.boundingBox()
        expect(box.x).toBeGreaterThanOrEqual(15)
        expect(box.x + box.width).toBeLessThanOrEqual(width - 15)
        const alignedX =
          id === 'portal-search'
            ? inputBox.x + inputBox.width - box.width
            : inputBox.x
        expect(box.x).toBeCloseTo(
          Math.max(16, Math.min(alignedX, width - box.width - 16)),
          0
        )
        for (const delta of [64, -64]) {
          await page.evaluate((delta) => window.scrollBy(0, delta), delta)
          await expect
            .poll(async () => {
              const resultsBox = await panel.boundingBox()
              const field = await input.boundingBox()
              return Math.min(
                Math.abs(resultsBox.y - field.y - field.height - 8),
                Math.abs(field.y - resultsBox.y - resultsBox.height - 8)
              )
            })
            .toBeLessThan(1)
        }
        await input.press('Escape')
      })
    }
  }

  await test.step('shows a complete result below the hero input in a short mobile viewport', async () => {
    await page.route(
      /(?:algolia(net)?\.(net|com)\/|\/_search\?)/,
      (route) =>
        route.fulfill({
          json: {
            hits: [1, 2, 3].map((index) => ({
              objectID: String(index),
              title: `Button ${index}`,
              hash: `button-${index}`,
              slug: 'web/components/button',
              pageTitle: 'Button',
            })),
          },
        })
    )
    const input = page.locator('#portal-home-search')
    for (const width of [390, 320]) {
      await page.setViewportSize({ width, height: 495 })
      await input.evaluate((element) => {
        window.scrollTo(
          0,
          element.getBoundingClientRect().top + window.scrollY - 240
        )
      })
      await input.fill('butto')
      const options = page.getByRole('option')
      await expect(options).toHaveCount(3)
      await expect(options.first()).toBeInViewport({ ratio: 1 })
      await input.press('Escape')
      await input.fill('')
    }
  })
})

test('opens the third section with the keyboard and focuses its anchor', async ({
  page,
}) => {
  await page.addStyleTag({
    content:
      'code { font-family: DNBMono, Arial, sans-serif !important; }',
  })
  await page.evaluate(() => {
    document.fonts.forEach((font) => {
      font.display = 'swap'
    })
  })
  let releaseFonts: () => void
  const fontsReleased = new Promise<void>((resolve) => {
    releaseFonts = resolve
  })
  await page.route(/DNBSansMono.*\.woff2?(?:\?|$)/i, async (route) => {
    await fontsReleased
    await route.continue()
  })

  const input = page.locator('#portal-search')
  await input.fill('custom update')
  const options = page.getByRole('option')
  await expect(options).toHaveCount(3)
  await expect(options.nth(2)).toContainText('Custom update behavior')
  await expect(options.locator('a, button')).toHaveCount(0)
  for (let index = 0; index < 3; index++) {
    await input.press('ArrowDown')
  }
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'option-portal-search-2'
  )
  await input.press('Enter')
  await expect(page).toHaveURL(
    '/web/components/date-picker/properties/#shortcuts'
  )
  const heading = page
    .locator('main h2')
    .filter({ has: page.locator('#shortcuts') })
  await heading.waitFor()
  await page.waitForFunction(() => document.fonts.status === 'loading')
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => resolve())
      )
  )
  releaseFonts()
  await page.evaluate(() => document.fonts.ready)
  await expect(heading).toBeInViewport()
  await expect(heading).toBeFocused()

  await test.step('focuses the section again when it is already open', async () => {
    await input.fill('custom update again')
    await expect(options).toHaveCount(3)
    await options.nth(2).click()
    await expect(heading).toBeFocused()
    await expect(heading).toBeInViewport()
    await expect(options).toHaveCount(0)
  })
})

test('clears sections and tabs out of results without scrolling the page', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.evaluate(() => window.scrollTo(0, 208))
  const input = page.locator('#portal-search')
  await input.fill('custom update')
  await expect(page.getByRole('option')).toHaveCount(3)
  const scrollY = await page.evaluate(() => window.scrollY)
  await input.press('Tab')
  const clear = page.locator('header .dnb-input--clear button')
  await expect(clear).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY)
  await clear.press('Tab')
  const web = page.getByRole('radio', { name: 'Web', exact: true })
  await expect(web).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY)
  await web.press('Tab')
  const close = page.locator('.dnb-search__panel .dnb-popover__close')
  await expect(close).toBeFocused()
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY)
  await close.press('Tab')
  await expect(page.locator('#portal-tools')).toBeFocused()
  await expect(page.getByRole('option')).toHaveCount(0)
  expect(await page.evaluate(() => window.scrollY)).toBe(scrollY)
  await input.focus()
  await input.fill('custom update')
  await expect(page.getByRole('option')).toHaveCount(3)
  await clear.click()
  await expect(input).toHaveValue('')
  await expect(page.getByRole('option')).toHaveCount(0)
})

test('switches platforms with the keyboard and keeps chips available with no results', async ({
  page,
}) => {
  const requests: string[] = []
  await page.route(
    /(?:algolia(net)?\.(net|com)\/|\/_search\?)/,
    (route) => {
      const request = route.request()
      const params = new URL(request.url()).searchParams
      const platform =
        params.get('platform') ??
        JSON.parse(request.postData()).filters.split(':')[1]
      requests.push(platform)
      return route.fulfill({
        json: {
          hits:
            platform === 'ios'
              ? []
              : [
                  {
                    objectID: platform,
                    slug: `${platform}/components/button`,
                    title: `${platform} button`,
                  },
                ],
        },
      })
    }
  )
  const input = page.locator('#portal-search')
  await input.fill('button')
  await expect(page.getByRole('option')).toHaveText('web button')
  await expect.poll(() => requests.at(-1)).toBe('web')
  const web = page.getByRole('radio', { name: 'Web', exact: true })
  const ios = page.getByRole('radio', { name: 'iOS', exact: true })
  const android = page.getByRole('radio', {
    name: 'Android',
    exact: true,
  })
  await expect(web).toBeChecked()
  await input.press('ArrowDown')
  await expect(input).toBeFocused()
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'option-portal-search-0'
  )
  await expect(web).toBeChecked()
  await input.press('Tab')
  const clear = page.locator('header .dnb-input--clear button')
  await expect(clear).toBeFocused()
  await clear.press('Tab')
  await expect(web).toBeFocused()
  await web.press('ArrowDown')
  await expect(ios).toBeFocused()
  await expect(ios).toBeChecked()
  await expect.poll(() => requests.at(-1)).toBe('ios')
  await expect(page.locator('[data-item="noOptions"]')).toBeVisible()
  await ios.press('ArrowRight')
  await expect(android).toBeFocused()
  await expect(android).toBeChecked()
  await expect.poll(() => requests.at(-1)).toBe('android')
  await expect(page.getByRole('option')).toHaveText('android button')
  await expect(android).toBeFocused()
  await android.press('ArrowUp')
  await expect(ios).toBeFocused()
  await expect(ios).toBeChecked()
  await expect(page.locator('[data-item="noOptions"]')).toBeVisible()
  await ios.press('ArrowLeft')
  await expect(web).toBeFocused()
  await expect(web).toBeChecked()
  await expect(page.getByRole('option')).toHaveText('web button')
  await web.press('Tab')
  const close = page.locator('.dnb-search__panel .dnb-popover__close')
  await expect(close).toBeFocused()
  await close.press('Shift+Tab')
  await expect(web).toBeFocused()
  await web.press('Shift+Tab')
  await expect(clear).toBeFocused()
  await clear.press('Shift+Tab')
  await expect(input).toBeFocused()
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute(
    'aria-activedescendant',
    'option-portal-search-0'
  )
  await expect(web).toBeChecked()
  await expect(input).toHaveValue('button')
  expect([...new Set(requests)]).toEqual(['web', 'ios', 'android'])
})
