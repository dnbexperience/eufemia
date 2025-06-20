import * as BuildInfoJs from '../plugin-scope-hash.js'
import * as BuildInfoCjs from '../plugin-scope-hash.cjs'
import * as BuildInfoModule from '../../../shared/build-info/BuildInfo.js'
import * as BuildInfoCjsModule from '../../../shared/build-info/BuildInfo.cjs'
import { getStyleScopeHash } from '../plugin-scope-hash.js'

jest.mock('../../../shared/build-info/BuildInfo.js', () => ({
  getVersion: jest.fn(),
  getSha: jest.fn(),
}))

jest.mock('../../../shared/build-info/BuildInfo.cjs', () => ({
  getVersion: jest.fn(),
  getSha: jest.fn(),
}))

describe('getStyleScopeHash', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should have named export in entry file', async () => {
    expect(typeof getStyleScopeHash).toBe('function')
  })

  it.each([
    ['ESM', BuildInfoJs],
    ['CommonJS', BuildInfoCjs],
  ])('should export getStyleScopeHash function (%s)', (_, module) => {
    expect(module.getStyleScopeHash).toBeDefined()
    expect(typeof module.getStyleScopeHash).toBe('function')
  })

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])(
    'should return default scope when version has no numbers or slashes (%s)',
    (_, module) => {
      expect(module.getStyleScopeHash()).toBe('eufemia-scope--default')
    }
  )

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])(
    'should return slugified scope for version numbers (%s)',
    (_, module, buildInfo) => {
      jest.mocked(buildInfo.getVersion).mockReturnValue('1.2.3' as any)
      expect(module.getStyleScopeHash()).toBe('eufemia-scope--1_2_3')
    }
  )

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])(
    'should use SHA when version is a branch name (%s)',
    (_, module, buildInfo) => {
      jest
        .mocked(buildInfo.getVersion)
        .mockReturnValue('feature/branch' as any)
      jest.mocked(buildInfo.getSha).mockReturnValue('abc123' as any)
      expect(module.getStyleScopeHash()).toBe('eufemia-scope--abc123')
    }
  )

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])('should use provided version from options (%s)', (_, module) => {
    expect(module.getStyleScopeHash({ version: '2.0.0' })).toBe(
      'eufemia-scope--2_0_0'
    )
  })

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])(
    'should use provided SHA when version is a branch name (%s)',
    (_, module) => {
      expect(
        module.getStyleScopeHash({
          version: 'feature/new-branch',
          sha: 'def456',
        })
      ).toBe('eufemia-scope--def456')
    }
  )

  it.each([
    ['ESM', BuildInfoJs, BuildInfoModule],
    ['CommonJS', BuildInfoCjs, BuildInfoCjsModule],
  ])(
    'should fall back to default scope when provided version has no numbers or slashes (%s)',
    (_, module) => {
      expect(module.getStyleScopeHash({ version: 'stable' })).toBe(
        'eufemia-scope--default'
      )
    }
  )
})
