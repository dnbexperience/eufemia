/**
 * Returns either internal mask or given property mask
 *
 * @returns mask function
 */

import React from 'react'
import InputMaskedContext from '../InputMaskedContext'
import { useNumberMask } from './useNumberMask'

export const useMask = () => {
  const { props } = React.useContext(InputMaskedContext)

  const numberMask = useNumberMask()
  if (numberMask) {
    return numberMask
  }

  return props.mask
}
