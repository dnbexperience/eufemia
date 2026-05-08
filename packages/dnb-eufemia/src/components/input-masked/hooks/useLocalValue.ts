/**
 * Handle internal value state
 *
 * It handles both the value state given as a prop form outside,
 * along with the current written and internal value.
 *
 * @returns object with internal value state and state setter
 */

import { useContext, useEffect, useState } from 'react'
import InputMaskedContext from '../InputMaskedContext'
import { correctNumberValue } from '../InputMaskedUtils'
import { useTranslation } from './useTranslation'
import { useNumberMaskParams } from './useNumberMaskParams'

export const useLocalValue = () => {
  const { props, context } = useContext(InputMaskedContext)
  const maskParams = useNumberMaskParams() || {}
  const locale = useTranslation()

  const [localValue, setLocalValue] = useState(() => {
    return correctNumberValue({
      locale,
      props,
      maskParams,
    })
  })

  /**
   * Use an effect here, just;
   * because when a property gets changed from outside
   */
  useEffect(() => {
    const value = correctNumberValue({
      localValue,
      locale,
      props,
      maskParams,
    })

    setLocalValue(value)

    // Do not set "localValue" and "maskParams" here
  }, [props, context, locale]) // eslint-disable-line

  return { localValue, setLocalValue }
}
