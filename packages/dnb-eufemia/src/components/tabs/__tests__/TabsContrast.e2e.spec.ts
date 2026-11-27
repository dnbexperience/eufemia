import { expect, test } from '@playwright/test'
import { contrastRatio } from '../../../../scripts/figma/tokenReview'

test('keeps an enabled tab readable on the information surface', async ({
  page,
}) => {
  await page.goto('/web/components/tabs/demos/')
  const tab = page
    .locator('[data-visual-test="tabs-section-styles"]')
    .getByRole('tab', { name: 'Second' })
  await expect(tab).toBeEnabled()
  await expect(tab).toHaveAttribute('aria-selected', 'false')
  const colors = await tab.evaluate((button) => ({
    label: getComputedStyle(
      button.querySelector('.dnb-tabs__button__title')
    ).color,
    surface: getComputedStyle(button.closest('.dnb-section--information'))
      .backgroundColor,
  }))
  expect(
    contrastRatio(colors.label, colors.surface, '#fff')
  ).toBeGreaterThanOrEqual(4.5)
})
