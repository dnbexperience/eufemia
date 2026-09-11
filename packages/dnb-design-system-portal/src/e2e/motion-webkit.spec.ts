import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import sampleMotionPoints from './shared/sampleMotionPoints'
import sampleMotionStyles from './shared/sampleMotionStyles'

test.use({ browserName: 'webkit' })

for (const width of [320, 1280]) {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(`WebKit paints the submission border inside its viewport at ${width}px with ${reducedMotion}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion })
      await page.goto('/quickguide-designer/motion/')
      await waitForApp(page)
      const stage = page.locator(
        '#show-submission .dnb-motion-demo__stage'
      )
      const glow = stage.locator('.dnb-motion-scene__submit-glow')
      if (reducedMotion === 'no-preference') {
        await stage.evaluate(async (element) => {
          const animations = element.getAnimations({ subtree: true })
          animations.forEach((animation) => animation.pause())
          await Promise.all(animations.map((animation) => animation.ready))
        })
        await glow.evaluate(async (element) => {
          const animation = element.getAnimations()[0]
          await animation.ready
          animation.currentTime = 375
        })
      }
      // Include rasterized edge pixels when masking the expected border bounds.
      await stage.evaluate((element) =>
        element.insertAdjacentHTML(
          'beforeend',
          '<rect data-testid="submission-border-bounds" x="118" y="142" width="124" height="52" fill="none" />'
        )
      )
      const bounds = stage.getByTestId('submission-border-bounds')
      const painted = await stage.screenshot()
      if (reducedMotion === 'no-preference') {
        await glow.evaluate((element) => {
          element.getAnimations()[0].currentTime = 750
        })
        expect(painted.equals(await stage.screenshot())).toBe(false)
      }
      const outside = await stage.screenshot({ mask: [bounds] })
      await glow.evaluate((element: HTMLElement) => {
        element.style.visibility = 'hidden'
      })
      const hidden = await stage.screenshot()
      const outsideHidden = await stage.screenshot({ mask: [bounds] })

      expect(painted.equals(hidden)).toBe(false)
      // WebKit can report correct bounds while painting outside them.
      expect(outside.equals(outsideHidden)).toBe(true)
    })
  }
}

test('WebKit keeps the house still while the garage opens and closes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
  const artwork = page.locator('.dnb-motion-scene__illustration-artwork')
  await expect(artwork.locator('image')).toHaveCount(0)
  const frames = await artwork.evaluate(sampleMotionStyles, {
    times: [0, 1200, 1600, 2400, 2800, 4000],
    selectors: {
      roof: 'g.dnb-motion-scene__illustration-roof',
      details: 'g.dnb-motion-scene__illustration-details',
      windows: 'g.dnb-motion-scene__illustration-windows',
      door: 'g.dnb-motion-scene__garage-door',
    },
  })
  frames.forEach(({ roof, details, windows }) => {
    expect(roof.opacity).toBe(1)
    expect(roof.y).toBeCloseTo(0)
    expect(details.opacity).toBe(1)
    expect(windows.opacity).toBe(1)
  })
  expect(frames[0].door.y).toBeCloseTo(0)
  expect(frames[1].door.y).toBeGreaterThan(-52)
  expect(frames[1].door.y).toBeLessThan(0)
  expect(frames[2].door.y).toBeCloseTo(-52)
  expect(frames[3].door.y).toBeCloseTo(-52)
  expect(frames[4].door.y).toBeGreaterThan(-52)
  expect(frames[4].door.y).toBeLessThan(0)
  expect(frames[5].door.y).toBeCloseTo(0)
})

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

test('WebKit autoplays the morph timeline without a pause control', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/quickguide-designer/motion/')
  await waitForApp(page)
  await expect(
    page.getByRole('button', { name: 'Pause all', exact: true })
  ).toHaveCount(0)
  const line = page.locator('.dnb-motion-scene__graph-line')
  const time = await line.evaluate(async (element) => {
    const animation = element.getAnimations()[0]
    await animation.ready
    return Number(animation.currentTime)
  })
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
