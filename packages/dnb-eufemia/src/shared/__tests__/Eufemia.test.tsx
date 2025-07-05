import * as EufemiaImport from '../Eufemia'
import '../component-helper'

const { version, sha, init } = EufemiaImport

jest.mock('../Eufemia', () => {
  const actual = jest.requireActual('../Eufemia')
  return {
    ...actual,
    init: jest.fn(actual.init),
  }
})

describe('Eufemia', () => {
  beforeEach(() => {
    delete window.Eufemia
    delete window.__eufemiaVersions
    delete window.__eufemiaSHAs
  })

  describe('component-helper', () => {
    it('should call init on component-helper', () => {
      expect(init).toHaveBeenCalledTimes(1)
    })
  })

  describe('init', () => {
    it('should initialize Eufemia on window object', () => {
      init()
      expect(window.Eufemia).toBeDefined()
    })

    it('should not initialize Eufemia when window is undefined', () => {
      const originalWindow = global.window
      delete global.window

      init()
      expect(global.window).toBeUndefined()

      global.window = originalWindow
    })
  })

  describe('Eufemia "versions" and "shas"', () => {
    it('should handle multiple different versions', () => {
      {
        init()
        expect(window.__eufemiaVersions).toEqual(['__VERSION__'])
        window.__eufemiaVersions = ['1.0.0'] // Do this as we are not able to mock the correct value when the class constructor gets called
      }

      {
        init()
        expect(window.__eufemiaVersions).toEqual(['1.0.0', '__VERSION__'])
      }
    })

    it('should handle multiple different "shas"', () => {
      {
        init()
        expect(window.__eufemiaSHAs).toEqual(['__SHA__'])
        window.__eufemiaSHAs = ['abc123'] // Do this as we are not able to mock the correct value when the class constructor gets called
      }

      {
        init()
        expect(window.__eufemiaSHAs).toEqual(['abc123', '__SHA__'])
      }
    })
  })

  describe('Eufemia.version', () => {
    beforeEach(() => {
      init()
    })

    it('should export version constant', () => {
      expect(version).toBeDefined()
    })

    it('should have version getter', () => {
      expect(window.Eufemia?.version).toBe(version)
    })
  })

  describe('Eufemia.sha', () => {
    beforeEach(() => {
      init()
    })

    it('should export sha constant', () => {
      expect(sha).toBeDefined()
    })

    it('should have sha getter', () => {
      expect(window.Eufemia?.sha).toBe(sha)
    })
  })

  describe('Eufemia.versions', () => {
    beforeEach(() => {
      init()
    })

    it('should initialize versions array on first access', () => {
      expect(window.__eufemiaVersions).toEqual(['__VERSION__'])
      const versions = window.Eufemia?.versions
      expect(versions).toEqual([version])
      expect(window.__eufemiaVersions).toEqual([version])
    })

    it('should not add duplicate versions', () => {
      const versions1 = window.Eufemia?.versions
      const versions2 = window.Eufemia?.versions
      expect(versions1).toEqual([version])
      expect(versions2).toEqual([version])
      expect(window.__eufemiaVersions?.length).toBe(1)
    })
  })

  describe('Eufemia.shas', () => {
    beforeEach(() => {
      init()
    })

    it('should initialize shas array on first access', () => {
      expect(window.__eufemiaSHAs).toEqual(['__SHA__'])
      const shas = window.Eufemia?.shas
      expect(shas).toEqual([sha])
      expect(window.__eufemiaSHAs).toEqual([sha])
    })

    it('should not add duplicate shas', () => {
      const shas1 = window.Eufemia?.shas
      const shas2 = window.Eufemia?.shas
      expect(shas1).toEqual([sha])
      expect(shas2).toEqual([sha])
      expect(window.__eufemiaSHAs?.length).toBe(1)
    })
  })
})
