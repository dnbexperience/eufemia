import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.AgentAction', () => {
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
      'shows a distinct progress boundary with forced colors ' +
        forcedColors,
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
                  const neutral = getComputedStyle(element).color
                  for (const text of Array.from(
                    document.querySelectorAll(
                      '.dnb-ai-agent-action__text, .dnb-ai-agent-action__text *'
                    )
                  )) {
                    const style = getComputedStyle(text)
                    samples.add(
                      JSON.stringify({
                        color:
                          style.color === neutral
                            ? 'neutral'
                            : style.color,
                        weight: style.fontWeight,
                        mask: style.maskImage,
                        animation: style.animationName,
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
              animation: 'none',
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
