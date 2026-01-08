import React, { useContext } from 'react'
import type {
  TranslationArguments,
  TranslationId,
  TranslationIdAsFunction} from './useTranslation';
import {
  formatMessage,
} from './useTranslation'
import type {
  TranslationCustomLocales,
  TranslationFlatToObject,
} from './Context';
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
  const { translation } = useContext(SharedContext)
  const result = formatMessage(id || children, params, translation)

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

export function mergeTranslations(
  ...translations: Array<Record<string, any>>
) {
  return translations.reduce((acc, cur) => {
    Object.keys(cur).forEach((key) => {
      if (
        acc[key] !== null &&
        cur[key] !== null &&
        typeof acc[key] === 'object' &&
        typeof cur[key] === 'object'
      ) {
        acc[key] = mergeTranslations(acc[key], cur[key])
      } else {
        acc[key] = cur[key]
      }
    })

    return acc
  }, {})
}
