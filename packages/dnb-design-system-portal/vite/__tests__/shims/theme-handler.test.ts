import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getTheme,
  setTheme,
  getThemes,
  isValidTheme,
  useThemeHandler,
} from '../../client/shims/theme-handler'
import { renderHook, act } from '@testing-library/react'

describe('theme-handler shim', () => {
  beforeEach(() => {
    localStorage.clear()
    delete window.__applyEufemiaThemeStyles__
  })

  describe('getThemes', () => {
    it('returns available themes', () => {
      const themes = getThemes()
      expect(themes).toHaveProperty('ui')
      expect(themes).toHaveProperty('sbanken')
      expect(themes).toHaveProperty('eiendom')
      expect(themes).toHaveProperty('carnegie')
    })
  })

  describe('isValidTheme', () => {
    it('returns true for valid theme names', () => {
      expect(isValidTheme('ui')).toBe(true)
      expect(isValidTheme('sbanken')).toBe(true)
    })

    it('returns false for invalid theme names', () => {
      expect(isValidTheme('nonexistent')).toBe(false)
      expect(isValidTheme('')).toBe(false)
    })
  })

  describe('getTheme', () => {
    it('returns default theme when nothing is stored', () => {
      const theme = getTheme()
      expect(theme.name).toBe('ui')
    })

    it('reads theme from localStorage', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ name: 'sbanken' })
      )

      const theme = getTheme()
      expect(theme.name).toBe('sbanken')
    })

    it('falls back to default for invalid stored theme', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ name: 'invalid-theme' })
      )

      const theme = getTheme()
      expect(theme.name).toBe('ui')
    })

    it('reads theme from query parameter', () => {
      const originalSearch = window.location.search
      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: '?eufemia-theme=eiendom' },
        writable: true,
      })

      const theme = getTheme()
      expect(theme.name).toBe('eiendom')

      Object.defineProperty(window, 'location', {
        value: { ...window.location, search: originalSearch },
        writable: true,
      })
    })

    it('preserves additional stored properties like colorScheme', () => {
      localStorage.setItem(
        'eufemia-theme',
        JSON.stringify({ name: 'ui', colorScheme: 'dark' })
      )

      const theme = getTheme()
      expect(theme.name).toBe('ui')
      expect(theme.colorScheme).toBe('dark')
    })
  })

  describe('setTheme', () => {
    it('saves theme to localStorage', () => {
      setTheme({ name: 'sbanken' })

      const stored = JSON.parse(
        localStorage.getItem('eufemia-theme') || '{}'
      )
      expect(stored.name).toBe('sbanken')
    })

    it('does not save invalid theme names', () => {
      setTheme({ name: 'nonexistent' as never })

      const stored = localStorage.getItem('eufemia-theme')
      expect(stored).toBeNull()
    })

    it('calls __applyEufemiaThemeStyles__ when available', () => {
      const applyFn = vi.fn()
      window.__applyEufemiaThemeStyles__ = applyFn

      setTheme({ name: 'eiendom' })
      expect(applyFn).toHaveBeenCalledWith('eiendom')
    })

    it('invokes the callback with the new theme', () => {
      const callback = vi.fn()
      setTheme({ name: 'sbanken' }, callback)

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'sbanken' })
      )
    })
  })

  describe('useThemeHandler', () => {
    it('returns the current theme', () => {
      const { result } = renderHook(() => useThemeHandler())
      expect(result.current.name).toBe('ui')
      expect(typeof result.current.setTheme).toBe('function')
    })

    it('updates theme ref when setTheme is called', () => {
      const { result } = renderHook(() => useThemeHandler())

      act(() => {
        result.current.setTheme({ name: 'sbanken' })
      })

      // The ref is updated but no React re-render is triggered.
      // The theme change is reflected in localStorage and getTheme().
      expect(getTheme().name).toBe('sbanken')
    })

    it('calls __applyEufemiaThemeStyles__ on mount', () => {
      const applyFn = vi.fn()
      window.__applyEufemiaThemeStyles__ = applyFn

      renderHook(() => useThemeHandler())
      expect(applyFn).toHaveBeenCalledWith('ui')
    })
  })
})
