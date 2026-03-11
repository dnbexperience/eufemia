import React from 'react'
import StringValue, { Props as StringValueProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = StringValueProps

function Email(props: Props) {
  const translations = useTranslation().Email

  const stringProps: Props = {
    ...props,
    label: props.label ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

export default withComponentMarkers(Email, { _supportsSpacingProps: true })
