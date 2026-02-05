import React, { useMemo } from 'react'
import * as z from 'zod'
import StringField, { Props as StringFieldProps } from '../String'
import useTranslation from '../../hooks/useTranslation'
import type { Schema } from '../../types'

export type Props = StringFieldProps

// Allow Unicode characters in local part (before @) - SMTPUTF8 support
const aText = `[A-Za-z0-9!#$%&'*+/=?^_\\x60{|}~\\u0080-\\uFFFF-]+`
export const pattern =
  `^${aText}(?:\\.${aText})*@` + // Local part: RFC 5322 aText segments separated by dots, plus Unicode
  `(?:` +
  // Multi-label domain ending with a TLD (e.g. example.com, sub.example.co.uk)
  `(?:` +
  `(?:xn--[A-Za-z0-9-]+|[A-Za-z0-9]+(?:-[A-Za-z0-9]+)*)\\.)+` +
  `(?:[A-Za-z]{2,}|xn--[A-Za-z0-9-]{2,})` +
  `|` +
  // Single-label TLDs (only punycode, e.g. xn--p1ai)
  `(?:xn--[A-Za-z0-9-]{2,})` +
  `|` +
  // IP literals
  `\\[(?:` +
  `\\d{1,3}(?:\\.\\d{1,3}){3}` + // IPv4 literal (basic format only)
  `|` +
  `IPv6:[0-9A-Fa-f:]+` + // IPv6 literal (basic format only)
  `)\\]` +
  `)$`

/**
 * Convert internationalized domain names (IDN) to Punycode for validation.
 * This enables full SMTPUTF8 support by allowing Unicode in both local part and domain.
 */
export function convertDomainToPunycode(email: string): string {
  if (!email || typeof email !== 'string') {
    return email
  }

  const atIndex = email.lastIndexOf('@')
  if (atIndex === -1) {
    return email
  }

  const localPart = email.substring(0, atIndex)
  const domain = email.substring(atIndex + 1)

  // Convert domain to ASCII using the URL API (WHATWG URL Standard)
  try {
    const url = new URL(`http://${domain}`)
    const asciiDomain = url.hostname
    return `${localPart}@${asciiDomain}`
  } catch {
    // If URL parsing fails, return original email
    return email
  }
}

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

  // Create custom schema that converts domain to Punycode before pattern validation
  const schema = useMemo<Schema<string>>(() => {
    if (props.schema) {
      return props.schema
    }

    // Use custom pattern if provided, otherwise use default email pattern
    const patternToUse = props.pattern ?? pattern

    return () => {
      return z.string().superRefine((val, ctx) => {
        // Convert domain to Punycode for validation (SMTPUTF8 support)
        // Only apply conversion if using default email pattern
        const emailToValidate = props.pattern
          ? val
          : convertDomainToPunycode(val)

        // Apply pattern validation
        if (!new RegExp(patternToUse, 'u').test(emailToValidate)) {
          ctx.addIssue({
            code: 'invalid_format',
            validation: 'regex',
            format: 'regex',
            message: 'Field.errorPattern',
            messageValues: {
              pattern: patternToUse,
            },
          })
        }
      })
    }
  }, [props.schema, props.pattern])

  const StringFieldProps: Props = {
    label,
    autoComplete: 'email',
    inputMode: 'email',
    trim: true,
    ...props,
    schema,
    errorMessages,
  }

  return <StringField {...StringFieldProps} />
}

Email._supportsSpacingProps = true
export default Email
