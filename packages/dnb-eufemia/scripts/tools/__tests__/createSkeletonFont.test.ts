import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import fonteditor from 'fonteditor-core'
import {
  createSkeletonFont,
  skeletonFontConfigs,
} from '../createSkeletonFont'

const directory = path.resolve(__dirname, '../../../assets/fonts/dnb')
let temporary: string

function tables(font: Buffer) {
  const result = new Map<string, Buffer>()
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const record = 12 + i * 16
    const offset = font.readUInt32BE(record + 8)
    result.set(
      font.toString('ascii', record, record + 4),
      font.subarray(offset, offset + font.readUInt32BE(record + 12))
    )
  }
  return result
}

beforeAll(async () => {
  temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'eufemia-skeleton-'))
})

afterAll(async () => {
  await fs.rm(temporary, { recursive: true, force: true })
})

it.each(skeletonFontConfigs)(
  'reproduces $filePrefix-$styleName with source layout and metrics',
  async ({ source, ...config }) => {
    const sourcePath = path.join(directory, source)
    const original = await fs.readFile(sourcePath)
    await createSkeletonFont({
      ...config,
      sourcePath,
      outputDirectory: temporary,
    })
    const name = `${config.filePrefix}-${config.styleName}`
    for (const extension of ['otf', 'ttf', 'woff', 'woff2']) {
      expect(
        await fs.readFile(path.join(temporary, name + '.' + extension))
      ).toEqual(
        await fs.readFile(
          path.join(directory, 'skeleton', name + '.' + extension)
        )
      )
    }
    const generated = await fs.readFile(
      path.join(temporary, name + '.ttf')
    )
    const before = tables(original)
    const after = tables(generated)
    expect(after.get('hhea').subarray(4, 10)).toEqual(
      before.get('hhea').subarray(4, 10)
    )
    expect(after.get('OS/2')).toEqual(before.get('OS/2'))
    for (const extension of ['otf', 'ttf']) {
      const binary = await fs.readFile(
        path.join(temporary, name + '.' + extension)
      )
      let sum = 0
      for (let offset = 0; offset < binary.length; offset += 4) {
        sum = (sum + binary.readUInt32BE(offset)) >>> 0
      }
      expect(sum).toBe(0xb1b0afba)
    }
    for (const tag of ['GDEF', 'GPOS', 'GSUB', 'kern']) {
      expect(after.get(tag)).toEqual(before.get(tag))
    }
    const read = (font: Buffer) =>
      fonteditor.Font.create(font, { type: 'ttf', hinting: true }).get()
    const sourceFont = read(original)
    const skeleton = read(generated)
    expect(skeleton.head.flags & 4).toBe(4)
    expect(skeleton.maxp.maxStackElements).toBeGreaterThanOrEqual(1)
    for (const glyph of skeleton.glyf) {
      if (!('instructions' in glyph)) {
        throw new Error('Skeleton glyph metric hinting is missing')
      }
      const points = glyph.contours.reduce(
        (count, contour) => count + contour.length,
        0
      )
      expect(glyph.instructions).toEqual([
        0x01,
        0xb0,
        points,
        0x2f,
        0xb0,
        points + 1,
        0x2f,
      ])
    }
    expect(skeleton.glyf.map((glyph) => glyph.advanceWidth)).toEqual(
      sourceFont.glyf.map((glyph) => glyph.advanceWidth)
    )
    expect(skeleton.glyf.map((glyph) => glyph.unicode)).toEqual(
      sourceFont.glyf.map((glyph) => glyph.unicode)
    )
    expect(skeleton.name.fontFamily).toBe(config.familyName)
    expect(await fs.readFile(sourcePath)).toEqual(original)
    await createSkeletonFont({
      ...config,
      sourcePath,
      outputDirectory: temporary,
    })
    expect(await fs.readFile(path.join(temporary, name + '.ttf'))).toEqual(
      generated
    )
  }
)

it('rejects a missing source instead of silently skipping a face', async () => {
  await expect(
    createSkeletonFont({
      sourcePath: path.join(temporary, 'missing.ttf'),
      outputDirectory: temporary,
      familyName: 'MissingSkeleton',
      filePrefix: 'Missing-Skeleton',
    })
  ).rejects.toThrow('ENOENT')
})
