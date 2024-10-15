import React, { Fragment, useContext, useMemo } from 'react'
import Context, {
  Translation,
  TranslationLocale,
  TranslationCustomLocales,
  InternalLocale,
} from './Context'
import defaultLocales from './locales'

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

export default function useTranslation<T = Translation>(
  messages?: UseTranslationMessages<T>,
  args?: TranslationArguments
) {
  const { locale, translation } = useContext(Context)

  return useMemo(() => {
    const id = typeof messages === 'string' ? messages : undefined
    if (id) {
      return formatMessage(id, args, translation)
    }

    return combineWithExternalTranslations({
      translation,
      messages,
      locale,
    }) as T
  }, [locale, messages, args, translation])
}

export type CombineWithExternalTranslationsArgs = {
  translation: Translation
  messages?: TranslationCustomLocales
  locale?: InternalLocale
}
export type FormatMessage = {
  formatMessage: typeof formatMessage
  renderWithFormatting: typeof renderWithFormatting
}
export type CombineWithExternalTranslationsReturn = Translation &
  TranslationCustomLocales &
  FormatMessage

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

  combined.formatMessage = (
    id: TranslationId,
    args: TranslationArguments
  ) => {
    return formatMessage(id, args, combined)
  }

  // Support line-breaks
  combined.renderWithFormatting = renderWithFormatting

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

    if (str.includes('{br}')) {
      return renderWithFormatting(str)
    }
  }

  return str ?? id
}

export function renderWithFormatting(
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
