import { test, expect } from '@playwright/test'

test('keeps the indeterminate linear bar visible when reduced motion is requested', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/progress-indicator/demos/')

  const track = page
    .locator(
      '.dnb-progress-indicator__linear:has(.dnb-progress-indicator__linear__bar1-animation)'
    )
    .first()
  await expect(track).toBeVisible()

  const [trackWidth, ...barWidths] = await track.evaluate((element) =>
    [
      element,
      ...element.querySelectorAll('.dnb-progress-indicator__linear__bar'),
    ].map((node) => node.getBoundingClientRect().width)
  )

  expect(trackWidth).toBeGreaterThan(0)
  expect(barWidths).toEqual([trackWidth, trackWidth])
})
