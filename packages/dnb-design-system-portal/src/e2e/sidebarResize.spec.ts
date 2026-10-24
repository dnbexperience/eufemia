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
    expect(sidebarLayout.sidebarBottom).toBe(sidebarLayout.viewportHeight)
    expect(sidebarLayout.handleBottom).toBe(sidebarLayout.viewportHeight)

    await expect(
      sidebar.evaluate(
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
        leftOfLine: lineX - rect.left,
        rightOfLine: rect.right - lineX,
      }
    })

    expect(hitArea.width).toBeGreaterThan(12)
    expect(hitArea.rightOfLine).toBeGreaterThan(hitArea.leftOfLine)

    const resizedWidth = 760

    await dragSidebarToWidth(page, resizeHandle, resizedWidth)

    await expect(sidebar).toHaveCSS('width', `${resizedWidth}px`)

    await page.reload()
    await waitForApp(page)

    await expect(sidebar).toHaveCSS('width', `${initialWidth}px`)
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

    const overflow = await sidebar.evaluate((element) => {
      return {
        overflowX: getComputedStyle(element).overflowX,
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }
    })

    expect(overflow.overflowX).toBe('auto')
    expect(overflow.scrollWidth).toBeGreaterThan(overflow.clientWidth)
  })
})
