/**
 * Theme Provider
 *
 */

import React from 'react'
import classnames from 'classnames'
import Context from './Context'
import Provider from './Provider'
import { DynamicElement } from './types'

export type ThemeNames = 'ui' | 'eiendom' | 'sbanken'
export type ThemeVariants = string
export type ThemeSizes = 'basis'
export type ColorMapping = 'basis'

export type ThemeProps = {
  name?: ThemeNames
  variant?: ThemeVariants
  size?: ThemeSizes
  colorMapping?: ColorMapping
  element?: DynamicElement
}

export type ThemeAllProps = ThemeProps & React.HTMLAttributes<HTMLElement>

export default function Theme(themeProps: ThemeAllProps) {
  const context = React.useContext(Context)
  const { children, element, ...theme } = themeProps
  const currentTheme = { ...context?.theme, ...theme }

  return (
    <Provider theme={currentTheme}>
      <ThemeWrapper element={element} currentTheme={currentTheme}>
        {children}
      </ThemeWrapper>
    </Provider>
  )
}

function ThemeWrapper({ children, element, currentTheme }) {
  const { name, variant, size, colorMapping, ...rest } = currentTheme

  const Wrapper = element || 'div'

  const ref = React.useRef<HTMLElement>(null)
  rest['ref'] = ref

  const className = classnames(
    'eufemia-theme',
    name && `eufemia-theme__${name}`,
    name && variant && `eufemia-theme__${name}--${variant}`,
    colorMapping && `eufemia-theme__color-mapping--${colorMapping}`,
    size && `eufemia-theme__size--${size}`
  )

  return (
    <Wrapper
      data-name={name}
      data-variant={variant}
      data-size={size}
      className={className}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </Wrapper>
  )
}
