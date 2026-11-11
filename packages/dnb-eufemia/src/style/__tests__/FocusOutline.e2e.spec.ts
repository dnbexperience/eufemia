import { test, expect } from '@playwright/test'

test('focus outlines preserve content colors and respect layout hover', async ({
  page,
}) => {
  await page.goto('/web/accessibility/focus/#keyboard-focus-styling')

  const examples = page.locator('[data-visual-test="focus-examples"]')
  const action = examples.getByRole('button', { name: 'Action with gap' })
  const layout = examples.getByRole('button', {
    name: 'Layout without gap',
  })
  await expect(action).toBeVisible()

  const original = await action.evaluate((element) => {
    const style = getComputedStyle(element)
    return {
      color: style.color,
      backgroundColor: style.backgroundColor,
      boxShadow: style.boxShadow,
    }
  })

  await test.step('keyboard focus uses the blue 2px outline and 2px gap', async () => {
    await action.focus()
    await page.keyboard.press('Tab')
    await expect(layout).toBeFocused()
    await page.keyboard.press('Shift+Tab')
    await expect(action).toBeFocused()
    await expect(action).toHaveCSS('outline-style', 'solid')
    await expect(action).toHaveCSS('outline-width', '2px')
    await expect(action).toHaveCSS('outline-offset', '2px')

    const focusColor = await action.evaluate((element) => {
      const probe = document.createElement('span')
      probe.style.color = 'var(--token-color-stroke-action-focus)'
      element.append(probe)
      const color = getComputedStyle(probe).color
      probe.remove()
      return color
    })
    await expect(action).toHaveCSS('outline-color', focusColor)
    await expect(action).toHaveCSS('color', original.color)
    await expect(action).toHaveCSS(
      'background-color',
      original.backgroundColor
    )
    await expect(action).toHaveCSS('box-shadow', original.boxShadow)
  })

  await test.step('layout focus has no gap and yields to hover', async () => {
    await page.keyboard.press('Tab')
    await expect(layout).toBeFocused()
    await expect(layout).toHaveCSS('outline-width', '2px')
    await expect(layout).toHaveCSS('border-top-width', '1px')
    await expect(layout).toHaveCSS('outline-offset', '-1px')
    const focusColor = await layout.evaluate(
      (element) => getComputedStyle(element).outlineColor
    )
    await expect(layout).toHaveCSS('border-top-color', focusColor)

    await layout.hover()
    await expect(layout).toBeFocused()
    await expect(layout).not.toHaveCSS('outline-color', focusColor)
    const hoverColor = await layout.evaluate(
      (element) => getComputedStyle(element).borderTopColor
    )
    await expect(layout).toHaveCSS('outline-color', hoverColor)

    await page.mouse.move(0, 0)
    await expect(layout).toHaveCSS('outline-color', focusColor)
    await expect(layout).toHaveCSS('border-top-color', focusColor)
  })

  await test.step('native outline remains visible in forced colors', async () => {
    await page.emulateMedia({ forcedColors: 'active' })
    await page.keyboard.press('Shift+Tab')
    await expect(action).toBeFocused()
    await expect(action).toHaveCSS('outline-style', 'solid')
    await expect(action).toHaveCSS('outline-width', '2px')
    await expect(action).not.toHaveCSS('outline-color', 'rgba(0, 0, 0, 0)')
  })
})
