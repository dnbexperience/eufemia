import { test, expect, type Locator } from '@playwright/test'

async function expectState(
  example: Locator,
  checked: boolean,
  changes: boolean[]
) {
  await expect(example.getByRole('checkbox')).toBeChecked({ checked })
  await expect(example.getByTestId('value')).toHaveText(String(checked))
  await expect(example.getByTestId('changes')).toHaveText(
    JSON.stringify(changes)
  )
}

for (const mode of ['onClick', 'readOnly']) {
  for (const { initialChecked, nextChecked } of [
    { initialChecked: false, nextChecked: true },
    { initialChecked: true, nextChecked: false },
  ]) {
    for (const activation of ['label', 'input', 'Space']) {
      test(`keeps checked=${initialChecked} after ${mode} cancels a ${activation} activation`, async ({
        page,
      }) => {
        await page.goto(
          '/uilib/components/checkbox/visual-tests/canceled-changes/'
        )
        await expect(page.locator('html')).toHaveAttribute(
          'data-portal-ready',
          'true'
        )

        const example = page.getByTestId(`${mode}-${initialChecked}`)
        const input = example.getByRole('checkbox')
        const activate = async () => {
          if (activation === 'Space') {
            await input.focus()
            await input.press('Space')
          } else if (activation === 'label') {
            await example.locator('label').click()
          } else {
            await input.click()
          }
        }

        await expectState(example, initialChecked, [])

        await activate()
        await expectState(example, initialChecked, [])

        // A later render must not apply the canceled value.
        await example.getByRole('button', { name: 'Render again' }).click()
        await expect(example.getByTestId('renders')).toHaveText('1')
        await expectState(example, initialChecked, [])

        await example
          .getByRole('button', { name: 'Allow changes' })
          .click()
        await expectState(example, initialChecked, [])

        await activate()
        await expectState(example, nextChecked, [nextChecked])

        await activate()
        await expectState(example, initialChecked, [
          nextChecked,
          initialChecked,
        ])
      })
    }
  }
}

for (const mode of ['onClick', 'readOnly']) {
  test(`keeps indeterminate state after ${mode} cancels a click`, async ({
    page,
  }) => {
    await page.goto(
      '/uilib/components/checkbox/visual-tests/canceled-changes/'
    )
    await expect(page.locator('html')).toHaveAttribute(
      'data-portal-ready',
      'true'
    )
    const example = page.getByTestId(`${mode}-false-indeterminate`)
    const input = example.getByRole('checkbox')

    await expect(input).toHaveJSProperty('indeterminate', true)
    await input.click()
    await expect(input).toHaveJSProperty('indeterminate', true)
    await expectState(example, false, [])

    await example.getByRole('button', { name: 'Render again' }).click()
    await expect(input).toHaveJSProperty('indeterminate', true)
    await expectState(example, false, [])
  })
}
