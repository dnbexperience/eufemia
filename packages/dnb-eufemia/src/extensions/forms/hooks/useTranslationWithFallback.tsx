import { useMemo, useContext } from 'react'
import SharedContext, {
  TranslationFlatToObject,
} from '../../../shared/Context'
import { LOCALE } from '../../../shared/defaults'
import { AdditionalReturnUtils } from '../../../shared/useTranslation'
import { warn, isObject } from '../../../shared/component-helper'
import { DeepPartial } from '../../../shared/types'
import formsLocales from '../constants/locales'
import useTranslation from './useTranslation'

export type FormsTranslationDefaultLocales = typeof formsLocales

export type FormsTranslationLocale = keyof FormsTranslationDefaultLocales
export type FormsTranslationKeys =
  keyof FormsTranslationDefaultLocales[FormsTranslationLocale]
export type FormsTranslationValues =
  FormsTranslationDefaultLocales[FormsTranslationLocale]

export type FormsTranslation = DeepPartial<FormsTranslationValues>
export type CustomLocales = Record<
  FormsTranslationLocale,
  FormsTranslation
>

export type UseTranslationWithFallbackArgs<T = FormsTranslation> = {
  messages?:
    | FormsTranslation
    | CustomLocales
    | Record<FormsTranslationLocale, T>
  fallbackLocale?: FormsTranslationLocale
}

export default function useTranslationWithFallback<T = FormsTranslation>({
  messages,
  fallbackLocale = LOCALE,
}: UseTranslationWithFallbackArgs<T>) {
  const { locale, translations: contextTranslations } =
    useContext(SharedContext)

  // Use the base useTranslation hook
  const baseResult = useTranslation<T>(messages)

  // Also get fallback result if fallback locale is provided
  const fallbackResult = useTranslation<T>(
    fallbackLocale && (messages || contextTranslations)?.[fallbackLocale]
  )

  return useMemo<
    TranslationFlatToObject<T> & AdditionalReturnUtils
  >(() => {
    // If no fallback locale is provided, return the base result
    if (!fallbackLocale) {
      return baseResult
    }

    const translationsToUse = messages || contextTranslations
    const currentMessages = translationsToUse?.[locale]
    const fallbackMessages = translationsToUse?.[fallbackLocale] as T

    if (!currentMessages || !fallbackMessages) {
      return baseResult
    }

    const currentHasContent = Object.keys(currentMessages).length > 0
    let hasMissingTr = false

    if (!currentHasContent) {
      // Current locale is empty, use fallback locale
      hasMissingTr = true

      if (hasMissingTr) {
        warnAboutMissingTranslation(locale)
      }

      return fallbackResult
    } else {
      // Current locale has content, merge missing keys from fallback
      const merged = { ...baseResult }
      hasMissingTr = hasMissingKeys<T>(merged, fallbackMessages)

      if (hasMissingTr) {
        warnAboutMissingTranslation(locale)
        return merged
      }
    }

    return baseResult
  }, [
    baseResult,
    fallbackResult,
    locale,
    messages,
    contextTranslations,
    fallbackLocale,
  ])
}

function hasMissingKeys<T>(
  target: TranslationFlatToObject<T>,
  source: T
): boolean {
  for (const key in source) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (isObject(sourceValue)) {
      if (!targetValue) {
        target[key] = { ...target[key], ...sourceValue }
        return true
      }
    }
  }

  return false
}

function warnAboutMissingTranslation(locale: string) {
  warn(
    `Form.useTranslation: No translations found for locale "${locale}"!`
  )
}
