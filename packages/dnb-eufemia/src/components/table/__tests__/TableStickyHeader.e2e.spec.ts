import { test, expect } from '@playwright/test'

test.describe('Table sticky header', () => {
  test('prints a scrolled header above the body rows', async ({
    page,
  }) => {
    await page.goto('/uilib/components/table/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )

    const table = page
      .getByRole('heading', { name: 'Table with sticky header' })
      .locator('xpath=following::table[1]')
    const thead = table.locator('thead')
    const header = thead.locator('tr.sticky')

    // The transform moves the row, but not the thead box around it.
    // Measure both in one call, as the page can still shift in between.
    const headerOffset = () =>
      thead.evaluate(
        (element) =>
          element.querySelector('tr').getBoundingClientRect().top -
          element.getBoundingClientRect().top
      )
    await page.emulateMedia({ media: 'print' })
    const printedOffset = await headerOffset()
    await page.emulateMedia({ media: 'screen' })

    // Scroll past the top of the table, so the header follows the viewport
    await table.evaluate((element) => {
      window.scrollTo(
        0,
        element.getBoundingClientRect().top + window.scrollY + 100
      )
    })
    await expect(header).toHaveClass(/is-sticky/)
    await expect
      .poll(() =>
        header.evaluate(
          (element) =>
            parseFloat(element.style.getPropertyValue('--table-offset')) ||
            0
        )
      )
      .toBeGreaterThan(0)

    // The offset stays set while printing, so print media must ignore it
    await page.emulateMedia({ media: 'print' })
    await expect(header).toHaveCSS('transform', 'none')
    expect(await headerOffset()).toBeCloseTo(printedOffset, 0)
  })
})
