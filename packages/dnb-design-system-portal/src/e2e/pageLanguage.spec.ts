import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Page language before hydration', () => {
  test.use({ javaScriptEnabled: false })

  for (const route of [
    '/',
    '/uilib/',
    '/uilib/components/button/',
    '/uilib/extensions/forms/',
    '/contribute/',
    '/EUFEMIA_CHANGELOG/',
    '/uilib/extensions/forms/Value/BankAccountNumber/',
  ]) {
    test(`declares English on ${route}`, async ({ page }) => {
      await page.goto(route)

      await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    })
  }

  test('declares the default component language on prerendered examples', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/components/autocomplete/demos/#default-autocomplete'
    )

    await expect(
      page.locator('#AutocompleteDefaultExample .dnb-live-preview')
    ).toHaveAttribute('lang', 'nb-NO')
  })
})

test('keeps documentation in English and follows Portal Tools for previews and popups', async ({
  page,
}) => {
  const hydrationErrors: string[] = []
  page.on('console', (message) => {
    if (
      /hydration|didn't match|Minified React error/i.test(message.text())
    ) {
      hydrationErrors.push(message.text())
    }
  })
  await page.goto(
    '/uilib/components/autocomplete/demos/#default-autocomplete'
  )
  await waitForApp(page)

  const preview = page.locator(
    '#AutocompleteDefaultExample .dnb-live-preview'
  )
  const input = preview.getByRole('combobox')
  const placeholder = preview.locator('.dnb-input__placeholder')
  const expectPopupLanguage = async (locale: string) => {
    await input.click()
    await expect(input).toHaveAttribute('aria-expanded', 'true')
    const listboxId = await input.getAttribute('aria-controls')
    const popup = page.locator('.eufemia-portal-root').filter({
      has: page.locator(`[id="${listboxId}"]`),
    })

    await expect(popup).toHaveAttribute('lang', locale)
  }

  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expect(preview).toHaveAttribute('lang', 'nb-NO')
  await expect(placeholder).toHaveText('Skriv og velg')
  await expectPopupLanguage('nb-NO')
  await input.press('Escape')

  await page
    .getByRole('button', { name: 'Portal Tools', exact: true })
    .first()
    .click()
  await page.getByLabel('Change components language').click()
  await page
    .locator('li.dnb-drawer-list__option')
    .filter({ hasText: 'English (GB)' })
    .click()

  await expect(preview).toHaveAttribute('lang', 'en-GB')
  await expect(placeholder).toHaveText('Type and select')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  const tools = page.getByRole('dialog', { name: 'Portal Tools' })
  await tools
    .getByRole('button', { name: /Close|Lukk/ })
    .first()
    .click()
  await expect(tools).not.toBeVisible()

  await page.reload()
  await waitForApp(page)

  await expect(preview).toHaveAttribute('lang', 'en-GB')
  await expect(placeholder).toHaveText('Type and select')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await expectPopupLanguage('en-GB')
  expect(hydrationErrors).toEqual([])
})
