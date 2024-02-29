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
export type TranslationComponents =
  keyof (typeof locales)[TranslationLocale]

type UseLocaleProps = {
  components?: TranslationComponents[]
}

// TODO: Specify return type
export function useLocale({ components = [] }: UseLocaleProps = {}) {
  const sharedContext = useContext(SharedContext)

  const translations = useMemo(() => {
    const translations = locales[sharedContext?.locale ?? defaultLocale]

    return components?.length <= 0
      ? translations
      : // Create a new translation object based on components prop
        components.reduce((specifiedTranslations, component) => {
          specifiedTranslations[component] = translations[component]

          return specifiedTranslations
        }, {})
  }, [sharedContext.locale, components])

  return translations
}
