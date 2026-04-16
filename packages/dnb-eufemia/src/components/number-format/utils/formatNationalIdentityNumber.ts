// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

/**
 * Norwegian National Identity Number formatter.
 */

import { IS_WIN } from '../../../shared/helpers'
import { ABSENT_VALUE_FORMAT, isAbsent } from './constants'
import { formatWith } from './formatCore'

const formatNationalIdentityNumberParts = (number, locale = null) => {
  if (isAbsent(number)) {
    return { number: ABSENT_VALUE_FORMAT, aria: ABSENT_VALUE_FORMAT }
  }
  // cleanup
  number = String(number).replace(/[^0-9]/g, '')

  let display = number
  let aria = null

  switch (locale) {
    default: {
      // Get 180892 12345
      display = number
        .split(/([0-9]{6})/)
        .filter((s) => s)
        .join(' ')

      // correct nin for screen readers
      aria = display
        .split(
          /([0-9]{2})([0-9]{2})([0-9]{2}) ([0-9]{1})([0-9]{1})([0-9]{1})([0-9]{1})([0-9]{1})/
        )
        .filter((s) => s)
        .join(IS_WIN ? '. ' : ' ') // NVDA fix with a dot to not read date on FF
    }
  }

  if (aria === null) {
    aria = display
  }

  return { number: display, aria }
}

export const formatNationalIdentityNumber = formatWith(
  'nin',
  formatNationalIdentityNumberParts
)
