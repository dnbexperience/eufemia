import React from 'react'
import { Dropdown } from '@dnb/eufemia/src'

import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'

export default function ChangeStyleTheme({ close }) {
  const themes: Array<{ name: string; hide?: boolean }> = getThemes()
  const themeName = getTheme()

  const date = Object.entries(themes).reduce((acc, [key, value]) => {
    if (!value?.hide) {
      acc[key] = capitalizeFirstLetter(value.name)
    }
    return acc
  }, {})

  return (
    <Dropdown
      value={themeName}
      data={date}
      on_change={({ data: { value } }) => {
        close()
        setTheme(value)
      }}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
