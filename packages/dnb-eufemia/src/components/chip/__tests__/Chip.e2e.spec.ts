import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/chip/demos/?fullscreen')
  await expect(page.locator('.dnb-chip').first()).toBeVisible()
})

test('default selection has sufficient non-text contrast across themes', async ({
  page,
}) => {
  for (const theme of ['ui', 'sbanken', 'carnegie']) {
    for (const colorScheme of ['light', 'dark'] as const) {
      await test.step(theme + ' ' + colorScheme, async () => {
        await page.evaluate((colorScheme) => {
          localStorage.setItem(
            'eufemia-theme',
            JSON.stringify({ colorScheme })
          )
        }, colorScheme)
        await page.goto(
          '/web/components/chip/demos/?fullscreen&eufemia-theme=' + theme
        )
        await expect(page.locator('body')).toHaveClass(
          new RegExp('eufemia-theme__' + theme + '(?: |$)')
        )
        await expect(page.locator('body')).toHaveClass(
          new RegExp('eufemia-theme__color-scheme--' + colorScheme)
        )
        const selected = page.locator(
          '[data-visual-test="chip-group-appearances"] .dnb-chip--default:has(input:checked)'
        )
        await expect(selected).toHaveCount(2)

        const ratios = await selected.evaluateAll((chips) =>
          chips.map((chip) => {
            const pill = chip.querySelector(
              '.dnb-checkbox__order, .dnb-radio__row'
            )
            const style = getComputedStyle(pill)
            const border = style.boxShadow.match(
              /(?:rgba?|color)\([^)]+\)/
            )[0]
            const context = document
              .createElement('canvas')
              .getContext('2d')
            context.fillStyle = style.backgroundColor
            context.fillRect(0, 0, 1, 1)
            const fill = context.getImageData(0, 0, 1, 1).data
            context.fillStyle = border
            context.fillRect(0, 0, 1, 1)
            const stroke = context.getImageData(0, 0, 1, 1).data
            const luminance = (color: Uint8ClampedArray) =>
              [0.2126, 0.7152, 0.0722].reduce((sum, weight, index) => {
                const channel = color[index] / 255
                return (
                  sum +
                  weight *
                    (channel <= 0.04045
                      ? channel / 12.92
                      : ((channel + 0.055) / 1.055) ** 2.4)
                )
              }, 0)
            const a = luminance(fill)
            const b = luminance(stroke)
            return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
          })
        )

        for (const ratio of ratios) {
          expect(ratio).toBeGreaterThanOrEqual(3)
        }
      })
    }
  }
})

test('labels use Figma spacing in both selection modes', async ({
  page,
}) => {
  const fixture = page.locator(
    '[data-visual-test="chip-group-appearances"]'
  )

  for (const variant of ['default', 'addable', 'checkbox', 'radio']) {
    for (const { role, mode } of [
      { role: 'radiogroup', mode: 'single' },
      { role: 'group', mode: 'multiple' },
    ] as const) {
      const name = `${variant}: ${mode}`

      await test.step(name, async () => {
        const group = fixture.getByRole(role, { name, exact: true })
        const spacing = await group
          .locator('.dnb-chip')
          .evaluateAll((chips) =>
            chips.map((chip) => {
              const pill = chip.querySelector(
                '.dnb-checkbox__order, .dnb-radio__row'
              )
              const text = chip.querySelector('.dnb-chip__text')
              const label = chip.querySelector('.dnb-form-label')
              const baselineMarker = document.createElement('span')
              baselineMarker.style.cssText =
                'display:inline-block;width:0;height:0'
              text.append(baselineMarker)
              const baseline =
                baselineMarker.getBoundingClientRect().top -
                pill.getBoundingClientRect().top
              baselineMarker.remove()

              return {
                baseline,
                labelPadding: getComputedStyle(label).padding,
                textInset:
                  text.getBoundingClientRect().left -
                  pill.getBoundingClientRect().left,
              }
            })
          )

        expect(spacing).toHaveLength(3)

        for (const { baseline, labelPadding, textInset } of spacing) {
          // Figma places the 18px DNB text baseline 26px below the pill top.
          expect(baseline).toBeCloseTo(26, 1)
          expect(labelPadding).toBe('0px')
          expect(textInset).toBeCloseTo(
            variant === 'checkbox' || variant === 'radio' ? 40 : 16,
            1
          )
        }
      })
    }
  }

  for (const { variant, radius, borderWidth } of [
    { variant: 'checkbox', radius: '4px', borderWidth: '1' },
    { variant: 'radio', radius: /^(50%|9999px)$/, borderWidth: '1\\.5' },
  ]) {
    for (const { role, mode } of [
      { role: 'radiogroup', mode: 'single' },
      { role: 'group', mode: 'multiple' },
    ] as const) {
      await test.step(`${variant} indicator: ${mode}`, async () => {
        const group = fixture.getByRole(role, {
          name: `${variant}: ${mode}`,
          exact: true,
        })
        const selected = group.locator('.dnb-chip').first()
        const indicator = selected.locator(
          '.dnb-checkbox__button, .dnb-radio__button'
        )
        await expect(indicator).toHaveCSS('border-radius', radius)
        await expect(indicator).toHaveCSS(
          'box-shadow',
          new RegExp(`0px 0px 0px ${borderWidth}px inset$`)
        )
      })
    }
  }

  for (const check of await fixture
    .locator('.dnb-chip--checkbox:has(input:checked) .dnb-checkbox__gfx')
    .all()) {
    const width = await check.evaluate(
      (svg) => svg.getBoundingClientRect().width
    )
    expect(width).toBeCloseTo(9.6, 1)
    await expect(check.locator('path')).toHaveCSS('stroke-width', '2.5px')
  }
})

test('keyboard focus stays on the pill across selection states', async ({
  page,
}) => {
  const chips = page.locator(
    '[data-visual-test="chip-states"] .dnb-chip:has(input:not(:disabled)), ' +
      '[data-visual-test="chip-group-appearances"] .dnb-chip:has(input:checked), ' +
      '[data-visual-test="chip-groups"] .dnb-chip, ' +
      '[data-visual-test="chip-dark-surface"] .dnb-chip:has(input:not(:disabled))'
  )

  await page.keyboard.press('Tab')

  for (const chip of await chips.all()) {
    const input = chip.locator('input')
    const dot = chip.locator('.dnb-radio__dot')
    const dotColors = await dot.evaluateAll((elements) =>
      elements.map((element) => getComputedStyle(element).backgroundColor)
    )

    await input.focus()
    await expect(input).toBeFocused()
    await expect(
      chip.locator('.dnb-checkbox__order, .dnb-radio__row')
    ).toHaveCSS('outline-style', 'solid')
    await expect(chip.locator('.dnb-checkbox__focus:visible')).toHaveCount(
      0
    )

    expect(
      await dot.evaluateAll((elements) =>
        elements.map(
          (element) => getComputedStyle(element).backgroundColor
        )
      )
    ).toEqual(dotColors)
  }
})

test('per-option help is reachable without changing either selection mode', async ({
  page,
  browserName,
}) => {
  const fixture = page.locator('[data-visual-test="chip-option-help"]')

  for (const { role, name, help, content } of [
    {
      role: 'radio',
      name: 'Savings',
      help: 'About savings',
      content: 'Savings accounts earn interest on your balance.',
    },
    {
      role: 'checkbox',
      name: 'Active accounts',
      help: 'About active accounts',
      content: 'Show accounts that are currently in use.',
    },
  ] as const) {
    await test.step(role, async () => {
      const input = fixture.getByRole(role, { name, exact: true })
      const button = fixture.getByRole('button', {
        name: help,
        exact: true,
      })
      const checked = await input.isChecked()

      await input.focus()
      await input.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
      await expect(button).toBeFocused()
      await button.press('Enter')
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await expect(dialog).toBeFocused()
      await expect(dialog).toContainText(content)
      await dialog.locator('.dnb-modal__close-button').click()
      await expect(dialog).toBeHidden()
      await expect(input).toBeChecked({ checked })
      await expect(button).toBeFocused()
      await button.click()
      await expect(dialog).toBeVisible()
      await expect(dialog).toBeFocused()
      await dialog.locator('.dnb-modal__close-button').click()
      await expect(dialog).toBeHidden()
      await expect(input).toBeChecked({ checked })

      await input.click({ position: { x: 2, y: 2 } })
      await expect(input).toBeChecked()
    })
  }
})

test('numeric radio values support arrow keys with help buttons between options', async ({
  page,
}) => {
  const group = page
    .locator('[data-visual-test="chip-option-help"]')
    .getByRole('radiogroup', { name: 'Account', exact: true })
  const savings = group.getByRole('radio', { name: 'Savings' })
  const funds = group.getByRole('radio', { name: 'Funds' })

  await savings.focus()
  await savings.press('ArrowRight')
  await expect(funds).toBeFocused()
  await expect(funds).toBeChecked()
  await expect(savings).not.toBeChecked()
  await funds.press('ArrowLeft')
  await expect(savings).toBeFocused()
  await expect(savings).toBeChecked()
  await expect(funds).not.toBeChecked()
})

test('tooltips describe chips and can be dismissed with Escape', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="chip-tooltips"]')
  const savings = fixture.getByRole('checkbox', {
    name: 'Savings',
    exact: true,
  })

  await savings.hover()
  await expect(page.getByRole('tooltip')).toHaveText(
    'Show accounts that earn interest'
  )
  await expect(savings).toHaveAccessibleDescription(
    'Show accounts that earn interest'
  )
  await savings.press('Escape')
  await expect(page.getByRole('tooltip')).toBeHidden()
})

for (const { name, role } of [
  { name: 'Savings accounts', role: 'checkbox' },
  { name: 'Notifications', role: 'radio' },
] as const) {
  test(`hidden ${role} labels preserve icons, the hit area, and tooltip keyboard access`, async ({
    page,
  }) => {
    const fixture = page.locator('[data-visual-test="chip-tooltips"]')
    const input = fixture.getByRole(role, { name, exact: true })
    const chip = fixture.locator('.dnb-chip').filter({
      has: page.getByRole(role, { name, exact: true }),
    })
    const text = chip.locator('.dnb-chip__text')

    await expect(chip.locator('.dnb-chip__icon')).toBeVisible()
    const textSize = await text.boundingBox()
    expect(textSize.width).toBeLessThanOrEqual(1)
    expect(textSize.height).toBeLessThanOrEqual(1)
    const inputSize = await input.boundingBox()
    expect(inputSize.width).toBeGreaterThanOrEqual(40)
    expect(inputSize.height).toBeGreaterThanOrEqual(40)

    await input.focus()
    await expect(page.getByRole('tooltip')).toHaveText(name)
    await expect(input).not.toHaveAttribute('aria-describedby')
    await input.press('Escape')
    await expect(page.getByRole('tooltip')).toBeHidden()
    await input.click({ position: { x: 2, y: 2 } })
    await expect(input).toBeChecked()
  })
}

test('addable shows one action icon and keeps the option available', async ({
  page,
}) => {
  const chip = page.locator(
    '[data-visual-test="chip-variants"] .dnb-chip--addable'
  )
  const input = chip.getByRole('checkbox')

  await expect(chip.locator('.dnb-chip__add')).toBeVisible()
  await expect(chip.locator('.dnb-chip__remove')).toBeHidden()
  await input.check()
  await expect(chip.locator('.dnb-chip__add')).toBeHidden()
  await expect(chip.locator('.dnb-chip__remove')).toBeVisible()
  await input.uncheck()
  await expect(input).toBeVisible()
  await expect(chip.locator('.dnb-chip__add')).toBeVisible()
})

test('the full pill is clickable for every variant', async ({ page }) => {
  for (const variant of ['default', 'addable', 'checkbox', 'radio']) {
    await test.step(variant, async () => {
      const chip = page
        .locator('[data-visual-test="chip-states"] .dnb-chip--' + variant)
        .first()
      const input = chip.locator('input')
      const pill = chip.locator(
        variant === 'radio' ? '.dnb-radio__row' : '.dnb-checkbox__order'
      )

      await pill.click({ position: { x: 5, y: 5 } })
      await expect(input).toBeChecked()
      await expect(input).toBeFocused()
      await pill.click({
        position: { x: (await pill.boundingBox()).width - 5, y: 5 },
      })
      await expect(input).not.toBeChecked()
    })
  }
})

for (const variant of ['checkbox', 'radio']) {
  test(`${variant} indicator centers are clickable in both selection modes`, async ({
    page,
  }) => {
    const fixture = page.locator(
      '[data-visual-test="chip-group-appearances"]'
    )

    for (const selectionMode of ['multiple', 'single']) {
      await test.step(selectionMode, async () => {
        const group = fixture.getByRole(
          selectionMode === 'multiple' ? 'group' : 'radiogroup',
          {
            name: `${variant}: ${selectionMode}`,
            exact: true,
          }
        )
        const chip = group
          .locator('.dnb-chip')
          .filter({ hasText: 'Available' })
        const input = chip.locator('input')
        const selected = group.getByRole(
          selectionMode === 'multiple' ? 'checkbox' : 'radio',
          {
            name: 'Selected',
            exact: true,
          }
        )
        const indicator = chip.locator(
          selectionMode === 'multiple'
            ? '.dnb-checkbox__button'
            : '.dnb-radio__button'
        )

        await indicator.scrollIntoViewIfNeeded()
        const { x, y, width, height } = await indicator.boundingBox()
        await page.mouse.click(x + width / 2, y + height / 2)
        await expect(input).toBeChecked()
        await expect(input).toBeFocused()
        await expect(selected).toBeChecked({
          checked: selectionMode === 'multiple',
        })
        await page.mouse.click(x + width / 2, y + height / 2)
        await expect(input).toBeChecked({
          checked: selectionMode === 'single',
        })
      })
    }
  })
}

test('checkboxes support Tab and Space without duplicate changes', async ({
  page,
  browserName,
}) => {
  const fixture = page.locator('[data-visual-test="chip-multiple"]')
  const savings = fixture.getByRole('checkbox', { name: 'Savings' })
  const funds = fixture.getByRole('checkbox', { name: 'Funds' })

  await savings.focus()
  await savings.press('Space')
  await expect(savings).not.toBeChecked()
  await expect(fixture).toContainText('Selected: None')
  await savings.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
  await expect(funds).toBeFocused()
  await funds.press('Space')
  await expect(funds).toBeChecked()
  await expect(fixture).toContainText('Selected: funds')
})

test('radio arrow keys select one option and skip disabled options', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="chip-radio-group"]')
  const savings = fixture.getByRole('radio', { name: 'Savings' })
  const funds = fixture.getByRole('radio', { name: 'Funds' })
  const all = fixture.getByRole('radio', { name: 'All accounts' })

  await savings.focus()
  await savings.press('ArrowRight')
  await expect(funds).toBeFocused()
  await expect(funds).toBeChecked()
  await expect(savings).not.toBeChecked()
  await funds.press('Space')
  await expect(funds).toBeChecked()
  await funds.press('ArrowRight')
  await expect(all).toBeFocused()
  await expect(all).toBeChecked()
  await expect(funds).not.toBeChecked()
  await expect(
    fixture.getByRole('radio', { name: 'Loans' })
  ).toBeDisabled()
})

test('Enter activates each variant without submitting its form', async ({
  page,
}) => {
  const fixture = page.locator('[data-visual-test="chip-states"]')

  await fixture.evaluate((element) => {
    const form = document.createElement('form')
    const submit = document.createElement('button')
    submit.type = 'submit'
    submit.textContent = 'Submit'
    element.before(form)
    form.append(element, submit)
    form.dataset.submissions = '0'
    form.addEventListener('submit', (event) => {
      event.preventDefault()
      form.dataset.submissions = String(
        Number(form.dataset.submissions) + 1
      )
    })
  })

  for (const variant of ['default', 'addable', 'checkbox', 'radio']) {
    await test.step(variant, async () => {
      const input = fixture
        .locator('.dnb-chip--' + variant + ' input')
        .first()
      await input.press('Enter')
      await expect(input).toBeChecked()
      await expect(fixture.locator('..')).toHaveAttribute(
        'data-submissions',
        '0'
      )
    })
  }

  await page.getByRole('button', { name: 'Submit', exact: true }).click()
  await expect(fixture.locator('..')).toHaveAttribute(
    'data-submissions',
    '1'
  )
})

test('default group supports radio keyboard selection', async ({
  page,
}) => {
  const group = page
    .locator('[data-visual-test="chip-groups"]')
    .getByRole('radiogroup', { name: 'View' })
  const overview = group.getByRole('radio', { name: 'Overview' })
  const details = group.getByRole('radio', { name: 'Details' })

  await overview.focus()
  await overview.press('ArrowRight')
  await expect(details).toBeFocused()
  await expect(details).toBeChecked()
  await expect(overview).not.toBeChecked()
  await overview.press('Enter')
  await expect(overview).toBeChecked()
  await expect(details).not.toBeChecked()
})

test('read-only group preserves its selection with arrow keys', async ({
  page,
}) => {
  const group = page
    .locator('[data-visual-test="chip-groups"]')
    .getByRole('radiogroup', { name: 'Account (read only)', exact: true })
  const savings = group.getByRole('radio', { name: 'Savings' })
  const funds = group.getByRole('radio', { name: 'Funds' })

  await savings.focus()
  await savings.press('ArrowRight')
  await funds.press('Space')
  await funds.press('Enter')
  await funds.click()
  await expect(savings).toBeChecked()
  await expect(funds).not.toBeChecked()
  await expect(funds).toBeFocused()
})

test('read-only selections remain focusable and unchanged', async ({
  page,
}) => {
  const inputs = page.locator(
    '[data-visual-test="chip-states"] input[readonly]'
  )

  for (const input of await inputs.all()) {
    const checked = await input.isChecked()
    await input.click()
    await expect(input).toBeChecked({ checked })
    await input.focus()
    await expect(input).toBeFocused()
    await input.press('Space')
    await input.press('Enter')
    await expect(input).toBeChecked({ checked })
  }
})

test('radio and checkbox controls keep equal dimensions with skeletons', async ({
  page,
}) => {
  for (const fixture of ['chip-states', 'chip-skeleton']) {
    for (const variant of ['radio', 'checkbox']) {
      await test.step(`${fixture} ${variant}`, async () => {
        const control = page
          .locator(
            `[data-visual-test="${fixture}"] .dnb-chip--${variant} .dnb-${variant}__button`
          )
          .first()
        const { width, height } = await control.boundingBox()

        expect(width).toBeGreaterThan(0)
        expect(height).toBe(width)
      })
    }
  }
})

test('selected checkmarks remain visible in forced colors', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit',
    'WebKit does not support forced colors emulation.'
  )
  await page.emulateMedia({ forcedColors: 'active' })

  const chips = page.locator(
    '[data-visual-test="chip-states"] .dnb-chip--checkbox:has(input:checked)'
  )

  await page.keyboard.press('Tab')

  for (const chip of await chips.all()) {
    await chip.locator('input').focus()
    const background = await chip
      .locator('.dnb-checkbox__button')
      .evaluate((element) => getComputedStyle(element).backgroundColor)
    await expect(chip.locator('.dnb-checkbox__gfx')).not.toHaveCSS(
      'color',
      background
    )
  }

  const appearances = page.locator(
    '[data-visual-test="chip-group-appearances"]'
  )
  const checkbox = appearances.locator(
    '.dnb-chip--checkbox:has(input[type="radio"]:checked)'
  )
  await checkbox.locator('input').focus()
  const checkboxBackground = await checkbox
    .locator('.dnb-radio__button')
    .evaluate((element) => getComputedStyle(element).backgroundColor)
  await expect(checkbox.locator('.dnb-chip__check')).not.toHaveCSS(
    'color',
    checkboxBackground
  )

  const radioButton = appearances.locator(
    '.dnb-chip--radio input[type="checkbox"]:checked ~ .dnb-checkbox__button'
  )
  await appearances
    .locator('.dnb-chip--radio input[type="checkbox"]:checked')
    .focus()
  const radioColors = await radioButton.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    dot: getComputedStyle(element, '::after').backgroundColor,
  }))
  expect(radioColors.dot).not.toBe(radioColors.background)
})

test('addable indicators use system colors in every state', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit',
    'WebKit does not support forced colors emulation.'
  )
  await page.emulateMedia({ forcedColors: 'active' })

  const chips = page.locator(
    '[data-visual-test="chip-states"] .dnb-chip--addable'
  )

  for (const chip of await chips.all()) {
    await test.step(await chip.innerText(), async () => {
      await chip.locator('input').hover()
      const colors = await chip.evaluate((element) => {
        const input = element.querySelector('input')
        const action = element.querySelector('.dnb-chip__action')
        const palette = document.createElement('span')
        palette.style.forcedColorAdjust = 'none'
        palette.style.backgroundColor = input.disabled
          ? input.checked
            ? 'GrayText'
            : 'Canvas'
          : input.checked
            ? 'Highlight'
            : 'Canvas'
        palette.style.color = input.disabled
          ? input.checked
            ? 'Canvas'
            : 'GrayText'
          : input.checked
            ? 'HighlightText'
            : 'CanvasText'
        element.append(palette)
        const actual = getComputedStyle(action)
        const expected = getComputedStyle(palette)
        const result = {
          actual: {
            background: actual.backgroundColor,
            color: actual.color,
          },
          expected: {
            background: expected.backgroundColor,
            color: expected.color,
          },
        }
        palette.remove()
        return result
      })
      expect(colors.actual).toEqual(colors.expected)
    })
  }
})
