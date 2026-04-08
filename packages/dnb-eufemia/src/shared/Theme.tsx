/**
 * Theme Provider
 *
 */

import React from 'react'
import clsx from 'clsx'
import Context from './Context'
import Provider from './Provider'
import type { DynamicElement } from './types'
import { extendPropsWithContext } from './component-helper'
import withComponentMarkers from './helpers/withComponentMarkers'
import useMediaQuery from './useMediaQuery'

export type ThemeNames = 'ui' | 'eiendom' | 'sbanken' | 'carnegie'
export type ThemeVariants = string
export type ThemeSizes = 'basis'
export type PropMapping = string
export type ContrastMode = boolean
/**
 * Changes component style based on dark token values. Defaults to `undefined`.
 */
export type ThemeColorScheme = 'auto' | 'light' | 'dark'
/**
 * Changes component style based on background. Defaults to `undefined`.
 */
export type ThemeSurface = 'default' | 'dark'

export type ThemeProps = {
  name?: ThemeNames
  variant?: ThemeVariants
  size?: ThemeSizes
  propMapping?: PropMapping
  contrastMode?: ContrastMode
  colorScheme?: ThemeColorScheme
  surface?: ThemeSurface
  element?: DynamicElement | false
}

export type ThemeAllProps = ThemeProps & React.HTMLAttributes<HTMLElement>

export default function Theme(themeProps: ThemeAllProps) {
  const context = React.useContext(Context)

  const {
    children,
    element,
    name,
    variant,
    size,
    propMapping,
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
      ? prefersDarkColorScheme
        ? 'dark'
        : 'light'
      : colorScheme

  const theme = extendPropsWithContext(
    {
      name,
      variant,
      size,
      propMapping,
      contrastMode,
      colorScheme: activeColorScheme,
      surface,
    },
    null,
    context?.theme
  )

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
  const ref = React.useRef<HTMLElement>(null)

  if (Wrapper === React.Fragment) {
    return children
  }

  rest['ref'] = ref

  const classNames = getThemeClasses(theme, className)
  const { name, variant, size } = theme

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

  const {
    name,
    variant,
    size,
    propMapping,
    contrastMode,
    colorScheme,
    surface,
  } = theme

  return clsx(
    className,
    'eufemia-theme',
    name && `eufemia-theme__${name}`,
    name && variant && `eufemia-theme__${name}--${variant}`,
    surface &&
      surface !== 'default' &&
      `eufemia-theme__surface--${surface}`,
    propMapping && `eufemia-theme__prop-mapping--${propMapping}`,
    contrastMode && 'eufemia-theme__contrast-mode',
    colorScheme && `eufemia-theme__color-scheme--${colorScheme}`,
    size && `eufemia-theme__size--${size}`
  )
}
