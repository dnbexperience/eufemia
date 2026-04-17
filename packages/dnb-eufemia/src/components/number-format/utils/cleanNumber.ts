/**
 * Clean numbers for separators.
 * https://en.wikipedia.org/wiki/Decimal_separator
 */

import { escapeRegexChars } from '../../../shared/component-helper'
import { NUMBER_CHARS } from './constants'
import type { NumberFormatValue } from './types'

export function cleanNumber(
  num: NumberFormatValue | null | undefined,
  {
    decimalSeparator = null,
    thousandsSeparator = null,
    prefix = null,
    suffix = null,
  }: {
    decimalSeparator?: string | null
    thousandsSeparator?: string | null
    prefix?: string | null
    suffix?: string | null
  } = {}
): NumberFormatValue | null | undefined {
  if (
    typeof num === 'number' ||
    typeof num === 'undefined' ||
    num === null
  ) {
    return num
  }

  num = String(num).trim()

  if (typeof prefix === 'string' && num.startsWith(prefix)) {
    num = num.substring(prefix.length, num.length)
  }
  if (typeof suffix === 'string' && num.endsWith(suffix)) {
    num = num.substring(0, num.length - suffix.length)
  }

  // 1. Remove invalid chars on the beginning (not a number)
  if (/^[^0-9-]/.test(num)) {
    num = num.replace(/^(^[^0-9-]+)/, '')
  }

  let decimal = decimalSeparator
  let thousands = thousandsSeparator

  // -12 345,678
  if (/(\s)([0-9]{3})/.test(num)) {
    thousands = thousands || '\\s'
    decimal = decimal || ','
  }

  // -12.345,678
  else if (
    /(\.)([0-9]{3})/.test(num) &&
    !/([,'][0-9]{3})(\.)([0-9]{3})/.test(num) // just an additional check, for support with more
  ) {
    thousands = thousands || '\\.'
    decimal = decimal || ",|·|'" // also support Spain and CH
  }

  // -1,234,567.891
  else if (/(,)([0-9]{3})/.test(num)) {
    thousands = thousands || ','
    decimal = decimal || '\\.|·' // also support Spain
  }

  // -1'234'567.891, only used in CH
  else if (/(')([0-9]{3})/.test(num)) {
    thousands = thousands || "'"
    decimal = decimal || '\\.|,'
  } else {
    thousands = ','
    decimal = '\\.'
  }

  // 3. Remove invalid thousand separators
  const thousandReg = thousandsSeparator
    ? new RegExp(
        `([0-9]|)(${escapeRegexChars(thousandsSeparator)})([0-9]{3})`,
        'g'
      )
    : new RegExp(`([0-9]|)(${thousands})([0-9]{3})`, 'g')
  if (thousandReg.test(num)) {
    num = num.replace(thousandReg, '$1$3')
  }

  // 2. Rename invalid decimal separator
  // Make sure that there are only two digits after the comma, then we clean that up.
  // else we don't, because it can be a US number
  // therefore, check first, is there a chance of being a decimal?
  // const decimalReg = new RegExp(`(${decimal})([0-9]{1,2})`, 'g')
  const decimalReg = decimalSeparator
    ? new RegExp(`(${escapeRegexChars(decimalSeparator)})([0-9]{0,})`, 'g')
    : new RegExp(`(${decimal})([0-9]{1,2})`, 'g')
  if (decimalReg.test(num)) {
    num = num.replace(decimalReg, '.$2')
  }

  // Edge case, if we have more than 2 decimals, replace these decimals
  if (!decimalSeparator) {
    const decimalBackup = new RegExp(`(${decimal})([0-9]{3,})`, 'g')
    if (decimalBackup.test(num)) {
      num = num.replace(decimalBackup, '.$2')
    }
  }

  // Remove all invalid chars
  return num.replace(new RegExp(`([^${NUMBER_CHARS}])`, 'g'), '')
}
