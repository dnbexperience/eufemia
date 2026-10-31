import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import { unzipSync } from 'fflate'
import { createIconDownloads } from '../iconDownloads'

let destDir: string
let manifestFile: string
let buildAndroid: ReturnType<typeof vi.fn<() => Promise<void>>>
let files: Array<{ iconFile: string; category: string }>
const svg = (size = 16, color = '#000') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><path fill="${color}" d="M0 0h8v8H0z"/></svg>`
const generate = () =>
  createIconDownloads({ destDir, manifestFile, files, buildAndroid })

beforeEach(async () => {
  destDir = await fs.mkdtemp(path.join(os.tmpdir(), 'icon-downloads-'))
  manifestFile = path.join(destDir, 'icon-downloads.lock')
  files = [
    { iconFile: 'bell.svg', category: 'objects' },
    { iconFile: 'bell_medium.svg', category: 'objects' },
  ]
  await fs.writeFile(path.join(destDir, 'bell.svg'), svg())
  await fs.writeFile(path.join(destDir, 'bell_medium.svg'), svg(24))
  buildAndroid = vi.fn(async () => {
    await fs.writeFile(path.join(destDir, 'eufemia-icons-xml.tgz'), 'xml')
    await fs.writeFile(
      path.join(destDir, 'eufemia-icons-xml-categorized.tgz'),
      'categorized'
    )
  })
})
afterEach(async () => {
  await fs.remove(destDir)
})

it('includes only the original SVGs', async () => {
  await generate()
  const entries = unzipSync(
    await fs.readFile(path.join(destDir, 'eufemia-icons.zip'))
  )
  expect(Object.keys(entries).sort()).toEqual([
    'svg/bell.svg',
    'svg/bell_medium.svg',
  ])
  expect(Buffer.from(entries['svg/bell.svg']).toString()).toBe(svg())
  expect(Buffer.from(entries['svg/bell_medium.svg']).toString()).toBe(
    svg(24)
  )
})

it('skips unchanged inputs including timestamp-only changes', async () => {
  await generate()
  const before = await fs.stat(path.join(destDir, 'eufemia-icons.zip'))
  await fs.utimes(path.join(destDir, 'bell.svg'), new Date(), new Date())
  await generate()
  expect(buildAndroid).toHaveBeenCalledTimes(1)
  expect(
    (await fs.stat(path.join(destDir, 'eufemia-icons.zip'))).mtimeMs
  ).toBe(before.mtimeMs)
})

it('rebuilds for same-length SVG edits and removes deleted icons', async () => {
  await generate()
  await fs.writeFile(path.join(destDir, 'bell.svg'), svg(16, '#fff'))
  await generate()
  expect(buildAndroid).toHaveBeenCalledTimes(2)
  files.pop()
  await generate()
  const entries = unzipSync(
    await fs.readFile(path.join(destDir, 'eufemia-icons.zip'))
  )
  expect(Object.keys(entries)).toEqual(['svg/bell.svg'])
})

it('recreates byte-identical ZIPs without depending on file order', async () => {
  vi.useFakeTimers({ toFake: ['Date'] })
  try {
    vi.setSystemTime(new Date(2026, 0, 1))
    await generate()
    const zipFile = path.join(destDir, 'eufemia-icons.zip')
    const before = await fs.readFile(zipFile)
    await fs.unlink(zipFile)
    files.reverse()
    vi.setSystemTime(new Date(2027, 0, 1))
    await generate()
    expect(await fs.readFile(zipFile)).toEqual(before)
  } finally {
    vi.useRealTimers()
  }
})

it('repairs a missing categorized Android archive without rebuilding the ZIP', async () => {
  await generate()
  const zipFile = path.join(destDir, 'eufemia-icons.zip')
  const before = await fs.stat(zipFile)
  const categorizedFile = path.join(
    destDir,
    'eufemia-icons-xml-categorized.tgz'
  )
  await fs.unlink(categorizedFile)
  await generate()
  expect(buildAndroid).toHaveBeenCalledTimes(2)
  expect(await fs.pathExists(categorizedFile)).toBe(true)
  expect((await fs.stat(zipFile)).mtimeMs).toBe(before.mtimeMs)
})

it('rebuilds only Android packages for category changes', async () => {
  await generate()
  const before = await fs.stat(path.join(destDir, 'eufemia-icons.zip'))
  files[0].category = 'other'
  await generate()
  expect(buildAndroid).toHaveBeenCalledTimes(2)
  expect(
    (await fs.stat(path.join(destDir, 'eufemia-icons.zip'))).mtimeMs
  ).toBe(before.mtimeMs)
})

it('repairs missing downloads and does not cache failed generation', async () => {
  await generate()
  await fs.unlink(path.join(destDir, 'eufemia-icons-xml.tgz'))
  buildAndroid.mockImplementationOnce(async () => {
    await fs.writeFile(
      path.join(destDir, 'eufemia-icons-xml.tgz'),
      'partial'
    )
    throw new Error('conversion failed')
  })
  await expect(generate()).rejects.toThrow('conversion failed')
  await generate()
  expect(buildAndroid).toHaveBeenCalledTimes(3)
  await fs.unlink(path.join(destDir, 'eufemia-icons.zip'))
  await generate()
  expect(
    await fs.pathExists(path.join(destDir, 'eufemia-icons.zip'))
  ).toBe(true)
  expect(buildAndroid).toHaveBeenCalledTimes(3)
})
