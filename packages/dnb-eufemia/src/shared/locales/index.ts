// import default locales
import nbNO from './nb-NO'
import enGB from './en-GB'

const locales = { ...nbNO, ...enGB }

export default locales

// export type TranslationLocale = keyof typeof locales
// export type TranslationComponents =
//   keyof (typeof locales)[TranslationLocale]
