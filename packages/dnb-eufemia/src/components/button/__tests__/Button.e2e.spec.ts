import { test, expect } from '@playwright/test'

for (const theme of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  for (const variant of ['primary', 'secondary', 'tertiary']) {
    test(`keeps ${variant} keyboard focus styles while hovered in ${theme}`, async ({
      page,
    }) => {
      await page.goto(
        `/uilib/components/button/demos/?data-visual-test&eufemia-theme=${theme}`
      )
      const button = page.locator(
        `button[data-visual-test="button-${variant}"]`
      )
      await expect(button).toBeVisible()
      await page.keyboard.press('Tab')
      await button.focus()

      const focusStyles = await button.evaluate((element) => {
        const style = getComputedStyle(element)
        return {
          'background-color': style.backgroundColor,
          color: style.color,
          'box-shadow': style.boxShadow,
        }
      })

      await button.hover()
      await page.keyboard.press('Shift')

      await expect(button).toBeFocused()
      expect(
        await button.evaluate((element) =>
          element.matches(':focus-visible')
        )
      ).toBe(true)
      expect(
        await button.evaluate((element) => element.matches(':hover'))
      ).toBe(true)

      for (const [property, value] of Object.entries(focusStyles)) {
        await expect(button).toHaveCSS(property, value)
      }
    })
  }
}
