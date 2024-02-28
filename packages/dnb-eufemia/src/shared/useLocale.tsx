import { useContext, useMemo } from 'react'
import SharedContext from './Context'

import noNB from './locales/nb-NO'
import enGB from './locales/en-GB'
import enUS from './locales/en-US'

const locales = {
  ...noNB,
  ...enGB,
  ...enUS,
}

export type Locale = keyof typeof locales

// Overloads to make sure typescript infers the correct return value based on if paramteters are provided or not.
// Generics does not support default values, hence the overloads.
export function useLocale(): (typeof locales)['nb-NO']
export function useLocale<T extends Locale>(locale: T): (typeof locales)[T]
export function useLocale(locale?: Locale) {
  const sharedContext = useContext(SharedContext)

  const translations = useMemo(
    () => locales[locale ?? sharedContext?.locale ?? 'nb-NO'],
    [locale, sharedContext.locale]
  )

  return translations
}
