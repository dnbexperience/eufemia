import React, { useState, useEffect } from 'react'
import useTheme from './useTheme'
import type { ThemeNames, ThemeProps } from './Theme'

type VisibilityByThemeProps = {
  /**
   * A valid theme name or object.
   * Will pass children on a match.
   */
  visible?: ThemeParams

  /**
   * A valid theme name or object.
   * Will omit passing children on a match.
   * NB: "visible" takes presence over "hidden"
   */
  hidden?: ThemeParams

  /**
   * Any kind of a React Node that should render on a match.
   */
  children: React.ReactNode
}

type ThemeItem = ThemeNames | ThemeProps
type ThemeParams = ThemeItem | Array<ThemeItem>

export default function VisibilityByTheme({
  children,
  visible,
  hidden,
}: VisibilityByThemeProps) {
  const [mounted, setMounted] = useState(false)

  const theme = useTheme()

  const visibleList = Array.isArray(visible) ? visible : [visible]
  const hiddenList = Array.isArray(hidden) ? hidden : [hidden]

  useEffect(() => {
    // Wait for component to mount,
    // as we will not know the theme before mounting when ran in SSR.
    setMounted(true)
  }, [])

  if (visible) {
    if (!visibleList.some(match(theme))) {
      return null
    }
  } else if (hidden) {
    if (hiddenList.some(match(theme))) {
      return null
    }
  }

  if (!mounted) return null
  return children as JSX.Element

  function match(theme: ThemeProps) {
    return (themeItem: ThemeItem) => {
      return typeof themeItem === 'string'
        ? theme.name === themeItem
        : matchObject(theme, themeItem)
    }
  }

  function matchObject(theme: ThemeProps, themeItem: ThemeItem) {
    return Object.keys(themeItem).every((key) => {
      return theme[key] === themeItem[key]
    })
  }
}
