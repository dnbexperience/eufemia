import type { InstallmentDayValue } from './InstallmentDay'

/**
 * Ordinal suffixes per language, keyed by the CLDR ordinal plural category
 * returned by `Intl.PluralRules(locale, { type: 'ordinal' })`.
 *
 * Verified against CLDR via `Intl.PluralRules`:
 * - en: `one` → st, `two` → nd, `few` → rd, `other` → th (1st, 2nd, 3rd, 11th, 21st)
 * - nb/da: a single `other` category → "." (1., 2., 3., 31.)
 * - sv: `one` (1, 2, 21, 22, 31) → ":a", `other` → ":e" (1:a, 2:a, 3:e, 23:e)
 */
const ordinalSuffixes: Record<string, Record<string, string>> = {
  en: { one: 'st', two: 'nd', few: 'rd', other: 'th' },
  nb: { other: '.' },
  nn: { other: '.' },
  no: { other: '.' },
  da: { other: '.' },
  sv: { one: ':a', other: ':e' },
}

const pluralRulesCache = new Map<string, Intl.PluralRules>()

function getOrdinalPluralRules(locale: string) {
  let rules = pluralRulesCache.get(locale)
  if (!rules) {
    rules = new Intl.PluralRules(locale, { type: 'ordinal' })
    pluralRulesCache.set(locale, rules)
  }
  return rules
}

/**
 * Formats a day number as a locale-aware ordinal, e.g.
 * `3` → `3.` (nb/da), `3rd` (en), `3:e` (sv).
 * Falls back to the plain number for languages without a known suffix map.
 */
export function formatOrdinalDay(day: number, locale: string): string {
  const language = locale.split('-')[0]
  const suffixes = ordinalSuffixes[language]
  if (!suffixes) {
    return String(day)
  }
  const category = getOrdinalPluralRules(locale).select(day)
  return `${day}${suffixes[category] ?? suffixes.other ?? ''}`
}

/**
 * Resolves the human-readable display value for an installment day, shared by
 * `Field.InstallmentDay` (collapsed trigger) and `Value.InstallmentDay`.
 *
 * The `dayDisplay` template contains a `{day}` placeholder that is replaced with
 * the locale-aware ordinal.
 */
export function getInstallmentDayDisplayValue(
  value: InstallmentDayValue | undefined,
  {
    dayDisplay,
    lastDayLabel,
    locale,
  }: { dayDisplay: string; lastDayLabel: string; locale: string }
): string | undefined {
  if (value == null) {
    return undefined
  }
  if (value === 'last') {
    return lastDayLabel
  }
  return dayDisplay.replace('{day}', formatOrdinalDay(value, locale))
}
