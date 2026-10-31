import fs from 'node:fs/promises'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import * as sass from 'sass'
import postcss from 'postcss'
import { PNG } from 'pngjs'
import { expect, test } from '@playwright/test'
import isolateStyles from '../../plugins/postcss-isolated-style-scope'

const packageRoot = path.resolve(__dirname, '../../..')
const fontRoot = path.join(packageRoot, 'assets/fonts/dnb')
const text = 'ÆØÅ æøå Gjør noe større Hgjpq 0123456789'
const weights = [
  ['Light', 300],
  ['Regular', 400],
  ['Medium', 500],
  ['Bold', 600],
] as const
type Variant = 'legacy' | 'official' | 'derived'
type FontSource = Variant | 'skeleton-typo' | 'skeleton-win'
type Observation = Record<string, unknown>

const checksum = (data: Buffer) => {
  let sum = 0
  for (let offset = 0; offset < data.length; offset += 4) {
    let word = 0
    for (let byte = 0; byte < 4; byte++) {
      word = (word << 8) | (data[offset + byte] || 0)
    }
    sum = (sum + (word >>> 0)) >>> 0
  }
  return sum
}

const probeSkeletonMetrics = (data: Buffer, variant: string) => {
  if (variant !== 'skeleton-typo' && variant !== 'skeleton-win') {
    return data
  }
  const result = Buffer.from(data)
  let os2Record = -1
  let headOffset = -1
  for (let index = 0; index < result.readUInt16BE(4); index++) {
    const record = 12 + index * 16
    const tag = result.toString('ascii', record, record + 4)
    if (tag === 'OS/2') {
      os2Record = record
    }
    if (tag === 'head') {
      headOffset = result.readUInt32BE(record + 8)
    }
  }
  if (os2Record < 0 || headOffset < 0) {
    throw new Error('Metric probe requires OS/2 and head tables')
  }
  const offset = result.readUInt32BE(os2Record + 8)
  const length = result.readUInt32BE(os2Record + 12)
  if (variant === 'skeleton-typo') {
    result.writeUInt16BE(
      result.readUInt16BE(offset + 62) | 128,
      offset + 62
    )
  } else {
    result.writeUInt16BE(950, offset + 74)
    result.writeUInt16BE(250, offset + 76)
  }
  result.writeUInt32BE(
    checksum(result.subarray(offset, offset + length)),
    os2Record + 4
  )
  result.writeUInt32BE(0, headOffset + 8)
  result.writeUInt32BE(
    (0xb1b0afba - checksum(result)) >>> 0,
    headOffset + 8
  )
  return result
}

const sourcePath = (variant: string, name: string) =>
  path.join(
    fontRoot,
    name.includes('Skeleton')
      ? 'skeleton'
      : variant === 'derived' && /^DNBSans(Text|Mono)-/.test(name)
        ? 'web'
        : '',
    name
  )

test('records Windows font selection, inline metrics, and button ink bounds', async ({
  page,
  browser,
  browserName,
}, testInfo) => {
  const requests: Observation[] = []
  const failures: Observation[] = []
  const warnings: Observation[] = []
  const formatLoads: Observation[] = []
  const inlineMetrics: Observation[] = []
  const metricSelectionProbes: Observation[] = []
  const widthComparisons: Observation[] = []
  const buttons: Observation[] = []
  page.on('requestfailed', (request) => {
    failures.push({
      url: request.url(),
      failure: request.failure()?.errorText,
    })
  })
  page.on('console', (message) => {
    if (['warning', 'error'].includes(message.type())) {
      warnings.push({ type: message.type(), text: message.text() })
    }
  })
  await page.route('https://font-metrics.test/**', async (route) => {
    const [variant, name] = new URL(route.request().url()).pathname
      .slice(1)
      .split('/')
    const file = sourcePath(variant, name)
    const body = probeSkeletonMetrics(await fs.readFile(file), variant)
    const extension = path.extname(name).slice(1)
    requests.push({
      url: route.request().url(),
      source: path.relative(packageRoot, file),
      bytes: body.length,
      sha256: createHash('sha256').update(body).digest('hex'),
      variant,
    })
    await route.fulfill({
      contentType: 'font/' + extension,
      body,
    })
  })
  const cdp =
    browserName === 'chromium'
      ? await page.context().newCDPSession(page)
      : null
  if (cdp) {
    await cdp.send('DOM.enable')
    await cdp.send('CSS.enable')
  }
  const renderedFonts = async (selector: string) => {
    if (!cdp) {
      return { inspection: 'CDP unavailable in Firefox' }
    }
    await page.locator(selector).evaluate(async (element) => {
      await document.fonts.ready
      element.getBoundingClientRect()
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      )
    })
    const { root } = await cdp.send('DOM.getDocument')
    const { nodeId } = await cdp.send('DOM.querySelector', {
      nodeId: root.nodeId,
      selector,
    })
    return cdp.send('CSS.getPlatformFontsForNode', { nodeId })
  }
  await page.setContent(
    '<p id="sample" style="margin:0;font:18px/24px Arial"><span>' +
      text +
      '</span><i style="display:inline-block;width:0;height:0;vertical-align:baseline"></i></p>'
  )
  const environment = await page.evaluate(() => ({
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    devicePixelRatio,
    viewport: { width: innerWidth, height: innerHeight },
    visualViewportScale: visualViewport?.scale,
  }))
  const sample = page.locator('#sample')
  const measure = () =>
    sample.evaluate((element) => {
      const span = element.querySelector('span')
      const marker = element.querySelector('i')
      if (!span || !marker) {
        throw new Error('Metric sample is incomplete')
      }
      const parent = element.getBoundingClientRect()
      const bounds = span.getBoundingClientRect()
      const style = getComputedStyle(element)
      return {
        height: bounds.height,
        width: bounds.width,
        top: bounds.top - parent.top,
        baseline: marker.getBoundingClientRect().top - parent.top,
        lineHeight: style.lineHeight,
        fontSize: style.fontSize,
        computedFamily: style.fontFamily,
      }
    })
  const select = async (family: string, size = 18) => {
    await sample.evaluate(
      (element, { family, size }) => {
        if (!(element instanceof HTMLElement)) {
          throw new Error('Metric sample must be an HTMLElement')
        }
        element.style.font = 'normal 400 ' + size + 'px/24px ' + family
      },
      { family, size }
    )
    await page.evaluate(() => document.fonts.ready)
    return measure()
  }
  const addFace = async (
    alias: string,
    variant: FontSource,
    name: string,
    weight = 400,
    style = 'normal'
  ) => {
    const extension = path.extname(name).slice(1)
    const format = extension === 'ttf' ? 'truetype' : extension
    return page.evaluate(
      async ({ alias, url, format, weight, style, text }) => {
        const face = new FontFace(
          alias,
          'url("' + url + '") format("' + format + '")',
          { weight: String(weight), style }
        )
        await face.load()
        document.fonts.add(face)
        const sample = document.querySelector('#sample')
        if (!(sample instanceof HTMLElement)) {
          throw new Error('Metric sample is missing')
        }
        sample.style.font = style + ' ' + weight + ' 18px/24px ' + alias
        const loaded = await document.fonts.load(
          style + ' ' + weight + ' 18px ' + alias,
          text
        )
        return {
          status: face.status,
          loadedFaces: loaded.length,
          loadedFamily: loaded.map((font) => font.family),
          weight: face.weight,
          style: face.style,
        }
      },
      {
        alias,
        url: 'https://font-metrics.test/' + variant + '/' + name,
        format,
        weight,
        style,
        text,
      }
    )
  }
  try {
    for (const family of ['Text', 'Mono']) {
      for (const [weightName, weight] of weights) {
        for (const italic of [false, true]) {
          const suffix = weightName + (italic ? 'Italic' : '')
          const base = 'DNBSans' + family + '-' + suffix
          for (const format of ['ttf', 'woff', 'woff2']) {
            const alias = 'Format' + family + suffix + format
            const loaded = await addFace(
              alias,
              'derived',
              base + '.' + format,
              weight,
              italic ? 'italic' : 'normal'
            )
            const fonts = await renderedFonts('#sample span')
            formatLoads.push({ family, suffix, format, ...loaded, fonts })
            expect(loaded.status).toBe('loaded')
            expect(loaded.loadedFaces).toBe(1)
            if ('fonts' in fonts) {
              expect(
                fonts.fonts.every(
                  (font) => font.isCustomFont && font.glyphCount > 0
                )
              ).toBe(true)
              expect(fonts.fonts.length).toBeGreaterThan(0)
            }
          }
          const derived = 'Derived' + family + suffix
          const official = 'Official' + family + suffix
          await addFace(derived, 'derived', base + '.ttf')
          await addFace(official, 'official', base + '.ttf')
          inlineMetrics.push({
            family,
            suffix,
            variant: 'derived',
            ...(await select(derived)),
          })
          inlineMetrics.push({
            family,
            suffix,
            variant: 'official',
            ...(await select(official)),
          })
          for (const size of [14, 16, 18, 24, 34, 48]) {
            const candidate = await select(derived, size)
            const source = await select(official, size)
            widthComparisons.push({
              family,
              suffix,
              size,
              derived: candidate.width,
              official: source.width,
              delta: candidate.width - source.width,
            })
            expect(candidate.width).toBeCloseTo(source.width, 2)
          }
        }
      }
    }
    for (const family of ['DNB', 'DNBMono']) {
      for (const weight of ['Regular', 'Medium', 'Bold']) {
        const alias = 'Legacy' + family + weight
        await addFace(alias, 'legacy', family + '-' + weight + '.woff2')
        inlineMetrics.push({
          family,
          weight,
          variant: 'legacy',
          ...(await select(alias)),
        })
      }
    }
    for (const [family, names] of [
      ['DNB', ['Regular', 'Medium', 'Bold']],
      ['DNBMono', ['Regular']],
    ] as const) {
      for (const weight of names) {
        const alias = 'Skeleton' + family + weight
        await addFace(
          alias,
          'derived',
          family + '-Skeleton-' + weight + '.woff2'
        )
        inlineMetrics.push({
          family,
          weight,
          variant: 'skeleton',
          ...(await select(alias)),
          fonts: await renderedFonts('#sample span'),
        })
      }
    }
    for (const variant of [
      'derived',
      'skeleton-typo',
      'skeleton-win',
    ] as const) {
      const alias = 'MetricProbe' + variant.replaceAll('-', '')
      await addFace(alias, variant, 'DNB-Skeleton-Regular.ttf')
      metricSelectionProbes.push({
        variant,
        ...(await select(alias)),
        fonts: await renderedFonts('#sample span'),
      })
    }
    const css = [
      'style/dnb-ui-core.scss',
      'style/themes/ui/ui-theme-basis.scss',
      'components/button/style/dnb-button.scss',
    ]
      .map((file) => sass.compile(path.join(packageRoot, 'src', file)).css)
      .join('\n')
    for (const variant of ['legacy', 'official', 'derived'] as const) {
      const rewritten = css.replace(
        /url\(["']?[^)"']*\/([^/"')]+\.(?:woff2|woff|ttf))["']?\)\s*format\(["'][^"']+["']\)/g,
        (_, original: string) => {
          let name = original
          if (/^DNBSans(Text|Mono)-/.test(name)) {
            if (variant === 'official') {
              name = name.replace(/\.(woff2|woff)$/, '.ttf')
            } else if (variant === 'legacy') {
              name = name
                .replace('DNBSansText-', 'DNB-')
                .replace('DNBSansMono-', 'DNBMono-')
            }
          }
          const extension = path.extname(name).slice(1)
          const format = extension === 'ttf' ? 'truetype' : extension
          return (
            'url("https://font-metrics.test/' +
            variant +
            '/' +
            name +
            '") format("' +
            format +
            '")'
          )
        }
      )
      const isolated = (
        await postcss([
          isolateStyles({ scopeHash: 'metric-scope' }),
        ]).process(rewritten, { from: undefined })
      ).css
      await page.setContent(
        '<style>' +
          isolated +
          '</style><div class="metric-scope"><div class="dnb-core-style"><button class="dnb-button dnb-button--primary dnb-button--has-text" style="background:#007272;color:#fff;box-shadow:none"><span aria-hidden="true" class="dnb-alignment-helper--pseudo-element-only dnb-button__alignment"></span><span class="dnb-button__text">Continue</span></button></div></div>'
      )
      for (const rootScale of [1, 1.25, 1.5, 2]) {
        await page.evaluate((scale) => {
          document.documentElement.style.fontSize = 16 * scale + 'px'
        }, rootScale)
        for (const basis of [18, 17]) {
          await page
            .locator('.dnb-core-style')
            .evaluate((element, basis) => {
              if (!(element instanceof HTMLElement)) {
                throw new Error('Core style container is missing')
              }
              element.style.setProperty(
                '--font-size-basis',
                basis / 16 + 'rem'
              )
            }, basis)
          for (const size of ['small', 'default', 'large']) {
            const button = page.locator('button')
            await button.evaluate((element, size) => {
              element.setAttribute(
                'class',
                'dnb-button dnb-button--primary dnb-button--has-text dnb-button--size-' +
                  size
              )
            }, size)
            await page.evaluate(() => document.fonts.ready)
            const layout = await button.evaluate((element) => {
              const label = element.querySelector('.dnb-button__text')
              if (!label) {
                throw new Error('Button label is missing')
              }
              const button = element.getBoundingClientRect()
              const bounds = label.getBoundingClientRect()
              const range = document.createRange()
              range.selectNodeContents(label)
              const inline = range.getBoundingClientRect()
              const style = getComputedStyle(label)
              const canvas = document.createElement('canvas')
              const context = canvas.getContext('2d')
              if (!context) {
                throw new Error('Canvas metrics are unavailable')
              }
              context.font =
                style.fontStyle +
                ' ' +
                style.fontWeight +
                ' ' +
                style.fontSize +
                ' ' +
                style.fontFamily
              const ink = context.measureText(label.textContent || '')
              return {
                width: button.width,
                height: button.height,
                left: bounds.left - button.left,
                right: bounds.right - button.left,
                labelTop: bounds.top - button.top,
                labelHeight: bounds.height,
                inlineTop: inline.top - button.top,
                inlineHeight: inline.height,
                fontSize: style.fontSize,
                lineHeight: style.lineHeight,
                transform: style.transform,
                family: style.fontFamily,
                inkAscent: ink.actualBoundingBoxAscent,
                inkDescent: ink.actualBoundingBoxDescent,
                fontAscent: ink.fontBoundingBoxAscent,
                fontDescent: ink.fontBoundingBoxDescent,
              }
            })
            const screenshot = await button.screenshot()
            const image = PNG.sync.read(screenshot)
            const ratio = image.width / layout.width
            const bounds = (threshold: 'bright' | 'antialiased') => {
              const rows: number[] = []
              for (let y = 0; y < image.height; y++) {
                for (
                  let x = Math.ceil(layout.left * ratio);
                  x < Math.floor(layout.right * ratio);
                  x++
                ) {
                  const index = (y * image.width + x) * 4
                  const hit =
                    threshold === 'bright'
                      ? image.data[index] > 220 &&
                        image.data[index + 1] > 230 &&
                        image.data[index + 2] > 230
                      : image.data[index] > 40 &&
                        image.data[index + 1] > 140 &&
                        image.data[index + 2] > 140
                  if (hit) {
                    rows.push(y)
                    break
                  }
                }
              }
              if (!rows.length) {
                throw new Error('No glyph pixels found: ' + threshold)
              }
              const first = rows[0]
              const last = rows[rows.length - 1]
              return {
                first,
                last,
                signedCenterOffset:
                  ((first + last + 1) / 2 - image.height / 2) / ratio,
              }
            }
            buttons.push({
              variant,
              rootScale,
              basis,
              size,
              layout,
              screenshot: {
                width: image.width,
                height: image.height,
                ratio,
              },
              bright: bounds('bright'),
              antialiased: bounds('antialiased'),
              fonts: await renderedFonts('.dnb-button__text'),
            })
            if (rootScale === 1.25 && basis === 18 && size === 'small') {
              await fs.writeFile(
                testInfo.outputPath(variant + '-small-18-root125.png'),
                screenshot
              )
            }
          }
        }
      }
    }
    expect(formatLoads).toHaveLength(48)
    expect(failures).toEqual([])
    expect(
      warnings.filter((warning) =>
        /OTS|decode|downloaded font|font.*error/i.test(
          String(warning.text)
        )
      )
    ).toEqual([])
  } finally {
    await fs.writeFile(
      testInfo.outputPath('font-diagnostics.json'),
      JSON.stringify(
        {
          sourceRevision: 'add130fbe1e6ca09f858750aee8938fe0324af07',
          diagnosticRevision: process.env.GITHUB_SHA,
          os: { platform: os.platform(), release: os.release() },
          browserName,
          browserVersion: browser.version(),
          environment,
          formatLoads,
          inlineMetrics,
          metricSelectionProbes,
          widthComparisons,
          buttons,
          requests,
          failures,
          warnings,
        },
        null,
        2
      )
    )
  }
})
