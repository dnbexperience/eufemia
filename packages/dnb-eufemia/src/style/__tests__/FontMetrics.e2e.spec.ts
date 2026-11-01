import fs from 'node:fs/promises'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { PNG } from 'pngjs'
import { expect, test, type Locator } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'

const packageRoot = path.resolve(__dirname, '../../..')
const compile = (file: string) =>
  sass.compile(path.join(packageRoot, 'src', file)).css

async function buttonInkCenter(button: Locator) {
  const bounds = await button.evaluate((element) => {
    const button = element.getBoundingClientRect()
    const text = element
      .querySelector('.dnb-button__text')
      .getBoundingClientRect()
    return {
      width: button.width,
      height: button.height,
      left: text.left - button.left,
      right: text.right - button.left,
    }
  })
  const image = PNG.sync.read(await button.screenshot())
  const horizontalRatio = image.width / bounds.width
  const verticalRatio = image.height / bounds.height
  const rows: number[] = []
  for (let y = 0; y < image.height; y++) {
    for (
      let x = Math.ceil(bounds.left * horizontalRatio);
      x < Math.floor(bounds.right * horizontalRatio);
      x++
    ) {
      const index = (y * image.width + x) * 4
      if (
        image.data[index] > 220 &&
        image.data[index + 1] > 230 &&
        image.data[index + 2] > 230
      ) {
        rows.push(y)
        break
      }
    }
  }
  expect(rows.length).toBeGreaterThan(0)
  return {
    width: bounds.width,
    height: bounds.height,
    offset:
      ((rows[0] + rows[rows.length - 1] + 1) / 2 - image.height / 2) /
      verticalRatio,
  }
}

test('preserves legacy DNB button alignment across sizes, root scaling and native text size', async ({
  page,
}) => {
  await page.route('https://font-metrics.test/**', async (route) => {
    const name = new URL(route.request().url()).pathname.split('/').pop()
    await route.fulfill({
      contentType: 'font/woff2',
      body: await fs.readFile(
        path.join(
          packageRoot,
          'assets/fonts/dnb',
          /^DNBSans(Text|Mono)-/.test(name) ? 'web' : '',
          name
        )
      ),
    })
  })
  const css = [
    compile('style/dnb-ui-core.scss'),
    compile('style/themes/ui/ui-theme-basis.scss'),
    compile('components/button/style/dnb-button.scss'),
  ]
    .join('\n')
    .replace(
      /url\(["']?[^)"']*\/([^/"')]+\.woff2)["']?\)/g,
      'url("https://font-metrics.test/$1")'
    )
  const isolated = (
    await postcss([isolateStyles({ scopeHash: 'metric-scope' })]).process(
      css,
      { from: undefined }
    )
  ).css
  await page.setContent(
    '<style>' +
      isolated +
      '@font-face{font-family:LegacyDNB;src:url("https://font-metrics.test/DNB-Regular.woff2")}' +
      '</style><div class="metric-scope"><div class="dnb-core-style"><button class="dnb-button dnb-button--primary dnb-button--has-text" style="background:#007272;color:#fff;box-shadow:none"><span aria-hidden="true" class="dnb-alignment-helper--pseudo-element-only dnb-button__alignment"></span><span class="dnb-button__text">Continue</span></button></div></div>'
  )
  for (const rootScale of [1, 1.25, 2]) {
    await page.evaluate((rootScale) => {
      document.documentElement.style.fontSize = 16 * rootScale + 'px'
    }, rootScale)
    for (const basis of [18, 17]) {
      await page.locator('.dnb-core-style').evaluate((element, basis) => {
        ;(element as HTMLElement).style.setProperty(
          '--font-size-basis',
          basis / 16 + 'rem'
        )
      }, basis)
      for (const [size, height] of [
        ['small', 24],
        ['medium', 32],
        ['default', 40],
        ['large', 48],
      ] as const) {
        const button = page.locator('button')
        await button.evaluate((element, size) => {
          element.setAttribute(
            'class',
            'dnb-button dnb-button--primary dnb-button--has-text dnb-button--size-' +
              size
          )
        }, size)
        await page.evaluate(() => document.fonts.ready)
        // Allow subpixel rounding of line-box heights in WebKit.
        await expect
          .poll(() =>
            button.evaluate(
              (element) => element.getBoundingClientRect().height
            )
          )
          .toBeCloseTo(height * rootScale, 1)
        await expect(button.locator('.dnb-button__text')).toHaveCSS(
          'font-weight',
          '400'
        )
        const actual = await buttonInkCenter(button)
        await button.evaluate((element) => {
          ;(element as HTMLElement).style.fontFamily = 'LegacyDNB'
        })
        await page.evaluate(() => document.fonts.ready)
        const legacy = await buttonInkCenter(button)
        await button.evaluate((element) => {
          ;(element as HTMLElement).style.removeProperty('font-family')
        })
        expect(actual.height).toBeCloseTo(legacy.height, 2)
        expect(actual.width).toBeCloseTo(legacy.width, 2)
        // Native rasterization also places legacy ink 1.5px off-center.
        expect(
          Math.abs(actual.offset - legacy.offset)
        ).toBeLessThanOrEqual(0.02)
        expect(
          Math.abs(actual.offset),
          size + ' at ' + basis + 'px and rootScale ' + rootScale
        ).toBeLessThanOrEqual(
          Math.max(1.25, Math.abs(legacy.offset)) + 0.02
        )
        for (const label of ['Åpne konto', 'Gjennomfør', 'ÆØÅ gjpq']) {
          await button
            .locator('.dnb-button__text')
            .evaluate((element, label) => {
              element.textContent = label
            }, label)
          const fits = await button.evaluate((element) => {
            const rect = element.getBoundingClientRect()
            const range = document.createRange()
            range.selectNodeContents(
              element.querySelector('.dnb-button__text')
            )
            const text = range.getBoundingClientRect()
            return (
              text.top >= rect.top - 1 && text.bottom <= rect.bottom + 1
            )
          })
          expect(
            fits,
            'Accents and descenders fit ' + label + ' at ' + size
          ).toBe(true)
        }
        await button.locator('.dnb-button__text').evaluate((element) => {
          element.textContent = 'Continue'
        })
      }
    }
  }
})

test('keeps Text baselines consistent across weights, italics, and skeleton placeholders', async ({
  page,
}) => {
  await page.route('https://font-metrics.test/**', async (route) => {
    const name = new URL(route.request().url()).pathname.split('/').pop()
    await route.fulfill({
      contentType: 'font/woff2',
      body: await fs.readFile(
        path.join(
          packageRoot,
          'assets/fonts/dnb',
          name.includes('Skeleton')
            ? 'skeleton'
            : /^DNBSans(Text|Mono)-/.test(name)
              ? 'web'
              : '',
          name
        )
      ),
    })
  })
  const css = [
    compile('style/themes/ui/fonts.scss'),
    compile('components/skeleton/style/dnb-skeleton.scss'),
  ]
    .join('\n')
    .replace(
      /url\(["']?[^)"']*\/([^/"')]+\.woff2)["']?\)/g,
      'url("https://font-metrics.test/$1")'
    )
  await page.setContent(
    '<style>' +
      css +
      '@font-face{font-family:LegacyDNB;src:url("https://font-metrics.test/DNB-Regular.woff2")}</style><p id="sample" style="font:18px/24px LegacyDNB;margin:0"><span>ÆØÅ Hgjx</span><i style="display:inline-block;width:0;height:0;vertical-align:baseline"></i></p>'
  )
  const sample = page.locator('#sample')
  await page.evaluate(() => document.fonts.ready)
  const metrics = () =>
    sample.evaluate((element) => {
      const style = getComputedStyle(element)
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      if (!context) {
        throw new Error('Canvas text metrics are unavailable')
      }
      context.font =
        style.fontStyle +
        ' ' +
        style.fontWeight +
        ' ' +
        style.fontSize +
        ' ' +
        style.fontFamily
      const ink = context.measureText(
        element.querySelector('span').textContent
      )
      const baseline =
        element.querySelector('i').getBoundingClientRect().top -
        element.getBoundingClientRect().top
      const bounds = element.querySelector('span').getBoundingClientRect()
      return {
        height: bounds.height,
        width: bounds.width,
        baseline,
        lineBoxHeight: element.getBoundingClientRect().height,
        lineHeight: parseFloat(style.lineHeight),
        inkTop: baseline - ink.actualBoundingBoxAscent,
        inkBottom: baseline + ink.actualBoundingBoxDescent,
      }
    })
  const legacy = await metrics()
  let normalized: typeof legacy
  for (const family of ['DNB', 'DNBMono']) {
    for (const weight of [300, 400, 500, 600, 700]) {
      for (const slant of ['normal', 'italic']) {
        await sample.evaluate(
          (element, { family, weight, slant }) => {
            ;(element as HTMLElement).style.fontFamily = family
            ;(element as HTMLElement).style.fontWeight = String(weight)
            ;(element as HTMLElement).style.fontStyle = slant
          },
          { family, weight, slant }
        )
        await page.evaluate(() => document.fonts.ready)
        const actual = await metrics()
        normalized ??= actual
        // Firefox/Linux rounds typo and legacy inline font boxes differently.
        // Preserve the actual line box and baseline, not that rounding policy.
        expect(
          Math.abs(actual.lineBoxHeight - legacy.lineBoxHeight)
        ).toBeLessThanOrEqual(0.02)
        expect(
          Math.abs(actual.lineHeight - legacy.lineHeight)
        ).toBeLessThanOrEqual(0.02)
        expect(
          Math.abs(actual.baseline - legacy.baseline)
        ).toBeLessThanOrEqual(0.02)
        expect(
          Math.abs(actual.height - normalized.height)
        ).toBeLessThanOrEqual(0.02)
        expect(actual.inkTop).toBeGreaterThanOrEqual(-0.02)
        expect(actual.inkBottom).toBeLessThanOrEqual(
          actual.lineBoxHeight + 0.02
        )
        expect(
          actual.baseline,
          family + ' ' + slant + ' ' + weight
        ).toBeCloseTo(normalized.baseline, 1)
      }
    }
  }
  for (const family of ['DNBSkeleton', 'DNBMonoSkeleton']) {
    for (const weight of [300, 400, 500, 600, 700]) {
      await sample.evaluate(
        (element, { family, weight }) => {
          ;(element as HTMLElement).style.fontFamily =
            family === 'DNBSkeleton' ? 'DNB' : 'DNBMono'
          ;(element as HTMLElement).style.fontWeight = String(weight)
          ;(element as HTMLElement).style.fontStyle = 'normal'
        },
        { family, weight }
      )
      await page.evaluate(() => document.fonts.ready)
      const expected = await metrics()
      await sample.evaluate(
        (element, { family, weight }) => {
          ;(element as HTMLElement).style.fontFamily = family
          ;(element as HTMLElement).style.fontWeight = String(weight)
          ;(element as HTMLElement).style.fontStyle = 'normal'
        },
        { family, weight }
      )
      await page.evaluate(() => document.fonts.ready)
      const actual = await metrics()
      expect(
        Math.abs(actual.height - expected.height)
      ).toBeLessThanOrEqual(0.02)
      expect(
        Math.abs(actual.baseline - expected.baseline)
      ).toBeLessThanOrEqual(0.02)
      expect(actual.width).toBeCloseTo(expected.width, 1)
    }
  }
})

test('keeps controls usable when the web font is unavailable', async ({
  page,
}) => {
  await page.route('https://font-metrics.test/**', (route) =>
    route.abort()
  )
  const css = [
    compile('style/dnb-ui-core.scss'),
    compile('style/themes/ui/ui-theme-basis.scss'),
    compile('components/button/style/dnb-button.scss'),
  ]
    .join('\n')
    .replace(
      /url\(["']?[^)"']*\/([^/"')]+\.(?:woff2|woff|ttf))["']?\)/g,
      'url("https://font-metrics.test/$1")'
    )
  await page.setContent(
    '<style>' +
      css +
      '</style><div class="dnb-core-style"><button type="button" class="dnb-button dnb-button--primary dnb-button--has-text"><span aria-hidden="true" class="dnb-alignment-helper--pseudo-element-only dnb-button__alignment"></span><span class="dnb-button__text">Åpne konto</span></button></div>'
  )
  await page.evaluate(() => document.fonts.ready)
  const button = page.getByRole('button', { name: 'Åpne konto' })
  await expect(button).toHaveCSS('height', '40px')
  await expect(button.locator('.dnb-button__text')).toHaveCSS(
    'font-family',
    /Arial/
  )
  await button.focus()
  await expect(button).toBeFocused()
  await button.press('Enter')
  await expect(button).toBeVisible()
})
