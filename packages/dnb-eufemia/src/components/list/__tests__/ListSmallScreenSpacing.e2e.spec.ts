import { expect, test } from '@playwright/test'

// On small screens, the end cell is placed below the text, like in the design:
// 8px below the last text line, in a 2rem box. All row types (also action
// buttons and links) must get the same space, also on x-small screens.
const expected = {
  title: { end: 68, height: 100 },
  subline: { end: 92, height: 124 },
  overline: { end: 88, height: 120 },
  'overline-subline': { end: 112, height: 144 },
}

const rows = [
  ...[
    'basic',
    'action',
    'action-chevron-left',
    'link',
    'accordion',
  ].flatMap((type) =>
    ['icon', 'avatar', 'date'].map((start) => `${type}-${start}`)
  ),
  'radio-radio',
]

for (const width of [600, 360]) {
  test.describe(`List small screen spacing at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components/list/visual-tests/title-line/')
      await page.getByTestId('radio-radio-overline-long').waitFor()
      await page.waitForFunction(() => document.fonts.status === 'loaded')
    })

    for (const row of rows) {
      test(`places the end cell below the text (${row})`, async ({
        page,
      }) => {
        const result = await page.evaluate(
          ({ row, texts }) =>
            Object.fromEntries(
              texts.map((text) => {
                const item = document.querySelector(
                  `[data-testid="${row}-${text}"]`
                )
                const rowElement =
                  item.querySelector(
                    ':scope > .dnb-list__item__accordion__header'
                  ) || item
                const rowRect = rowElement.getBoundingClientRect()
                const range = document.createRange()
                range.selectNodeContents(
                  rowElement.querySelector('.dnb-list__item__end')
                )
                const end = range.getClientRects()[0]

                return [
                  text,
                  {
                    end:
                      Math.round(
                        (end.top + end.height / 2 - rowRect.top) * 10
                      ) / 10,
                    height: Math.round(rowRect.height),
                  },
                ]
              })
            ),
          { row, texts: Object.keys(expected) }
        )

        for (const [text, { end, height }] of Object.entries(result)) {
          expect(
            Math.abs(end - expected[text].end),
            `${row}-${text} end at ${end}px`
          ).toBeLessThanOrEqual(1)
          expect(height, `${row}-${text} height`).toBe(
            expected[text].height
          )
        }
      })
    }

    // On small screens, the center cell stays next to the title. On x-small
    // screens, it is placed below the title, 8px above the end cell.
    for (const type of [
      'basic',
      'action',
      'accordion',
      'basic-center-only',
      'action-center-only',
    ]) {
      test(`places the center cell like the end cell (${type})`, async ({
        page,
      }) => {
        const result = await page
          .getByTestId(type.endsWith('-only') ? type : `${type}-center`)
          .evaluate((item) => {
            const rowElement =
              item.querySelector(
                ':scope > .dnb-list__item__accordion__header'
              ) || item
            const rowRect = rowElement.getBoundingClientRect()
            const middle = (selector: string) => {
              const range = document.createRange()
              range.selectNodeContents(rowElement.querySelector(selector))
              const rect = range.getClientRects()[0]
              return (
                Math.round(
                  (rect.top + rect.height / 2 - rowRect.top) * 10
                ) / 10
              )
            }
            return {
              center: middle('.dnb-list__item__center'),
              end: rowElement.querySelector('.dnb-list__item__end')
                ? middle('.dnb-list__item__end')
                : null,
              height: Math.round(rowRect.height),
            }
          })

        const withEnd = !type.endsWith('-only')
        const expected =
          width > 400
            ? { center: 32, end: 72, height: withEnd ? 104 : 64 }
            : { center: 68, end: 108, height: withEnd ? 140 : 100 }

        expect(
          Math.abs(result.center - expected.center)
        ).toBeLessThanOrEqual(1)
        if (withEnd) {
          expect(Math.abs(result.end - expected.end)).toBeLessThanOrEqual(
            1
          )
        } else {
          expect(result.end).toBeNull()
        }
        expect(result.height).toBe(expected.height)
      })
    }
  })
}
