import { test, expect, type Locator, type Page } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Sidebar resize', () => {
  async function gotoAndWait(page: Page) {
    await page.goto('/uilib/components/button/demos/')
    await waitForApp(page)
  }

  async function dragSidebarToWidth(
    page: Page,
    resizeHandle: Locator,
    width: number
  ) {
    const start = await resizeHandle.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const lineX =
        rect.left + parseFloat(getComputedStyle(element, '::before').left)

      return {
        x: lineX,
        y: rect.top + rect.height / 2,
      }
    })

    await page.mouse.move(start.x, start.y)
    await page.mouse.down()
    await page.mouse.move(width, start.y)
    await page.mouse.up()
  }

  test('should resize the sidebar and reset the width on reload', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await gotoAndWait(page)

    const sidebar = page.locator('#portal-sidebar-menu')
    const scrollView = sidebar.locator('.portal-sidebar-scroll-view')
    const resizeHandle = page.getByRole('button', {
      name: 'Resize sidebar',
    })
    const initialWidth = await sidebar.evaluate(
      (element) => element.getBoundingClientRect().width
    )

    const sidebarLayout = await page.evaluate(() => {
      const sidebar = document.querySelector('#portal-sidebar-menu')
      const resizeHandle = document.querySelector(
        '[aria-label="Resize sidebar"]'
      )

      return {
        viewportHeight: window.innerHeight,
        sidebarTop: Math.round(sidebar.getBoundingClientRect().top),
        sidebarBottom: Math.round(sidebar.getBoundingClientRect().bottom),
        handleTop: Math.round(resizeHandle.getBoundingClientRect().top),
        handleBottom: Math.round(
          resizeHandle.getBoundingClientRect().bottom
        ),
      }
    })

    expect(sidebarLayout.handleTop).toBe(sidebarLayout.sidebarTop)
    expect(sidebarLayout.sidebarTop).toBe(0)
    expect(sidebarLayout.sidebarBottom).toBe(sidebarLayout.viewportHeight)
    expect(sidebarLayout.handleBottom).toBe(sidebarLayout.viewportHeight)

    await expect(
      scrollView.evaluate(
        (element) => element.scrollWidth <= element.clientWidth
      )
    ).resolves.toBe(true)

    await expect(resizeHandle).toHaveCSS('cursor', 'ew-resize')

    const hitArea = await resizeHandle.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const lineX =
        rect.left + parseFloat(getComputedStyle(element, '::before').left)

      return {
        width: rect.width,
        lineX,
        leftOfLine: lineX - rect.left,
        rightOfLine: rect.right - lineX,
      }
    })

    expect(hitArea.width).toBeGreaterThan(12)
    expect(hitArea.rightOfLine).toBeGreaterThan(hitArea.leftOfLine)

    await page.mouse.move(hitArea.lineX - 1, 1)

    const hoverLine = await resizeHandle.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      const style = getComputedStyle(element, '::before')
      const transform = new DOMMatrixReadOnly(style.transform)
      const width = parseFloat(style.width)
      const left = rect.left + parseFloat(style.left) + transform.e
      const right = left + width

      return {
        top: rect.top + parseFloat(style.top),
        bottom: rect.bottom - parseFloat(style.bottom),
        right,
        width,
        isVisibleAtTop:
          document.elementFromPoint(right - 0.5, 1) === element,
      }
    })

    expect(hoverLine.width).toBe(2)
    expect(hoverLine.top).toBe(sidebarLayout.sidebarTop)
    expect(hoverLine.bottom).toBe(sidebarLayout.viewportHeight)
    expect(hoverLine.isVisibleAtTop).toBe(true)

    const resizedWidth = 760

    await dragSidebarToWidth(page, resizeHandle, resizedWidth)

    await expect(sidebar).toHaveCSS('width', `${resizedWidth}px`)
    await expect(page.locator('header.sticky-menu')).toHaveCSS(
      'left',
      `${resizedWidth}px`
    )

    await page.reload()
    await waitForApp(page)

    await expect(sidebar).toHaveCSS('width', `${initialWidth}px`)
  })

  test('should wrap mobile menu content without shifting the logo', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')
    await waitForApp(page)

    await page
      .getByRole('button', { name: 'Open section content menu' })
      .click()

    const drawer = page.getByRole('dialog', { name: 'Menu' })
    const drawerScrollView = drawer.locator('.dnb-drawer')
    const scrollView = drawer.locator('.portal-sidebar-scroll-view')
    const logo = drawer.getByRole('link', {
      name: 'Go to Eufemia home',
    })
    const components = drawer.getByRole('button', {
      name: 'Components',
      exact: true,
    })

    await expect(drawer).toBeVisible()
    await expect(drawerScrollView).toHaveCSS('scrollbar-gutter', 'stable')
    await expect(scrollView).toHaveCSS('scrollbar-gutter', 'auto')
    await drawerScrollView.evaluate(async (element) => {
      await Promise.all(
        element.getAnimations().map((animation) => animation.finished)
      )
    })
    await expect(components).toHaveAttribute('aria-expanded', 'false')
    await expect(
      drawerScrollView.evaluate(
        (element) => element.scrollHeight <= element.clientHeight
      )
    ).resolves.toBe(true)

    const initialLogoX = await logo.evaluate(
      (element) => element.getBoundingClientRect().x
    )

    await components.click()

    const itemText = drawer
      .getByRole('link', {
        name: 'FormStatus (Messageboxes)',
        exact: true,
      })
      .locator('.dnb-sidebar-menu__item__text')

    await expect(itemText).toBeVisible()
    await expect
      .poll(() =>
        drawerScrollView.evaluate(
          (element) => element.scrollHeight > element.clientHeight
        )
      )
      .toBe(true)
    await drawerScrollView.evaluate(
      () =>
        new Promise((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(resolve))
        })
    )
    await expect(
      scrollView.evaluate(
        (element) => element.scrollWidth <= element.clientWidth
      )
    ).resolves.toBe(true)
    await expect(
      itemText.evaluate(
        (element) => element.getBoundingClientRect().height
      )
    ).resolves.toBeGreaterThan(24)
    await expect(
      logo.evaluate((element) => element.getBoundingClientRect().x)
    ).resolves.toBeCloseTo(initialLogoX, 1)
  })

  test('should support focus and keyboard resize', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await gotoAndWait(page)

    const sidebar = page.locator('#portal-sidebar-menu')
    const resizeHandle = page.getByRole('button', {
      name: 'Resize sidebar',
    })

    const initialWidth = await sidebar.evaluate(
      (element) => element.getBoundingClientRect().width
    )

    await expect(resizeHandle).toHaveAttribute(
      'aria-controls',
      'portal-sidebar-menu'
    )

    await resizeHandle.focus()
    await expect(resizeHandle).toBeFocused()

    await page.keyboard.press('ArrowRight')

    await expect(sidebar).toHaveCSS('width', `${initialWidth + 16}px`)

    await page.keyboard.press('ArrowLeft')

    await expect(sidebar).toHaveCSS('width', `${initialWidth}px`)
  })

  test('should show horizontal overflow when the sidebar is narrow', async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1280, height: 900 })
    await gotoAndWait(page)

    const sidebar = page.locator('#portal-sidebar-menu')
    const resizeHandle = page.getByRole('button', {
      name: 'Resize sidebar',
    })

    await dragSidebarToWidth(page, resizeHandle, 120)

    const scrollView = sidebar.locator('.portal-sidebar-scroll-view')
    const sidebarLogo = sidebar.getByRole('link', {
      name: 'Go to Eufemia home',
    })
    const overflow = await scrollView.evaluate((element) => {
      return {
        overflowX: getComputedStyle(element).overflowX,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }
    })

    expect(overflow.overflowX).toBe('auto')
    expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth)

    await scrollView.evaluate((element) => {
      element.scrollLeft = 0
      element.scrollTop = 0
    })
    const initialLogoBox = await sidebarLogo.boundingBox()

    const scrollViewBox = await scrollView.boundingBox()
    await page.mouse.move(
      scrollViewBox.x + scrollViewBox.width / 2,
      scrollViewBox.y + scrollViewBox.height / 2
    )
    await page.mouse.wheel(100, 40)
    await page.waitForTimeout(100)

    const scrolledPosition = await scrollView.evaluate((element) => ({
      left: element.scrollLeft,
      top: element.scrollTop,
    }))
    const scrolledLogoBox = await sidebarLogo.boundingBox()

    expect(scrolledPosition.left).toBeGreaterThan(0)
    expect(scrolledPosition.top).toBe(40)
    expect(scrolledLogoBox.x).toBeLessThan(initialLogoBox.x)
    expect(scrolledLogoBox.y).toBeCloseTo(initialLogoBox.y - 40, 0)
  })
})
