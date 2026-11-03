import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('shows an associated overflow hint, retains keyboard scrolling and updates on resize', async ({
  page,
  browserName,
}) => {
  await page.goto('/uilib/extensions/ai/Response/demos/')
  await waitForApp(page)
  const demo = page.locator(
    '[data-visual-test="ai-response-overflow-table"]'
  )
  const scroll = demo.locator('.dnb-table__scroll-view')
  const hint = demo.locator('.dnb-ai-response__table-hint')
  await expect(hint).toHaveText('Rull vannrett for å se hele tabellen')
  await expect(scroll).toHaveAttribute(
    'aria-describedby',
    await hint.getAttribute('id')
  )
  await expect(scroll).toHaveAttribute('tabindex', '0')
  await scroll.focus()
  await page.keyboard.press(
    browserName === 'webkit' ? 'Alt+ArrowRight' : 'ArrowRight'
  )
  await expect
    .poll(() => scroll.evaluate((element) => element.scrollLeft))
    .toBeGreaterThan(0)
  await demo.locator('.dnb-ai-response').evaluate((element) => {
    ;(element.parentElement as HTMLElement).style.maxWidth = 'none'
  })
  await expect(hint).toHaveCount(0)
  await expect(scroll).not.toHaveAttribute('aria-describedby')
  await demo.locator('.dnb-ai-response').evaluate((element) => {
    ;(element.parentElement as HTMLElement).style.maxWidth = '12rem'
  })
  await expect(hint).toBeVisible()
  await expect(scroll).toHaveAttribute(
    'aria-describedby',
    await hint.getAttribute('id')
  )
})
