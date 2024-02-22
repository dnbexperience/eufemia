// import default locales
import nbNO from './nb-NO'
import enGB from './en-GB'

export type FormTranslations = (typeof nbNO)['nb-NO'] &
  (typeof enGB)['en-GB']

export default { ...nbNO, ...enGB }
