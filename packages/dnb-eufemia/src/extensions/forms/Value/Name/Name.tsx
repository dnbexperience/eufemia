import React from 'react'
import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueNameProps = StringValueProps

function Name(props: ValueNameProps) {
  const StringValueProps: ValueNameProps = {
    ...props,
  }

  return <StringValue {...StringValueProps} />
}
withComponentMarkers(Name, { _supportsSpacingProps: true })

Name.First = function FirstName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    label: props.label ?? translations.FirstName.label,
  }

  return <Name {...nameProps} />
}
Name.First['_supportsSpacingProps'] = true

Name.Last = function LastName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    label: props.label ?? translations.LastName.label,
  }

  return <Name {...nameProps} />
}
Name.Last['_supportsSpacingProps'] = true

Name.Company = function CompanyName(props: ValueNameProps) {
  const translations = useTranslation()

  const nameProps: ValueNameProps = {
    ...props,
    label: props.label ?? translations.CompanyName.label,
  }

  return <Name {...nameProps} />
}
Name.Company['_supportsSpacingProps'] = true

export default Name
