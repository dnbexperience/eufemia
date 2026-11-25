import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { expect, test } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'

test('exposes fixed DNB chart colors through theme, standalone and isolated styles', async ({
  page,
}) => {
  const themeRoot = path.resolve(__dirname, '../themes/ui')
  const css = [
    sass.compile(path.join(themeRoot, 'ui-theme-basis.scss')).css,
    sass.compile(path.join(themeRoot, 'ui-theme-dark-mode.scss')).css,
  ].join('\n')
  const colors = [
    {
      role: 'primary',
      solid: 'rgb(0, 52, 62)',
      fill: 'rgb(235, 239, 240)',
    },
    {
      role: 'secondary',
      solid: 'rgb(20, 85, 90)',
      fill: 'rgb(236, 241, 242)',
    },
    {
      role: 'tertiary',
      solid: 'rgb(0, 123, 94)',
      fill: 'rgb(235, 244, 242)',
    },
    {
      role: 'negative',
      solid: 'rgb(220, 42, 42)',
      fill: 'rgb(252, 238, 238)',
    },
  ]

  const steps = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
  const palette = {
    gray: 'f8f8f8 ebebeb cccccc b1b1b5 8e8e93 737373 636366 48484a 333333 2c2c2e 1c1c1e',
    red: 'fceeee fcdddd facdcd fbacac f68888 ed4c4c d52525 b21e1e 7a1313 541515 401a1a',
    green:
      'ebf4f2 dcf3e8 c9f0dd b9e7ce 88dab3 47d197 28b482 007b5e 005843 0d4637 1c342d',
    orange:
      'fff2f2 ffeae0 ffddcc ffbb99 ff9866 ff7633 ff5400 cc4300 993200 662505 4d1e08',
    blue: 'f2f2f5 e1e9f9 cddbf4 a9c0ef 7da4e8 4784e1 276ace 1955a9 153f7f 16315a 152640',
    teal: 'f4fbf9 d8f3ec bce8dc a5e1d2 5cbdad 4a948d 007272 14555a 08454d 023939 00343e',
    yellow:
      'fbf6ec fdf4e0 ffedc8 fce1a9 fad280 fdbb31 d99710 b37b07 805b0e 5f450f 3d2e0f',
    purple:
      'f2f2f5 e4e4f1 d6d6eb b8b8e0 9b9bd4 7d7dd4 6666cc 3c3caa 2c2c7d 23195a 1d1740',
  }
  const swatches = Object.entries(palette).flatMap(([family, hexValues]) =>
    hexValues.split(' ').map((hex, index) => ({
      name: family + '-' + steps[index],
      rgb:
        'rgb(' +
        [0, 2, 4]
          .map((offset) => parseInt(hex.slice(offset, offset + 2), 16))
          .join(', ') +
        ')',
    }))
  )

  const markup = `
    <div class="chart-scope"><div class="eufemia-theme eufemia-theme__color-scheme--light">
      <svg>
        ${swatches.map(({ name }) => '<rect data-swatch="' + name + '" fill="var(--chart-color-' + name + ')" />').join('')}
        ${colors
          .map(
            ({ role }) => `
              <rect id="${role}-solid" fill="var(--chart-color-${role}-solid)" />
              <rect id="${role}-outline" fill="var(--chart-color-${role}-outline-fill)" stroke="var(--chart-color-${role}-outline-stroke)" />
            `
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
            element.className =
              'eufemia-theme eufemia-theme__color-scheme--' + scheme
          }, scheme)

        const resolvedSwatches = await page
          .locator('[data-swatch]')
          .evaluateAll((elements) =>
            elements.map((element) => ({
              name: element.getAttribute('data-swatch'),
              rgb: getComputedStyle(element).fill,
            }))
          )
        expect(resolvedSwatches).toEqual(swatches)

        for (const { role, solid, fill } of colors) {
          await expect(page.locator(`#${role}-solid`)).toHaveCSS(
            'fill',
            solid
          )
          await expect(page.locator(`#${role}-outline`)).toHaveCSS(
            'fill',
            fill
          )
          await expect(page.locator(`#${role}-outline`)).toHaveCSS(
            'stroke',
            solid
          )
        }
      })
    }
  }
})
