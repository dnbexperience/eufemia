import { expect, test } from '@playwright/test'

// Rows built from your own components (that render List.Cell.*) must be laid
// out exactly like rows that use the cells directly. The legacy row is the
// reference, because it shows how rows with cells were laid out before.
for (const width of [1024, 360]) {
  test.describe(`List custom cell components at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components/list/visual-tests/custom-cells/')
      await page.evaluate(() => document.fonts.ready)
    })

    for (const testId of ['inline', 'components', 'fragment']) {
      test(`places the cells like the legacy layout (${testId})`, async ({
        page,
      }) => {
        const getLayout = (rowTestId: string) =>
          page.getByTestId(rowTestId).evaluate((row) => {
            const rowRect = row.getBoundingClientRect()
            const box = (selector: string) => {
              const rect = row
                .querySelector(selector)
                .getBoundingClientRect()
              return {
                top: rect.top - rowRect.top,
                left: rect.left - rowRect.left,
                width: rect.width,
                height: rect.height,
              }
            }

            return {
              height: rowRect.height,
              icon: box('.dnb-list__item__icon'),
              title: box('.dnb-list__item__title'),
              end: box('.dnb-list__item__end'),
              footer: box('.dnb-list__item__footer'),
            }
          })

        const expected = await getLayout('legacy')
        const actual = await getLayout(testId)

        // In the reference, the title follows the icon and the end cell
        // is not placed right after the title.
        expect(expected.title.left).toBeGreaterThan(expected.icon.left)

        expect(actual).toEqual(expected)
      })
    }
  })
}
