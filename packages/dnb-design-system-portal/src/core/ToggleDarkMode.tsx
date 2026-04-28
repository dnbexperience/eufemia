import React, { useState } from 'react'
import { getTheme } from '@dnb/eufemia/src/shared/Theme'
// Use setTheme from the gatsby plugin – it emits theme change events
// that useThemeHandler() in PortalProviders listens to.
import { setTheme } from 'gatsby-plugin-eufemia-theme-handler'
import type { ThemeColorScheme } from '@dnb/eufemia/src/shared/Theme'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ToggleDarkMode(props) {
  const { disabled, ...rest } = props
  const [colorScheme, updateColorScheme] = useState(
    () => getTheme().colorScheme || 'auto'
  )

  return (
    <Field.Selection
      variant="button"
      optionsLayout="horizontal"
      value={colorScheme}
      disabled={disabled}
      data={[
        { value: 'auto', title: 'Auto' },
        { value: 'dark', title: 'Dark' },
        { value: 'light', title: 'Light' },
      ]}
      onChange={(value: string) => {
        setTheme({ colorScheme: value } as Record<string, unknown>)
        updateColorScheme(value as ThemeColorScheme)
      }}
      {...rest}
    />
  )
}
