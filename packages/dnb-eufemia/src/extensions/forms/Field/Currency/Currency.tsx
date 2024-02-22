import React, { useContext } from 'react'
import classnames from 'classnames'
import { Context } from '../../DataContext/'
import { getCurrencySymbol } from '../../../../components/number-format/NumberUtils'
import { CURRENCY } from '../../../../shared/defaults'
import NumberField, { Props as NumberFieldProps } from '../Number'

export type Props = NumberFieldProps

function Currency(props: Props) {
  const context = useContext(Context)
  const preparedProps = {
    ...props,
    currency: props.currency ?? CURRENCY,
    placeholder:
      props.placeholder ??
      getCurrencySymbol(
        context?.locale,
        props.currency,
        props.currencyDisplay
      ),
  }

  return (
    <NumberField
      {...preparedProps}
      className={classnames('dnb-forms-field-currency', props.className)}
    />
  )
}

Currency._supportsSpacingProps = true
export default Currency
