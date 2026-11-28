import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { expect, test } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'
import properties from '../themes/ui/properties'

test('keeps chart color references readable across portal themes and viewport sizes', async ({
  page,
}) => {
  await page.addInitScript(() => {
    localStorage.setItem(
      'eufemia-theme',
      JSON.stringify({ brand: 'ui', colorScheme: 'auto' })
    )
  })
  await page.goto(
    '/web/patterns-and-extensions/getting-started-with-charts/'
  )
  await expect(page.locator('html')).toHaveAttribute(
    'data-portal-ready',
    'true'
  )
  await page.evaluate(() => document.fonts.ready)

  for (const colorScheme of ['light', 'dark'] as const) {
    await test.step(colorScheme, async () => {
      await page.emulateMedia({ colorScheme })
      await expect(page.locator('body')).toHaveClass(
        new RegExp('eufemia-theme__color-scheme--' + colorScheme)
      )
      for (const reference of [
        page.locator('[title="--chart-color-gray-950"]'),
        page.getByRole('table', { name: 'DNB chart color roles' }),
      ]) {
        await expect(reference).toBeVisible()
        await expect
          .poll(() =>
            reference.evaluate((element) => {
              for (
                let parent = element;
                parent;
                parent = parent.parentElement
              ) {
                const background = getComputedStyle(parent).backgroundColor
                if (background !== 'rgba(0, 0, 0, 0)') {
                  return background
                }
              }
              return null
            })
          )
          .toBe('rgb(255, 255, 255)')
      }
    })
  }

  await test.step('swatches in forced colors', async () => {
    await page.emulateMedia({ forcedColors: 'active' })
    await expect(
      page.locator('[title="--chart-color-gray-950"] > span').first()
    ).toHaveCSS('background-color', 'rgb(28, 28, 30)')
    await expect(
      page
        .getByRole('table', { name: 'DNB chart color roles' })
        .locator('tbody [aria-hidden="true"]')
        .first()
    ).toHaveCSS('background-color', 'rgb(0, 52, 62)')
  })

  for (const width of [1440, 1400, 1366, 860, 768, 375]) {
    await test.step(`palette at ${width}px`, async () => {
      await page.setViewportSize({ width, height: 900 })
      const palettes = page.locator('ul:has([title^="--chart-color-"])')
      await expect(palettes).toHaveCount(8)
      await expect
        .poll(() =>
          palettes.evaluateAll((elements) =>
            elements.every((element) => {
              const { left, right } = element.getBoundingClientRect()
              return (
                element.scrollWidth <= element.clientWidth &&
                left >= 0 &&
                right <= window.innerWidth &&
                Array.from(
                  element.querySelectorAll('li > span:last-child')
                ).every((label) => {
                  const range = document.createRange()
                  range.selectNodeContents(label)
                  return range.getClientRects().length === 1
                })
              )
            })
          )
        )
        .toBe(true)
    })
  }
})

test('exposes fixed DNB chart colors through theme, standalone and isolated styles', async ({
  page,
}) => {
  const themeRoot = path.resolve(__dirname, '../themes/ui')
  const css = [
    sass.compile(path.join(themeRoot, 'ui-theme-basis.scss')).css,
    sass.compile(path.join(themeRoot, 'ui-theme-dark-mode.scss')).css,
  ].join('\n')
  const swatches = Object.entries(properties)
    .filter(([name]) => name.startsWith('--chart-color-'))
    .map(([name, value]) => {
      const hex = value.replace(
        /^#([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
      )
      return {
        name,
        rgb:
          'rgb(' +
          [1, 3, 5]
            .map((offset) => parseInt(hex.slice(offset, offset + 2), 16))
            .join(', ') +
          ')',
      }
    })

  const markup = `
    <div class="chart-scope"><div class="eufemia-theme eufemia-theme__color-scheme--light">
      <svg>
        ${swatches
          .map(
            ({ name }) =>
              `<rect data-swatch="${name}" fill="var(${name})" stroke="var(${name})" />`
          )
          .join('')}
      </svg>
    </div></div>
  `
  const standaloneCss = sass.compile(
    path.resolve(__dirname, '../dnb-ui-charts.scss')
  ).css
  const isolatedCss = (
    await postcss([isolateStyles({ scopeHash: 'chart-scope' })]).process(
      standaloneCss,
      { from: undefined }
    )
  ).css

  for (const [name, stylesheet, rootValue] of [
    ['theme', css, '#00343e'],
    ['standalone', standaloneCss, '#00343e'],
    ['isolated', isolatedCss, ''],
  ]) {
    await page.setContent('<style>' + stylesheet + '</style>' + markup)
    expect(
      await page
        .locator('body')
        .evaluate((element) =>
          getComputedStyle(element)
            .getPropertyValue('--chart-color-primary-solid')
            .trim()
        )
    ).toBe(rootValue)

    for (const scheme of ['light', 'dark']) {
      await test.step(name + ' ' + scheme, async () => {
        await page
          .locator('.eufemia-theme')
          .evaluate((element, scheme) => {
            element.setAttribute(
              'class',
              'eufemia-theme eufemia-theme__color-scheme--' + scheme
            )
          }, scheme)

        const resolvedSwatches = await page
          .locator('[data-swatch]')
          .evaluateAll((elements) =>
            elements.map((element) => ({
              name: element.getAttribute('data-swatch'),
              rgb: getComputedStyle(element).fill,
              stroke: getComputedStyle(element).stroke,
            }))
          )
        expect(resolvedSwatches).toEqual(
          swatches.map((swatch) => ({ ...swatch, stroke: swatch.rgb }))
        )
      })
    }
  }
})
