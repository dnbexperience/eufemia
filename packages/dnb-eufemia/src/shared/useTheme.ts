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
       * `true` for the transitional "coconut" brand only, so code can
       * single it out while it exists.
       *
       * @deprecated Removed together with the "coconut" brand.
       */
      isCoconut: boolean
      /** Transitional preview of the new Eiendom identity. */
      isBirdhouse: boolean
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
      // The transitional "coconut" brand shares this implementation, so it
      // reports here too. Use "isCoconut" to tell the two apart.
      isSbanken: brand === 'sbanken' || brand === 'coconut',
      isCoconut: brand === 'coconut',
      isBirdhouse: brand === 'birdhouse',
      isEiendom: brand === 'eiendom' || brand === 'birdhouse',
      isCarnegie: brand === 'carnegie',
    }
  }

  return null
}
