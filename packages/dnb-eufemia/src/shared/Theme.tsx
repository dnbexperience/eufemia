/**
 * Theme Provider
 *
 */

import React, { useContext, useRef } from 'react'
import clsx from 'clsx'
import Context from './Context'
import Provider from './Provider'
import type { DynamicElement } from './types'
import { extendPropsWithContext } from './component-helper'
import withComponentMarkers from './helpers/withComponentMarkers'
import useMediaQuery from './useMediaQuery'
import useIsomorphicLayoutEffect from './helpers/useIsomorphicLayoutEffect'

export type ThemeNames = 'ui' | 'eiendom' | 'sbanken' | 'carnegie'
export type ThemeVariants = string
export type ThemeSizes = 'basis'
export type ContrastMode = boolean
/**
 * Controls the color scheme. Use `'dark'` or `'light'` to set explicitly, or `'auto'` to follow the user's system preference. Defaults to `undefined`.
 */
export type ThemeColorScheme = 'auto' | 'light' | 'dark'
/**
 * Adjusts component appearance based on background. Defaults to `undefined`.
 * Use `'initial'` to reset to the component's default behavior, ignoring any parent surface context.
 */
export type ThemeSurface = 'light' | 'dark' | 'initial'

export type ThemeProps = {
  name?: ThemeNames
  variant?: ThemeVariants
  size?: ThemeSizes
  contrastMode?: ContrastMode
  colorScheme?: ThemeColorScheme
  surface?: ThemeSurface
  element?: DynamicElement | false
}

export type ThemeAllProps = ThemeProps & React.HTMLAttributes<HTMLElement>

export default function Theme(themeProps: ThemeAllProps) {
  const context = useContext(Context)

  const {
    children,
    element,
    name,
    variant,
    size,
    contrastMode,
    colorScheme,
    surface,
    ...restProps
  } = themeProps

  const prefersDarkColorScheme = useMediaQuery({
    query: '(prefers-color-scheme: dark)',
    disabled: colorScheme !== 'auto',
  })

  const activeColorScheme =
    colorScheme === 'auto'
      ? globalThis.__eufemiaColorScheme ||
        (prefersDarkColorScheme ? 'dark' : 'light')
      : colorScheme

  // Clean up after the first render so subsequent renders
  // use the normal useMediaQuery path
  useIsomorphicLayoutEffect(() => {
    delete globalThis.__eufemiaColorScheme
  }, [])

  const theme = extendPropsWithContext(
    {
      name,
      variant,
      size,
      contrastMode,
      colorScheme: activeColorScheme,
      surface,
    },
    null,
    context?.theme
  )

  // When surface is "initial", reset it to break context inheritance
  if (surface === 'initial') {
    theme.surface = undefined
  }

  return (
    <Provider theme={theme}>
      <ThemeWrapper element={element} theme={theme} {...restProps}>
        {children}
      </ThemeWrapper>
    </Provider>
  )
}

Theme.Context = ({ element, ...themeProps }: ThemeAllProps) => {
  return <Theme {...themeProps} element={false} />
}
withComponentMarkers(Theme.Context, {
  _supportsSpacingProps: 'children',
})

export function ThemeWrapper({
  children,
  theme,
  element = null,
  className = null,
  ...rest
}) {
  const Wrapper = element === false ? React.Fragment : element || 'div'
  const ref = useRef<HTMLElement>(null)

  useSyncBodyColorScheme(theme)
  useSyncElementColorScheme(ref, theme)

  const classNames = getThemeClasses(theme, className)
  const { name, variant, size } = theme

  if (Wrapper === React.Fragment) {
    return children
  }

  rest['ref'] = ref

  return (
    <Wrapper
      data-name={name}
      data-variant={variant}
      data-size={size}
      className={classNames}
      {...rest}
    >
      {children}
    </Wrapper>
  )
}

export function getThemeClasses(theme: ThemeProps, className = null) {
  if (!theme) {
    return className
  }

  const { name, variant, size, contrastMode, colorScheme } = theme

  return clsx(
    className,
    'eufemia-theme',
    name && `eufemia-theme__${name}`,
    name && variant && `eufemia-theme__${name}--${variant}`,
    contrastMode && 'eufemia-theme__contrast-mode',
    colorScheme && `eufemia-theme__color-scheme--${colorScheme}`,
    size && `eufemia-theme__size--${size}`
  )
}

/**
 * Imperatively sync the color-scheme class on the Theme wrapper element.
 * This is needed because legacy ReactDOM.hydrate() does not reconcile
 * className mismatches — it keeps the server-rendered value.
 */
function useSyncElementColorScheme(
  ref: React.RefObject<HTMLElement>,
  theme: ThemeProps
) {
  const colorScheme = theme?.colorScheme

  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el || !colorScheme) {
      return // stop here
    }

    el.classList.remove(
      'eufemia-theme__color-scheme--light',
      'eufemia-theme__color-scheme--dark'
    )
    el.classList.add(`eufemia-theme__color-scheme--${colorScheme}`)
  }, [colorScheme])
}

function useSyncBodyColorScheme(theme: ThemeProps) {
  const colorScheme = theme?.colorScheme

  useIsomorphicLayoutEffect(() => {
    if (typeof document === 'undefined' || !colorScheme) {
      return // stop here
    }

    document.body.classList.remove(
      'eufemia-theme__color-scheme--light',
      'eufemia-theme__color-scheme--dark'
    )
    document.body.classList.add(
      `eufemia-theme__color-scheme--${colorScheme}`
    )
  }, [colorScheme])
}
