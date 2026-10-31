import { test, expect } from '@playwright/test'

test('prints an empty Input without its placeholder and restores the hint on screen', async ({
  page,
}) => {
  await page.goto(
    '/web/usage/customisation/styling/document-styles/visual-tests/plain/'
  )
  const input = page.getByLabel('Empty reference', { exact: true })
  const placeholder = page
    .locator('.dnb-input')
    .filter({ has: input })
    .locator('.dnb-input__placeholder')
  await expect(input).toHaveValue('')
  await expect(placeholder).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(placeholder).toBeHidden()
  await expect(input).toHaveValue('')
  await expect(page.getByLabel('Reference', { exact: true })).toHaveValue(
    '12345'
  )
  await page.emulateMedia({ media: 'screen' })
  await expect(placeholder).toBeVisible()
})

test('scopes Portal page margins to its named page', async ({ page }) => {
  await page.goto('/web/usage/customisation/styling/printable-apps/')
  await expect(page.locator('[data-portal-print-layout]')).toBeVisible()
  await page.emulateMedia({ media: 'print' })
  await expect(page.locator('body')).toHaveCSS('page', 'portal-print')
  await page.goto(
    '/web/usage/customisation/styling/document-styles/visual-tests/plain/'
  )
  await expect(
    page.locator('[data-visual-test="style-sample"]')
  ).toBeVisible()
  await expect(page.locator('body')).toHaveCSS('page', 'auto')
  const unscopedMargins = await page.evaluate(() => {
    const result: string[] = []
    function inspect(rules: CSSRuleList) {
      for (const rule of Array.from(rules)) {
        if (
          rule instanceof CSSPageRule &&
          !rule.selectorText &&
          rule.style.margin
        ) {
          result.push(rule.style.margin)
        }
        if ('cssRules' in rule) {
          inspect((rule as CSSGroupingRule).cssRules)
        }
      }
    }
    for (const sheet of Array.from(document.styleSheets)) {
      inspect(sheet.cssRules)
    }
    return result
  })
  expect(unscopedMargins).toEqual([])
})

test('prints documentation while Portal Tools is open', async ({
  page,
}) => {
  await page.goto('/web/components/button/properties/')
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute('data-portal-ready')
  )
  await page.locator('#portal-tools').click()
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
  await page.goto('/web/components/tabs/demos/')
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
  await page.goto('/web/intro/03-accessibility/')
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
    '/web/usage/customisation/styling/document-styles/preview/'
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
    '/web/usage/customisation/styling/document-styles/visual-tests/plain/'
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
      await page.goto('/web/usage/customisation/styling/document-styles/')
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
      ).toContainText('/web/usage/customisation/styling/document-styles/')
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
  await page.goto('/web/components/button/properties/')
  await page.waitForFunction(() =>
    document.documentElement.hasAttribute('data-portal-ready')
  )
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
  const menu = page.getByRole('dialog', { name: 'Menu', exact: true })
  await expect(menu).toBeVisible()
  await expect(
    page.locator('#dnb-app-content h1').first()
  ).toHaveAttribute('aria-hidden', 'true')
  await menu.locator('.dnb-modal__close-button').click()
  await expect(page.locator('#toggle-sidebar-menu')).toHaveAttribute(
    'aria-expanded',
    'false'
  )
  await expect(page.locator('#dnb-app-content h1').first()).toBeVisible()
})
