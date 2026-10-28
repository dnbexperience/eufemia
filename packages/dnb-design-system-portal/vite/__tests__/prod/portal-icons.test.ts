import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const directory = path.dirname(fileURLToPath(import.meta.url))

describe('Portal link-preview icons', () => {
  it('advertises a valid raster icon and serves the conventional ICO fallback', () => {
    const template = readFileSync(
      path.resolve(directory, '../../client/index.html'),
      'utf8'
    )
    expect(template).toContain(
      '<link rel="icon" type="image/png" sizes="64x64" href="/favicon.png" />'
    )
    const png = readFileSync(
      path.resolve(directory, '../../../static/favicon.png')
    )
    expect([...png.subarray(0, 8)]).toEqual([
      137, 80, 78, 71, 13, 10, 26, 10,
    ])
    expect(png.readUInt32BE(16)).toBe(64)
    expect(png.readUInt32BE(20)).toBe(64)

    const ico = readFileSync(
      path.resolve(directory, '../../../static/favicon.ico')
    )
    expect(ico.readUInt16LE(0)).toBe(0)
    expect(ico.readUInt16LE(2)).toBe(1)
    expect(ico.readUInt16LE(4)).toBeGreaterThan(0)
  })
})
