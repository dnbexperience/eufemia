import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, it, expect, beforeEach } from 'vitest'

describe('index.html body class', () => {
  it('has dnb-page-background on <body> for dark mode background', () => {
    const html = readFileSync(
      resolve(__dirname, '../client/index.html'),
      'utf-8'
    )
    expect(html).toMatch(/<body[^>]*class="[^"]*dnb-page-background[^"]*"/)
  })
})

describe('color scheme FOUC prevention', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.className = ''
    document.body.className = ''
    delete (globalThis as Record<string, unknown>).__eufemiaColorScheme

    // jsdom doesn't implement matchMedia — provide a minimal stub
    window.matchMedia = (query: string) =>
      ({
        matches: query === '(prefers-color-scheme:dark)' ? false : false,
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
      }) as unknown as MediaQueryList
  })

  describe('head script', () => {
    it('adds scope hash class to <html> and sets color scheme', () => {
      // Simulate the inline head script
      ;(function () {
        try {
          const t = JSON.parse(
            localStorage.getItem('eufemia-theme') || '{}'
          )
          let s = t.colorScheme
          if (s === 'auto' || !s) {
            s = matchMedia('(prefers-color-scheme:dark)').matches
              ? 'dark'
              : 'light'
          }
          document.documentElement.classList.add('eufemia-scope--portal')
          if (s) {
            ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
              s
          }
        } catch (e) {
          // ignore
        }
      })()

      expect(
        document.documentElement.classList.contains(
          'eufemia-scope--portal'
        )
      ).toBe(true)
      // jsdom matchMedia returns false by default, so 'light'
      expect(
        (globalThis as Record<string, unknown>).__eufemiaColorScheme
      ).toBe('light')
    })

    it('resolves dark scheme from localStorage', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ colorScheme: 'dark' })
      )
      ;(function () {
        try {
          const t = JSON.parse(
            localStorage.getItem('eufemia-theme') || '{}'
          )
          let s = t.colorScheme
          if (s === 'auto' || !s) {
            s = matchMedia('(prefers-color-scheme:dark)').matches
              ? 'dark'
              : 'light'
          }
          document.documentElement.classList.add('eufemia-scope--portal')
          if (s) {
            ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
              s
          }
        } catch (e) {
          // ignore
        }
      })()

      expect(
        (globalThis as Record<string, unknown>).__eufemiaColorScheme
      ).toBe('dark')
    })

    it('resolves light scheme from localStorage', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ colorScheme: 'light' })
      )
      ;(function () {
        try {
          const t = JSON.parse(
            localStorage.getItem('eufemia-theme') || '{}'
          )
          let s = t.colorScheme
          if (s === 'auto' || !s) {
            s = matchMedia('(prefers-color-scheme:dark)').matches
              ? 'dark'
              : 'light'
          }
          document.documentElement.classList.add('eufemia-scope--portal')
          if (s) {
            ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
              s
          }
        } catch (e) {
          // ignore
        }
      })()

      expect(
        (globalThis as Record<string, unknown>).__eufemiaColorScheme
      ).toBe('light')
    })

    it('falls back to system preference when colorScheme is auto', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ colorScheme: 'auto' })
      )
      ;(function () {
        try {
          const t = JSON.parse(
            localStorage.getItem('eufemia-theme') || '{}'
          )
          let s = t.colorScheme
          if (s === 'auto' || !s) {
            s = matchMedia('(prefers-color-scheme:dark)').matches
              ? 'dark'
              : 'light'
          }
          document.documentElement.classList.add('eufemia-scope--portal')
          if (s) {
            ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
              s
          }
        } catch (e) {
          // ignore
        }
      })()

      // jsdom's matchMedia returns false by default, so it should be 'light'
      expect(
        (globalThis as Record<string, unknown>).__eufemiaColorScheme
      ).toBe('light')
    })
  })

  describe('body script', () => {
    it('adds color-scheme class to <body>', () => {
      ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
        'dark'

      // Simulate the inline body script
      ;(function () {
        const s = (globalThis as Record<string, unknown>)
          .__eufemiaColorScheme as string
        if (s) {
          document.body.classList.add('eufemia-theme__color-scheme--' + s)
        }
      })()

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--dark'
        )
      ).toBe(true)
    })

    it('adds light color-scheme class to <body>', () => {
      ;(globalThis as Record<string, unknown>).__eufemiaColorScheme =
        'light'
      ;(function () {
        const s = (globalThis as Record<string, unknown>)
          .__eufemiaColorScheme as string
        if (s) {
          document.body.classList.add('eufemia-theme__color-scheme--' + s)
        }
      })()

      expect(
        document.body.classList.contains(
          'eufemia-theme__color-scheme--light'
        )
      ).toBe(true)
    })

    it('does nothing when no color scheme is set', () => {
      delete (globalThis as Record<string, unknown>).__eufemiaColorScheme
      ;(function () {
        const s = (globalThis as Record<string, unknown>)
          .__eufemiaColorScheme as string
        if (s) {
          document.body.classList.add('eufemia-theme__color-scheme--' + s)
        }
      })()

      expect(document.body.className).toBe('')
    })
  })
})
