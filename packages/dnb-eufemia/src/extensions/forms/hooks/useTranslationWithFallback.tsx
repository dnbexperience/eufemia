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

export default function useTranslationWithFallback<
  T extends Record<string, unknown> = FormsTranslation,
>({
  messages,
  fallbackLocale = LOCALE,
}: UseTranslationWithFallbackArgs<T> = {}) {
  const { locale, translations: contextTranslations } =
    useContext(SharedContext)

  // Use the base useTranslation hook
  const baseResult = useTranslation<T>(messages)

  return useMemo<
    TranslationFlatToObject<T> & AdditionalReturnUtils
  >(() => {
    // No explicit fallback -> use base translations
    if (!fallbackLocale) {
      return baseResult
    }

    const translationsToUse = messages || contextTranslations
    const currentMessages = translationsToUse?.[locale]
    const fallbackMessages = translationsToUse?.[fallbackLocale] as
      | T
      | undefined

    // If either current or fallback is unavailable, keep base result
    if (!currentMessages || !fallbackMessages) {
      return baseResult
    }

    const currentHasContent =
      isObject(currentMessages) && Object.keys(currentMessages).length > 0

    // Empty current locale: return full pointer structure (dotted paths)
    if (!currentHasContent) {
      warnAboutMissingTranslation(locale)
      const obj = generateTranslationKeyReferences(
        '',
        fallbackMessages
      ) as TranslationFlatToObject<T>
      return withUtils(baseResult, obj)
    }

    // Merge missing keys from fallback into current (leaves become leaf-key pointers)
    const { result, hasMissing } = mergeMissingKeys<T>(
      baseResult as unknown as TranslationFlatToObject<T>,
      fallbackMessages
    )
    if (hasMissing) {
      warnAboutMissingTranslation(locale)
      return withUtils(baseResult, result)
    }

    return baseResult
  }, [baseResult, locale, messages, contextTranslations, fallbackLocale])
}

function withUtils<T extends Record<string, unknown>>(
  base: AdditionalReturnUtils,
  obj: TranslationFlatToObject<T>
): TranslationFlatToObject<T> & AdditionalReturnUtils {
  return Object.assign({}, obj, {
    formatMessage: base.formatMessage,
    renderMessage: base.renderMessage,
    countries: base.countries,
  })
}

/**
 * Merges missing keys from source into target, returning both the result and whether any keys were missing
 * This function is pure and doesn't mutate the input objects
 */
function mergeMissingKeys<T extends Record<string, unknown>>(
  target: TranslationFlatToObject<T>,
  source: T
): { result: TranslationFlatToObject<T>; hasMissing: boolean } {
  const resultLocal = {
    ...(target as unknown as Record<string, unknown>),
  }
  let hasMissing = false

  const keys = Object.keys(source as Record<string, unknown>)
  for (const key of keys) {
    const sourceValue = (source as Record<string, unknown>)[key]
    const targetValue = (resultLocal as Record<string, unknown>)[key]

    if (isObject(sourceValue)) {
      if (!targetValue) {
        // Entire subtree missing: use dotted path pointers
        resultLocal[key] = generateTranslationKeyReferences(
          key,
          sourceValue
        )
        hasMissing = true
      } else if (isObject(targetValue)) {
        const nested = mergeMissingKeys(
          targetValue as TranslationFlatToObject<Record<string, unknown>>,
          sourceValue as Record<string, unknown>
        )
        ;(resultLocal as Record<string, unknown>)[key] =
          nested.result as unknown as Record<string, unknown>
        if (nested.hasMissing) {
          hasMissing = true
        }
      }
    } else if (targetValue === undefined) {
      // Missing primitive leaf -> use leaf-key pointer
      resultLocal[key] = key
      hasMissing = true
    }
  }

  return { result: resultLocal as TranslationFlatToObject<T>, hasMissing }
}

/**
 * Generates translation key references for nested objects
 * This creates a structure where values are translation keys instead of actual translated text
 */
function generateTranslationKeyReferences(
  baseKey: string,
  sourceValue: unknown
): unknown {
  if (!isObject(sourceValue)) {
    return baseKey ? baseKey : sourceValue
  }

  const result = {}
  const entries = Object.entries(sourceValue)
  for (const [key, value] of entries) {
    const translationKey = baseKey ? `${baseKey}.${key}` : key
    result[key] = isObject(value)
      ? generateTranslationKeyReferences(translationKey, value)
      : translationKey
  }
  return result
}

function warnAboutMissingTranslation(locale: string) {
  warn(
    `Form.useTranslation: No translations found for locale "${locale}"!`
  )
}
