import fs from 'node:fs/promises'
import path from 'node:path'
import { deflateSync } from 'node:zlib'
import fonteditor, { woff2 } from 'fonteditor-core'

export function normalizeWebFont(source: Buffer) {
  const font = Buffer.from(source)
  const tables = new Map<
    string,
    { entry: number; offset: number; length: number }
  >()
  for (let i = 0; i < font.readUInt16BE(4); i++) {
    const entry = 12 + i * 16
    tables.set(font.toString('ascii', entry, entry + 4), {
      entry,
      offset: font.readUInt32BE(entry + 8),
      length: font.readUInt32BE(entry + 12),
    })
  }
  const os2 = tables.get('OS/2')
  const hhea = tables.get('hhea')
  const head = tables.get('head')
  if (!os2 || !hhea || !head) {
    throw new Error('Font is missing its line metric tables')
  }

  // Align both metric sets without rewriting outlines, hinting or names.
  for (let i = 0; i < 3; i++) {
    font.writeInt16BE(
      font.readInt16BE(hhea.offset + 4 + i * 2),
      os2.offset + 68 + i * 2
    )
  }
  font.writeUInt32BE(
    checksum(font.subarray(os2.offset, os2.offset + os2.length)),
    os2.entry + 4
  )
  font.writeUInt32BE(0, head.offset + 8)
  font.writeUInt32BE((0xb1b0afba - checksum(font)) >>> 0, head.offset + 8)
  return font
}

function checksum(bytes: Buffer) {
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

export async function createWebFonts(directory: string) {
  await woff2.init()
  const destination = path.join(directory, 'web')
  await fs.mkdir(destination, { recursive: true })
  for (const name of (await fs.readdir(directory)).sort()) {
    if (!/^DNBSans(Text|Mono)-.+\.ttf$/.test(name)) {
      continue
    }
    const font = normalizeWebFont(
      await fs.readFile(path.join(directory, name))
    )
    const buffer = font.buffer.slice(
      font.byteOffset,
      font.byteOffset + font.byteLength
    )
    const stem = path.join(destination, path.basename(name, '.ttf'))
    await fs.writeFile(stem + '.ttf', font)
    await fs.writeFile(
      stem + '.woff',
      Buffer.from(
        fonteditor.ttf2woff(buffer, {
          metadata: undefined,
          deflate: (bytes) => Array.from(deflateSync(Buffer.from(bytes))),
        })
      )
    )
    await fs.writeFile(stem + '.woff2', woff2.encode(font))
  }
}

if (path.basename(process.argv[1] || '') === 'createWebFonts.ts') {
  createWebFonts(path.resolve('assets/fonts/dnb')).catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
}
