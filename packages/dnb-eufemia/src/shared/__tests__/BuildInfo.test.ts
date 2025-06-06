import * as BuildInfo from '../BuildInfo.cjs'

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
})
