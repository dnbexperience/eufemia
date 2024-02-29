import { useContext, useMemo } from 'react'
import SharedContext from './Context'

import noNB from './locales/nb-NO'
import enGB from './locales/en-GB'
import enUS from './locales/en-US'
import { LOCALE as defaultLocale } from './defaults'

const locales = {
  ...noNB,
  ...enGB,
  ...enUS,
}

export type TranslationLocale = keyof typeof locales

export function useLocale() {
  const sharedContext = useContext(SharedContext)

  const translations = useMemo(
    () => locales[sharedContext?.locale ?? defaultLocale],
    [sharedContext.locale]
  )

  return translations
}
