import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/components/chip/demos/?fullscreen')
  await expect(page.locator('.dnb-chip').first()).toBeVisible()
})

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
    .getByRole('radiogroup', { name: 'Account', exact: true })
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

  for (const chip of await chips.all()) {
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
  const radioColors = await radioButton.evaluate((element) => ({
    background: getComputedStyle(element).backgroundColor,
    dot: getComputedStyle(element, '::after').backgroundColor,
  }))
  expect(radioColors.dot).not.toBe(radioColors.background)
})
