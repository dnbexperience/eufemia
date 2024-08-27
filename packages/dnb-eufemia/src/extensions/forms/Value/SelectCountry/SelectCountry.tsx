import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { useTranslation, useValueProps } from '../../hooks'
import { ValueProps } from '../../types'
import ValueBlock from '../../ValueBlock'
import SharedContext from '../../../../shared/Context'
import { getCountryData } from '../../Field/SelectCountry'
import { CountryLang } from '../../constants/countries'

export type Props = ValueProps<string>

function SelectCountry(props: Props) {
  const { locale } = useContext(SharedContext)
  const translations = useTranslation().SelectCountry
  const {
    value,
    className,
    label = translations.label,
    ...rest
  } = useValueProps(props)

  const countryName = useMemo(() => {
    if (!value) {
      return null
    }

    const lang = locale?.split('-')[0] as CountryLang
    return getCountryData({
      lang,
      filter: (country) => {
        return country.iso === value
      },
    }).at(0)?.content
  }, [locale, value])

  return (
    <ValueBlock
      label={label}
      className={classnames('dnb-forms-value-select-country', className)}
      {...rest}
    >
      {countryName}
    </ValueBlock>
  )
}

SelectCountry._supportsSpacingProps = true
export default SelectCountry
