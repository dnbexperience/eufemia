/**
 * Create createNumberMask if number mask parameters exists
 *
 * @returns mask function
 */

import { useContext, useMemo } from 'react'
import InputMaskedContext from '../InputMaskedContext'
import { isRequestingNumberMask } from '../InputMaskedUtils'
import createNumberMask from '../addons/createNumberMask'
import { useNumberMaskParams } from './useNumberMaskParams'

export const useNumberMask = () => {
  const mP = useNumberMaskParams()
  const { props } = useContext(InputMaskedContext)

  // Memoize mask creation based on relevant maskParams properties
  const mask = useMemo(() => {
    const m = createNumberMask(mP)
    m.maskParams = mP
    return m

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
