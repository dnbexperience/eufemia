import { expect, test } from '@playwright/test'

// A row that has its List.Cell.Title inside a List.Cell.Center must look like
// the same row with the title used directly.
for (const width of [1024, 600, 360]) {
  test.describe(`List title in center at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/uilib/components/list/visual-tests/title-in-center/'
      )
      await page.evaluate(() => document.fonts.ready)
    })

    for (const variant of [
      'plain',
      'overline',
      'subline',
      'both',
      'long',
    ]) {
      for (const [reference, row] of [
        ['title', 'center'],
        ['title-only', 'center-only'],
      ]) {
        test(`places the title like a direct title (${variant}, ${row})`, async ({
          page,
        }) => {
          const getLayout = (testId: string) =>
            page
              .getByTestId(variant)
              .getByTestId(testId)
              .evaluate((item) => {
                const itemRect = item.getBoundingClientRect()
                // Ignore sub-pixel noise between equal layouts
                const round = (value: number) =>
                  Math.round(value * 100) / 100
                const box = (selector: string) => {
                  const element = item.querySelector(selector)
                  if (!element) {
                    return null
                  }
                  const rect = element.getBoundingClientRect()
                  return {
                    top: round(rect.top - itemRect.top),
                    left: round(rect.left - itemRect.left),
                    width: round(rect.width),
                    height: round(rect.height),
                  }
                }

                return {
                  height: round(itemRect.height),
                  title: box('.dnb-list__item__title > span > span'),
                  overline: box('.dnb-list__item__overline'),
                  subline: box('.dnb-list__item__subline'),
                  icon: box('.dnb-list__item__icon'),
                  end: box('.dnb-list__item__end'),
                  chevron: box('.dnb-list__item__chevron'),
                }
              })

          const expected = await getLayout(reference)
          expect(expected.title).not.toBeNull()

          expect(await getLayout(row)).toEqual(expected)
        })
      }
    }

    // An overline or subline must only change the vertical alignment of
    // the center cell, not its horizontal place or width.
    for (const variant of ['overline', 'subline', 'both']) {
      test(`keeps the center cell in place (${variant})`, async ({
        page,
      }) => {
        const getCenter = (container: string) =>
          page
            .getByTestId(container)
            .getByTestId('center-content')
            .evaluate((item) => {
              const itemRect = item.getBoundingClientRect()
              const rect = item
                .querySelector('.dnb-list__item__center')
                .getBoundingClientRect()
              return {
                left: Math.round(rect.left - itemRect.left),
                width: Math.round(rect.width),
              }
            })

        expect(await getCenter(variant)).toEqual(await getCenter('plain'))
      })
    }
  })
}
