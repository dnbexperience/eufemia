import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('shows the scroll button, retains keyboard scrolling and updates on resize', async ({
  page,
  browserName,
}) => {
  await page.goto('/web/patterns-and-extensions/chat/Response/demos/')
  await waitForApp(page)
  const demo = page.locator(
    '[data-visual-test="ai-response-overflow-table"]'
  )
  const scroll = demo.locator('.dnb-table__scroll-view')
  const button = demo.getByRole('button', { name: 'Se flere kolonner' })
  await expect(button).toBeVisible()
  await expect(demo.locator('.dnb-ai-response__table-hint')).toHaveCount(0)
  await expect(scroll).not.toHaveAttribute('aria-describedby')
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
  await expect(button).not.toBeVisible()
  await demo.locator('.dnb-ai-response').evaluate((element) => {
    ;(element.parentElement as HTMLElement).style.maxWidth = '12rem'
  })
  await expect(button).toBeVisible()
})
