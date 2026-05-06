/**
 * Returns locale from either component or context
 *
 * @returns String
 */

import { useContext } from 'react'
import InputMaskedContext from '../InputMaskedContext'

export const useTranslation = () => {
  const { props, context } = useContext(InputMaskedContext)

  let { locale } = props
  if (!locale && context?.locale) {
    locale = context.locale
  }

  return locale as string
}
