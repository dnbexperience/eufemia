import React from 'react'
import { Dropdown, Switch } from '@dnb/eufemia/src'
import { Context } from '@dnb/eufemia/src/shared'
import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'

export default function ChangeStyleTheme({ label = null, ...rest } = {}) {
  const themes = getThemes()
  const { name } = getTheme()
  const { update } = React.useContext(Context)

  const date = Object.entries(themes).reduce((acc, [key, value]) => {
    if (!value?.hide) {
      acc[key] = capitalizeFirstLetter(value.name)
    }
    return acc
  }, {})

  return (
    <Dropdown
      id="change-theme"
      value={name}
      data={date}
      label={label}
      on_change={({ data: { value } }) => {
        update({ skeleton: true })
        setTheme({ name: value }, () => {
          update({ skeleton: false })
        })
      }}
      {...rest}
    />
  )
}

ChangeStyleTheme.PropMapping = PropMapping

function PropMapping({ enabled, ...props }) {
  const { propMapping } = getTheme()
  return (
    <Switch
      top
      label="Toggle Color Mapping"
      checked={propMapping === 'basis' || enabled}
      on_change={({ checked }) => {
        setTheme({ propMapping: checked ? 'basis' : null })
      }}
      {...props}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
