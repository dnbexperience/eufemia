import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps the compact SidebarMenu layout stable while expanding', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const inline = shell.locator('.dnb-sidebar-menu-responsive-inline')
  const content = inline.locator(
    '.dnb-sidebar-menu-responsive-inline__content'
  )
  const actions = shell.locator('.dnb-sidebar-menu__item__action')
  const settings = shell.locator(
    '[data-sidebar-menu-id="settings"] .dnb-sidebar-menu__item__action'
  )
  const divider = shell.locator('.dnb-sidebar-menu__divider')
  const home = actions.first()

  await shell.scrollIntoViewIfNeeded()
  await page.mouse.move(1100, 700)
  await expect(
    shell.locator('.dnb-height-animation--animating')
  ).toHaveCount(0)

  await expect(inline).toHaveAttribute(
    'data-sidebar-menu-responsive-compact',
    'true'
  )
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(64)
  await expect(inline).toHaveCSS('transition-property', 'width')

  const rowHeights = await actions.evaluateAll((elements) =>
    elements.map((element) => element.getBoundingClientRect().height)
  )
  expect(new Set(rowHeights)).toEqual(new Set([44]))

  const getSettingsDividerGap = async () => {
    const settingsBox = await settings.boundingBox()
    const dividerBox = await divider.boundingBox()
    if (!settingsBox || !dividerBox) {
      throw new Error('Expected compact SidebarMenu geometry')
    }
    return settingsBox.y - dividerBox.y
  }
  const settingsDividerGap = await getSettingsDividerGap()

  await home.hover()
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px)')
  expect(await getSettingsDividerGap()).toBe(settingsDividerGap)

  await shell
    .locator(
      '[data-sidebar-menu-id="products"] .dnb-sidebar-menu__accordion__trigger'
    )
    .click()
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px)')

  await home.click()
  await expect(inline).toHaveAttribute(
    'data-sidebar-menu-responsive-dismissed',
    'true'
  )
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px 224px 0px 0px)')

  await page.mouse.move(1100, 700)
  await expect(inline).toHaveAttribute(
    'data-sidebar-menu-responsive-dismissed',
    'true'
  )
  await home.hover()
  await expect(inline).not.toHaveAttribute(
    'data-sidebar-menu-responsive-dismissed'
  )
  await settings.focus()
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px)')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  expect(
    await content.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).transitionDuration)
    )
  ).toBeLessThanOrEqual(0.001)
})

test('resizes the full SidebarMenu and restores that width', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1400, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const inline = shell.locator('.dnb-sidebar-menu-responsive-inline')
  const handle = shell.locator('.dnb-sidebar-menu-resize-handle')
  await shell.scrollIntoViewIfNeeded()

  await expect(handle).toHaveAttribute('aria-valuenow', '288')
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await expect(handle).toHaveAttribute('aria-valuenow', '304')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(304)

  await page.setViewportSize({ width: 500, height: 900 })
  await expect(inline).toHaveCount(0)

  await page.setViewportSize({ width: 1400, height: 900 })
  await expect(handle).toHaveAttribute('aria-valuenow', '304')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(304)

  await page.setViewportSize({ width: 1200, height: 900 })
  await expect(handle).toBeHidden()
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(64)

  await page.setViewportSize({ width: 1400, height: 900 })
  await expect(handle).toBeVisible()
  await expect(handle).toHaveAttribute('aria-valuenow', '304')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(304)
})

test('dismisses the full SidebarMenu by dragging and restores it', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1400, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const inline = shell.locator('.dnb-sidebar-menu-responsive-inline')
  const handle = shell.locator('.dnb-sidebar-menu-resize-handle')
  const scrollView = shell.locator(
    '.dnb-sidebar-menu-responsive-aside__scroll-view'
  )
  const trigger = shell.locator('.dnb-sidebar-menu-responsive-trigger')
  await shell.scrollIntoViewIfNeeded()

  await handle.evaluate((element) => {
    element.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        button: 0,
        clientX: 288,
        pointerId: 1,
      })
    )
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 180,
        pointerId: 1,
      })
    )
  })

  await expect
    .poll(() =>
      scrollView.evaluate(
        (element) => element.scrollWidth > element.clientWidth
      )
    )
    .toBe(true)
  expect(
    new Set(
      await shell
        .locator('.dnb-sidebar-menu__item__action')
        .evaluateAll((elements) =>
          elements.map((element) => element.getBoundingClientRect().height)
        )
    )
  ).toEqual(new Set([44]))

  await handle.evaluate(() => {
    window.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 119,
        pointerId: 1,
      })
    )
  })

  await expect(trigger).toHaveAttribute(
    'data-sidebar-menu-responsive-visible',
    'true'
  )
  const hamburgerPaths = trigger.locator('.dnb-icon path')
  await expect(hamburgerPaths).toHaveCount(3)
  expect(
    await hamburgerPaths.evaluateAll((paths) =>
      paths.map((path) => getComputedStyle(path).animationDelay)
    )
  ).toEqual(['0.2s', '0.27s', '0.34s'])
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(0)

  await trigger.click()
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(288)
  await expect(handle).toHaveAttribute('aria-valuenow', '288')
})
