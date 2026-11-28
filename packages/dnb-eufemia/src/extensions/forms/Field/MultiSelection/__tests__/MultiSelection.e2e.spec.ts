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

// The row must be the hovered element at the mouse position, so that a
// scroll cannot change its outline for another reason.
const isUnderMouse = (row: Locator, x: number, y: number) =>
  row.evaluate(
    (element, { x, y }) =>
      element.matches(':hover') &&
      element.contains(document.elementFromPoint(x, y)),
    { x, y }
  )

// The whole list fits at this height, so arrow keys do not scroll it
// away from the resting mouse.
test.use({ viewport: { width: 1280, height: 1200 } })

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

  await oslo.click({ position: { x: 30, y: 20 } })

  // The click can scroll the page, so hover and measure after it
  await stockholm.hover()
  const box = await stockholm.boundingBox()
  const mouseX = box.x + box.width / 2
  const mouseY = box.y + box.height / 2

  const hoverEdge = await edge(stockholm)
  const restEdge = await edge(copenhagen)

  await test.step('the mouse shows the hover edge', async () => {
    const list = page.locator(
      '.dnb-forms-field-multi-selection__popover-content .dnb-scroll-view'
    )
    await expect(list).toHaveCount(1)
    expect(
      await list.evaluate(
        (element) => element.scrollHeight <= element.clientHeight
      )
    ).toBe(true)
    expect(await hasFocus(oslo)).toBe(true)
    expect(await isUnderMouse(stockholm, mouseX, mouseY)).toBe(true)
    expect(hoverEdge).not.toBe(restEdge)
  })

  const beforeArrow = await stockholm.screenshot()

  await page.keyboard.press('ArrowDown')

  await test.step('ArrowDown focuses the row under the mouse', async () => {
    expect(await hasFocus(stockholm)).toBe(true)
    expect(await isUnderMouse(stockholm, mouseX, mouseY)).toBe(true)
  })

  const underMouseEdge = await edge(stockholm)

  await page.keyboard.press('ArrowDown')

  const focusEdge = await edge(copenhagen)

  await test.step('a focused row away from the mouse shows the focus edge', async () => {
    expect(await hasFocus(copenhagen)).toBe(true)
    expect(await copenhagen.evaluate((e) => e.matches(':hover'))).toBe(
      false
    )
    expect(focusEdge).not.toBe(restEdge)
    expect(focusEdge).not.toBe(hoverEdge)
  })

  await test.step('the row under the mouse shows the same focus edge', async () => {
    expect(underMouseEdge).toBe(focusEdge)

    await page.keyboard.press('ArrowUp')
    expect(await hasFocus(stockholm)).toBe(true)
    expect(await isUnderMouse(stockholm, mouseX, mouseY)).toBe(true)
    expect(await edge(stockholm)).toBe(focusEdge)
    expect(await stockholm.screenshot()).not.toEqual(beforeArrow)
  })

  await test.step('Space toggles the focused row', async () => {
    await page.keyboard.press('Space')
    await expect(stockholm.locator('input')).toBeChecked()
    expect(await edge(stockholm)).toBe(focusEdge)
  })

  await test.step('moving the mouse shows the hover edge again', async () => {
    await page.mouse.move(mouseX + 20, mouseY, { steps: 2 })
    expect(await isUnderMouse(stockholm, mouseX + 20, mouseY)).toBe(true)
    await expect.poll(() => edge(stockholm)).toBe(hoverEdge)
    expect(await hasFocus(stockholm)).toBe(true)
  })
})
