/**
 * Returns number mask parameters if requested by the component properties
 *
 * @returns object of number mask parameter
 */

import React from 'react'
import {
  isTrue,
  extendPropsWithContext,
} from '../../../shared/component-helper'
import { getCurrencySymbol } from '../../number-format/NumberUtils'
import InputMaskedContext from '../InputMaskedContext'

import {
  isRequestingLocaleSupport,
  isRequestingNumberMask,
  handlePercentMask,
  handleCurrencyMask,
  handleNumberMask,
  handleThousandsSeparator,
  handleDecimalSeparator,
  fromJSON,
} from '../InputMaskedUtils'

import { useTranslation } from './useTranslation'

export const useNumberMaskParams = () => {
  const { props } = React.useContext(InputMaskedContext)
  const locale = useTranslation()

  if (!isRequestingNumberMask(props)) {
    return { ...(fromJSON(props.maskOptions) as Record<string, unknown>) }
  }

  let { numberMask, currencyMask, maskOptions } = props
  const { asNumber, asPercent, asCurrency, value } = props

  maskOptions = fromJSON(maskOptions) as any
  numberMask = isTrue(numberMask) ? {} : (fromJSON(numberMask) as any)
  currencyMask = isTrue(currencyMask)
    ? {}
    : (fromJSON(currencyMask, {
        currency: currencyMask,
      }) as any)
  if (!currencyMask?.currency) {
    delete currencyMask.currency
  }

  if (isRequestingLocaleSupport(props)) {
    const thousandsSeparatorSymbol = handleThousandsSeparator(locale)
    const decimalSymbol = handleDecimalSeparator(locale)

    if (isTrue(asNumber) || isTrue(asPercent)) {
      numberMask = extendPropsWithContext(numberMask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
      })
    } else if (asCurrency) {
      currencyMask = extendPropsWithContext(currencyMask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
        currency: (getCurrencySymbol as any)(
          locale,
          typeof asCurrency === 'string' ? asCurrency : null,
          currencyMask?.currencyDisplay,
          value
        ),
      })
    }
  }

  let maskParams = null

  if (numberMask) {
    maskParams = handleNumberMask({
      maskOptions,
      numberMask,
    })

    if (isTrue(asPercent)) {
      maskParams = handlePercentMask({ props, locale, maskParams })
    }
  } else if (currencyMask) {
    maskParams = handleCurrencyMask({
      maskOptions,
      currencyMask,
    })
  }

  return maskParams
}
