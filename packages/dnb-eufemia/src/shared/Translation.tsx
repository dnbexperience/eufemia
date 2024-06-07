import React, { useContext } from 'react'
import {
  TranslationArguments,
  TranslationId,
  TranslationIdAsFunction,
  formatMessage,
} from './useTranslation'
import Context, { TranslationCustomLocales } from './Context'

export type TranslationProps<T = TranslationCustomLocales> = {
  id?: TranslationId | TranslationIdAsFunction<T>
  children?: TranslationId
} & TranslationArguments

export default function Translation({
  id,
  children,
  ...params
}: TranslationProps) {
  const { translation } = useContext(Context)
  return formatMessage(id || children, params, translation)
}

export function getTranslation(id: TranslationId, params) {
  return <Translation id={id} {...params} />
}
