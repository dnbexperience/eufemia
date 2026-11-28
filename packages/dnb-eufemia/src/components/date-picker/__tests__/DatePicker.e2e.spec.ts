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

// A strip inside the left edge of the button, where the ring of the dates
// in a range is painted, but not the thin outline of every date
const screenshotRingEdge = async (
  page: Page,
  calendar: Locator,
  day: number
) => {
  const box = await getDay(calendar, day).locator('button').boundingBox()
  return page.screenshot({
    clip: {
      x: Math.round(box.x) + 1,
      y: Math.round(box.y + box.height / 2) - 4,
      width: 2,
      height: 8,
    },
    animations: 'disabled',
  })
}

// Returns the largest color difference inside the box of the number. It is
// zero when the number is not painted, or when it has the color of the
// background behind it, for example the backplate of forced colors mode.
const getNumberContrast = async (
  page: Page,
  calendar: Locator,
  day: number
) => {
  const box = await getDay(calendar, day)
    .locator('.dnb-button__text')
    .evaluate((element) => {
      const range = document.createRange()
      range.selectNodeContents(element)
      const { x, y, width, height } = range.getBoundingClientRect()
      return { x, y, width, height }
    })
  // Leave out the anti-aliased edges of the box
  const clip = {
    x: Math.ceil(box.x) + 1,
    y: Math.ceil(box.y) + 1,
    width: Math.floor(box.width) - 2,
    height: Math.floor(box.height) - 2,
  }
  const image = await page.screenshot({ clip, animations: 'disabled' })
  return page.evaluate(async (source) => {
    const img = new Image()
    img.src = 'data:image/png;base64,' + source
    await img.decode()
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    const context = canvas.getContext('2d')
    context.drawImage(img, 0, 0)
    const { data } = context.getImageData(0, 0, img.width, img.height)
    let max = 0
    for (let i = 4; i < data.length; i += 4) {
      for (let channel = 0; channel < 3; channel++) {
        max = Math.max(max, Math.abs(data[i + channel] - data[channel]))
      }
    }
    return max
  }, image.toString('base64'))
}

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
    const unselectedEdge = await screenshotRingEdge(page, calendar, 15)
    const unselectedSize = await getDay(calendar, 15)
      .locator('button')
      .boundingBox()

    await selectRange(page, calendar, 10, 20)
    const withinRange = await screenshotDay(calendar, 15)
    const withinRangeEdge = await screenshotRingEdge(page, calendar, 15)
    const withinRangeSize = await getDay(calendar, 15)
      .locator('button')
      .boundingBox()

    await selectRange(page, calendar, 15, 20)
    const startDate = await screenshotDay(calendar, 15)

    await selectRange(page, calendar, 10, 15)
    const endDate = await screenshotDay(calendar, 15)
    const endDateColors = await getColors(calendar, 15)
    const startDateContrast = await getNumberContrast(page, calendar, 10)
    const endDateContrast = await getNumberContrast(page, calendar, 15)
    await getDay(calendar, 15).locator('button').hover()
    const hoveredEndDateColors = await getColors(calendar, 15)
    await page.mouse.move(0, 0)

    expect(withinRange.equals(unselected)).toBe(false)
    expect(withinRangeEdge.equals(unselectedEdge)).toBe(false)
    // The ring must not change the size of the round button
    expect(withinRangeSize).toEqual(unselectedSize)
    expect(startDate.equals(unselected)).toBe(false)
    expect(startDate.equals(withinRange)).toBe(false)
    expect(endDate.equals(unselected)).toBe(false)
    expect(endDate.equals(withinRange)).toBe(false)
    // The number must be readable on the selected dates
    expect(startDateContrast).toBeGreaterThan(127)
    expect(endDateContrast).toBeGreaterThan(127)
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

  test(`the today marker stays visible in forced colors (${colorScheme} palette)`, async ({
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
    const opener = page.locator(
      '[data-visual-test="date-picker-input"] button[aria-expanded]'
    )
    await opener.scrollIntoViewIfNeeded()
    await opener.click()
    // The second calendar can show a disabled copy of today at the start
    // of the next month
    const today = page.locator(
      'td.dnb-date-picker__day--today:not(.dnb-date-picker__day--outside-month) button'
    )
    await expect(today).toBeVisible()

    // The dot has the color of the number
    const getDotColors = () =>
      today.evaluate((element) => ({
        dot: getComputedStyle(element, '::after').backgroundColor,
        number: getComputedStyle(element).color,
      }))

    const unselected = await getDotColors()
    expect(unselected.dot).toBe(unselected.number)

    await today.click()
    await page.mouse.move(0, 0)
    await expect(today).toHaveAttribute('aria-current', 'date')
    const selected = await getDotColors()
    expect(selected.number).not.toBe(unselected.number)
    expect(selected.dot).toBe(selected.number)
  })
}
