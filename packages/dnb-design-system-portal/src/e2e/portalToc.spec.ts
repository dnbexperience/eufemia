import { test, expect } from '@playwright/test'

test.describe('Portal table of contents', () => {
  test('removes and restores links as page headings change dynamically', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/events/')
    const toc = page.locator('#portal-page-toc')
    const link = toc.getByRole('link', {
      name: 'TableOfContent.Item',
      exact: true,
    })
    const heading = page
      .locator('#tableofcontentitem')
      .locator('xpath=ancestor::h2')
    await link.click()
    await expect(link).toHaveAttribute('aria-current', 'location')
    await heading.evaluate((element) => {
      element.setAttribute('hidden', '')
    })
    await expect(link).toHaveCount(0)
    await expect(toc.locator('a[aria-current]')).toHaveCount(1)
    await heading.evaluate((element) => {
      element.removeAttribute('hidden')
    })
    await expect(link).toBeVisible()
    await heading.evaluate((element) => element.remove())
    await expect(link).toHaveCount(0)
    await expect(toc.locator('a[aria-current]')).toHaveCount(1)
  })

  test('limits an open mobile changelog to ten links and reveals every heading', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/uilib/extensions/forms/changelog/')
    const toc = page.locator('#portal-page-toc')
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await expect(toc.getByRole('link')).toHaveCount(10)
    const total = await toc.locator('a').count()
    expect(total).toBeGreaterThan(10)
    await toc
      .getByRole('button', { name: 'Show all', exact: true })
      .click()
    await expect(toc.getByRole('link')).toHaveCount(total)
    await expect(toc.getByRole('link').nth(10)).toBeFocused()
    await expect(
      toc.getByRole('button', { name: 'Show all', exact: true })
    ).toHaveCount(0)
    await page.reload()
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'true')
    await expect(toc.getByRole('link')).toHaveCount(10)
    await page.setViewportSize({ width: 1440, height: 1000 })
    await expect(toc.getByRole('link')).toHaveCount(total)
    await expect(
      toc.getByRole('button', { name: 'Show all', exact: true })
    ).not.toBeVisible()
  })

  test('marks Requirements before the exact last scroll pixel, including zoomed text', async ({
    page,
  }) => {
    for (const [width, height, fontSize] of [
      [1440, 900, 16],
      [1440, 1000, 17],
      [390, 844, 16],
    ]) {
      await page.setViewportSize({ width, height })
      await page.goto('/uilib/extensions/forms/#quick-start')
      const toc = page.locator('#portal-page-toc')
      await expect(toc).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute(
        'data-portal-ready',
        'true'
      )
      await expect(toc.locator('style')).toHaveCount(0)
      if (width === 390) {
        await toc
          .getByRole('button', { name: 'On this page', exact: true })
          .click()
      }
      await expect(
        toc.locator('.dnb-height-animation--animating')
      ).toHaveCount(0)
      await page.evaluate(() => document.fonts.ready)
      await page.evaluate((fontSize) => {
        document.documentElement.style.fontSize = fontSize + 'px'
        window.dispatchEvent(new WheelEvent('wheel'))
      }, fontSize)
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() => resolve())
            )
          )
      )
      for (const gap of [20, 1, 0]) {
        await page.evaluate(
          (gap) =>
            window.scrollTo({
              top:
                document.documentElement.scrollHeight - innerHeight - gap,
              behavior: 'instant',
            }),
          gap
        )
        await expect(
          toc.getByRole('link', { name: 'Requirements', exact: true })
        ).toHaveAttribute('aria-current', 'location')
      }
    }
  })
  test('visits every Forms heading when slowly scrolling down and up', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/extensions/forms/#quick-start')
    const toc = page.locator('#portal-page-toc')
    await expect(
      toc.getByRole('link', { name: 'Quick start', exact: true })
    ).toHaveAttribute('aria-current', 'location')
    const expected = await toc.locator('a').allTextContents()
    const observed = await page.evaluate(async () => {
      window.dispatchEvent(new WheelEvent('wheel'))
      const maximum = document.documentElement.scrollHeight - innerHeight
      const read = () =>
        document.querySelector('#portal-page-toc a[aria-current]')
          ?.textContent
      const down: string[] = []
      const up: string[] = []
      const sample = async (top: number, list: string[]) => {
        window.scrollTo({ top, behavior: 'instant' })
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() =>
            requestAnimationFrame(() => resolve())
          )
        )
        const current = read()
        if (list.at(-1) !== current) {
          list.push(current)
        }
      }
      for (let top = 0; top < maximum; top += 40) {
        await sample(top, down)
      }
      await sample(maximum, down)
      for (let top = maximum; top > 0; top -= 40) {
        await sample(top, up)
      }
      await sample(0, up)
      return { down, up }
    })
    expect(observed.down).toEqual(expected)
    expect(observed.up).toEqual([...expected].reverse())
    await expect(page).toHaveURL(/#quick-start$/)
  })
  test('uses a visible arrival hash only until manual scrolling starts', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/extensions/forms/#create-your-own-component')
    const toc = page.locator('#portal-page-toc')
    const link = toc.getByRole('link', {
      name: 'Create your own component',
      exact: true,
    })
    await expect(link).toHaveAttribute('aria-current', 'location')
    await expect(
      toc.getByRole('link', { name: 'Requirements', exact: true })
    ).not.toHaveAttribute('aria-current')
    await page.mouse.wheel(0, -1500)
    await expect(link).not.toHaveAttribute('aria-current', 'location')
    await expect(page).toHaveURL(/#create-your-own-component$/)
    await page.evaluate(() =>
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'instant',
      })
    )
    await expect(
      toc.getByRole('link', { name: 'Requirements', exact: true })
    ).toHaveAttribute('aria-current', 'location')
  })
  test('keeps the selection outline aligned after page changes', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await expect(
      page.locator('#portal-page-toc a[href="#tableofcontentroot"]')
    ).toBeVisible()
    await expect(page.locator('[data-toc-entering]')).toHaveCount(0)
    await expect
      .poll(async () =>
        page.locator('#portal-page-toc').evaluate((element) => {
          const link = element
            .querySelector('a[aria-current]')
            .getBoundingClientRect()
          const marker = element
            .querySelector('.dnb-table-of-content__marker')
            .getBoundingClientRect()
          return Math.max(
            Math.abs(link.top - marker.top),
            Math.abs(link.left - marker.left),
            Math.abs(link.width - marker.width),
            Math.abs(link.height - marker.height)
          )
        })
      )
      .toBeLessThan(1)
  })

  test('keeps the saved open chevron still during page navigation and animates user toggles', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    const toc = page.locator('#portal-page-toc')
    const toggle = toc.getByRole('button', {
      name: 'On this page',
      exact: true,
    })
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect
      .poll(() =>
        toggle.evaluate(
          (element) => element.getAnimations({ subtree: true }).length
        )
      )
      .toBe(0)
    await page.evaluate(() => {
      window['tocChevronTransitions'] = []
      document.addEventListener(
        'transitionrun',
        (event: TransitionEvent) => {
          const target = event.target as Element
          if (
            target.closest(
              '#portal-page-toc .dnb-table-of-content__toggle .dnb-icon'
            )
          ) {
            window['tocChevronTransitions'].push(event.propertyName)
          }
        }
      )
    })
    for (const tab of ['Properties', 'Events', 'Demos']) {
      await page.getByRole('tab', { name: tab, exact: true }).click()
      await expect(toggle).toHaveAttribute('aria-expanded', 'true')
      await expect(toc.locator('style')).toHaveCount(0)
      await page.evaluate(
        () =>
          new Promise<void>((resolve) =>
            requestAnimationFrame(() =>
              requestAnimationFrame(() => resolve())
            )
          )
      )
      expect(
        await page.evaluate(() => window['tocChevronTransitions'])
      ).toEqual([])
    }
    await toggle.click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect
      .poll(() =>
        page.evaluate(() => window['tocChevronTransitions'].length)
      )
      .toBeGreaterThan(0)
  })

  test('remembers the mobile disclosure choice across pages, reloads and breakpoint changes', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    const toc = page.locator('#portal-page-toc')
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'false')
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await page.reload()
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'true')
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'true')
    await expect(
      toc.getByRole('link', { name: 'TableOfContent.Root', exact: true })
    ).toBeVisible()
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.getByRole('tab', { name: 'Events', exact: true }).click()
    await page.setViewportSize({ width: 390, height: 1000 })
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'true')
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await page.getByRole('tab', { name: 'Info', exact: true }).focus()
    await page.keyboard.press('Enter')
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'false')
    await expect(toc.getByRole('link')).toHaveCount(0)
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.reload()
    await page.setViewportSize({ width: 390, height: 1000 })
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'false')
    expect(
      await page.evaluate(() =>
        sessionStorage.getItem('portal-toc-expanded')
      )
    ).toBe('false')
  })
  for (const width of [390, 1440]) {
    test(
      'includes the page title and returns focus to H1 at width ' + width,
      async ({ page }) => {
        await page.emulateMedia({ reducedMotion: 'reduce' })
        await page.setViewportSize({ width, height: 1000 })
        await page.goto('/uilib/components/table-of-content/')
        const toc = page.locator('#portal-page-toc')
        if (width === 390) {
          await toc
            .getByRole('button', { name: 'On this page', exact: true })
            .click()
        }
        const title = toc.getByRole('link', {
          name: 'TableOfContent',
          exact: true,
        })
        await expect(
          toc.locator('.dnb-table-of-content__list > li > a').first()
        ).toHaveText('TableOfContent')
        await expect(title).toHaveAttribute('aria-current', 'location')
        await toc
          .getByRole('link', { name: 'Accessibility', exact: true })
          .click()
        await expect(title).not.toHaveAttribute('aria-current', 'location')
        await title.click()
        await expect(title).toHaveAttribute('aria-current', 'location')
        await expect(
          page.getByRole('heading', {
            name: 'TableOfContent',
            exact: true,
          })
        ).toBeFocused()
        await expect(page).toHaveURL(/#tableofcontent$/)
      }
    )
  }
  test('keeps the latest page after rapid tab changes and skips a collapsed mobile list', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await page.getByRole('tab', { name: 'Events', exact: true }).click()
    const toc = page.locator('#content-grid-sidebar nav')
    await expect(
      toc.getByRole('link', {
        name: 'TableOfContent.Root and TableOfContent.Data',
        exact: true,
      })
    ).toBeVisible()
    await expect(toc.locator('a')).toHaveCount(3)
    await expect(page.locator('[data-toc-outgoing]')).toHaveCount(0)
    await page.setViewportSize({ width: 390, height: 844 })
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await expect(
      toc.getByRole('button', { name: 'On this page', exact: true })
    ).toHaveAttribute('aria-expanded', 'false')
    await expect(page.locator('[data-toc-outgoing]')).toHaveCount(0)
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await expect(
      toc.getByRole('link', { name: 'TableOfContent.Root', exact: true })
    ).toBeVisible()
  })
  test('does not animate heading replacements in the Portal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    await page.goto('/uilib/components/table-of-content/')
    await page.evaluate(() => {
      window['portalHeadingAnimations'] = 0
      const original = Element.prototype.animate
      Element.prototype.animate = function (frames, options) {
        if (
          this.closest('#portal-page-toc') &&
          this.matches(
            '.dnb-table-of-content__scroll, .dnb-table-of-content__link'
          )
        ) {
          window['portalHeadingAnimations']++
        }
        return original.call(this, frames, options)
      }
    })
    await page
      .getByRole('tab', { name: 'Properties', exact: true })
      .click()
    await expect(
      page
        .locator('#content-grid-sidebar')
        .getByRole('link', { name: 'TableOfContent.Root', exact: true })
    ).toBeVisible()
    await expect(page.locator('[data-toc-outgoing]')).toHaveCount(0)
    expect(
      await page.evaluate(() => window['portalHeadingAnimations'])
    ).toBe(0)
    expect(
      await page
        .locator('#content-grid-sidebar')
        .evaluate(
          (element) =>
            element
              .getAnimations({ subtree: true })
              .filter(
                (animation) =>
                  !('transitionProperty' in animation) &&
                  !('animationName' in animation) &&
                  animation.effect instanceof KeyframeEffect &&
                  animation.effect.target instanceof Element &&
                  animation.effect.target.matches(
                    '.dnb-table-of-content__scroll, .dnb-table-of-content__link'
                  )
              ).length
        )
    ).toBe(0)
  })
  test('uses the same desktop TOC position with and without breadcrumbs', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    for (const path of [
      '/uilib/extensions/forms/changelog/',
      '/uilib/extensions/',
      '/uilib/components/table-of-content/',
    ]) {
      await page.goto(path)
      const toc = page.locator('#content-grid-sidebar nav')
      await expect(toc).toBeVisible()
      expect((await toc.boundingBox()).y).toBeCloseTo(104, 0)
      const initialTop = (await toc.boundingBox()).y
      for (const top of [16, 48, 160, 500]) {
        await page.evaluate(
          (top) => window.scrollTo({ top, behavior: 'instant' }),
          top
        )
        expect((await toc.boundingBox()).y).toBeCloseTo(initialTop, 0)
      }
    }
  })
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
  for (const expanded of [true, false]) {
    test(
      'restores stored disclosure ' +
        expanded +
        ' before hydration without moving content',
      async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 1000 })
        await page.addInitScript((expanded) => {
          sessionStorage.setItem(
            'portal-toc-expanded',
            JSON.stringify(expanded)
          )
        }, expanded)
        const errors: string[] = []
        page.on('console', (message) => {
          if (/hydration|did not match/i.test(message.text())) {
            errors.push(message.text())
          }
        })
        page.on('pageerror', (error) => errors.push(error.message))
        let resume: () => void
        const hydration = new Promise<void>((resolve) => {
          resume = resolve
        })
        await page.route(/\.m?js(?:\?|$)/, async (route) => {
          await hydration
          await route.continue()
        })
        try {
          await page.goto('/uilib/extensions/forms/changelog/', {
            waitUntil: 'commit',
          })
          const content = page.locator('#tab-bar-content')
          await expect(content).toHaveCSS('line-height', '24px')
          await page.evaluate(() =>
            document.fonts.load(
              '16px ' + getComputedStyle(document.body).fontFamily
            )
          )
          const toc = page.locator('#portal-page-toc')
          await expect(
            page.locator('[data-table-of-content-pre-hydration]')
          ).toHaveCount(1)
          if (expanded) {
            await expect(toc.getByRole('link')).toHaveCount(10)
            await expect(
              toc.getByRole('button', { name: 'Show all', exact: true })
            ).toBeVisible()
          } else {
            await expect(toc.getByRole('link')).toHaveCount(0)
          }
          const before = await content.boundingBox()
          const navBefore = await toc.boundingBox()
          await toc.evaluate((element) => {
            const heights: number[] = []
            window['tocHydrationHeights'] = heights
            const sample = () => {
              heights.push(element.getBoundingClientRect().height)
              if (window['tocHydrationHeights'] === heights) {
                requestAnimationFrame(sample)
              }
            }
            requestAnimationFrame(sample)
          })
          resume()
          await expect(page.locator('html')).toHaveAttribute(
            'data-portal-ready',
            'true'
          )
          await expect(
            toc.getByRole('button', { name: 'On this page', exact: true })
          ).toHaveAttribute('aria-expanded', String(expanded))
          await expect(
            page.locator('[data-table-of-content-pre-hydration]')
          ).toHaveCount(0)
          await expect(
            toc.locator('.dnb-height-animation--animating')
          ).toHaveCount(0)
          expect((await content.boundingBox()).y).toBeCloseTo(before.y, 0)
          expect((await toc.boundingBox()).height).toBeCloseTo(
            navBefore.height,
            0
          )
          const heights = await page.evaluate(() => {
            const heights: number[] = window['tocHydrationHeights']
            delete window['tocHydrationHeights']
            return heights
          })
          expect(heights.length).toBeGreaterThan(0)
          expect(Math.max(...heights) - Math.min(...heights)).toBeLessThan(
            1
          )
          expect(errors).toEqual([])
        } finally {
          resume()
          await page.unrouteAll({ behavior: 'wait' })
        }
      }
    )
  }
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
      expect(linksBefore[0]).toBe('TableOfContent')
      resume()
      await expect(page.locator('html')).toHaveAttribute(
        'data-portal-ready',
        'true'
      )
      await expect(navigation.locator('style')).toHaveCount(0)
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
      const header = await page.locator('.dnb-tabs__tabs').boundingBox()
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
    await page.mouse.wheel(0, -100)
    await page.evaluate(() =>
      window.scrollTo({ top: 0, behavior: 'instant' })
    )
    await expect
      .poll(async () => (await heading.boundingBox()).y)
      .toBeGreaterThan(1000)
    await expect(link).not.toHaveAttribute('aria-current', 'location')
  })
  test('keeps the desktop TOC position and matches the left sidebar gap', async ({
    page,
  }) => {
    for (const width of [1280, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 })
      await page.goto('/uilib/components/table-of-content/')
      const toc = page.locator('#content-grid-sidebar nav')
      await expect(toc.locator('a').first()).toBeVisible()
      const title = await toc
        .locator('.dnb-table-of-content__title')
        .boundingBox()
      const navigation = await toc.boundingBox()
      const content = await page.locator('#tab-bar-content').boundingBox()
      const sidebar = await page
        .locator('#portal-sidebar-menu')
        .boundingBox()
      expect(title.y).toBeCloseTo(104, 0)
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
    const toggle = toc.getByRole('button', {
      name: 'On this page',
      exact: true,
    })
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
