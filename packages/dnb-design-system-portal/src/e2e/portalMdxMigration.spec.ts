import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps the component overview and related links populated', async ({
  page,
}) => {
  await page.goto('/web/components/overview')
  await waitForApp(page)
  await expect(
    page.locator('main a[href="/web/components/button"]')
  ).toBeVisible()
  await expect(page.locator('main a[href*="/categories/"]')).toHaveCount(0)
  await page.goto('/web/components/button')
  await waitForApp(page)
  await expect(
    page.getByRole('heading', { name: 'Related components', exact: true })
  ).toBeVisible()
})

test('preserves fragments when following a legacy link within the app', async ({
  page,
}) => {
  await page.goto('/design-system/about')
  await waitForApp(page)
  await page.evaluate(() => {
    const link = document.createElement('a')
    link.href =
      '/uilib/usage/first-steps/tools?from=legacy-link#agent-skills'
    link.textContent = 'Legacy AI link'
    document.querySelector('main').append(link)
  })
  await page
    .getByRole('link', { name: 'Legacy AI link', exact: true })
    .click()
  await expect(page).toHaveURL(
    '/working-with-ai/ai-skills?from=legacy-link#agent-skills'
  )
})

test('keeps old component routes, query strings, fragments and tabs working', async ({
  page,
}) => {
  await page.goto('/uilib/components/button?eufemia-theme=sbanken#sizes')
  await waitForApp(page)
  await expect(page).toHaveURL(
    '/web/components/button/?eufemia-theme=sbanken#sizes'
  )
  await expect(
    page.getByRole('heading', { name: 'Button', exact: true })
  ).toBeVisible()
  await page.getByRole('tab', { name: 'Properties', exact: true }).click()
  await expect(page).toHaveURL(
    '/web/components/button/properties?eufemia-theme=sbanken'
  )
  await expect(
    page.getByRole('tab', { name: 'Properties', exact: true })
  ).toHaveAttribute('aria-selected', 'true')
})

test('opens accordion headings without navigating and retains content links', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await waitForApp(page)
  const menu = page.getByRole('navigation', {
    name: 'Section Content Menu',
  })
  await menu
    .getByRole('button', { name: 'Design language', exact: true })
    .click()
  const typography = menu.getByRole('button', {
    name: 'Typography',
    exact: true,
  })
  await typography.click()
  await expect(page).toHaveURL('/')
  await expect(typography).toHaveAttribute('aria-expanded', 'true')
  await menu
    .getByRole('link', { name: 'Typography overview', exact: true })
    .click()
  await expect(page).toHaveURL('/web/typography')
  await expect(
    page.getByRole('heading', { name: 'Typography', exact: true })
  ).toBeVisible()
})

for (const path of [
  '/uilib/usage/first-steps/tools?from=bookmark#agent-skills',
  '/web/usage/first-steps/tools?from=bookmark#agent-skills',
]) {
  test(
    'redirects the old skills section from ' + path,
    async ({ page }) => {
      await page.goto(path)
      await waitForApp(page)
      await expect(page).toHaveURL(
        /[/]working-with-ai[/]ai-skills[/]?[?]from=bookmark#agent-skills$/
      )
      await expect(
        page.getByRole('heading', { name: 'AI skills', exact: true })
      ).toBeVisible()
    }
  )
}

for (const path of [
  '/uilib/usage/first-steps/tools#ai-assistance-and-mcp-server',
  '/web/usage/first-steps/tools#ai-assistance-and-mcp-server',
]) {
  test('redirects the old MCP section from ' + path, async ({ page }) => {
    await page.goto(path)
    await waitForApp(page)
    await expect(page).toHaveURL(
      /[/]working-with-ai[/]mcp-universe[/]?#ai-assistance-and-mcp-server$/
    )
    await expect(
      page.getByRole('heading', { name: 'MCP Universe', exact: true })
    ).toBeVisible()
  })
}

for (const path of [
  '/working-with-ai/ai-skills',
  '/working-with-ai/mcp-universe',
]) {
  test('opens the dedicated AI page ' + path, async ({ page }) => {
    await page.goto(path)
    await waitForApp(page)
    await expect(page.locator('main h1')).toBeVisible()
  })
}

test('keeps the introduction and first-tab aliases accessible', async ({
  page,
}) => {
  await page.goto('/uilib?source=legacy#ui-library')
  await waitForApp(page)
  await expect(page).toHaveURL(
    '/web/introduction/?source=legacy#ui-library'
  )
  await page.goto('/uilib/components/button/info?source=legacy#sizes')
  await waitForApp(page)
  await expect(page).toHaveURL(
    '/web/components/button/?source=legacy#sizes'
  )
})
