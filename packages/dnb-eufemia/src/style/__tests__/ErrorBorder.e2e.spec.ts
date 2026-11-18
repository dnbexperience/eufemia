import { expect, test } from '@playwright/test'

// A field in the error state must not differ by color alone (WCAG 1.4.1,
// failure F81). At rest, its border is thicker than the border of a normal field.
const cases = [
  ['Input', 'input', 'input-error', '.dnb-input', '.dnb-input__border'],
  [
    'Textarea',
    'textarea',
    'textarea-error',
    '.dnb-textarea',
    '.dnb-textarea__state',
  ],
  [
    'Dropdown',
    'dropdown',
    'dropdown-status-error',
    '.dnb-dropdown',
    '.dnb-dropdown__trigger',
  ],
  [
    'Autocomplete',
    'autocomplete',
    'autocomplete-status-error',
    '.dnb-autocomplete',
    '.dnb-input__border',
  ],
  [
    'Checkbox',
    'checkbox',
    'checkbox-error-unchecked',
    '.dnb-checkbox',
    '.dnb-checkbox__button',
  ],
  [
    'Radio',
    'radio',
    'radio-error-unchecked',
    '.dnb-radio',
    '.dnb-radio__button',
  ],
  [
    'Switch',
    'switch',
    'switch-error',
    '.dnb-switch',
    '.dnb-switch__background',
  ],
  [
    'Button',
    'button',
    'button-error-secondary',
    '.dnb-button--secondary',
    '',
  ],
  [
    'DatePicker',
    'date-picker',
    'date-picker-input-error',
    '.dnb-date-picker',
    '.dnb-input__border',
  ],
] as const

for (const [name, page_, fixture, root, part] of cases) {
  test(
    name + ' in the error state has a thicker border',
    async ({ page }) => {
      for (const theme of ['ui', 'sbanken', 'carnegie']) {
        await test.step(theme, async () => {
          await page.goto(
            '/web/components/' +
              page_ +
              '/demos/?data-visual-test&eufemia-theme=' +
              theme
          )
          await expect(page.locator('body')).toHaveClass(
            new RegExp('eufemia-theme__' + theme + '(?: |$)')
          )
          await expect(
            page.locator('[data-visual-test="' + fixture + '"]')
          ).toBeVisible()

          const widths = await page.evaluate(
            ([fixture, root, part]) => {
              // The widest border or box-shadow that is not transparent
              const visibleBorder = (element: Element) => {
                const style = getComputedStyle(element)
                const widths = [0]
                if (
                  style.borderTopStyle !== 'none' &&
                  !/rgba\([^)]*,\s*0\)|transparent/.test(
                    style.borderTopColor
                  )
                ) {
                  widths.push(parseFloat(style.borderTopWidth))
                }
                if (style.boxShadow !== 'none') {
                  for (const layer of style.boxShadow.split(
                    /,(?![^(]*\))/
                  )) {
                    if (/rgba\([^)]*,\s*0\)|transparent/.test(layer)) {
                      continue
                    }
                    const lengths = layer
                      .replace(/(?:rgba?|color)\([^)]*\)/g, '')
                      .match(/-?[\d.]+px/g)
                    widths.push(parseFloat(lengths?.[3] ?? '0'))
                  }
                }
                return Math.max(...widths)
              }
              const borderOf = (component: Element) =>
                part ? component.querySelector(part) : component
              const inFixture = (element: Element) =>
                element.closest('[data-visual-test="' + fixture + '"]')
              const hasStatus = (element: Element) =>
                /status--/.test(element.className.toString()) ||
                Boolean(element.querySelector('[class*="status--"]')) ||
                Boolean(element.closest('[class*="status--"]'))

              const fixtureElement = document.querySelector(
                '[data-visual-test="' + fixture + '"]'
              )
              const error = [
                fixtureElement,
                ...Array.from(fixtureElement.querySelectorAll(root)),
              ].find(
                (component) =>
                  component.matches(root) && hasStatus(component)
              )
              const normal = Array.from(
                document.querySelectorAll(root)
              ).find(
                (component) =>
                  !inFixture(component) &&
                  !hasStatus(component) &&
                  !component.closest('.dnb-skeleton, [disabled]') &&
                  !component.querySelector('[disabled]') &&
                  borderOf(component)
              )
              return {
                error: error && visibleBorder(borderOf(error)),
                normal: normal && visibleBorder(borderOf(normal)),
              }
            },
            [fixture, root, part] as const
          )

          expect(widths.normal).toBeGreaterThan(0)
          expect(widths.error).toBeGreaterThanOrEqual(2)
          expect(widths.error).toBeGreaterThan(widths.normal)
        })
      }
    }
  )
}
