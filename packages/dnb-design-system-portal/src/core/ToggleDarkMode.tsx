import React from 'react'
import { ToggleButton } from '@dnb/eufemia/src/components'
import { getTheme, setTheme } from 'gatsby-plugin-eufemia-theme-handler'

export default function ToggleDarkMode(props) {
  const [colorScheme, setColorScheme] = React.useState(
    () => getTheme().colorScheme || 'auto'
  )

  return (
    <ToggleButton.Group
      label="Color scheme"
      value={colorScheme}
      onChange={({ value }) => {
        setTheme({ colorScheme: value } as Parameters<typeof setTheme>[0])
        setColorScheme(value)
      }}
      {...props}
    >
      <ToggleButton value="auto">Auto</ToggleButton>
      <ToggleButton value="dark">Dark</ToggleButton>
      <ToggleButton value="light">Light</ToggleButton>
    </ToggleButton.Group>
  )
}
