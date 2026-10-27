import { test, expect } from '@playwright/test'

test('panel close action follows content and viewport height', async ({
  page,
}) => {
  await page.setViewportSize({ width: 960, height: 800 })
  await page.goto('/web/components/filter/visual-tests/panel-actions/')

  const shortPanel = page.locator(
    '[data-visual-test="filter-short-panel"]'
  )
  const tallPanel = page.locator('[data-visual-test="filter-tall-panel"]')
  const closeButton = tallPanel.locator('.dnb-filter__panel-close')
  const category = tallPanel.getByRole('button', {
    name: 'Kategori',
    exact: true,
  })
  const toggle = tallPanel.getByRole('button', {
    name: 'Filter',
    exact: true,
  })

  await expect(shortPanel.locator('.dnb-filter__panel')).toBeVisible()
  await expect(shortPanel.locator('.dnb-filter__panel-close')).toHaveCount(
    0
  )
  await expect(shortPanel.locator('.dnb-filter__hr')).toHaveCount(0)
  await expect(closeButton).toBeVisible()

  await closeButton.scrollIntoViewIfNeeded()
  await expect(closeButton).toBeVisible()

  await category.click()
  await expect(closeButton).toHaveCount(0)
  await category.click()
  await expect(closeButton).toBeVisible()

  await page.setViewportSize({ width: 960, height: 1800 })
  await expect(closeButton).toHaveCount(0)
  await page.setViewportSize({ width: 375, height: 667 })
  await expect(closeButton).toBeVisible()
  await closeButton.click()
  await expect(toggle).toBeFocused()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')

  const clearButton = shortPanel.getByRole('button', {
    name: 'Fjern alle',
    exact: true,
  })
  await expect(clearButton.locator('.dnb-icon')).toHaveCount(0)
  await clearButton.click()
  await expect(shortPanel.locator('.dnb-tag')).toHaveCount(0)
})
