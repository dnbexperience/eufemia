import { test, expect } from '@playwright/test'

test('keeps pending dots visible without motion and in forced colors', async ({
  page,
}) => {
  await page.goto('/uilib/components/button/demos/?data-visual-test')
  const pending = page.locator('[data-visual-test="button-pending"]')
  const dots = pending.locator('.dnb-button__indicator-content b')
  await expect(dots).toHaveCount(12)
  await expect(dots.first()).toHaveCSS(
    'animation-name',
    'dnb-dots-indicator-dot'
  )
  await page.emulateMedia({
    reducedMotion: 'reduce',
    forcedColors: 'active',
  })
  for (const dot of await dots.all()) {
    await expect(dot).toHaveCSS('animation-name', 'none')
    await expect(dot).toHaveCSS('opacity', '0.6')
    await expect(dot).toHaveCSS('transform', 'none')
    await expect(dot).toHaveCSS('forced-color-adjust', 'none')
    expect(
      await dot.evaluate((el) => {
        const style = getComputedStyle(el)
        return (
          style.backgroundColor === style.color &&
          style.backgroundColor !==
            getComputedStyle(el.closest('.dnb-button')).backgroundColor
        )
      })
    ).toBe(true)
  }
  const iconButton = pending.getByRole('button', { name: 'Refresh' })
  await expect(iconButton).toHaveAccessibleName('Refresh')
  await expect(iconButton.locator('.dnb-button__icon')).toHaveCSS(
    'opacity',
    '0'
  )
  const bounds = await iconButton.boundingBox()
  const indicator = await iconButton
    .locator('.dnb-button__indicator')
    .boundingBox()
  expect(indicator.x).toBeGreaterThanOrEqual(bounds.x)
  expect(indicator.x + indicator.width).toBeLessThanOrEqual(
    bounds.x + bounds.width
  )
})

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
