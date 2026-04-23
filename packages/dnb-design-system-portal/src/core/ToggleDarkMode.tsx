import React from 'react'
import { Switch } from '@dnb/eufemia/src/components'
import { getTheme, setTheme } from 'gatsby-plugin-eufemia-theme-handler'

export default function ToggleDarkMode(props) {
  const [isDark, setIsDark] = React.useState(
    () => getTheme().colorScheme === 'dark'
  )

  return (
    <Switch
      label="Toggle Dark Mode"
      checked={isDark}
      onChange={({ checked }) => {
        const colorScheme = checked ? 'dark' : undefined
        setTheme({ colorScheme } as Parameters<typeof setTheme>[0])
        setIsDark(checked)
      }}
      {...props}
    />
  )
}
