import React, { useMemo } from 'react'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'

export type Props = StringFieldProps

export const pattern =
  `^[A-Za-z0-9_]+(?:[._%+-][A-Za-z0-9_]+)*@` + // Local part: alnum/underscore + separators, no consecutive symbols
  `(?:` +
  // Multi-label domain ending with a TLD (e.g. example.com, sub.example.co.uk)
  `(?:` +
  `(?:xn--[A-Za-z0-9-]+|[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\\.)+` +
  `(?:[A-Za-z]{2,}|xn--[A-Za-z0-9-]{2,})` +
  `|` +
  // Single-label TLDs (e.g. xn--p1ai, com if you choose to allow it)
  `(?:[A-Za-z]{2,}|xn--[A-Za-z0-9-]{2,})` +
  `|` +
  // IP literals
  `\\[(?:` +
  `\\d{1,3}(?:\\.\\d{1,3}){3}` + // IPv4 literal (basic format only)
  `|` +
  `IPv6:[0-9A-Fa-f:]+` + // IPv6 literal (basic format only)
  `)\\]` +
  `)$`

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
    pattern,
    trim: true,
    ...props,
    errorMessages,
  }

  return <StringField {...StringFieldProps} />
}

Email._supportsSpacingProps = true
export default Email
