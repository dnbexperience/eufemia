import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const storedScheme of [undefined, 'dark', 'light'] as const) {
  test(`shows the tools scheme before hydration with ${storedScheme || 'system dark'}`, async ({
    page,
  }) => {
    await page.emulateMedia({
      colorScheme: storedScheme === 'dark' ? 'light' : 'dark',
    })
    await page.addInitScript((colorScheme) => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ brand: 'ui', colorScheme })
      )
    }, storedScheme)
    let resume: () => void
    const scripts = new Promise<void>((resolve) => {
      resume = resolve
    })
    await page.route('**/*.js', async (route) => {
      await scripts
      await route.continue()
    })
    await page.goto('/web/components/button/', { waitUntil: 'commit' })
    const tools = page.locator('button#portal-tools')
    const label = `DNB - ${storedScheme === 'light' ? 'Light' : 'Dark'}`

    try {
      await expect(page.locator('html')).not.toHaveAttribute(
        'data-portal-ready'
      )
      await expect(
        tools.getByText(storedScheme === 'light' ? 'Light' : 'Dark', {
          exact: true,
        })
      ).toBeVisible()
      await expect(tools).toHaveAccessibleName(`${label} Settings`)
    } finally {
      resume()
    }

    await waitForApp(page)
    await expect(tools).toHaveAccessibleName(`${label} Settings`)
  })
}
