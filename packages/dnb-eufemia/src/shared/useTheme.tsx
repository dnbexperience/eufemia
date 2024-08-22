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
    })
  | null

export default function useTheme(): UseThemeReturn {
  const { theme } = useContext(Context) || {}

  if (theme) {
    const { name } = theme
    return {
      ...theme,
      isUi: name === 'ui',
      isSbanken: name === 'sbanken',
      isEiendom: name === 'eiendom',
    }
  }

  return null
}
