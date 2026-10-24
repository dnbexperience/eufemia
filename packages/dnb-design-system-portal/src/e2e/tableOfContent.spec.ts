import { test, expect } from '@playwright/test'

test.describe('TableOfContent component', () => {
  for (const colorScheme of ['light', 'dark']) {
    test(
      'keeps the selected color after clicking with the pointer still over the item in ' +
        colorScheme +
        ' mode',
      async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 })
        await page.goto(
          '/uilib/components/table-of-content/demos/?eufemia-color-scheme=' +
            colorScheme
        )
        const example = page.locator(
          '[data-visual-test="table-of-content-data"]'
        )
        const title = example.locator('.dnb-table-of-content__title')
        const link = example.getByRole('link', {
          name: 'TableOfContent.Root',
          exact: true,
        })
        await link.click()
        await expect(link).toHaveAttribute('aria-current', 'location')
        expect(
          await link.evaluate((element) => element.matches(':hover'))
        ).toBe(true)
        const selectedColor = await title.evaluate(
          (element) => getComputedStyle(element).color
        )
        await expect(link).toHaveCSS('color', selectedColor)
        await page.mouse.move(0, 0)
        await expect(link).toHaveCSS('color', selectedColor)
      }
    )
  }
  test('moves directly to a clicked section during smooth scrolling and resumes tracking after interruption', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-data"]'
    )
    const article = example.getByRole('region', {
      name: 'Example integration guide',
    })
    await article.scrollIntoViewIfNeeded()
    await article.evaluate((element) => {
      element.style.scrollBehavior = 'smooth'
    })
    const link = example.getByRole('link', {
      name: 'Test accessibility in your application',
    })
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'location')
    const selectedDuringScroll = await article.evaluate(
      async (element) => {
        const selected = new Set<string>()
        const start = performance.now()
        await new Promise<void>((resolve) => {
          const sample = () => {
            selected.add(
              element.parentElement.querySelector('a[aria-current]')
                ?.textContent
            )
            if (performance.now() - start < 700) {
              requestAnimationFrame(sample)
            } else {
              resolve()
            }
          }
          requestAnimationFrame(sample)
        })
        return [...selected]
      }
    )
    expect(selectedDuringScroll).toEqual([
      'Test accessibility in your application',
    ])
    await article.evaluate((element) => {
      element.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
      element.style.scrollBehavior = 'auto'
      element.scrollTop = 0
    })
    await expect(example.locator('a[aria-current]')).toHaveText(
      'Install the package'
    )
  })
  test('renders the info page with literal API examples', async ({
    page,
  }) => {
    await page.goto('/uilib/components/table-of-content/')
    await expect(
      page.getByText('Something went wrong', { exact: true })
    ).toHaveCount(0)
    await expect(page.locator('#tab-bar-content')).toContainText(
      '{ id, text, level }'
    )
    await expect(page.locator('#tab-bar-content')).toContainText(
      'sticky={false}'
    )
    await expect(
      page.locator('[data-visual-test="table-of-content-article"] nav')
    ).toBeVisible()
  })
  test('moves the selected outline while scrolling the generated-heading example', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-data"]'
    )
    const article = example.getByRole('region', {
      name: 'Example integration guide',
    })
    const navigation = example.getByRole('navigation', {
      name: 'Integration guide',
    })
    const marker = navigation.locator('.dnb-table-of-content__marker')
    await expect(article).toBeVisible()
    await expect(navigation.locator('a[aria-current]')).toHaveText(
      'Install the package'
    )
    const firstMarkerTop = (await marker.boundingBox()).y
    await article.evaluate((element) => {
      element.scrollTop = element.scrollHeight
    })
    await expect(navigation.locator('a[aria-current]')).toHaveText(
      'Test accessibility in your application'
    )
    await expect
      .poll(async () => (await marker.boundingBox()).y)
      .toBeGreaterThan(firstMarkerTop)
  })
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/table-of-content/demos/')
  })

  test('scrolls only the example article and preserves destination focus', async ({
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
    const pageUrl = page.url()
    const pageScroll = await page.evaluate(() => window.scrollY)
    await page.keyboard.press('Enter')
    const hash = await destinationLink.getAttribute('href')
    await expect(page).toHaveURL(pageUrl)
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
    await expect(
      page.locator('[id="' + decodeURIComponent(hash.slice(1)) + '"]')
    ).toBeFocused()
    await expect(destinationLink).toHaveAttribute(
      'aria-current',
      'location'
    )
    const focusedId = await page.evaluate(() => document.activeElement.id)
    await article.hover()
    await page.mouse.wheel(0, 1000)
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
    await expect(current).toHaveCSS('color', neutralColor)
    await page.mouse.down()
    await expect(current).toHaveCSS('color', neutralColor)
    await page.mouse.up()
    await expect(current).toHaveCSS('color', neutralColor)
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
    await expect
      .poll(() =>
        example
          .locator('nav')
          .evaluate(
            (element) => element.scrollWidth <= element.clientWidth
          )
      )
      .toBe(true)
  })
})
