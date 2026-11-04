import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [320, 390, 640, 800, 1200, 1600]) {
  test(
    'keeps hanging controls in place while fonts load at ' + width + 'px',
    async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.setViewportSize({ width, height: 1000 })
      let releaseFonts: () => void
      const fonts = new Promise<void>((resolve) => {
        releaseFonts = resolve
      })
      await page.route(/\.(woff2?|ttf)(?:\?|$)/, async (route) => {
        await fonts
        await route.continue()
      })
      await page.goto('/', { waitUntil: 'domcontentloaded' })
      const specimens = page.locator('[data-home-specimen]')
      await expect(specimens).toHaveCount(6)
      // Exercise wider fallback metrics even on macOS, where the system
      // font can otherwise conceal the wrapping seen on Linux.
      const fallback = await page.addStyleTag({
        content:
          '#welcome-heading, [data-home-specimen] .dnb-form-label { font-family: monospace !important; }',
      })
      const bounds = () =>
        specimens.evaluateAll((items) =>
          items.map((item) => {
            const { x, y, width, height } = item.getBoundingClientRect()
            return { x, y, width, height }
          })
        )
      try {
        await expect
          .poll(() =>
            specimens
              .first()
              .evaluate((item) => getComputedStyle(item).transform)
          )
          .not.toBe('none')
        const before = await bounds()
        releaseFonts()
        await fallback.evaluate((element) =>
          element.parentNode.removeChild(element)
        )
        await waitForApp(page)
        await page.evaluate(() => document.fonts.ready)
        const after = await bounds()
        for (let index = 0; index < before.length; index++) {
          for (const key of ['x', 'y', 'width', 'height'] as const) {
            expect(after[index][key]).toBeCloseTo(before[index][key], 0)
          }
        }
      } finally {
        releaseFonts()
      }
    }
  )
}

test('enlarges the responsive home heading at every screen size', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1600, 1440, 1200, 960, 800, 640, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await waitForApp(page)
    await expect(page.locator('#welcome-heading')).toHaveCSS(
      'font-size',
      width > 640 ? '72px' : '51px'
    )
  }
})

test('gives the home heading the same breathing room across screen sizes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const width of [1600, 1200, 960, 800, 640, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 })
    await page.goto('/')
    await waitForApp(page)
    await expect
      .poll(
        async () =>
          (await page.locator('#welcome-heading').boundingBox()).y
      )
      .toBeCloseTo(width <= 640 ? 136 : 232, 1)
  }
})

test('leaves breathing room below the compact header', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await waitForApp(page)
  await expect(
    page.locator('.dnb-sidebar-menu-responsive-inline')
  ).toHaveAttribute('data-sidebar-menu-responsive-compact', 'true')
  const header = await page.locator('header.sticky-menu').boundingBox()
  const heading = await page.locator('#welcome-heading').boundingBox()
  const gap = heading.y - (header.y + header.height)
  expect(gap).toBeGreaterThanOrEqual(160)
  expect(gap).toBeLessThanOrEqual(200)
  const anchors = await page
    .locator('[data-hanging-item] > span:first-child')
    .evaluateAll((items) =>
      items.map((item) => item.getBoundingClientRect().top + scrollY)
    )
  for (const top of anchors) {
    expect(top).toBeCloseTo(0, 0)
  }
})

for (const width of [1440, 390]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      'keeps the home heading and background intact at ' +
        width +
        'px in ' +
        colorScheme,
      async ({ page }) => {
        await page.setViewportSize({ width, height: 900 })
        await page.emulateMedia({ colorScheme })
        await page.goto('/')
        await waitForApp(page)

        await expect(page).toHaveTitle('DNB Design System | Eufemia')
        const heading = page.locator('main h1')
        await expect(heading).toHaveCount(1)
        await expect(heading).toHaveText("It's yours. Build with it.")
        const layout = await page.evaluate(() => {
          const home = document.querySelector('[data-portal-home]')
          const hero = home.querySelector('section')
          const heading = home.querySelector('h1')
          const content = document.querySelector('.dnb-app-content')
          return {
            home: home.getBoundingClientRect().toJSON(),
            hero: hero.getBoundingClientRect().toJSON(),
            heading: heading.getBoundingClientRect().toJSON(),
            content: content.getBoundingClientRect().toJSON(),
            headerBackground: getComputedStyle(
              document.querySelector('header.sticky-menu')
            ).backgroundColor,
            footerBackground: getComputedStyle(
              document.querySelector('footer')
            ).backgroundColor,
            overflow:
              document.documentElement.scrollWidth > window.innerWidth,
          }
        })
        expect(layout.home.top).toBeCloseTo(0, 1)
        expect(layout.home.left).toBeCloseTo(layout.content.left, 1)
        expect(layout.home.right).toBeCloseTo(layout.content.right, 1)
        expect(layout.heading.top).toBeGreaterThanOrEqual(layout.hero.top)
        expect(layout.heading.bottom).toBeLessThanOrEqual(
          layout.hero.bottom
        )
        expect(layout.heading.left).toBeGreaterThanOrEqual(
          layout.home.left
        )
        expect(layout.heading.right).toBeLessThanOrEqual(layout.home.right)
        expect(layout.headerBackground).toBe('rgba(0, 0, 0, 0)')
        expect(layout.footerBackground).toBe('rgba(0, 0, 0, 0)')
        expect(layout.overflow).toBe(false)
      }
    )
  }
}

test('keeps the resting control angles unchanged when hydration starts', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setViewportSize({ width: 390, height: 1000 })
  let releaseScripts: () => void
  const scripts = new Promise<void>((resolve) => {
    releaseScripts = resolve
  })
  await page.route(/\.js(?:\?|$)/, async (route) => {
    await scripts
    await route.continue()
  })
  await page.goto('/', { waitUntil: 'commit' })
  const specimens = page.locator('[data-home-specimen]')
  await expect(specimens).toHaveCount(6)
  const angles = () =>
    specimens.evaluateAll((items) =>
      items.map((item) => {
        const matrix = new DOMMatrix(getComputedStyle(item).transform)
        return Math.atan2(matrix.m12, matrix.m11)
      })
    )
  try {
    await expect
      .poll(async () =>
        (await angles()).every((angle) => Math.abs(angle) > 0.02)
      )
      .toBe(true)
    const before = await angles()
    releaseScripts()
    await waitForApp(page)
    const after = await angles()
    for (let index = 0; index < before.length; index++) {
      expect(after[index]).toBeCloseTo(before[index], 5)
    }
  } finally {
    releaseScripts()
  }
})
