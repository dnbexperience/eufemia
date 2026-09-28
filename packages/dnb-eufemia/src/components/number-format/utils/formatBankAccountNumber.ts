/**
 * Bank Account Number formatter.
 *
 * Supports Norwegian BBAN, Swedish BBAN, Swedish Bankgiro,
 * Swedish Plusgiro, and IBAN formats.
 */

import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'
import type { NumberFormatValue, FormattedParts } from './types'

export type BankAccountType =
  | 'norwegianBban'
  | 'swedishBban'
  | 'swedishBankgiro'
  | 'swedishPlusgiro'
  | 'iban'

const cleanDigits = (val: string | number) =>
  String(val).replace(/[^0-9]/g, '')

const cleanAlphanumeric = (val: string | number) =>
  String(val).replace(/[^A-Za-z0-9]/g, '')

// Grouped characters are spoken as compound numbers ("20" as "twenty"),
// so the value is read one character at a time to stay transcribable.
const spellOutAria = (value: string) => value.split('').join(' ')

/**
 * Format a bank account number into display and aria strings.
 *
 * @param number the bank account number value
 * @param bankAccountType the type of bank account number
 * @returns An object with `number` (display) and `aria` strings
 */
export const formatBankAccountNumberByType = (
  number: NumberFormatValue,
  bankAccountType: BankAccountType = 'norwegianBban'
): FormattedParts => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }

  let display: string
  let aria: string

  switch (bankAccountType) {
    case 'iban': {
      const cleaned = cleanAlphanumeric(number).toUpperCase()
      display = cleaned.match(/.{1,4}/g)?.join(' ') ?? cleaned
      aria = spellOutAria(cleaned)
      break
    }

    case 'swedishBban': {
      const cleaned = cleanDigits(number)
      display =
        cleaned.length > 4
          ? cleaned.slice(0, 4) + '-' + cleaned.slice(4)
          : cleaned
      aria = spellOutAria(cleaned)
      break
    }

    case 'swedishBankgiro': {
      const cleaned = cleanDigits(number)
      if (cleaned.length === 8) {
        display = cleaned.slice(0, 4) + '-' + cleaned.slice(4)
      } else if (cleaned.length === 7) {
        display = cleaned.slice(0, 3) + '-' + cleaned.slice(3)
      } else {
        display = cleaned
      }
      aria = spellOutAria(cleaned)
      break
    }

    case 'swedishPlusgiro': {
      const cleaned = cleanDigits(number)
      if (cleaned.length >= 2) {
        display =
          cleaned.slice(0, cleaned.length - 1) +
          '-' +
          cleaned.slice(cleaned.length - 1)
      } else {
        display = cleaned
      }
      aria = spellOutAria(cleaned)
      break
    }

    case 'norwegianBban':
    default: {
      const cleaned = cleanDigits(number)
      display = cleaned
        .split(/([0-9]{4})([0-9]{2})([0-9]{1,})/)
        .filter((s) => s)
        .join(' ')
      aria = spellOutAria(cleaned)
      break
    }
  }

  return { number: display, aria }
}

const norwegianBbanParts = (
  value: NumberFormatValue,
  _locale: string | null = null
): FormattedParts => formatBankAccountNumberByType(value, 'norwegianBban')

export const formatBankAccountNumber = formatWith(
  'ban',
  norwegianBbanParts
)
