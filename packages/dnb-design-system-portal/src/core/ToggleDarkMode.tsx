import React from 'react'
import { ToggleButton } from '@dnb/eufemia/src/components'
import type { ThemeColorScheme } from '@dnb/eufemia/src/shared/Theme'
import { getTheme } from '@dnb/eufemia/src/shared/Theme'
import { setTheme } from 'gatsby-plugin-eufemia-theme-handler'

export default function ToggleDarkMode(props) {
  const { disabled, ...rest } = props
  const [colorScheme, updateColorScheme] = React.useState(
    () => getTheme().colorScheme || 'auto'
  )

  return (
    <ToggleButton.Group
      label="Color scheme"
      value={colorScheme}
      disabled={disabled}
      onChange={({ value }) => {
        const colorScheme = value as ThemeColorScheme
        setTheme({ colorScheme } as Parameters<typeof setTheme>[0])
        updateColorScheme(colorScheme)
      }}
      {...rest}
    >
      <ToggleButton value="auto">Auto</ToggleButton>
      <ToggleButton value="dark">Dark</ToggleButton>
      <ToggleButton value="light">Light</ToggleButton>
    </ToggleButton.Group>
  )
}
