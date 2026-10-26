import { test, expect } from '@playwright/test'

test('prints documentation while Portal Tools is open', async ({
  page,
}) => {
  await page.goto('/uilib/components/button/properties/')
  await page
    .getByRole('button', { name: 'Portal Tools', exact: true })
    .click()
  const tools = page.getByRole('dialog', { name: 'Portal Tools' })
  await expect(tools).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(tools).toBeHidden()
  await expect(page.locator('#dnb-app-content h1').first()).toBeVisible()
  await page.emulateMedia({ media: 'screen' })
  await expect(tools).toBeVisible()
})

test('hides page navigation while retaining tab controls inside examples', async ({
  page,
}) => {
  await page.goto('/uilib/components/tabs/demos/')
  const exampleTabs = page.locator(
    '[data-visual-test="tabs-tablist"] .dnb-tabs__tabs'
  )
  await expect(exampleTabs).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('[data-portal-page-tabs]')).toBeHidden()
  await expect(exampleTabs).toBeVisible()
  await expect(
    exampleTabs.locator(
      '.dnb-tabs__button[aria-selected="true"] .dnb-tabs__button__title'
    )
  ).toHaveCSS('text-decoration-line', 'underline')
})

test('uses plain paper for fullscreen documentation', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
    )
  })
  await page.goto('/uilib/intro/03-accessibility/')
  await expect(page.locator('[data-portal-print-layout]')).toHaveClass(
    /dnb-print--plain/
  )
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#dnb-app-content')).toHaveCSS(
    'color',
    'rgb(0, 0, 0)'
  )
  await expect(page.locator('[data-portal-print-footer]')).toBeVisible()
})

test('preserves the document preview print layout', async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'dark' })
    )
  })
  await page.goto(
    '/uilib/usage/customisation/styling/document-styles/preview/'
  )
  await expect(page.locator('#letter')).toBeVisible()
  await expect(page.locator('[data-portal-print-layout]')).toHaveCount(0)
  await page.emulateMedia({ media: 'print' })
  expect(
    await page
      .locator('#letter')
      .evaluate((element) =>
        parseFloat(getComputedStyle(element).fontSize)
      )
  ).toBeCloseTo(14.6667, 2)
  await expect(page.locator('#letter')).toHaveCSS(
    'page',
    'document-preview'
  )
  const ancestorBackgrounds = await page
    .locator('#letter')
    .evaluate((element) => {
      const backgrounds: string[] = []
      for (
        let parent = element.parentElement;
        parent;
        parent = parent.parentElement
      ) {
        backgrounds.push(getComputedStyle(parent).backgroundColor)
      }
      return backgrounds
    })
  expect(
    ancestorBackgrounds.every(
      (color) =>
        color === 'rgba(0, 0, 0, 0)' || color === 'rgb(255, 255, 255)'
    )
  ).toBe(true)
  await expect(page.locator('[data-portal-print-footer]')).toHaveCount(0)
})

test('preserves printed selection indicators without background graphics', async ({
  page,
}) => {
  await page.goto(
    '/uilib/usage/customisation/styling/document-styles/visual-tests/plain/'
  )
  await expect(
    page.getByLabel('Selected option', { exact: true })
  ).toBeChecked()
  await page.emulateMedia({ media: 'print' })
  expect(
    await page
      .locator('.dnb-radio__input:checked ~ .dnb-radio__dot')
      .evaluate((el) => parseFloat(getComputedStyle(el).borderTopWidth))
  ).toBeGreaterThan(0)
  expect(
    await page
      .locator(
        '.dnb-checkbox__input:indeterminate ~ .dnb-checkbox__indeterminate'
      )
      .evaluate((el) => parseFloat(getComputedStyle(el).borderTopWidth))
  ).toBeGreaterThan(0)
})

for (const brand of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  for (const colorScheme of ['light', 'dark']) {
    test(`prints ${brand} documentation without Portal chrome in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.addInitScript(
        ({ scheme, brand }) => {
          localStorage.setItem(
            'eufemia-theme',
            JSON.stringify({ brand, colorScheme: scheme })
          )
        },
        { scheme: colorScheme, brand }
      )
      await page.goto(
        '/uilib/usage/customisation/styling/document-styles/'
      )
      await expect(
        page.locator('#dnb-app-content h1').first()
      ).toBeVisible()
      const screenColors = await page
        .locator('#dnb-app-content')
        .evaluate((element) => ({
          color: getComputedStyle(element).color,
          background: getComputedStyle(element).backgroundColor,
        }))
      await page.emulateMedia({ media: 'print' })
      await expect(page.locator('.sticky-menu')).toBeHidden()
      await expect(page.locator('#portal-sidebar-menu')).toBeHidden()
      await expect(
        page.getByRole('button', { name: 'Suggest an edit' })
      ).toBeHidden()
      await expect(
        page.getByText('Package release:', { exact: false })
      ).toBeHidden()
      await expect(
        page.locator('[data-portal-print-footer]')
      ).toBeVisible()
      await expect(
        page.locator('[data-portal-print-footer]')
      ).toContainText(
        '/uilib/usage/customisation/styling/document-styles/'
      )
      const printStyle = await page
        .locator('#dnb-app-content')
        .evaluate((element) => {
          const style = getComputedStyle(element)
          return {
            color: style.color,
            margin: style.marginLeft,
            overflow: style.overflow,
            width: element.getBoundingClientRect().width,
            viewport: innerWidth,
          }
        })
      expect(printStyle.color).toBe('rgb(0, 0, 0)')
      expect(printStyle.margin).toBe('0px')
      expect(printStyle.overflow).toBe('visible')
      expect(printStyle.width).toBeLessThanOrEqual(printStyle.viewport)
      const background = await page
        .locator('#dnb-app-content pre')
        .first()
        .evaluate((element) => getComputedStyle(element).backgroundColor)
      expect(background).toBe('rgba(0, 0, 0, 0)')
      await page.emulateMedia({ media: 'screen' })
      await expect(page.locator('.sticky-menu')).toBeVisible()
      await expect(page.locator('[data-portal-print-footer]')).toBeHidden()
      expect(
        await page.locator('#dnb-app-content').evaluate((element) => ({
          color: getComputedStyle(element).color,
          background: getComputedStyle(element).backgroundColor,
        }))
      ).toEqual(screenColors)
    })
  }
}

test('keeps documentation available when the mobile menu is open', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/uilib/components/button/properties/')
  await expect(page.locator('#dnb-app-content h1').first()).toBeVisible()
  await page.locator('#toggle-sidebar-menu').click()
  await expect(page.locator('#toggle-sidebar-menu')).toHaveAttribute(
    'aria-expanded',
    'true'
  )
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('#portal-sidebar-menu')).toBeHidden()
  await expect(page.locator('#dnb-app-content h1').first()).toBeVisible()
  await expect(
    page.locator('#dnb-app-content table').first()
  ).toBeVisible()
  await page.emulateMedia({ media: 'screen' })
  await expect(page.locator('#dnb-app-content h1').first()).toBeHidden()
  await page.locator('#toggle-sidebar-menu').click()
  await expect(page.locator('#toggle-sidebar-menu')).toHaveAttribute(
    'aria-expanded',
    'false'
  )
  await expect(page.locator('#dnb-app-content h1').first()).toBeVisible()
})
