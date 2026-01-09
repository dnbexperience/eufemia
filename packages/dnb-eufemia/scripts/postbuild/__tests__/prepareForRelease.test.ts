/**
 * Test Package JSON parsing
 *
 */

import packpath from 'packpath'
import fs from 'fs-extra'
import path from 'path'
import { cleanupPackage } from '../prepareForRelease'

describe('cleanupPackage', () => {
  it('gets prepared properly and have the expected props', async () => {
    const filepath = path.resolve(packpath.self(), 'package.json')
    const packageString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageString,
    })

    expect(cleanedPackage).not.toHaveProperty('release')
    expect(cleanedPackage).not.toHaveProperty('scripts')
    expect(cleanedPackage).not.toHaveProperty('devDependencies')
    expect(cleanedPackage).toHaveProperty('dependencies')
    expect(cleanedPackage).toHaveProperty('peerDependencies')
    expect(cleanedPackage.license).toBe('SEE LICENSE IN LICENSE FILE')
  })
})

describe('package.json', () => {
  const packageJsonFile = path.resolve(
    packpath.self(),
    'build/package.json'
  )

  let packageJson: {
    [key: string]: string
  } = {}

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
