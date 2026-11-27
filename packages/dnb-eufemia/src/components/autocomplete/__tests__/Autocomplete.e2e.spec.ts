import { expect, test } from '@playwright/test'

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
