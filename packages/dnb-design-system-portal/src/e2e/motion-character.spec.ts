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
  await expect(
    page.getByRole('heading', {
      name: 'How motion should feel',
      exact: true,
    })
  ).toHaveCount(0)
  await page
    .getByRole('main')
    .getByRole('link', { name: 'Animation Principles', exact: true })
    .click()
  await expect(page).toHaveURL(
    /\/quickguide-designer\/animation-principles\/?$/
  )
  await expect(page.locator('.dnb-motion-character')).toBeVisible()
})

test('motion character is a proposal with selectable, weighted qualities', async ({
  page,
}) => {
  const character = page.locator('.dnb-motion-character')
  await expect(
    page.getByText(/This is a proposal for discussion/)
  ).toBeVisible()
  await expect(character.getByRole('button')).toHaveCount(13)
  await expect(character.locator('[aria-pressed="true"]')).toHaveCount(1)
  for (const button of await character.getByRole('button').all()) {
    const name = await button.textContent()
    await button.click()
    await expect(button).toHaveAttribute('aria-pressed', 'true')
    await expect(character.getByRole('status')).toContainText(name.trim())
    await expect(character.locator('[aria-pressed="true"]')).toHaveCount(1)
  }
  const sizes = await character.evaluate((element) =>
    ['lead', 'support', 'accent'].map(
      (group) =>
        element
          .querySelector(`.dnb-motion-character__group--${group} button`)
          .getBoundingClientRect().width
    )
  )
  expect(sizes[0]).toBeGreaterThan(sizes[1])
  expect(sizes[1]).toBeGreaterThan(sizes[2])
  await expect(
    page.locator('.dnb-motion-character__spectrums > li')
  ).toHaveCount(8)
  await expect(page.getByRole('slider')).toHaveCount(0)
  const spectrums = page.locator('.dnb-motion-character__spectrums')
  await expect(spectrums.getByRole('progressbar')).toHaveCount(8)
  await expect(
    spectrums.locator('.dnb-progress-indicator--no-animation')
  ).toHaveCount(8)
  const values = [86, 88, 86, 62, 82, 82, 88, 56]
  const bars = await spectrums.getByRole('progressbar').all()
  for (let index = 0; index < bars.length; index++) {
    const bar = bars[index]
    const labels = spectrums
      .locator('.dnb-motion-character__labels')
      .nth(index)
    const desired = labels.locator('strong')
    const emphasis = labels.locator('span')
    await expect(emphasis).toHaveText(
      values[index] >= 80 ? 'Strong emphasis' : 'In moderation'
    )
    await expect(bar).toHaveAccessibleName(
      new RegExp(
        `${await desired.textContent()}: ${await emphasis.textContent()}\\.`
      )
    )
    const filled = await bar.evaluate((element) => {
      const fill = element.querySelector(
        '.dnb-progress-indicator__linear__bar'
      )
      const transform = new DOMMatrix(getComputedStyle(fill).transform)
      return 100 * (1 + transform.m41 / fill.getBoundingClientRect().width)
    })
    expect(filled).toBeCloseTo(values[index])
  }
  const calm = spectrums.locator('li').first()
  await expect(
    calm.locator('.dnb-motion-character__labels')
  ).not.toContainText('Overwhelming')
  const contrast = calm.getByText('Rather than overwhelming.', {
    exact: true,
  })
  await expect(contrast).toBeVisible()
  expect(
    await contrast.evaluate(
      (element) => element.getBoundingClientRect().top
    )
  ).toBeGreaterThan(
    await bars[0].evaluate(
      (element) => element.getBoundingClientRect().bottom
    )
  )
})

test('bubble selection supports keyboard navigation and visible focus', async ({
  page,
}) => {
  const focused = page.getByRole('button', {
    name: 'Focused',
    exact: true,
  })
  await focused.focus()
  await page.keyboard.press('Enter')
  await expect(focused).toHaveAttribute('aria-pressed', 'true')
  await expect(focused).toHaveCSS('outline-style', 'solid')
  await page.keyboard.press('Tab')
  const calm = page.getByRole('button', { name: 'Calm', exact: true })
  await expect(calm).toBeFocused()
  await page.keyboard.press('Space')
  await expect(calm).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('status')).toContainText(
    'Let the rest of the interface stay still.'
  )
})

for (const width of [320, 1280]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`motion character fits at ${width}px in ${colorScheme} mode with reduced motion`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme })
      const root = page.locator('.dnb-motion-character')
      await expect(root).toBeVisible()
      for (const element of await page
        .locator(
          '.dnb-motion-character__bubble, .dnb-motion-character__spectrums .dnb-progress-indicator'
        )
        .all()) {
        const bounds = await element.boundingBox()
        expect(bounds.x).toBeGreaterThanOrEqual(0)
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
      }
      expect(
        await root.evaluate(
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
