import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.AgentAction', () => {
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
