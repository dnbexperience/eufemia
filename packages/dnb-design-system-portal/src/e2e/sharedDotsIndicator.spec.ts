import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

const selectors = {
  ai: '.dnb-ai-message-indicator__dots',
  form: '[data-visual-test="submit-indicator-with-label"] .dnb-forms-submit-indicator__content',
}

for (const kind of ['ai', 'form'] as const) {
  test(`${kind} indicator uses shared dots with reduced motion support`, async ({
    page,
  }) => {
    if (kind === 'ai') {
      await page.goto('/uilib/extensions/ai/MessageIndicator/demos/')
    } else {
      await page.goto(
        '/uilib/extensions/forms/Form/SubmitIndicator/demos/'
      )
    }
    await waitForApp(page)
    const indicator = page.locator(selectors[kind]).first()
    const dots = indicator.locator('.dnb-dots-indicator__dot')
    await expect(dots).toHaveCount(3)
    for (const dot of await dots.all()) {
      await expect(dot).toHaveAttribute('aria-hidden', 'true')
      await expect(dot).toHaveCSS(
        'animation-name',
        'dnb-dots-indicator-dot'
      )
      await expect(dot).toHaveCSS('animation-duration', '1.2s')
    }
    const sizes = await dots.evaluateAll((elements) =>
      elements.map((element) => ({
        width: getComputedStyle(element).width,
        height: getComputedStyle(element).height,
        delay: getComputedStyle(element).animationDelay,
      }))
    )
    expect(sizes.map(({ delay }) => delay)).toEqual([
      '0.05s',
      '0.2s',
      '0.4s',
    ])
    expect(sizes.every(({ width, height }) => width === height)).toBe(true)
    await page.emulateMedia({ reducedMotion: 'reduce' })
    for (const dot of await dots.all()) {
      await expect(dot).toHaveCSS('animation-name', 'none')
      await expect(dot).toHaveCSS('opacity', '0.6')
      await expect(dot).toHaveCSS('transform', 'none')
    }
    if (kind === 'ai') {
      await expect(indicator).toHaveAttribute('aria-hidden', 'true')
      await expect(
        page
          .locator('.dnb-ai-message-indicator')
          .first()
          .getByRole('status')
      ).toHaveText('Skriver svar …')
      await expect(dots.first()).toHaveCSS('width', '8px')
    } else {
      await expect(indicator).toHaveAttribute('role', 'status')
      await expect(indicator).toHaveAttribute('aria-busy', 'true')
      await expect(indicator).toHaveAccessibleName('Vennligst vent')
      const fontSize = await indicator.evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize)
      )
      expect(parseFloat(sizes[0].width)).toBe(fontSize * 0.25)
    }
  })
}
