import path from 'path'
import fs from 'fs'
import os from 'os'
import {
  findPathToScopeHash,
  getScopeHashFromFile,
} from '../plugin-utils.js'

describe('findPathToScopeHash', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-hash-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('should find scope-hash.txt in a parent directory', () => {
    const nestedDir = path.join(tmpDir, 'a', 'b')
    fs.mkdirSync(nestedDir, { recursive: true })
    fs.writeFileSync(path.join(tmpDir, 'a', 'scope-hash.txt'), 'hash')

    expect(findPathToScopeHash(path.join(nestedDir, 'style.css'))).toEqual(
      path.join(tmpDir, 'a')
    )
  })

  it('should return null if no scope-hash.txt is found', () => {
    const nestedDir = path.join(tmpDir, 'x', 'y')
    fs.mkdirSync(nestedDir, { recursive: true })

    expect(
      findPathToScopeHash(path.join(nestedDir, 'style.css'))
    ).toBeNull()
  })
})

describe('getScopeHashFromFile', () => {
  let tmpDir: string

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'scope-hash-test-'))
  })

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  })

  it('should read scope-hash.txt from the given directory', () => {
    fs.writeFileSync(path.join(tmpDir, 'scope-hash.txt'), 'test-hash-123')
    const result = getScopeHashFromFile(tmpDir)
    expect(result).toBe('test-hash-123')
  })

  it('should handle different directory paths', () => {
    const subDir = path.join(tmpDir, 'sub')
    fs.mkdirSync(subDir, { recursive: true })
    fs.writeFileSync(path.join(subDir, 'scope-hash.txt'), 'test-hash-123')
    const result = getScopeHashFromFile(subDir)
    expect(result).toBe('test-hash-123')
  })

  it('should return the exact content from the file', () => {
    fs.writeFileSync(
      path.join(tmpDir, 'scope-hash.txt'),
      'another-hash-456'
    )
    const result = getScopeHashFromFile(tmpDir)
    expect(result).toBe('another-hash-456')
  })
})
