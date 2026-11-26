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
        element.scrollLeft = 200
      })
      await expect(scrollView).toHaveJSProperty('scrollLeft', 200)
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

  // Browsers only scroll elements into view that are fully hidden
  test('scrolls partly hidden elements fully into view next to the sticky column', async ({
    page,
    browserName,
  }) => {
    const scrollView = page.locator('.dnb-table__scroll-view')
    const row = page.locator('.dnb-table tbody tr').nth(2)
    const addButtons = (cellIndexes: Array<number>) =>
      row.evaluate((tr: HTMLTableRowElement, cellIndexes) => {
        Array.from(tr.querySelectorAll('button')).forEach((button) => {
          button.remove()
        })
        cellIndexes.forEach((index) => {
          const button = document.createElement('button')
          button.type = 'button'
          button.textContent = `Account details ${index}`
          tr.cells[index].replaceChildren(button)
        })
      }, cellIndexes)

    // Scrolls the button 40px underneath the sticky column
    const coverButton = (name: string, side: 'first' | 'last') =>
      scrollView.evaluate(
        (element, { name, side }) => {
          const button = Array.from(
            element.querySelectorAll('button')
          ).find((button) => button.textContent === name)
          const row = button.closest('tr')
          const sticky = (
            side === 'first'
              ? row.cells[0]
              : row.cells[row.cells.length - 1]
          ).getBoundingClientRect()
          const rect = button.getBoundingClientRect()
          const offset =
            side === 'first'
              ? rect.left - sticky.right + 40
              : rect.right - sticky.left - 40
          element.scrollTo({
            left: element.scrollLeft + offset,
            behavior: 'instant',
          })
        },
        { name, side }
      )
    const hiddenWidth = (name: string, side: 'first' | 'last') =>
      row.evaluate(
        (tr: HTMLTableRowElement, { name, side }) => {
          const button = Array.from(tr.querySelectorAll('button')).find(
            (button) => button.textContent === name
          )
          const sticky = (
            side === 'first' ? tr.cells[0] : tr.cells[tr.cells.length - 1]
          ).getBoundingClientRect()
          const rect = button.getBoundingClientRect()
          return side === 'first'
            ? sticky.right - rect.left
            : rect.right - sticky.left
        },
        { name, side }
      )

    await test.step('with the first column, when tabbing backwards', async () => {
      await addButtons([3, 6])
      await coverButton('Account details 3', 'first')
      await expect
        .poll(() => hiddenWidth('Account details 3', 'first'))
        .toBeGreaterThan(0)

      await row.getByRole('button', { name: 'Account details 6' }).focus()
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Shift+Tab' : 'Shift+Tab'
      )

      await expect(
        row.getByRole('button', { name: 'Account details 3' })
      ).toBeFocused()
      await expect
        .poll(() => hiddenWidth('Account details 3', 'first'))
        .toBeLessThanOrEqual(0)
    })

    await test.step('with the last column, when tabbing forwards', async () => {
      await page
        .getByRole('button', { name: 'Sticky column: first' })
        .click()
      await expect(page.locator('table')).toHaveClass(
        /dnb-table--sticky-column-last/
      )
      await addButtons([4, 7])
      await coverButton('Account details 7', 'last')
      await expect
        .poll(() => hiddenWidth('Account details 7', 'last'))
        .toBeGreaterThan(0)

      await row.getByRole('button', { name: 'Account details 4' }).focus()
      await page.keyboard.press(
        browserName === 'webkit' ? 'Alt+Tab' : 'Tab'
      )

      await expect(
        row.getByRole('button', { name: 'Account details 7' })
      ).toBeFocused()
      await expect
        .poll(() => hiddenWidth('Account details 7', 'last'))
        .toBeLessThanOrEqual(0)
    })
  })

  // Forced colors remove box shadows, which draw the divider
  test('keeps the divider in forced colors', async ({ page }) => {
    const scrollView = page.locator('.dnb-table__scroll-view')
    const stickyCell = page.locator('.dnb-table tbody td').first()

    await page.emulateMedia({ forcedColors: 'active' })
    await scrollView.evaluate((element) => {
      element.scrollTo({ left: 200, behavior: 'instant' })
    })
    await expect(page.locator('table')).toHaveAttribute(
      'data-sticky-column-overlap'
    )

    await expect(stickyCell).not.toHaveCSS('box-shadow', 'none')
  })

  test('keeps the scroll position when an element in the sticky column gets focus', async ({
    page,
  }) => {
    const scrollView = page.locator('.dnb-table__scroll-view')
    const row = page.locator('.dnb-table tbody tr').nth(2)

    await row
      .locator('td')
      .first()
      .evaluate((cell) => {
        const link = document.createElement('a')
        link.href = '#'
        link.textContent = 'Day'
        cell.replaceChildren(link)
      })
    await scrollView.evaluate((element) => {
      element.scrollTo({ left: 200, behavior: 'instant' })
    })
    await expect(scrollView).toHaveJSProperty('scrollLeft', 200)

    const link = row.getByRole('link', { name: 'Day' })
    await link.focus()

    // Browsers scroll the focused element into view with some delay, so do it at once
    await link.evaluate((element) =>
      element.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
        behavior: 'instant',
      })
    )

    await expect(scrollView).toHaveJSProperty('scrollLeft', 200)
  })

  // At the last row, the header draws the bottom of the outline with rounded corners
  test('keeps the corners of the sticky cell square at the last row while columns are scrolled underneath', async ({
    page,
  }) => {
    const table = page.locator('.dnb-table')
    const stickyCell = table.locator('thead th').first()
    await table.evaluate((element) => {
      element.classList.add('dnb-table--outline')
      element.parentElement.scrollTo({ left: 200, behavior: 'instant' })
      const headerHeight = element.querySelector('thead tr').clientHeight
      const { bottom } = element.getBoundingClientRect()
      window.scrollTo(0, window.scrollY + bottom - 56 - headerHeight + 10)
    })

    await expect(table.locator('thead tr')).toHaveAttribute(
      'data-is-at-end'
    )
    await expect(table).toHaveAttribute('data-sticky-column-overlap')
    await expect(stickyCell).toHaveCSS('border-bottom-left-radius', '0px')
    expect(
      await stickyCell.evaluate(
        (element) =>
          getComputedStyle(element, '::after').borderBottomLeftRadius
      )
    ).toBe('0px')
  })

  test('gives row headers in key/value rows an opaque background', async ({
    page,
  }) => {
    const scrollView = page.locator('.dnb-table__scroll-view')
    const row = page.locator('.dnb-table tbody tr').nth(1)

    // Make a key/value row: a row header (<Th scope="row">) and one value cell
    await row.evaluate((tr: HTMLTableRowElement) => {
      const th = document.createElement('th')
      th.className = 'dnb-table__th'
      th.scope = 'row'
      th.textContent = 'Key'
      tr.cells[0].replaceWith(th)
      while (tr.cells.length > 2) {
        tr.cells[2].remove()
      }
      tr.cells[1].textContent =
        'A value that is wider than the visible area '.repeat(4)
    })
    await scrollView.evaluate((element) => {
      element.scrollTo({ left: 200, behavior: 'instant' })
    })
    await expect(scrollView).toHaveJSProperty('scrollLeft', 200)

    const backgroundOf = (selector: string) =>
      row
        .locator(selector)
        .evaluate((cell) => getComputedStyle(cell).backgroundColor)

    expect(await backgroundOf('td')).not.toBe('rgba(0, 0, 0, 0)')
    expect(await backgroundOf('th')).toBe(await backgroundOf('td'))
  })
})
