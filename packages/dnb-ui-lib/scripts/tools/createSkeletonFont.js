import path from 'path'
import fs from 'fs-extra'
import opentype from 'opentype.js'
import Fontmin from 'fontmin'
import { asyncForEach } from './'
import { makeUniqueId } from 'dnb-ui-lib/src/shared/component-helper'
import ora from 'ora'

const log = ora()

const leftOffset = -24 // e.g. -24
const rightOffset = 24 // e.g. 24
const topOffset = -100 // e.g. -100
const bottomOffset = 100 // e.g. 100

asyncForEach(
  [
    { fontName: 'DNB', styleName: 'Light' },
    { fontName: 'DNB', styleName: 'Regular' },
    { fontName: 'DNB', styleName: 'Medium' },
    { fontName: 'DNB', styleName: 'Bold' },
    { fontName: 'DNBMono', styleName: 'Regular' }
  ],
  async ({ fontName, styleName }) => {
    const soruceFile = `${fontName}-${styleName}.ttf`
    const sourcePath = path.resolve(
      __dirname,
      '../../assets/fonts/',
      soruceFile
    )

    const familyName = `${fontName}Skeleton`
    const fileName = `${fontName}-Skeleton`
    const font = await opentype.load(sourcePath)

    log.start()
    log.info(`Converting ${styleName}`)

    try {
      const newFont = createFont(font, {
        styleName,
        familyName
      })

      log.info(`Created new font: ${familyName}`)

      const cachedFileName = `./assets/fonts/skeleton/${fileName}-${styleName}-${makeUniqueId()}.otf`
      const destFileName = `./assets/fonts/skeleton/${fileName}-${styleName}.otf`

      if (fs.existsSync(destFileName)) {
        await fs.remove(destFileName)
      }

      await newFont.download(cachedFileName)

      log.info(`Downloaded ${familyName}`)

      await fs.rename(cachedFileName, destFileName)

      await minifyFonts()

      log.succeed(`Success: ${fileName}-${styleName}`)
    } catch (e) {
      log.fail(`Failed: ${fileName}-${styleName}`)
      console.error(e)
    }
  }
)

const createChar = (s) => s.charCodeAt(0)
const excludeChars = ''.split('').map(createChar) // special chars    \',;[]()."`

function createFont(font, { styleName, familyName }) {
  const glyphs = Object.values(font.glyphs.glyphs)

  // Get the height from H char
  const H = glyphs.find((g) => g.unicode === 72) // H char
  const h = H.yMax

  const changedGlyphs = glyphs
    .map((g) => {
      // console.log('glyphs', g)
      // Heres a list of the most used (Basic Latin) chars: https://en.wikipedia.org/wiki/List_of_Unicode_characters
      // But as for now, we convert all chars
      // if (
      //   // typeof g.unicode === 'undefined'
      //   // ||
      //   !(
      //     typeof g.unicode !== 'undefined' &&
      //     g.unicode >= 0 &&
      //     g.unicode <= 126
      //   )
      // ) {
      //   return null
      // }
      return changePath(g, h)
    })
    .filter(Boolean)

  const newFont = new opentype.Font({
    familyName,
    styleName,
    unitsPerEm: font.unitsPerEm,
    ascender: font.ascender,
    descender: font.descender,
    glyphs: changedGlyphs
  })

  return newFont
}

function changePath(glyph, bottom) {
  const aPath = new opentype.Path()

  if (!excludeChars.includes(glyph.unicode)) {
    // NB: top and bottom are opposite. Wired. But true.
    aPath.moveTo(leftOffset, -bottomOffset)
    aPath.lineTo(leftOffset, bottom - topOffset)
    aPath.lineTo(glyph.advanceWidth + rightOffset, bottom - topOffset)
    aPath.lineTo(glyph.advanceWidth + rightOffset, -bottomOffset)
    aPath.close()
  }

  glyph.path = aPath

  return glyph
}

async function minifyFonts() {
  return new Promise((resolve, reject) => {
    const fontmin = new Fontmin()

    fontmin.src(
      path.resolve(__dirname, '../../assets/fonts/skeleton/*.otf')
    )

    fontmin.use(Fontmin.otf2ttf())
    fontmin.use(Fontmin.ttf2woff())
    fontmin.use(Fontmin.ttf2woff2())

    fontmin.dest(path.resolve(__dirname, '../../assets/fonts/skeleton/'))

    fontmin.run(function (err) {
      reject(err)
    })

    resolve()
  })
}
