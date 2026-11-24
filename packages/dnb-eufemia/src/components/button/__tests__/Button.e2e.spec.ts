import { test, expect } from '@playwright/test'

test('keeps hover off after touch and keyboard use until the mouse moves', async ({
  page,
}) => {
  await page.goto('/uilib/components/button/demos/?data-visual-test')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const button = page.locator(
    'button[data-visual-test="button-secondary"]'
  )
  const background = () =>
    button.evaluate((element) => getComputedStyle(element).backgroundColor)
  const rest = await background()

  expect(
    await page.evaluate(() => matchMedia('(hover: hover)').matches)
  ).toBe(true)
  await button.hover()
  await expect.poll(background).not.toBe(rest)

  // Keep native :hover while changing input, as a hybrid device can do.
  await button.dispatchEvent('pointerdown', { pointerType: 'touch' })
  await expect.poll(background).toBe(rest)
  await page.keyboard.press('a')
  await expect(page.locator('html')).toHaveAttribute(
    'data-whatintent',
    'keyboard'
  )
  expect(
    await button.evaluate((element) => element.matches(':hover'))
  ).toBe(true)
  await expect.poll(background).toBe(rest)

  await page.clock.install()
  await page.clock.fastForward(250)
  await page.mouse.move(0, 0)
  await button.hover()
  await expect(page.locator('html')).toHaveAttribute(
    'data-whatintent',
    'mouse'
  )
  await expect.poll(background).not.toBe(rest)
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

      const focusOutline = () =>
        button.evaluate(
          (element, pseudo) => {
            const style = getComputedStyle(element, pseudo)
            return {
              style: style.outlineStyle,
              width: style.outlineWidth,
              offset: style.outlineOffset,
            }
          },
          variant === 'tertiary' ? '::before' : null
        )

      expect(await focusOutline()).toEqual({
        style: 'solid',
        width: '3px',
        offset: '2px',
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

      expect(await focusOutline()).toEqual({
        style: 'solid',
        width: '3px',
        offset: '2px',
      })
    })
  }
}
