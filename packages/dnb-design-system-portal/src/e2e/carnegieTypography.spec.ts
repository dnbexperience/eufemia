import { expect, test } from '@playwright/test'

test('uses the Carnegie xx-large heading size without changing other typography', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1200, height: 900 })
  await page.goto(
    '/uilib/typography/?eufemia-theme=carnegie&data-visual-test=true'
  )

  const variants = page.locator('[data-visual-test="typography-variants"]')
  const heading = variants.locator('.dnb-h--xx-large')
  const smallerHeading = variants.locator('.dnb-h--x-large')

  await expect(heading).toHaveCSS('font-size', '56px')
  await expect(heading).toHaveCSS('line-height', '68px')
  await expect(smallerHeading).toHaveCSS('font-size', '34px')
  await expect(smallerHeading).toHaveCSS('line-height', '40px')

  const responsive = page.locator(
    '[data-visual-test="typography-responsive"]'
  )
  const responsiveHeading = responsive.locator('.dnb-h--xx-large').first()
  const responsiveText = responsive
    .locator('.dnb-t__size--xx-large')
    .first()

  await expect(responsiveHeading).toHaveCSS('font-size', '56px')
  await expect(responsiveHeading).toHaveCSS('line-height', '68px')
  await expect(responsiveText).toHaveCSS('font-size', '48px')

  await page.setViewportSize({ width: 400, height: 900 })
  await expect(responsiveHeading).toHaveCSS('font-size', '34px')
  await expect(responsiveHeading).toHaveCSS('line-height', '32px')

  await page.goto(
    '/uilib/typography/?eufemia-theme=ui&data-visual-test=true'
  )
  await expect(
    page.locator(
      '[data-visual-test="typography-variants"] .dnb-h--xx-large'
    )
  ).toHaveCSS('font-size', '48px')
})
