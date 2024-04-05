import React, { useContext } from 'react'
import {
  TranslationArguments,
  TranslationId,
  formatMessage,
} from './useTranslation'
import Context from './Context'

export type Props = {
  id?: TranslationId
  children?: TranslationId
} & TranslationArguments

export default function Translation({ id, children, ...params }: Props) {
  const { translation } = useContext(Context)
  return formatMessage(id || children, params, translation)
}

export function getTranslation(id: TranslationId, params) {
  return <Translation id={id} {...params} />
}
