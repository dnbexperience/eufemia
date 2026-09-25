import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('keeps selected nested accordion labels stable while closing', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1400, height: 900 })
  await page.goto(
    '/uilib/extensions/sidebar-menu/demos/?focusmode=SidebarMenuResponsiveNavigation#cards'
  )
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const products = shell.locator(
    '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  const moreProducts = shell.locator(
    '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  const savingsNotification = shell.locator(
    '[data-sidebar-menu-id="savings"] .dnb-badge--variant-notification'
  )

  await products.click()
  await moreProducts.click()
  await shell
    .locator(
      '[data-sidebar-menu-id="loans"] .dnb-sidebar-menu__item__action'
    )
    .click()
  await moreProducts.click()

  await expect(moreProducts).toHaveCSS('height', '44px')
  await expect(
    moreProducts.locator('.dnb-sidebar-menu__item__text')
  ).toHaveCSS('white-space', 'normal')
  await expect(savingsNotification).toHaveCSS('visibility', 'hidden')
})

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
  const productsIcon = shell.locator(
    '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger .dnb-sidebar-menu__item__icon'
  )
  const moreProductsIcon = shell.locator(
    '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger .dnb-sidebar-menu__item__icon'
  )
  const withoutIconText = shell.locator(
    '[data-sidebar-menu-id="without-icon"] .dnb-sidebar-menu__item__text'
  )
  const cardsBadge = shell.locator(
    '[data-sidebar-menu-id="cards"] .dnb-sidebar-menu__badge'
  )
  const productsNotification = shell.locator(
    '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger .dnb-sidebar-menu__accordion__notification-indicator'
  )
  const savingsNotification = shell.locator(
    '[data-sidebar-menu-id="savings"] .dnb-badge--variant-notification'
  )
  const toggle = inline.locator(
    '.dnb-sidebar-menu-responsive-inline__toggle'
  )
  const toggleIsland = inline.locator(
    '.dnb-sidebar-menu-responsive-inline__toggle-island'
  )
  const scrollView = shell.locator(
    '.dnb-sidebar-menu-responsive-aside__scroll-view'
  )

  await shell.scrollIntoViewIfNeeded()
  await page.mouse.move(1100, 700)
  await expect(
    shell.locator('.dnb-height-animation--animating')
  ).toHaveCount(0)
  await expect(page.locator('[aria-label="Main navigation"]')).toHaveCount(
    1
  )

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
  await inline.evaluate((element) => {
    element.style.setProperty(
      '--sidebar-menu-compact-width',
      'max(4rem, 5rem)'
    )
  })
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(80)
  const inlineBox = await inline.boundingBox()
  const centeredToggleBox = await toggle.boundingBox()
  expect(centeredToggleBox?.x).toBe(
    (inlineBox?.x ?? 0) + ((inlineBox?.width ?? 0) - 48) / 2
  )
  await inline.evaluate((element) => {
    element.style.setProperty(
      '--sidebar-menu-compact-width',
      'max(4rem, 4rem)'
    )
  })
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(64)
  await expect(toggleIsland).not.toHaveCSS(
    'background-color',
    'rgba(0, 0, 0, 0)'
  )
  await expect(toggleIsland).toHaveCSS('box-shadow', 'none')
  await expect(toggle).toHaveCSS('width', '48px')
  await expect(toggle).toHaveCSS('height', '48px')
  await expect(
    toggle.evaluate((element) => {
      const rect = element.getBoundingClientRect()
      return element.contains(
        document.elementFromPoint(
          rect.left + rect.width / 2,
          rect.top + rect.height / 2
        )
      )
    })
  ).resolves.toBe(true)
  await expect(toggle).not.toHaveAttribute('title')
  await expect(toggleIsland).toHaveCSS('width', '48px')
  await expect(toggleIsland).toHaveCSS('height', '48px')
  await expect(toggleIsland).toHaveCSS('transition-property', 'box-shadow')
  await expect(cardsBadge).toHaveCSS('display', 'none')
  await expect(productsNotification).toBeVisible()
  const closedHomeIconBox = await home
    .locator('.dnb-sidebar-menu__item__icon')
    .boundingBox()
  await page.locator('html').evaluate((element) => {
    element.setAttribute('dir', 'rtl')
  })
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .not.toBe('none')
  const rtlInlineBox = await inline.boundingBox()
  const rtlContentBox = await content.boundingBox()
  const rtlHomeIconBox = await home
    .locator('.dnb-sidebar-menu__item__icon')
    .boundingBox()
  expect(rtlContentBox?.x).toBe(
    (rtlInlineBox?.x ?? 0) +
      (rtlInlineBox?.width ?? 0) -
      (rtlContentBox?.width ?? 0)
  )
  expect(rtlHomeIconBox?.x ?? 0).toBeGreaterThanOrEqual(
    rtlInlineBox?.x ?? 0
  )
  expect(
    (rtlHomeIconBox?.x ?? 0) + (rtlHomeIconBox?.width ?? 0)
  ).toBeLessThanOrEqual(
    (rtlInlineBox?.x ?? 0) + (rtlInlineBox?.width ?? 0)
  )
  await page.locator('html').evaluate((element) => {
    element.removeAttribute('dir')
  })
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .not.toBe('none')
  const toggleIslandBox = await toggleIsland.boundingBox()
  await scrollView.evaluate((element) => {
    element.style.height = '8rem'
    element.style.maxHeight = '8rem'
    element.scrollTop = 200
  })
  await expect
    .poll(() => scrollView.evaluate((element) => element.scrollTop))
    .toBeGreaterThan(0)
  await expect(toggleIsland).not.toHaveCSS('box-shadow', 'none')
  expect((await toggleIsland.boundingBox())?.y).toBe(toggleIslandBox?.y)
  await scrollView.evaluate((element) => {
    element.scrollTop = 0
    element.style.height = ''
    element.style.maxHeight = ''
  })
  await expect(toggleIsland).toHaveCSS('box-shadow', 'none')

  const rowHeights = await actions.evaluateAll((elements) =>
    elements
      .map((element) => element.getBoundingClientRect().height)
      .filter((height) => height > 0)
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
  await expect(home).toHaveCSS('transition-property', 'none')
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px)')
  await expect(withoutIconText).toHaveCSS('mask-image', 'none')
  expect(await getSettingsDividerGap()).toBe(settingsDividerGap)

  await page.mouse.move(1100, 700)
  await expect(home).toHaveCSS(
    'transition-property',
    'width, margin-inline-start, padding-inline, border-radius'
  )
  expect(
    Number.parseFloat(
      await home.evaluate(
        (element) => getComputedStyle(element).transitionDuration
      )
    )
  ).toBeGreaterThan(0)
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(cardsBadge).toHaveCSS('display', 'flex')
  await expect(divider).toHaveCSS(
    'transition-property',
    'width, margin-inline'
  )
  await expect(divider).toHaveCSS(
    'animation-name',
    'dnb-sidebar-menu-show-nested-item'
  )
  const expandedAsideContent = shell.locator(
    '.dnb-sidebar-menu-responsive-aside__content'
  )
  await expect(expandedAsideContent).toHaveCSS(
    'padding-inline-start',
    '0px'
  )
  await expect(expandedAsideContent).toHaveCSS('padding-inline-end', '0px')
  const expandedHomeIconBox = await home
    .locator('.dnb-sidebar-menu__item__icon')
    .boundingBox()
  expect(expandedHomeIconBox?.x).toBe(closedHomeIconBox?.x)

  await shell
    .locator(
      '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger'
    )
    .click()
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px)')
  await shell
    .locator(
      '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger'
    )
    .click()
  await expect(savingsNotification).toBeVisible()

  await home.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await expect(divider).toHaveCSS(
    'transition-property',
    'width, margin-inline'
  )
  await expect(
    shell.locator(
      '[data-sidebar-menu-id="loans"] .dnb-sidebar-menu__item__text'
    )
  ).toHaveCSS('max-width', '0px')
  await expect
    .poll(() =>
      content.evaluate((element) => getComputedStyle(element).clipPath)
    )
    .toBe('inset(0px 240px 0px 0px)')
  const savingsNotificationBox = await savingsNotification.boundingBox()
  const compactInlineBox = await inline.boundingBox()
  expect(savingsNotificationBox?.x).toBeGreaterThanOrEqual(
    compactInlineBox?.x ?? 0
  )
  expect(
    (savingsNotificationBox?.x ?? 0) + (savingsNotificationBox?.width ?? 0)
  ).toBeLessThanOrEqual(
    (compactInlineBox?.x ?? 0) + (compactInlineBox?.width ?? 0)
  )
  const closedInlineBox = await inline.boundingBox()
  const productsIconBox = await productsIcon.boundingBox()
  const moreProductsIconBox = await moreProductsIcon.boundingBox()
  const railCenter =
    (closedInlineBox?.x ?? 0) + (closedInlineBox?.width ?? 0) / 2
  expect(
    (productsIconBox?.x ?? 0) + (productsIconBox?.width ?? 0) / 2
  ).toBe(railCenter)
  expect(
    (moreProductsIconBox?.x ?? 0) + (moreProductsIconBox?.width ?? 0) / 2
  ).toBe(railCenter)

  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
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
  expect(
    await toggleIsland.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).transitionDuration)
    )
  ).toBeLessThanOrEqual(0.001)
})

test('aligns nested button and link items in the Drawer', async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  await shell.locator('.dnb-sidebar-menu-responsive-trigger').click()

  const drawer = page.locator('.dnb-sidebar-menu-responsive-drawer')
  await expect(page.locator('[aria-label="Main navigation"]')).toHaveCount(
    1
  )
  const accounts = drawer.locator(
    '[data-sidebar-menu-id="accounts"] > .dnb-sidebar-menu__item__action'
  )
  const moreProducts = drawer.locator(
    '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  const moreProductsText = moreProducts.locator(
    '.dnb-sidebar-menu__item__text'
  )

  await expect(accounts).toHaveCSS('margin-inline-start', '48px')
  await expect(moreProducts).toHaveCSS('margin-inline-start', '48px')
  await expect(accounts).toHaveCSS('font-size', '18px')
  await expect(moreProducts).toHaveCSS('font-size', '18px')
  await expect(moreProductsText).toHaveCSS('white-space', 'normal')
  await expect
    .poll(() =>
      moreProductsText.evaluate(
        (element) => element.getBoundingClientRect().height
      )
    )
    .toBe(24)
  await expect
    .poll(async () => {
      const accountsBox = await accounts.boundingBox()
      const moreProductsBox = await moreProducts.boundingBox()
      return (moreProductsBox?.x ?? 0) - (accountsBox?.x ?? 0)
    })
    .toBe(0)
})

test('opens but never closes an accordion from the closed compact rail', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const inline = shell.locator('.dnb-sidebar-menu-responsive-inline')
  const toggle = inline.locator(
    '.dnb-sidebar-menu-responsive-inline__toggle'
  )
  const products = shell.locator(
    '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger'
  )

  await expect(products).toHaveAttribute('aria-expanded', 'false')
  await products.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(products).toHaveAttribute('aria-expanded', 'true')

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'false')
  await products.click()
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')
  await expect(products).toHaveAttribute('aria-expanded', 'true')
})

test('keeps scaled compact labels clear of accordion indicators', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto('/uilib/extensions/sidebar-menu/demos/')
  await waitForApp(page)
  await page.locator('html').evaluate((element) => {
    element.style.fontSize = '32px'
    element.setAttribute('data-eufemia-text-scale', 'apple')
  })

  const shell = page.locator('[data-sidebar-menu-responsive-example]')
  const toggle = shell.locator(
    '.dnb-sidebar-menu-responsive-inline__toggle'
  )
  await toggle.focus()
  await page.keyboard.press('Enter')
  await expect(toggle).toHaveAttribute('aria-expanded', 'true')

  const products = shell.locator(
    '[data-sidebar-menu-id="products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  const text = products.locator('.dnb-sidebar-menu__item__text')
  const indicator = products.locator(
    '.dnb-sidebar-menu__accordion__indicator'
  )

  await expect(text).toHaveCSS('white-space', 'normal')
  await expect
    .poll(async () => {
      const textBox = await text.boundingBox()
      const indicatorBox = await indicator.boundingBox()
      return (
        (indicatorBox?.x ?? 0) -
        ((textBox?.x ?? 0) + (textBox?.width ?? 0))
      )
    })
    .toBeGreaterThanOrEqual(0)
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
  const moreProducts = inline.locator(
    '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  const moreProductsText = moreProducts.locator(
    '.dnb-sidebar-menu__item__text'
  )
  const moreProductsIndicator = moreProducts.locator(
    '.dnb-sidebar-menu__accordion__indicator'
  )
  await shell.scrollIntoViewIfNeeded()

  await expect(handle).toHaveAttribute('aria-valuenow', '304')
  await expect(moreProducts).not.toHaveCSS('border-radius', '9999px')
  await expect(moreProducts).toHaveCSS('white-space', 'normal')
  await expect(moreProductsText).toHaveCSS('overflow-wrap', 'normal')
  await expect(moreProductsText).toHaveCSS('hyphens', 'auto')
  await expect(moreProducts).toHaveCSS('height', '64px')
  const moreProductsBox = await moreProducts.boundingBox()
  const moreProductsTextBox = await moreProductsText.boundingBox()
  const moreProductsIndicatorBox =
    await moreProductsIndicator.boundingBox()
  if (
    !moreProductsBox ||
    !moreProductsTextBox ||
    !moreProductsIndicatorBox
  ) {
    throw new Error('Expected full SidebarMenu geometry')
  }
  expect(moreProductsTextBox.x + moreProductsTextBox.width).toBeLessThan(
    moreProductsIndicatorBox.x
  )
  expect(moreProductsIndicatorBox.y).toBe(moreProductsTextBox.y)
  await handle.focus()
  await page.keyboard.press('ArrowRight')
  await expect(handle).toHaveAttribute('aria-valuenow', '320')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(320)

  await page.setViewportSize({ width: 500, height: 900 })
  await expect(inline).toHaveCount(0)

  await page.setViewportSize({ width: 1400, height: 900 })
  await expect(handle).toHaveAttribute('aria-valuenow', '320')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(320)

  await page.setViewportSize({ width: 1200, height: 900 })
  await expect(handle).toBeHidden()
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(64)

  await page.setViewportSize({ width: 1400, height: 900 })
  await expect(handle).toBeVisible()
  await expect(handle).toHaveAttribute('aria-valuenow', '320')
  await expect
    .poll(() =>
      inline.evaluate((element) => element.getBoundingClientRect().width)
    )
    .toBe(320)
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

  const handlePosition = await handle.evaluate((element) => {
    const rect = element.getBoundingClientRect()
    return { x: rect.left + 3, y: rect.top + rect.height / 2 }
  })

  await page.mouse.move(handlePosition.x, handlePosition.y)
  await page.mouse.down()
  await page.mouse.move(handlePosition.x - 108, handlePosition.y)

  await expect
    .poll(() =>
      scrollView.evaluate(
        (element) => element.scrollWidth > element.clientWidth
      )
    )
    .toBe(true)
  const moreProducts = shell.locator(
    '[data-sidebar-menu-id="more-products"] > .dnb-sidebar-menu__accordion__trigger'
  )
  await expect(moreProducts).toHaveCSS('white-space', 'normal')
  await expect(moreProducts).toHaveCSS('height', '64px')

  await page.mouse.move(handlePosition.x - 185, handlePosition.y)
  await page.mouse.up()

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
    .toBe(304)
  await expect(handle).toHaveAttribute('aria-valuenow', '304')
})
