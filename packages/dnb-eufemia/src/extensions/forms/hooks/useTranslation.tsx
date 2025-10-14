import { useMemo, useContext } from 'react'
import SharedContext, {
  TranslationFlatToObject,
  TranslationObjectToFlat,
} from '../../../shared/Context'
import {
  combineWithExternalTranslations,
  AdditionalReturnUtils,
  useAdditionalUtils,
} from '../../../shared/useTranslation'
import { extendDeep } from '../../../shared/component-helper'
import { DeepPartial } from '../../../shared/types'
import { LOCALE } from '../../../shared/defaults'
import formsLocales from '../constants/locales'
import useTranslationFallback from './useTranslationFallback'

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

export type UseTranslationArgs<T = FormsTranslation> = {
  messages?:
    | FormsTranslation
    | CustomLocales
    | Record<FormsTranslationLocale, T>
  fallbackLocale?: FormsTranslationLocale
}

export default function useTranslation<T = FormsTranslation>(
  messagesOrArgs?:
    | UseTranslationArgs<T>
    | FormsTranslation
    | CustomLocales
    | Record<FormsTranslationLocale, T>
) {
  const { locale, translation: globalTranslation } =
    useContext(SharedContext)
  const { assignUtils } = useAdditionalUtils()

  const { messages, fallbackLocale } = useMemo(() => {
    const arg = messagesOrArgs as UseTranslationArgs<T>
    if (
      messagesOrArgs &&
      typeof messagesOrArgs === 'object' &&
      ('messages' in (messagesOrArgs as Record<string, unknown>) ||
        'fallbackLocale' in (messagesOrArgs as Record<string, unknown>))
    ) {
      return {
        messages: arg?.messages as
          | FormsTranslation
          | CustomLocales
          | Record<FormsTranslationLocale, T>
          | undefined,
        fallbackLocale: arg?.fallbackLocale,
      }
    }
    return {
      messages: messagesOrArgs as
        | FormsTranslation
        | CustomLocales
        | Record<FormsTranslationLocale, T>
        | undefined,
      fallbackLocale: LOCALE,
    }
  }, [messagesOrArgs])

  const applyFallback = useTranslationFallback<T>({
    messages: messages as any,
    fallbackLocale,
  })

  return useMemo<
    TranslationFlatToObject<T> & AdditionalReturnUtils
  >(() => {
    // Handle translation fallback logic
    let translationLocale = locale

    // If e.g. en-US translations don't exist, fallback to en-GB
    if (
      locale.startsWith('en-') &&
      !Object.keys(formsLocales).some((l) => l === locale)
    ) {
      translationLocale = 'en-GB'
    }

    const translation = extendDeep(
      {},
      formsLocales[translationLocale] || formsLocales[LOCALE],
      globalTranslation
    )

    const base = assignUtils(
      combineWithExternalTranslations({
        translation,
        messages: messages as any,
        locale,
      })
    ) as TranslationFlatToObject<T> & AdditionalReturnUtils

    // Enhance with fallback merging if requested
    return applyFallback(base)
  }, [
    assignUtils,
    globalTranslation,
    locale,
    messages,
    fallbackLocale,
    applyFallback,
  ])
}
