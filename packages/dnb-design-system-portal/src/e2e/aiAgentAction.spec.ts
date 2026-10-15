import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.AgentAction', () => {
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
    const undo = page.getByRole('button', { name: 'Undo', exact: true })
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
