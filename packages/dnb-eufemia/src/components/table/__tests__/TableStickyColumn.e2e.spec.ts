import { test, expect } from '@playwright/test'
import type { Locator } from '@playwright/test'

test.describe('Table sticky column', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 720 })
    await page.goto('/web/components/table/visual-tests/sticky-header/')
    await page.getByRole('button', { name: 'Sticky column: none' }).click()
    await expect(page.locator('table')).toHaveClass(
      /dnb-table--sticky-column-first/
    )
    await expect(page.locator('thead tr')).toHaveAttribute(
      'data-page-scroll'
    )
  })

  test('keeps the first column in view while the header follows page scrolling', async ({
    page,
  }) => {
    const table = page.locator('.dnb-table')
    const scrollView = page.locator('.dnb-table__scroll-view')
    const headerCell = table.locator('thead th').first()
    const bodyCell = table
      .locator('tbody tr')
      .nth(20)
      .locator('td')
      .first()
    const leftInScrollView = async (cell: Locator) =>
      (await cell.boundingBox()).x - (await scrollView.boundingBox()).x

    await test.step('shows a divider only while columns are scrolled underneath', async () => {
      await expect(table).not.toHaveAttribute('data-sticky-column-overlap')

      await scrollView.evaluate((element) => {
        element.scrollLeft = 300
      })
      await expect(scrollView).toHaveJSProperty('scrollLeft', 300)
      await expect(table).toHaveAttribute('data-sticky-column-overlap')
    })

    await test.step('keeps the first cells at the start of the scroll view', async () => {
      await page.evaluate(() => window.scrollTo(0, 1000))

      await expect
        .poll(() => leftInScrollView(headerCell))
        .toBeCloseTo(0, 0)
      await expect.poll(() => leftInScrollView(bodyCell)).toBeCloseTo(0, 0)
      await expect
        .poll(async () => (await headerCell.boundingBox()).y)
        .toBeCloseTo(56, 0)
    })

    await test.step('hides the divider when scrolled back to the start', async () => {
      await scrollView.evaluate((element) => {
        element.scrollLeft = 0
      })
      await expect(table).not.toHaveAttribute('data-sticky-column-overlap')
    })
  })

  test('scrolls focused cells into view next to the sticky column', async ({
    page,
  }) => {
    const scrollView = page.locator('.dnb-table__scroll-view')
    const row = page.locator('.dnb-table tbody tr').nth(2)
    const stickyCell = row.locator('td').first()

    await row
      .locator('td')
      .nth(1)
      .evaluate((cell) => {
        const link = document.createElement('a')
        link.href = '#'
        link.textContent = 'Details'
        cell.replaceChildren(link)
      })
    // The second column is then underneath the sticky column, but still inside the scroll view
    const scrollLeft = await scrollView.evaluate((element) => {
      const left = element.querySelector('td').offsetWidth
      element.scrollTo({ left, behavior: 'instant' })
      return left
    })
    await expect(scrollView).toHaveJSProperty('scrollLeft', scrollLeft)

    await row.getByRole('link', { name: 'Details' }).focus()

    await expect
      .poll(async () => {
        const link = await row.getByRole('link').boundingBox()
        const sticky = await stickyCell.boundingBox()
        return link.x - (sticky.x + sticky.width)
      })
      .toBeGreaterThanOrEqual(0)
  })
})
