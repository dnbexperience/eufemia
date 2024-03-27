import { useContext, useMemo } from 'react'
import SharedContext, { Translation, TranslationLocale } from './Context'
import defaultLocales from './locales'

type CustomLocales = Partial<Record<TranslationLocale, Translation>>

export function useLocale<T = Translation>(
  locales?: Translation | CustomLocales | Record<TranslationLocale, T>
) {
  const { locale, translation } = useContext(SharedContext)

  return useMemo(() => {
    return combineLocales({
      tr: translation,
      locales,
      locale,
    }) as T
  }, [locale, locales, translation])
}

export function combineLocales({ tr, locales, locale }) {
  if (locales) {
    const translation = { ...tr }

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
}
