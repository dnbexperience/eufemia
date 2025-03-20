import React from 'react'
import classnames from 'classnames'
import { useTranslation, useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCurrency from './useCurrency'
import type { CurrencyISO } from '../../constants/currencies'

export type Props = ValueProps<string> & {
  /**
   * The value of the component.
   */
  value?: CurrencyISO
}

function SelectCurrency(props: Props) {
  const translations = useTranslation().SelectCurrency
  const {
    value,
    className,
    label = translations.label,
    ...rest
  } = useValueProps(props)

  const { getCurrencyDisplayNameByIso } = useCurrency()

  return (
    <ValueBlock
      label={label}
      className={classnames('dnb-forms-value-select-currency', className)}
      {...rest}
    >
      {getCurrencyDisplayNameByIso(value)}
    </ValueBlock>
  )
}

SelectCurrency.useCurrency = useCurrency
SelectCurrency._supportsSpacingProps = true
export default SelectCurrency
