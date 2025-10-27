/**
 * Create createNumberMask if number mask parameters exists
 *
 * @returns mask function
 */

import React from 'react'
import InputMaskedContext from '../InputMaskedContext'
import { isRequestingNumberMask } from '../InputMaskedUtils'
import createNumberMask from '../addons/createNumberMask'
import { useNumberMaskParams } from './useNumberMaskParams'

export const useNumberMask = () => {
  const maskParams = useNumberMaskParams()
  const { props } = React.useContext(InputMaskedContext)

  if (!maskParams || !isRequestingNumberMask(props)) {
    return null
  }

  const mask = createNumberMask(maskParams)

  mask.maskParams = maskParams

  return mask
}
