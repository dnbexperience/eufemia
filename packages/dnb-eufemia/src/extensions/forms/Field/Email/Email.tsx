import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

function Email(props: Props) {
  const { label, errorRequired, errorPattern } = useTranslation().Email

  const errorMessages = useMemo(
    () => ({
      'Field.errorRequired': errorRequired,
      'Field.errorPattern': errorPattern,
      ...props.errorMessages,
    }),
    [errorPattern, errorRequired, props.errorMessages]
  )

  const StringFieldProps: Props = {
    label,
    autoComplete: 'email',
    inputMode: 'email',
    pattern:
      `^(?!.*\\.\\.)(?!.*--)(?!.*\\.-)(?!.*-\\.)` + // No consecutive dots, hyphens, or dot-hyphen sequences
      `[a-zA-Z0-9]+([._%+-]?[a-zA-Z0-9]+)*@` + // Local part: letters, numbers, dots, etc.
      `(?:` +
      `([a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\\.[a-zA-Z]{2,})` + // Domain part: standard domain names
      `|` +
      `\\[(?:` +
      `(?:\\d{1,3}\\.){3}\\d{1,3}` + // Allow IPv4 address (no validation)
      `|` +
      `IPv6:[0-9a-fA-F:]+` + // Allow IPv6 address (no validation)
      `)\\]` +
      `)$`,
    trim: true,
    ...props,
    errorMessages,
  }

  return <StringField {...StringFieldProps} />
}

Email._supportsSpacingProps = true
export default Email
