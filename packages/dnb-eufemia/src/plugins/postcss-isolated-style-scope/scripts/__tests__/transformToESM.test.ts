import { sync } from 'globby'
import fs from 'fs-extra'
import { transform } from 'lebab'
import { transformFilesToESM } from '../transformToESM'

// Mock the dependencies
jest.mock('globby')
jest.mock('fs-extra')
jest.mock('lebab')

const mockSync = sync as jest.MockedFunction<typeof sync>
const mockReadFileSync = fs.readFileSync as jest.MockedFunction<
  typeof fs.readFileSync
>
const mockWriteFileSync = fs.writeFileSync as jest.MockedFunction<
  typeof fs.writeFileSync
>
const mockTransform = transform as jest.MockedFunction<typeof transform>

describe('transformToESM script', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    // Mock the transform function to return a simple transformed code
    mockTransform.mockReturnValue({
      code: 'transformed code',
      map: null,
      warnings: [],
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should use correct glob patterns with exceptions', () => {
    // Mock the sync function to return some test files
    mockSync.mockReturnValue([
      './build/es/plugins/test.js',
      './build/esm/plugins/helper.js',
    ])

    // Mock readFileSync to return test content
    mockReadFileSync.mockReturnValue("import('./test.cjs')")

    // Call the function
    transformFilesToESM()

    // Verify globby was called with correct patterns
    expect(mockSync).toHaveBeenCalledWith(
      ['./build/**/plugins/**/*.js', '!./build/cjs/plugins/**/*.js'],
      {
        onlyFiles: true,
      }
    )
  })

  it('should exclude files in build/cjs/plugins directory', () => {
    // Mock sync to return files including one that should be excluded
    mockSync.mockReturnValue([
      './build/es/plugins/test.js',
      './build/cjs/plugins/should-be-excluded.js', // This should be excluded
      './build/esm/plugins/helper.js',
    ])

    mockReadFileSync.mockReturnValue("import('./test.cjs')")

    transformFilesToESM()

    // Verify that the excluded file is not processed
    expect(mockSync).toHaveBeenCalledWith(
      expect.arrayContaining(['!./build/cjs/plugins/**/*.js']),
      expect.any(Object)
    )
  })

  it('should include files in other build subdirectories', () => {
    // Mock sync to return files in different build subdirectories
    mockSync.mockReturnValue([
      './build/es/plugins/test.js',
      './build/esm/plugins/helper.js',
      './build/umd/plugins/another.js',
    ])

    mockReadFileSync.mockReturnValue("import('./test.cjs')")

    transformFilesToESM()

    // Verify that files in other build subdirectories are included
    expect(mockSync).toHaveBeenCalledWith(
      expect.arrayContaining(['./build/**/plugins/**/*.js']),
      expect.any(Object)
    )
  })

  it('should transform .cjs references to .js', () => {
    const testFiles = ['./build/es/plugins/test.js']
    mockSync.mockReturnValue(testFiles)

    const originalCode = "import('./test.cjs'); require('./helper.cjs')"
    mockReadFileSync.mockReturnValue(originalCode)

    transformFilesToESM()

    // Verify that .cjs was replaced with .js
    expect(mockReadFileSync).toHaveBeenCalledWith(testFiles[0], 'utf8')
    expect(mockTransform).toHaveBeenCalledWith(
      "import('./test.js'); require('./helper.js')",
      ['commonjs']
    )
  })

  it('should process each file and write transformed content', () => {
    const testFiles = [
      './build/es/plugins/test.js',
      './build/esm/plugins/helper.js',
    ]
    mockSync.mockReturnValue(testFiles)

    mockReadFileSync
      .mockReturnValueOnce("import('./test.cjs')")
      .mockReturnValueOnce("require('./helper.cjs')")

    transformFilesToESM()

    // Verify each file was processed
    expect(mockReadFileSync).toHaveBeenCalledTimes(2)
    expect(mockWriteFileSync).toHaveBeenCalledTimes(2)

    expect(mockReadFileSync).toHaveBeenNthCalledWith(
      1,
      testFiles[0],
      'utf8'
    )
    expect(mockReadFileSync).toHaveBeenNthCalledWith(
      2,
      testFiles[1],
      'utf8'
    )

    expect(mockWriteFileSync).toHaveBeenNthCalledWith(
      1,
      testFiles[0],
      'transformed code',
      'utf8'
    )
    expect(mockWriteFileSync).toHaveBeenNthCalledWith(
      2,
      testFiles[1],
      'transformed code',
      'utf8'
    )
  })

  it('should handle empty file list', () => {
    mockSync.mockReturnValue([])

    transformFilesToESM()

    expect(mockReadFileSync).not.toHaveBeenCalled()
    expect(mockWriteFileSync).not.toHaveBeenCalled()
  })

  it('should handle files without .cjs references', () => {
    const testFiles = ['./build/es/plugins/test.js']
    mockSync.mockReturnValue(testFiles)

    const originalCode = "import('./test.js'); require('./helper.js')"
    mockReadFileSync.mockReturnValue(originalCode)

    transformFilesToESM()

    // Verify the code was still processed (no .cjs replacement needed)
    expect(mockTransform).toHaveBeenCalledWith(originalCode, ['commonjs'])
  })
})
