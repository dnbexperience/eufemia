import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringValueProps

function Name(props: Props) {
  const StringValueProps: Props = {
    ...props,
  }

  return <StringValue {...StringValueProps} />
}
Name._supportsSpacingProps = true

Name.First = function FirstName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.FirstName.label,
  }

  return <Name {...nameProps} />
}
Name.First['_supportsSpacingProps'] = true

Name.Last = function LastName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.LastName.label,
  }

  return <Name {...nameProps} />
}
Name.Last['_supportsSpacingProps'] = true

Name.Company = function CompanyName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.CompanyName.label,
  }

  return <Name {...nameProps} />
}
Name.Company['_supportsSpacingProps'] = true

export default Name
