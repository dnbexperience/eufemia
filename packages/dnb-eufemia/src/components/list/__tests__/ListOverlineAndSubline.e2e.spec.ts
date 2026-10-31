import { expect, test } from '@playwright/test'

// In a row with both an overline and a subline, the icon, the chevron and the
// cells next to the title must be aligned with the title line, not with the
// overline above it.
for (const width of [1024, 360]) {
  test.describe(`List overline and subline at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto(
        '/web/components/list/visual-tests/overline-and-subline/'
      )
      await page.evaluate(() => document.fonts.ready)
    })

    for (const testId of [
      'basic',
      'action',
      'action-chevron-left',
      'accordion',
      'center',
      'end-detail',
      'small-title',
    ]) {
      test(`aligns the cells with the title line (${testId})`, async ({
        page,
      }) => {
        const offsets = await page.getByTestId(testId).evaluate((item) => {
          const middle = (rect: DOMRect) => rect.top + rect.height / 2
          const firstLineMiddle = (element: Element) => {
            const range = document.createRange()
            range.selectNodeContents(element)
            return middle(range.getClientRects()[0])
          }

          const title = firstLineMiddle(
            item.querySelector('.dnb-list__item__title > span > span')
          )
          const offset = (selector: string, text = false) => {
            const element = item.querySelector(selector)
            if (!element) {
              return null
            }
            return Math.abs(
              (text
                ? firstLineMiddle(element)
                : middle(element.getBoundingClientRect())) - title
            )
          }

          return {
            icon: offset('.dnb-list__item__icon .dnb-icon'),
            chevron: offset('.dnb-list__item__chevron .dnb-icon'),
            center: offset('.dnb-list__item__center', true),
            end: offset('.dnb-list__item__end', true),
          }
        })

        expect(offsets.icon).toBeLessThanOrEqual(1)

        if (testId !== 'basic') {
          expect(offsets.chevron).toBeLessThanOrEqual(1)
        }

        // On small screens, the end cell is placed below the title, and the
        // center cell is placed after the title
        if (width > 640) {
          expect(offsets.end).toBeLessThanOrEqual(1)

          if (testId === 'center') {
            expect(offsets.center).toBeLessThanOrEqual(1)
          }
        }
      })
    }
  })
}
