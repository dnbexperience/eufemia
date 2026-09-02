/**
 * Runtime theme handler used by the portal.
 *
 * Provides the same runtime API: useThemeHandler, getTheme, setTheme, etc.
 * Theme switching works via the `data-dnb-theme` attribute on <html>,
 * which Eufemia's SCSS theme files already respond to.
 *
 * All theme CSS is already loaded by vite-plugin-eufemia-theme,
 * so switching only requires updating localStorage + the HTML attribute.
 *
 * NOTE: this shim shares the `eufemia-theme` localStorage key with Eufemia's
 * own getTheme/setTheme (shared/Theme.tsx). Nothing in the type system ties
 * the two together, so the payload contract has to be kept in sync by hand:
 * `brand` is canonical, the deprecated `name` is mirrored until v13, and the
 * pair must never diverge. theme-handler-storage-contract.test.ts asserts this
 * against the real Eufemia implementation.
 */

import { useState, useEffect, useCallback } from 'react'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'

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

type ThemeColorScheme = 'auto' | 'light' | 'dark'

const availableThemes: Record<string, { name: string; hide?: boolean }> = {
  ui: { name: 'DNB' },
  sbanken: { name: 'Sbanken (WIP)' },
  eiendom: { name: 'DNB Eiendom' },
  carnegie: { name: 'DNB Carnegie (WIP)' },
}

const themeNames: ThemeNames[] = Object.keys(
  availableThemes
) as ThemeNames[]

export type ThemeState = {
  brand: ThemeNames
  /**
   * Deprecated. Use `brand` instead.
   * @deprecated Use `brand` instead. This property will be removed in v13.
   */
  name?: ThemeNames
  colorScheme?: ThemeColorScheme
}

/**
 * Mirror `brand` onto the deprecated `name`, so every payload this shim writes
 * satisfies both keys. `getTheme` therefore always resolves a `brand`.
 */
function withBrand(
  state: Record<string, unknown>,
  brand: ThemeNames
): ThemeState {
  return { ...state, brand, name: brand } as ThemeState
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

export function isValidTheme(brand: string): brand is ThemeNames {
  return themeNames.includes(brand as ThemeNames)
}

export function getTheme(): ThemeState {
  if (typeof window === 'undefined') {
    return withBrand({}, DEFAULT_THEME)
  }

  try {
    const data = window.localStorage.getItem(STORAGE_KEY)
    const stored = JSON.parse(data?.startsWith('{') ? data : '{}')

    // Also allow ?eufemia-theme=<brand> query param. Parsed the same way as
    // Eufemia's getTheme, so the two cannot disagree about which value wins.
    const fromQuery =
      new URLSearchParams(window.location.search).get('eufemia-theme') ||
      null

    const brand =
      fromQuery || stored?.brand || stored?.name || DEFAULT_THEME

    if (!isValidTheme(brand)) {
      // Keep the rest of the state: an unknown brand should not cost the
      // visitor their colorScheme.
      return withBrand(stored, DEFAULT_THEME)
    }

    return withBrand(stored, brand)
  } catch {
    return withBrand({}, DEFAULT_THEME)
  }
}

export function setTheme(
  themeProps: Partial<ThemeState>,
  callback?: (theme: ThemeState) => void
) {
  const current = getTheme()
  const brand = (themeProps.brand ??
    themeProps.name ??
    current.brand) as ThemeNames

  if (!isValidTheme(brand)) {
    return // stop here
  }

  // Re-derive both keys from the resolved brand, so a caller passing only the
  // deprecated `name` can never leave a stale `brand` behind (or vice versa).
  const theme = withBrand({ ...current, ...themeProps }, brand)

  const applyAndNotify = () => {
    // Dev mode: toggle style.disabled on <style> elements
    if (
      typeof window !== 'undefined' &&
      window.__applyEufemiaThemeStyles__
    ) {
      window.__applyEufemiaThemeStyles__(theme.brand)
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
    window.__loadEufemiaTheme(theme.brand).then(applyAndNotify)
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
        window.__applyEufemiaThemeStyles__(theme.brand)
      }
    }

    if (window.__loadEufemiaTheme) {
      window.__loadEufemiaTheme(theme.brand).then(applyInitial)
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
