import React from 'react'
import clsx from 'clsx'
import { useTranslation, useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCurrency from './useCurrency'
import type { CurrencyISO } from '../../constants/currencies'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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
    // @ts-ignore -- strictFunctionTypes
    <ValueBlock
      label={label}
      className={clsx('dnb-forms-value-select-currency', className)}
      {...rest}
    >
      {getCurrencyDisplayNameByIso(value) ?? value}
    </ValueBlock>
  )
}

SelectCurrency.useCurrency = useCurrency
withComponentMarkers(SelectCurrency, {
  _supportsSpacingProps: true,
})

export default SelectCurrency
