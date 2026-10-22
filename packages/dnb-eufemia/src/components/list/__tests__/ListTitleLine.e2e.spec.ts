import { expect, test } from '@playwright/test'

// Like in the design, every cell is aligned with the first title line: 32px
// from the top of the row, or 52px when the title has an overline. A subline
// or a title that wraps onto more lines must not move the cells.
const titleLine = {
  title: 32,
  subline: 32,
  long: 32,
  overline: 52,
  'overline-subline': 52,
  'overline-long': 52,
}

// The row height from the design (padding, title lines and a 2rem cell box)
const rowHeight = {
  title: 64,
  subline: 84,
  overline: 84,
  'overline-subline': 104,
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

for (const width of [1024, 360]) {
  test.describe(`List cells on the title line at ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } })

    test.beforeEach(async ({ page }) => {
      await page.goto('/uilib/components/list/visual-tests/title-line/')
      await page.getByTestId('radio-radio-overline-long').waitFor()
      await page.waitForFunction(() => document.fonts.status === 'loaded')
    })

    for (const row of rows) {
      test(`aligns the cells with the title line (${row})`, async ({
        page,
      }) => {
        const result = await page.evaluate(
          ({ row, texts }) => {
            const middle = (rect: DOMRect) => rect.top + rect.height / 2
            const firstLine = (element: Element) => {
              const walker = document.createTreeWalker(
                element,
                NodeFilter.SHOW_TEXT
              )
              let node: Node
              while ((node = walker.nextNode())) {
                if (!node.textContent.trim()) {
                  continue
                }
                const range = document.createRange()
                range.selectNodeContents(node)
                return range.getClientRects()[0]
              }
              return null
            }

            return Object.fromEntries(
              texts.map((text) => {
                const item = document.querySelector(
                  `[data-testid="${row}-${text}"]`
                )
                const rowElement =
                  item.querySelector(
                    ':scope > .dnb-list__item__accordion__header'
                  ) || item
                const top = rowElement.getBoundingClientRect().top
                const position = (rect: DOMRect | null) =>
                  rect ? Math.round((middle(rect) - top) * 10) / 10 : null
                const visible = (selector: string) => {
                  // Skip hidden cells, e.g. the chevron of a link row
                  const element = rowElement.querySelector(selector)
                  return element?.getClientRects().length > 0
                    ? element
                    : null
                }
                const start = visible('.dnb-list__item__start')

                return [
                  text,
                  {
                    height: Math.round(
                      rowElement.getBoundingClientRect().height
                    ),
                    title: position(
                      firstLine(
                        rowElement.querySelector(
                          '[data-testid="title-text"]'
                        )
                      )
                    ),
                    icon: position(
                      visible(
                        '.dnb-list__item__icon .dnb-icon'
                      )?.getBoundingClientRect()
                    ),
                    start: position(
                      start
                        ? (
                            start.querySelector(
                              '.dnb-avatar, .dnb-radio__button'
                            ) as HTMLElement
                          )?.getBoundingClientRect() || firstLine(start)
                        : null
                    ),
                    chevron: position(
                      visible(
                        '.dnb-list__item__chevron .dnb-icon'
                      )?.getBoundingClientRect()
                    ),
                    launchIcon: position(
                      visible(
                        '.dnb-anchor__launch-icon'
                      )?.getBoundingClientRect()
                    ),
                    end: position(
                      firstLine(
                        rowElement.querySelector('.dnb-list__item__end')
                      )
                    ),
                  },
                ]
              })
            )
          },
          { row, texts: Object.keys(titleLine) }
        )

        for (const [text, cells] of Object.entries(result)) {
          const line = titleLine[text]
          const { height, end, ...onTitleLine } = cells

          for (const [cell, position] of Object.entries(onTitleLine)) {
            if (position !== null) {
              expect(
                Math.abs(position - line),
                `${row}-${text} ${cell} at ${position}px`
              ).toBeLessThanOrEqual(1)
            }
          }

          // On small screens, the end cell is placed below the title
          if (width > 640) {
            expect(
              Math.abs(end - line),
              `${row}-${text} end at ${end}px`
            ).toBeLessThanOrEqual(1)

            if (rowHeight[text]) {
              expect(height, `${row}-${text} height`).toBe(rowHeight[text])
            }
          }
        }

        // Make sure every row has the cells we check
        const cells = result.title
        expect(cells.icon ?? cells.start).not.toBeNull()
        if (row.startsWith('link')) {
          expect(cells.launchIcon).not.toBeNull()
        } else if (!row.startsWith('basic') && !row.startsWith('radio')) {
          expect(cells.chevron).not.toBeNull()
        }
      })
    }
  })
}
