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

export type ThemeProps = {
  name?: ThemeNames
  variant?: ThemeVariants
  size?: ThemeSizes
  element?: DynamicElement
}

export type ThemeAllProps = ThemeProps & React.HTMLAttributes<HTMLElement>

export default function Theme(themeProps: ThemeAllProps) {
  const context = React.useContext(Context)
  const { children, element, ...theme } = themeProps
  const currentTheme = { ...context?.theme, ...theme }
  const { name, variant, size, ...rest } = currentTheme

  const Wrapper = element || 'div'

  return (
    <Wrapper
      className={classnames(
        'eufemia-theme',
        name && `eufemia-theme__${name}`,
        name && variant && `eufemia-theme__${name}--${variant}`,
        size && `eufemia-theme__size--${size}`
      )}
      {...(rest as Record<string, unknown>)}
    >
      <Provider theme={currentTheme}>{children}</Provider>
    </Wrapper>
  )
}
