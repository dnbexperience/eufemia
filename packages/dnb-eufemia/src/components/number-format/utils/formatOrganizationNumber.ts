/**
 * Norwegian Organization Number formatter.
 */

import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'
import type { NumberFormatValue, FormattedParts } from './types'

const formatOrganizationNumberParts = (
  number: NumberFormatValue,
  locale: string | null = null
): FormattedParts => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  const num = String(number).replace(/[^0-9]/g, '')

  let display = num
  let aria: string | null = null

  switch (locale) {
    default: {
      // Get 123 456 789
      display = num
        .split(/([0-9]{3})/)
        .filter((s) => s)
        .join(' ')

      aria = num
        .split(/([0-9]{1})/)
        .filter((s) => s)
        .join(' ')
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

export const formatOrganizationNumber = formatWith(
  'org',
  formatOrganizationNumberParts
)
