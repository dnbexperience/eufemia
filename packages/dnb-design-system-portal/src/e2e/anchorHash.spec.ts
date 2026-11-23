import { test, expect } from '@playwright/test'
import waitForApp from './shared/waitForApp'

test.describe('Heading anchor hash', () => {
  test.use({ viewport: { width: 1440, height: 900 } })

  test('stays visible when moving the cursor from a shrunk heading to the hash', async ({
    page,
  }) => {
    await page.goto('/collections/icons/')
    await waitForApp(page)

    const heading = page.locator('h3:has(.anchor-hash)').first()
    const hash = heading.locator('.anchor-hash')
    await heading.scrollIntoViewIfNeeded()

    const headingBox = await heading.boundingBox()
    const hashBox = await hash.boundingBox()
    const y = hashBox.y + hashBox.height / 2

    // The icon card centers the heading, so its box ends where the text ends
    expect(hashBox.x).toBeGreaterThan(headingBox.x + headingBox.width)

    await page.mouse.move(headingBox.x + 1, y)
    await expect(hash).toHaveCSS('opacity', '1')

    for (
      let x = headingBox.x + headingBox.width - 1;
      x <= hashBox.x + hashBox.width / 2;
      x++
    ) {
      await page.mouse.move(x, y)
    }

    await expect(hash).toHaveCSS('opacity', '1')
    expect(
      await hash.evaluate((element) => element.matches(':hover'))
    ).toBe(true)
  })
})
