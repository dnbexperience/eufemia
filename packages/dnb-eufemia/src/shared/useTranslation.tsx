import { useContext, useMemo } from 'react'
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

export type combineWithExternalTranslationsArgs = {
  translation: Translation
  messages?: TranslationCustomLocales
  locale?: InternalLocale
}
export type combineWithExternalTranslationsReturn = Translation &
  TranslationCustomLocales & {
    formatMessage: typeof formatMessage
  }

export function combineWithExternalTranslations({
  translation,
  messages,
  locale,
}: combineWithExternalTranslationsArgs): combineWithExternalTranslationsReturn {
  let combined = {
    ...translation,
  } as combineWithExternalTranslationsReturn

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

  return combined
}

export function formatMessage(
  id: TranslationId | TranslationIdAsFunction,
  args: TranslationArguments,
  messages: TranslationCustomLocales
) {
  let str = undefined

  if (typeof id === 'function') {
    str = id(messages)
  } else if (messages[id]) {
    str = messages[id]
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
    }
  }

  if (str) {
    for (const t in args) {
      str = str.replace(new RegExp(`{${t}}`, 'g'), args[t])
    }
  }

  return str
}
