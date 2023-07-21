import React, { useContext } from 'react'
import Select, { Props as SelectProps } from './Select'
import Option from './Option'
import countries from '../constants/countries'
import SharedContext from '../../../shared/Context'

export type Props = SelectProps

export default function FieldSelectCountry(props: Props) {
  const sharedContext = useContext(SharedContext)

  const selectComponentProps: Props = {
    ...props,
    placeholder:
      props.placeholder ??
      sharedContext?.translation.Forms.selectCountryPlaceholder,
    label:
      props.label ?? sharedContext?.translation.Forms.selectCountryLabel,
    errorMessages: {
      required:
        sharedContext?.translation.Forms.selectCountryErrorRequired,
      ...props.errorMessages,
    },
  }

  return (
    <Select {...selectComponentProps}>
      {countries.map((country) => (
        <Option
          key={country.iso}
          value={country.iso}
          title={country.name}
        />
      ))}
    </Select>
  )
}
