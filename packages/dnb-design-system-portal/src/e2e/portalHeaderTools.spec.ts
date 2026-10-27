import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

for (const width of [320, 390, 430]) {
  test(
    'keeps hash headings clear of the labeled phone toolbar at ' + width,
    async ({ page }) => {
      await page.setViewportSize({ width, height: 844 })
      await page.goto('/web/components/button/demos/#demos')
      await waitForApp(page)
      const header = page.locator('header.sticky-menu')
      const target = page.locator('#demos')
      await expect
        .poll(async () => {
          const heading = await target.boundingBox()
          const toolbar = await header.boundingBox()
          return heading.y - toolbar.y - toolbar.height
        })
        .toBeGreaterThanOrEqual(0)
    }
  )
}

for (const path of [
  '/',
  '/web/components/button/',
  '/web/getting-started/',
]) {
  for (const storedDark of [false, true]) {
    test(
      'hydrates the tools label on ' +
        path +
        ' with stored dark ' +
        storedDark,
      async ({ page }) => {
        await page.emulateMedia({
          colorScheme: storedDark ? 'light' : 'dark',
        })
        if (storedDark) {
          await page.addInitScript(() =>
            localStorage.setItem(
              'eufemia-theme',
              JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
            )
          )
        }
        const errors: Array<Promise<string>> = []
        page.on('console', (message) => {
          if (message.type() === 'error') {
            for (const argument of message.args()) {
              errors.push(
                argument
                  .evaluate((value) =>
                    value instanceof Error ? value.message : String(value)
                  )
                  .catch(() => message.text())
              )
            }
          }
        })
        await page.goto(path)
        await waitForApp(page)
        await expect(page.locator('button#portal-tools')).toHaveText(
          'DNB - Dark'
        )
        expect(
          (await Promise.all(errors)).filter((message) =>
            /#418|Hydration failed|hydration.*match/i.test(message)
          )
        ).toEqual([])
      }
    )
  }
}

for (const width of [390, 1440]) {
  test(
    'shows brand settings and Web resource links at ' + width + 'px',
    async ({ page }) => {
      await page.emulateMedia({
        colorScheme: 'light',
        reducedMotion: 'reduce',
      })
      await page.setViewportSize({ width, height: 900 })
      await page.goto('/')
      await waitForApp(page)
      const header = page.locator('header.sticky-menu')
      await expect(
        header.locator('a[href*="github.com"], a[href*="figma.com"]')
      ).toHaveCount(0)
      const tools = header.locator('button#portal-tools')
      await expect(tools).toHaveText('DNB - Light')
      await expect(tools).toHaveAttribute('aria-pressed', 'false')
      await expect(tools.locator('.dnb-icon svg')).toBeVisible()
      await tools.click()
      const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
      await expect(drawer).toBeVisible()
      await expect(tools).toHaveAttribute('aria-pressed', 'true')
      await drawer
        .getByRole('radio', { name: 'Dark', exact: true })
        .click()
      await expect(tools).toHaveText('DNB - Dark')
      await drawer.locator('#change-theme').click()
      await page
        .getByRole('option', { name: 'Sbanken (WIP)', exact: true })
        .click()
      await expect(tools).toHaveText('Sbanken - Dark')
      await drawer
        .getByRole('button', { name: /Close|Lukk/ })
        .first()
        .click()
      await expect(tools).toBeFocused()
      await expect(tools).toHaveAttribute('aria-pressed', 'false')
      await page.reload()
      await waitForApp(page)
      await expect(tools).toHaveText('Sbanken - Dark')
      expect(
        await tools.evaluate((el) => el.getBoundingClientRect().right)
      ).toBeLessThanOrEqual(width)

      if (width < 960) {
        await header.locator('#toggle-sidebar-menu').click()
      }
      const platform = page.getByRole('navigation', {
        name: 'Platform Content Menu',
      })
      const figma = platform.getByRole('link', {
        name: 'Figma',
        exact: true,
      })
      const github = platform.getByRole('link', {
        name: 'GitHub',
        exact: true,
      })
      await github.scrollIntoViewIfNeeded()
      await expect(figma).toHaveAttribute(
        'href',
        'https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web'
      )
      await expect(github).toHaveAttribute(
        'href',
        'https://github.com/dnbexperience/eufemia/'
      )
      await expect(figma).toHaveAttribute('target', '_blank')
      await expect(
        figma.locator('xpath=../preceding-sibling::*[1]')
      ).toHaveClass(/divider/)
      const selector = platform.getByRole('combobox')
      await selector.click()
      await expect
        .poll(
          async () =>
            (await page
              .locator('html')
              .getAttribute('data-dnb-drawer-list-active')) ===
            (
              await page
                .locator(
                  '.dnb-sidebar-menu__sections-portal .dnb-drawer-list'
                )
                .getAttribute('id')
            )?.replace(/-drawer-list$/, '')
        )
        .toBe(true)
      await page.keyboard.press('Home')
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      await expect(figma).toHaveCount(0)
      await expect(github).toHaveCount(0)
      await selector.click()
      await expect
        .poll(
          async () =>
            (await page
              .locator('html')
              .getAttribute('data-dnb-drawer-list-active')) ===
            (
              await page
                .locator(
                  '.dnb-sidebar-menu__sections-portal .dnb-drawer-list'
                )
                .getAttribute('id')
            )?.replace(/-drawer-list$/, '')
        )
        .toBe(true)
      await page.keyboard.press('Home')
      await page.keyboard.press('Enter')
      await expect(github).toBeAttached()
    }
  )
}

test('keeps long brand labels clear of the mobile logo', async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 900 })
  await page.addInitScript(() => {
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'carnegie', colorScheme: 'dark' })
    )
  })
  await page.goto('/')
  await waitForApp(page)
  const header = page.locator('header.sticky-menu')
  const tools = header.locator('button#portal-tools')
  await expect(tools).toHaveText('DNB Carnegie - Dark')
  const logoBox = await header
    .getByRole('link', { name: 'Go to Eufemia home' })
    .boundingBox()
  const toolsBox = await tools.boundingBox()
  expect(toolsBox.y).toBeGreaterThanOrEqual(logoBox.y + logoBox.height)
  expect(toolsBox.x).toBeGreaterThanOrEqual(16)
  expect(toolsBox.x + toolsBox.width).toBeLessThanOrEqual(304)
})

test('shows the resolved system color scheme and restores focus on Escape', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' })
  await page.goto('/')
  await waitForApp(page)
  const tools = page.locator('button#portal-tools')
  await expect(tools).toHaveText('DNB - Dark')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(tools).toHaveText('DNB - Light')
  await tools.click()
  const drawer = page.getByRole('dialog', { name: 'Portal Tools' })
  await expect(drawer).toBeVisible()
  await expect(drawer.locator('#change-theme')).toBeFocused()
  await page.keyboard.press('Escape')
  await expect(tools).toBeFocused()
  await expect(tools).toHaveAttribute('aria-pressed', 'false')
})
