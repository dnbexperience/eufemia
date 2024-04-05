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
import { safeSetSelection } from './text-mask/createTextMaskInputElement'

const enableLocaleSupportWhen = ['as_number', 'as_percent', 'as_currency']
const enableNumberMaskWhen = [
  'as_number',
  'as_percent',
  'as_currency',
  'number_mask',
  'currency_mask',
]

export const invisibleSpace = '\u200B'

/**
 * Will return true if a prop needs Locale support
 *
 * @param {object} props object with given component props
 * @returns boolean
 */
export const isRequestingLocaleSupport = (props) => {
  return Object.entries(props).some(
    ([k, v]) => v && enableLocaleSupportWhen.includes(k)
  )
}

/**
 * Will return true if a prop will enable the internal NumberMask
 *
 * @param {object} props object with given component props
 * @returns boolean
 */
export const isRequestingNumberMask = (props) => {
  return Object.entries(props).some(
    ([k, v]) => v && enableNumberMaskWhen.includes(k)
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
 * @returns string Value
 */
export const correctNumberValue = ({
  localValue = null,
  props,
  locale,
  maskParams,
}) => {
  let value = props.value === null ? null : String(props.value)

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
   * This only runs IF "number_format" is set – we do not use it else
   */
  if (props.number_format) {
    const options = {
      locale,
      decimals: 0,
      ...props.number_format,
    }
    if (shouldHaveDecimals) {
      options.decimals = maskParams.decimalLimit
    }
    value = format(value, options)
  }

  const decimalSymbol = maskParams.decimalSymbol
  value = value.replace('.', decimalSymbol)

  if (localValue !== null) {
    const localNumberValue = localValue.replace(/[^\d,.-]/g, '')
    const numberValue = value.replace(/[^\d,.-]/g, '')
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
     * If a dev listens on_change and sends the number value back in,
     * for this, we also ensure that "numberValue" and "localNumberValue" is the same.
     */
    if (
      localNumberValue !== '0' &&
      localNumberValue.startsWith('0') &&
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
    if (/^(-|-0)$/.test(localValue.replace(/[^\d-0]/g, ''))) {
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
export const correctCaretPosition = (element, maskParams, props) => {
  const correction = () => {
    try {
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
        let pos = undefined

        if (start >= suffixStart && start <= suffixEnd) {
          pos = suffixStart

          // If there is a placeholder,
          // and the user clicks after the suffix
          // we want the position to be "before" the placeholderChar
          if (
            maskParams.placeholderChar !== invisibleSpace &&
            element.value.length - 1 === String(suffix + prefix).length
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

        const char = element.value.slice(pos - 1, pos)
        if (char === invisibleSpace) {
          pos = suffixStart - 1
        }

        if (!isNaN(parseFloat(pos))) {
          safeSetSelection(element, pos)
        }
      } else if (props?.mask && element.value.length === end) {
        const chars = element.value.split('')

        for (let l = chars.length, i = l - 1; i >= 0; i--) {
          const char = chars[i]
          const mask = props.mask[i]
          if (
            char &&
            char !== invisibleSpace &&
            mask instanceof RegExp &&
            mask.test(char)
          ) {
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
 * @returns object maskParams
 */
export const handlePercentMask = ({ props, locale, maskParams }) => {
  const value = format(props.value, { locale, percent: true })
  maskParams.suffix = String(value)?.match(/((\s|)%)$/g, '$1')?.[0] || ' %'

  return maskParams
}

/**
 * Return needed mask for handle: currency
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} mask_options Component property for change the mask parameters
 * @property {object} currency_mask Component property for change the currency parameters
 * @returns object maskParams
 */
export const handleCurrencyMask = ({ mask_options, currency_mask }) => {
  const maskParams = {
    showMask: true,
    placeholderChar: null,
    allowDecimal: true,
    decimalLimit: 2,
    decimalSymbol: ',',
    ...mask_options,
    ...currency_mask,
  }

  const fix =
    typeof currency_mask === 'string'
      ? currency_mask
      : typeof maskParams.currency === 'string'
      ? maskParams.currency
      : 'kr'

  maskParams.suffix = ` ${fix}`

  return maskParams
}

/**
 * Return needed mask for handle: number
 *
 * @param {object} param0 object with properties
 * @property {object} context Eufemia context
 * @property {object} mask_options Component property for change the mask parameters
 * @property {object} number_mask Component property for change the number parameters
 * @returns object maskParams
 */
export const handleNumberMask = ({ mask_options, number_mask }) => {
  const maskParams = {
    decimalSymbol: ',',
    ...mask_options,
    ...number_mask,
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
export function getSoftKeyboardAttributes(mask) {
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
 * @returns string
 */
export function handleThousandsSeparator(locale) {
  return getThousandsSeparator(locale).replace(' ', ' ') // replace non-breaking space with a regular space
}

/**
 * Returns the decimal separator character
 *
 * @param {string} locale Component or context locale
 * @returns string
 */
export function handleDecimalSeparator(locale) {
  let decimalSymbol = getDecimalSeparator(locale)

  return decimalSymbol
}

/**
 * Will take a JSON and return it parsed
 *
 * @param {string} str
 * @param {*} fallback optional fallback
 * @returns parsed json
 */
export function fromJSON(str, fallback = null) {
  if (typeof str === 'string' && str[0] === '{') {
    return JSON.parse(str)
  }

  return str || fallback
}
