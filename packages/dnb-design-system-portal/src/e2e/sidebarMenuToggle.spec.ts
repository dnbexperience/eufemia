import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('SidebarMenu toggle', () => {
  test('controls desktop and mobile navigation from outside the provider', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1600, height: 1000 })
    await page.goto(
      '/web/extensions/sidebar-menu/demos/#toggle-outside-the-provider'
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
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation'
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

  test('restores desktop dismissal before the hydration bundle loads', async ({
    page,
  }) => {
    const response = await page.request.get(
      '/uilib/extensions/sidebar-menu/demos/'
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
      '/uilib/extensions/sidebar-menu/demos/#toggle-navigation',
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

  test('remembers desktop dismissal after reload and leaves the mobile Drawer closed', async ({
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

  test('keeps compact expansion separate from desktop dismissal', async ({
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

  test('opens the mobile Drawer and returns focus on dismissal', async ({
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
