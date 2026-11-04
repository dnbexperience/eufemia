import fs from 'node:fs/promises'
import { deflateSync } from 'node:zlib'
import fonteditor, { woff2 } from 'fonteditor-core'

export async function writeWebFontFiles(stem: string, font: Buffer) {
  await woff2.init()
  const buffer = Uint8Array.from(font).buffer
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
