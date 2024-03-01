import { useContext, useMemo } from 'react'
import SharedContext, { Translation, TranslationLocale } from './Context'
import defaultLocales from './locales'

export function useLocale(
  locales?: Translation | Partial<Record<TranslationLocale, Translation>>
): Translation {
  const { locale, translation } = useContext(SharedContext)

  return useMemo(() => {
    let tr = translation

    if (locales) {
      if (Object.keys(defaultLocales).some((locale) => locales[locale])) {
        if (locales[locale]) {
          tr = locales[locale]
        }
      }
      for (const key in locales) {
        tr[key] = { ...translation[key], ...locales[key] }
      }
    }

    return tr
  }, [locale, locales, translation])
}
