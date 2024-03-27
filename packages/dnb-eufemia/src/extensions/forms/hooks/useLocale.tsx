import { useMemo, useContext } from 'react'
import SharedContext from '../../../shared/Context'
import { combineLocales } from '../../../shared/useLocale'
import { DeepPartial } from '../../../shared/types'
import { LOCALE } from '../../../shared/defaults'
import formsLocales from '../constants/locales'

export type FormsTranslationDefaultLocales = typeof formsLocales
export type FormsTranslationLocale = keyof FormsTranslationDefaultLocales
export type FormsTranslationKeys =
  keyof FormsTranslationDefaultLocales[FormsTranslationLocale]
export type FormsTranslationValues =
  FormsTranslationDefaultLocales[FormsTranslationLocale]
export type FormsTranslation = DeepPartial<
  FormsTranslationDefaultLocales[FormsTranslationLocale]
>

type CustomLocales = Partial<
  Record<FormsTranslationLocale, FormsTranslation>
>

export default function useLocale<T = FormsTranslation>(
  locales?:
    | FormsTranslation
    | CustomLocales
    | Record<FormsTranslationLocale, T>
) {
  const { locale, translation } = useContext(SharedContext)

  return useMemo(() => {
    const tr = formsLocales[locale] || formsLocales[LOCALE]

    const Forms = translation?.Forms
    if (Forms) {
      Object.assign(tr, Forms)
    }

    return combineLocales({
      tr,
      locales,
      locale,
    }) as T
  }, [locale, locales, translation])
}
