import { test, expect } from '@playwright/test'

for (const variant of ['dialog', 'drawer']) {
  test(`restores tooltip delay and animation after closing a ${variant}`, async ({
    page,
  }) => {
    await page.goto(
      '/uilib/components/tooltip/visual-tests/modal-dismissal/'
    )
    await page.waitForFunction(() =>
      document.documentElement.hasAttribute('data-portal-ready')
    )

    const trigger = page.getByRole('button', { name: `Open ${variant}` })
    const tooltip = page.getByRole('tooltip')

    await trigger.hover()
    await expect(tooltip).toBeVisible()
    await trigger.click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await expect(tooltip).toHaveCount(0)

    await page.locator('.dnb-modal__close-button').click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
    await expect(trigger).toBeFocused()
    await page.getByRole('heading', { level: 1 }).click()
    await expect(tooltip).toHaveCount(0)

    await trigger.evaluate((element) => {
      element.addEventListener(
        'mouseenter',
        () => {
          const startedAt = performance.now()
          const observer = new MutationObserver(() => {
            if (document.querySelector('.dnb-tooltip--active')) {
              element.setAttribute(
                'data-tooltip-show-delay',
                String(performance.now() - startedAt)
              )
              observer.disconnect()
            }
          })
          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class'],
          })
        },
        { once: true }
      )
    })

    await trigger.hover()
    await expect(tooltip).toBeVisible()
    expect(
      Number(await trigger.getAttribute('data-tooltip-show-delay'))
    ).toBeGreaterThanOrEqual(250)
    await expect(tooltip).not.toHaveClass(/dnb-tooltip--no-animation/)
    await expect(tooltip).toHaveCSS('animation-name', 'show-popover')
    await expect(tooltip).toHaveCSS('animation-duration', '0.2s')
  })
}
