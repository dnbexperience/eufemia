import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import sampleMotionPoints from './shared/sampleMotionPoints'

test.use({ browserName: 'webkit' })

test('WebKit morphs disclosure chevrons and line graph paths', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
  for (const [selector, before, after] of [
    [
      '.dnb-motion-scene__chevron',
      [-5, -2, 0, 3, 5, -2],
      [-5, 3, 0, -2, 5, 3],
    ],
    [
      '.dnb-motion-scene__disclosure-chevron',
      [-5, -2, 0, 3, 5, -2],
      [-5, 3, 0, -2, 5, 3],
    ],
    [
      '.dnb-motion-scene__graph-line',
      [96, 150, 160, 125, 224, 139, 288, 105],
      [96, 125, 160, 139, 224, 91, 288, 77],
    ],
  ] as const) {
    for (const element of await page.locator(selector).all()) {
      const frames = await element.evaluate(
        sampleMotionPoints,
        [600, 850, 1100, 3400, 4600]
      )
      for (const index of [0, 3, 4]) {
        frames[index].forEach((value, point) =>
          expect(value).toBeCloseTo(before[point])
        )
      }
      frames[2].forEach((value, point) =>
        expect(value).toBeCloseTo(after[point])
      )
      expect(frames[1]).not.toEqual(frames[0])
      expect(frames[1]).not.toEqual(frames[2])
    }
  }
})

test('WebKit pauses and resumes the morph timeline with the shared control', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
  await page
    .getByRole('button', { name: 'Pause all', exact: true })
    .click()
  await expect(page.locator('.dnb-motion-demos')).toHaveAttribute(
    'data-paused',
    'true'
  )
  const line = page.locator('.dnb-motion-scene__graph-line')
  const time = await line.evaluate(async (element) => {
    const animation = element.getAnimations()[0]
    await animation.ready
    return Number(animation.currentTime)
  })
  const points = await line.evaluate(sampleMotionPoints, null)
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  )
  expect(await line.evaluate(sampleMotionPoints, null)).toEqual(points)
  expect(
    await line.evaluate((element) =>
      Number(element.getAnimations()[0].currentTime)
    )
  ).toBe(time)
  await page
    .getByRole('button', { name: 'Resume all', exact: true })
    .click()
  await expect
    .poll(() =>
      line.evaluate((element) =>
        Number(element.getAnimations()[0].currentTime)
      )
    )
    .toBeGreaterThan(time)
})

test('WebKit shows settled path geometry with reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
  await expect(
    page.getByRole('button', { name: 'Motion paused' })
  ).toBeDisabled()
  for (const selector of [
    '.dnb-motion-scene__chevron',
    '.dnb-motion-scene__disclosure-chevron',
  ]) {
    for (const element of await page.locator(selector).all()) {
      expect(
        (await element.evaluate(sampleMotionPoints, null))[0][3]
      ).toBe(-2)
    }
  }
  expect(
    (
      await page
        .locator('.dnb-motion-scene__graph-line')
        .evaluate(sampleMotionPoints, null)
    )[0]
  ).toEqual([96, 125, 160, 139, 224, 91, 288, 77])
})
