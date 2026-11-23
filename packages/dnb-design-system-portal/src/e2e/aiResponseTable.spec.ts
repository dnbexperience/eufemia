import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test('shows column indicators, retains keyboard scrolling and updates on resize', async ({
  page,
  browserName,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/web/patterns-and-extensions/chat/Response/demos/')
  await waitForApp(page)
  const demo = page.locator(
    '[data-visual-test="ai-response-overflow-table"]'
  )
  const scroll = demo.locator('.dnb-table__scroll-view')
  const lastColumn = demo.getByRole('button', {
    name: 'Vis kolonne Difference',
  })
  await expect(lastColumn).toBeVisible()
  await expect(lastColumn).toHaveAttribute('data-active', 'false')
  await lastColumn.click()
  await expect(lastColumn).toHaveAttribute('data-active', 'true')
  await scroll.evaluate((element) => {
    element.scrollLeft = 0
  })
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
  await expect(lastColumn).not.toBeVisible()
  await demo.locator('.dnb-ai-response').evaluate((element) => {
    ;(element.parentElement as HTMLElement).style.maxWidth = '12rem'
  })
  await expect(lastColumn).toBeVisible()
})
