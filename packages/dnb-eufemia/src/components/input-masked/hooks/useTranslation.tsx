/**
 * Returns locale from either component or context
 *
 * @returns string
 */

import React from 'react'
import InputMaskedContext from '../InputMaskedContext'

export const useTranslation = () => {
  const { props, context } = React.useContext(InputMaskedContext)

  let { locale } = props
  if (!locale && context?.locale) {
    locale = context.locale
  }

  return locale as string
}
