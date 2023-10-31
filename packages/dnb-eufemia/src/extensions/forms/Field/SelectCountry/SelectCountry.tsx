import React, { useContext, useMemo } from 'react'
import Selection, { Props as SelectionProps } from '../Selection'
import Option from '../Option'
import countries from '../../constants/countries'
import SharedContext from '../../../../shared/Context'

export type Props = SelectionProps

function SelectCountry(props: Props) {
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

  const lang = sharedContext.locale?.split('-')[0]
  const countryOptions = useMemo(
    () =>
      countries.map((country) => (
        <Option
          key={country.iso}
          value={country.iso}
          title={country.i18n[lang] ?? country.i18n.en}
        />
      )),
    [sharedContext.locale]
  )

  return <Selection {...selectComponentProps}>{countryOptions}</Selection>
}

SelectCountry._supportsSpacingProps = true
export default SelectCountry
