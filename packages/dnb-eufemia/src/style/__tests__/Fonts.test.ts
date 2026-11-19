// @vitest-environment node

import fs from 'node:fs'
import path from 'node:path'
import opentype from 'opentype.js'
import postcss from 'postcss'
import { loadScss } from '../../core/test-utils/testSetup'

const themeDirectory = path.resolve(__dirname, '../themes')
const fontsDirectory = path.resolve(__dirname, '../../../assets/fonts/dnb')

function loadFont(name: string) {
  const file = fs.readFileSync(path.join(fontsDirectory, name + '.ttf'))
  return opentype.parse(
    file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength)
  )
}

function getLineMetrics(font: ReturnType<typeof loadFont>) {
  const { hhea, os2 } = font.tables
  const useTypoMetrics = Boolean(os2.fsSelection & (1 << 7))
  return {
    unitsPerEm: font.unitsPerEm,
    hhea: [hhea.ascender, hhea.descender, hhea.lineGap],
    windows: useTypoMetrics
      ? [os2.sTypoAscender, -os2.sTypoDescender, os2.sTypoLineGap]
      : [os2.usWinAscent, os2.usWinDescent, 0],
  }
}

function getFontFaces(theme = 'ui') {
  const css = loadScss(path.join(themeDirectory, theme, 'fonts.scss'))
  const faces: Record<string, string>[] = []
  postcss.parse(css).walkAtRules('font-face', (rule) => {
    const face: Record<string, string> = {}
    rule.walkDecls((decl) => {
      face[decl.prop] = decl.value
    })
    faces.push(face)
  })
  return faces
}

describe('DNB font faces', () => {
  it.each([
    ['DNB', 'DNBSansText'],
    ['DNBMono', 'DNBSansMono'],
  ])(
    'registers every official %s face under its existing CSS family',
    (family, fileName) => {
      const faces = getFontFaces().filter(
        (face) => face['font-family'] === family
      )
      expect(faces).toHaveLength(8)
      for (const [style, weight] of [
        ['Light', '300'],
        ['Regular', 'normal'],
        ['Medium', '500'],
        ['Bold', '600 700'],
      ]) {
        for (const italic of [false, true]) {
          const face = faces.find(
            (face) =>
              face['font-weight'] === weight &&
              face['font-style'] === (italic ? 'italic' : 'normal')
          )
          expect(face).toBeDefined()
          for (const extension of ['woff2', 'woff', 'ttf']) {
            const file =
              fileName +
              '-' +
              (italic && style === 'Regular'
                ? 'Italic'
                : style + (italic ? 'Italic' : '')) +
              '.' +
              extension
            expect(face.src).toContain('/dnb/' + file)
            expect(
              fs.existsSync(
                path.resolve(__dirname, '../../../assets/fonts/dnb', file)
              )
            ).toBe(true)
          }
          expect(face['font-display']).toBe('fallback')
        }
      }
    }
  )

  it('uses embedded metrics without CSS overrides for Text, Mono and skeletons', () => {
    const skeletonCss = loadScss(
      path.resolve(
        __dirname,
        '../../components/skeleton/style/dnb-skeleton.scss'
      )
    )
    const skeletonFaces: Record<string, string>[] = []
    postcss.parse(skeletonCss).walkAtRules('font-face', (rule) => {
      const face: Record<string, string> = {}
      rule.walkDecls((decl) => {
        face[decl.prop] = decl.value
      })
      skeletonFaces.push(face)
    })
    for (const family of ['DNBSkeleton', 'DNBMonoSkeleton']) {
      expect(
        skeletonFaces.filter((face) => face['font-family'] === family)
      ).toHaveLength(4)
      expect(
        skeletonFaces
          .filter((face) => face['font-family'] === family)
          .map((face) => face['font-weight'])
      ).toEqual(['300', 'normal', '500', '600 700'])
    }
    const faces = getFontFaces().filter((face) =>
      ['DNB', 'DNBMono'].includes(face['font-family'])
    )
    for (const face of [...faces, ...skeletonFaces]) {
      expect(face['ascent-override']).toBeUndefined()
      expect(face['descent-override']).toBeUndefined()
      expect(face['line-gap-override']).toBeUndefined()
    }
    expect(
      getFontFaces().find(
        (face) => face['font-family'] === '"DNB Sans Display"'
      )['ascent-override']
    ).toBeUndefined()
  })

  it('uses the single Display face only for an explicit family choice', () => {
    const faces = getFontFaces().filter(
      (face) => face['font-family'] === '"DNB Sans Display"'
    )
    expect(faces).toHaveLength(1)
    expect(faces[0].src).toContain('/DNBSansDisplay.woff2')
    expect(faces[0]['font-weight']).toBe('normal')
    expect(
      getFontFaces().some(
        (face) =>
          face['font-family'] === 'DNBSansDisplaySkeleton' &&
          face.src.includes('DNBSansDisplay-Skeleton-Regular.woff2')
      )
    ).toBe(true)
  })

  it('registers Eiendom Light and its matching skeleton only for Birdhouse', () => {
    const faces = getFontFaces('birdhouse')
    for (const [family, file] of [
      ['"DNB Sans Eiendom"', 'DNBSansEiendom-Light'],
      ['DNBSansEiendomSkeleton', 'skeleton/DNBSansEiendom-Skeleton-Light'],
    ]) {
      const face = faces.find((face) => face['font-family'] === family)
      expect(face).toBeDefined()
      expect(face['font-weight']).toBe('300')
      expect(face['font-style']).toBe('normal')
      expect(face['font-display']).toBe('fallback')
      for (const extension of ['woff2', 'woff', 'ttf']) {
        expect(face.src).toContain(file + '.' + extension)
        expect(
          fs.existsSync(path.join(fontsDirectory, file + '.' + extension))
        ).toBe(true)
      }
    }
    for (const theme of ['ui', 'eiendom']) {
      expect(
        getFontFaces(theme).some((face) =>
          face['font-family'].includes('Eiendom')
        )
      ).toBe(false)
    }
  })

  it('keeps Sbanken font faces independent', () => {
    expect(
      getFontFaces('sbanken').some((face) =>
        /DNB/.test(face['font-family'])
      )
    ).toBe(false)
  })

  // Eufemia versions on one page share the DNB family, so text must keep its layout
  it.each([
    ['DNB-Regular', 'DNBSansText-Regular'],
    ['DNB-Medium', 'DNBSansText-Medium'],
    ['DNB-Bold', 'DNBSansText-Bold'],
    ['DNBMono-Regular', 'DNBSansMono-Regular'],
    ['DNBMono-Medium', 'DNBSansMono-Medium'],
    ['DNBMono-Bold', 'DNBSansMono-Bold'],
  ])(
    'keeps the widths, kerning and line metrics of %s in %s',
    (legacyName, currentName) => {
      const legacy = loadFont(legacyName)
      const current = loadFont(currentName)

      expect(getLineMetrics(current)).toEqual(getLineMetrics(legacy))

      const legacyGlyphs = legacy.tables.cmap.glyphIndexMap
      const currentGlyphs = current.tables.cmap.glyphIndexMap
      const characters = Object.keys(legacyGlyphs)
        .map(Number)
        .filter((code) => code < 0x250)
      expect(characters.length).toBeGreaterThan(300)

      const changedWidths = characters
        .filter(
          (code) =>
            currentGlyphs[code] === undefined ||
            current.glyphs.get(currentGlyphs[code]).advanceWidth !==
              legacy.glyphs.get(legacyGlyphs[code]).advanceWidth
        )
        .map((code) => String.fromCodePoint(code))
      expect(changedWidths).toEqual([])

      const pairCharacters = [...'AFLPTVWYafjrtvwy.,-’«»017ÆØÅæøå']
      const changedKerning = pairCharacters
        .flatMap((left) => pairCharacters.map((right) => left + right))
        .filter(
          ([left, right]) =>
            current.getKerningValue(
              current.charToGlyph(left),
              current.charToGlyph(right)
            ) !==
            legacy.getKerningValue(
              legacy.charToGlyph(left),
              legacy.charToGlyph(right)
            )
        )
      expect(changedKerning).toEqual([])
    }
  )
})
