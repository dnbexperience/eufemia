import path from 'node:path'
import * as sass from 'sass'
import { expect, test } from '@playwright/test'

const sourceRoot = path.resolve(__dirname, '../..')
const compile = (file: string) =>
  sass.compile(path.join(sourceRoot, file)).css

for (const brand of ['ui', 'sbanken', 'eiendom']) {
  test(
    'keeps error counters readable on dark neutral surfaces for ' + brand,
    async ({ page }) => {
      const css = [
        compile('style/themes/' + brand + '/foundation.scss'),
        compile('style/themes/' + brand + '/tokens.scss'),
        compile('style/themes/' + brand + '/tokens-dark.scss'),
        compile('fragments/text-counter/style/dnb-text-counter.scss'),
      ].join('\n')
      await page.setContent(
        '<style>' +
          css +
          '</style><div class="eufemia-theme__color-scheme--dark"><section style="background:var(--token-color-background-neutral-subtle)"><p class="dnb-p dnb-text-counter dnb-text-counter--exceeded">5 characters too many</p></section></div>'
      )
      const ratio = await page
        .locator('.dnb-text-counter')
        .evaluate((element) => {
          const color = (value: string) =>
            value
              .match(/[\d.]+/g)
              .slice(0, 3)
              .map(Number)
          const luminance = (rgb: number[]) =>
            rgb.reduce((sum, channel, index) => {
              const value = channel / 255
              return (
                sum +
                (value <= 0.04045
                  ? value / 12.92
                  : ((value + 0.055) / 1.055) ** 2.4) *
                  [0.2126, 0.7152, 0.0722][index]
              )
            }, 0)
          const text = luminance(color(getComputedStyle(element).color))
          const background = luminance(
            color(getComputedStyle(element.parentElement).backgroundColor)
          )
          return (
            (Math.max(text, background) + 0.05) /
            (Math.min(text, background) + 0.05)
          )
        })
      expect(ratio).toBeGreaterThanOrEqual(4.5)
    }
  )
}
