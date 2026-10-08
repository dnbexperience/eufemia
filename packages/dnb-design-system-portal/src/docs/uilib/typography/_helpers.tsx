import { useTheme } from '@dnb/eufemia/shared'

import propertiesSbanken from '@dnb/eufemia/src/style/themes/sbanken/properties'
import propertiesUi from '@dnb/eufemia/src/style/themes/ui/properties'
import propertiesEiendom from '@dnb/eufemia/src/style/themes/eiendom/properties'
import propertiesCarnegie from '@dnb/eufemia/src/style/themes/carnegie/properties'

const properties = {
  sbanken: propertiesSbanken,
  ui: propertiesUi,
  eiendom: propertiesEiendom,
  carnegie: propertiesCarnegie,
}

const usePropValue = (prop: string) => {
  const theme = useTheme()
  const themeProps = properties[theme?.brand] || properties.ui

  let value = themeProps[prop]
  const visited = new Set<string>()

  while (value?.startsWith('var(')) {
    const reference = value.substring(4, value.indexOf(')'))
    if (visited.has(reference)) {
      return undefined
    }

    visited.add(reference)
    value = themeProps[reference]
  }

  return value
}

export const PropValue = ({ name }: { name: string }) => {
  return usePropValue(name)
}

export const PropAsPx = ({ name }: { name: string }) => {
  return remToPx(usePropValue(name))
}

const remToPx = (rem = '') => {
  if (rem.endsWith('rem')) {
    return parseFloat(rem) * 16 + 'px'
  }
  return rem
}
