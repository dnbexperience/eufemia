export type ThemeCapability = {
  colorSchemes: ReadonlyArray<'light' | 'dark'>
  darkModeStyle: string | null
  supportsDarkSurface: boolean
}

export const themeNames = ['ui', 'sbanken', 'eiendom', 'carnegie'] as const

export type ThemeName = (typeof themeNames)[number]

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
