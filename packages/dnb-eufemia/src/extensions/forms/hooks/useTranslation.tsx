import { useMemo, useContext } from 'react'
import type {
  TranslationFlatToObject,
  TranslationObjectToFlat,
} from '../../../shared/Context';
import SharedContext from '../../../shared/Context'
import type {
  AdditionalReturnUtils,
} from '../../../shared/useTranslation';
import sharedUseTranslation from '../../../shared/useTranslation'
import { extendDeep, isObject } from '../../../shared/component-helper'
import type { DeepPartial } from '../../../shared/types'
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

  const { messages, fallbackLocale } = useMemo(() => {
    const arg = messagesOrArgs as UseTranslationArgs<T>
    if (
      isObject(messagesOrArgs) &&
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

  // Resolve forms translation locale
  let translationLocale = locale
  if (
    locale.startsWith('en-') &&
    !Object.keys(formsLocales).some((l) => l === locale)
  ) {
    translationLocale = 'en-GB'
  }

  const base = useMemo(() => {
    return extendDeep(
      {},
      formsLocales[translationLocale] || formsLocales[LOCALE],
      globalTranslation
    )
  }, [globalTranslation, translationLocale])

  return sharedUseTranslation<
    TranslationFlatToObject<T> & AdditionalReturnUtils
  >({
    messages,
    fallbackLocale,
    base,
    warnLabel: 'Form.useTranslation',
  }) as TranslationFlatToObject<T> & AdditionalReturnUtils
}
