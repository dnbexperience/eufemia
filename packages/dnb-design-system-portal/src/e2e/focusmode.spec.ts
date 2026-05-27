import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Focus mode', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/uilib/components/radio/demos/')
    await waitForApp(page)
  })

  test('should enter focusmode when clicking the focus mode button', async ({
    page,
  }) => {
    const firstFocusModeButton = page.locator(
      'button[aria-label="Focus mode"]'
    )
    await expect(firstFocusModeButton.first()).toBeVisible()

    await firstFocusModeButton.first().click()

    // URL should contain focusmode param
    await expect(page).toHaveURL(/focusmode=/)

    // Sidebar and footer should be hidden
    await expect(page.locator('nav#portal-sidebar-menu')).not.toBeVisible()
    await expect(page.locator('footer')).not.toBeVisible()

    // The code block preview and toolbar should still be visible
    await expect(
      page.locator('button[aria-label="Quit focus mode"]')
    ).toBeVisible()
  })

  test('should exit focusmode when clicking quit button', async ({
    page,
  }) => {
    const firstFocusModeButton = page.locator(
      'button[aria-label="Focus mode"]'
    )
    await firstFocusModeButton.first().click()
    await expect(page).toHaveURL(/focusmode=/)

    // Click quit
    await page.click('button[aria-label="Quit focus mode"]')

    // URL should no longer have focusmode
    await expect(page).not.toHaveURL(/focusmode=/)

    // Sidebar should reappear
    await expect(page.locator('nav#portal-sidebar-menu')).toBeVisible()
  })

  test('should show brand switch in toolbar during focusmode', async ({
    page,
  }) => {
    const firstFocusModeButton = page.locator(
      'button[aria-label="Focus mode"]'
    )
    await firstFocusModeButton.first().click()
    await expect(page).toHaveURL(/focusmode=/)

    // Brand switch should be visible
    const brandSwitch = page.locator(
      'section[aria-label="Customize appearance"] fieldset'
    )
    await expect(brandSwitch).toBeVisible()
  })

  test('should toggle preview padding in focusmode', async ({ page }) => {
    const firstFocusModeButton = page.locator(
      'button[aria-label="Focus mode"]'
    )
    await firstFocusModeButton.first().click()
    await expect(page).toHaveURL(/focusmode=/)

    const previewBox = page.locator('.example-box').first()
    await expect(previewBox).toBeVisible()
    await expect
      .poll(() =>
        previewBox.evaluate(
          (element) => getComputedStyle(element).paddingTop
        )
      )
      .toBe('32px')

    const hidePaddingButton = page.locator(
      'button[aria-label="Hide preview padding"]'
    )
    await expect(hidePaddingButton).toHaveAttribute('aria-pressed', 'true')
    await hidePaddingButton.click()

    await expect(
      page.locator('button[aria-label="Show preview padding"]')
    ).toHaveAttribute('aria-pressed', 'false')
    await expect
      .poll(() =>
        previewBox.evaluate(
          (element) => getComputedStyle(element).paddingTop
        )
      )
      .toBe('0px')

    const showPaddingButton = page.locator(
      'button[aria-label="Show preview padding"]'
    )
    await showPaddingButton.click()

    await expect(
      page.locator('button[aria-label="Hide preview padding"]')
    ).toHaveAttribute('aria-pressed', 'true')
    await expect
      .poll(() =>
        previewBox.evaluate(
          (element) => getComputedStyle(element).paddingTop
        )
      )
      .toBe('32px')
  })

  test('should restore scroll position after exiting focusmode', async ({
    page,
  }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo({ top: 500 }))
    await page.waitForTimeout(200)

    const scrollBefore = await page.evaluate(() => window.scrollY)
    expect(scrollBefore).toBeGreaterThan(0)

    // Enter focusmode
    const buttons = page.locator('button[aria-label="Focus mode"]')
    await buttons.first().click()
    await expect(page).toHaveURL(/focusmode=/)

    // Should scroll to top in focusmode
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

    // Exit focusmode
    await page.click('button[aria-label="Quit focus mode"]')
    await expect(page).not.toHaveURL(/focusmode=/)

    // Scroll should be restored
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)
  })

  test('should restore scroll position after page refresh in focusmode', async ({
    page,
  }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo({ top: 500 }))
    await page.waitForTimeout(200)

    // Enter focusmode
    const buttons = page.locator('button[aria-label="Focus mode"]')
    await buttons.first().click()
    await expect(page).toHaveURL(/focusmode=/)

    // Refresh the page
    await page.reload()
    await waitForApp(page)

    // Should still be in focusmode
    await expect(page).toHaveURL(/focusmode=/)
    await expect(
      page.locator('button[aria-label="Quit focus mode"]')
    ).toBeVisible()

    // Exit focusmode
    await page.click('button[aria-label="Quit focus mode"]')
    await expect(page).not.toHaveURL(/focusmode=/)

    // Scroll should be restored from sessionStorage
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0)
  })

  test('should enter focusmode when visiting a focusmode URL directly', async ({
    page,
  }) => {
    await page.goto(
      '/uilib/components/radio/demos/?focusmode=RadioExampleSizes'
    )
    await waitForApp(page)

    // Should be in focusmode
    await expect(
      page.locator('button[aria-label="Quit focus mode"]')
    ).toBeVisible()

    // Sidebar should be hidden
    await expect(page.locator('nav#portal-sidebar-menu')).not.toBeVisible()
  })
})
