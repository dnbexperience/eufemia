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
      await expect(page.locator(skeletons[0]).first()).toBeVisible()

      await page.evaluate(() => {
        for (const animation of document.getAnimations()) {
          animation.pause()
          animation.currentTime = 1999
        }
      })
      for (const selector of skeletons) {
        const skeleton = page.locator(selector).first()
        await expect(skeleton).toBeVisible()
        const background = await skeleton.evaluate((element) => {
          const pseudo = element.classList.contains('dnb-skeleton--shape')
            ? '::after'
            : null
          return getComputedStyle(element, pseudo).backgroundImage
        })
        expect(background).toBe('none')
      }

      for (const selector of skeletons) {
        const skeleton = page.locator(selector).first()
        await expect(skeleton).toBeVisible()
        const timing = await skeleton.evaluate((element) => {
          const pseudo = element.classList.contains('dnb-skeleton--shape')
            ? '::after'
            : null
          const style = getComputedStyle(element, pseudo)
          return [
            style.animationDelay,
            style.animationDuration,
            style.animationIterationCount,
          ]
        })
        expect(timing).toEqual(['2s', '2s', '20'])

        const positions = []
        for (const time of [3500, 3800]) {
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
        const background = await skeleton.evaluate((element) => {
          const pseudo = element.classList.contains('dnb-skeleton--shape')
            ? '::after'
            : null
          const style = getComputedStyle(element, pseudo)
          return style.backgroundImage
        })
        expect(background).not.toBe('none')
      }

      await page.evaluate(() => {
        for (const animation of document.getAnimations()) {
          animation.currentTime = 42000
        }
      })
      for (const selector of skeletons) {
        const skeleton = page.locator(selector).first()
        const background = await skeleton.evaluate((element) => {
          const pseudo = element.classList.contains('dnb-skeleton--shape')
            ? '::after'
            : null
          const style = getComputedStyle(element, pseudo)
          return style.backgroundImage
        })
        expect(background).toBe('none')
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

test('keeps disabled skeletons solid, including wide controls', async ({
  page,
}) => {
  await page.goto(
    '/uilib/components/skeleton/demos/?data-visual-test=true'
  )
  const controls = page.locator(
    '[data-visual-test="skeleton-all-vertical"] .dnb-skeleton--shape'
  )
  await expect(controls.first()).toBeVisible()
  for (const control of await controls.all()) {
    const background = await control.evaluate((element) => {
      const style = getComputedStyle(element, '::after')
      return style.backgroundImage
    })
    expect(background).toBe('none')
  }
})
