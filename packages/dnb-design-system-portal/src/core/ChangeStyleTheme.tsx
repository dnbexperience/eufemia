import React from 'react'
import { Dropdown, Switch } from '@dnb/eufemia/src'

import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'

export default function ChangeStyleTheme() {
  const themes: Array<{ name: string; hide?: boolean }> = getThemes()
  const { name } = getTheme()

  const date = Object.entries(themes).reduce((acc, [key, value]) => {
    if (!value?.hide) {
      acc[key] = capitalizeFirstLetter(value.name)
    }
    return acc
  }, {})

  return (
    <Dropdown
      value={name}
      data={date}
      on_change={({ data: { value } }) => {
        setTheme({ name: value })
      }}
    />
  )
}

ChangeStyleTheme.ColorMapping = ColorMapping

function ColorMapping({ enabled, ...props }) {
  const { colors } = getTheme()
  return (
    <Switch
      top
      label="Toggle Color Mapping"
      checked={colors || enabled}
      on_change={({ checked }) => {
        setTheme({ colors: checked })
      }}
      {...props}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
