import { expect, test } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.use({ browserName: 'webkit' })

test('WebKit drags the hanging card without selecting page text', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.setViewportSize({ width: 1600, height: 1000 })
  await page.goto('/')
  await waitForApp(page)
  await page.evaluate(() => document.fonts.ready)
  const card = page.locator('[data-hanging-item=carnegie]')
  const box = await card.locator('[data-home-specimen]').boundingBox()
  const x = box.x + box.width * 0.3
  const y = box.y + box.height * 0.5
  await page.mouse.move(x, y)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width + 120, y + 60, { steps: 20 })
  await expect(card).toHaveAttribute('data-dragging', 'true')
  expect(await page.evaluate(() => getSelection().toString())).toBe('')
  await page.mouse.up()
  expect(await page.evaluate(() => getSelection().toString())).toBe('')
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  const checkbox = page.getByRole('checkbox', {
    name: 'DNB Carnegie',
    exact: true,
  })
  await checkbox.check()
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__carnegie/)
  await checkbox.focus()
  await page.keyboard.press('Space')
  await expect(page.locator('body')).toHaveClass(/eufemia-theme__ui/)

  const heading = await page.locator('#welcome-heading').boundingBox()
  await page.mouse.move(heading.x + 5, heading.y + 25)
  await page.mouse.down()
  await page.mouse.move(heading.x + 140, heading.y + 25, { steps: 10 })
  await page.mouse.up()
  expect(await page.evaluate(() => getSelection().toString())).not.toBe('')
})
