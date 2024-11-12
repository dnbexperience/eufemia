// import default locales
import nbNO from './nb-NO'
import enGB from './en-GB'
import enUS from './en-US'

const locales = { ...nbNO, ...enGB, ...enUS }

export type TranslationsNbNO = (typeof locales)['nb-NO']
export type TranslationsEnGB = (typeof locales)['en-GB']
export type TranslationsEnUS = (typeof locales)['en-US']

export default locales
