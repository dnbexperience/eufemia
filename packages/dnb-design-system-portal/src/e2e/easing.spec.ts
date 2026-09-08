import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import sampleMotionStyles from './shared/sampleMotionStyles'

test.use({ browserName: 'webkit' })

test.describe('easing previews', () => {
  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/quickguide-designer/motion/')
    await waitForApp(page)
  })

  test('show both curves before their code, compared with constant speed', async ({
    page,
  }) => {
    await expect(page.locator('.dnb-easing-demo')).toHaveCount(2)
    await expect(page.locator('.dnb-easing-demo button')).toHaveCount(0)
    for (const variant of ['default', 'bounce']) {
      const demo = page.locator(`.dnb-easing-demo--${variant}`)
      const title =
        variant === 'default' ? 'Default easing' : 'Fast bounce'
      const heading = page.getByRole('heading', {
        name: title,
        level: 5,
        exact: true,
      })
      await expect(heading).toHaveCount(1)
      await expect(demo).toHaveAccessibleName(title)
      await expect(demo.locator('figcaption')).toHaveCount(0)
      const card = demo.locator('.dnb-card')
      await expect(card).toHaveCount(1)
      await expect(card).toHaveCSS(
        '--background-color',
        await card.evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue('--token-color-background-neutral')
            .trim()
        )
      )
      await expect(card.locator('figcaption')).toHaveCount(0)
      await expect(card).not.toContainText('Slowed down for comparison')
      await expect(demo.locator('p')).toHaveCount(0)
      await expect(demo.locator('.dnb-easing-demo__runner')).toHaveCount(4)
      expect(
        await demo
          .locator('.dnb-easing-demo__runner circle')
          .evaluateAll((circles) =>
            circles.map((circle) => circle.getAttribute('r'))
          )
      ).toEqual(['4.5', '6.75', '9', '9'])
      expect(
        await demo
          .locator('.dnb-easing-demo__target')
          .evaluateAll((circles) =>
            circles.map((circle) => circle.getAttribute('r'))
          )
      ).toEqual(['12', '12'])
      await expect(card.locator('svg')).toHaveAttribute(
        'viewBox',
        '0 0 520 96'
      )
      const lane = demo.locator('.dnb-easing-demo__lane')
      await expect(lane).toHaveAttribute('height', '32')
      for (const line of await demo
        .locator('.dnb-easing-demo__track, .dnb-easing-demo__finish')
        .all()) {
        await expect(line).toHaveCSS('stroke-width', '1.5px')
        await expect(line).toHaveCSS('opacity', '0.6')
      }
      const finish = demo.locator('.dnb-easing-demo__finish')
      const tracks = demo.locator('.dnb-easing-demo__track')
      await expect(tracks).toHaveCount(2)
      const topStroke = await tracks
        .first()
        .evaluate((element) => getComputedStyle(element).stroke)
      await expect(tracks.last()).not.toHaveCSS('stroke', topStroke)
      await expect(
        demo.locator('.dnb-easing-demo__track-ends--eased')
      ).toHaveCSS('fill', topStroke)
      await expect(finish).toHaveCSS('stroke-dasharray', '0px, 6px')
      await expect(finish).toHaveCSS('stroke-linecap', 'round')
      expect(
        await demo
          .locator('.dnb-easing-demo__track-ends circle')
          .evaluateAll((circles) =>
            circles.map((circle) =>
              ['cx', 'cy', 'r'].map((attribute) =>
                Number(circle.getAttribute(attribute))
              )
            )
          )
      ).toEqual([
        [48, 28, 2.5],
        [464, 28, 2.5],
        [48, 72, 2.5],
        [416, 72, 2.5],
      ])
      const introduction = await demo.evaluate((element) => ({
        tag: element.previousElementSibling.tagName,
        text: element.previousElementSibling.textContent,
        top: element.previousElementSibling.getBoundingClientRect().top,
      }))
      expect(introduction.tag).toBe('P')
      expect(introduction.text).toBe('Slowed down for comparison.')
      expect(
        await heading.evaluate(
          (element) => element.getBoundingClientRect().bottom
        )
      ).toBeLessThan(introduction.top)
      const followingCode = await demo.evaluate(
        (element) =>
          element.nextElementSibling.querySelector('pre')?.textContent
      )
      expect(followingCode).toContain(
        variant === 'default' ? '--easing-default' : '--easing-fast-bounce'
      )
      const timing = await demo
        .locator('.dnb-easing-demo__runner--eased')
        .evaluate((element) => {
          const style = getComputedStyle(element)
          const numbers = (value: string) =>
            value.match(/-?\d*\.?\d+/g)?.map(Number)
          return {
            actual: numbers(style.animationTimingFunction),
            token: numbers(style.getPropertyValue('--easing-demo-curve')),
          }
        })
      expect(timing.token).toHaveLength(4)
      expect(timing.actual).toEqual(timing.token)
      const [start, early, middle, settling, end, repeated] =
        await demo.evaluate(sampleMotionStyles, {
          times: [600, 900, 1600, 2100, 2600, 4600],
          selectors: {
            eased: '.dnb-easing-demo__runner--eased',
            linear: '.dnb-easing-demo__runner--linear',
            trailNear: '.dnb-easing-demo__runner--trail-near',
            trailFar: '.dnb-easing-demo__runner--trail-far',
          },
        })
      expect(start.eased.x).toBeCloseTo(0)
      expect(start.linear.x).toBeCloseTo(0)
      expect(middle.linear.x).toBeCloseTo(184)
      expect(early.trailFar.x).toBeLessThan(early.trailNear.x)
      expect(early.trailNear.x).toBeLessThan(early.eased.x)
      expect(middle.eased.bounds.width).toBeCloseTo(
        middle.linear.bounds.width
      )
      expect(middle.eased.bounds.height).toBeCloseTo(
        middle.linear.bounds.height
      )
      expect(middle.eased.x).toBeGreaterThan(middle.linear.x)
      if (variant === 'bounce') {
        expect(middle.eased.x).toBeGreaterThan(368)
        expect(settling.eased.x).toBeLessThan(middle.eased.x)
        expect(settling.eased.x).toBeGreaterThan(368)
      } else {
        expect(early.eased.x).toBeLessThan(early.linear.x)
        expect(middle.eased.x).toBeLessThan(368)
        expect(settling.eased.x).toBeGreaterThan(middle.eased.x)
      }
      expect(end.eased.x).toBeCloseTo(368)
      expect(end.linear.x).toBeCloseTo(368)
      expect(repeated.eased.x).toBeCloseTo(start.eased.x)
      expect(repeated.linear.x).toBeCloseTo(start.linear.x)
    }
  })

  test('share pause, resume and reduced-motion behavior with the gallery', async ({
    page,
  }) => {
    const demos = page.locator('.dnb-easing-demo')
    await demos.last().scrollIntoViewIfNeeded()
    const pause = page.getByRole('button', {
      name: 'Pause all',
      exact: true,
    })
    await expect(pause).toBeInViewport({ ratio: 1 })
    await pause.click()
    for (const demo of await demos.all()) {
      const paused = await demo.evaluate(async (element) => {
        const animations = element.getAnimations({ subtree: true })
        await Promise.all(animations.map((animation) => animation.ready))
        const times = animations.map((animation) => animation.currentTime)
        await new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        )
        return {
          states: animations.map((animation) => animation.playState),
          times,
          later: animations.map((animation) => animation.currentTime),
        }
      })
      expect(paused.states).toHaveLength(8)
      expect(paused.states.every((state) => state === 'paused')).toBe(true)
      expect(paused.later).toEqual(paused.times)
    }
    const runner = demos.last().locator('.dnb-easing-demo__runner--eased')
    const time = await runner.evaluate((element) =>
      Number(element.getAnimations()[0].currentTime)
    )
    await page
      .getByRole('button', { name: 'Resume all', exact: true })
      .click()
    await expect
      .poll(() =>
        runner.evaluate((element) =>
          Number(element.getAnimations()[0].currentTime)
        )
      )
      .toBeGreaterThan(time)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await expect(
      page.getByRole('button', { name: 'Motion paused' })
    ).toBeDisabled()
    for (const demo of await demos.all()) {
      expect(
        await demo.evaluate(
          (element) => element.getAnimations({ subtree: true }).length
        )
      ).toBe(0)
      await expect(
        demo.locator('.dnb-easing-demo__runner--eased')
      ).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 368, 0)')
    }
  })

  for (const width of [320, 1280]) {
    test(`keep the timing heading below the shared toolbar at ${width}px`, async ({
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
            .evaluate(
              (heading) =>
                heading.getBoundingClientRect().top -
                document
                  .querySelector('.dnb-motion-demos__controls')
                  .getBoundingClientRect().bottom
            )
        )
        .toBeGreaterThanOrEqual(0)
    })

    test(`fit the viewport and keep the overshoot visible at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      for (const demo of await page.locator('.dnb-easing-demo').all()) {
        await expect(demo).toBeVisible()
        const [frame] = await demo.evaluate(sampleMotionStyles, {
          times: [1600],
          selectors: {
            stage: '.dnb-easing-demo__stage',
            eased: '.dnb-easing-demo__runner--eased',
            linear: '.dnb-easing-demo__runner--linear',
          },
        })
        expect(frame.stage.bounds.x).toBeGreaterThanOrEqual(0)
        expect(
          frame.stage.bounds.x + frame.stage.bounds.width
        ).toBeLessThanOrEqual(width)
        for (const runner of [frame.eased, frame.linear]) {
          expect(runner.bounds.x).toBeGreaterThanOrEqual(
            frame.stage.bounds.x
          )
          expect(runner.bounds.y).toBeGreaterThanOrEqual(
            frame.stage.bounds.y
          )
          expect(
            runner.bounds.x + runner.bounds.width
          ).toBeLessThanOrEqual(
            frame.stage.bounds.x + frame.stage.bounds.width
          )
          expect(
            runner.bounds.y + runner.bounds.height
          ).toBeLessThanOrEqual(
            frame.stage.bounds.y + frame.stage.bounds.height
          )
        }
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
    })
  }
})
