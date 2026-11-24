import { expect, test } from '@playwright/test'

test.describe('List on touch devices', () => {
  test.use({ hasTouch: true })

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/web/components/list/demos/?data-visual-test')
    await expect(
      page.locator(
        '[data-visual-test="list-action"] .dnb-list__item__action'
      )
    ).not.toHaveCount(0)
  })

  const readOutline = (item) =>
    item.evaluate((element) => {
      const outline = getComputedStyle(element, '::after')

      return {
        color: outline.borderLeftColor,
        width: outline.borderLeftWidth,
      }
    })

  test('does not keep the hover outline on an action item after a tap', async ({
    page,
  }) => {
    for (const example of ['list-action', 'list-card']) {
      await test.step(example, async () => {
        const item = page
          .locator(
            `[data-visual-test="${example}"] .dnb-list__item__action`
          )
          .first()
        const rest = await readOutline(item)

        await item.tap()

        expect(
          await item.evaluate((element) => element.matches(':hover'))
        ).toBe(true)
        await expect.poll(() => readOutline(item)).toEqual(rest)
      })
    }
  })

  test('does not keep the hover outline on an accordion item after a tap', async ({
    page,
  }) => {
    const item = page
      .locator(
        '[data-visual-test="list-accordion"] .dnb-list__item__accordion'
      )
      .first()
    const header = item.locator('.dnb-list__item__accordion__header')
    const rest = await readOutline(item)

    await header.tap()
    await expect(header).toHaveAttribute('aria-expanded', 'true')
    await header.tap()
    await expect(header).toHaveAttribute('aria-expanded', 'false')

    expect(
      await header.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => readOutline(item)).toEqual(rest)
  })

  test('shows the keyboard focus outline on a tapped action item', async ({
    page,
  }) => {
    const items = page.locator(
      '[data-visual-test="list-action"] .dnb-list__item__action'
    )
    const tapped = items.nth(0)
    const next = items.nth(1)

    await tapped.tap()

    // The next item gets focus from the keyboard only, so it shows the
    // focus outline that the tapped item should show too
    await page.keyboard.press('Tab')
    await expect(
      next.locator(':scope > .dnb-list__item__action__button, :scope > a')
    ).toBeFocused()
    const focusOutline = await readOutline(next)

    await page.keyboard.press('Shift+Tab')
    await expect(
      tapped.locator(
        ':scope > .dnb-list__item__action__button, :scope > a'
      )
    ).toBeFocused()

    // The tapped item keeps :hover on touch devices
    expect(
      await tapped.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => readOutline(tapped)).toEqual(focusOutline)
  })

  test('shows the keyboard focus outline on a tapped accordion header', async ({
    page,
  }) => {
    const items = page.locator(
      '[data-visual-test="list-accordion"] .dnb-list__item__accordion'
    )
    const tapped = items.nth(0)
    const next = items.nth(1)
    const header = tapped.locator('.dnb-list__item__accordion__header')

    await header.tap()
    await header.tap()
    await expect(header).toHaveAttribute('aria-expanded', 'false')

    await page.keyboard.press('Tab')
    await expect(
      next.locator('.dnb-list__item__accordion__header')
    ).toBeFocused()
    const focusOutline = await readOutline(next)

    await page.keyboard.press('Shift+Tab')
    await expect(header).toBeFocused()

    expect(
      await header.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
    await expect.poll(() => readOutline(tapped)).toEqual(focusOutline)
  })
})
