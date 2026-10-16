export type CurrencyAmount = {
  value: number
  currency: string
  decimals: number
}

// Only markers that identify a currency without guessing from the text.
const CURRENCIES = new Set([
  'NOK',
  'SEK',
  'DKK',
  'ISK',
  'EUR',
  'USD',
  'GBP',
  'CHF',
  'JPY',
  'CAD',
  'AUD',
  'NZD',
  'CNY',
  'HKD',
  'SGD',
  'INR',
  'PLN',
])
const NORDIC_CURRENCIES = new Set(['NOK', 'SEK', 'DKK', 'ISK'])

export function createCurrencyParser(
  locale: string,
  defaultCurrency: string
) {
  let decimal: string
  let group: string
  try {
    const parts = new Intl.NumberFormat(locale).formatToParts(12345.6)
    decimal = parts.find((part) => part.type === 'decimal')?.value
    group = parts.find((part) => part.type === 'group')?.value
  } catch {
    return (
      text: string,
      _incomplete = false
    ): Array<string | CurrencyAmount> => [text]
  }

  return (
    text: string,
    incomplete = false
  ): Array<string | CurrencyAmount> => {
    if (/[<>]/.test(text)) {
      return [text]
    }
    const pattern = /[A-Z]{3}|kr|€|£/g
    const result: Array<string | CurrencyAmount> = []
    let from = 0
    let match: RegExpExecArray | null
    while ((match = pattern.exec(text))) {
      const marker = match[0]
      const markerStart = match.index
      const markerEnd = markerStart + marker.length
      const currency =
        marker === 'kr'
          ? NORDIC_CURRENCIES.has(defaultCurrency)
            ? defaultCurrency
            : null
          : marker === '€'
            ? 'EUR'
            : marker === '£'
              ? 'GBP'
              : marker
      if (!currency || !CURRENCIES.has(currency)) {
        continue
      }
      let start = markerStart
      let end = markerEnd
      let number: string
      let previous = markerStart - 1
      while (previous >= from && /\s/.test(text[previous])) {
        previous--
      }
      const right = RIGHT_AMOUNT.exec(text.slice(markerEnd))
      if (right && !/[0-9]/.test(text[previous] ?? '')) {
        number = right[1].trimEnd()
        // A final period/comma belongs to punctuation, not the amount.
        if (/[.,]$/.test(number)) {
          number = number.slice(0, -1)
        }
        end =
          markerEnd + right[0].length - (right[1].length - number.length)
      } else {
        let index = markerStart - 1
        while (index >= from && AMOUNT_CHARACTER.test(text[index])) {
          index--
        }
        const left = text.slice(index + 1, markerStart).trim()
        if (!/^[+−-]?[0-9]/.test(left)) {
          continue
        }
        number = left
        start = index + 1
        while (/\s/.test(text[start])) {
          start++
        }
      }
      if (
        start < from ||
        isWord(text[start - 1]) ||
        isWord(text[end]) ||
        /[.,/+:−–—$€£'’-]/.test(text[start - 1] ?? '') ||
        /[/+:−–—%'’-]/.test(text[end] ?? '') ||
        (/[.,]/.test(text[end] ?? '') &&
          /[0-9]/.test(text[end + 1] ?? '')) ||
        (incomplete && /^[\s.,]*$/.test(text.slice(end)))
      ) {
        continue
      }
      if (
        PREVIOUS_MARKER.test(text.slice(Math.max(0, start - 8), start))
      ) {
        continue
      }
      if (NEXT_MARKER.test(text.slice(end))) {
        continue
      }
      if (SCALE_WORD.test(text.slice(end))) {
        continue
      }
      const amount = parseAmount(number, decimal, group)
      if (!amount) {
        continue
      }
      if (start > from) {
        result.push(text.slice(from, start))
      }
      result.push({ ...amount, currency })
      from = end
    }
    if (from < text.length) {
      result.push(text.slice(from))
    }
    return result
  }
}

function parseAmount(source: string, decimal: string, group: string) {
  if (source[0] === '+') {
    return null
  }
  const negative = source[0] === '-' || source[0] === '−'
  const unsigned = source.replace(/^[+−-]/, '')
  const parts = unsigned.split(decimal)
  if (
    parts.length > 2 ||
    (parts.length === 2 && !/^[0-9]{1,2}$/.test(parts[1]))
  ) {
    return null
  }
  const decimals = parts[1]?.length ?? 0
  const integer = parts[0]
  // Space grouping is common in generated text, including English replies.
  const normalized = integer.replace(GROUPING_SPACE, ' ')
  const separator = normalized.includes(' ')
    ? ' '
    : normalized.includes(group)
      ? group
      : decimal === ',' && normalized.includes('.')
        ? '.'
        : null
  const groups = separator ? normalized.split(separator) : [normalized]
  if (
    !/^[0-9]+$/.test(groups[0]) ||
    (separator &&
      (groups[0].length > 3 ||
        !groups.slice(1).every((part) => /^[0-9]{3}$/.test(part))))
  ) {
    return null
  }
  const digits = groups.join('') + (parts[1] ?? '')
  // Reject amounts whose decimal digits would lose precision in a Number.
  if (
    digits.replace(/^0+/, '').length > 15 ||
    !Number.isSafeInteger(Number(digits))
  ) {
    return null
  }
  const canonical =
    groups.join('').replace(/^0+(?=[0-9])/, '') +
    (decimals ? '.' + parts[1] : '')
  const absoluteValue = Number(canonical)
  if (absoluteValue.toFixed(decimals) !== canonical) {
    return null
  }
  const value = absoluteValue * (negative ? -1 : 1)
  return Number.isFinite(value) ? { value, decimals } : null
}

const RIGHT_AMOUNT = new RegExp(
  '^[\\p{Zs}\\t]*([+−-]?[0-9][0-9.,\\p{Zs}]*)',
  'u'
)
const AMOUNT_CHARACTER = new RegExp('[0-9.,+−\\p{Zs}-]', 'u')
const PREVIOUS_MARKER = new RegExp('(?:[A-Z]{3}|kr|€|£)\\p{Zs}+$', 'u')
const NEXT_MARKER = new RegExp(
  '^\\p{Zs}*(?:[A-Z]{3}|kr|€|£)(?![a-zA-Z])',
  'u'
)
const GROUPING_SPACE = new RegExp('\\p{Zs}', 'gu')
const SCALE_WORD = new RegExp(
  '^\\s+(?:thousands?|tusen|tusinde?|millions?|millioner|miljoner|milliards?|milliarder|miljarder|billions?|billioner|trillions?|trillioner|mill|mil|mrd|mia|mn|bn|tn|k|m|b)(?![\\p{L}\\p{N}_])',
  'iu'
)
const WORD = new RegExp('[\\p{L}\\p{N}_]', 'u')
function isWord(char?: string) {
  return char ? WORD.test(char) : false
}
