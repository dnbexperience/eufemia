import React from 'react'
import { render } from '@testing-library/react'
import {
  getHeadScript,
  getBodyScript,
  getContentScript,
  ColorSchemeHeadScript,
  ColorSchemeBodyFirstScript,
  ColorSchemeBodyLastScript,
} from '../ColorSchemeScript'

describe('ColorSchemeScript', () => {
  describe('getHeadScript', () => {
    it('returns a script that reads from localStorage', () => {
      const script = getHeadScript('my-scope')
      expect(script).toContain("localStorage.getItem('eufemia-theme')")
    })

    it('includes the scope hash', () => {
      const script = getHeadScript('my-scope')
      expect(script).toContain("classList.add('my-scope')")
    })

    it('resolves auto color scheme via matchMedia', () => {
      const script = getHeadScript('my-scope')
      expect(script).toContain('prefers-color-scheme:dark')
    })

    it('stores the resolved scheme on globalThis', () => {
      const script = getHeadScript('my-scope')
      expect(script).toContain('globalThis.__eufemiaColorScheme=s')
    })

    it('uses getStyleScopeHash as default when no scopeHash is given', () => {
      const script = getHeadScript()
      expect(script).toContain("classList.add('eufemia-scope--")
    })
  })

  describe('getBodyScript', () => {
    it('reads from globalThis', () => {
      const script = getBodyScript()
      expect(script).toContain('globalThis.__eufemiaColorScheme')
    })

    it('adds color-scheme class to body', () => {
      const script = getBodyScript()
      expect(script).toContain(
        "document.body.classList.add('eufemia-theme__color-scheme--'"
      )
    })
  })

  describe('getContentScript', () => {
    it('reads from globalThis', () => {
      const script = getContentScript()
      expect(script).toContain('globalThis.__eufemiaColorScheme')
    })

    it('swaps light to dark classes', () => {
      const script = getContentScript()
      expect(script).toContain('querySelectorAll')
      expect(script).toContain('classList.remove')
      expect(script).toContain('classList.add')
    })

    it('skips when scheme is light', () => {
      const script = getContentScript()
      expect(script).toContain("s!=='light'")
    })
  })

  describe('script execution', () => {
    afterEach(() => {
      delete globalThis.__eufemiaColorScheme
      document.documentElement.className = ''
      document.body.className = ''
    })

    it('head script resolves dark from localStorage', () => {
      const storageMock = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(JSON.stringify({ colorScheme: 'dark' }))

      eval(getHeadScript('test-scope'))

      expect(
        document.documentElement.classList.contains('test-scope')
      ).toBe(true)
      expect(globalThis.__eufemiaColorScheme).toBe('dark')

      storageMock.mockRestore()
    })

    it('head script resolves auto via matchMedia', () => {
      const storageMock = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(JSON.stringify({ colorScheme: 'system' }))

      const matchMediaOriginal = window.matchMedia
      window.matchMedia = jest.fn().mockReturnValue({ matches: true })

      eval(getHeadScript('test-scope'))

      expect(globalThis.__eufemiaColorScheme).toBe('dark')

      window.matchMedia = matchMediaOriginal
      storageMock.mockRestore()
    })

    it('head script resolves light when matchMedia does not match', () => {
      const storageMock = jest
        .spyOn(Storage.prototype, 'getItem')
        .mockReturnValue(JSON.stringify({}))

      const matchMediaOriginal = window.matchMedia
      window.matchMedia = jest.fn().mockReturnValue({ matches: false })

      eval(getHeadScript('test-scope'))

      expect(globalThis.__eufemiaColorScheme).toBe('light')

      window.matchMedia = matchMediaOriginal
      storageMock.mockRestore()
    })

    it('body script adds color-scheme class to body', () => {
      globalThis.__eufemiaColorScheme = 'dark'

      eval(getBodyScript())

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--dark'
        )
      ).toBe(true)
    })

    it('body script does nothing when no scheme is set', () => {
      eval(getBodyScript())

      expect(document.body.className).toBe('')
    })

    it('content script swaps light to dark on elements', () => {
      globalThis.__eufemiaColorScheme = 'dark'

      const el = document.createElement('div')
      el.classList.add('eufemia-theme__color-scheme--light')
      document.body.appendChild(el)

      eval(getContentScript())

      expect(
        el.classList.contains('eufemia-theme__color-scheme--dark')
      ).toBe(true)
      expect(
        el.classList.contains('eufemia-theme__color-scheme--light')
      ).toBe(false)

      document.body.removeChild(el)
    })

    it('content script does nothing when scheme is light', () => {
      globalThis.__eufemiaColorScheme = 'light'

      const el = document.createElement('div')
      el.classList.add('eufemia-theme__color-scheme--light')
      document.body.appendChild(el)

      eval(getContentScript())

      expect(
        el.classList.contains('eufemia-theme__color-scheme--light')
      ).toBe(true)

      document.body.removeChild(el)
    })
  })

  describe('React components', () => {
    it('ColorSchemeHeadScript renders a script tag', () => {
      render(<ColorSchemeHeadScript scopeHash="test-scope" />)

      const script = document.querySelector('script')
      expect(script).toBeInTheDocument()
      expect(script.textContent).toContain("classList.add('test-scope')")
    })

    it('ColorSchemeBodyFirstScript renders a script tag', () => {
      render(<ColorSchemeBodyFirstScript />)

      const script = document.querySelector('script')
      expect(script).toBeInTheDocument()
      expect(script.textContent).toContain('document.body.classList')
    })

    it('ColorSchemeBodyLastScript renders a script tag', () => {
      render(<ColorSchemeBodyLastScript />)

      const script = document.querySelector('script')
      expect(script).toBeInTheDocument()
      expect(script.textContent).toContain('querySelectorAll')
    })
  })
})
