import { test, expect } from '@playwright/test'

test('keeps composite fields separate when the composition wraps', async ({
  page,
}) => {
  await page.setViewportSize({ width: 410, height: 900 })
  await page.goto(
    '/web/extensions/forms/feature-fields/PhoneNumber/demos/'
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
  await page.goto('/web/extensions/forms/base-fields/Composition/demos/')
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
  await page.goto('/web/extensions/forms/base-fields/Selection/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const example = page.locator(
    '[data-visual-test="selection-dropdown-widths"]'
  )
  await example.evaluate((element) => {
    element.style.maxWidth = '100%'

    // Without width classes, the first field renders like width={false}
    const field = element.querySelector('.dnb-forms-field-selection')
    field.classList.remove('dnb-forms-field-block--content-width-large')
    field
      .querySelector('.dnb-forms-field-block__contents')
      .classList.remove('dnb-forms-field-block__contents--width-large')

    for (const text of element.querySelectorAll(
      '.dnb-dropdown__text__inner'
    )) {
      text.textContent =
        'A very long selected option that should be truncated with an ellipsis and stay within the available space'
    }
  })

  // On wider screens, the container leaves room for the label and the predefined widths.
  for (const [viewportWidth, containerWidth] of [
    [375, 343],
    [1280, 600],
  ]) {
    await page.setViewportSize({ width: viewportWidth, height: 900 })
    await example.evaluate((element, containerWidth) => {
      element.style.width = `${containerWidth}px`
      for (const grid of element.querySelectorAll(
        '.dnb-forms-field-block__grid'
      )) {
        grid.classList.replace(
          'dnb-forms-field-block--layout-vertical',
          'dnb-forms-field-block--layout-horizontal'
        )
      }
      for (const label of element.querySelectorAll(
        '.dnb-forms-field-block__label__content'
      )) {
        label.textContent = 'Choice'
      }
    }, containerWidth)
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
  }
})

test('keeps predefined widths in the horizontal layout when the label wraps', async ({
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
    element.style.width = '500px'
    for (const grid of element.querySelectorAll(
      '.dnb-forms-field-block__grid'
    )) {
      grid.classList.replace(
        'dnb-forms-field-block--layout-vertical',
        'dnb-forms-field-block--layout-horizontal'
      )
    }
    for (const label of element.querySelectorAll(
      '.dnb-forms-field-block__label__content'
    )) {
      label.textContent =
        'A long field label that needs to wrap beside the dropdown'
    }
  })
  await page.evaluate(() => document.fonts.ready)
  const widths = await example
    .getByRole('combobox')
    .evaluateAll((buttons) =>
      buttons
        .slice(0, 4)
        .map((button) => button.getBoundingClientRect().width)
    )

  // Default, small, medium and large, the same as in the vertical layout
  expect(widths).toEqual([336, 104, 176, 336])
})

test('keeps short values visible at predefined widths in a parent sized to its content', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/web/extensions/forms/base-fields/Selection/demos/')
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
    for (const text of element.querySelectorAll(
      '.dnb-dropdown__text__inner'
    )) {
      text.textContent = 'Foo!'
    }
  })
  await page.evaluate(() => document.fonts.ready)
  await expect(async () => {
    const dimensions = await example
      .getByRole('combobox')
      .evaluateAll((buttons) =>
        buttons.slice(0, 4).map((button) => {
          const text = button.querySelector(
            '.dnb-dropdown__text__inner'
          ) as HTMLElement
          const range = document.createRange()
          range.selectNodeContents(text)
          return {
            width: button.getBoundingClientRect().width,
            text: text.getBoundingClientRect().width,
            fullText: range.getBoundingClientRect().width,
          }
        })
      )
    expect(dimensions.map(({ width }) => width)).toEqual([
      336, 104, 176, 336,
    ])
    for (const { text, fullText } of dimensions) {
      expect(text).toBeGreaterThanOrEqual(fullText)
    }
  }).toPass({ timeout: 5000 })
})

test('preserves the width of horizontal string fields in narrow containers', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  await page.goto('/web/extensions/forms/base-fields/String/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  const example = page.locator('[data-visual-test="string-widths"]')
  await example.evaluate((element) => {
    const field = element.querySelector('.dnb-forms-field-string')
    const grid = field.querySelector('.dnb-forms-field-block__grid')
    grid.classList.replace(
      'dnb-forms-field-block--layout-vertical',
      'dnb-forms-field-block--layout-horizontal'
    )
    field.querySelector(
      '.dnb-forms-field-block__label__content'
    ).textContent =
      'A long field label that needs to wrap beside the input'
    element.replaceChildren(field)
    element.style.width = '500px'
  })
  await page.evaluate(() => document.fonts.ready)
  const width = await example
    .locator('input')
    .evaluate((input) => input.getBoundingClientRect().width)
  expect(width).toBe(336)
})
