/**
 * Phone-number specific formatter.
 */

import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'
import type { NumberFormatValue, FormattedParts } from './types'
import detectCountryCode from '../../../shared/detectCountryCode'

const formatPhoneNumberParts = (
  number: NumberFormatValue,
  locale: string | null = null
): FormattedParts => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }

  let display = String(number)
  let aria: string | null = null
  let num: string

  switch (locale) {
    default: {
      let code = ''
      num = String(number)

      // Normalize spaces and dashes so detectCountryCode can match
      const normalized = num.replace(/[\s-]/g, '')
      const detected = detectCountryCode(normalized)
      if (detected) {
        code = `${detected.countryCode} `
        num = detected.phoneNumber
      }

      num = num.replace(/[^+\d]/g, '')
      const length = num.length

      // If no digits remain, return the original value as-is
      if (length === 0) {
        display = String(display)
        break
      }

      if (code.includes('-')) {
        // Convert +12-3456 to +12 (3456)
        code = code.replace(/(\+[\d]{1,2})-([\d]{1,6})/, '$1 ($2)')
      }

      // Get 800 22 222
      if (length === 8 && num.substring(0, 1) === '8') {
        display =
          code +
          num
            .split(/([\d]{3})([\d]{2})/)
            .filter((s) => s)
            .join(' ')
      } else {
        // Get 02000
        if (length < 6) {
          display = code + num
        } else {
          // Get 6 or 8 formatting
          display =
            code +
            num
              .split(
                length === 6
                  ? /^(\+[\d]{2})|([\d]{3})/
                  : /^(\+[\d]{2})|([\d]{2})/
              )
              .filter((s) => s)
              .join(' ')
        }
      }

      aria =
        code +
        num
          .split(/([\d]{2})/)
          .filter((s) => s)
          .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

export const formatPhoneNumber = formatWith(
  'phone',
  formatPhoneNumberParts
)
