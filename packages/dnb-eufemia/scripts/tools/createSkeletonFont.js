import path from 'node:path'
import fs from 'node:fs/promises'
import { parseArgs } from 'node:util'
import opentype from 'opentype.js'
import { Font } from 'fonteditor-core'
import { writeWebFontFiles } from './createWebFonts'

export const skeletonFontConfigs = [
  ...['Text', 'Mono'].flatMap((family) =>
    ['Light', 'Regular', 'Medium', 'Bold'].map((styleName) => {
      const name = family === 'Text' ? 'DNB' : 'DNBMono'
      return {
        source: `web/DNBSans${family}-${styleName}.ttf`,
        familyName: `${name}Skeleton`,
        filePrefix: `${name}-Skeleton`,
        styleName,
      }
    })
  ),
  {
    source: 'DNBSansDisplay.ttf',
    familyName: 'DNBSansDisplaySkeleton',
    filePrefix: 'DNBSansDisplay-Skeleton',
    styleName: 'Regular',
  },
]

function tables(font) {
  const result = new Map()
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const entry = 12 + i * 16
    const offset = font.readUInt32BE(entry + 8)
    result.set(
      font.toString('ascii', entry, entry + 4),
      Buffer.from(
        font.subarray(offset, offset + font.readUInt32BE(entry + 12))
      )
    )
  }
  return result
}

function checksum(bytes) {
  let sum = 0
  for (let i = 0; i < bytes.length; i += 4) {
    let word = 0
    for (let j = 0; j < 4; j++) {
      word = (word << 8) | (bytes[i + j] ?? 0)
    }
    sum = (sum + (word >>> 0)) >>> 0
  }
  return sum
}

function preserveLayout(generated, source) {
  const output = tables(generated)
  const original = tables(source)
  for (const tag of ['head', 'hhea', 'OS/2']) {
    if (!output.has(tag) || !original.has(tag)) {
      throw new Error(`Font is missing its ${tag} table`)
    }
  }
  original.get('hhea').copy(output.get('hhea'), 4, 4, 10)
  output.set('OS/2', original.get('OS/2'))
  original.get('head').copy(output.get('head'), 20, 20, 36)

  // Glyph indices are retained, so shaping and kerning must be retained too.
  for (const tag of ['GDEF', 'GPOS', 'GSUB', 'kern']) {
    if (original.has(tag)) {
      output.set(tag, original.get(tag))
    }
  }
  output.get('head').writeUInt32BE(0, 8)
  const names = [...output.keys()].sort()
  const power = Math.floor(Math.log2(names.length))
  const font = Buffer.alloc(
    12 +
      names.length * 16 +
      names.reduce(
        (length, tag) =>
          length + Math.ceil(output.get(tag).length / 4) * 4,
        0
      )
  )
  generated.copy(font, 0, 0, 4)
  font.writeUInt16BE(names.length, 4)
  font.writeUInt16BE(16 * 2 ** power, 6)
  font.writeUInt16BE(power, 8)
  font.writeUInt16BE(names.length * 16 - 16 * 2 ** power, 10)
  let offset = 12 + names.length * 16
  let headOffset
  names.forEach((tag, index) => {
    const data = output.get(tag)
    const entry = 12 + index * 16
    font.write(tag, entry, 4, 'ascii')
    font.writeUInt32BE(checksum(data), entry + 4)
    font.writeUInt32BE(offset, entry + 8)
    font.writeUInt32BE(data.length, entry + 12)
    data.copy(font, offset)
    if (tag === 'head') {
      headOffset = offset
    }
    offset += Math.ceil(data.length / 4) * 4
  })
  font.writeUInt32BE((0xb1b0afba - checksum(font)) >>> 0, headOffset + 8)
  return font
}

export async function createSkeletonFont({
  sourcePath,
  outputDirectory,
  familyName,
  filePrefix,
  styleName = 'Regular',
}) {
  const source = await fs.readFile(sourcePath)
  const parsed = opentype.parse(
    source.buffer.slice(
      source.byteOffset,
      source.byteOffset + source.byteLength
    )
  )
  const height = parsed.charToGlyph('H').getMetrics().yMax
  const glyphs = Array.from(
    { length: parsed.glyphs.length },
    (_, index) => {
      const original = parsed.glyphs.get(index)
      const rectangle = new opentype.Path()
      rectangle.moveTo(-24, -100)
      rectangle.lineTo(-24, height + 100)
      rectangle.lineTo(original.advanceWidth + 24, height + 100)
      rectangle.lineTo(original.advanceWidth + 24, -100)
      rectangle.close()
      const glyph = new opentype.Glyph({
        name: original.name,
        unicode: original.unicode,
        advanceWidth: original.advanceWidth,
        path: rectangle,
      })
      glyph.unicodes = [...original.unicodes]
      return glyph
    }
  )
  const skeleton = new opentype.Font({
    familyName,
    styleName,
    unitsPerEm: parsed.unitsPerEm,
    ascender: parsed.ascender,
    descender: parsed.descender,
    glyphs,
  })
  const otf = preserveLayout(Buffer.from(skeleton.toArrayBuffer()), source)
  const converted = Font.create(otf, { type: 'otf' })
  const data = converted.get()
  data.head.flags |= 4
  data.maxp.maxStackElements = 1
  for (const glyph of data.glyf) {
    const points = glyph.contours.reduce(
      (count, contour) => count + contour.length,
      0
    )
    // Grid-fit only the horizontal metric phantom points. FreeType's
    // shape-based auto-hinter otherwise widens the solid rectangular stems.
    glyph.instructions = [
      0x01, // SVTCA[x]
      0xb0,
      points,
      0x2f, // PUSHB left phantom; MDAP[round]
      0xb0,
      points + 1,
      0x2f, // PUSHB right phantom; MDAP[round]
    ]
  }
  const ttf = preserveLayout(
    Buffer.from(converted.write({ type: 'ttf', hinting: true })),
    source
  )
  await fs.mkdir(outputDirectory, { recursive: true })
  const stem = path.join(outputDirectory, `${filePrefix}-${styleName}`)
  await fs.writeFile(stem + '.otf', otf)
  await writeWebFontFiles(stem, ttf)
}

export async function createSkeletonFonts(
  directory = path.resolve(__dirname, '../../assets/fonts/dnb'),
  configs = skeletonFontConfigs
) {
  for (const { source, ...config } of configs) {
    await createSkeletonFont({
      ...config,
      sourcePath: path.join(directory, source),
      outputDirectory: path.join(directory, 'skeleton'),
    })
  }
}

if (path.basename(process.argv[1] || '') === 'createSkeletonFont.js') {
  const { values } = parseArgs({
    options: {
      source: { type: 'string' },
      output: { type: 'string' },
      family: { type: 'string' },
      prefix: { type: 'string' },
      style: { type: 'string', default: 'Regular' },
    },
  })
  const run = async () => {
    if (!values.source) {
      await createSkeletonFonts()
      return
    }
    if (!values.output || !values.family || !values.prefix) {
      throw new Error('--source requires --output, --family and --prefix')
    }
    await createSkeletonFont({
      sourcePath: path.resolve(values.source),
      outputDirectory: path.resolve(values.output),
      familyName: values.family,
      filePrefix: values.prefix,
      styleName: values.style,
    })
  }
  run().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
