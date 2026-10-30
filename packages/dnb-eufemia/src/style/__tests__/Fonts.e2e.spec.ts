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
      brand + ' loads current Text and Mono fonts, isolated=' + isolated,
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
        await expect(page.locator('#cta .dnb-button__text')).toHaveCSS(
          'transform',
          brand === 'sbanken'
            ? 'matrix(1, 0, 0, 1, 0, -0.5)'
            : 'matrix(1, 0, 0, 1, 0, 0)'
        )
        await page.locator('#cta').evaluate((element) => {
          ;(element as HTMLElement).style.setProperty(
            '--button-text-translate-y',
            '1px'
          )
        })
        await expect(page.locator('#cta .dnb-button__text')).toHaveCSS(
          'transform',
          'matrix(1, 0, 0, 1, 0, 1)'
        )
        await page.locator('#cta').evaluate((element) => {
          ;(element as HTMLElement).style.removeProperty(
            '--button-text-translate-y'
          )
        })
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
      }
    )
  }
}
