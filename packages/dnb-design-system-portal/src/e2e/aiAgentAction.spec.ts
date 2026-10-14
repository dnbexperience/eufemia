import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Ai.AgentAction', () => {
  test('uses regular action text, a narrow highlight, and medium Undo text', async ({
    page,
  }) => {
    await page.goto('/uilib/extensions/ai/AgentAction/demos/')
    await waitForApp(page)
    const text = page.locator('.dnb-ai-agent-action__text').first()
    const activity = text.locator('.dnb-ai-agent-action__activity')
    await expect(activity).toHaveCSS(
      'mask-image',
      'linear-gradient(90deg, rgba(0, 0, 0, 0) 40%, rgb(0, 0, 0) 50%, rgba(0, 0, 0, 0) 60%)'
    )
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
