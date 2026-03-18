import React from 'react'
import clsx from 'clsx'
import { useTranslation, useValueProps } from '../../hooks'
import type { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import useCountry from './useCountry'
import type { CountryISO } from '../../constants/countries'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

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
    // @ts-expect-error -- strictFunctionTypes
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
withComponentMarkers(SelectCountry, {
  _supportsSpacingProps: true,
})

export default SelectCountry
