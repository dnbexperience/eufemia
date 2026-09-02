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
      isSbanken: brand === 'sbanken',
      isEiendom: brand === 'eiendom',
      isCarnegie: brand === 'carnegie',
    }
  }

  return null
}
