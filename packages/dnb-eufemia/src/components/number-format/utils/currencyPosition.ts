import type { FormatPartItem, PartFormatter } from './types'
import type { NumberFormatCurrencyPosition } from './types'

/**
 * Changes the currency sign position.
 * For Norway, the position defaults to "after".
 */
export const currencyPositionFormatter = (
  existingFormatter: PartFormatter | null | undefined,
  callback: (item: FormatPartItem) => string,
  position: NumberFormatCurrencyPosition | null = null,
): PartFormatter => {
  let count = 0
  let countCurrency = -1

  return (item: FormatPartItem): FormatPartItem => {
    // Ensure we do not overwrite a given formatter, but run it as well
    if (typeof existingFormatter === 'function') {
      item = existingFormatter(item)
    }

    count++

    switch (item.type) {
      case 'currency': {
        if (position === 'after' || (position === 'before' && count > 2)) {
          countCurrency = count
          callback(item)
          item.value = ''
        }
        return item
      }

      case 'literal': {
        // Remove the literal after currency
        if (count === countCurrency + 1) {
          item.value = ''
        }
        return item
      }

      default:
        return item
    }
  }
}
