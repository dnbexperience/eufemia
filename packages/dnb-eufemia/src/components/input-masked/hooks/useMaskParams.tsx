/**
 * Returns the final mask params
 *
 * @returns mask params
 */

import React from 'react'
import { isTrue } from '../../../shared/component-helper'
import InputMaskedContext from '../InputMaskedContext'
import { invisibleSpace } from '../InputMaskedUtils'
import { useMask } from './useMask'
import { useNumberMaskParams } from './useNumberMaskParams'

export const useMaskParams = () => {
  const { props } = React.useContext(InputMaskedContext)

  const {
    keepCharPositions,
    showGuide,
    showMask,
    placeholderChar,
    placeholder,
  } = props

  const mask = useMask()
  const maskParams = useNumberMaskParams() || {}

  maskParams.showMask = !placeholder && isTrue(showMask)

  // Revalidated placeholder char to a zero width space
  maskParams.placeholderChar = placeholderChar
  if (typeof mask?.placeholderChar !== 'undefined') {
    maskParams.placeholderChar = mask.placeholderChar
  }
  if (maskParams.placeholderChar === null) {
    maskParams.placeholderChar = invisibleSpace
  }

  if (typeof mask?.showMask !== 'undefined') {
    maskParams.showMask = mask.showMask
  }

  maskParams.showGuide = isTrue(showGuide)
  maskParams.keepCharPositions = isTrue(keepCharPositions)

  return maskParams
}
