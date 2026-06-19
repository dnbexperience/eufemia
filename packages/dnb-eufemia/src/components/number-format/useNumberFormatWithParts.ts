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
import { getReturnValueParts } from './utils/formatCore'
import type { FormatPartItem } from './utils/types'
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
 * `formatPercent` for currency/percent output. Standard Eufemia formatters
 * preserve semantic formatter parts; custom formatter objects fall back to
 * parsing the returned display string.
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
  const formatParts = getReturnValueParts(result)

  return {
    ...result,
    parts:
      parseFormatParts(formatParts, result.type) ??
      parseParts(result.number, result.type, compact),
  }
}

const SIGN_RE = /^[\u200e\u200f\u061c\s]*([+\-\u2212])?\s*/
const NUMBER_RE = /[0-9](?:[0-9.,]|[\s\u00A0\u202F](?=[0-9]))*/
const PERCENT_RE = /^([\u00A0\u202F\s]*)([%٪])\s*$/
const NUMBER_PART_TYPES = new Set([
  'integer',
  'group',
  'decimal',
  'fraction',
  'compact',
  'nan',
  'infinity',
])
const SIGN_PART_TYPES = new Set(['minusSign', 'plusSign'])

function parseFormatParts(
  parts: FormatPartItem[] | undefined,
  type: NumberFormatReturnValue['type'] = 'number'
): NumberFormatParts | null {
  if (!parts?.length) {
    return null
  }

  let sign: string | null = null
  let number = ''
  let currencyBefore = ''
  let currencyAfter = ''
  let spacingBeforeNumber = ''
  let spacingAfterNumber = ''
  let percent = ''
  let percentSpacing = ''
  let hasNumber = false

  parts.forEach((part, index) => {
    if (SIGN_PART_TYPES.has(part.type)) {
      sign = part.value
      return
    }

    if (NUMBER_PART_TYPES.has(part.type)) {
      hasNumber = true
      number += part.value
      return
    }

    if (part.type === 'currency') {
      if (hasNumber) {
        currencyAfter += part.value
      } else {
        currencyBefore += part.value
      }
      return
    }

    if (part.type === 'percentSign') {
      percent += part.value
      return
    }

    if (part.type === 'literal') {
      if (percent) {
        return
      }

      if (hasNumber && parts[index + 1]?.type === 'compact') {
        number += part.value
        return
      }

      if (hasNumber) {
        spacingAfterNumber += part.value
      } else {
        spacingBeforeNumber += part.value
      }
    }
  })

  if (!hasNumber) {
    return null
  }

  const currency =
    type === 'currency' ? currencyBefore || currencyAfter || null : null

  if (percent) {
    const percentIndex = parts.findIndex(
      ({ type }) => type === 'percentSign'
    )
    const previousPart = parts[percentIndex - 1]
    if (previousPart?.type === 'literal') {
      percentSpacing = previousPart.value
    }
  }

  return {
    sign,
    signedNumber: sign ? `${sign}${number}` : number,
    number,
    currency,
    currencyPosition: currencyBefore
      ? 'before'
      : currencyAfter
        ? 'after'
        : null,
    spaceAfterCurrency: Boolean(currencyBefore && spacingBeforeNumber),
    spaceBeforeCurrency: Boolean(currencyAfter && spacingAfterNumber),
    percent: percent || null,
    percentSpacing,
  }
}

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
  const numberIndex = numberMatch.index ?? 0
  const before = afterSign.slice(0, numberIndex).trim()
  let after = afterSign.slice(numberIndex + numberMatch[0].length)

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
