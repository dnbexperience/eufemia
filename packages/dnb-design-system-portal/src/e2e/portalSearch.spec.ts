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
