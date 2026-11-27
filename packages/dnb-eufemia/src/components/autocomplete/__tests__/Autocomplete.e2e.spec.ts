import { expect, test } from '@playwright/test'

test('Tab skips the VoiceOver announcement for an option with a legacy link', async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'platform', { value: 'MacIntel' })
    Object.defineProperty(navigator, 'userAgentData', {
      value: { platform: 'macOS' },
    })
  })
  await page.goto('/web/components/autocomplete/demos/')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await page.locator('.dnb-live-editor pre[contenteditable]').first()
    .fill(`
    <>
      <Autocomplete
        label="VoiceOver regression"
        noAnimation
        value={0}
        data={[
          'First option',
          {
            content: ['Second option', <a key="link" href="#legacy">Nested link</a>],
            suffixValue: <span aria-label="Balance: 1234 kroner">1 234,00 kr</span>,
          },
          'Third option',
        ]}
      />
      <button>After autocomplete</button>
    </>
  `)
  await page.keyboard.press('End')
  const input = page.getByRole('combobox', {
    name: 'VoiceOver regression',
  })
  await input.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await page.keyboard.press('ArrowDown')
  await expect(
    page.locator('.dnb-drawer-list__option--focus')
  ).toContainText('Second option')
  const announcement = page
    .locator('.dnb-aria-live[aria-live="assertive"]:not([hidden])')
    .first()
  await expect(announcement).toContainText('Nested link')
  await expect(announcement).toContainText('Balance:')
  await expect(announcement).toContainText('kroner')
  await expect(announcement.locator('a, button, input')).toHaveCount(0)
  await page.keyboard.press('Tab')
  await expect(
    page.getByRole('button', { name: 'After autocomplete', exact: true })
  ).toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toHaveValue('First option')
  await expect(announcement).toHaveText('Valgt: First option')
})

test('Tab leaves autocomplete options and Enter selects the active option', async ({
  page,
}) => {
  await page.goto('/web/components/autocomplete/demos/?fullscreen')
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )

  const input = page
    .getByRole('combobox', { name: 'Label', exact: true })
    .first()
  const nextControl = page
    .getByRole('checkbox', { name: /Light mode|Dark mode/, exact: true })
    .first()
  await input.focus()
  await input.press('ArrowDown')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('ArrowDown')
  await expect(input).toHaveAttribute('aria-activedescendant', /option-/)
  const listbox = page.locator(
    `#${await input.getAttribute('aria-controls')}`
  )
  await expect(listbox).toBeVisible()

  await input.press('Tab')
  await expect(nextControl).toBeFocused()
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(page.locator('html')).not.toHaveAttribute(
    'data-dnb-drawer-list-active'
  )

  await nextControl.press('Shift+Tab')
  await expect(input).toBeFocused()
  await input.press('ArrowDown')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active',
    await input.getAttribute('id')
  )
  await input.press('ArrowDown')
  const activeOption = listbox.locator('.dnb-drawer-list__option--focus')
  const selectedText = (await activeOption.innerText())
    .replace(/\s+/g, ' ')
    .trim()
  await input.press('Enter')
  await expect(input).toHaveValue(selectedText)
  await expect(input).toHaveAttribute('aria-expanded', 'false')
  await expect(input).toBeFocused()
})
