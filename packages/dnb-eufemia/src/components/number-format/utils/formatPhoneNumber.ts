// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Phone-number specific formatter.
 */

import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'

const formatPhoneNumberParts = (number, locale = null) => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }

  let display = number
  let aria = null

  switch (locale) {
    default: {
      let code = ''
      number = String(number)
        // Edge case for when a Norwegian number is given without a space after the country code
        .replace(/^(00|\+|)47([^\s])/, '+47 $2')
        .replace(/^00/, '+')

      if (number.substring(0, 1) === '+') {
        const codeAndNumber = number.match(
          // Split the number into the country code and the rest of the number
          /^\+([\d-]{1,8})\s{0,2}([\d\s-]{1,20})$/
        )
        if (codeAndNumber) {
          code = `+${codeAndNumber[1]} `
          number = codeAndNumber[2]
        }
      }

      number = number.replace(/[^+\d]/g, '')
      const length = number.length

      // Get 800 22 222
      if (length === 8 && number.substring(0, 1) === '8') {
        display =
          code +
          number
            .split(/([\d]{3})([\d]{2})/)
            .filter((s) => s)
            .join(' ')
      } else {
        // Get 02000
        if (length < 6) {
          display = code + number
        } else {
          if (code.includes('-')) {
            // Convert +12-3456 to +12 (3456)
            code = code.replace(/(\+[\d]{1,2})-([\d]{1,6})/, '$1 ($2)')
          }

          // Get 6 or 8 formatting
          display =
            code +
            number
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
        number
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
