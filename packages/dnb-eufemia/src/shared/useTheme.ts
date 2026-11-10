/**
 * Theme Hook
 *
 */

import { useContext } from 'react'
import Context from './Context'
import type { ThemeProps } from './Theme'

export type UseThemeReturn =
  | (ThemeProps & {
      isUi: boolean
      isSbanken: boolean
      /**
       * `true` for the transitional "sbanken-new" brand only, so code can
       * tell it apart from `sbanken` while both exist.
       *
       * @deprecated Removed together with the "sbanken-new" brand.
       */
      isSbankenNew: boolean
      isEiendom: boolean
      isCarnegie: boolean
    })
  | null

export default function useTheme(): UseThemeReturn {
  const { theme } = useContext(Context) || {}

  if (theme) {
    const brand = theme.brand ?? theme.name
    const density = theme.density ?? theme.size
    return {
      ...theme,
      brand,
      name: brand,
      density,
      size: density,
      isUi: brand === 'ui',
      // "sbanken-new" is a transitional brand that replaces "sbanken", so it
      // reports as Sbanken. Use "isSbankenNew" to tell the two apart.
      isSbanken: brand === 'sbanken' || brand === 'sbanken-new',
      isSbankenNew: brand === 'sbanken-new',
      isEiendom: brand === 'eiendom',
      isCarnegie: brand === 'carnegie',
    }
  }

  return null
}
