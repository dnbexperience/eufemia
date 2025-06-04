import * as BuildInfo from '../BuildInfo.cjs'

// Mock the info file
const mockJson = {
  version: '__VERSION__',
  sha: '__SHA__',
}

jest.mock('../BuildInfo.js', () => mockJson)

describe('BuildInfo', () => {
  describe('version and sha', () => {
    it('should export version and sha functions', () => {
      expect(typeof BuildInfo.getVersion).toBe('function')
      expect(typeof BuildInfo.getSha).toBe('function')
    })

    it('should return version and sha from info', () => {
      expect(BuildInfo.getVersion()).toBe('__VERSION__')
      expect(BuildInfo.getSha()).toBe('__SHA__')
    })
  })

  describe('getStyleScopeHash', () => {
    it('should export getStyleScopeHash function', () => {
      expect(BuildInfo.getStyleScopeHash).toBeDefined()
      expect(typeof BuildInfo.getStyleScopeHash).toBe('function')
    })

    it('should return default scope when version has no numbers or slashes', () => {
      expect(BuildInfo.getStyleScopeHash()).toBe('eufemia-default-scope')
    })

    it('should return slugified scope when version contains numbers or slashes', () => {
      // Update the mock json
      mockJson.version = '1.2.3'
      mockJson.sha = 'abc123'

      expect(BuildInfo.getStyleScopeHash()).toBe('v-123-abc123')

      // Restore original values
      mockJson.version = '__VERSION__'
      mockJson.sha = '__SHA__'
    })
  })
})
