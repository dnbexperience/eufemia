import fs from 'node:fs/promises'
import path from 'node:path'
import postcss from 'postcss'
import { test, expect } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'
import { compileFontTestStyles as compile } from './fontTestStyles'

const packageRoot = path.resolve(__dirname, '../../..')
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
          ...[
            'toggle-button',
            'breadcrumb',
            'pagination',
            'step-indicator',
            'upload',
            'dropdown',
            'date-picker',
          ].map((component) =>
            compile(
              'components/' +
                component +
                '/style/dnb-' +
                component +
                '.scss'
            )
          ),
          compile(
            'extensions/forms/Value/Upload/style/dnb-value-upload.scss'
          ),
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
            '</p><button id="cta" class="dnb-button dnb-button--primary"><span class="dnb-button__text">Continue</span></button><button id="unstyled" class="dnb-button dnb-button--unstyled"><span class="dnb-button__text">Unstyled</span></button></div><article class="dnb-document"><h1 id="document" class="dnb-h--xx-large">' +
            text +
            '</h1></article></main>'
        )
        const controls = [
          ['dnb-toggle-button', '', 'dnb-toggle-button__button'],
          ['dnb-breadcrumb', '', ''],
          ['dnb-pagination', 'dnb-pagination__bar', ''],
          [
            'dnb-step-indicator',
            '',
            'dnb-step-indicator__trigger__button',
          ],
          ['dnb-forms-value-upload', '', ''],
          ['dnb-upload', 'dnb-upload__file-cell__text-container', ''],
          ['dnb-dropdown', '', 'dnb-dropdown__trigger'],
          ['dnb-date-picker', 'dnb-date-picker__day', ''],
        ]
        await page
          .locator('.dnb-core-style')
          .evaluate((element, controls) => {
            for (const [root, container, button] of controls) {
              element.insertAdjacentHTML(
                'beforeend',
                '<div class="' +
                  root +
                  '"><div class="' +
                  container +
                  '"><button class="dnb-button dnb-button--secondary ' +
                  button +
                  '"><span class="dnb-button__text">Selected value</span></button></div></div>'
              )
            }
            element.insertAdjacentHTML(
              'beforeend',
              '<div class="dnb-upload"><button id="upload-action" class="dnb-button dnb-button--secondary"><span class="dnb-button__text">Upload file</span></button></div><div class="dnb-pagination"><div class="dnb-pagination__loadbar"><button id="load-action" class="dnb-button dnb-button--secondary"><span class="dnb-button__text">Load more</span></button></div></div>'
            )
          }, controls)
        for (const [root] of controls) {
          await expect(
            page.locator('.' + root + ' .dnb-button__text').first()
          ).toHaveCSS('font-weight', '400')
        }
        for (const selector of ['#upload-action', '#load-action']) {
          await expect(
            page.locator(selector + ' .dnb-button__text')
          ).toHaveCSS('font-weight', '400')
        }
        await page.locator('.dnb-date-picker__day').evaluate((element) => {
          element.classList.add('dnb-date-picker__day--today')
        })
        await expect(
          page.locator('.dnb-date-picker__day .dnb-button__text')
        ).toHaveCSS('font-weight', '500')
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
        for (const variant of [
          'primary',
          'secondary',
          'tertiary',
          'unstyled',
        ]) {
          await page.locator('#cta').evaluate((element, variant) => {
            element.setAttribute(
              'class',
              'dnb-button dnb-button--' + variant
            )
          }, variant)
          await expect(page.locator('#cta .dnb-button__text')).toHaveCSS(
            'font-weight',
            '400'
          )
        }
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
        await expect(page.locator('#lead')).toHaveCSS(
          'font-weight',
          brand === 'sbanken' ? '400' : '500'
        )
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
          expect(
            await page
              .locator(selector)
              .evaluate((element) =>
                getComputedStyle(element).textRendering.toLowerCase()
              )
          ).toBe(
            brand === 'ui' || brand === 'eiendom'
              ? 'geometricprecision'
              : 'auto'
          )
          expect(
            await page.locator(selector).evaluate((element) => {
              const style = getComputedStyle(element)
              return (
                parseFloat(style.lineHeight) / parseFloat(style.fontSize)
              )
            })
          ).toBeCloseTo(1.1)
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
          for (const size of [14, 16, 18, 24, 34, 48]) {
            for (const width of [180, 260]) {
              const metrics = await page.locator('#default').evaluate(
                async (element, { size, width }) => {
                  if (!(element instanceof HTMLElement)) {
                    throw new Error('Display heading is missing')
                  }
                  element.className =
                    'dnb-h--xx-large dnb-t__family--display'
                  element.style.cssText =
                    'display:block;max-width:' +
                    width +
                    'px;font-size:' +
                    size +
                    'px;line-height:1.25'
                  element.replaceChildren()
                  const words = [
                    'ÆØÅ',
                    'Hgjpq',
                    'ÆØÅ',
                    'Hgjpq',
                    'æøå',
                    'Gjør',
                    'noe',
                    'større',
                  ]
                  for (const text of [...words, ...words]) {
                    const word = document.createElement('span')
                    word.style.whiteSpace = 'nowrap'
                    const letters = document.createElement('span')
                    letters.textContent = text
                    const baseline = document.createElement('i')
                    baseline.style.cssText =
                      'display:inline-block;width:0;height:0;vertical-align:baseline'
                    word.append(letters, baseline)
                    element.append(word, ' ')
                  }
                  await document.fonts.ready
                  const measure = () => {
                    const context = document
                      .createElement('canvas')
                      .getContext('2d')
                    if (!context) {
                      throw new Error('Canvas metrics are unavailable')
                    }
                    const lines = new Map<
                      number,
                      { top: number; bottom: number }
                    >()
                    const wordBaselines: number[] = []
                    const widths: number[] = []
                    for (const word of element.children) {
                      const letters = word.querySelector('span')
                      const marker = word.querySelector('i')
                      if (!letters || !marker) {
                        throw new Error('Display word metrics are missing')
                      }
                      const style = getComputedStyle(letters)
                      context.font =
                        style.fontStyle +
                        ' ' +
                        style.fontWeight +
                        ' ' +
                        style.fontSize +
                        ' ' +
                        style.fontFamily
                      const ink = context.measureText(letters.textContent)
                      const baseline = marker.getBoundingClientRect().top
                      const key = Math.round(baseline * 100) / 100
                      const top = baseline - ink.actualBoundingBoxAscent
                      const bottom =
                        baseline + ink.actualBoundingBoxDescent
                      const previous = lines.get(key)
                      lines.set(key, {
                        top: Math.min(previous?.top ?? top, top),
                        bottom: Math.max(
                          previous?.bottom ?? bottom,
                          bottom
                        ),
                      })
                      wordBaselines.push(key)
                      widths.push(letters.getBoundingClientRect().width)
                    }
                    const ordered = [...lines.values()]
                    return {
                      height: element.getBoundingClientRect().height,
                      baselines: [...lines.keys()],
                      wordBaselines,
                      widths,
                      clearances: ordered
                        .slice(1)
                        .map(
                          (line, index) => line.top - ordered[index].bottom
                        ),
                    }
                  }
                  const before = measure()
                  element.classList.add('dnb-skeleton--font')
                  await document.fonts.load(
                    size + 'px DNBSansDisplaySkeleton'
                  )
                  await document.fonts.ready
                  return { before, after: measure() }
                },
                { size, width }
              )
              expect(metrics.before.baselines.length).toBeGreaterThan(1)
              for (const clearance of metrics.before.clearances) {
                expect(clearance).toBeGreaterThanOrEqual(-0.02)
              }
              expect(metrics.after.height).toBeCloseTo(
                metrics.before.height,
                1
              )
              expect(metrics.after.baselines).toEqual(
                metrics.before.baselines
              )
              // Outline-specific grid fitting can differ by a device pixel.
              // Every word must still occupy exactly the same line.
              expect(metrics.after.wordBaselines).toEqual(
                metrics.before.wordBaselines
              )
              metrics.after.widths.forEach((value, index) => {
                expect(value).toBeCloseTo(metrics.before.widths[index], 1)
              })
            }
          }
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

test('loads a font response that arrives after the fallback deadline', async ({
  page,
}) => {
  await page.route('https://fonts.test/delayed.woff2', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 4000))
    await route.fulfill({
      contentType: 'font/woff2',
      body: await fs.readFile(
        path.join(
          packageRoot,
          'assets/fonts/dnb/DNBSansText-Regular.woff2'
        )
      ),
    })
  })
  const css = compile('style/themes/ui/fonts.scss').replace(
    /url\(["']?[^)"']*DNBSansText-Regular\.woff2["']?\)/g,
    'url("https://fonts.test/delayed.woff2")'
  )
  await page.setContent(
    '<style>' + css + '</style><p style="font:18px DNB">ÆØÅ Hgjpq</p>'
  )
  const faces = await page.evaluate(async () =>
    (await document.fonts.load('18px DNB', 'ÆØÅ Hgjpq')).map(
      (face) => face.status
    )
  )
  expect(faces).toEqual(['loaded'])
})
