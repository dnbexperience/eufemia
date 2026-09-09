import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.use({ browserName: 'webkit' })

test.describe('easing previews', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/quickguide-designer/motion/')
    await waitForApp(page)
  })

  test('show both easing curves with guidance', async ({ page }) => {
    await expect(
      page.getByRole('heading', {
        name: 'Easing tokens',
        level: 5,
        exact: true,
      })
    ).toBeVisible()
    await expect(page.locator('.dnb-easing-demo')).toHaveCount(2)
    for (const variant of ['default', 'bounce']) {
      const demo = page.locator(`.dnb-easing-demo--${variant}`)
      const title =
        variant === 'default' ? 'Default easing' : 'Fast bounce'
      const token =
        variant === 'default' ? '--easing-default' : '--easing-fast-bounce'
      await expect(demo).toHaveAccessibleName(title)
      await expect(demo.locator('code')).toHaveText(token)
      await expect(
        demo.locator('.dnb-easing-demo__curve')
      ).toHaveAttribute(
        'd',
        variant === 'default'
          ? 'M48 120C84.96 120 48 32 136 32'
          : 'M48 120C77.92 -17.28 104.32 32 136 32'
      )
      const colors = await demo.evaluate((element) => {
        const resolveColor = (value: string) => {
          const probe = document.createElement('span')
          probe.style.color = value
          element.appendChild(probe)
          const color = getComputedStyle(probe).color
          probe.remove()

          return color
        }
        const style = getComputedStyle(element)
        const curveColor = resolveColor(
          style.getPropertyValue('--token-color-text-neutral-alternative')
        )
        const guideColor = resolveColor(
          style.getPropertyValue('--token-color-stroke-neutral-bold')
        )

        return {
          curveColor,
          guideColor,
          curve: getComputedStyle(
            element.querySelector('.dnb-easing-demo__curve')
          ).stroke,
          point: getComputedStyle(
            element.querySelector('.dnb-easing-demo__point')
          ).fill,
          curveRunner: getComputedStyle(
            element.querySelector('.dnb-easing-demo__curve-runner')
          ).fill,
          guide: getComputedStyle(
            element.querySelector('.dnb-easing-demo__guide')
          ).stroke,
          diagonal: getComputedStyle(
            element.querySelector('.dnb-easing-demo__diagonal')
          ).stroke,
        }
      })
      expect(colors.curve).toBe(colors.curveColor)
      expect(colors.point).toBe(colors.curveColor)
      expect(colors.curveRunner).toBe(colors.curveColor)
      expect(colors.guide).toBe(colors.guideColor)
      expect(colors.diagonal).toBe(colors.guideColor)
      await expect(demo.locator('.dnb-easing-demo__guide')).toHaveCSS(
        'stroke-width',
        '0.5px'
      )
      await expect(demo.locator('.dnb-easing-demo__diagonal')).toHaveCSS(
        'stroke-width',
        '0.5px'
      )
      const curveRunner = demo.locator('.dnb-easing-demo__curve-runner')
      await expect(curveRunner).toHaveCount(1)
      await expect(curveRunner).toHaveAttribute('r', '5')
      await expect(curveRunner).toHaveCSS(
        'fill',
        await demo
          .locator('.dnb-easing-demo__curve')
          .evaluate((element) => getComputedStyle(element).stroke)
      )
      await expect(curveRunner.locator('animateMotion')).toHaveCount(0)
      await expect(demo.locator('figcaption')).toBeVisible()
      const card = demo.locator('.dnb-card')
      await expect(card).toHaveCount(1)
      await expect(card).toHaveCSS(
        '--background-color',
        await card.evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue('--token-color-background-neutral-subtle')
            .trim()
        )
      )
      await expect(card.locator('figcaption')).toHaveCount(0)
      const linearRunner = demo.locator('.dnb-easing-demo__runner')
      await expect(linearRunner).toHaveCount(1)
      await expect(linearRunner).toHaveAttribute('r', '10')
      await expect(
        demo.locator('.dnb-easing-demo__travel-track')
      ).toHaveCount(0)
      await expect(
        card.locator('.dnb-easing-demo__stage')
      ).toHaveAttribute('viewBox', '0 0 184 184')
      const guideSize = await demo
        .locator('.dnb-easing-demo__guide')
        .evaluate((element: SVGGraphicsElement) => {
          const { width, height } = element.getBBox()
          return { width, height }
        })
      expect(guideSize.width).toBe(guideSize.height)
      await expect(demo.getByRole('button')).toHaveCount(0)
      await expect(demo.locator('.dnb-easing-demo__timing')).toContainText(
        variant === 'default' ? '1200ms' : '720ms'
      )
      const timing = await demo
        .locator('.dnb-easing-demo__runner')
        .evaluate((element) => {
          const style = getComputedStyle(element)
          const numbers = (value: string) =>
            value.match(/-?\d*\.?\d+/g)?.map(Number)
          return {
            actual: numbers(style.animationTimingFunction),
            token: numbers(style.getPropertyValue('--easing-demo-curve')),
            duration: style.animationDuration,
          }
        })
      expect(timing.token).toHaveLength(4)
      expect(timing.actual).toEqual(timing.token)
      expect(timing.duration).toBe(
        variant === 'default' ? '4.3s, 4.3s' : '3.82s, 3.82s'
      )
      const progress = await demo.evaluate(
        (element, currentTime) => {
          const animations = element.getAnimations({ subtree: true })
          animations.forEach((animation) => {
            animation.pause()
            animation.currentTime = currentTime
          })
          const stage = element.querySelector(
            '.dnb-easing-demo__stage'
          ) as SVGSVGElement
          const curveRunner = element.querySelector(
            '.dnb-easing-demo__curve-runner'
          )
          const linearRunner = element.querySelector(
            '.dnb-easing-demo__runner'
          )
          const matrix = stage.getScreenCTM()
          const start = new DOMPoint(48, 120).matrixTransform(matrix)
          const end = new DOMPoint(136, 32).matrixTransform(matrix)
          const curveBounds = curveRunner.getBoundingClientRect()
          const linearBounds = linearRunner.getBoundingClientRect()
          const curveX = curveBounds.x + curveBounds.width / 2
          const curveY = curveBounds.y + curveBounds.height / 2
          const linearX = linearBounds.x + linearBounds.width / 2

          return {
            curveTime: (curveX - start.x) / (end.x - start.x),
            curveProgress: (start.y - curveY) / (start.y - end.y),
            linearProgress: (linearX - start.x) / (end.x - start.x),
          }
        },
        variant === 'default' ? 1900 : 1660
      )
      expect(progress.curveTime).toBeCloseTo(0.5, 1)
      expect(progress.curveProgress).toBeCloseTo(
        progress.linearProgress,
        2
      )
    }
    const code = page
      .locator('pre')
      .filter({ hasText: 'transition: transform 300ms' })
    await expect(code).toContainText('--easing-default')
    await expect(code).toContainText('--easing-fast-bounce')
  })

  test('autoplay and respect reduced motion with the gallery', async ({
    page,
  }) => {
    const demos = page.locator('.dnb-easing-demo')
    await demos.last().scrollIntoViewIfNeeded()
    for (const demo of await demos.all()) {
      const states = await demo.evaluate(async (element) => {
        const animations = element.getAnimations({ subtree: true })
        await Promise.all(animations.map((animation) => animation.ready))
        return animations.map((animation) => animation.playState)
      })
      expect(states.length).toBeGreaterThanOrEqual(2)
      expect(states.every((state) => state === 'running')).toBe(true)
    }
    const runner = demos.last().locator('.dnb-easing-demo__runner')
    const time = await runner.evaluate((element) =>
      Number(element.getAnimations()[0].currentTime)
    )
    await expect
      .poll(() =>
        runner.evaluate((element) =>
          Number(element.getAnimations()[0].currentTime)
        )
      )
      .toBeGreaterThan(time)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const demo of await demos.all()) {
      expect(
        await demo.evaluate(
          (element) => element.getAnimations({ subtree: true }).length
        )
      ).toBe(0)
      await expect(demo.locator('.dnb-easing-demo__runner')).toHaveCSS(
        'transform',
        'none'
      )
      await expect(
        demo.locator('.dnb-easing-demo__curve-runner animateMotion')
      ).toHaveCount(0)
    }
  })

  for (const width of [320, 1280]) {
    test(`keep the timing heading in view at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/quickguide-designer/motion/#timing-and-easing')
      await waitForApp(page)
      await expect
        .poll(() =>
          page
            .getByRole('heading', {
              name: 'Timing and easing',
              exact: true,
            })
            .evaluate((heading) => heading.getBoundingClientRect().top)
        )
        .toBeGreaterThanOrEqual(0)
    })

    test(`fit the viewport at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const demo of await page.locator('.dnb-easing-demo').all()) {
        await expect(demo).toBeVisible()
        const bounds = await demo.boundingBox()
        expect(bounds.x).toBeGreaterThanOrEqual(0)
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
    })
  }
})
