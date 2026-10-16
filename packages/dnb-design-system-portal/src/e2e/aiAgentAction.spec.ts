import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.AgentAction', () => {
  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(
      'staggers the running label and progress pill with ' + reducedMotion,
      async ({ page }) => {
        await page.clock.install()
        await page.emulateMedia({ reducedMotion })
        await page.goto(
          '/uilib/extensions/ai/AgentAction/demos/#known-progress-and-timed-undo'
        )
        await waitForApp(page)
        await page.clock.runFor(2250)
        const replay = page.getByRole('button', {
          name: 'Replay payment',
          exact: true,
        })
        await replay.click()
        const processing = replay
          .locator('..')
          .locator('.dnb-ai-agent-action__processing')
        await expect(processing).toHaveAccessibleName(
          'Paying Spotify Premium'
        )
        const label = processing.locator(
          '.dnb-ai-agent-action__label > .dnb-ai-agent-action__text'
        )
        const target = processing.locator('.dnb-ai-agent-action__target')
        if (reducedMotion === 'reduce') {
          await expect(label).toHaveCSS('animation-name', 'none')
          await expect(target).toHaveCSS('animation-name', 'none')
          return
        }
        await expect(label).toHaveCSS('animation-duration', '0.3s')
        await expect(label).toHaveCSS('animation-delay', '0s')
        await expect(target).toHaveCSS('animation-duration', '0.3s')
        await expect(target).toHaveCSS('animation-delay', '0.15s')
        const samples = await processing.evaluate(async (element) => {
          const label = element.querySelector(
            '.dnb-ai-agent-action__label > .dnb-ai-agent-action__text'
          )
          const target = element.querySelector(
            '.dnb-ai-agent-action__target'
          )
          const animations = [label, target].map(
            (node) => node.getAnimations()[0]
          )
          animations.forEach((animation) => animation.pause())
          const samples: Array<
            Array<{ x: number; y: number; opacity: number }>
          > = []
          for (const time of [0, 150, 300, 450]) {
            animations.forEach((animation) => {
              animation.currentTime = time
            })
            await new Promise(requestAnimationFrame)
            samples.push(
              [label, target].map((node) => {
                const style = getComputedStyle(node)
                const matrix = new DOMMatrix(style.transform)
                return {
                  x: matrix.m41,
                  y: matrix.m42,
                  opacity: Number(style.opacity),
                }
              })
            )
          }
          return samples
        })
        expect(samples[0][0].x).toBeLessThan(0)
        expect(samples[0][0].opacity).toBe(0)
        expect(samples[1][0].opacity).toBeGreaterThan(0)
        expect(samples[1][1].opacity).toBe(0)
        expect(samples[2][0]).toEqual({ x: 0, y: 0, opacity: 1 })
        expect(samples[2][1].x).toBeLessThan(0)
        expect(samples[2][1].opacity).toBeGreaterThan(0)
        expect(samples[3][1]).toEqual({ x: 0, y: 0, opacity: 1 })
        expect(
          samples.every((frame) => frame.every(({ y }) => y === 0))
        ).toBe(true)
      }
    )
  }

  test('brings the paid result and delayed Undo in from the left without vertical movement', async ({
    page,
  }) => {
    await page.clock.install()
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(
      '/uilib/extensions/ai/AgentAction/demos/#known-progress-and-timed-undo'
    )
    await waitForApp(page)
    await page.clock.runFor(2250)
    const result = page
      .getByRole('button', { name: 'Replay payment', exact: true })
      .locator('..')
      .locator('.dnb-ai-agent-action__result')
    await expect(result).toHaveText('Spotify Premium paid.')
    const frames = await result.evaluate(async (element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      const frames: Array<{ x: number; y: number }> = []
      for (const time of [
        0,
        Number(animation.effect.getTiming().duration),
      ]) {
        animation.currentTime = time
        await new Promise(requestAnimationFrame)
        const matrix = new DOMMatrix(getComputedStyle(element).transform)
        frames.push({ x: matrix.m41, y: matrix.m42 })
      }
      return frames
    })
    expect(frames[0].x).toBeLessThan(0)
    expect(frames[0].y).toBe(0)
    expect(frames[frames.length - 1]).toEqual({ x: 0, y: 0 })
    const undo = result
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action__undo')
    await expect(undo).toHaveCSS('animation-duration', '0.3s')
    await expect(undo).toHaveCSS('animation-delay', '0.15s')
    const { opacity, positions } = await undo.evaluate(async (element) => {
      const animation = element.getAnimations()[0]
      animation.pause()
      const opacity: number[] = []
      const positions: Array<{ x: number; y: number }> = []
      for (const time of [0, 150, 300, 450]) {
        animation.currentTime = time
        await new Promise(requestAnimationFrame)
        opacity.push(Number(getComputedStyle(element).opacity))
        const matrix = new DOMMatrix(getComputedStyle(element).transform)
        positions.push({ x: matrix.m41, y: matrix.m42 })
      }
      return { opacity, positions }
    })
    expect(opacity[0]).toBe(0)
    expect(opacity[1]).toBe(0)
    expect(opacity[2]).toBeGreaterThan(0)
    expect(opacity[2]).toBeLessThan(1)
    expect(opacity[3]).toBe(1)
    expect(positions[0].x).toBe(frames[0].x)
    expect(positions[1].x).toBe(positions[0].x)
    expect(positions[2].x).toBeGreaterThan(positions[1].x)
    expect(positions[2].x).toBeLessThan(0)
    expect(positions[3]).toEqual({ x: 0, y: 0 })
    expect(positions.every(({ y }) => y === 0)).toBe(true)
  })

  test('announces Undo once and keeps countdown ticks quiet in the browser', async ({
    page,
  }) => {
    await page.clock.install()
    await page.goto('/uilib/extensions/ai/AgentAction/demos/#pending-undo')
    await waitForApp(page)
    const add = page.getByRole('button', {
      name: 'Add Undo deadline',
      exact: true,
    })
    const action = add
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    const undo = action.getByRole('button', { name: 'Undo', exact: true })
    const live = action.locator('.dnb-aria-live')
    await add.click()
    await page.clock.fastForward(1100)
    await expect(live).toContainText('Undo available for 20 seconds.')
    await expect(undo).toHaveAccessibleDescription(
      /^Undo available until /
    )
    const description = await action
      .locator('.dnb-sr-only')
      .first()
      .textContent()
    await page.clock.fastForward(4000)
    await expect(live).toBeEmpty()
    await expect(undo).toHaveAccessibleDescription(description)
    await page.clock.fastForward(16000)
    await page.clock.fastForward(1100)
    await expect(live).toContainText('Undo is no longer available.')
  })

  test('keeps historical actions available without live announcements', async ({
    page,
  }) => {
    await page.clock.install()
    await page.goto(
      '/uilib/extensions/ai/AgentAction/demos/#historical-actions'
    )
    await waitForApp(page)
    await page.clock.fastForward(1100)
    const history = page
      .locator('.dnb-ai-agent-action')
      .filter({ hasText: 'Earlier' })
    await expect(history).toHaveCount(2)
    for (const action of await history.all()) {
      await expect(action.locator('.dnb-aria-live')).toBeEmpty()
      await expect(
        action.locator('.dnb-ai-agent-action__result')
      ).toBeVisible()
    }
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    test(
      'keeps known progress free of a bottom line in ' + colorScheme,
      async ({ page }) => {
        await page.emulateMedia({ colorScheme })
        await page.goto('/uilib/extensions/ai/AgentAction/demos/')
        await waitForApp(page)
        const fill = page.locator(
          '[aria-valuenow="35"] .dnb-ai-agent-action__fill'
        )
        const indicator = await fill.evaluate((el) => {
          const style = getComputedStyle(el, '::after')
          return {
            height: parseFloat(style.height),
            color: style.backgroundColor,
          }
        })
        expect(indicator.color).toBe('rgba(0, 0, 0, 0)')
        await expect(fill).toHaveCSS('border-top-width', '0px')
      }
    )
  }

  test('grows known progress from the initial pill width to the full target', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/ai/AgentAction/demos/')
    await waitForApp(page)
    await page.evaluate(() => document.fonts.ready)
    for (const progress of [35, 65]) {
      const fill = page.locator(
        '[role="progressbar"][aria-valuenow="' +
          progress +
          '"] .dnb-ai-agent-action__fill'
      )
      const sizes = await fill.evaluate((element) => ({
        width: element.getBoundingClientRect().width,
        target: element.parentElement.clientWidth,
        initial:
          2.3125 *
          parseFloat(getComputedStyle(document.documentElement).fontSize),
      }))
      expect(sizes.width).toBeCloseTo(
        sizes.initial + ((sizes.target - sizes.initial) * progress) / 100,
        0
      )
    }
  })

  test('matches the Figma fill width and travel without scaling its rounded ends', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(
      '/uilib/extensions/ai/AgentAction/demos/#unknown-progress-and-cancellation'
    )
    await waitForApp(page)
    const action = page
      .getByRole('button', { name: 'Complete graph', exact: true })
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    const samples = await action
      .locator('.dnb-ai-agent-action__fill')
      .evaluate(async (fill) => {
        for (const entrance of fill.parentElement.getAnimations()) {
          entrance.finish()
        }
        const animation = fill.getAnimations()[0]
        animation.pause()
        const duration = Number(animation.effect.getTiming().duration)
        const track = fill.parentElement.getBoundingClientRect()
        const trackWidth = fill.parentElement.clientWidth
        const border = parseFloat(
          getComputedStyle(fill.parentElement).borderLeftWidth
        )
        const samples: Array<{
          left: number
          width: number
          height: number
        }> = []
        for (const progress of [
          0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875,
        ]) {
          animation.currentTime = duration * progress
          await new Promise(requestAnimationFrame)
          const bounds = fill.getBoundingClientRect()
          samples.push({
            left: (bounds.left - track.left - border) / trackWidth,
            width: bounds.width / trackWidth,
            height: bounds.height,
          })
        }
        return { duration, samples }
      })
    expect(samples.duration).toBe(3840)
    // Figma's 195px track, sampled every 480ms of its 3.84s return cycle.
    const widths = [56, 76, 96, 76, 56, 76, 96, 76]
    const lefts = [0, 17.427, 49.5, 101.573, 139, 101.573, 49.5, 17.427]
    samples.samples.forEach((sample, index) => {
      expect(sample.width).toBeCloseTo(widths[index] / 195, 2)
      expect(sample.left).toBeCloseTo(lefts[index] / 195, 2)
      expect(sample.height).toBe(35)
    })
    await expect(action.locator('.dnb-ai-agent-action__fill')).toHaveCSS(
      'transform',
      'none'
    )
  })

  test('moves continuously through the center of unknown progress in both directions', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(
      '/uilib/extensions/ai/AgentAction/demos/#unknown-progress-and-cancellation'
    )
    await waitForApp(page)
    const action = page
      .getByRole('button', { name: 'Complete graph', exact: true })
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    const centers = await action
      .locator('.dnb-ai-agent-action__fill')
      .evaluate(async (fill) => {
        const animation = fill.getAnimations()[0]
        animation.pause()
        const duration = Number(animation.effect.getTiming().duration)
        const track = fill.parentElement.getBoundingClientRect()
        const centers: number[] = []
        for (const progress of [0.2, 0.25, 0.3, 0.7, 0.75, 0.8]) {
          animation.currentTime = duration * progress
          await new Promise(requestAnimationFrame)
          const bounds = fill.getBoundingClientRect()
          centers.push(
            (bounds.left + bounds.width / 2 - track.left) / track.width
          )
        }
        return centers
      })
    // The fill should keep moving through the center instead of easing to a stop.
    expect(centers[1] - centers[0]).toBeGreaterThan(0.05)
    expect(centers[2] - centers[1]).toBeGreaterThan(0.05)
    expect(centers[3] - centers[4]).toBeGreaterThan(0.05)
    expect(centers[4] - centers[5]).toBeGreaterThan(0.05)
  })

  test('keeps keyboard focus in the action while Undo is pending and respects moving on', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/ai/AgentAction/demos/#pending-undo')
    await waitForApp(page)
    const confirm = page.getByRole('button', {
      name: 'Confirm reversal',
      exact: true,
    })
    const action = confirm
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    const undo = action.getByRole('button', { name: 'Undo', exact: true })
    const status = action.locator('.dnb-ai-agent-action__status')
    await undo.focus()
    await undo.press('Enter')
    await expect(undo).toBeDisabled()
    await expect(status).toBeFocused()
    await confirm.focus()
    await confirm.press('Enter')
    await expect(status).not.toBeFocused()
    await expect(action).toContainText('Payment reversed.')
  })

  test('keeps Undo mounted when a deadline is added', async ({ page }) => {
    await page.goto('/uilib/extensions/ai/AgentAction/demos/#pending-undo')
    await waitForApp(page)
    const add = page.getByRole('button', {
      name: 'Add Undo deadline',
      exact: true,
    })
    const action = add
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    const button = await action
      .getByRole('button', { name: 'Undo', exact: true })
      .elementHandle()
    await add.click()
    expect(await button.evaluate((el) => el.isConnected)).toBe(true)
    await expect(action.getByRole('timer')).toContainText('s')
  })

  test('returns focus to the result when Undo expires', async ({
    page,
  }) => {
    await page.clock.install()
    await page.goto('/uilib/extensions/ai/AgentAction/demos/#pending-undo')
    await waitForApp(page)
    const add = page.getByRole('button', {
      name: 'Add Undo deadline',
      exact: true,
    })
    const action = add
      .locator('..')
      .locator('..')
      .locator('.dnb-ai-agent-action')
    await add.click()
    await action.getByRole('button', { name: 'Undo', exact: true }).focus()
    await page.clock.fastForward(20000)
    await expect(
      action.getByRole('button', { name: 'Undo', exact: true })
    ).toHaveCount(0)
    await expect(
      action.locator('.dnb-ai-agent-action__status')
    ).toBeFocused()
  })

  for (const forcedColors of ['none', 'active'] as const) {
    test(
      'shows a progress boundary only with forced colors ' + forcedColors,
      async ({ page }) => {
        await page.emulateMedia({ forcedColors })
        test.skip(
          forcedColors === 'active' &&
            !(await page.evaluate(() =>
              CSS.supports('forced-color-adjust', 'none')
            )),
          'This browser does not support forced colors.'
        )
        await page.goto('/uilib/extensions/ai/AgentAction/demos/')
        await waitForApp(page)
        if (forcedColors === 'none') {
          for (const fill of await page
            .locator('.dnb-ai-agent-action__fill')
            .all()) {
            await expect(fill).toHaveCSS('border-top-width', '0px')
          }
          await expect(
            page.locator('.dnb-ai-agent-action__target').first()
          ).toHaveCSS('border-top-width', '1px')
          return
        }
        const fill = page.locator('.dnb-ai-agent-action__fill').first()
        const colors = await fill.evaluate((el) => {
          const style = getComputedStyle(el)
          return {
            border: style.borderColor,
            width: style.borderTopWidth,
            background: style.backgroundColor,
            parent: getComputedStyle(document.body).backgroundColor,
          }
        })
        expect(colors.width).toBe('1px')
        expect(colors.border).not.toBe('rgba(0, 0, 0, 0)')
        if (forcedColors === 'active') {
          await expect(fill).toHaveCSS('forced-color-adjust', 'none')
          const canvasText = await page.evaluate(() => {
            const probe = document.createElement('span')
            probe.style.cssText =
              'color: CanvasText; forced-color-adjust: none'
            document.body.appendChild(probe)
            const color = getComputedStyle(probe).color
            probe.remove()
            return color
          })
          expect(colors.border).toBe(canvasText)
        }
        const luminance = (color: string) => {
          const channels = color
            .match(/[0-9.]+/g)
            .slice(0, 3)
            .map(Number)
          const rgb = color.startsWith('color(')
            ? channels
            : channels.map((value) => value / 255)
          return rgb
            .map((value) =>
              value <= 0.04045
                ? value / 12.92
                : ((value + 0.055) / 1.055) ** 2.4
            )
            .reduce(
              (sum, value, index) =>
                sum + value * [0.2126, 0.7152, 0.0722][index],
              0
            )
        }
        const boundary = luminance(colors.border)
        for (const color of [colors.background, colors.parent]) {
          const surface = luminance(color)
          const contrast =
            (Math.max(boundary, surface) + 0.05) /
            (Math.min(boundary, surface) + 0.05)
          expect(contrast).toBeGreaterThanOrEqual(3)
        }
      }
    )
  }

  test('uses regular action text and medium Undo text', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/ai/AgentAction/demos/')
    await waitForApp(page)
    const text = page.locator('.dnb-ai-agent-action__text').first()
    const action = page.locator('.dnb-ai-agent-action').first()
    await action.locator('..').evaluate((parent) => {
      parent.style.fontWeight = '700'
    })
    await expect(text).toHaveCSS('font-weight', '400')
    await expect(text).toHaveCSS('color', 'rgb(51, 51, 51)')
    const undo = page
      .getByRole('button', { name: 'Replay payment', exact: true })
      .locator('..')
      .getByRole('button', { name: 'Undo', exact: true })
    await expect(undo).toBeVisible()
    await expect(undo).toHaveCSS('font-weight', '500')
    await expect(undo).toHaveCSS('color', 'rgb(0, 123, 94)')
  })

  for (const colorScheme of ['light', 'dark'] as const) {
    for (const reducedMotion of ['no-preference', 'reduce'] as const) {
      test(
        'keeps running text steady in ' +
          colorScheme +
          ' mode with ' +
          reducedMotion,
        async ({ page }) => {
          await page.emulateMedia({ colorScheme, reducedMotion })
          await page.goto('/uilib/extensions/ai/AgentAction/demos/')
          await waitForApp(page)
          await page.evaluate(() => document.fonts.ready)

          const action = page.locator('.dnb-ai-agent-action').first()
          await expect(action).toHaveCSS(
            'color',
            colorScheme === 'dark'
              ? 'rgb(255, 255, 255)'
              : 'rgb(51, 51, 51)'
          )
          const samples = await action.evaluate(
            (element) =>
              new Promise<string[]>((resolve) => {
                const samples = new Set<string>()
                const start = performance.now()
                const sample = () => {
                  for (const text of Array.from(
                    element.querySelectorAll(
                      '.dnb-ai-agent-action__text, .dnb-ai-agent-action__text *'
                    )
                  )) {
                    const neutral = getComputedStyle(element).color
                    const style = getComputedStyle(text)
                    samples.add(
                      JSON.stringify({
                        color:
                          style.color === neutral
                            ? 'neutral'
                            : style.color,
                        weight: style.fontWeight,
                        mask: style.maskImage,
                      })
                    )
                  }
                  if (performance.now() - start < 4000) {
                    requestAnimationFrame(sample)
                  } else {
                    resolve(Array.from(samples))
                  }
                }
                sample()
              })
          )
          expect(samples).toEqual([
            JSON.stringify({
              color: 'neutral',
              weight: '400',
              mask: 'none',
            }),
          ])
          const fill = page
            .locator(
              '.dnb-ai-agent-action--indeterminate .dnb-ai-agent-action__fill'
            )
            .first()
          await expect(fill).toHaveCSS(
            'animation-name',
            reducedMotion === 'reduce'
              ? 'none'
              : 'dnb-ai-agent-action-progress'
          )
        }
      )
    }
  }

  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(
      'keeps the payment row height through Undo and Replay with ' +
        reducedMotion,
      async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 })
        await page.emulateMedia({ reducedMotion })
        await page.goto('/uilib/extensions/ai/AgentAction/demos/')
        await waitForApp(page)
        await page.evaluate(() => document.fonts.ready)

        const replay = page.getByRole('button', {
          name: 'Replay payment',
          exact: true,
        })
        const stack = replay.locator('..')
        const action = stack.locator('.dnb-ai-agent-action')
        const undo = action.getByRole('button', {
          name: 'Undo',
          exact: true,
        })
        await expect(undo).toBeVisible()
        await replay.scrollIntoViewIfNeeded()

        const before = await stack.evaluate((element) => {
          const action = element.querySelector('.dnb-ai-agent-action')
          const replay = element.querySelector(':scope > button')
          return {
            height: action.getBoundingClientRect().height,
            below:
              replay.getBoundingClientRect().top -
              action.getBoundingClientRect().top,
          }
        })

        await undo.click()
        await expect(
          action.locator('.dnb-ai-agent-action__result')
        ).toHaveText('Payment reversed.')
        const afterUndo = await action.evaluate(
          (element) => element.getBoundingClientRect().height
        )
        expect(afterUndo).toBe(before.height)

        expect(before.height).toBe(37)

        // Sample every frame while Replay changes from progress back to Undo.
        const samples = stack.evaluate(
          (element) =>
            new Promise<Array<{ height: number; below: number }>>(
              (resolve) => {
                const samples: Array<{ height: number; below: number }> =
                  []
                const start = performance.now()
                const sample = () => {
                  const action = element.querySelector(
                    '.dnb-ai-agent-action'
                  )
                  const replay = element.querySelector(':scope > button')
                  samples.push({
                    height: action.getBoundingClientRect().height,
                    below:
                      replay.getBoundingClientRect().top -
                      action.getBoundingClientRect().top,
                  })
                  if (performance.now() - start < 2800) {
                    requestAnimationFrame(sample)
                  } else {
                    resolve(samples)
                  }
                }
                sample()
              }
            )
        )
        await replay.click()
        await expect(undo).toBeVisible()
        for (const sample of await samples) {
          expect(sample.height).toBe(before.height)
          expect(sample.below).toBe(before.below)
        }
      }
    )
  }
})
