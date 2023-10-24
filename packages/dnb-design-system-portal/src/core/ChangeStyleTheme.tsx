import React from 'react'
import { Dropdown, Switch } from '@dnb/eufemia/src'
import { Context } from '@dnb/eufemia/src/shared'
import {
  getThemes,
  getTheme,
  setTheme,
} from 'gatsby-plugin-eufemia-theme-handler'

export default function ChangeStyleTheme({ label = null } = {}) {
  const themes = getThemes()
  const { update } = React.useContext(Context)

  const [themeName, setThemeName] = React.useState(null)

  React.useEffect(() => {
    const { name } = getTheme()
    setThemeName(name)
  }, [])

  const date = Object.entries(themes).reduce((acc, [key, value]) => {
    if (!value?.hide) {
      acc[key] = capitalizeFirstLetter(value.name)
    }
    return acc
  }, {})

  return (
    <Dropdown
      id="change-theme"
      value={themeName}
      data={date}
      label={label}
      on_change={({ data: { value } }) => {
        update({ skeleton: true })
        setTheme({ name: value }, () => {
          update({ skeleton: false })
        })
      }}
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
