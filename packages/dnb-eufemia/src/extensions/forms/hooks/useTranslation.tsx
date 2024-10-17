import { useMemo, useContext } from 'react'
import SharedContext, {
  TranslationObjectToFlat,
} from '../../../shared/Context'
import {
  combineWithExternalTranslations,
  FormatMessage,
  useAdditionalUtils,
} from '../../../shared/useTranslation'
import { extendDeep } from '../../../shared/component-helper'
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
export type FormsTranslationFlat =
  TranslationObjectToFlat<FormsTranslation>

type CustomLocales = Partial<
  Record<FormsTranslationLocale, FormsTranslation>
>

export default function useTranslation<T = FormsTranslation>(
  messages?:
    | FormsTranslation
    | CustomLocales
    | Record<FormsTranslationLocale, T>
) {
  const { locale, translation: globalTranslation } =
    useContext(SharedContext)
  const { assignUtils } = useAdditionalUtils()

  return useMemo(() => {
    const translation = extendDeep(
      {},
      formsLocales[locale] || formsLocales[LOCALE],
      globalTranslation
    )

    return assignUtils(
      combineWithExternalTranslations({
        translation,
        messages,
        locale,
      })
    ) as T & FormatMessage
  }, [assignUtils, globalTranslation, locale, messages])
}
