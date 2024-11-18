// import default locales
import nbNO from './nb-NO'
import enGB from './en-GB'

const locales = { ...nbNO, ...enGB }

export type TranslationsNbNO = (typeof locales)['nb-NO']
export type TranslationsEnGB = (typeof locales)['en-GB']

export default locales
