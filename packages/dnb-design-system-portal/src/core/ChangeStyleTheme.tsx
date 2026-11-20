import { useContext } from 'react'
import { Context, Provider } from '@dnb/eufemia/src/shared'
import type { ThemeNames } from '@dnb/eufemia/src/shared/Theme'
import useTheme from '@dnb/eufemia/src/shared/useTheme'
import { getThemes, setTheme } from '../../vite/client/shims/theme-handler'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export default function ChangeStyleTheme(props) {
  const themes = getThemes()
  const brand = useTheme()?.brand
  const { update } = useContext(Context)

  const visibleThemes = Object.entries(themes).filter(
    ([, theme]) => !theme?.hide
  )
  const focusKey = visibleThemes.some(([key]) => key === brand)
    ? brand
    : visibleThemes[0]?.[0]
  const data = visibleThemes.map(([key, value]) => ({
    id: key === focusKey ? 'change-theme' : undefined,
    value: key,
    title: capitalizeFirstLetter(value.name),
  }))

  return (
    <Provider skeleton={false}>
      <Field.Selection
        variant="button"
        optionsLayout="horizontal"
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
    </Provider>
  )
}

function capitalizeFirstLetter(s) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}
