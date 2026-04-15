import React from 'react'
import { Dropdown } from '@dnb/eufemia/src'
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
      onChange={({ data: { value } }) => {
        update({ skeleton: true })
        setTheme({ name: value }, () => {
          update({ skeleton: false })
        })
      }}
      {...rest}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
