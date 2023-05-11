import React from 'react'
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
   * NB: "visible" takes presense over "hidden"
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
  const themeOrig = useTheme()

  // Deprecated (can be removed when we are full and 100% officially using React v18)
  // When using React v17,
  // we need to ovecome a hydration issue.
  // Later we can change "themeOrig" to "theme" and remove these lines below:
  const [theme, refresh] = React.useState(
    process.env.NODE_ENV === 'production' ? {} : themeOrig
  )
  React.useLayoutEffect(() => {
    refresh(themeOrig)
  }, [themeOrig])

  const visibleList = Array.isArray(visible) ? visible : [visible]
  const hiddenList = Array.isArray(hidden) ? hidden : [hidden]

  if (visible) {
    if (!visibleList.some(match(theme))) {
      return null
    }
  } else if (hidden) {
    if (hiddenList.some(match(theme))) {
      return null
    }
  }

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
