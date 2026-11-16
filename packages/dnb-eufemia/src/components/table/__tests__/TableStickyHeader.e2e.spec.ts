import { test, expect } from '@playwright/test'

test.describe('Table sticky header', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 600, height: 720 })
    await page.goto('/web/components/table/visual-tests/sticky-header/')
    await expect(page.locator('thead tr')).toHaveClass(/page-scroll/)
  })

  test('follows page scrolling within the table bounds and preserves horizontal scrolling', async ({
    page,
  }) => {
    const table = page.locator('.dnb-table')
    const header = table.locator('thead tr')
    const scrollView = page.locator('.dnb-table__scroll-view')
    const headerTop = () =>
      header.evaluate((element) => element.getBoundingClientRect().top)

    const supportsTimeline = await page.evaluate(
      () =>
        CSS.supports('animation-timeline: scroll(root block)') &&
        CSS.supports('animation-range: 0 1px')
    )
    // Browsers without scroll timelines must continue receiving scroll events.
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (supportsTimeline) {
      // Simulate scroll events arriving late, while the browser keeps scrolling.
      await page.evaluate(() => {
        document.addEventListener(
          'scroll',
          (event) => event.stopImmediatePropagation(),
          { capture: true }
        )
      })
    }

    await test.step('pins below the page header in both scroll directions', async () => {
      for (const scrollY of [700, 1000, 500]) {
        await page.evaluate((top) => window.scrollTo(0, top), scrollY)
        await expect.poll(headerTop).toBeCloseTo(56, 0)
      }
    })

    await test.step('keeps columns aligned during horizontal scrolling', async () => {
      const firstHeader = header.locator('th').first()
      const before = await firstHeader.boundingBox()
      await scrollView.evaluate((element) => {
        element.scrollLeft = 200
      })
      await expect(scrollView).toHaveJSProperty('scrollLeft', 200)
      await expect
        .poll(async () => (await firstHeader.boundingBox()).x)
        .toBeCloseTo(before.x - 200, 0)
      await expect.poll(headerTop).toBeCloseTo(56, 0)
    })

    await test.step('returns to its original position above the table', async () => {
      await page.evaluate(() => window.scrollTo(0, 0))
      await expect
        .poll(
          async () => (await headerTop()) - (await table.boundingBox()).y
        )
        .toBeCloseTo(0, 0)
    })

    await test.step('keeps the header pinned with reduced motion enabled', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.evaluate(() => window.scrollTo(0, 700))
      await expect.poll(headerTop).toBeCloseTo(56, 0)
    })

    // The existing JavaScript fallback keeps its previous offset at the end.
    // eslint-disable-next-line playwright/no-conditional-in-test
    if (supportsTimeline) {
      await test.step('stops at the last table row', async () => {
        await table.evaluate((element) => {
          window.scrollTo(
            0,
            element.getBoundingClientRect().bottom + window.scrollY + 100
          )
        })
        // eslint-disable-next-line playwright/no-conditional-expect
        await expect
          .poll(() =>
            table.evaluate(
              (element) =>
                element.querySelector('thead tr').getBoundingClientRect()
                  .bottom - element.getBoundingClientRect().bottom
            )
          )
          .toBeCloseTo(0, 0)
      })
    }
  })

  test('updates the scroll range after layout changes and clears it when switching modes', async ({
    page,
  }) => {
    const header = page.locator('thead tr')
    await page.getByRole('button', { name: 'Toggle banner' }).click()
    await page.evaluate(() => window.scrollTo(0, 700))
    await expect
      .poll(() =>
        header.evaluate((element) => element.getBoundingClientRect().top)
      )
      .toBeCloseTo(56, 0)

    await page.evaluate(() => window.scrollTo(0, 0))
    await page
      .getByRole('button', { name: 'Toggle internal scroll' })
      .click()
    await page.setViewportSize({ width: 601, height: 720 })
    await expect(header).not.toHaveClass(/page-scroll/)
    await expect(header).not.toHaveAttribute('style', /--table-scroll-/)

    await page
      .getByRole('button', { name: 'Toggle internal scroll' })
      .click()
    await page.setViewportSize({ width: 600, height: 720 })
    await expect(header).toHaveClass(/page-scroll/)

    await page.getByRole('button', { name: 'Use CSS position' }).click()
    await expect(header).toHaveClass(/css-position/)
    await expect(header).not.toHaveClass(/page-scroll/)
    await expect(header).not.toHaveAttribute('style', /--table-scroll-/)

    await page.getByRole('button', { name: 'Toggle sticky' }).click()
    await expect(header).not.toHaveClass(/sticky/)
    await expect(header).not.toHaveAttribute('style', /--table-/)
  })

  test('prints a scrolled header above the body rows', async ({
    page,
  }) => {
    const thead = page.locator('thead')
    const header = thead.locator('tr')

    // The transform moves the row, but not the thead box around it.
    const headerOffset = () =>
      thead.evaluate(
        (element) =>
          element.querySelector('tr').getBoundingClientRect().top -
          element.getBoundingClientRect().top
      )
    await page.emulateMedia({ media: 'print' })
    const printedOffset = await headerOffset()
    await page.emulateMedia({ media: 'screen' })

    await page.evaluate(() => window.scrollTo(0, 700))
    await expect(header).toHaveClass(/is-sticky/)
    await expect.poll(headerOffset).toBeGreaterThan(0)

    await page.emulateMedia({ media: 'print' })
    await expect(header).toHaveCSS('transform', 'none')
    expect(await headerOffset()).toBeCloseTo(printedOffset, 0)
  })
})
