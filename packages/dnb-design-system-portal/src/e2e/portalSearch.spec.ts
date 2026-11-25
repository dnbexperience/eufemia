import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
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
  await page.route(/algolia(net)?\.(net|com)\//, (route) =>
    route.fulfill({
      json: {
        hits: [
          {
            objectID: 'date-picker',
            slug: 'web/components/date-picker',
            title: 'Date picker',
            description:
              'Use DatePicker when people need to choose one date or a date range.',
          },
        ],
        nbHits: 1,
        page: 0,
        nbPages: 1,
        hitsPerPage: 20,
        processingTimeMS: 1,
        query: 'date',
        params: '',
      },
    })
  )
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

    for (const width of widths) {
      await test.step(`${id} at ${width}px`, async () => {
        await page.setViewportSize({ width, height: 800 })
        await input.fill('')
        await input.focus()
        await input.fill('date')
        await expect(results.getByRole('option')).toHaveCount(1)

        const box = await results.boundingBox()
        const inputBox = await search.boundingBox()
        const fullWidth = id === 'portal-search' && width <= 640
        expect(box.x).toBeGreaterThanOrEqual(15)
        expect(box.x + box.width).toBeLessThanOrEqual(width - 15)
        expect(box.width).toBeCloseTo(
          fullWidth ? width - 32 : inputBox.width,
          0
        )
        expect(box.x).toBeCloseTo(fullWidth ? 16 : inputBox.x, 0)
        for (const delta of [64, -64]) {
          await page.evaluate((delta) => window.scrollBy(0, delta), delta)
          await expect
            .poll(async () => {
              const resultsBox = await results.boundingBox()
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
})
