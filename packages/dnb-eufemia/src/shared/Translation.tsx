import { isValidElement, useContext } from 'react'
import type { JSX } from 'react'
import type {
  TranslationArguments,
  TranslationId,
  TranslationIdAsFunction,
} from './useTranslation'
import { formatMessage } from './useTranslation'
import type {
  TranslationCustomLocales,
  TranslationFlatToObject,
} from './Context'
import SharedContext from './Context'
import renderWithFormatting from './renderWithFormatting'

export type TranslationProps<T = TranslationCustomLocales> = {
  id?: TranslationId | TranslationIdAsFunction<TranslationFlatToObject<T>>
  children?: TranslationId
} & TranslationArguments

const TranslationImpl = <T = TranslationCustomLocales,>({
  id,
  children,
  ...params
}: TranslationProps<T>) => {
  const { translation, locale, messageFormatter } =
    useContext(SharedContext)
  const result = formatMessage(
    (id || children) as
      | string
      | TranslationIdAsFunction<TranslationCustomLocales>,
    params,
    translation,
    locale,
    messageFormatter
  )

  if (isValidElement(result) || Array.isArray(result)) {
    return <>{result}</>
  }

  if (typeof result !== 'string') {
    return <>{String(id)}</>
  }

  return <>{renderWithFormatting(result)}</>
}

type TranslationFn = <T = TranslationCustomLocales>(
  props: TranslationProps<T>
) => JSX.Element

export type TranslationComponent = TranslationFn & {
  withTypes: <T = TranslationCustomLocales>() => (
    props: TranslationProps<T>
  ) => JSX.Element
}

const Translation = TranslationImpl as unknown as TranslationComponent

Translation.withTypes = function withTypes<
  T = TranslationCustomLocales,
>() {
  return function TypedTranslation(props: TranslationProps<T>) {
    return <TranslationImpl {...(props as TranslationProps)} />
  }
}

export default Translation

function isPlainObject(value: unknown): value is Record<string, any> {
  if (value === null || typeof value !== 'object') {
    return false
  }

  if (Array.isArray(value)) {
    return false
  }

  return Object.getPrototypeOf(value) === Object.prototype
}

export function mergeTranslations(
  ...translations: Array<Record<string, any>>
) {
  return translations.reduce((acc, cur) => {
    Object.keys(cur).forEach((key) => {
      const accValue = acc[key]
      const curValue = cur[key]

      // Preserve arrays and merge them as arrays
      if (Array.isArray(accValue) && Array.isArray(curValue)) {
        acc[key] = [...accValue, ...curValue]
        return
      }

      // Deep-merge only plain objects
      if (isPlainObject(accValue) && isPlainObject(curValue)) {
        acc[key] = mergeTranslations(accValue, curValue)
        return
      }

      // Default: last value wins
      acc[key] = curValue
    })

    return acc
  }, {})
}
