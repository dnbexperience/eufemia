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
    const filepath = path.resolve(packpath.self(), 'package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
      filepath,
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
    const mockFile = './__mocks__/version.mock'
    await writeLibVersion({
      destPath: __dirname,
      files: [mockFile],
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

describe('package.json', () => {
  const packageJsonFile = path.resolve(
    packpath.self(),
    'build/package.json'
  )

  let packageJson = {}

  beforeAll(async () => {
    packageJson = await fs.readJson(path.resolve(packageJsonFile))
  })

  it('exists inside build', () => {
    expect(fs.existsSync(path.resolve(packageJsonFile))).toBeTruthy()
  })

  it('has type="module"', () => {
    expect(packageJson.type).toBe('module')
  })

  it('has not these deleted fields', () => {
    expect(packageJson.release).toBeFalsy()
    expect(packageJson.scripts).toBeFalsy()
    expect(packageJson.devDependencies).toBeFalsy()
    expect(packageJson.resolutions).toBeFalsy()
    expect(packageJson.volta).toBeFalsy()
  })

  it('has sideEffects fields', () => {
    expect(packageJson.sideEffects).toEqual(
      expect.arrayContaining([
        '*.scss',
        'umd/*',
        'style/**/*',
        'es/style/**/*',
        'esm/style/**/*',
      ])
    )
  })

  it('has peerDependencies', () => {
    expect(packageJson.peerDependencies).toEqual(
      expect.objectContaining({
        react: expect.anything(),
        'react-dom': expect.anything(),
      })
    )
  })

  it('has main and module fields to be equal', () => {
    expect(packageJson.main).toBe('./index.js')
    expect(packageJson.module).toBe('./index.js')
    expect(packageJson.typings).toBe('./index.d.ts')
  })

  it('has publishConfig', () => {
    expect(packageJson.publishConfig).toEqual(
      expect.objectContaining({ access: 'public' })
    )
  })
})
