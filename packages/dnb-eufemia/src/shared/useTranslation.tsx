import { useContext, useMemo } from 'react'
import Context, {
  Translation,
  TranslationLocale,
  TranslationCustomLocales,
  InternalLocale,
} from './Context'
import defaultLocales from './locales'

export type TranslationId = string
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
      return formatMessage(String(id), args, translation)
    }

    return combineTranslations({
      translation,
      messages,
      locale,
    }) as T
  }, [locale, messages, args, translation])
}

export type CombineTranslationsArgs = {
  translation: Translation
  messages?: TranslationCustomLocales
  locale?: InternalLocale
}
export type CombineTranslationsReturn = Translation &
  TranslationCustomLocales & {
    formatMessage: typeof formatMessage
  }

export function combineTranslations({
  translation,
  messages,
  locale,
}: CombineTranslationsArgs): CombineTranslationsReturn {
  let combined = { ...translation } as CombineTranslationsReturn

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
    return formatMessage(id, args, translation)
  }

  return combined
}

export function formatMessage(
  id: TranslationId,
  args: TranslationArguments,
  messages: TranslationCustomLocales
) {
  let str = undefined

  if (messages[id]) {
    str = messages[id]
  } else if (id.includes('.')) {
    const keys = id.split('.')
    let obj = messages
    for (const key of keys) {
      if (obj[key]) {
        obj = obj[key]
      } else {
        break
      }
    }
    if (typeof obj === 'string') {
      str = obj
    }
  }

  if (str) {
    for (const t in args) {
      str = str.replace(new RegExp(`{${t}}`, 'g'), args[t])
    }
  }

  return str
}
