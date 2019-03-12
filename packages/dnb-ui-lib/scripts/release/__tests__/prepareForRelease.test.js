/**
 * Test Package JSON parsing
 *
 */

import packpath from 'packpath'
import fs from 'fs-extra'
import path from 'path'
import { cleanupPackage } from '../prepareForRelease'

describe('cleanupPackage', () => {
  it('gets preparered properly and have the expeted props', async () => {
    const filepath = path.resolve(packpath.self(), './package.json')
    const packageJsonString = await fs.readFile(filepath, 'utf-8')
    const cleanedPackage = await cleanupPackage({
      packageJsonString,
      filepath
    })
    const parsedJson = JSON.parse(cleanedPackage)

    expect(parsedJson).not.toHaveProperty('scripts')
    expect(parsedJson).not.toHaveProperty('devDependencies')
    expect(parsedJson).toHaveProperty('dependencies')
    expect(parsedJson).toHaveProperty('peerDependencies')
    expect(parsedJson.license).toBe('SEE LICENSE IN LICENSE FILE')
  })
})
