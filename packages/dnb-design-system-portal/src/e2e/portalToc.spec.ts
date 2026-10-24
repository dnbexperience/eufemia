import { test, expect } from '@playwright/test'

test.describe('Portal table of contents', () => {
  test('aligns the desktop TOC with the title and matches the left sidebar gap', async ({
    page,
  }) => {
    for (const width of [1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/uilib/components/table-of-content/')
      const toc = page.locator('#content-grid-sidebar nav')
      await expect(toc.locator('a').first()).toBeVisible()
      const title = await page.locator('h1').boundingBox()
      const navigation = await toc.boundingBox()
      const content = await page.locator('#tab-bar-content').boundingBox()
      const sidebar = await page
        .locator('#portal-sidebar-menu')
        .boundingBox()
      expect(Math.abs(navigation.y - title.y)).toBeLessThanOrEqual(1)
      const gap = navigation.x - (content.x + content.width)
      expect(gap).toBeCloseTo(content.x - (sidebar.x + sidebar.width), 0)
    }
  })
  test('keeps the desktop TOC at its starting position from the first scroll', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/button/')
    const toc = page.locator('#content-grid-sidebar nav')
    await expect(toc.locator('a').first()).toBeVisible()
    const initialTop = (await toc.boundingBox()).y
    for (const top of [16, 48, 160, 500]) {
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: 'instant' }),
        top
      )
      await expect
        .poll(async () => (await toc.boundingBox()).y)
        .toBeCloseTo(initialTop, 0)
    }
  })
  test('follows headings with non-ASCII ids', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/number-format/demos/')
    const link = page.locator('#content-grid-sidebar').getByRole('link', {
      name: 'National Identification number (Fødselsnummer)',
      exact: true,
    })
    await link.click()
    await expect(page).toHaveURL(
      /national-identification-number-f%C3%B8dselsnummer$/
    )
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect(
      page.getByRole('heading', {
        name: 'National Identification number (Fødselsnummer)',
        exact: true,
      })
    ).toBeFocused()
  })
  test('navigates to headings and updates after a tab route change', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/button/')
    const toc = page.locator('#content-grid-sidebar nav')
    const link = toc.getByRole('link', {
      name: 'Accessibility',
      exact: true,
    })
    await link.click()
    await expect(page).toHaveURL(/#accessibility$/)
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect(
      page.getByRole('heading', { name: 'Accessibility', exact: true })
    ).toBeFocused()
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await expect(
      toc.getByRole('link', { name: 'Properties', exact: true })
    ).toBeVisible()
    await expect(
      toc.getByRole('link', { name: 'Accessibility', exact: true })
    ).toHaveCount(0)
  })

  test('includes rendered documentation headings and inline code without headings from demos', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/properties/')
    await expect(
      page.locator('#content-grid-sidebar a').first()
    ).toBeVisible()
    await page.goto('/uilib/extensions/forms/Form/Section/')
    const toc = page.locator('#content-grid-sidebar nav')
    await expect(toc.locator('a').first()).toBeVisible()
    expect(
      await toc.locator('a').evaluateAll((links) =>
        links.every((link) => {
          const id = decodeURIComponent(link.getAttribute('href').slice(1))
          return Boolean(
            document.getElementById(id)?.closest('h1, h2, h3, h4, h5, h6')
          )
        })
      )
    ).toBe(true)
  })

  test('uses a mobile disclosure and keeps focus mode free from the page TOC', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/uilib/components/button/demos/')
    const toc = page.locator('#content-grid-sidebar nav')
    const toggle = toc.getByRole('button')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(toc.getByRole('link').first()).toBeVisible()
    await page.goto(
      '/uilib/extensions/forms/base-fields/Boolean/?focusmode=CheckboxRequired#import'
    )
    await expect(
      page.locator('button[aria-label="Quit focus mode"]')
    ).toBeVisible()
    await expect(page.locator('#content-grid-sidebar')).toHaveCount(0)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
  })

  test('has one table of contents on getting started and no horizontal sidebar overflow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await page.goto('/contribute/getting-started/')
    await expect(
      page.locator('#content-grid-sidebar nav a').first()
    ).toBeVisible()
    expect(
      await page
        .locator('#portal-sidebar-menu')
        .evaluate((element) => element.scrollWidth <= element.clientWidth)
    ).toBe(true)
    expect(
      await page
        .locator('#tab-bar-content > ul')
        .filter({ has: page.locator('a[href^="#"]') })
        .count()
    ).toBe(0)
  })
})
