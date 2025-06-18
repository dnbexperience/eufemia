import path from 'path'
import * as fs from 'fs'
import {
  findPathToScopeHash,
  getScopeHashFromFile,
} from '../plugin-utils.js'

jest.mock('fs', () => ({
  existsSync: jest.fn(),
  readFileSync: jest.fn(),
}))

describe('findPathToScopeHash', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'existsSync').mockImplementation((filePath) => {
      // Check if the path ends with scope-hash.txt and is in the expected directory
      const pathStr = String(filePath)
      return (
        pathStr.endsWith('scope-hash.txt') &&
        (pathStr.includes('/a/b/c/d/') || pathStr.includes('a/b/c/d/'))
      )
    })
  })
  afterEach(() => jest.restoreAllMocks())

  it('should find scope-hash.txt in a parent directory', () => {
    expect(findPathToScopeHash('/a/b/c/d/style.css')).toEqual(
      path.join('/', 'a', 'b', 'c', 'd')
    )
  })

  it('should return null if no scope-hash.txt is found', () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false)
    expect(findPathToScopeHash('/foo/bar/style.css')).toBeNull()
  })
})

describe('getScopeHashFromFile', () => {
  beforeEach(() => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('test-hash-123')
  })
  afterEach(() => jest.restoreAllMocks())

  it('should read scope-hash.txt from the given directory', () => {
    const result = getScopeHashFromFile('/path/to/scope/dir')
    expect(result).toBe('test-hash-123')
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('/path/to/scope/dir', 'scope-hash.txt'),
      'utf-8'
    )
  })

  it('should handle different directory paths', () => {
    const result = getScopeHashFromFile('./relative/path')
    expect(result).toBe('test-hash-123')
    expect(fs.readFileSync).toHaveBeenCalledWith(
      path.join('./relative/path', 'scope-hash.txt'),
      'utf-8'
    )
  })

  it('should return the exact content from the file', () => {
    jest.spyOn(fs, 'readFileSync').mockReturnValue('another-hash-456')
    const result = getScopeHashFromFile('/some/dir')
    expect(result).toBe('another-hash-456')
  })
})
