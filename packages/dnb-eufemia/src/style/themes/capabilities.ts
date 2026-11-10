export type ThemeCapability = {
  colorSchemes: ReadonlyArray<'light' | 'dark'>
  darkModeStyle: string | null
  supportsDarkSurface: boolean
}

export const themeNames = [
  'ui',
  'sbanken',
  /**
   * @deprecated Transitional brand used while the Sbanken redesign is rolled
   * out. It is removed once `sbanken` carries the new design, so do not rely
   * on it in application code.
   */
  'sbanken-new',
  'eiendom',
  'carnegie',
] as const

export type ThemeName = (typeof themeNames)[number]

/**
 * Brands that exist only while a redesign is rolled out. They are not
 * documented, because the documentation of the brand they replace applies.
 *
 * @deprecated Removed together with the brands it lists.
 */
export const transitionalThemeNames: ReadonlyArray<ThemeName> = [
  'sbanken-new',
]

export const themeCapabilities: Record<ThemeName, ThemeCapability> = {
  ui: {
    colorSchemes: ['light', 'dark'],
    darkModeStyle:
      '@dnb/eufemia/style/themes/ui/ui-theme-dark-mode.min.css',
    supportsDarkSurface: true,
  },
  sbanken: {
    colorSchemes: ['light', 'dark'],
    darkModeStyle:
      '@dnb/eufemia/style/themes/sbanken/sbanken-theme-dark-mode.min.css',
    supportsDarkSurface: true,
  },
  /** @deprecated Transitional "sbanken-new" brand, removed with the brand */
  'sbanken-new': {
    colorSchemes: ['light', 'dark'],
    darkModeStyle:
      '@dnb/eufemia/style/themes/sbanken-new/sbanken-new-theme-dark-mode.min.css',
    supportsDarkSurface: true,
  },
  eiendom: {
    colorSchemes: ['light', 'dark'],
    darkModeStyle:
      '@dnb/eufemia/style/themes/eiendom/eiendom-theme-dark-mode.min.css',
    supportsDarkSurface: true,
  },
  carnegie: {
    colorSchemes: ['light'],
    darkModeStyle: null,
    supportsDarkSurface: true,
  },
}
