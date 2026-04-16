// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Norwegian Bank Account Number formatter.
 */

import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'

const formatBankAccountNumberParts = (number, locale = null) => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // Get 2000 12 34567
      display = number
        .split(/([0-9]{4})([0-9]{2})([0-9]{1,})/)
        .filter((s) => s)
        .join(' ')

      aria = number
        .split(/([0-9]{2})/)
        .filter((s) => s)
        .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

export const formatBankAccountNumber = formatWith(
  'ban',
  formatBankAccountNumberParts
)
