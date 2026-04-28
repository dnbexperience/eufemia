import React, { useContext } from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import { getTheme } from '@dnb/eufemia/src/shared/Theme'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
// Use setTheme from the gatsby plugin – it dynamically loads the theme CSS file,
// whereas the eufemia version only persists the theme name to localStorage.
import { getThemes, setTheme } from 'gatsby-plugin-eufemia-theme-handler'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ChangeStyleTheme(props) {
  const themes = getThemes()
  const { name } = getTheme()
  const { update } = useContext(Context)

  const data = Object.entries(themes).reduce((acc, [key, value]) => {
    if (!value?.hide) {
      acc.push({ value: key, title: capitalizeFirstLetter(value.name) })
    }
    return acc
  }, [])

  return (
    <Field.Selection
      id="change-theme"
      value={name}
      data={data}
      label="Change Brand"
      onChange={(value) => {
        update({ skeleton: true })
        setTheme({ name: value as ThemeNames }, () => {
          update({ skeleton: false })
        })
      }}
      {...props}
    />
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
