import { useContext } from 'react'
import {
  TranslationArguments,
  TranslationId,
  TranslationIdAsFunction,
  formatMessage,
} from './useTranslation'
import SharedContext, {
  TranslationCustomLocales,
  TranslationFlatToObject,
} from './Context'

export type TranslationProps<T = TranslationCustomLocales> = {
  id?: TranslationId | TranslationIdAsFunction<TranslationFlatToObject<T>>
  children?: TranslationId
} & TranslationArguments

export default function Translation({
  id,
  children,
  ...params
}: TranslationProps) {
  const { translation } = useContext(SharedContext)
  const result = formatMessage(id || children, params, translation)

  if (typeof result !== 'string') {
    return String(id)
  }

  return result
}
