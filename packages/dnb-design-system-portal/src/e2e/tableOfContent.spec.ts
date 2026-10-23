import { test, expect } from '@playwright/test'

test.describe('TableOfContent component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/table-of-content/demos/')
  })

  test('tracks a nested scroll container and keeps native fragment navigation and destination focus', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-article"]'
    )
    const article = example.getByRole('region', {
      name: 'Example savings article',
    })
    const navigation = example.getByRole('navigation', {
      name: 'Plan your savings',
    })
    const destinationLink = navigation.getByRole('link', {
      name: 'Find the right account',
    })
    await destinationLink.focus()
    await page.keyboard.press('Enter')
    const hash = await destinationLink.getAttribute('href')
    await expect(page).toHaveURL(new RegExp(hash + '$'))
    await expect(
      page.locator('[id="' + decodeURIComponent(hash.slice(1)) + '"]')
    ).toBeFocused()
    await expect(destinationLink).toHaveAttribute(
      'aria-current',
      'location'
    )
    const focusedId = await page.evaluate(() => document.activeElement.id)
    await article.evaluate((element) => {
      element.scrollTop = element.scrollHeight
    })
    await expect(
      navigation.getByRole('link', { name: 'Review your progress' })
    ).toHaveAttribute('aria-current', 'location')
    expect(await page.evaluate(() => document.activeElement.id)).toBe(
      focusedId
    )
    await expect(navigation.locator('li > ul')).toHaveCount(1)
    const links = await navigation
      .locator('a')
      .evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().height)
      )
    expect(links.every((height) => height >= 36)).toBe(true)
  })

  test('supports a keyboard disclosure and does not expose collapsed links', async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    const example = page.locator(
      '[data-visual-test="table-of-content-declarative"]'
    )
    const toggle = example.getByRole('button', {
      name: 'Your savings guide',
    })
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(example.getByRole('link')).toHaveCount(0)
    await toggle.focus()
    await page.keyboard.press('Space')
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(example.getByRole('link')).toHaveCount(4)
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    await expect(
      example.getByRole('link', { name: 'Get started' })
    ).toBeFocused()
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(example.getByRole('link')).toHaveCount(0)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      )
    ).toBe(true)
  })

  test('moves focus to the disclosure when resizing a focused expanded list', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-declarative"]'
    )
    await example.getByRole('link', { name: 'Get started' }).focus()
    await page.setViewportSize({ width: 600, height: 900 })
    await expect(
      example.getByRole('button', { name: 'Your savings guide' })
    ).toBeFocused()
  })

  test('matches the compact desktop rows and plain hover styling', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-declarative"]'
    )
    const link = example.getByRole('link', { name: 'Get started' })
    const title = example.locator('.dnb-table-of-content__title')
    const current = example.locator('a[aria-current]')

    await expect(title).toHaveCSS('font-weight', '400')
    await expect(link).toHaveCSS('font-size', '16px')
    await expect(link).toHaveCSS('line-height', '20px')
    expect((await link.boundingBox()).height).toBe(36)
    const mutedColor = await link.evaluate(
      (element) => getComputedStyle(element).color
    )
    const neutralColor = await title.evaluate(
      (element) => getComputedStyle(element).color
    )
    await expect(current).toHaveCSS('color', neutralColor)
    await link.hover()
    await expect(link).toHaveCSS('text-decoration-line', 'none')
    await expect(link).toHaveCSS('color', neutralColor)
    await link.focus()
    await expect(link).toHaveCSS('text-decoration-line', 'none')
    expect(
      await link.evaluate((element) => getComputedStyle(element).boxShadow)
    ).not.toBe('none')
    await current.hover()
    await expect(current).toHaveCSS('color', mutedColor)
    await page.mouse.down()
    await expect(current).toHaveCSS('color', neutralColor)
    await page.mouse.up()
  })

  test('uses text links with their normal typography on small screens', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 600, height: 900 })
    const example = page.locator(
      '[data-visual-test="table-of-content-declarative"]'
    )
    await example
      .getByRole('button', { name: 'Your savings guide' })
      .click()
    const link = example.getByRole('link', { name: 'Get started' })

    await expect(link).toHaveCSS('text-decoration-line', 'underline')
    await expect(link).toHaveCSS('font-size', '18px')
    await expect(link).toHaveCSS('line-height', '24px')
    await expect(link).toHaveCSS('display', 'inline')
    await link.hover()
    await expect(link).toHaveCSS('text-decoration-line', 'underline')
  })

  test('supports reduced motion and wrapped labels at text zoom', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    const example = page.locator(
      '[data-visual-test="table-of-content-data"]'
    )
    expect(
      await example
        .locator('.dnb-table-of-content__marker')
        .evaluate((element) =>
          parseFloat(getComputedStyle(element).transitionDuration)
        )
    ).toBeLessThan(0.001)
    await page.evaluate(() => {
      document.documentElement.style.fontSize = '200%'
    })
    expect(
      await example
        .locator('nav')
        .evaluate((element) => element.scrollWidth <= element.clientWidth)
    ).toBe(true)
  })
})
