import React from 'react'
import classnames from 'classnames'
import { useTranslation, useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCurrency from './useCurrency'
import type { CurrencyISO } from '../../constants/currencies'

export type Props = ValueProps<CurrencyISO>

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
      {getCurrencyDisplayNameByIso(value) ?? value}
    </ValueBlock>
  )
}

SelectCurrency.useCurrency = useCurrency
SelectCurrency._supportsSpacingProps = true
export default SelectCurrency
