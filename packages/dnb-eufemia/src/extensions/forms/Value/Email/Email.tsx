import type { ValueStringProps as StringValueProps } from '../String'
import StringValue from '../String'
import useTranslation from '../../hooks/useTranslation'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type ValueEmailProps = StringValueProps

function Email(props: ValueEmailProps) {
  const translations = useTranslation().Email

  const stringProps: ValueEmailProps = {
    ...props,
    defaultLabel: props.defaultLabel ?? translations.label,
  }
  return <StringValue {...stringProps} />
}

withComponentMarkers(Email, { _supportsSpacingProps: true })

export default Email
