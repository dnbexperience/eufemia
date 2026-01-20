import React from 'react'
import clsx from 'clsx'
import { useTranslation, useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCountry from './useCountry'
import type { CountryISO } from '../../constants/countries'

export type Props = ValueProps<CountryISO>

function SelectCountry(props: Props) {
  const translations = useTranslation().SelectCountry
  const {
    value,
    className,
    label = translations.label,
    ...rest
  } = useValueProps(props)

  const { getCountryNameByIso } = useCountry()

  return (
    <ValueBlock
      label={label}
      className={clsx('dnb-forms-value-select-country', className)}
      {...rest}
    >
      {getCountryNameByIso(value) ?? value}
    </ValueBlock>
  )
}

SelectCountry.useCountry = useCountry
SelectCountry._supportsSpacingProps = true
export default SelectCountry
