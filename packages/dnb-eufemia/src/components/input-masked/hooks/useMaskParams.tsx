/**
 * Returns the final mask params
 *
 * @returns mask params
 */

import React from 'react'
import { isTrue } from '../../../shared/component-helper'
import InputMaskedContext from '../InputMaskedContext'
import { useMask } from './useMask'
import { useNumberMaskParams } from './useNumberMaskParams'

export const useMaskParams = () => {
  const { props } = React.useContext(InputMaskedContext)

  const { showMask, placeholder } = props

  const mask = useMask()
  const maskParams = useNumberMaskParams() || {}

  maskParams.showMask = !placeholder && isTrue(showMask)

  if (typeof mask?.showMask !== 'undefined') {
    maskParams.showMask = mask.showMask
  }

  return maskParams
}
