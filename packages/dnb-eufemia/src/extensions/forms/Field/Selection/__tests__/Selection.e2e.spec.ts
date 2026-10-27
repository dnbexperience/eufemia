import { test, expect } from '@playwright/test'

test('keeps composite fields separate when the composition wraps', async ({
  page,
}) => {
  await page.setViewportSize({ width: 410, height: 900 })
  await page.goto(
    '/uilib/extensions/forms/feature-fields/PhoneNumber/demos/'
  )
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const phone = await page
    .locator(
      '[data-visual-test="phone-number-label"] .dnb-forms-field-phone-number'
    )
    .first()
    .evaluate((element) => element.outerHTML)
  await page.goto('/uilib/extensions/forms/base-fields/Composition/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await page
    .locator('[data-visual-test="forms-field-block-composition"]')
    .evaluate((example, phone) => {
      const composition = example
        .querySelector('.dnb-forms-field-block__composition')
        .cloneNode(true) as HTMLElement
      const contents = composition.querySelector(
        '.dnb-forms-field-block__contents'
      )
      const sibling = contents.firstElementChild.cloneNode(true)
      contents.innerHTML = phone
      contents.appendChild(sibling)
      composition.classList.remove(
        'dnb-forms-field-block--width-stretch',
        'dnb-forms-field-block--content-width-large'
      )
      contents.classList.remove(
        'dnb-forms-field-block__contents--width-large'
      )
      composition.style.width = '378px'
      composition.setAttribute('data-testid', 'composition')
      example.replaceChildren(composition)
    }, phone)
  const overflowing = await page
    .getByTestId('composition')
    .locator('input')
    .evaluateAll((inputs) =>
      inputs.some((input) => {
        const field = input
          .closest('.dnb-forms-field-block')
          .getBoundingClientRect()
        const rect = input.getBoundingClientRect()
        return rect.right > field.right + 1
      })
    )
  expect(overflowing).toBe(false)
  const overlap = await page
    .getByTestId('composition')
    .locator('input')
    .evaluateAll((inputs) =>
      inputs.some((input, index) => {
        const rect = input.getBoundingClientRect()
        return inputs.slice(index + 1).some((other) => {
          const next = other.getBoundingClientRect()
          return (
            rect.left < next.right &&
            next.left < rect.right &&
            rect.top < next.bottom &&
            next.top < rect.bottom
          )
        })
      })
    )
  expect(overlap).toBe(false)
})

test('keeps long dropdown text inside a narrow container', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/uilib/extensions/forms/base-fields/Selection/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const example = page.locator(
    '[data-visual-test="selection-dropdown-widths"]'
  )
  await example.evaluate((element) => {
    element.style.width = '343px'
    element.style.maxWidth = '100%'
    for (const text of element.querySelectorAll(
      '.dnb-dropdown__text__inner'
    )) {
      text.textContent =
        'A very long selected option that should be truncated with an ellipsis and stay within the available space'
    }
  })
  const widths = await example
    .getByRole('combobox')
    .evaluateAll((buttons) =>
      buttons.map((button) => {
        const text = button.querySelector(
          '.dnb-dropdown__text__inner'
        ) as HTMLElement
        return {
          button: button.getBoundingClientRect().right,
          container: button
            .closest('[data-visual-test]')
            .getBoundingClientRect().right,
          text: text.clientWidth,
          fullText: text.scrollWidth,
          overflow: getComputedStyle(text).textOverflow,
        }
      })
    )
  for (const width of widths) {
    expect(width.button).toBeLessThanOrEqual(width.container + 1)
    expect(width.text).toBeLessThan(width.fullText)
    expect(width.overflow).toBe('ellipsis')
  }
})

test('keeps short values visible at predefined widths in a parent sized to its content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/uilib/extensions/forms/base-fields/Selection/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const example = page.locator(
    '[data-visual-test="selection-dropdown-widths"]'
  )
  await example.evaluate((element) => {
    const stack = element.firstElementChild as HTMLElement
    stack.style.display = 'inline-flex'
    stack.style.alignItems = 'flex-start'
  })
  const dimensions = await example
    .getByRole('combobox')
    .evaluateAll((buttons) =>
      buttons.slice(0, 4).map((button) => {
        const text = button.querySelector(
          '.dnb-dropdown__text__inner'
        ) as HTMLElement
        return {
          width: button.getBoundingClientRect().width,
          text: text.clientWidth,
          fullText: text.scrollWidth,
        }
      })
    )
  expect(dimensions.map(({ width }) => width)).toEqual([
    336, 104, 176, 336,
  ])
  for (const { text, fullText } of dimensions) {
    expect(text).toBeGreaterThanOrEqual(fullText)
  }
})
