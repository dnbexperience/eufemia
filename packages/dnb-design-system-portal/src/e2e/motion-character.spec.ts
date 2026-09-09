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
  await expect(
    page.locator('.dnb-motion-priorities, .dnb-motion-rings')
  ).toHaveCount(0)
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
  await expect(page.locator('.dnb-motion-priorities')).toBeVisible()
  await expect(page.locator('.dnb-motion-rings')).toBeVisible()
})

test('motion character proposals communicate the same priority hierarchy', async ({
  page,
}) => {
  const main = page.getByRole('main')
  const priorities = page.locator('.dnb-motion-priorities')
  const rings = page.locator('.dnb-motion-rings')
  await expect(
    page.getByText(/These are proposals for discussion/)
  ).toBeVisible()
  await expect(priorities).not.toHaveCSS('--outline-width', '0px')
  await expect(rings).toHaveCSS('--outline-width', '0px')

  const priorityHeading = page.getByRole('heading', {
    name: 'Purpose before delight',
    exact: true,
  })
  const ringsHeading = page.getByRole('heading', {
    name: 'Purpose at the core',
    exact: true,
  })
  expect(
    await priorityHeading.evaluate(
      (heading) => heading.getBoundingClientRect().top
    )
  ).toBeLessThan(
    await ringsHeading.evaluate(
      (heading) => heading.getBoundingClientRect().top
    )
  )

  await expect(priorities.locator('figure')).toHaveAccessibleName(
    'Motion priority graph'
  )
  await expect(priorities.locator('ol')).toHaveCSS('row-gap', '32px')
  const alignment = await priorities.evaluate((card) => {
    const cardBounds = card.getBoundingClientRect()
    const figureBounds = card
      .querySelector('figure')
      .getBoundingClientRect()

    return {
      left: figureBounds.left - cardBounds.left,
      right: cardBounds.right - figureBounds.right,
    }
  })
  expect(alignment.left).toBeCloseTo(alignment.right)
  await expect(priorities.locator('li')).toHaveCount(3)
  await expect(priorities.locator('li').nth(0)).toContainText(
    'PurposefulEvery motion'
  )
  await expect(priorities.locator('li').nth(1)).toContainText(
    'GuidingWhen it helps'
  )
  await expect(priorities.locator('li').nth(2)).toContainText(
    'DelightfulA finishing touch'
  )
  const priorityWidths = await priorities
    .locator('.dnb-motion-priorities__bar')
    .evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().width)
    )
  expect(priorityWidths[0]).toBeGreaterThan(priorityWidths[1])
  expect(priorityWidths[1]).toBeGreaterThan(priorityWidths[2])

  await expect(rings.locator('figure')).toHaveAccessibleName(
    'Motion priority rings'
  )
  await expect(
    rings.locator(
      '.dnb-motion-rings__ring--delightful > .dnb-motion-rings__ring--guiding > .dnb-motion-rings__ring--purposeful'
    )
  ).toHaveCount(1)
  await expect(
    rings.locator('.dnb-motion-rings__ring > strong')
  ).toHaveText(['Delightful', 'Guiding', 'Purposeful'])
  const ringSizes = await rings
    .locator('.dnb-motion-rings__ring')
    .evaluateAll((elements) =>
      elements.map((element) => {
        const { width, height } = element.getBoundingClientRect()
        return { width, height }
      })
    )
  for (const { width, height } of ringSizes) {
    expect(width).toBeCloseTo(height)
  }
  expect(ringSizes[0].width).toBeGreaterThan(ringSizes[1].width)
  expect(ringSizes[1].width).toBeGreaterThan(ringSizes[2].width)
  for (const ring of await rings
    .locator('.dnb-motion-rings__ring')
    .all()) {
    await expect(ring).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(ring).toHaveCSS('border-style', 'solid')
  }

  await expect(main.getByRole('button')).toHaveCount(0)
  await expect(main.getByRole('progressbar')).toHaveCount(0)
  await expect(
    page.getByRole('heading', {
      name: 'A little character, a clear purpose',
      exact: true,
    })
  ).toHaveCount(0)
  await expect(
    page.getByRole('heading', {
      name: 'Finding the balance',
      exact: true,
    })
  ).toHaveCount(0)
})

for (const width of [320, 1280]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`motion graphs fit at ${width}px in ${colorScheme} mode with reduced motion`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ reducedMotion: 'reduce', colorScheme })
      const roots = page.locator(
        '.dnb-motion-priorities, .dnb-motion-rings'
      )
      await expect(roots).toHaveCount(2)
      for (const element of await page
        .locator(
          '.dnb-motion-priorities__bar, .dnb-motion-rings__ring--delightful'
        )
        .all()) {
        const bounds = await element.boundingBox()
        expect(bounds.x).toBeGreaterThanOrEqual(0)
        expect(bounds.x + bounds.width).toBeLessThanOrEqual(width)
      }
      for (const root of await roots.all()) {
        expect(
          await root.evaluate(
            (element) => element.getAnimations({ subtree: true }).length
          )
        ).toBe(0)
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth
        )
      ).toBe(true)
    })
  }
}
