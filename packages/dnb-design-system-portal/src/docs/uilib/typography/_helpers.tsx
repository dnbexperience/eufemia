import { useTheme } from '@dnb/eufemia/shared'

import propertiesSbanken from '@dnb/eufemia/src/style/themes/theme-sbanken/properties'
import propertiesUi from '@dnb/eufemia/src/style/themes/theme-ui/properties'
import propertiesEiendom from '@dnb/eufemia/src/style/themes/theme-eiendom/properties'

const properties = {
  sbanken: propertiesSbanken,
  ui: propertiesUi,
  eiendom: propertiesEiendom,
}

export const GetPropValue = (prop) => {
  const theme = useTheme()
  const p = properties[theme.name][prop]
  if (p && p.startsWith('var(')) {
    return GetPropValue(p.substring(4, p.indexOf(')')))
  }
  return p
}

export const GetPropAsPx = (prop) => {
  return RemToPx(GetPropValue(prop))
}

const RemToPx = (rem = '') => {
  if (rem.endsWith('rem')) {
    return parseFloat(rem) * 16 + 'px'
  }
  return rem
}
