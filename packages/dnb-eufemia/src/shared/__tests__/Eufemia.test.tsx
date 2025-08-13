import React from 'react'
import { render } from '@testing-library/react'
import IsolatedStyleScope from '../IsolatedStyleScope'
import { getSha, getVersion } from '../build-info/BuildInfo.js'
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

// Mock the build info to control the SHA value in tests
jest.mock('../build-info/BuildInfo.js', () => {
  const actual = jest.requireActual('../build-info/BuildInfo.js')
  return {
    ...actual,
    getSha: jest.fn().mockImplementation(actual.getSha),
    getVersion: jest.fn().mockImplementation(actual.getVersion),
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

  describe('Eufemia.versions', () => {
    beforeEach(() => {
      init()
    })

    beforeEach(() => {
      jest.mocked(getSha).mockReturnValue('abc123')
      jest.mocked(getVersion).mockReturnValue('1.0.0')
    })

    it('should get CSS and JS versions', () => {
      window.__eufemiaVersions = ['1.2.3']
      window.__eufemiaSHAs = ['abc123']

      render(
        <>
          <style>
            {`
              .eufemia-scope--1_2_3 {
                --eufemia-version: 1.2.333;
              }
            `}
          </style>

          <IsolatedStyleScope scopeHash="eufemia-scope--1_2_3">
            content
          </IsolatedStyleScope>
        </>
      )

      expect(window.Eufemia.versions).toEqual([
        {
          js: '1.2.3',
          css: '1.2.333',
          sha: 'abc123',
        },
      ])
    })

    it('should get scopes with CSS and JS versions', () => {
      window.__eufemiaVersions = ['1.2.3', '2.8.9']
      window.__eufemiaSHAs = ['abc123', 'def456']

      // Mock the getSha to return every second call a different SHA
      let count = 0
      jest.mocked(getSha).mockImplementation(() => {
        return window.__eufemiaSHAs[(++count - 1) % 2]
      })

      render(
        <>
          <IsolatedStyleScope scopeHash="eufemia-scope--1_2_3">
            <style>
              {`
              .eufemia-scope--1_2_3 {
                --eufemia-version: 1.2.333;
                }
                `}
            </style>
          </IsolatedStyleScope>
          <IsolatedStyleScope scopeHash="eufemia-scope--2_8_9">
            <style>
              {`
              .eufemia-scope--2_8_9 {
                --eufemia-version: 2.8.999;
                }
                `}
            </style>
          </IsolatedStyleScope>
        </>
      )

      expect(window.Eufemia.versions).toEqual([
        {
          js: '1.2.3',
          css: '1.2.333',
          sha: 'abc123',
        },
        {
          js: '2.8.9',
          css: '2.8.999',
          sha: 'def456',
        },
      ])
    })
  })
})
