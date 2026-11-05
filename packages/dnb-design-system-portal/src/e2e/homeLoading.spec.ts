import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'
import isDev from './shared/isDev'

test('Home does not load documentation code tools', async ({ page }) => {
  const requests: string[] = []
  page.on('request', (request) => requests.push(request.url()))
  await page.goto('/')
  await waitForApp(page)
  await expect(page.locator('[data-portal-home]')).toBeVisible()
  expect(
    requests.filter((url) =>
      /CodeBlock|react-live|prism|prettier/i.test(url)
    )
  ).toEqual([])
})

for (const brand of ['ui', 'sbanken']) {
  test(
    'only fetches the selected ' + brand + ' theme on Home',
    async ({ page }) => {
      const themes: string[] = []
      page.on('request', (request) => {
        const match = request
          .url()
          .match(/eufemia-theme-(ui|sbanken|eiendom|carnegie)-.*\.css/)
        if (match) {
          themes.push(match[1])
        }
      })
      await page.goto('/?eufemia-theme=' + brand)
      await waitForApp(page)
      test.skip(await isDev(page), 'Production stylesheet loading')
      await expect(page.locator('body')).toHaveClass(
        new RegExp('eufemia-theme__' + brand + '(?: |$)')
      )
      expect(themes).toEqual([brand])
    }
  )
}

test('loads highlighted code when navigating from Home', async ({
  page,
}) => {
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text())
    }
  })
  await page.goto('/')
  await waitForApp(page)
  await page
    .locator('[data-portal-home]')
    .getByRole('link', { name: /Develop/ })
    .click()
  await expect(page).toHaveURL(/\/web\/getting-started\//)
  await expect(
    page.locator('pre.language-bash .token').first()
  ).toBeVisible()
  await expect(page.locator('pre.language-bash')).toContainText(
    'npm i @dnb/eufemia'
  )
  await expect(
    page.getByRole('button', { name: 'Copy to clipboard' }).first()
  ).toBeVisible()
  expect(errors).toEqual([])
})

test('renders highlighted Markdown code without JavaScript', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  try {
    const page = await context.newPage()
    await page.goto(new URL('/web/getting-started/', baseURL).toString())
    await expect(
      page.locator('pre.language-bash .token').first()
    ).toBeVisible()
    await expect(page.locator('pre.language-bash')).toContainText(
      'npm i @dnb/eufemia'
    )
    await expect(page.locator('h1')).toHaveCSS('font-family', /DNB/)
  } finally {
    await context.close()
  }
})

test('waits for the selected theme before painting Home', async ({
  page,
}) => {
  await page.route(/eufemia-theme-ui-.*\.css/, async (route) => {
    const response = await route.fetch()
    // Expose an unstyled first paint even on a fast local connection.
    await new Promise((resolve) => setTimeout(resolve, 500))
    await route.fulfill({ response })
  })
  await page.addInitScript(() => {
    requestAnimationFrame(function sample() {
      const heading = document.querySelector('[data-portal-home] h1')
      if (!heading) {
        requestAnimationFrame(sample)
        return
      }
      document.documentElement.dataset.firstPaintFont =
        getComputedStyle(heading).fontFamily
    })
  })
  await page.goto('/')
  await waitForApp(page)
  test.skip(await isDev(page), 'Production stylesheet loading')
  await expect(page.locator('html')).toHaveAttribute(
    'data-first-paint-font',
    /DNB/
  )
})
