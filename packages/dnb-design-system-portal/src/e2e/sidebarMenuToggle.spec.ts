import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Reveal page boundaries with iOS scroll locking', () => {
  test.use({
    viewport: { width: 390, height: 844 },
    userAgent:
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
  })

  test('preserves the scrolled page and breakout rules without horizontal overflow', async ({
    page,
  }) => {
    await page.goto(
      '/web/layout-and-typography/elements/horizontal-rule/demos/'
    )
    await waitForApp(page)
    await page.evaluate(() => document.fonts.ready)
    await page.locator('.dnb-hr--breakout').scrollIntoViewIfNeeded()
    const surface = page.locator('.portal-reveal-page')
    const before = await surface.boundingBox()
    const beforeScroll = await page.evaluate(() => scrollY)
    const rule = await page.locator('.dnb-hr--breakout').boundingBox()
    expect(beforeScroll).toBeGreaterThan(0)

    await page.locator('#toggle-sidebar-menu').click()
    const dialog = page.locator('#portal-sidebar-menu-drawer')
    // Fixed modal layers make Safari replace the page behind its browser bars.
    await expect(dialog).toHaveCSS('position', 'absolute')
    const drawer = await dialog.locator('.dnb-drawer').boundingBox()
    expect(drawer.y).toBeCloseTo(0, 0)
    await expect
      .poll(async () => (await surface.boundingBox()).x)
      .toBeCloseTo(drawer.width, 0)

    const expectPageBounds = async () => {
      expect(await page.evaluate(() => scrollY)).toBe(beforeScroll)
      const bounds = await surface.boundingBox()
      expect(bounds.y).toBeCloseTo(before.y, 0)
      expect(bounds.height).toBeCloseTo(before.height, 0)
      const currentRule = await page
        .locator('.dnb-hr--breakout')
        .boundingBox()
      expect(currentRule.y).toBeCloseTo(rule.y, 0)
      expect(currentRule.width).toBeCloseTo(rule.width, 0)
      expect(
        await page.evaluate(
          () =>
            document.documentElement.scrollWidth -
            document.documentElement.clientWidth
        )
      ).toBe(0)
    }
    await test.step('keeps the page bounds while open', expectPageBounds)
    await test.step('keeps the menu anchored after a viewport resize', async () => {
      await page.setViewportSize({ width: 400, height: 750 })
      const bounds = await dialog.boundingBox()
      expect(bounds.x).toBe(0)
      expect(bounds.y).toBe(0)
      expect(bounds.width).toBe(400)
      expect(bounds.height).toBe(750)
      await page.setViewportSize({ width: 390, height: 844 })
    })
    await test.step('scrolls the menu while the page stays still', async () => {
      const drawer = dialog.locator('.dnb-drawer__reveal-scroll')
      await drawer.evaluate((element) => {
        element.scrollTop = element.scrollHeight
      })
      await expect
        .poll(() => drawer.evaluate((element) => element.scrollTop))
        .toBeGreaterThan(0)
      await expect(
        dialog.getByRole('button', { name: 'Close', exact: true })
      ).toBeInViewport()
      await expectPageBounds()
    })
    await dialog.press('Escape')
    await expect(dialog).not.toBeVisible()
    await test.step('restores the page after closing', expectPageBounds)
  })
})

test.describe('Reveal documentation demos', () => {
  for (const example of [
    {
      path: '/web/components/drawer/demos/',
      title: 'Drawer reveal demo',
      trigger: 'Open reveal menu',
      target: '#drawer-reveal-page',
    },
    {
      path: '/web/patterns-and-extensions/sidebar-menu/demos/',
      title: 'Sidebar reveal demo',
      trigger: 'Open navigation',
      target: '#sidebar-reveal-page',
    },
  ]) {
    test(`opens and closes the inline ${example.title}`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(example.path)
      await waitForApp(page)
      const target = page.locator(example.target)
      const trigger = target.getByRole('button', {
        name: example.trigger,
        exact: true,
      })
      await trigger.click()
      const dialog = page.getByRole('dialog')
      await expect(dialog).toHaveCount(1)
      await expect(dialog).toBeVisible()
      const shell = await target.locator('..').boundingBox()
      const menu = await dialog.boundingBox()
      expect(menu.x).toBeCloseTo(shell.x + 1, 0)
      expect(menu.y).toBeCloseTo(shell.y + 1, 0)
      expect(menu.width).toBeCloseTo(shell.width - 2, 0)
      expect(menu.height).toBeCloseTo(shell.height - 2, 0)
      await expect(target).toHaveAttribute('inert', '')
      await expect(
        page.locator('#portal-sidebar-menu-drawer')
      ).not.toBeVisible()
      await expect(target).toHaveAttribute('aria-hidden', 'true')
      await dialog.press('Escape')
      await expect(dialog).not.toBeVisible()
      await expect(trigger).toBeFocused()
      await expect(target).not.toHaveAttribute('inert')
      await trigger.click()
      await dialog.locator('.dnb-modal__close-button').click()
      await expect(dialog).not.toBeVisible()
      await expect(trigger).toBeFocused()

      if (example.title === 'Sidebar reveal demo') {
        await page.setViewportSize({ width: 1200, height: 900 })
        await expect(trigger).not.toBeVisible()
        await expect(
          page.getByRole('navigation', { name: 'Application navigation' })
        ).toBeVisible()
      }
    })

    test(`swipes the inline ${example.title} without opening the Portal menu`, async ({
      page,
      browserName,
    }) => {
      test.skip(
        browserName !== 'chromium',
        'Touch input uses Chromium CDP'
      )
      await page.setViewportSize({ width: 390, height: 844 })
      await page.goto(example.path)
      await waitForApp(page)
      const target = page.locator(example.target)
      await target.scrollIntoViewIfNeeded()
      const bounds = await target.boundingBox()
      const session = await page.context().newCDPSession(page)
      const y = Math.max(bounds.y, 100) + 10
      const x = bounds.x + 10
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x, y }],
      })
      for (let step = 1; step <= 8; step++) {
        await session.send('Input.dispatchTouchEvent', {
          type: 'touchMove',
          touchPoints: [{ x: x + step * 30, y }],
        })
      }
      await session.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
      })
      await expect(page.getByRole('dialog')).toHaveCount(1)
      await expect(target).toHaveAttribute('inert', '')
      await expect(
        page.locator('#portal-sidebar-menu-drawer')
      ).not.toBeVisible()
      if (example.title === 'Drawer reveal demo') {
        const action = page.getByRole('button', {
          name: 'Menu action',
          exact: true,
        })
        await action.focus()
        await action.press('Enter')
        await expect(page.getByRole('dialog')).not.toBeVisible()
        await expect(target).not.toHaveAttribute('inert')
      }
      await session.detach()
    })
  }
})

test.describe('Portal sidebar reveal', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/web/patterns-and-extensions/sidebar-menu/')
    await waitForApp(page)
  })

  test('moves the page while keeping focus and interaction inside the menu', async ({
    page,
  }) => {
    const trigger = page.locator('#toggle-sidebar-menu')
    const dialog = page.locator('#portal-sidebar-menu-drawer')
    const surface = page.locator('.portal-reveal-page')
    const opening = surface.evaluate(
      (element) =>
        new Promise<{ x: number; width: number; opacity: number }[]>(
          (resolve) => {
            const positions: {
              x: number
              width: number
              opacity: number
            }[] = []
            const sample = () => {
              const drawer = document.querySelector(
                '#portal-sidebar-menu-drawer .dnb-drawer'
              )
              if (drawer) {
                const x = element.getBoundingClientRect().x
                const width = drawer.getBoundingClientRect().width
                positions.push({
                  x,
                  width,
                  opacity: Number(getComputedStyle(element).opacity),
                })
                if (x >= width - 0.5) {
                  resolve(positions)
                  return
                }
              }
              requestAnimationFrame(sample)
            }
            sample()
          }
        )
    )
    await trigger.click()
    const positions = await opening
    expect(positions.some(({ x, width }) => x > 0 && x < width / 2)).toBe(
      true
    )
    const beforeFade = positions.filter(
      ({ x, width }) => x > 0 && x < width * 0.35
    )
    expect(beforeFade.length).toBeGreaterThan(0)
    expect(beforeFade.every(({ opacity }) => opacity === 1)).toBe(true)
    expect(
      positions.some(
        ({ x, width, opacity }) => x > width * 0.5 && opacity < 1
      )
    ).toBe(true)
    await expect(dialog).toBeFocused()
    await test.step('keeps Close right without duplicating the page logo', async () => {
      await page.evaluate(() => document.fonts.ready)
      await expect(
        dialog.getByRole('link', { name: 'Go to Eufemia home' })
      ).toHaveCount(0)
      const header = await dialog
        .locator('.dnb-drawer__navigation')
        .boundingBox()
      const close = await dialog
        .getByRole('button', { name: 'Close', exact: true })
        .boundingBox()
      expect(close.x).toBeGreaterThan(header.x + header.width / 2)
      expect(
        Math.abs(
          header.y + header.height / 2 - (close.y + close.height / 2)
        )
      ).toBeLessThanOrEqual(1)
    })
    await expect(page.locator('.dnb-drawer__reveal-overlay')).toHaveCSS(
      'background-color',
      'rgba(0, 0, 0, 0)'
    )
    await expect(surface).toHaveCSS('opacity', '0.68')
    await expect(surface).toHaveAttribute('inert', '')
    await expect(trigger).toHaveAttribute('aria-hidden', 'true')
    await trigger.evaluate((element) => element.focus())
    await expect(dialog).toBeFocused()
    for (let step = 0; step < 5; step++) {
      await page.keyboard.press('Tab')
      await expect
        .poll(() =>
          dialog.evaluate((element) =>
            element.contains(document.activeElement)
          )
        )
        .toBe(true)
    }
    await page.keyboard.press('Shift+Tab')
    await expect
      .poll(() =>
        dialog.evaluate((element) =>
          element.contains(document.activeElement)
        )
      )
      .toBe(true)
    const firstControl = dialog.getByRole('button', {
      name: 'Close',
      exact: true,
    })
    const lastLink = dialog.getByRole('link', {
      name: 'Releases and upgrades',
      exact: true,
    })
    await firstControl.focus()
    await page.keyboard.press('Shift+Tab')
    await expect(lastLink).toBeFocused()
    await expect(lastLink).toBeInViewport()
    await page.keyboard.press('Tab')
    await expect(firstControl).toBeFocused()
    const menuWidth = await dialog
      .locator('.dnb-drawer')
      .evaluate((element) => element.getBoundingClientRect().width)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth, 0)
    expect(
      await page.evaluate(() =>
        document.elementFromPoint(375, 200)?.getAttribute('role')
      )
    ).toBe('dialog')
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()
    expect(
      await trigger.evaluate(
        (element) => getComputedStyle(element, '::before').boxShadow
      )
    ).not.toBe('none')
    await expect(surface).not.toHaveClass(/dnb-drawer__reveal-target/)
    await expect(surface).not.toHaveAttribute('inert')
    await expect(surface).toHaveCSS('opacity', '1')

    await trigger.click()
    await expect(dialog).toBeFocused()
    await page.mouse.click(375, 200)
    await expect(dialog).not.toBeVisible()
    await expect(trigger).toBeFocused()

    await trigger.click()
    await expect(dialog).toBeVisible()
    await page.setViewportSize({ width: 1600, height: 1000 })
    await expect(dialog).not.toBeVisible()
    await expect(surface).not.toHaveClass(/dnb-drawer__reveal-target/)
    await expect(page.locator('html')).not.toHaveAttribute(
      'data-dnb-modal-active'
    )
  })

  test('supports touch dragging, cancellation, and native vertical scrolling', async ({
    page,
    browserName,
  }) => {
    test.skip(browserName !== 'chromium', 'Touch input uses Chromium CDP')
    const session = await page.context().newCDPSession(page)
    const dialog = page.locator('#portal-sidebar-menu-drawer')
    const surface = page.locator('.portal-reveal-page')
    const touch = (
      type: 'touchStart' | 'touchMove' | 'touchEnd' | 'touchCancel',
      x?: number,
      y = 550
    ) =>
      session.send('Input.dispatchTouchEvent', {
        type,
        touchPoints: x === undefined ? [] : [{ x, y }],
      })
    const drag = async (
      from: number,
      to: number,
      cancel = false,
      y = 550
    ) => {
      await touch('touchStart', from, y)
      for (let step = 1; step <= 8; step++) {
        await touch('touchMove', from + ((to - from) * step) / 8, y)
      }
      await touch(cancel ? 'touchCancel' : 'touchEnd')
    }

    await drag(24, 80)
    await expect(dialog).not.toBeVisible()
    await drag(24, 300, true)
    await expect(dialog).not.toBeVisible()

    const closedX = await surface.evaluate(
      (element) => element.getBoundingClientRect().x
    )
    await touch('touchStart', 24)
    await touch('touchMove', 100)
    await expect(dialog).toBeVisible()
    await expect(surface).toHaveClass(/dnb-drawer__reveal-dragging/)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBe(closedX)
    expect(
      await dialog
        .locator('.dnb-drawer')
        .evaluate((element) => element.getBoundingClientRect().x)
    ).toBe(0)
    await touch('touchMove', 300)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBe(closedX + 200)
    await touch('touchEnd')
    await expect(surface).not.toHaveClass(/dnb-drawer__reveal-dragging/)
    await expect(page.locator('#toggle-sidebar-menu')).toHaveAttribute(
      'aria-expanded',
      'true'
    )

    await drag(375, 320)
    await expect(dialog).toBeVisible()
    await drag(375, 100)
    await expect(dialog).not.toBeVisible()
    await expect(surface).not.toHaveClass(/dnb-drawer__reveal-target/)
    const trigger = page.locator('#toggle-sidebar-menu')
    await expect(trigger).toBeFocused()
    await expect(trigger).toHaveCSS('outline-style', 'none')
    await expect(trigger).toHaveCSS('box-shadow', 'none')
    expect(
      await trigger.evaluate(
        (element) => getComputedStyle(element, '::before').boxShadow
      )
    ).toBe('none')

    await drag(24, 300)
    const drawer = dialog.locator('.dnb-drawer')
    const menuWidth = await drawer.evaluate(
      (element) => element.getBoundingClientRect().width
    )
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth, 0)
    const link = dialog.getByRole('link').first()
    await link.scrollIntoViewIfNeeded()
    const bounds = await link.boundingBox()
    const x = bounds.x + bounds.width - 8
    const y = bounds.y + bounds.height / 2
    const url = page.url()
    await drag(x, x - 55, false, y)
    await expect(dialog).toBeVisible()
    await drag(x, 10, true, y)
    await expect(dialog).toBeVisible()
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth, 0)
    await touch('touchStart', x, y)
    await touch('touchMove', x - 30, y)
    await expect(surface).toHaveClass(/dnb-drawer__reveal-dragging/)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth, 0)
    await touch('touchMove', x - 80, y)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth - 50, 0)
    await touch('touchMove', 10, y)
    await expect
      .poll(() =>
        surface.evaluate((element) => element.getBoundingClientRect().x)
      )
      .toBeCloseTo(menuWidth - (x - 30 - 10), 0)
    const settling = surface.evaluate(
      (element) =>
        new Promise<{ x: number; linkX: number }[]>((resolve) => {
          const positions: { x: number; linkX: number }[] = []
          const sample = () => {
            const link = document.querySelector(
              '#portal-sidebar-menu-drawer a'
            )
            if (!link) {
              resolve(positions)
              return
            }
            positions.push({
              x: element.getBoundingClientRect().x,
              linkX: link.getBoundingClientRect().x,
            })
            requestAnimationFrame(sample)
          }
          sample()
        })
    )
    await touch('touchEnd')
    await expect(dialog).not.toBeVisible()
    const positions = await settling
    expect(positions.length).toBeGreaterThan(1)
    positions.forEach((position, index) => {
      expect(position.x).toBeLessThanOrEqual(
        (positions[index - 1]?.x ?? menuWidth - (x - 30 - 10)) + 1
      )
      expect(position.linkX).toBeCloseTo(bounds.x, 0)
    })
    expect(page.url()).toBe(url)

    await touch('touchStart', 30, 650)
    for (let y = 620; y >= 300; y -= 40) {
      await touch('touchMove', 30, y)
    }
    await touch('touchEnd')
    await expect(dialog).not.toBeVisible()
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)

    await trigger.click()
    await expect(dialog).toBeVisible()
    const scrollArea = dialog.locator('.dnb-drawer__reveal-scroll')
    await expect
      .poll(() =>
        scrollArea.evaluate((element) =>
          element.contains(document.elementFromPoint(150, 650))
        )
      )
      .toBe(true)
    const scrollTop = await scrollArea.evaluate(
      (element) => element.scrollTop
    )
    await touch('touchStart', 150, 650)
    for (let y = 620; y >= 300; y -= 40) {
      await touch('touchMove', 150, y)
    }
    await touch('touchEnd')
    await expect(dialog).toBeVisible()
    await expect
      .poll(() => scrollArea.evaluate((element) => element.scrollTop))
      .toBeGreaterThan(scrollTop)
    await link.scrollIntoViewIfNeeded()
    const tapBounds = await link.boundingBox()
    await touch(
      'touchStart',
      tapBounds.x + tapBounds.width / 2,
      tapBounds.y + tapBounds.height / 2
    )
    await touch('touchEnd')
    await expect(dialog).not.toBeVisible()
    await expect(page).not.toHaveURL(url)
    await session.detach()
  })
})

test.describe('SidebarMenu toggle', () => {
  test('controls inline and Drawer navigation from outside the provider', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/web/patterns-and-extensions/sidebar-menu/demos/#toggle-outside-the-provider'
    )
    await waitForApp(page)
    const example = page.locator(
      '[data-sidebar-menu-external-toggle-example]'
    )
    const toggle = example.locator('.dnb-sidebar-menu-toggle').first()
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    await expect(toggle).toBeEnabled()
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(
      await example.evaluate((example) =>
        example.contains(
          example
            .querySelector('.dnb-sidebar-menu-toggle')
            .closest('.dnb-sidebar-menu-responsive-provider')
        )
      )
    ).toBe(false)
    await toggle.click()
    await expect(inline).toHaveAttribute('inert')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(inline).not.toHaveAttribute('inert')
    await example
      .locator('.dnb-sidebar-menu-responsive-inline__toggle')
      .click()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await toggle.click()
    await expect(inline).not.toHaveAttribute('inert')

    await page.setViewportSize({ width: 500, height: 900 })
    await expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    await expect(toggle).toHaveAttribute(
      'aria-controls',
      'external-toggle-drawer'
    )
    await toggle.click()
    const dialog = page.locator('#external-toggle-drawer[role="dialog"]')
    await expect(dialog).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-hidden', 'true')
    await page.keyboard.press('Escape')
    await expect(dialog).not.toBeVisible()
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('preserves the released non-compact Inline layout without generated boxes', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/web/patterns-and-extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const layout = await example.evaluate((example) => {
      const inline = document.createElement('div')
      inline.className = 'dnb-sidebar-menu-responsive-inline'
      inline.dataset.sidebarMenuResponsiveVisible = 'true'
      const nav = document.createElement('nav')
      nav.style.width = '432px'
      inline.appendChild(nav)
      example.appendChild(inline)
      const result = {
        display: getComputedStyle(inline).display,
        before: getComputedStyle(inline, '::before').content,
        after: getComputedStyle(inline, '::after').content,
        childWidth: nav.getBoundingClientRect().width,
      }
      inline.remove()
      return result
    })
    expect(layout).toEqual({
      display: 'contents',
      before: 'none',
      after: 'none',
      childWidth: 432,
    })
  })

  test('restores inline dismissal before the hydration bundle loads', async ({
    page,
  }) => {
    const response = await page.request.get(
      '/web/patterns-and-extensions/sidebar-menu/demos/'
    )
    const html = await response.text()
    test.skip(
      !html.includes('data-inline-collapsed-storage-key='),
      'Requires prerendered Portal HTML'
    )
    expect(html).toContain('data-sidebar-menu-inline-pre-hydration')
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.addInitScript(() =>
      sessionStorage.setItem('sidebar-menu-toggle-example', 'true')
    )
    await page.route('**/*.js', (route) => route.abort())
    await page.goto(
      '/web/patterns-and-extensions/sidebar-menu/demos/#toggle-navigation',
      { waitUntil: 'domcontentloaded' }
    )
    const inline = page.locator(
      '[data-sidebar-menu-toggle-example] .dnb-sidebar-menu-responsive-inline'
    )
    await expect(inline).not.toHaveAttribute(
      'data-sidebar-menu-responsive-visible'
    )
    await expect(inline).toHaveCSS('width', '0px')
    await expect(
      page.locator(
        '[data-sidebar-menu-inline-pre-hydration="sidebar-menu-toggle-example"]'
      )
    ).toHaveCount(1)
    await page.setViewportSize({ width: 500, height: 900 })
    await expect(inline).toHaveCSS('display', 'none')
  })

  test('covers the full sidebar edge with the divider and resize target', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const surface = inline.locator(
      '.dnb-sidebar-menu-responsive-inline__content'
    )
    const handle = inline.getByRole('separator')
    await example.scrollIntoViewIfNeeded()
    const edge = await surface.boundingBox()
    const target = await handle.boundingBox()
    const divider = await surface.evaluate((element) => {
      const style = getComputedStyle(element, '::after')
      return {
        top: style.top,
        bottom: style.bottom,
        width: style.width,
        opacity: style.opacity,
      }
    })
    expect(divider).toEqual({
      top: '0px',
      bottom: '0px',
      width: '1px',
      opacity: '1',
    })
    expect(target.y).toBeCloseTo(edge.y, 1)
    expect(target.height).toBeCloseTo(edge.height, 1)
    const x = edge.x + edge.width - 1
    const y = edge.y + 16
    await page.mouse.move(x, y)
    await expect
      .poll(() => handle.evaluate((element) => element.matches(':hover')))
      .toBe(true)
    await page.mouse.down()
    await page.mouse.move(x + 32, y)
    await page.mouse.up()
    await expect(inline).toHaveCSS('width', '320px')
    await handle.focus()
    await expect(handle).toBeFocused()
    await expect(handle).toHaveCSS('height', `${edge.height}px`)
  })

  test('lays out the embedded toggle above the menu with aligned icons and compact padding', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const header = inline.locator(
      '.dnb-sidebar-menu-responsive-inline__toggle-island'
    )
    await expect(header).toHaveCSS('position', 'relative')
    const content = inline.locator(
      '.dnb-sidebar-menu-responsive-aside__content'
    )
    await expect(content).toHaveCSS('padding-inline-start', '8px')
    await expect(content).toHaveCSS('padding-inline-end', '8px')
    const measure = () =>
      inline.evaluate((element) => {
        const toggle = element
          .querySelector('.dnb-sidebar-menu-responsive-inline__toggle svg')
          .getBoundingClientRect()
        const home = element
          .querySelector(
            '[data-sidebar-menu-id="toggle-home"] .dnb-icon svg'
          )
          .getBoundingClientRect()
        const header = element
          .querySelector(
            '.dnb-sidebar-menu-responsive-inline__toggle-island'
          )
          .getBoundingClientRect()
        const body = element
          .querySelector('.dnb-sidebar-menu-responsive-inline__body')
          .getBoundingClientRect()
        return {
          toggleX: toggle.x + toggle.width / 2,
          homeX: home.x + home.width / 2,
          headerBottom: header.bottom,
          bodyTop: body.top,
        }
      })
    const full = await measure()
    expect(full.toggleX).toBeCloseTo(full.homeX, 1)
    expect(full.bodyTop).toBeGreaterThanOrEqual(full.headerBottom)
    await header.evaluate((element) => {
      ;(element as HTMLElement).style.height = '80px'
    })
    await expect
      .poll(async () => (await measure()).bodyTop - full.bodyTop)
      .toBe(32)
    await header.evaluate((element) => {
      ;(element as HTMLElement).style.height = ''
    })
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.mouse.move(850, 950)
    await expect(inline).toHaveCSS('width', '64px')
    await expect
      .poll(async () => {
        const compact = await measure()
        return Math.abs(compact.toggleX - compact.homeX)
      })
      .toBeLessThan(0.1)
    await inline
      .locator('.dnb-sidebar-menu-responsive-inline__toggle')
      .focus()
    await inline
      .locator('.dnb-sidebar-menu-responsive-inline__toggle')
      .press('Enter')
    await expect(inline).toHaveAttribute(
      'data-sidebar-menu-responsive-expanded',
      'true'
    )
    await expect
      .poll(async () => {
        const expanded = await measure()
        return Math.abs(expanded.toggleX - expanded.homeX)
      })
      .toBeLessThan(0.1)
  })

  test('remembers inline dismissal after reload and leaves the Drawer closed', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    await embedded.click()
    await expect(inline).toHaveCSS('width', '0px')
    await page.reload()
    await waitForApp(page)
    await expect(inline).toHaveCSS('width', '0px')
    await expect(inline).toHaveAttribute('inert', '')
    await expect(external).toHaveAttribute('aria-expanded', 'false')
    await external.click()
    await expect(inline).toHaveCSS('width', '288px')
    await page.reload()
    await waitForApp(page)
    await expect(inline).toHaveCSS('width', '288px')
    await page.setViewportSize({ width: 500, height: 900 })
    await external.click()
    await expect(page.locator('#toggle-example-drawer')).toBeVisible()
    await page.reload()
    await waitForApp(page)
    await expect(page.locator('#toggle-example-drawer')).not.toBeVisible()
    await expect(external).toHaveAttribute('aria-expanded', 'false')
  })

  test('keeps compact expansion separate from inline dismissal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 900, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    await expect(inline).toHaveCSS('width', '64px')
    await embedded.focus()
    await embedded.press('Enter')
    await expect(embedded).toHaveAttribute('aria-expanded', 'true')
    await expect(inline).not.toHaveAttribute('inert', '')
    await expect(inline).toHaveCSS('width', '64px')
    await external.focus()
    await external.press('Enter')
    await expect(inline).toHaveCSS('width', '0px')
    await external.click()
    await expect(inline).toHaveCSS('width', '64px')
    await expect(embedded).toHaveAttribute('aria-expanded', 'false')
  })

  test('opens the Drawer and returns focus on dismissal', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 500, height: 900 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)
    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const toggle = example.locator('.dnb-sidebar-menu-toggle')
    await expect(toggle).toHaveAttribute('aria-haspopup', 'dialog')
    await toggle.click()
    const drawer = page.locator('#toggle-example-drawer')
    await expect(drawer).toBeVisible()
    await expect(toggle).toHaveAttribute('aria-hidden', 'true')
    await page.keyboard.press('Escape')
    await expect(toggle).toHaveAttribute('aria-expanded', 'false')
    await expect(toggle).toBeFocused()
  })

  test('animates from the resized width and restores the default width', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
    )
    await waitForApp(page)

    const example = page.locator('[data-sidebar-menu-toggle-example]')
    const inline = example.locator('.dnb-sidebar-menu-responsive-inline')
    const embedded = inline.locator('.dnb-sidebar-menu-toggle')
    const external = example.locator('.dnb-sidebar-menu-toggle').last()
    const handle = inline.getByRole('separator')
    const defaultWidth = await inline.evaluate(
      (element) => element.getBoundingClientRect().width
    )

    await handle.focus()
    await handle.press('ArrowRight')
    await expect
      .poll(() =>
        inline.evaluate((element) => element.getBoundingClientRect().width)
      )
      .toBe(defaultWidth + 16)
    await embedded.focus()
    await inline.evaluate((element) => {
      element.addEventListener('transitionrun', (event) => {
        if (
          event instanceof TransitionEvent &&
          event.target === element &&
          event.propertyName === 'width'
        ) {
          const widths = element
            .getAnimations()
            .filter(
              (animation) =>
                animation instanceof CSSTransition &&
                animation.transitionProperty === 'width'
            )
            .flatMap((animation) =>
              (animation.effect as KeyframeEffect)
                .getKeyframes()
                .map((frame) => frame.width)
            )
          element.setAttribute(
            'data-test-collapse-widths',
            JSON.stringify(widths)
          )
        }
      })
    })
    await embedded.press('Enter')
    await expect(inline).toHaveAttribute('inert', '')
    const restore = external
    await expect(restore).toBeFocused()
    await expect(inline).toHaveCSS('transition-duration', '0.24s')
    await expect(inline).toHaveAttribute(
      'data-test-collapse-widths',
      JSON.stringify([`${defaultWidth + 16}px`, '0px'])
    )
    await expect(inline).toHaveCSS('width', '0px')
    await restore.click()
    await expect(inline).not.toHaveAttribute('inert', '')
    await expect
      .poll(() =>
        inline.evaluate((element) => element.getBoundingClientRect().width)
      )
      .toBe(defaultWidth)

    await page.emulateMedia({ reducedMotion: 'reduce' })
    await external.click()
    expect(
      await inline.evaluate((element) =>
        parseFloat(getComputedStyle(element).transitionDuration)
      )
    ).toBeLessThan(0.001)
    await expect(inline).toHaveCSS('width', '0px')
  })
})
