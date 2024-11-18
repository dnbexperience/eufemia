// import default locales
import nbNO from './nb-NO'
import enUS from './en-US'
import enGB from './en-GB'

const locales = { ...nbNO, ...enUS ...enGB }

export type TranslationsNbNO = (typeof locales)['nb-NO']
export type TranslationsEnUS = (typeof locales)['en-US']
export type TranslationsEnGB = (typeof locales)['en-GB']

export default locales
