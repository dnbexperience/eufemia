import { expect, test, type Locator } from '@playwright/test'

const edge = (row: Locator) =>
  row.evaluate((element) => {
    const { borderTopColor, borderTopWidth } = getComputedStyle(
      element,
      '::after'
    )
    return `${borderTopWidth} ${borderTopColor}`
  })

const hasFocus = (row: Locator) =>
  row
    .locator('input')
    .evaluate((element) => element === document.activeElement)

// After a checkbox click, the intent stays "mouse" while arrow keys move
// focus. The row under the resting mouse must still show the focus.
test('shows the focus outline when arrow keys move focus to the row under the mouse', async ({
  page,
}) => {
  await page.addInitScript(() => {
    window['IS_TEST'] = true
  })
  await page.goto('/web/forms/base-fields/MultiSelection/demos/')
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute('data-portal-ready')
  )

  await page
    .locator(
      '[data-visual-test="multi-selection-basic"] .dnb-dropdown__trigger'
    )
    .click()

  const row = (title: string) =>
    page
      .locator(
        '.dnb-forms-field-multi-selection__popover-content .dnb-forms-field-multi-selection__item'
      )
      .filter({ hasText: title })
  const oslo = row('Oslo')
  const stockholm = row('Stockholm')
  const copenhagen = row('Copenhagen')
  await expect(copenhagen).toBeVisible()

  const box = await stockholm.boundingBox()
  const parkX = box.x + box.width / 2
  const parkY = box.y + box.height / 2

  await oslo.click({ position: { x: 30, y: 20 } })
  await page.mouse.move(parkX, parkY, { steps: 4 })

  const hoverEdge = await edge(stockholm)
  const restEdge = await edge(copenhagen)

  await test.step('the mouse shows the hover edge', async () => {
    expect(await hasFocus(oslo)).toBe(true)
    expect(hoverEdge).not.toBe(restEdge)
  })

  const beforeArrow = await stockholm.screenshot()

  await page.keyboard.press('ArrowDown')

  await test.step('ArrowDown focuses the row under the mouse', async () => {
    expect(await hasFocus(stockholm)).toBe(true)
    await expect.poll(() => edge(stockholm)).not.toBe(hoverEdge)
    expect(await edge(stockholm)).not.toBe(restEdge)
    expect(await stockholm.screenshot()).not.toEqual(beforeArrow)
  })

  const focusEdge = await edge(stockholm)

  await test.step('ArrowDown and ArrowUp return to the same edge', async () => {
    await page.keyboard.press('ArrowDown')
    expect(await hasFocus(copenhagen)).toBe(true)
    expect(await edge(copenhagen)).toBe(focusEdge)

    await page.keyboard.press('ArrowUp')
    expect(await hasFocus(stockholm)).toBe(true)
    expect(await edge(stockholm)).toBe(focusEdge)
  })

  await test.step('Space toggles the focused row', async () => {
    await page.keyboard.press('Space')
    await expect(stockholm.locator('input')).toBeChecked()
    expect(await edge(stockholm)).toBe(focusEdge)
  })

  await test.step('moving the mouse shows the hover edge again', async () => {
    await page.mouse.move(parkX + 20, parkY, { steps: 2 })
    await expect.poll(() => edge(stockholm)).toBe(hoverEdge)
    expect(await hasFocus(stockholm)).toBe(true)
  })
})
