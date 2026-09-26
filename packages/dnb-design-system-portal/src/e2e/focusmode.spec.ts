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
    await expect(page.locator('#portal-sidebar-menu')).not.toBeVisible()
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
    await expect(page.locator('#portal-sidebar-menu')).toBeVisible()
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
      '[role="group"][aria-label="Customize appearance"] fieldset'
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

  for (const hash of ['', '#radio-group']) {
    test(
      'should restore scroll position immediately' +
        (hash ? ' with a hash' : ''),
      async ({ page }) => {
        if (hash) {
          await page.goto('/uilib/components/radio/demos/' + hash)
          await waitForApp(page)
        }

        const focusModeButton = page
          .locator('button[aria-label="Focus mode"]')
          .last()

        // Scroll down while keeping the button in view. Otherwise Playwright
        // scrolls back to the button while clicking and changes the position
        // this test is meant to restore.
        await focusModeButton.scrollIntoViewIfNeeded()

        const scrollBefore = await page.evaluate(() => window.scrollY)
        expect(scrollBefore).toBeGreaterThan(0)

        const scrollPositions: number[] = []
        await page.exposeFunction(
          'recordFocusModeScroll',
          (position: number) => {
            scrollPositions.push(position)
          }
        )
        await page.evaluate(() => {
          const scrollTo = window.scrollTo.bind(window)
          window.scrollTo = ((options: ScrollToOptions) => {
            scrollTo(options)
            const recordScroll = (
              window as Window & {
                recordFocusModeScroll?: (position: number) => Promise<void>
              }
            ).recordFocusModeScroll
            void recordScroll?.(window.scrollY)
          }) as typeof window.scrollTo
        })

        // Enter focusmode
        await focusModeButton.click()
        await expect(page).toHaveURL(/focusmode=/)

        // Should scroll to top in focusmode
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(0)

        // Exit focusmode
        await page.click('button[aria-label="Quit focus mode"]')
        await expect(page).not.toHaveURL(/focusmode=/)

        // Both entry scrolls and the restoration must take effect immediately.
        await expect
          .poll(() => scrollPositions)
          .toEqual([0, 0, scrollBefore])

        // Route focus must not scroll away again after restoration.
        await page.waitForTimeout(2000)
        await expect
          .poll(() => page.evaluate(() => window.scrollY))
          .toBe(scrollBefore)
      }
    )
  }

  test('should restore scroll position after page refresh in focusmode', async ({
    page,
  }) => {
    // Scroll down
    await page.evaluate(() => window.scrollTo({ top: 500 }))
    await page.waitForTimeout(200)

    // Enter focusmode
    const button = page
      .locator('button[aria-label="Focus mode"]:visible')
      .first()
    await button.click()
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

  test('should restore the previous page and position with Back and Forward', async ({
    page,
  }) => {
    await page.addInitScript(() => {
      const scrollTo = window.scrollTo.bind(window)
      const restoredPositions: number[] = []
      Object.assign(window, { restoredPositions })

      window.scrollTo = (
        options: ScrollToOptions | number,
        y?: number
      ) => {
        if (typeof options === 'number') {
          scrollTo(options, y ?? 0)
        } else {
          scrollTo(options)

          if (options.top > 0) {
            restoredPositions.push(window.scrollY)
          }
        }
      }
    })

    await page.goto(
      '/uilib/components/radio/demos/?q=term#with-different-sizes'
    )
    await waitForApp(page)

    const focusModeButton = page
      .locator('button[aria-label="Focus mode"]')
      .last()
    await focusModeButton.scrollIntoViewIfNeeded()

    const previousUrl = page.url()
    const scrollBefore = await page.evaluate(() => window.scrollY)
    expect(scrollBefore).toBeGreaterThan(0)

    await focusModeButton.click()
    await expect(page).toHaveURL(/focusmode=/)
    const focusUrl = page.url()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)

    for (let i = 0; i < 2; i++) {
      await page.goBack()

      await expect(page).toHaveURL(previousUrl)
      await expect(page.locator('nav#portal-sidebar-menu')).toBeVisible()
      await expect(
        page.locator('button[aria-label="Quit focus mode"]')
      ).toHaveCount(0)
      await expect
        .poll(async () =>
          Math.abs(
            (await page.evaluate(() => window.scrollY)) - scrollBefore
          )
        )
        .toBeLessThan(2)
      const restoredPosition = await page.evaluate(() => {
        const { restoredPositions } = window as unknown as {
          restoredPositions: number[]
        }
        return restoredPositions.at(-1)
      })
      expect(Math.abs(restoredPosition - scrollBefore)).toBeLessThan(2)

      await page.goForward()

      await expect(page).toHaveURL(focusUrl)
      await expect(
        page.locator('button[aria-label="Quit focus mode"]')
      ).toBeVisible()
      await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
    }
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
    await expect(page.locator('#portal-sidebar-menu')).not.toBeVisible()
  })
})
