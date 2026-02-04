import * as BuildInfo from '../BuildInfo'

describe('BuildInfo', () => {
  describe('version, sha and buildDate', () => {
    it('should export version, sha and buildDate functions', () => {
      expect(typeof BuildInfo.getVersion).toBe('function')
      expect(typeof BuildInfo.getSha).toBe('function')
      expect(typeof BuildInfo.getBuildDate).toBe('function')
    })

    it('should return version, sha and buildDate from info', () => {
      expect(BuildInfo.getVersion()).toBe('__VERSION__')
      expect(BuildInfo.getSha()).toBe('__SHA__')
      expect(BuildInfo.getBuildDate()).toBe('__BUILD_DATE__')
    })
  })
})
