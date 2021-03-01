/**
 * Test Package JSON parsing
 *
 */

import packpath from 'packpath'
import fs from 'fs-extra'
import path from 'path'
import { cleanupPackage, writeLibVersion } from '../prepareForRelease'

describe('cleanupPackage', () => {
  it('gets preparered properly and have the expeted props', async () => {
    const filepath = path.resolve(packpath.self(), './package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
      filepath
    })
    const parsedJson = JSON.parse(cleanedPackage)

    expect(parsedJson).not.toHaveProperty('release')
    expect(parsedJson).not.toHaveProperty('scripts')
    expect(parsedJson).not.toHaveProperty('devDependencies')
    expect(parsedJson).toHaveProperty('dependencies')
    expect(parsedJson).toHaveProperty('peerDependencies')
    expect(parsedJson.license).toBe('SEE LICENSE IN LICENSE FILE')
  })
})

describe('writeLibVersion', () => {
  it('should write package version in to given files', async () => {
    // const fs = jest.createMockFromModule('fs')

    const mockFile = './__mocks__/version.mock'
    await writeLibVersion({
      destPath: __dirname,
      files: [mockFile]
    })
    const filepath = path.resolve(__dirname, mockFile)
    const content = await fs.readFile(filepath, 'utf-8')

    await fs.writeFile(filepath, '')

    expect(content).toEqual(
      expect.stringContaining(`
if(typeof window !== 'undefined'){
  window.Eufemia = window.Eufemia || {};
  window.Eufemia.version = '0.0.0-development';
}
`)
    )
  })
})
