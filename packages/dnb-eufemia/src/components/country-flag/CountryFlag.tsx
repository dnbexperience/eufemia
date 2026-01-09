import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import SharedContext from '../../shared/Context'
import { COUNTRY as defaultCountry } from '../../shared/defaults'
import useCountries from '../../extensions/forms/Field/SelectCountry/useCountries'
import type { SpaceAllProps } from '../space/Space'
import Space from '../space/Space'

type CountryFlagProps = {
  iso?: string
  size?:
    | 'auto'
    | 'xx-small'
    | 'x-small'
    | 'small'
    | 'medium'
    | 'large'
    | 'x-large'
  shape?: 'round' | 'square'
} & Omit<SpaceAllProps, 'size'>

const CountryFlag = (props: CountryFlagProps) => {
  const { iso = defaultCountry, size, shape, className, ...rest } = props

  const { locale } = useContext(SharedContext)
  const { countries } = useCountries()
  const countryName = useMemo(() => {
    return countries.find((item) => item.iso === iso)?.i18n[
      locale.split('-')[0]
    ]
  }, [countries, iso, locale])

  return (
    <Space
      element="span"
      className={classnames(
        'dnb-country-flag',
        'dnb-country-flag__size--' + (size || 'auto'),
        shape && 'dnb-country-flag__shape--' + shape,
        className
      )}
      {...rest}
    >
      <span className="dnb-sr-only">{countryName}</span>
      <span
        className={`dnb-country-flag__flag fis fi-${iso.toLowerCase()}`}
      />
    </Space>
  )
}

CountryFlag._supportsSpacingProps = true

export default CountryFlag
