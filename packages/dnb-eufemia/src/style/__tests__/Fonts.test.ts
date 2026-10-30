// @vitest-environment node

import fs from 'node:fs'
import path from 'node:path'
import postcss from 'postcss'
import { loadScss } from '../../core/test-utils/testSetup'

const themeDirectory = path.resolve(__dirname, '../themes')

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
              style +
              (italic ? 'Italic' : '') +
              '.' +
              extension
            expect(face.src).toContain('/' + file)
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

  it('keeps consistent Text and Mono line metrics across weights, italics, and skeletons', () => {
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
    const faces = getFontFaces().filter((face) =>
      ['DNB', 'DNBMono'].includes(face['font-family'])
    )
    for (const face of [...faces, ...skeletonFaces]) {
      expect(face['ascent-override']).toBe('95%')
      expect(face['descent-override']).toBe('25%')
      expect(face['line-gap-override']).toBe('0%')
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

  it('keeps Sbanken font faces independent', () => {
    expect(
      getFontFaces('sbanken').some((face) =>
        /DNB/.test(face['font-family'])
      )
    ).toBe(false)
  })
})
