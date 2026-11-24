import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/web/components/toggle-button/demos/?fullscreen')
  await expect(page.locator('.dnb-toggle-button').first()).toBeVisible()
})

test('checkbox and radio indicators change at once with the button', async ({
  page,
}) => {
  for (const [fixture, variant] of [
    ['toggle-button-group-vertical', 'checkbox'],
    ['toggle-button-group-status', 'radio'],
  ]) {
    await test.step(variant, async () => {
      const toggleButton = page
        .locator(`[data-visual-test="${fixture}"] .dnb-toggle-button`)
        .filter({ hasText: 'First' })

      const transitions = await toggleButton.evaluate(async (element) => {
        element.querySelector('button').click()
        await new Promise(requestAnimationFrame)

        return element
          .closest('[data-visual-test]')
          .getAnimations({ subtree: true })
          .filter((animation) => animation instanceof CSSTransition)
          .map((animation) =>
            [
              (animation.effect as KeyframeEffect).target.getAttribute(
                'class'
              ),
              animation.transitionProperty,
            ].join(': ')
          )
      })

      await expect(toggleButton).toHaveClass(/dnb-toggle-button--checked/)
      expect(transitions).toEqual([])
    })
  }
})
