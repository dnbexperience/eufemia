import { useContext } from 'react'
import { Context } from '@dnb/eufemia/src/shared'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import {
  getTheme,
  getThemes,
  setTheme,
} from '../../vite/client/shims/theme-handler'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ChangeStyleTheme(props) {
  const themes = getThemes()
  const { brand } = getTheme()
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
      value={brand}
      data={data}
      label="Change Brand"
      onChange={(value) => {
        update({ skeleton: true })
        setTheme({ brand: value as ThemeNames }, () => {
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
