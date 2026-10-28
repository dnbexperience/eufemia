import { test, expect } from '@playwright/test'

const skeletons = [
  '[data-visual-test="skeleton-exclude"] h2.dnb-skeleton--font',
  '[data-visual-test="skeleton-exclude"] .dnb-input__shell',
  '.dnb-live-preview button.dnb-skeleton--shape',
]

for (const theme of ['ui', 'sbanken']) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`keeps text and shapes moving in ${theme} ${colorScheme}`, async ({
      page,
    }) => {
      await page.emulateMedia({
        colorScheme,
        reducedMotion: 'no-preference',
      })
      await page.goto(
        `/uilib/components/skeleton/demos/?eufemia-theme=${theme}`
      )

      for (const selector of skeletons) {
        const skeleton = page.locator(selector).first()
        await expect(skeleton).toBeVisible()

        const positions = []
        for (const time of [65000, 65300]) {
          await page.evaluate((time) => {
            for (const animation of document.getAnimations()) {
              animation.pause()
              animation.currentTime = time
            }
          }, time)

          positions.push(
            await skeleton.evaluate((element) => {
              const pseudo = element.classList.contains(
                'dnb-skeleton--shape'
              )
                ? '::after'
                : null

              return getComputedStyle(element, pseudo).backgroundPositionX
            })
          )
        }

        expect(positions[1], selector).not.toBe(positions[0])
      }
    })
  }
}

test('disables text and shape motion when reduced motion is requested', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/uilib/components/skeleton/demos/')

  for (const selector of skeletons) {
    const skeleton = page.locator(selector).first()
    await expect(skeleton).toBeVisible()
    expect(
      await skeleton.evaluate((element) => {
        const pseudo = element.classList.contains('dnb-skeleton--shape')
          ? '::after'
          : null

        return getComputedStyle(element, pseudo).animationName
      })
    ).toBe('none')
  }
})
