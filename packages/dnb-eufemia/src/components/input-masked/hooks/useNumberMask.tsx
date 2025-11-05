/**
 * Create createNumberMask if number mask parameters exists
 *
 * @returns mask function
 */

import { useContext, useMemo } from 'react'
import InputMaskedContext from '../InputMaskedContext'
import { isRequestingNumberMask } from '../InputMaskedUtils'
import { useNumberMaskParams } from './useNumberMaskParams'
import type { MaskParams } from '../text-mask/types'

export const useNumberMask = () => {
  const mP = useNumberMaskParams()
  const { props } = useContext(InputMaskedContext)

  // Memoize mask creation based on relevant maskParams properties
  const mask = useMemo(() => {
    return createNumberMask(mP)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // Include all properties that affect mask behavior
    mP.thousandsSeparatorSymbol,
    mP.decimalSymbol,
    mP.allowDecimal,
    mP.decimalLimit,
    mP.integerLimit,
    mP.allowNegative,
    mP.prefix,
    mP.suffix,
    mP.disallowLeadingZeroes,
    mP.min,
    mP.max,
  ])

  if (!mP || !isRequestingNumberMask(props)) {
    return null
  }

  return mask
}

export function createNumberMask(maskParams: MaskParams = {}) {
  const numberMask = function () {
    return []
  }
  numberMask.instanceOf = 'createNumberMask'
  numberMask.maskParams = maskParams

  return numberMask
}
