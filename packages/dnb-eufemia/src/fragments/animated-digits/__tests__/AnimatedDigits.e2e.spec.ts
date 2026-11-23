import { test, expect } from '@playwright/test'
import { compileString } from 'sass'

let css: string

test.beforeAll(() => {
  css = compileString(`@use '../style/dnb-animated-digits.scss';`, {
    loadPaths: [__dirname],
  }).css
})

test('disables digit rolling and removal when reduced motion is enabled or changes', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.setContent(`
    <style>${css}</style>
    ${['up', 'down']
      .map(
        (direction) => `
          <span class="dnb-animated-digits dnb-animated-digits--${direction}">
            <span class="dnb-animated-digits__viewport">
              <span class="dnb-animated-digits__content">
                <span class="dnb-animated-digits__removed" style="--removed-width: 1ch" aria-hidden="true"><span data-previous="−"></span></span>
                <span class="dnb-animated-digits__character dnb-animated-digits__character--changed">
                  <span class="dnb-animated-digits__previous" data-previous="1" aria-hidden="true"></span>
                  <span class="dnb-animated-digits__value">2</span>
                </span>
              </span>
            </span>
          </span>`
      )
      .join('')}
  `)

  for (const reducedMotion of [
    'reduce',
    'no-preference',
    'reduce',
  ] as const) {
    await page.emulateMedia({ reducedMotion })

    for (const [direction, suffix] of [
      ['up', ''],
      ['down', '-down'],
    ]) {
      const digits = page.locator(`.dnb-animated-digits--${direction}`)
      const value = digits.locator('.dnb-animated-digits__value')
      const previous = digits.locator('.dnb-animated-digits__previous')
      const removed = digits.locator('.dnb-animated-digits__removed')
      const reduced = reducedMotion === 'reduce'

      await expect(value).toHaveText('2')
      await expect(value).toHaveCSS(
        'animation-name',
        reduced ? 'none' : `dnb-animated-digits-in${suffix}`
      )
      await expect(previous).toHaveCSS(
        'animation-name',
        reduced ? 'none' : `dnb-animated-digits-out${suffix}`
      )
      await expect(previous).toHaveCSS(
        'display',
        reduced ? 'none' : 'block'
      )
      await expect(removed).toHaveCSS(
        'animation-name',
        reduced ? 'none' : 'dnb-animated-digits-remove'
      )
      await expect(removed).toHaveCSS(
        'display',
        reduced ? 'none' : 'block'
      )
    }
  }
})
