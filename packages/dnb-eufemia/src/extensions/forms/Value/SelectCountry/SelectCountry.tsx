import React from 'react'
import classnames from 'classnames'
import { useTranslation, useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCountry from './useCountry'
import type { CountryISO } from '../../constants/countries'

export type Props = ValueProps<string> & {
  /**
   * The value of the component.
   */
  value?: CountryISO
}

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
      className={classnames('dnb-forms-value-select-country', className)}
      {...rest}
    >
      {getCountryNameByIso(value)}
    </ValueBlock>
  )
}

SelectCountry.useCountry = useCountry
SelectCountry._supportsSpacingProps = true
export default SelectCountry
