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
  const { assignUtils } = useAdditionalUtils()

  return useMemo(() => {
    const id = typeof messages === 'string' ? messages : undefined
    if (id) {
      return formatMessage(id, args, translation)
    }

    return assignUtils(
      combineWithExternalTranslations({
        translation,
        messages,
        locale,
      })
    )
  }, [messages, translation, locale, assignUtils, args])
}

export type CombineWithExternalTranslationsArgs = {
  translation: Translation
  messages?: TranslationCustomLocales
  locale?: InternalLocale
}
export type AdditionalReturnUtils = {
  formatMessage: typeof formatMessage
  renderMessage: typeof renderMessage
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
