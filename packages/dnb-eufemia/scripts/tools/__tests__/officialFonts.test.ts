import fs from 'node:fs/promises'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { unzipSync } from 'fflate'
import fonteditor from 'fonteditor-core'
import sources from '../../../assets/fonts/dnb/font-sources.json'

const directory = path.resolve(__dirname, '../../../assets/fonts/dnb')

function table(font: Buffer, tag: string) {
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const entry = 12 + i * 16
    if (font.toString('ascii', entry, entry + 4) === tag) {
      const offset = font.readUInt32BE(entry + 8)
      return font.subarray(offset, offset + font.readUInt32BE(entry + 12))
    }
  }
  throw new Error('Missing font table: ' + tag)
}

it('ships the complete official static release without binary modifications', async () => {
  const names = (await fs.readdir(directory)).filter((name) =>
    /^DNBSans.*\.(otf|ttf|woff|woff2)$/.test(name)
  )
  expect(names.sort()).toEqual(Object.keys(sources.files).sort())
  for (const [name, hash] of Object.entries(sources.files)) {
    const font = await fs.readFile(path.join(directory, name))
    expect(createHash('sha256').update(font).digest('hex')).toBe(hash)
  }
})

it.each(
  Object.keys(sources.files).filter((name) => name.endsWith('.ttf'))
)(
  '%s has consistent official metrics and a valid checksum',
  async (name) => {
    const font = await fs.readFile(path.join(directory, name))
    const os2 = table(font, 'OS/2')
    expect([68, 70, 72].map((at) => os2.readInt16BE(at))).toEqual([
      950, -250, 0,
    ])
    expect(
      [4, 6, 8].map((at) => table(font, 'hhea').readInt16BE(at))
    ).toEqual([950, -250, 0])
    expect([74, 76].map((at) => os2.readUInt16BE(at))).toEqual([950, 250])
    expect(os2.readUInt16BE(62) & 128).toBe(128)
    expect(table(font, 'head').readUInt16BE(18)).toBe(1000)
    let checksum = 0
    for (let i = 0; i < font.length; i += 4) {
      checksum = (checksum + font.readUInt32BE(i)) >>> 0
    }
    expect(checksum).toBe(0xb1b0afba)
    const parsed = fonteditor.Font.create(font, { type: 'ttf' }).get()
    expect(parsed.name.version).toContain(sources.version)
    if (!name.includes('Display')) {
      expect(os2.readUInt16BE(4)).toBe(
        name.includes('Light')
          ? 300
          : name.includes('Medium')
            ? 500
            : name.includes('Bold')
              ? 700
              : 400
      )
      expect(os2.readUInt16BE(62) & 1).toBe(
        name.includes('Italic') ? 1 : 0
      )
    }
    for (const character of 'ÆØÅæøå0123456789€£$%‰−–→') {
      expect(
        parsed.glyf.some((glyph) =>
          glyph.unicode?.includes(character.codePointAt(0))
        )
      ).toBe(true)
    }
  }
)

it.each(['Text', 'Mono', 'Display'])(
  'packages only the matching official %s files in its download',
  async (family) => {
    const prefix = 'DNBSans' + family
    const archive = unzipSync(
      await fs.readFile(path.join(directory, prefix + '.zip'))
    )
    const expected = Object.keys(sources.files).filter((name) =>
      name.startsWith(prefix)
    )
    expect(Object.keys(archive).sort()).toEqual(expected.sort())
    for (const name of expected) {
      expect(
        createHash('sha256').update(archive[name]).digest('hex')
      ).toBe(sources.files[name])
    }
  }
)
