import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const reducedMotion of ['reduce', 'no-preference'] as const) {
  test(
    'drops controls only on client navigation with motion ' +
      reducedMotion,
    async ({ page }) => {
      await page.clock.install()
      await page.emulateMedia({ reducedMotion })
      await page.setViewportSize({ width: 1440, height: 1000 })
      await page.goto('/')
      await waitForApp(page)
      const items = page.locator('[data-hanging-item]')
      const lifts = () =>
        items.evaluateAll((items) =>
          items.map(
            (item) =>
              parseFloat(
                (item as HTMLElement).style.getPropertyValue('--lift-y')
              ) || 0
          )
        )
      expect(await lifts()).toEqual([0, 0, 0, 0, 0, 0])
      await page
        .getByRole('navigation', { name: 'Get started' })
        .getByRole('link', { name: /Develop/ })
        .click()
      await expect(page).toHaveURL('/web/getting-started/')
      await page
        .locator('#portal-sidebar-menu')
        .getByRole('link', { name: 'Go to Eufemia home', exact: true })
        .click()
      await expect(items).toHaveCount(6)
      await expect(
        items.first().locator('[data-home-specimen]')
      ).toBeVisible()
      if (reducedMotion === 'reduce') {
        expect(await lifts()).toEqual([0, 0, 0, 0, 0, 0])
      } else {
        expect((await lifts()).every((lift) => lift < -24)).toBe(true)
        const before = await lifts()
        await page.clock.runFor(64)
        const after = await lifts()
        expect(after[0]).toBeGreaterThan(before[0])
        expect(after[5]).toBe(before[5])
        await page.clock.runFor(4000)
        expect(await lifts()).toEqual([0, 0, 0, 0, 0, 0])
      }
      await page.reload()
      await waitForApp(page)
      expect(await lifts()).toEqual([0, 0, 0, 0, 0, 0])
    }
  )
}
