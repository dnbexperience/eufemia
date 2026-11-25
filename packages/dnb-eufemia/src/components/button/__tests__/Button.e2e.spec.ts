import { test, expect } from '@playwright/test'

test('ARIA disabled buttons keep their background and underline on hover and press', async ({
  page,
}) => {
  await page.goto(
    '/web/components/button/demos/?data-visual-test&eufemia-theme=ui'
  )
  await page.addStyleTag({
    content: '.dnb-button, .dnb-button * { transition: none !important; }',
  })

  for (const variant of ['primary', 'tertiary']) {
    await test.step(variant, async () => {
      const button = page.locator(
        `button[data-visual-test="button-${variant}"]`
      )
      await button.evaluate((element) => {
        element.setAttribute('aria-disabled', 'true')
      })
      await page.mouse.move(0, 0)

      const appearance = () =>
        button.evaluate((element) => {
          const text = element.querySelector('.dnb-button__text')
          if (!text) {
            throw new Error('Button text is missing')
          }

          return {
            background: getComputedStyle(element).backgroundColor,
            underline: getComputedStyle(text).textDecoration,
          }
        })
      const disabled = await appearance()

      await button.hover()
      expect(
        await button.evaluate((element) => element.matches(':hover'))
      ).toBe(true)
      expect(await appearance()).toEqual(disabled)

      await page.mouse.down()
      expect(
        await button.evaluate((element) => element.matches(':active'))
      ).toBe(true)
      expect(await appearance()).toEqual(disabled)
      await page.mouse.up()

      await button.evaluate((element) => {
        element.setAttribute('aria-disabled', 'false')
      })
      expect(await appearance()).not.toEqual(disabled)
      await page.mouse.down()
      expect(await appearance()).not.toEqual(disabled)
      await page.mouse.up()
    })
  }
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
