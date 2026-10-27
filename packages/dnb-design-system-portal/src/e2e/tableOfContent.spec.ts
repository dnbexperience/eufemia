import { test, expect } from '@playwright/test'

test.describe('TableOfContent extension', () => {
  test('redirects existing documentation links to the extension pages', async ({
    page,
  }) => {
    for (const path of [
      '/uilib/components/table-of-content/',
      '/uilib/components/table-of-content/info/',
      '/uilib/components/table-of-content/demos/',
      '/uilib/components/table-of-content/properties/',
      '/uilib/components/table-of-content/events/',
    ]) {
      await page.goto(path)
      await expect(page).toHaveURL(
        new RegExp(
          path
            .replace('/components/', '/extensions/')
            .replace('/info/', '/') + '$'
        )
      )
      await expect(
        page.getByRole('heading', { name: 'TableOfContent', exact: true })
      ).toBeVisible()
      await expect(page.locator('html')).toHaveAttribute(
        'data-portal-ready',
        'true'
      )
      await page.waitForLoadState('load')
    }
  })

  test('keeps complete article implementations inspectable in collapsed code panels', async ({
    page,
  }) => {
    for (const exampleId of [
      'DesktopArticle',
      'ScrollableArticle',
      'FromData',
    ]) {
      const example = page.locator('#' + exampleId)
      const code = example.getByRole('button', {
        name: 'Code',
        exact: true,
      })
      await expect(code).toHaveAttribute('aria-expanded', 'false')
      await code.click()
      const editor = example.locator(
        '[contenteditable]:not([contenteditable="false"])'
      )
      await expect(editor).toBeVisible()
      const source = await editor.textContent()
      expect(source).toContain('TableOfContent.Data')
      expect(source).toContain('useRef')
      expect(source).toContain('scrollTo')
      expect(source).toContain('currentSectionOffset')
      expect(source).toContain('function navigateExample')
      expect(source).toContain('function useArticleOffset')
      expect(source).toContain(
        'function ' +
          (exampleId === 'DesktopArticle'
            ? 'DesktopArticleExample'
            : exampleId === 'FromData'
              ? 'IntegrationExample'
              : 'ArticleExample')
      )
      await expect(example.locator('.dnb-form-status--error')).toHaveCount(
        0
      )
      await code.click()
      await expect(editor).not.toBeVisible()
    }
  })

  test('limits nested mobile links and keeps keyboard reading order when showing all', async ({
    page,
    browserName,
  }) => {
    await page.setViewportSize({ width: 390, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-desktop-article"]'
    )
    const toc = example.locator('nav')
    const showAll = toc.getByRole('button', {
      name: 'Show all',
      exact: true,
    })
    await expect(toc.getByRole('link')).toHaveCount(10)
    await showAll.focus()
    await page.keyboard.press('Enter')
    await expect(toc.getByRole('link')).toHaveCount(14)
    await expect(
      toc.getByRole('link', {
        name: 'Adjust when life changes',
        exact: true,
      })
    ).toBeFocused()
    await page.keyboard.press(browserName === 'webkit' ? 'Alt+Tab' : 'Tab')
    await expect(
      toc.getByRole('link', { name: 'Review your progress', exact: true })
    ).toBeFocused()
    await expect(showAll).toHaveCount(0)
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await expect(showAll).not.toBeVisible()
    await toc
      .getByRole('button', { name: 'On this page', exact: true })
      .click()
    await expect(toc.getByRole('link')).toHaveCount(14)
    await page.setViewportSize({ width: 2600, height: 1000 })
    await expect(toc.getByRole('link')).toHaveCount(14)
    await expect(showAll).not.toBeVisible()
  })

  test('keeps a collapsed disclosure findable after changing from desktop to mobile', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const toc = page.locator(
      '[data-visual-test="table-of-content-data"] nav'
    )
    await expect(toc).toHaveClass(/dnb-table-of-content--sidebar/)
    await page.setViewportSize({ width: 390, height: 1000 })
    const toggle = toc.getByRole('button', {
      name: 'On this page',
      exact: true,
    })
    const content = toc.locator('.dnb-height-animation')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(content).toHaveClass(/dnb-height-animation--hidden/)
    test.skip(
      !(await page.evaluate(
        () => 'onbeforematch' in document.documentElement
      )),
      'Native hidden-until-found reveal is not supported'
    )
    await expect(content).toHaveAttribute('hidden', 'until-found')
    const link = toc.locator('a[href="#toc-data-accessibility"]')
    await link.evaluate((element) => {
      element.id = 'toc-collapsed-find-match'
      location.hash = 'toc-collapsed-find-match'
    })
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(link).toBeVisible()
  })

  for (const change of [
    'hidden',
    'aria-hidden',
    'display',
    'visibility',
    'removed',
  ]) {
    test(
      'updates the current section when a clicked heading becomes ' +
        change,
      async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 })
        const example = page.locator(
          '[data-visual-test="table-of-content-data"]'
        )
        const toc = example.locator('nav')
        const article = example.getByRole('region', {
          name: 'Example integration guide',
        })
        const heading = article.locator('#toc-data-root')
        await toc
          .getByRole('link', { name: 'TableOfContent.Root', exact: true })
          .click()
        await expect(toc.locator('a[aria-current]')).toHaveAttribute(
          'href',
          '#toc-data-root'
        )
        await heading.evaluate((element, change) => {
          const section = element.parentElement
          if (change === 'removed') {
            section.remove()
          } else if (change === 'display' || change === 'visibility') {
            section.style[change] =
              change === 'display' ? 'none' : 'hidden'
          } else {
            section.setAttribute(change, 'true')
          }
        }, change)
        await expect(toc.locator('a[aria-current]')).toHaveCount(1)
        await expect(toc.locator('a[aria-current]')).not.toHaveAttribute(
          'href',
          '#toc-data-root'
        )
        await expect(toc.locator('a[aria-current]')).not.toHaveAttribute(
          'href',
          '#toc-data-props'
        )
        await article.evaluate((element) => {
          element.setAttribute('hidden', '')
        })
        await expect(toc.locator('a[aria-current]')).toHaveCount(0)
        await expect(
          toc.locator('.dnb-table-of-content__marker')
        ).toHaveCount(0)
      }
    )
  }

  for (const expanded of [true, false]) {
    test(
      'browser find reveals overflow links with the disclosure open: ' +
        expanded,
      async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 1000 })
        const supportsFind = await page.evaluate(
          () => 'onbeforematch' in document.documentElement
        )
        const toc = page.locator(
          '[data-visual-test="table-of-content-desktop-article"] nav'
        )
        const toggle = toc.getByRole('button', {
          name: 'On this page',
          exact: true,
        })
        await expect(toc.getByRole('link')).toHaveCount(10)
        if (!expanded) {
          await toggle.click()
          await expect(
            toc.locator('.dnb-height-animation--animating')
          ).toHaveCount(0)
        }
        const match = toc.locator('a[href="#toc-desktop-next"]')
        if (!supportsFind) {
          await expect(match.locator('..')).toHaveAttribute('hidden', '')
          if (!expanded) {
            await toggle.click()
          }
          await toc
            .getByRole('button', { name: 'Show all', exact: true })
            .click()
          await expect(match).toBeVisible()
          return
        }
        await expect(match.locator('..')).toHaveAttribute(
          'hidden',
          'until-found'
        )
        await toggle.focus()
        // Native fragment navigation uses the same hidden-until-found reveal
        // algorithm as browser find, including beforematch and ancestor reveal.
        await match.locator('..').evaluate((element) => {
          element.id = 'toc-find-match'
          location.hash = 'toc-find-match'
        })
        await expect(toc.getByRole('link')).toHaveCount(14)
        await expect(match).toBeVisible()
        await expect(toggle).toHaveAttribute('aria-expanded', 'true')
        await expect(
          toc.getByRole('button', { name: 'Show all', exact: true })
        ).toHaveCount(0)
        await expect(toc.locator('[hidden="until-found"]')).toHaveCount(0)
      }
    )
  }

  for (const reducedMotion of ['no-preference', 'reduce'] as const) {
    test(
      'follows three heading levels beside a sticky header with motion ' +
        reducedMotion,
      async ({ page }) => {
        await page.emulateMedia({ reducedMotion })
        await page.setViewportSize({ width: 1440, height: 1000 })
        const example = page.locator(
          '[data-visual-test="table-of-content-desktop-article"]'
        )
        const article = example.getByRole('region', {
          name: 'Example savings plan with a sticky header',
        })
        const navigation = example.getByRole('navigation', {
          name: 'Savings plan',
        })
        const marker = navigation.locator('.dnb-table-of-content__marker')
        await article.scrollIntoViewIfNeeded()
        await expect(navigation).toHaveClass(
          /dnb-table-of-content--sidebar/
        )
        await expect(
          navigation.locator('.dnb-table-of-content__title')
        ).toHaveText('On this page')
        await expect(
          article.getByText('Sticky header', { exact: true })
        ).toBeVisible()
        await expect(
          article.getByText('Scroll to explore', { exact: true })
        ).toHaveCount(0)
        await expect(navigation.locator('a[aria-current]')).toHaveText(
          'Build your savings plan'
        )
        const content = article.locator('section').first()
        expect((await navigation.boundingBox()).x).toBeGreaterThan(
          (await content.boundingBox()).x +
            (await content.boundingBox()).width
        )
        await expect(navigation.locator('ul ul ul')).toHaveCount(2)
        const navTop = (await navigation.boundingBox()).y
        const firstMarkerTop = (await marker.boundingBox()).y
        const originalPageScroll = await page.evaluate(() => scrollY)
        const originalUrl = page.url()
        const heading = article.locator('#toc-desktop-amount')
        await article.evaluate((element) => {
          const target = element.querySelector('#toc-desktop-amount')
          element.scrollTop +=
            target.getBoundingClientRect().top -
            element.getBoundingClientRect().top -
            element.clientTop -
            parseFloat(getComputedStyle(element).scrollPaddingTop)
        })
        await expect(navigation.locator('a[aria-current]')).toHaveText(
          'Find your monthly amount'
        )
        await expect
          .poll(async () => (await marker.boundingBox()).y)
          .toBeGreaterThan(firstMarkerTop)
        expect((await navigation.boundingBox()).y).toBeCloseTo(navTop, 0)
        await expect
          .poll(async () =>
            Math.abs(
              (await marker.boundingBox()).y -
                (await navigation.locator('a[aria-current]').boundingBox())
                  .y
            )
          )
          .toBeLessThan(1)
        const duration = await marker.evaluate((element) =>
          parseFloat(getComputedStyle(element).transitionDuration)
        )
        if (reducedMotion === 'reduce') {
          expect(duration).toBeLessThan(0.001)
        } else {
          expect(duration).toBe(0.2)
        }
        const header = article.locator('> div').first()
        expect((await heading.boundingBox()).y).toBeGreaterThanOrEqual(
          (await header.boundingBox()).y +
            (await header.boundingBox()).height
        )
        await navigation
          .getByRole('link', { name: 'Interest and fees', exact: true })
          .focus()
        await page.keyboard.press('Enter')
        await expect(navigation.locator('a[aria-current]')).toHaveText(
          'Interest and fees'
        )
        await expect(
          article.locator('#toc-desktop-interest')
        ).toBeFocused()
        await expect
          .poll(async () =>
            Math.abs(
              (
                await article
                  .locator('#toc-desktop-interest')
                  .boundingBox()
              ).y -
                (await article.boundingBox()).y -
                65
            )
          )
          .toBeLessThan(2)
        expect(await page.evaluate(() => scrollY)).toBe(originalPageScroll)
        await expect(page).toHaveURL(originalUrl)
        await expect(
          page.getByRole('heading', {
            name: 'Limit a long list on narrow screens',
            exact: true,
          })
        ).toHaveCount(0)
        await expect(
          page.getByRole('heading', {
            name: 'Animate heading changes',
            exact: true,
          })
        ).toHaveCount(0)
        await expect(
          page.getByRole('heading', {
            name: 'Control the disclosure',
            exact: true,
          })
        ).toHaveCount(0)
      }
    )
  }

  test('selects the last visible section at the end of a short nested article', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 1000 })
    const example = page.locator(
      '[data-visual-test="table-of-content-article"]'
    )
    const article = example.getByRole('region', {
      name: 'Example savings article',
    })
    await article.scrollIntoViewIfNeeded()
    await article.evaluate((element) => {
      element.querySelectorAll('section').forEach((section) => {
        section.style.minHeight = '0'
      })
      element.style.maxHeight = '16rem'
      element.scrollTop = element.scrollHeight
    })
    await expect(
      example.getByRole('link', { name: 'Review your progress' })
    ).toHaveAttribute('aria-current', 'location')
    await article.evaluate((element) => {
      element.scrollTop = 0
    })
    await expect(
      example.getByRole('link', { name: 'Set a savings goal' })
    ).toHaveAttribute('aria-current', 'location')
  })
  for (const colorScheme of ['light', 'dark']) {
    test(
      'keeps the selected color after clicking with the pointer still over the item in ' +
        colorScheme +
        ' mode',
      async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 1000 })
        await page.addInitScript((colorScheme) => {
          localStorage.setItem(
            'eufemia-theme',
            JSON.stringify({ colorScheme })
          )
        }, colorScheme)
        await page.goto(
          '/uilib/extensions/table-of-content/demos/?eufemia-color-scheme=' +
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
        const marker = example.locator('.dnb-table-of-content__marker')
        const hoverOutline = await marker.evaluate((element) => {
          const probe = document.createElement('span')
          probe.style.boxShadow =
            'inset 0 0 0 0.0625rem var(--token-color-stroke-action-alternative)'
          element.appendChild(probe)
          const shadow = getComputedStyle(probe).boxShadow
          probe.remove()
          return shadow
        })
        await expect(marker).toHaveCSS('box-shadow', hoverOutline)
        await page.mouse.move(0, 0)
        await expect(link).toHaveCSS('color', selectedColor)
        await expect(marker).not.toHaveCSS('box-shadow', hoverOutline)
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
    await page.goto('/uilib/extensions/table-of-content/')
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
    await expect(
      navigation.locator('.dnb-table-of-content__title')
    ).toHaveText('On this page')
    await expect(article).toBeVisible()
    expect((await navigation.boundingBox()).x).toBeGreaterThan(
      (await article.boundingBox()).x + (await article.boundingBox()).width
    )
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
    await page.goto('/uilib/extensions/table-of-content/demos/')
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
    await example.scrollIntoViewIfNeeded()
    expect((await navigation.boundingBox()).x).toBeGreaterThan(
      (await article.boundingBox()).x + (await article.boundingBox()).width
    )
    await destinationLink.evaluate((element: HTMLAnchorElement) =>
      element.focus({ preventScroll: true })
    )
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
    await expect
      .poll(() =>
        article.evaluate((element, id) => {
          const target = document.getElementById(id)
          return Math.abs(
            target.getBoundingClientRect().top -
              element.getBoundingClientRect().top -
              element.clientTop -
              parseFloat(getComputedStyle(element).scrollPaddingTop)
          )
        }, focusedId)
      )
      .toBeLessThan(2)
    await expect(page).toHaveURL(pageUrl)
    expect(await page.evaluate(() => window.scrollY)).toBe(pageScroll)
    await article.evaluate((element) => {
      element.dispatchEvent(new WheelEvent('wheel', { bubbles: true }))
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
