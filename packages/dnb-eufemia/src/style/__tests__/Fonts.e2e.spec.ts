import fs from 'node:fs/promises'
import path from 'node:path'
import * as sass from 'sass'
import postcss from 'postcss'
import { test, expect } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'

const packageRoot = path.resolve(__dirname, '../../..')
const compile = (file: string) =>
  sass.compile(path.join(packageRoot, 'src', file)).css
const text = 'ÆØÅ æøå Gjør noe større 0123456789'

for (const brand of ['ui', 'sbanken', 'eiendom', 'carnegie']) {
  for (const isolated of [false, true]) {
    test(
      brand +
        ' loads current fonts and keeps Display explicit, isolated=' +
        isolated,
      async ({ page }) => {
        const requests: string[] = []
        await page.route('https://fonts.test/**', async (route) => {
          const name = new URL(route.request().url()).pathname
            .split('/')
            .pop()
          const family = name.startsWith('Arizona')
            ? 'carnegie'
            : name.startsWith('Roboto') || name.startsWith('Maison')
              ? 'sbanken'
              : 'dnb'
          requests.push(name)
          await route.fulfill({
            contentType: 'font/woff2',
            body: await fs.readFile(
              path.join(
                packageRoot,
                'assets/fonts',
                family,
                name.includes('Skeleton') ? 'skeleton' : '',
                name
              )
            ),
          })
        })
        let css = [
          compile('style/dnb-ui-core.scss'),
          compile(
            'style/themes/' + brand + '/' + brand + '-theme-basis.scss'
          ),
          compile('components/button/style/dnb-button.scss'),
          compile('components/skeleton/style/dnb-skeleton.scss'),
          compile('style/dnb-ui-document.scss'),
        ]
          .join('\n')
          .replace(
            /url\(["']?[^)"']*\/([^/"')]+\.woff2)["']?\)/g,
            'url("https://fonts.test/$1")'
          )
        if (isolated) {
          css = (
            await postcss([
              isolateStyles({ scopeHash: 'test-font-scope' }),
            ]).process(css, { from: undefined })
          ).css
        }
        await page.setContent(
          '<style>' +
            css +
            '</style><main class="' +
            (isolated ? 'test-font-scope' : '') +
            '"><div class="dnb-core-style"><h1 id="default" class="dnb-h--xx-large">' +
            text +
            '</h1><p id="regular" class="dnb-p">' +
            text +
            '</p><p id="lead" class="dnb-p dnb-p--lead">' +
            text +
            '</p><button id="cta" class="dnb-button dnb-button--primary"><span class="dnb-button__text">Continue</span></button><button id="unstyled" class="dnb-button dnb-button--unstyled"><span class="dnb-button__text">Unstyled</span></button><article class="dnb-document"><h1 id="document" class="dnb-h--xx-large">' +
            text +
            '</h1></article></div></main>'
        )
        await page.evaluate(() => document.fonts.ready)
        expect(
          requests.some((name) => name.startsWith('DNBSansDisplay'))
        ).toBe(false)
        const heading =
          brand === 'sbanken'
            ? 'MaisonNeueHeadings'
            : brand === 'carnegie'
              ? 'ArizonaFlare'
              : 'DNB'
        await expect(page.locator('#default')).toHaveCSS(
          'font-family',
          new RegExp(heading)
        )
        await expect(page.locator('#document')).toHaveCSS(
          'font-family',
          new RegExp(heading)
        )
        await expect(page.locator('#cta .dnb-button__text')).toHaveCSS(
          'font-weight',
          brand === 'ui' ? '500' : '400'
        )
        await expect(
          page.locator('#unstyled .dnb-button__text')
        ).toHaveCSS('font-weight', '400')
        if (brand === 'ui') {
          await expect(page.locator('#lead')).toHaveCSS(
            'font-weight',
            '400'
          )
        }
        if (brand !== 'sbanken') {
          for (const weight of [300, 400, 500, 600, 700]) {
            for (const style of ['normal', 'italic']) {
              for (const family of ['DNB', 'DNBMono']) {
                const result = await page.evaluate(
                  async ({ family, style, weight, text }) => {
                    const faces = await document.fonts.load(
                      style + ' ' + weight + ' 18px ' + family,
                      text
                    )
                    return faces.map((face) => face.status)
                  },
                  { family, style, weight, text }
                )
                expect(result).toEqual(['loaded'])
              }
            }
          }
          expect(requests).toContain('DNBSansText-BoldItalic.woff2')
          expect(requests).toContain('DNBSansMono-MediumItalic.woff2')
        }
        await page
          .locator('#default, #document')
          .evaluateAll((elements) =>
            elements.forEach((element) =>
              element.classList.add('dnb-t__family--display')
            )
          )
        const displayFamily =
          brand === 'sbanken' || brand === 'carnegie'
            ? heading
            : 'DNB Sans Display'
        for (const selector of ['#default', '#document']) {
          await expect(page.locator(selector)).toHaveCSS(
            'font-family',
            new RegExp(displayFamily)
          )
          await expect(page.locator(selector)).toHaveCSS(
            'font-weight',
            '400'
          )
          await expect(page.locator(selector)).toHaveCSS(
            'font-style',
            'normal'
          )
        }
        for (const [family, expectedFamily] of [
          ['basis', brand === 'sbanken' ? 'Roboto' : 'DNB'],
          ['default', brand === 'sbanken' ? 'Roboto' : 'DNB'],
          ['heading', heading],
          ['monospace', 'DNBMono'],
        ]) {
          for (const selector of ['#default', '#document']) {
            await page.locator(selector).evaluate((element, family) => {
              element.setAttribute(
                'class',
                'dnb-h--small dnb-t__family--' + family
              )
            }, family)
            await expect(page.locator(selector)).toHaveCSS(
              'font-family',
              new RegExp(expectedFamily)
            )
          }
        }
        await page
          .locator('#default, #document')
          .evaluateAll((elements) =>
            elements.forEach((element) =>
              element.classList.add('dnb-t__family--display')
            )
          )
        await page.locator('#default').evaluate((element) => {
          element.classList.add(
            'dnb-t__weight--bold',
            'dnb-t__slant--italic'
          )
        })
        for (const size of [
          'xx-large',
          'x-large',
          'large',
          'medium',
          'basis',
          'small',
          'x-small',
        ]) {
          await page.locator('#default').evaluate((element, size) => {
            element.setAttribute(
              'class',
              'dnb-h--' +
                size +
                ' dnb-t__family--display dnb-t__weight--bold dnb-t__slant--italic'
            )
          }, size)
          await expect(page.locator('#default')).toHaveCSS(
            'font-family',
            new RegExp(displayFamily)
          )
          await expect(page.locator('#default')).toHaveCSS(
            'font-weight',
            '400'
          )
          await expect(page.locator('#default')).toHaveCSS(
            'font-style',
            'normal'
          )
        }
        await page.evaluate(() => document.fonts.ready)
        expect(requests.includes('DNBSansDisplay.woff2')).toBe(
          brand === 'ui' || brand === 'eiendom'
        )
        await page.locator('#default').evaluate((element) => {
          element.setAttribute(
            'class',
            'dnb-h--xx-large dnb-t__family--display dnb-t__line-height--xx-large'
          )
        })
        await expect(page.locator('#default')).toHaveCSS(
          'line-height',
          brand === 'carnegie' ? '68px' : '56px'
        )
        if (brand === 'ui' || brand === 'eiendom') {
          const widths = await page
            .locator('#default')
            .evaluate(async (element) => {
              element.setAttribute(
                'style',
                'display:inline-block;max-width:180px'
              )
              await document.fonts.ready
              const before = element.getBoundingClientRect()
              element.classList.add('dnb-skeleton--font')
              await document.fonts.load('48px DNBSansDisplaySkeleton')
              const after = element.getBoundingClientRect()
              return [
                before.width,
                before.height,
                after.width,
                after.height,
              ]
            })
          expect(widths[2]).toBeCloseTo(widths[0], 1)
          expect(widths[3]).toBeCloseTo(widths[1], 1)
          expect(requests).toContain(
            'DNBSansDisplay-Skeleton-Regular.woff2'
          )
        }
        await page.setViewportSize({ width: 390, height: 844 })
        await page.emulateMedia({ media: 'print' })
        await expect(page.locator('#document')).toHaveCSS(
          'font-family',
          new RegExp(displayFamily)
        )
        await expect(page.locator('#regular')).toHaveCSS(
          'font-family',
          new RegExp(brand === 'sbanken' ? 'Roboto' : 'DNB')
        )
      }
    )
  }
}
