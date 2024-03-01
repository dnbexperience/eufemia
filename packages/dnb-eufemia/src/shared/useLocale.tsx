import { useContext, useMemo } from 'react'
import SharedContext from './Context'

import noNB from './locales/nb-NO'
import enGB from './locales/en-GB'
import enUS from './locales/en-US'
import { LOCALE as defaultLocale } from './defaults'

// Should we maybe remove this an just rely on the SharedContext translations?
const locales = {
  ...noNB,
  ...enGB,
  ...enUS,
}

export type TranslationLocale = keyof typeof locales
export type TranslationComponents =
  keyof (typeof locales)[TranslationLocale]

type UseLocaleProps<T extends readonly TranslationComponents[]> = {
  components?: [...T]
}

type UseLocaleReturn<T extends readonly TranslationComponents[]> = {
  [Key in T[number]]: (typeof locales)[TranslationLocale][Key]
}

export function useLocale<T extends readonly TranslationComponents[]>({
  components,
}: UseLocaleProps<T> = {}): UseLocaleReturn<T> {
  const sharedContext = useContext(SharedContext)

  const translations = useMemo(() => {
    const translations = locales[sharedContext?.locale ?? defaultLocale]

    if (components === undefined) {
      return translations
    }

    return components?.length <= 0
      ? translations
      : // Create a new translation object based on components prop
        components.reduce((specifiedTranslations, component) => {
          specifiedTranslations[component] = translations[component]

          return specifiedTranslations
        }, {} as UseLocaleReturn<T>)
  }, [sharedContext.locale, components])

  return translations
}
