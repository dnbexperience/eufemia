import { test, expect } from '@playwright/test'

test.describe('Portal table of contents', () => {
  test('renders the TOC in the first frame containing page headings', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.addInitScript(() => {
      const sample = () => {
        if (document.querySelector('#tab-bar-content h2 .anchor-hash')) {
          document.documentElement.dataset.tocAtFirstContentPaint = String(
            Boolean(document.querySelector('#content-grid-sidebar nav'))
          )
        } else {
          requestAnimationFrame(sample)
        }
      }
      requestAnimationFrame(sample)
    })
    await page.goto('/uilib/components/table-of-content/demos/')
    await expect(page.locator('html')).toHaveAttribute(
      'data-toc-at-first-content-paint',
      'true'
    )
  })
  test('keeps content in place while the TOC hydrates', async ({
    page,
  }) => {
    const hydrationErrors: string[] = []
    page.on('console', (message) => {
      if (/hydration|did not match/i.test(message.text())) {
        hydrationErrors.push(message.text())
      }
    })
    for (const width of [390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      let resume: () => void
      const hydration = new Promise<void>((resolve) => {
        resume = resolve
      })
      await page.route(/\.m?js(?:\?|$)/, async (route) => {
        await hydration
        await route.continue()
      })
      await page.goto('/uilib/components/table-of-content/demos/', {
        waitUntil: 'commit',
      })
      const content = page.locator('#tab-bar-content')
      await content.waitFor()
      await expect(content).toHaveCSS('line-height', '24px')
      await page.evaluate(() =>
        document.fonts.load(
          '16px ' + getComputedStyle(document.body).fontFamily
        )
      )
      const before = await content.boundingBox()
      const navigation = page.locator('#content-grid-sidebar nav')
      expect(await navigation.count()).toBe(1)
      await expect(navigation).toBeVisible()
      if (width < 1152) {
        await expect(navigation.getByRole('button')).toBeVisible()
        await expect(navigation.getByRole('link')).toHaveCount(0)
      } else {
        await expect(navigation.getByRole('link').first()).toBeVisible()
      }
      const linksBefore = await navigation.locator('a').allTextContents()
      resume()
      await expect(page.locator('#content-grid-sidebar nav')).toBeVisible()
      await expect(navigation.locator('a')).toHaveText(linksBefore)
      const after = await content.boundingBox()
      expect(after.y).toBeCloseTo(before.y, 0)
      expect(after.x).toBeCloseTo(before.x, 0)
      expect(after.width).toBeCloseTo(before.width, 0)
      await page.unrouteAll({ behavior: 'wait' })
    }
    expect(hydrationErrors).toEqual([])
  })
  test('balances the mobile TOC between the tabs and content', async ({
    page,
  }) => {
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/uilib/components/table-of-content/demos/')
      const toc = page.locator('#content-grid-sidebar')
      await expect(toc.locator('nav')).toBeVisible()
      const header = await page
        .locator('#content-grid-header')
        .boundingBox()
      const navigation = await toc.boundingBox()
      const content = await page.locator('#tab-bar-content').boundingBox()
      const above = navigation.y - header.y - header.height
      const below = content.y - navigation.y - navigation.height
      expect(above).toBe(48)
      expect(above).toBeCloseTo(below, 0)
    }
  })
  test('avoids destination tooltip flashes and preserves direct anchor focus', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/events')
    const link = page.locator('#content-grid-sidebar').getByRole('link', {
      name: 'TableOfContent.Item',
      exact: true,
    })
    await link.waitFor()
    const observedTooltips = page.evaluate(
      () =>
        new Promise<string[]>((resolve) => {
          const shown = new Set<string>()
          const observer = new MutationObserver(() => {
            document
              .querySelectorAll('.dnb-tooltip--active')
              .forEach((tooltip) => shown.add(tooltip.textContent))
          })
          observer.observe(document.body, {
            subtree: true,
            childList: true,
            attributes: true,
            attributeFilter: ['class'],
          })
          setTimeout(() => {
            observer.disconnect()
            resolve([...shown])
          }, 1500)
        })
    )
    await link.click()
    await expect(
      page.getByRole('heading', {
        name: 'TableOfContent.Item',
        exact: true,
      })
    ).toBeFocused()
    // A repeated fragment uses native navigation without a route change.
    await link.click()
    expect(await observedTooltips).toEqual([])
    await expect(page.locator('#tableofcontentitem')).toBeFocused()
    await page.locator('#tableofcontentitem').blur()
    await page.locator('#tableofcontentitem').focus()
    await expect(
      page.locator('.dnb-tooltip--active', {
        hasText: 'Click to set an Anchor URL',
      })
    ).toBeVisible()
  })
  for (const height of [1000, 1600]) {
    test(
      'keeps the clicked destination selected on a short page at height ' +
        height,
      async ({ page }) => {
        await page.setViewportSize({ width: 1440, height })
        await page.goto('/uilib/components/table-of-content/events')
        const toc = page.locator('#content-grid-sidebar nav')
        const link = toc.getByRole('link', {
          name: 'TableOfContent.Item',
          exact: true,
        })
        if (height === 1600) {
          await link.focus()
          await page.keyboard.press('Enter')
        } else {
          await link.click()
        }
        await expect(link).toHaveAttribute('aria-current', 'location')
        const selected = await toc.evaluate(async (element) => {
          const result = new Set<string>()
          const start = performance.now()
          await new Promise<void>((resolve) => {
            const sample = () => {
              result.add(
                element.querySelector('a[aria-current]')?.textContent
              )
              if (performance.now() - start < 1500) {
                requestAnimationFrame(sample)
              } else {
                resolve()
              }
            }
            requestAnimationFrame(sample)
          })
          return [...result]
        })
        expect(selected).toEqual(['TableOfContent.Item'])
        expect(
          await page.evaluate(
            () =>
              Math.abs(
                window.scrollY +
                  innerHeight -
                  document.documentElement.scrollHeight
              ) < 2
          )
        ).toBe(true)
        await expect(
          page.getByRole('heading', {
            name: 'TableOfContent.Item',
            exact: true,
          })
        ).toBeFocused()
        if (height === 1600) {
          expect(await page.evaluate(() => window.scrollY)).toBe(0)
        }
        await page.mouse.wheel(0, -500)
        await expect(link).not.toHaveAttribute('aria-current', 'location')
      }
    )
  }
  test('keeps a clicked section selected throughout smooth scrolling and below the header', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    const toc = page.locator('#content-grid-sidebar nav')
    const link = toc.getByRole('link', {
      name: 'Accessibility',
      exact: true,
    })
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'location')
    const selected = await toc.evaluate(async (element) => {
      const result = new Set<string>()
      const start = performance.now()
      await new Promise<void>((resolve) => {
        const sample = () => {
          result.add(element.querySelector('a[aria-current]')?.textContent)
          if (performance.now() - start < 1000) {
            requestAnimationFrame(sample)
          } else {
            resolve()
          }
        }
        requestAnimationFrame(sample)
      })
      return [...result]
    })
    expect(selected).toEqual(['Accessibility'])
    const heading = page.getByRole('heading', {
      name: 'Accessibility',
      exact: true,
    })
    expect((await heading.boundingBox()).y).toBeGreaterThanOrEqual(56)
    await page.mouse.wheel(0, -1500)
    await expect(link).not.toHaveAttribute('aria-current', 'location')
  })
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
