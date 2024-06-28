import { useContext, useMemo } from 'react'
import Context, {
  Translation,
  TranslationLocale,
  TranslationCustomTranslations,
  InternalLocale,
} from './Context'
import defaultLocales from './locales'

export type TranslationId = string
export type TranslationIdAsFunction<T = TranslationCustomTranslations> = (
  messages: T & Translation
) => string
export type TranslationArguments = Record<TranslationId, unknown>
export type UseTranslationMessages<T = Translation> =
  | TranslationId
  | Translation
  | TranslationCustomTranslations
  | Record<TranslationLocale, T>
  | T

export type FormatMessage = (
  id: TranslationId,
  args?: TranslationArguments,
  translation?: Translation
) => string

export default function useTranslation<T = Translation>(
  messages?: UseTranslationMessages<T>,
  args?: TranslationArguments
) {
  const { locale, translation } = useContext(Context)

  return useMemo(() => {
    const id = typeof messages === 'string' ? messages : undefined
    if (id) {
      // return formatMessage<T>(id, args, translation)
    }

    // return translation

    return combineWithExternalTranslations<T>({
      translation,
      messages,
      locale,
    })
  }, [locale, messages, args, translation])
}

export type CombineWithExternalTranslationsArgs<T> = {
  translation: Translation | T
  // translation: T
  messages?: TranslationCustomTranslations
  // messages?: T
  locale?: InternalLocale
}
export type CombineWithExternalTranslationsReturn = Translation &
  TranslationCustomTranslations & {
    formatMessage: FormatMessage
  }

function formatCombinedMessage<T>(
  id: TranslationId,
  args: TranslationArguments,
  combined: TranslationCustomTranslations
) {
  return formatMessage<T>(id, args, combined)
}

export function combineWithExternalTranslations<T = Translation>({
  translation,
  messages,
  locale,
}: CombineWithExternalTranslationsArgs<T>) {
  // : CombineWithExternalTranslationsReturn

  let combined = {
    ...translation,
  }
  //  as typeof translation &
  //   T & {
  //     formatMessage: FormatMessage
  //   }

  if (messages) {
    if (Object.keys(defaultLocales).some((locale) => messages[locale])) {
      if (messages[locale]) {
        combined = messages[locale]
      }
    }

    for (const key in messages as TranslationCustomTranslations) {
      combined[key] = { ...translation[key], ...messages[key] }
    }
  }

  // combined.formatMessage = (
  //   id: TranslationId,
  //   args: TranslationArguments
  // ) => {
  //   return formatCombinedMessage<T>(id, args, combined)
  // }

  return combined
}

const formatMessageReplace = (str: string, args: TranslationArguments) => {
  if (str) {
    for (const t in args) {
      str = str.replace(new RegExp(`{${t}}`, 'g'), String(args[t]))
    }
  }
  return str
}

export function formatMessage<T = Translation>(
  id: TranslationId | TranslationIdAsFunction,
  args: TranslationArguments,
  messages: TranslationCustomTranslations | T
) {
  if (typeof id === 'function') {
    return formatMessageReplace(id(messages), args)
  } else if (messages[id]) {
    return formatMessageReplace(messages[id], args)
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
      return formatMessageReplace(messages, args)
    }
  }

  return undefined
}
