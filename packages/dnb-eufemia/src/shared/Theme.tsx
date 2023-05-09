/**
 * Theme Provider
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from './Context'
import Provider from './Provider'
import { DynamicElement } from './types'
import { extendPropsWithContext } from './component-helper'

export type ThemeNames = 'ui' | 'eiendom' | 'sbanken'
export type ThemeVariants = string
export type ThemeSizes = 'basis'
export type ColorMapping = 'basis'

export type ThemeProps = {
  name?: ThemeNames
  variant?: ThemeVariants
  size?: ThemeSizes
  colorMapping?: ColorMapping
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
    colorMapping,
    ...restProps
  } = themeProps

  const theme = extendPropsWithContext(
    {
      name,
      variant,
      size,
      colorMapping,
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

  const { name, variant, size, colorMapping } = theme

  return classnames(
    className,
    'eufemia-theme',
    name && `eufemia-theme__${name}`,
    name && variant && `eufemia-theme__${name}--${variant}`,
    colorMapping && `eufemia-theme__color-mapping--${colorMapping}`,
    size && `eufemia-theme__size--${size}`
  )
}
