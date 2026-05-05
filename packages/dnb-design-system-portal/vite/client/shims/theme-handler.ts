/**
 * Port of gatsby-plugin-eufemia-theme-handler for Vite.
 *
 * Provides the same runtime API: useThemeHandler, getTheme, setTheme, etc.
 * Theme switching works via the `data-dnb-theme` attribute on <html>,
 * which Eufemia's SCSS theme files already respond to.
 *
 * All theme CSS is already loaded by vite-plugin-eufemia-theme,
 * so switching only requires updating localStorage + the HTML attribute.
 */

import { useState, useEffect, useCallback } from 'react'

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Window {
    __applyEufemiaThemeStyles__?: (themeName: string) => void
    __loadEufemiaTheme?: (themeName: string) => Promise<unknown>
    __EUFEMIA_THEME_FILES__?: Record<string, string[]>
    __EUFEMIA_THEME_NAMES__?: string[]
    __EUFEMIA_DEFAULT_THEME__?: string
  }
}

const STORAGE_KEY = 'eufemia-theme'
const DEFAULT_THEME = 'ui'

const availableThemes: Record<string, { name: string }> = {
  ui: { name: 'DNB' },
  sbanken: { name: 'Sbanken (WIP)' },
  eiendom: { name: 'DNB Eiendom' },
  carnegie: { name: 'DNB Carnegie (WIP)' },
}

const themeNames = Object.keys(availableThemes)

export type ThemeState = {
  name: string
  colorScheme?: string
}

// Simple event emitter for cross-component theme updates
type Listener = (theme: ThemeState) => void
const listeners = new Set<Listener>()

function emit(theme: ThemeState) {
  listeners.forEach((fn) => fn(theme))
}

export function getThemes() {
  return availableThemes
}

export function isValidTheme(name: string) {
  return themeNames.includes(name)
}

export function getTheme(): ThemeState {
  if (typeof window === 'undefined') {
    return { name: DEFAULT_THEME }
  }

  try {
    const data = window.localStorage.getItem(STORAGE_KEY)
    const stored = JSON.parse(data?.startsWith('{') ? data : '{}')

    // Also allow ?eufemia-theme=<name> query param
    const regex = /.*eufemia-theme=([^&]*).*/
    const query = window.location.search
    const fromQuery =
      (regex.test(query) && query?.replace(regex, '$1')) || null

    const themeName = fromQuery || stored?.name || DEFAULT_THEME

    if (!isValidTheme(themeName)) {
      return { name: DEFAULT_THEME }
    }

    return { ...stored, name: themeName }
  } catch {
    return { name: DEFAULT_THEME }
  }
}

export function setTheme(
  themeProps: Partial<ThemeState>,
  callback?: (theme: ThemeState) => void
) {
  const theme = { ...getTheme(), ...themeProps }

  if (!isValidTheme(theme.name)) {
    return // stop here
  }

  const applyAndNotify = () => {
    // Dev mode: toggle style.disabled on <style> elements
    if (
      typeof window !== 'undefined' &&
      window.__applyEufemiaThemeStyles__
    ) {
      window.__applyEufemiaThemeStyles__(theme.name)
    }

    // Update body color-scheme class so CSS responds immediately
    if (typeof document !== 'undefined' && theme.colorScheme) {
      const resolved =
        theme.colorScheme === 'auto'
          ? window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          : theme.colorScheme
      document.body.classList.remove(
        'eufemia-theme__color-scheme--dark',
        'eufemia-theme__color-scheme--light'
      )
      document.body.classList.add(
        `eufemia-theme__color-scheme--${resolved}`
      )
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(theme))
    } catch {
      // ignore
    }

    emit(theme)
    callback?.(theme)
  }

  // Build mode: lazy-load theme CSS before applying
  if (typeof window !== 'undefined' && window.__loadEufemiaTheme) {
    window.__loadEufemiaTheme(theme.name).then(applyAndNotify)
  } else {
    applyAndNotify()
  }
}

export function useThemeHandler() {
  const [theme, setThemeState] = useState<ThemeState>(getTheme)

  useEffect(() => {
    // Apply the initial theme styles.
    // In build mode, lazy-load non-default theme CSS first.
    const applyInitial = () => {
      if (window.__applyEufemiaThemeStyles__) {
        window.__applyEufemiaThemeStyles__(theme.name)
      }
    }

    if (window.__loadEufemiaTheme) {
      window.__loadEufemiaTheme(theme.name).then(applyInitial)
    } else {
      applyInitial()
    }
    // Only run on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const listener: Listener = (newTheme) => {
      setThemeState(newTheme)
    }
    listeners.add(listener)

    return () => {
      listeners.delete(listener)
    }
  }, [])

  const handleSetTheme = useCallback(
    (props: Partial<ThemeState>) => setTheme(props),
    []
  )

  return { ...theme, setTheme: handleSetTheme }
}
