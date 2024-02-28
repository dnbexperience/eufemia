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

export type TranslationLocale = keyof typeof locales

// Overloads to make sure typescript infers the correct return value based on if paramteters are provided or not.
// Generics does not support default values, hence the overloads.
export function useLocale(): (typeof locales)['nb-NO']
export function useLocale<T extends TranslationLocale>(
  locale: T
): (typeof locales)[T]
export function useLocale(locale?: TranslationLocale) {
  const sharedContext = useContext(SharedContext)

  const translations = useMemo(
    () => locales[locale ?? sharedContext?.locale ?? 'nb-NO'],
    [locale, sharedContext.locale]
  )

  return translations
}
