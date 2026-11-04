import { test, expect } from '@playwright/test'

for (const path of [
  '/uilib/components/button/demos/',
  '/uilib/components/card/',
]) {
  test(
    'keeps the title, tabs and article before the desktop outline on ' +
      path,
    async ({ page, browserName }) => {
      await page.setViewportSize({ width: 1440, height: 900 })
      await page.goto(path)
      await expect(page.locator('html')).toHaveAttribute(
        'data-portal-ready',
        'true'
      )
      const main = page.locator('main')
      const content = page.locator('[data-portal-page-content]')
      const toc = page.locator('#content-grid-sidebar')
      const precedesOutline = () =>
        content.evaluate((element) =>
          Boolean(
            element.compareDocumentPosition(
              document.getElementById('content-grid-sidebar')
            ) & Node.DOCUMENT_POSITION_FOLLOWING
          )
        )
      expect(await precedesOutline()).toBe(true)
      await page.locator('.dnb-skip-link').focus()
      await page.keyboard.press('Enter')
      await expect(main).toBeFocused()
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )
      await expect(page.locator('main h1 .anchor-hash')).toBeFocused()
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )
      await expect(page.getByRole('tablist')).toBeFocused()
      const originalContent = await content.elementHandle()
      const originalToc = await toc.elementHandle()
      await page.setViewportSize({ width: 390, height: 900 })
      await expect.poll(precedesOutline).toBe(false)
      expect(
        await content.evaluate(
          (element, original) => element === original,
          originalContent
        )
      ).toBe(true)
      expect(
        await toc.evaluate(
          (element, original) => element === original,
          originalToc
        )
      ).toBe(true)
      expect((await toc.boundingBox()).y).toBeLessThan(
        (await content.boundingBox()).y
      )
      await page.setViewportSize({ width: 1440, height: 900 })
      await expect.poll(precedesOutline).toBe(true)
      expect(
        await content.evaluate(
          (element, original) => element === original,
          originalContent
        )
      ).toBe(true)
      await expect(page.locator('#portal-page-toc')).toHaveCount(1)
      await expect(page.locator('#portal-toc-data')).toHaveCount(1)
    }
  )
}

test('keeps the shared native scrollbar sizing for the Portal outline', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/uilib/extensions/forms/changelog/')
  await expect(
    page.locator('#portal-page-toc .dnb-table-of-content__scroll')
  ).toHaveCSS('--scrollbar-track-width', /^0?\.5rem$/)
})
