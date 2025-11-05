/**
 * Web InputMasked Component
 *
 */
import {
  format,
  getDecimalSeparator,
  getThousandsSeparator,
} from '../number-format/NumberUtils'
import { warn } from '../../shared/component-helper'
import { IS_IOS } from '../../shared/helpers'
import { safeSetSelection } from './text-mask/safeSetSelection'

const enableLocaleSupportWhen = [
  'asNumber',
  'asPercent',
  'asCurrency',
] as const
const enableNumberMaskWhen = [
  'asNumber',
  'asPercent',
  'asCurrency',
  'numberMask',
  'currencyMask',
] as const

// Local minus class pattern, matches multiple minus-like characters
// Used instead of importing NUMBER_MINUS to keep types local
const NUMBER_MINUS = '-|−|‐|‒|–|—|―'

/**
 * Will return true if a prop needs Locale support
 *
 * @param {object} props object with given component props
 * @returns Boolean
 */
export const isRequestingLocaleSupport = (
  props: Record<string, any>
): boolean => {
  return Object.entries(props).some(
    ([k, v]) =>
      v && (enableLocaleSupportWhen as readonly string[]).includes(k)
  )
}

/**
 * Will return true if a prop will enable the internal NumberMask
 *
 * @param {object} props object with given component props
 * @returns Boolean
 */
export const isRequestingNumberMask = (
  props: Record<string, any>
): boolean => {
  return Object.entries(props).some(
    ([k, v]) =>
      v && (enableNumberMaskWhen as readonly string[]).includes(k)
  )
}

/**
 * Probably the most complex part of this component
 * It will modify a given value based on certain criteria's
 *
 * @param {object} param0 object with properties
 * @property {string} localValue optional – if given, it will uses its ending to determine of what to return
 * @property {number|string} value component property value
 * @property {object} context Eufemia Context
 * @property {string} locale Eufemia locale (either from component or context)
 * @property {object} maskParams predefined mask parameters
 * @returns String Value
 */
export type InputMaskParams = {
  showMask?: boolean
  allowDecimal?: boolean
  decimalLimit?: number
  decimalSymbol?: string
  thousandsSeparatorSymbol?: string
  prefix?: string
  suffix?: string
  disallowLeadingZeroes?: boolean
  integerLimit?: number
}

export const correctNumberValue = ({
  localValue = null,
  props,
  locale,
  maskParams,
}: {
  localValue?: string | null
  props: Record<string, any>
  locale: string
  maskParams: InputMaskParams
}): string => {
  let value =
    props.value === null
      ? null
      : props.value === undefined
      ? undefined
      : String(props.value)

  if (isNaN(parseFloat(value))) {
    return value
  }

  const decimalPos = value.indexOf('.')

  if (
    maskParams.integerLimit &&
    typeof maskParams.integerLimit === 'number'
  ) {
    const limit = maskParams.integerLimit
    const integers = value.split('.')[0]
    const isNegative = parseFloat(integers) < 0
    if (integers.length - (isNegative ? 1 : 0) > limit) {
      const decimals = decimalPos > 0 ? value.slice(decimalPos) : ''
      value = integers.slice(0, limit + (isNegative ? 1 : 0)) + decimals
    }
  }

  const shouldHaveDecimals =
    maskParams.allowDecimal ||
    (maskParams.decimalLimit > 0 && maskParams.allowDecimal !== false)

  if (!shouldHaveDecimals) {
    if (decimalPos > -1) {
      value = value.slice(0, decimalPos)
    }
  }

  /**
   * This only runs IF "numberFormat" is set – we do not use it else
   */
  if (props.numberFormat) {
    const options = {
      locale,
      decimals: 0,
      ...props.numberFormat,
    }
    if (shouldHaveDecimals) {
      options.decimals = maskParams.decimalLimit
    }
    value = String(format(value, options))
  }

  const decimalSymbol = maskParams.decimalSymbol
  value = value.replace('.', decimalSymbol)

  if (localValue !== null) {
    const invalidCharactersRegex = new RegExp(
      `[^${NUMBER_MINUS}\\d${decimalSymbol}]`,
      'g'
    )
    const localNumberValue = localValue.replace(invalidCharactersRegex, '')
    const numberValue = value.replace(invalidCharactersRegex, '')
    const valueHasDecimal = numberValue.includes(decimalSymbol)

    if (!valueHasDecimal) {
      const endsWithDecimal = localNumberValue.endsWith(decimalSymbol)
      const endsWithZeroAndDecimal = localNumberValue.endsWith(
        `${decimalSymbol}0`
      )

      if (endsWithDecimal) {
        value = `${value}${decimalSymbol}`
      } else if (
        endsWithZeroAndDecimal &&
        !numberValue.endsWith(`${decimalSymbol}0`)
      ) {
        /**
         * When the users has 20,02, then hits "backspace",
         * the returned {numberValue} in the onChange event would then be "20",
         * but we want it to be 20,0
         */
        value = `${value}${decimalSymbol}0`
      }
    }

    /**
     * If the user removes a leading digit and we have left a leading zero.
     *
     * The users enters these steps:
     * Step 1. 1012
     * Step 2. 012 -> user removes 1, now use "localValue"
     * Step 3. 2012
     *
     * If a dev listens onChange and sends the number value back in,
     * for this, we also ensure that "numberValue" and "localNumberValue" is the same.
     */

    if (
      localNumberValue !== '0' &&
      new RegExp(`^(0|(${NUMBER_MINUS})0)`).test(localNumberValue) &&
      parseFloat(numberValue.replace(decimalSymbol, '.')) ===
        parseFloat(localNumberValue.replace(decimalSymbol, '.'))
    ) {
      value = localValue
    }

    /**
     * While typing;
     * If the local value is - or -0 we use it.
     * Also, because of invisible whitespace we remove everything else
     */
    if (
      new RegExp(`^((${NUMBER_MINUS})|(${NUMBER_MINUS})0)$`).test(
        localValue.replace(new RegExp(`[^\\d(${NUMBER_MINUS})0]`, 'g'), '')
      )
    ) {
      value = localValue
    } else if (localNumberValue === '' && numberValue === '0') {
      value = ''
    }
  }

  return value
}

/**
 * This is a helper for setting the cursor position,
 * when it is on a not allowed position
 *
 * @param {Element} element Input Element
 * @param {Object} maskParams Mask parameters, containing eventually suffix or prefix
 */
export const correctCaretPosition = (
  element: HTMLInputElement,
  maskParamsRef: {
    current?: {
      suffix?: string
      prefix?: string
    }
  },
  props: { mask?: Array<RegExp | { test?: (char: string) => boolean }> }
) => {
  const correction = () => {
    try {
      const maskParams = maskParamsRef?.current

      const suffix = maskParams?.suffix
      const prefix = maskParams?.prefix

      const start = element.selectionStart
      const end = element.selectionEnd

      if (start !== end) {
        return // stop here
      }

      if (suffix || prefix) {
        const suffixStart = element.value.indexOf(suffix)
        const suffixEnd = suffixStart + suffix?.length
        let pos: number | undefined = undefined

        if (start >= suffixStart && start <= suffixEnd) {
          pos = suffixStart

          // If there is a placeholder,
          // and the user clicks after the suffix
          if (
            element.value.length - 1 ===
            String(suffix + prefix).length
          ) {
            pos = pos - 1
          }
        } else {
          const prefixStart = element.value.indexOf(prefix)
          const prefixEnd = prefixStart + prefix?.length || 0

          if (start >= prefixStart && start <= prefixEnd) {
            pos = prefixEnd
          }
        }

        if (!isNaN(parseFloat(String(pos)))) {
          safeSetSelection(element, pos)
        }
      } else if (props?.mask && element.value.length === end) {
        const chars = element.value.split('')

        for (let l = chars.length, i = l - 1; i >= 0; i--) {
          const char = chars[i]
          const mask = props.mask[i]
          if (char && mask instanceof RegExp && mask.test(char)) {
            for (let n = i + 1; n < l; n++) {
              const mask = props.mask[n]
              if (mask?.test?.(char)) {
                safeSetSelection(element, n)
                break
              }
            }

            break
          }
        }
      }
    } catch (e) {
      warn(e)
    }
  }

  if (typeof window !== 'undefined') {
    window.requestAnimationFrame(correction)
  }
}

/**
 * Manipulate needed mask for handle: percent
 *
 * @param {object} param0 object with properties
 * @property {object} props Component property
 * @property {string} locale Eufemia locale (either from component or context)
 * @property {object} maskParams predefined mask parameters
 * @returns Object maskParams
 */
export const handlePercentMask = ({
  props,
  locale,
  maskParams,
}: {
  props: Record<string, any>
  locale: string
  maskParams: InputMaskParams
}) => {
  const value = format(props.value as any, { locale, percent: true })
  const m = String(value).match(/((\s|)%)$/g)
  maskParams.suffix = m?.[0] || ' %'

  return maskParams
}

/**
 * Return needed mask for handle: currency
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} maskOptions Component property for change the mask parameters
 * @property {object} currencyMask Component property for change the currency parameters
 * @returns Object maskParams
 */
export const handleCurrencyMask = ({
  maskOptions,
  currencyMask,
}: {
  maskOptions: Record<string, any>
  currencyMask: string | Record<string, any>
}): InputMaskParams => {
  const givenParams =
    typeof currencyMask === 'string'
      ? { ...maskOptions, ...({ 0: String(currencyMask) } as any) }
      : { ...maskOptions, ...(currencyMask as Record<string, any>) }
  const paramsWithDefaults: InputMaskParams = {
    showMask: true,
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
    ...givenParams,
  }

  const currencyLabel =
    typeof currencyMask === 'string'
      ? currencyMask
      : typeof givenParams.currency === 'string'
      ? givenParams.currency
      : 'kr'
  const hasCurrencyLabel =
    typeof currencyLabel === 'string' && currencyLabel
  const shouldShowCurrencyLabel =
    hasCurrencyLabel && givenParams.currencyDisplay !== false
  const shouldShowCurrencyBeforeAmount =
    givenParams.currencyDisplay === 'code' && shouldShowCurrencyLabel

  if (shouldShowCurrencyBeforeAmount) {
    paramsWithDefaults.prefix = `${currencyLabel} `
    paramsWithDefaults.suffix = ''
  } else if (shouldShowCurrencyLabel) {
    paramsWithDefaults.suffix = ` ${currencyLabel}`
  } else {
    paramsWithDefaults.prefix = ''
    paramsWithDefaults.suffix = ''
  }

  if (
    typeof givenParams?.allowDecimal === 'undefined' &&
    typeof givenParams?.decimalLimit === 'number'
  ) {
    paramsWithDefaults.allowDecimal = givenParams.decimalLimit > 0
  }

  return paramsWithDefaults
}

/**
 * Return needed mask for handle: number
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} maskOptions Component property for change the mask parameters
 * @property {object} numberMask Component property for change the number parameters
 * @returns Object maskParams
 */
export const handleNumberMask = ({
  maskOptions,
  numberMask,
}: {
  maskOptions: Record<string, any>
  numberMask: Record<string, any>
}): InputMaskParams => {
  const maskParams: InputMaskParams = {
    decimalSymbol: ',',
    ...maskOptions,
    ...numberMask,
  }

  if (typeof maskParams.allowDecimal === 'undefined') {
    maskParams.allowDecimal = maskParams.decimalLimit > 0
  }

  return maskParams
}

/**
 * Returns the type of what inputMode or type attribute should be used
 *
 * @param {function} mask mask function
 * @returns undefined|decimal|numeric
 */
export function getSoftKeyboardAttributes(
  mask:
    | undefined
    | {
        instanceOf?: string
        maskParams?: {
          allowNegative?: boolean
          allowDecimal?: boolean
          decimalLimit?: number
        }
      }
): undefined | { inputMode: 'decimal' | 'numeric' } {
  if (mask?.instanceOf !== 'createNumberMask') {
    return undefined
  }

  const maskParams = mask?.maskParams

  // because of the missing minus key, we still have to use text on iOS
  if (IS_IOS && maskParams?.allowNegative !== false) {
    return undefined
  }

  return {
    inputMode:
      maskParams.allowDecimal && maskParams.decimalLimit !== 0
        ? 'decimal'
        : 'numeric',
  }
}

/**
 * Returns the thousands separator character
 *
 * @param {string} locale Component or context locale
 * @returns String
 */
export function handleThousandsSeparator(locale: string): string {
  return getThousandsSeparator(locale).replace(' ', ' ') // replace non-breaking space with a regular space
}

/**
 * Returns the decimal separator character
 *
 * @param {string} locale Component or context locale
 * @returns String
 */
export function handleDecimalSeparator(locale: string): string {
  const decimalSymbol = getDecimalSeparator(locale)

  return decimalSymbol
}

/**
 * Will take a JSON and return it parsed
 *
 * @param {string} str
 * @param {*} fallback optional fallback
 * @returns Parsed JSON
 */
export function fromJSON<T = unknown>(
  str: unknown,
  fallback: T | null = null
): T | unknown {
  if (typeof str === 'string' && str[0] === '{') {
    return JSON.parse(str)
  }

  return str || fallback
}
