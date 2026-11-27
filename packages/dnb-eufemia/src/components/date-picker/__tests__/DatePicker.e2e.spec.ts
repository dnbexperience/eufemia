import { expect, test, type Locator, type Page } from '@playwright/test'

const getCalendar = (page: Page) =>
  page
    .locator('.dnb-date-picker--inline')
    .filter({ has: page.locator('td[data-date="2019-06-05"]') })
    .locator('table')
    .first()

const getDay = (calendar: Locator, day: number) =>
  calendar.locator(
    `td[data-date="2019-05-${String(day).padStart(2, '0')}"]`
  )

const selectRange = async (
  page: Page,
  calendar: Locator,
  start: number,
  end: number
) => {
  await getDay(calendar, start).locator('button').click()
  await getDay(calendar, end).locator('button').click()
  await expect(getDay(calendar, start)).toHaveAttribute(
    'aria-selected',
    'true'
  )
  await expect(getDay(calendar, end)).toHaveAttribute(
    'aria-selected',
    'true'
  )
  await page.mouse.move(0, 0)
  await page.evaluate(() =>
    (document.activeElement as HTMLElement)?.blur()
  )
}

const screenshotDay = (calendar: Locator, day: number) =>
  getDay(calendar, day).screenshot({ animations: 'disabled' })

const getColors = (calendar: Locator, day: number) =>
  getDay(calendar, day)
    .locator('button')
    .evaluate((element) => {
      const style = getComputedStyle(element)
      return {
        outline: style.outlineColor,
        background: style.backgroundColor,
        border: style.borderColor,
        color: style.color,
      }
    })

for (const colorScheme of ['light', 'dark'] as const) {
  test(`selected dates stay visible in forced colors (${colorScheme} palette)`, async ({
    page,
    browserName,
  }) => {
    test.skip(
      browserName === 'webkit',
      'WebKit does not support forced colors emulation.'
    )
    await page.emulateMedia({
      forcedColors: 'active',
      colorScheme,
      reducedMotion: 'reduce',
    })
    await page.goto('/web/components/date-picker/demos/?fullscreen')
    const calendar = getCalendar(page)
    await calendar.scrollIntoViewIfNeeded()
    await expect(getDay(calendar, 15)).toBeVisible()

    // Compare the same date in each state, so that only the state differs
    await selectRange(page, calendar, 21, 26)
    const unselected = await screenshotDay(calendar, 15)

    await selectRange(page, calendar, 10, 20)
    const withinRange = await screenshotDay(calendar, 15)

    await selectRange(page, calendar, 15, 20)
    const startDate = await screenshotDay(calendar, 15)

    await selectRange(page, calendar, 10, 15)
    const endDate = await screenshotDay(calendar, 15)
    const endDateColors = await getColors(calendar, 15)
    await getDay(calendar, 15).locator('button').hover()
    const hoveredEndDateColors = await getColors(calendar, 15)
    await page.mouse.move(0, 0)

    expect(withinRange.equals(unselected)).toBe(false)
    expect(startDate.equals(unselected)).toBe(false)
    expect(startDate.equals(withinRange)).toBe(false)
    expect(endDate.equals(unselected)).toBe(false)
    expect(endDate.equals(withinRange)).toBe(false)
    // The hover state must keep the selected colors
    expect(hoveredEndDateColors.background).toBe(endDateColors.background)
    expect(hoveredEndDateColors.color).toBe(endDateColors.color)

    // The focus outline must not have the color that shows the selection
    const focusDay = async (target: number) => {
      const focused = await calendar.evaluate((element) =>
        element.contains(document.activeElement)
          ? document.activeElement.closest('td')?.getAttribute('data-date')
          : null
      )
      expect(focused).toMatch(/^2019-05-\d{2}$/)
      const steps = target - Number(focused.slice(-2))
      for (let step = 0; step < Math.abs(steps); step++) {
        await page.keyboard.press(steps > 0 ? 'ArrowRight' : 'ArrowLeft')
      }
      await expect(
        getDay(calendar, target).locator('button')
      ).toBeFocused()
    }

    await calendar.focus()
    await page.keyboard.press('ArrowRight')

    await focusDay(15)
    await expect
      .poll(async () => {
        const { outline, background } = await getColors(calendar, 15)
        return outline !== background
      })
      .toBe(true)

    await focusDay(12)
    const { border: withinRangeColor } = await getColors(calendar, 12)
    await expect
      .poll(async () => (await getColors(calendar, 12)).outline)
      .not.toBe(withinRangeColor)

    await focusDay(17)
    await expect
      .poll(async () => (await getColors(calendar, 17)).outline)
      .not.toBe(withinRangeColor)
  })
}
