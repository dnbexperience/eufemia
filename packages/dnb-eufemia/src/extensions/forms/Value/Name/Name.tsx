import React from 'react'
import type { Props as StringValueProps } from '../String'
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = StringValueProps

function Name(props: Props) {
  const StringValueProps: Props = {
    ...props,
  }

  return <StringValue {...StringValueProps} />
}
withComponentMarkers(Name, { _supportsSpacingProps: true })

Name.First = function FirstName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.FirstName.label,
  }

  return <Name {...nameProps} />
}
;(Name.First as unknown as Record<string, unknown>)[
  '_supportsSpacingProps'
] = true

Name.Last = function LastName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.LastName.label,
  }

  return <Name {...nameProps} />
}
;(Name.Last as unknown as Record<string, unknown>)[
  '_supportsSpacingProps'
] = true

Name.Company = function CompanyName(props: Props) {
  const translations = useTranslation()

  const nameProps: Props = {
    ...props,
    label: props.label ?? translations.CompanyName.label,
  }

  return <Name {...nameProps} />
}
;(Name.Company as unknown as Record<string, unknown>)[
  '_supportsSpacingProps'
] = true

export default Name
