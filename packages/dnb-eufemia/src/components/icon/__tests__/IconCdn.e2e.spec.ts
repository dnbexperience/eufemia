import { test, expect } from '@playwright/test'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'

const directory = 'https://assets.eufemia.dnb.no/icons/dnb'
const demoSelector = '[data-visual-test="icon-cdn"]'

test.beforeEach(async ({ page }) => {
  await page.route(`${directory}/*.svg`, async (route) => {
    const name = new URL(route.request().url()).pathname.split('/').at(-1)
    const file = path.resolve(
      __dirname,
      '../../../../assets/icons/dnb',
      name
    )
    if (!existsSync(file)) {
      await route.fulfill({
        status: 404,
        headers: { 'access-control-allow-origin': '*' },
      })
      return
    }

    await route.fulfill({
      contentType: 'image/svg+xml',
      headers: { 'access-control-allow-origin': '*' },
      body: readFileSync(file),
    })
  })
  await page.goto('/uilib/components/icon/demos#dynamic-cdn-icons')
  await page.waitForFunction(() => {
    return document.documentElement.hasAttribute('data-portal-ready')
  })
  await expect(
    page.locator(demoSelector).getByLabel('Icon name', { exact: true })
  ).toBeVisible()
})

test('loads runtime names, reserves dimensions and preserves button labels', async ({
  page,
}, testInfo) => {
  const demo = page.locator(demoSelector)
  const preview = demo.locator('.dnb-flex-container--direction-horizontal')
  const icons = preview.locator('.dnb-icon__cdn')
  await expect(icons).toHaveCount(4)
  await expect(preview.locator('button svg')).toHaveCount(1)
  await expect(icons.nth(0)).toHaveCSS('width', '16px')
  await expect(icons.nth(1)).toHaveCSS('width', '24px')
  await expect(icons.nth(2)).toHaveCSS('width', '24px')
  await expect(icons.nth(2)).toHaveCSS('height', '24px')
  await expect(icons.nth(1)).toHaveCSS(
    'mask-image',
    `url("${directory}/bell_medium.svg")`
  )
  await expect(icons.nth(3)).toHaveCSS(
    'background-image',
    `url("${directory}/bell.svg")`
  )
  await expect(
    demo.getByRole('button', { name: 'Notifications', exact: true })
  ).toBeVisible()

  const response = page.waitForResponse(`${directory}/heart_medium.svg`)
  await demo.getByLabel('Icon name', { exact: true }).fill('heart')
  expect((await response).ok()).toBe(true)
  await expect(icons.nth(0)).toHaveCSS(
    'mask-image',
    `url("${directory}/heart.svg")`
  )
  await expect(icons.nth(1)).toHaveCSS(
    'mask-image',
    `url("${directory}/heart_medium.svg")`
  )
  await expect(icons).toHaveCount(5)
  await expect(preview.locator('button svg')).toHaveCount(0)
  await expect(preview.locator('button .dnb-icon__cdn')).toHaveCSS(
    'mask-image',
    `url("${directory}/heart.svg")`
  )
  await testInfo.attach('dynamic-cdn-icons', {
    body: await demo.screenshot({
      path: testInfo.outputPath('dynamic-cdn-icons.png'),
    }),
    contentType: 'image/png',
  })

  await demo.getByLabel('Icon name', { exact: true }).fill('missing_icon')
  await expect(icons.nth(0)).toHaveCSS('width', '16px')
  await expect(icons.nth(2)).toHaveCSS('height', '24px')
  await expect(
    demo.getByRole('button', { name: 'Notifications', exact: true })
  ).toBeVisible()
  await expect(demo.locator('img')).toHaveCount(0)

  await demo.getByLabel('Icon name', { exact: true }).fill('bell_medium')
  await expect(icons.nth(0)).toHaveCSS('width', '24px')
  await expect(icons.nth(0)).toHaveCSS(
    'mask-image',
    `url("${directory}/bell_medium.svg")`
  )
  await expect(icons).toHaveCount(4)
  await expect(preview.locator('button svg')).toHaveCount(1)
})

test('keeps mask icons visible in forced colors', async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName === 'webkit',
    'WebKit does not support forced colors emulation.'
  )
  await page.emulateMedia({ forcedColors: 'active' })
  const icon = page.locator(`${demoSelector} .dnb-icon__cdn--mask`).first()
  await expect(icon).toHaveCSS('forced-color-adjust', 'none')
  const background = await icon.evaluate(
    (element) => getComputedStyle(element).backgroundColor
  )
  expect(background).not.toBe('rgba(0, 0, 0, 0)')
  await expect(icon).toHaveCSS(
    'mask-image',
    `url("${directory}/bell.svg")`
  )
})

test('allows selecting suggestions and retaining a manually entered name', async ({
  page,
}, testInfo) => {
  const demo = page.locator(demoSelector)
  const input = demo.getByRole('combobox', {
    name: 'Icon name',
    exact: true,
  })
  const icon = demo.locator('.dnb-icon__cdn').first()

  await input.fill('sta')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active'
  )
  await expect(
    page.getByRole('option', { name: 'star', exact: true })
  ).toBeVisible()
  await input.press('ArrowDown')
  await expect(
    page.getByRole('option', { name: 'star', exact: true })
  ).toHaveClass(/dnb-drawer-list__option--focus/)
  await input.press('Enter')
  await expect(input).toHaveValue('star')
  await expect(icon).toHaveCSS(
    'mask-image',
    `url("${directory}/star.svg")`
  )
  await expect(input).toBeFocused()
  await input.fill('hea')
  await page.getByRole('option', { name: 'heart', exact: true }).click()
  await expect(input).toHaveValue('heart')
  await expect(icon).toHaveCSS(
    'mask-image',
    `url("${directory}/heart.svg")`
  )
  await expect(input).toBeFocused()

  await input.fill('home')
  await demo
    .getByRole('button', { name: 'Notifications', exact: true })
    .click()
  await expect(input).toHaveValue('home')
  await expect(icon).toHaveCSS(
    'mask-image',
    `url("${directory}/home.svg")`
  )
  await input.fill('')
  await expect(page.locator('html')).toHaveAttribute(
    'data-dnb-drawer-list-active'
  )
  await expect(
    page.getByRole('option', { name: 'heart', exact: true })
  ).toBeVisible()
  await testInfo.attach('icon-autocomplete', {
    body: await page.screenshot({
      path: testInfo.outputPath('icon-autocomplete.png'),
      animations: 'disabled',
    }),
    contentType: 'image/png',
  })
})
