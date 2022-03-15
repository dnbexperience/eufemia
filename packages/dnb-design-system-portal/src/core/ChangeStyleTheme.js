import React from 'react'
import { Dropdown } from '@dnb/eufemia/src'

import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'

export default function ChangeStyleTheme(props) {
  const themes = getThemes()
  const themeName = getTheme()

  const date = Object.entries(themes).reduce((acc, [key, { name }]) => {
    acc[key] = capitalizeFirstLetter(name)
    return acc
  }, {})

  return (
    <Dropdown
      value={themeName}
      data={date}
      on_change={({ data: { value } }) => {
        setTheme(value)
      }}
      {...props}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
