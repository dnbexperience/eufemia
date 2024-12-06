import { test, expect } from '@playwright/test'

test.describe('Fonts', () => {
  test('verify fonts are served correctly', async ({ page }) => {
    const fonts = [
      // DNB
      'dnb/DNB-Regular.woff2',
      'dnb/DNB-Medium.woff2',
      'dnb/DNB-Bold.woff2',
      'dnb/DNBMono-Regular.woff2',
      'dnb/DNBMono-Medium.woff2',
      'dnb/DNBMono-Bold.woff2',
      'dnb/skeleton/DNB-Skeleton-Regular.woff2',
      'dnb/skeleton/DNB-Skeleton-Medium.woff2',
      'dnb/skeleton/DNB-Skeleton-Bold.woff2',

      // Sbanken
      'sbanken/MaisonNeue.woff2',
      'sbanken/Roboto-Regular.woff2',
      'sbanken/Roboto-Medium.woff2',
      'sbanken/Roboto-Bold.woff2',
    ]

    for await (const font of fonts) {
      const url = `/fonts/${font}`
      const response = await page.request.get(url)
      console.log('response', response)
      expect(response.status()).toBe(200)
      expect(response.headers()['content-type']).toContain('font') // Ensure it's a font file
    }
  })
})
