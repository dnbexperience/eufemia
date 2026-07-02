import path from 'path'
import fs from 'fs-extra'
import opentype from 'opentype.js'
import { Font, woff2 } from 'fonteditor-core'
import { asyncForEach } from './'
import { makeUniqueId } from '../../src/shared/component-helper'
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
    { fontName: 'DNBMono', styleName: 'Light' },
    { fontName: 'DNBMono', styleName: 'Regular' },
    { fontName: 'DNBMono', styleName: 'Medium' },
    { fontName: 'DNBMono', styleName: 'Bold' },
  ],
  async ({ fontName, styleName }) => {
    const sourceFile = `${fontName}-${styleName}.ttf`
    const sourcePath = path.resolve(
      __dirname,
      '../../assets/fonts/dnb/',
      sourceFile
    )

    const familyName = `${fontName}Skeleton`
    const fileName = `${fontName}-Skeleton`
    const font = await opentype.load(sourcePath)

    log.start()
    log.info(`Converting ${styleName}`)

    try {
      const newFont = createFont(font, {
        styleName,
        familyName,
      })

      log.info(`Created new font: ${familyName}`)

      const cachedFileName = `./assets/fonts/dnb/skeleton/${fileName}-${styleName}-${makeUniqueId()}.otf`
      const destFileName = `./assets/fonts/dnb/skeleton/${fileName}-${styleName}.otf`

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
const excludeChars = ''.split('').map(createChar) // special chars   \',;[]()."`

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
    glyphs: changedGlyphs,
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

let woff2Ready = false

// Convert every generated skeleton .otf into .ttf, .woff and .woff2
// (previously handled by "fontmin"; replaced with the maintained
// "fonteditor-core" to avoid its abandoned/vulnerable dependencies).
async function minifyFonts() {
  const dir = path.resolve(__dirname, '../../assets/fonts/dnb/skeleton')

  if (!woff2Ready) {
    await woff2.init()
    woff2Ready = true
  }

  const otfFiles = fs
    .readdirSync(dir)
    .filter((file) => file.toLowerCase().endsWith('.otf'))

  otfFiles.forEach((file) => {
    const base = path.join(dir, file.replace(/\.otf$/i, ''))
    const font = Font.create(fs.readFileSync(path.join(dir, file)), {
      type: 'otf',
    })

    fs.writeFileSync(
      `${base}.ttf`,
      Buffer.from(font.write({ type: 'ttf' }))
    )
    fs.writeFileSync(
      `${base}.woff`,
      Buffer.from(font.write({ type: 'woff' }))
    )
    fs.writeFileSync(
      `${base}.woff2`,
      Buffer.from(font.write({ type: 'woff2' }))
    )
  })
}
