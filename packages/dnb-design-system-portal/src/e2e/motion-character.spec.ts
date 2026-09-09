import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.beforeEach(async ({ page }) => {
  await page.goto('/quickguide-designer/animation-principles/')
  await waitForApp(page)
})

test('motion character belongs to animation principles, not design principles', async ({
  page,
}) => {
  await expect(
    page.getByRole('heading', {
      name: 'How motion should feel',
      exact: true,
    })
  ).toBeVisible()
  await page.goto('/quickguide-designer/design-principles/')
  await waitForApp(page)
  await expect(page.locator('.dnb-motion-character')).toHaveCount(0)
  await page
    .getByRole('main')
    .getByRole('link', { name: 'Animation Principles', exact: true })
    .click()
  await expect(page).toHaveURL(
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await expect(page.locator('.dnb-motion-character')).toBeVisible()
})

test('motion character presents one segmented priority bar', async ({
  page,
}) => {
  const character = page.locator('.dnb-motion-character')
  await expect(
    page.getByRole('heading', {
      name: 'Purpose at the core',
      exact: true,
    })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', {
      name: 'Purpose before delight',
      exact: true,
    })
  ).toHaveCount(0)
  await expect(character).toHaveCSS('--outline-width', '0px')
  await expect(character.locator('figure')).toHaveAccessibleName(
    'Motion character priority'
  )
  await expect(
    character.locator('.dnb-motion-character__bar')
  ).toHaveCount(1)
  await expect(
    character.locator('.dnb-motion-character__segment')
  ).toHaveCount(3)
  await expect(
    character.locator('.dnb-motion-character__item')
  ).toHaveCount(3)
  await expect(
    character.locator('.dnb-motion-character__item').nth(0)
  ).toContainText('PurposefulEvery motion')
  await expect(
    character.locator('.dnb-motion-character__item').nth(1)
  ).toContainText('GuidingWhen it helps')
  await expect(
    character.locator('.dnb-motion-character__item').nth(2)
  ).toContainText('DelightfulA finishing touch')

  const widths = await character
    .locator('.dnb-motion-character__segment')
    .evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().width)
    )
  expect(widths[0]).toBeGreaterThan(widths[1])
  expect(widths[1]).toBeGreaterThan(widths[2])
  expect(
    widths[0] / widths.reduce((sum, width) => sum + width, 0)
  ).toBeCloseTo(0.6)
  const colors = await character.evaluate((element) => {
    const variants = ['purposeful', 'guiding', 'delightful']
    const tokens = ['intense', 'bold', 'base']

    return variants.map((variant, index) => {
      const segment = element.querySelector<HTMLElement>(
        `.dnb-motion-character__segment--${variant}`
      )!
      const swatch = element.querySelector<HTMLElement>(
        `.dnb-motion-character__swatch--${variant}`
      )!
      const probe = document.createElement('span')
      probe.style.backgroundColor = `var(--token-color-decorative-first-${tokens[index]})`
      element.appendChild(probe)
      const tokenColor = getComputedStyle(probe).backgroundColor
      probe.remove()

      return {
        segment: getComputedStyle(segment).backgroundColor,
        swatch: getComputedStyle(swatch).backgroundColor,
        tokenColor,
      }
    })
  })
  for (const { segment, swatch, tokenColor } of colors) {
    expect(segment).toBe(tokenColor)
    expect(swatch).toBe(tokenColor)
  }
  await expect(character.getByRole('button')).toHaveCount(0)
  await expect(character.getByRole('progressbar')).toHaveCount(0)
})

for (const width of [320, 1280]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`motion character fits at ${width}px in ${colorScheme} mode with reduced motion`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme })
      const character = page.locator('.dnb-motion-character')
      await expect(character).toBeVisible()
      for (const element of await character
        .locator('.dnb-motion-character__bar, .dnb-motion-character__item')
        .all()) {
        const bounds = await element.boundingBox()
        expect(bounds.x).toBeGreaterThanOrEqual(0)
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
      }
      expect(
        await character.evaluate(
          (element) => element.getAnimations({ subtree: true }).length
        )
      ).toBe(0)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
    })
  }
}
