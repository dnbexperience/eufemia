import { expect, test } from '@playwright/test'

// Like in the design, a left chevron is placed 16px from the start of the row,
// and the content starts 8px after it, at 40px.
const expected = {
  icon: { first: 40, title: 80 },
  avatar: { first: 40, title: 88 },
  title: { first: 40, title: 40 },
}

for (const width of [1024, 360]) {
  test.describe(`List left chevron at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components/list/visual-tests/chevron-left/')
      await page.getByTestId('accordion-title').waitFor()
      await page.waitForFunction(() => document.fonts.status === 'loaded')
    })

    for (const type of ['action', 'accordion']) {
      for (const start of Object.keys(expected)) {
        test(`places the content 8px after the chevron (${type}-${start})`, async ({
          page,
        }) => {
          const result = await page
            .getByTestId(`${type}-${start}`)
            .evaluate((item) => {
              const rowElement =
                item.querySelector(
                  ':scope > .dnb-list__item__accordion__header'
                ) || item
              const left = rowElement.getBoundingClientRect().left
              const x = (element: Element) =>
                Math.round(element.getBoundingClientRect().left - left)
              const range = document.createRange()
              range.selectNodeContents(
                rowElement.querySelector('[data-testid="title-text"]')
              )
              const first = rowElement.querySelector(
                '.dnb-list__item__icon .dnb-icon, .dnb-avatar'
              )

              return {
                chevron: x(
                  rowElement.querySelector(
                    '.dnb-list__item__chevron .dnb-icon'
                  )
                ),
                first: first ? x(first) : null,
                title: Math.round(range.getClientRects()[0].left - left),
              }
            })

          expect(result.chevron).toBe(16)
          expect(result.title).toBe(expected[start].title)
          expect(result.first ?? result.title).toBe(expected[start].first)
        })
      }
    }
  })
}
