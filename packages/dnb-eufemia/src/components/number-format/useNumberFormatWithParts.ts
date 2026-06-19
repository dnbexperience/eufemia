import { useContext } from 'react'
import Context from '../../shared/Context'
import { extendPropsWithContext } from '../../shared/component-helper'
import type {
  NumberFormatOptionParams,
  NumberFormatReturnValue,
  NumberFormatValue,
} from './NumberUtils'
import { cleanNumber, formatNumber } from './utils'
import { canHandleCompact } from './utils/compact'
import type { NumberFormatter } from './useNumberFormat'

export type NumberFormatParts = {
  sign: string | null
  signedNumber: string
  number: string
  currency: string | null
  currencyPosition: 'before' | 'after' | null
  spaceAfterCurrency: boolean
  spaceBeforeCurrency: boolean
  percent: string | null
  percentSpacing: string
}

export type NumberFormatReturnWithParts = NumberFormatReturnValue & {
  parts: NumberFormatParts
}

/**
 * Same contract as `useNumberFormat`, but additionally splits the
 * formatted display string into structured `parts` (sign, number, currency,
 * percent) so consumers can style each piece independently.
 *
 * `formatter` defaults to `formatNumber`. Pass `formatCurrency` or
 * `formatPercent` for currency/percent output. The returned `parts` are
 * derived from the formatter's display string, so any formatter that
 * returns a `NumberFormatReturnValue` works.
 */
function useNumberFormatWithParts(
  value: NumberFormatValue,
  formatter: NumberFormatter,
  options: NumberFormatOptionParams & { returnAria: false }
): string
function useNumberFormatWithParts(
  value: NumberFormatValue,
  formatter?: NumberFormatter,
  options?: NumberFormatOptionParams
): NumberFormatReturnWithParts
function useNumberFormatWithParts(
  value: NumberFormatValue,
  formatter: NumberFormatter = formatNumber,
  options: NumberFormatOptionParams = {}
): NumberFormatReturnWithParts | string {
  const context = useContext(Context)
  const params = extendPropsWithContext(
    { returnAria: true, ...options },
    { locale: context.locale },
    context.NumberFormat
  ) as NumberFormatOptionParams

  const result = formatter(value, params) as
    | NumberFormatReturnValue
    | string

  if (typeof result === 'string') {
    return result
  }

  const compactValue = params.clean ? cleanNumber(value) : value
  const compact = canHandleCompact({
    value: compactValue ?? '',
    compact: params.compact ?? null,
  })

  return {
    ...result,
    parts: parseParts(result.number, result.type, compact),
  }
}

const SIGN_RE = /^[\u200e\u200f\u061c\s]*([+\-\u2212])?\s*/
const NUMBER_RE = /[0-9](?:[0-9.,]|[\s\u00A0\u202F](?=[0-9]))*/
const PERCENT_RE = /^([\u00A0\u202F\s]*)([%٪])\s*$/

function parseParts(
  input: string,
  type: NumberFormatReturnValue['type'] = 'number',
  compact = false
): NumberFormatParts {
  const source = String(input ?? '')
  const signMatch = source.match(SIGN_RE) as RegExpMatchArray
  const sign = signMatch[1] ?? null
  const afterSign = source.slice(signMatch[0].length)
  const numberMatch = afterSign.match(NUMBER_RE)

  if (!numberMatch) {
    return {
      sign,
      signedNumber: source.trim(),
      number: afterSign.trim(),
      currency: null,
      currencyPosition: null,
      spaceAfterCurrency: false,
      spaceBeforeCurrency: false,
      percent: null,
      percentSpacing: '',
    }
  }

  let number = numberMatch[0].trim()
  const before = afterSign.slice(0, numberMatch.index).trim()
  let after = afterSign.slice(numberMatch.index! + numberMatch[0].length)

  if (compact && !PERCENT_RE.test(after)) {
    const compactMatch = after.match(
      /^([\s\u00A0\u202F]*[^\d\s\u00A0\u202F]+)/
    )

    if (compactMatch) {
      number += compactMatch[1]
      after = after.slice(compactMatch[1].length)
    }
  }

  const signedNumber = sign ? `${sign}${number}` : number
  const percentMatch = after.match(PERCENT_RE)
  const percent = percentMatch ? percentMatch[2] : null
  const percentSpacing = percentMatch ? percentMatch[1] : ''
  const trailing = percentMatch ? '' : after.trim()
  const hasBefore = before.length > 0
  const hasAfter = trailing.length > 0
  const currency =
    type === 'currency'
      ? hasBefore
        ? before
        : hasAfter
          ? trailing
          : null
      : null

  return {
    sign,
    signedNumber,
    number,
    currency,
    currencyPosition:
      type === 'currency'
        ? hasBefore
          ? 'before'
          : hasAfter
            ? 'after'
            : null
        : null,
    spaceAfterCurrency: type === 'currency' && hasBefore,
    spaceBeforeCurrency: type === 'currency' && hasAfter,
    percent,
    percentSpacing,
  }
}

export default useNumberFormatWithParts
