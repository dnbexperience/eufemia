import { test, expect, type Locator, type Page } from '@playwright/test'

// Skeleton and Dialog set --border-color (and Dialog also --border-width)
// on a parent element. Clickable cells and rows must not take them over.

function getBorders(locator: Locator) {
  return locator.evaluateAll((elements) =>
    elements.map((element) => {
      const style = getComputedStyle(element, '::before')
      return `${style.borderTopWidth} ${style.borderTopColor}`
    })
  )
}

// Clickable rows keep their own border width, so only check the color
function getColor(border: string) {
  return border.slice(border.indexOf(' ') + 1)
}

function getParentBorderColor(table: Locator) {
  return table.evaluate((element) =>
    getComputedStyle(element).getPropertyValue('--border-color').trim()
  )
}

async function waitForPortal(page: Page) {
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
}

test.describe('Clickable cells and rows', () => {
  test('should not show a border from a Skeleton', async ({ page }) => {
    await page.goto('/uilib/components/table/demos/?skeleton')
    await waitForPortal(page)

    const rowsTable = page
      .locator('[data-visual-test="table-accordion"] table.dnb-skeleton')
      .first()
    const cellsTable = page
      .locator(
        '[data-visual-test="table-navigation-cell"] table.dnb-skeleton'
      )
      .first()
    expect(await getParentBorderColor(rowsTable)).not.toBe('')
    expect(await getParentBorderColor(cellsTable)).not.toBe('')

    // Expanded rows show their own outline
    const rows = await getBorders(
      rowsTable.locator(
        'tr.dnb-table__tr--clickable:not(.dnb-table__tr--expanded) > td'
      )
    )
    const cells = await getBorders(
      cellsTable.locator('.dnb-table__td__button')
    )

    expect(rows.length).toBeGreaterThan(0)
    expect(cells.length).toBeGreaterThan(0)
    expect(new Set(rows.map(getColor))).toEqual(
      new Set(['rgba(0, 0, 0, 0)'])
    )
    expect(new Set(cells)).toEqual(new Set(['0px rgba(0, 0, 0, 0)']))
  })

  test('should not show a border from a Dialog', async ({ page }) => {
    await page.goto(
      '/uilib/components/table/visual-tests/inside-dialog/?data-visual-test'
    )
    await waitForPortal(page)

    const table = page.locator('[data-visual-test="table-inside-dialog"]')
    expect(await getParentBorderColor(table)).not.toBe('')

    const rows = await getBorders(
      table.locator('tr.dnb-table__tr--clickable > td')
    )
    const cells = await getBorders(table.locator('.dnb-table__td__button'))

    expect(rows.length).toBeGreaterThan(0)
    expect(new Set(rows.map(getColor))).toEqual(
      new Set(['rgba(0, 0, 0, 0)'])
    )
    expect(cells).toEqual(['0px rgba(0, 0, 0, 0)'])
  })
})
