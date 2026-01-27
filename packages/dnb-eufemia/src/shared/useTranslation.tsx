import React, {
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useRef,
} from 'react'
import Context, {
  Translation,
  TranslationLocale,
  TranslationCustomLocales,
  InternalLocale,
  TranslationFlatToObject,
} from './Context'
import defaultLocales from './locales'
import { isObject, warn } from './component-helper'

export type TranslationId = string
export type TranslationIdAsFunction<T = TranslationCustomLocales> = (
  messages: T & Translation
) => string
export type TranslationArguments = Record<TranslationId, unknown>
export type UseTranslationMessages<T = Translation> =
  | TranslationId
  | Translation
  | TranslationCustomLocales
  | Record<TranslationLocale, T>
export type UseTranslationArgs<T = Translation> = {
  messages?: UseTranslationMessages<T>
  fallbackLocale?: TranslationLocale
  base?: Translation
  warnLabel?: string
}

export default function useTranslation<
  T extends Record<string, unknown> = Translation,
>(
  messages?: UseTranslationMessages<T> | UseTranslationArgs<T>,
  args?: TranslationArguments
) {
  const { locale, translation } = useContext(Context)
  const { translations: contextTranslations } = useContext(Context)
  const { assignUtils } = useAdditionalUtils()

  const { extMessages, fallbackLocale, baseOverride, warnLabel } =
    useMemo(() => {
      // Cache Object.keys() result for performance
      const defaultLocaleKeys = Object.keys(defaultLocales)
      const defaultLocale = defaultLocaleKeys[0]

      const arg: Partial<UseTranslationArgs<T>> =
        isObject(messages) &&
        ('messages' in (messages as Translation) ||
          'fallbackLocale' in (messages as Translation))
          ? (messages as UseTranslationArgs<T>)
          : { messages }

      return {
        extMessages: arg.messages,
        fallbackLocale: arg.fallbackLocale ?? defaultLocale,
        baseOverride: arg.base,
        warnLabel: arg.warnLabel || 'useTranslation',
      }
    }, [messages])

  return useMemo<
    TranslationFlatToObject<T> & AdditionalReturnUtils
  >(() => {
    const id = typeof messages === 'string' ? messages : undefined
    if (id) {
      return formatMessage(id, args, translation)
    }

    // Handle translation fallback logic
    let translationLocale = locale

    // If e.g. en-US translations don't exist, fallback to en-GB
    // Cache Object.keys() result for performance
    if (
      locale.startsWith('en-') &&
      !Object.keys(defaultLocales).some((l) => l === locale)
    ) {
      translationLocale = 'en-GB'
    }

    const base = assignUtils(
      combineWithExternalTranslations({
        translation: (baseOverride || translation) as Translation,
        messages: extMessages as TranslationCustomLocales,
        locale: translationLocale,
      })
    ) as TranslationFlatToObject<T> & AdditionalReturnUtils

    // Inline fallback behavior (opt-in via object arg)
    if (!fallbackLocale) {
      return base
    }

    // Apply pointer fallback only if an explicit current-locale translation exists
    const explicitMessages = extMessages as
      | Record<string, unknown>
      | undefined
    let hasExplicitCurrent = false
    let currentMessages = undefined as T | undefined
    if (explicitMessages && Object.hasOwn(explicitMessages, locale)) {
      hasExplicitCurrent = true
      currentMessages = explicitMessages[locale] as T | undefined
    } else if (
      contextTranslations &&
      Object.hasOwn(contextTranslations, locale)
    ) {
      hasExplicitCurrent = true
      currentMessages = contextTranslations[locale] as T | undefined
    }

    const fallbackMessages =
      ((explicitMessages?.[fallbackLocale] as T | undefined) ||
        (contextTranslations?.[fallbackLocale] as T | undefined) ||
        ((defaultLocales as Record<string, unknown>)[fallbackLocale] as
          | T
          | undefined)) ??
      undefined

    if (!fallbackMessages || !hasExplicitCurrent) {
      return base
    }

    // Cache Object.keys() result for performance
    const currentHasContent =
      isObject(currentMessages) && Object.keys(currentMessages).length > 0

    if (!currentHasContent) {
      warnMissing(locale, warnLabel)
      const obj = generateTranslationKeyReferences(
        '',
        fallbackMessages
      ) as TranslationFlatToObject<T>
      return withUtils(base, obj)
    }

    const { result, hasMissing } = mergeMissingKeys<T>(
      base as TranslationFlatToObject<T>,
      fallbackMessages
    )
    if (hasMissing) {
      warnMissing(locale, warnLabel)
      return withUtils(base, result)
    }

    return base
  }, [
    messages,
    locale,
    assignUtils,
    baseOverride,
    translation,
    extMessages,
    fallbackLocale,
    contextTranslations,
    args,
    warnLabel,
  ])
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
    ...(target as Record<string, unknown>),
  }
  let hasMissing = false

  const keys = Object.keys(source as Record<string, unknown>)
  for (const key of keys) {
    const sourceValue = (source as Record<string, unknown>)[key]
    const targetValue = (resultLocal as Record<string, unknown>)[key]

    if (isObject(sourceValue)) {
      if (!targetValue) {
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
          nested.result as Record<string, unknown>
        if (nested.hasMissing) {
          hasMissing = true
        }
      }
    } else if (targetValue === undefined) {
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

function warnMissing(locale: string, label = 'useTranslation') {
  warn(`${label}: No translations found for locale "${locale}"!`)
}

export type CombineWithExternalTranslationsArgs = {
  translation: Translation
  messages?: TranslationCustomLocales
  locale?: InternalLocale
}
export type AdditionalReturnUtils = {
  formatMessage: typeof formatMessage
  renderMessage: typeof renderMessage
  countries: Array<string>
}
export type CombineWithExternalTranslationsReturn = Translation &
  TranslationCustomLocales &
  AdditionalReturnUtils

export function useAdditionalUtils() {
  const translationsRef = useRef<CombineWithExternalTranslationsReturn>()

  const fM = useCallback(
    (id: TranslationId, args: TranslationArguments) => {
      return formatMessage(id, args, translationsRef.current)
    },
    []
  )

  const rM = useCallback((message: string) => {
    return renderMessage(message)
  }, [])

  const assignUtils = useCallback(
    (translations: CombineWithExternalTranslationsReturn) => {
      translationsRef.current = translations
      Object.assign(translations, { formatMessage: fM, renderMessage: rM })
      return translations
    },
    [fM, rM]
  )

  return { assignUtils }
}

export function combineWithExternalTranslations({
  translation,
  messages,
  locale,
}: CombineWithExternalTranslationsArgs): CombineWithExternalTranslationsReturn {
  let combined = {
    ...translation,
  } as CombineWithExternalTranslationsReturn

  if (messages) {
    if (Object.keys(defaultLocales).some((locale) => messages[locale])) {
      if (messages[locale]) {
        combined = messages[locale]
      }
    }

    for (const key in messages as TranslationCustomLocales) {
      combined[key] = { ...translation[key], ...messages[key] }
    }
  }

  return combined
}

export function formatMessage(
  id: TranslationId | TranslationIdAsFunction,
  args?: TranslationArguments,
  messages?: TranslationCustomLocales
) {
  let str = undefined

  if (typeof id === 'string') {
    let found = false
    if (messages[id]) {
      str = messages[id]
      found = true
    } else if (id?.includes?.('.')) {
      const keys = id.split('.')
      for (const key of keys) {
        if (messages[key]) {
          messages = messages[key]
        } else {
          break
        }
      }
      if (typeof messages === 'string') {
        str = messages
        found = true
      }
    }
    if (!found && typeof id === 'string') {
      str = id
    }
  } else if (typeof id === 'function') {
    str = id(messages)
  }

  if (typeof str === 'string') {
    for (const t in args) {
      str = str.replace(new RegExp(`{${t}}`, 'g'), args[t])
    }
  }

  return str ?? id
}

export function renderMessage(
  text: string | Array<React.ReactNode>
): string | React.ReactNode {
  let element = text

  if (typeof text === 'string') {
    element = text.split('{br}')
  }

  if (Array.isArray(element)) {
    return element.map((item, index) => (
      <Fragment key={index}>
        {item}
        <br />
      </Fragment>
    ))
  }

  return text
}
