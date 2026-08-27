import { expect, test } from '@playwright/test'

test.describe('openOnFind', () => {
  test('selects the tab from native fragment navigation', async ({
    page,
  }) => {
    await page.goto('/uilib/components/tabs/demos')

    const example = page.locator('[data-visual-test="tabs-open-on-find"]')
    const matchingContent = example.locator('#open-on-find-tab-match')
    const matchingTab = example.getByRole('tab', { name: 'Tab 2' })

    await expect(matchingTab).toHaveAttribute('aria-selected', 'false')
    await expect(matchingContent).toBeHidden()

    await page.evaluate(() => {
      window.location.hash = 'open-on-find-tab-match'
    })

    await expect(matchingTab).toHaveAttribute('aria-selected', 'true')
    await expect(matchingContent).toBeVisible()
  })

  test('expands the table row from native fragment navigation', async ({
    page,
  }) => {
    await page.goto('/uilib/components/table/demos')

    const example = page.locator('[data-visual-test="table-accordion"]')
    const table = example.locator('table').first()
    const matchingContent = table.locator(
      '#accordion-table-1-open-on-find-match'
    )
    const row = matchingContent.locator('xpath=ancestor::tr')
    const toggle = row.locator('xpath=preceding-sibling::tr[1]//button')

    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(row).toHaveAttribute('hidden', 'until-found')

    await page.evaluate(() => {
      window.location.hash = 'accordion-table-1-open-on-find-match'
    })

    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(matchingContent).toBeVisible()
  })
})
