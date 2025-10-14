import { useCallback, useContext } from 'react'
import SharedContext, {
  TranslationFlatToObject,
} from '../../../shared/Context'
import { LOCALE } from '../../../shared/defaults'
import { AdditionalReturnUtils } from '../../../shared/useTranslation'
import { warn, isObject } from '../../../shared/component-helper'
import formsLocales from '../constants/locales'

export type FormsTranslationDefaultLocales = typeof formsLocales
export type FormsTranslationLocale = keyof FormsTranslationDefaultLocales

export type UseTranslationFallbackArgs<T> = {
  messages?: Record<FormsTranslationLocale, T> | unknown
  fallbackLocale?: FormsTranslationLocale
}

export default function useTranslationFallback<
  T extends Record<string, unknown>,
>({ messages, fallbackLocale = LOCALE }: UseTranslationFallbackArgs<T>) {
  const { locale, translations: contextTranslations } =
    useContext(SharedContext)

  const apply = useCallback(
    (base: TranslationFlatToObject<T> & AdditionalReturnUtils) => {
      if (!fallbackLocale) {
        return base
      }

      // Prefer explicit messages; otherwise, fall back to internal forms locales
      const explicitMessages = messages as
        | Record<string, unknown>
        | undefined

      let hasExplicitCurrent = false
      let currentMessages = undefined as T | undefined
      if (explicitMessages && Object.prototype.hasOwnProperty.call(explicitMessages, locale)) {
        hasExplicitCurrent = true
        currentMessages = explicitMessages[locale] as T | undefined
      } else if (
        contextTranslations &&
        Object.prototype.hasOwnProperty.call(contextTranslations, locale)
      ) {
        hasExplicitCurrent = true
        currentMessages = contextTranslations[locale] as T | undefined
      }
      const fallbackMessages =
        ((explicitMessages?.[fallbackLocale] as T | undefined) ||
          (contextTranslations?.[fallbackLocale] as T | undefined) ||
          ((formsLocales as unknown as Record<string, unknown>)[
            fallbackLocale
          ] as T | undefined)) ?? undefined

      if (!fallbackMessages) {
        return base
      }

      if (!hasExplicitCurrent) {
        // No explicit current locale provided -> keep base result
        return base
      }

      const currentHasContent =
        isObject(currentMessages) && Object.keys(currentMessages).length > 0

      if (!currentHasContent) {
        warnMissing(locale)
        const obj = generateTranslationKeyReferences(
          '',
          fallbackMessages
        ) as TranslationFlatToObject<T>
        return withUtils(base, obj)
      }

      const { result, hasMissing } = mergeMissingKeys<T>(
        base as unknown as TranslationFlatToObject<T>,
        fallbackMessages
      )
      if (hasMissing) {
        warnMissing(locale)
        return withUtils(base, result)
      }

      return base
    },
    [contextTranslations, fallbackLocale, locale, messages]
  )

  return apply
}

function withUtils<T extends Record<string, unknown>>(
  base: TranslationFlatToObject<T> & AdditionalReturnUtils,
  obj: TranslationFlatToObject<T>
): TranslationFlatToObject<T> & AdditionalReturnUtils {
  return Object.assign({}, base, obj, {
    formatMessage: base.formatMessage,
    renderMessage: base.renderMessage,
    countries: base.countries,
  })
}

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

function warnMissing(locale: string) {
  warn(
    `Form.useTranslation: No translations found for locale "${locale}"!`
  )
}
