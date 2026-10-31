import fs from 'node:fs/promises'
import path from 'node:path'
import fonteditor from 'fonteditor-core'
import { normalizeWebFont } from '../createWebFonts'

const fontDirectory = path.resolve(__dirname, '../../../assets/fonts/dnb')
const fontNames = ['Text', 'Mono'].flatMap((family) =>
  ['Light', 'Regular', 'Medium', 'Bold'].flatMap((weight) =>
    ['', 'Italic'].map(
      (slant) => 'DNBSans' + family + '-' + weight + slant + '.ttf'
    )
  )
)

function tables(font: Buffer) {
  const entries = new Map<string, Buffer>()
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const entry = 12 + i * 16
    const offset = font.readUInt32BE(entry + 8)
    entries.set(
      font.toString('ascii', entry, entry + 4),
      font.subarray(offset, offset + font.readUInt32BE(entry + 12))
    )
  }
  return entries
}

it.each(fontNames)(
  'aligns %s metrics while preserving glyphs, hinting and other tables',
  async (name) => {
    const source = await fs.readFile(path.join(fontDirectory, name))
    const original = Buffer.from(source)
    const normalized = normalizeWebFont(source)
    expect(source).toEqual(original)
    expect(
      await fs.readFile(path.join(fontDirectory, 'web', name))
    ).toEqual(normalized)
    const before = tables(source)
    const after = tables(normalized)
    const metrics = after.get('OS/2')
    expect([68, 70, 72].map((at) => metrics.readInt16BE(at))).toEqual([
      950, -250, 0,
    ])
    expect(metrics.readUInt16BE(62) & 128).toBe(128)
    const expectedMetrics = Buffer.from(before.get('OS/2'))
    metrics.copy(expectedMetrics, 68, 68, 74)
    expect(metrics).toEqual(expectedMetrics)
    const expectedHead = Buffer.from(before.get('head'))
    after.get('head').copy(expectedHead, 8, 8, 12)
    expect(after.get('head')).toEqual(expectedHead)
    for (const [name, data] of before) {
      if (name !== 'OS/2' && name !== 'head') {
        expect(after.get(name)).toEqual(data)
      }
    }
    expect(normalizeWebFont(normalized)).toEqual(normalized)
    let checksum = 0
    for (let i = 0; i < normalized.length; i += 4) {
      checksum = (checksum + normalized.readUInt32BE(i)) >>> 0
    }
    expect(checksum).toBe(0xb1b0afba)
    expect(
      fonteditor.Font.create(normalized, { type: 'ttf' }).get().glyf
    ).toEqual(fonteditor.Font.create(source, { type: 'ttf' }).get().glyf)
  }
)
