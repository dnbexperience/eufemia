import fs from 'fs-extra'
import os from 'node:os'
import path from 'node:path'
import { execFile, type ChildProcess } from 'node:child_process'
import { list } from 'tar'
import { createXMLTarBundles } from '../assetsExtractors'

vi.mock('node:child_process', () => ({ execFile: vi.fn() }))

let destDir: string
const files = [{ name: 'bell', iconFile: 'bell.svg', category: 'objects' }]
const generate = () =>
  createXMLTarBundles({ destDir, listOfProcessedFiles: files })

beforeEach(async () => {
  destDir = await fs.mkdtemp(path.join(os.tmpdir(), 'android-icons-'))
  vi.mocked(execFile).mockImplementation(
    (file, args, options, callback) => {
      fs.writeFileSync(path.join(destDir, 'bell.xml'), '<vector/>')
      callback(null, '', '')
      return {} as ChildProcess
    }
  )
})
afterEach(async () => {
  await fs.remove(destDir)
})

it('packages only current XML files in flat and categorized archives', async () => {
  await fs.writeFile(path.join(destDir, 'obsolete.xml'), '<vector/>')
  await generate()
  for (const [file, expected] of [
    ['eufemia-icons-xml.tgz', 'bell.xml'],
    ['eufemia-icons-xml-categorized.tgz', 'objects/bell.xml'],
  ]) {
    const entries: string[] = []
    await list({
      file: path.join(destDir, file),
      onReadEntry: (entry) => {
        entries.push(entry.path)
      },
    })
    expect(entries).toEqual([expected])
  }
  expect(await fs.pathExists(path.join(destDir, 'bell.xml'))).toBe(false)
  expect(await fs.pathExists(path.join(destDir, 'objects'))).toBe(false)
})

it('rejects failed conversions and missing output instead of using stale XML', async () => {
  await fs.writeFile(path.join(destDir, 'bell.xml'), '<stale/>')
  vi.mocked(execFile).mockImplementation(
    (file, args, options, callback) => {
      callback(null, '', '')
      return {} as ChildProcess
    }
  )
  await expect(generate()).rejects.toThrow()
  expect(await fs.pathExists(path.join(destDir, 'bell.xml'))).toBe(false)
  vi.mocked(execFile).mockImplementation(
    (file, args, options, callback) => {
      fs.writeFileSync(path.join(destDir, 'bell.xml'), '<partial/>')
      callback(new Error('conversion failed'), '', '')
      return {} as ChildProcess
    }
  )
  await expect(generate()).rejects.toThrow('conversion failed')
  expect(await fs.pathExists(path.join(destDir, 'bell.xml'))).toBe(false)
})
