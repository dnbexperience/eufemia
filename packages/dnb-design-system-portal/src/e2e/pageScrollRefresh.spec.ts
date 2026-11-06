import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [390, 1440]) {
  test(
    'restores a refreshed page before hydration at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.addInitScript(() => {
        const positions: number[] = []
        Object.assign(window, { restoredPagePositions: positions })
        const scrollTo = window.scrollTo.bind(window)
        window.scrollTo = ((options: ScrollToOptions) => {
          scrollTo(options)
          if (options?.top > 0) {
            positions.push(window.scrollY)
          }
        }) as typeof window.scrollTo
      })
      await page.goto('/web/components/button/demos/')
      await waitForApp(page)
      await page.evaluate(() =>
        window.scrollTo({ top: 1200, behavior: 'instant' })
      )
      await expect
        .poll(() => page.evaluate(() => window.scrollY))
        .toBe(1200)

      let resume: () => void
      const hydration = new Promise<void>((resolve) => {
        resume = resolve
      })
      await page.route(/\.m?js(?:\?|$)/, async (route) => {
        await hydration
        await route.continue()
      })
      try {
        await page.reload({ waitUntil: 'commit' })
        await expect(page.locator('#tab-bar-content')).toHaveCSS(
          'line-height',
          '24px'
        )
        await expect(page.locator('html')).not.toHaveAttribute(
          'data-portal-ready'
        )
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(1200)
        const earlyPositions = await page.evaluate(
          () => window['restoredPagePositions'] as number[]
        )
        expect(earlyPositions.length).toBeGreaterThan(0)
        expect(earlyPositions.every((position) => position === 1200)).toBe(
          true
        )
        resume()
        await waitForApp(page)
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(1200)
        const restoredPositions = await page.evaluate(
          () => window['restoredPagePositions'] as number[]
        )
        expect(
          restoredPositions.every((position) => position === 1200)
        ).toBe(true)
      } finally {
        resume()
        await page.unrouteAll({ behavior: 'wait' })
      }
    }
  )
}

for (const resource of ['fonts', 'images']) {
  test(
    'keeps the Figma guide visually stable while ' +
      resource +
      ' load on refresh',
    async ({ page }) => {
      await page.setViewportSize({ width: 864, height: 926 })
      await page.goto('/web/get-started/design-for-web/')
      await waitForApp(page)
      await page.evaluate(() => document.fonts.ready)
      const image = page.getByAltText(
        "DNB Bank ASA in Figma's team selector"
      )
      await expect(image).toHaveJSProperty('complete', true)
      await page.evaluate(() =>
        window.scrollTo({ top: 378, behavior: 'instant' })
      )
      const before = await image.boundingBox()
      await page.addInitScript(() => {
        const positions: number[] = []
        Object.assign(window, { guideImagePositions: positions })
        const sample = () => {
          const image = document.querySelector<HTMLElement>('main img')
          if (
            image &&
            getComputedStyle(image).visibility === 'visible' &&
            getComputedStyle(document.querySelector('main')).opacity !==
              '0' &&
            scrollY > 0
          ) {
            positions.push(image.getBoundingClientRect().top)
          }
          if (window['guideImagePositions'] === positions) {
            requestAnimationFrame(sample)
          }
        }
        requestAnimationFrame(sample)
      })
      await page.route(
        resource === 'fonts' ? /\.woff2?(?:\?|$)/ : /figma-.*[.]svg/,
        async (route) => {
          await new Promise((resolve) => setTimeout(resolve, 500))
          await route.continue()
        }
      )
      await page.reload()
      await waitForApp(page)
      await page.evaluate(() => document.fonts.ready)
      await expect(page.locator('#dnb-app-content')).toHaveCSS(
        'opacity',
        '1'
      )
      await expect(image).toHaveJSProperty('complete', true)
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() => resolve())
          )
      )
      const positions = await page.evaluate(() => {
        const positions: number[] = window['guideImagePositions']
        delete window['guideImagePositions']
        return positions
      })
      expect(positions.length).toBeGreaterThan(0)
      for (const top of positions) {
        expect(Math.abs(top - before.y)).toBeLessThanOrEqual(1)
      }
    }
  )
}

for (const reveal of ['timeout', 'interaction']) {
  test(
    'releases the refresh hold on ' + reveal + ' when fonts are slow',
    async ({ page }) => {
      await page.goto('/web/get-started/design-for-web/')
      await waitForApp(page)
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate(() =>
        window.scrollTo({ top: 378, behavior: 'instant' })
      )
      let releaseFonts: () => void
      const fonts = new Promise<void>((resolve) => {
        releaseFonts = resolve
      })
      await page.route(/\.woff2?(?:\?|$)/, async (route) => {
        await fonts
        await route.continue()
      })
      try {
        await page.reload({ waitUntil: 'commit' })
        const content = page.locator('#dnb-app-content')
        await expect(content).toHaveCSS('opacity', '0')
        if (reveal === 'interaction') {
          await page.mouse.wheel(0, 100)
        }
        await expect(content).toHaveCSS('opacity', '1', { timeout: 2000 })
        await page.evaluate(() => {
          Object.assign(window, { lateRestoreCalls: 0 })
          const scrollTo = window.scrollTo.bind(window)
          window.scrollTo = ((options: ScrollToOptions) => {
            window['lateRestoreCalls']++
            scrollTo(options)
          }) as typeof window.scrollTo
        })
        releaseFonts()
        await page.evaluate(() => document.fonts.ready)
        await waitForApp(page)
        await page.evaluate(
          () =>
            new Promise<void>((resolve) =>
              requestAnimationFrame(() => resolve())
            )
        )
        expect(await page.evaluate(() => window['lateRestoreCalls'])).toBe(
          0
        )
      } finally {
        releaseFonts()
        await page.unrouteAll({ behavior: 'wait' })
      }
    }
  )
}
