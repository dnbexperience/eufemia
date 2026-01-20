import React, { useContext } from 'react'
import clsx from 'clsx'
import SharedContext from '../../../../shared/Context'
import { getCurrencySymbol } from '../../../../components/number-format/NumberUtils'
import { CURRENCY } from '../../../../shared/defaults'
import { CurrencyISO } from '../../constants/currencies'
import useDataValue from '../../hooks/useDataValue'
import NumberField, { Props as NumberFieldProps } from '../Number'
import { PathStrict } from '../../types'

export type Props = NumberFieldProps & {
  /**
   * Will change the currency.
   * You can also set a path as the value, e.g. `/myCurrencyPath`.
   */
  currency?: PathStrict | CurrencyISO
}

function Currency(props: Props) {
  const sharedContext = useContext(SharedContext)
  const { getSourceValue } = useDataValue()

  const currencyValue = getSourceValue(props.currency)

  const preparedProps = {
    ...props,
    currency: currencyValue ?? CURRENCY,
    placeholder:
      props.placeholder ??
      getCurrencySymbol(
        sharedContext?.locale,
        currencyValue,
        props.currencyDisplay
      ),
  }

  return (
    <NumberField
      {...preparedProps}
      className={clsx('dnb-forms-field-currency', props.className)}
    />
  )
}

Currency._supportsSpacingProps = true
export default Currency
