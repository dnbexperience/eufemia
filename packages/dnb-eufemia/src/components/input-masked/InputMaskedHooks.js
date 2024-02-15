/**
 * Web InputMasked Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import {
  cleanNumber,
  getCurrencySymbol,
} from '../number-format/NumberUtils'
import {
  isTrue,
  dispatchCustomElementEvent,
  extendPropsWithContext,
} from '../../shared/component-helper'
import { safeSetSelection } from './text-mask/createTextMaskInputElement'

import TextMask from './TextMask'
import createNumberMask from './addons/createNumberMask'
import keycode from 'keycode'
import InputMaskedContext from './InputMaskedContext'

import {
  isRequestingLocaleSupport,
  isRequestingNumberMask,
  correctNumberValue,
  handlePercentMask,
  handleCurrencyMask,
  handleNumberMask,
  correctCaretPosition,
  getSoftKeyboardAttributes,
  handleThousandsSeparator,
  handleDecimalSeparator,
  fromJSON,
  invisibleSpace,
} from './InputMaskedUtils'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

/**
 * Takes all component properties and filters out all internal used properties
 *
 * @returns object {props, htmlAttributes}
 */
export const useFilteredProps = () => {
  const { props } = React.useContext(InputMaskedContext)

  const {
    mask, // eslint-disable-line
    number_mask, // eslint-disable-line
    currency_mask, // eslint-disable-line
    number_format, // eslint-disable-line
    mask_options, // eslint-disable-line
    as_currency, // eslint-disable-line
    as_number, // eslint-disable-line
    as_percent, // eslint-disable-line
    locale, // eslint-disable-line
    show_mask, // eslint-disable-line
    show_guide, // eslint-disable-line
    pipe, // eslint-disable-line
    keep_char_positions, // eslint-disable-line
    placeholder_char, // eslint-disable-line

    // Get get rest of possible attributes
    ...attributes
  } = props

  return { props, htmlAttributes: Object.freeze(attributes) }
}

/**
 * Returns locale from either component or context
 *
 * @returns string
 */
export const useLocale = () => {
  const { props, context } = React.useContext(InputMaskedContext)

  let { locale } = props
  if (!locale && context?.locale) {
    locale = context.locale
  }

  return locale
}

/**
 * Handle internal value state
 *
 * It handles both the value state given as a prop form outside,
 * along with the current written and internal value.
 *
 * @returns object with internal value state and state setter
 */
export const useLocalValue = () => {
  const { props, context } = React.useContext(InputMaskedContext)
  const maskParams = useNumberMaskParams() || {}
  const locale = useLocale()

  const [localValue, setLocalValue] = React.useState(() =>
    correctNumberValue({
      locale,
      props,
      maskParams,
    })
  )

  /**
   * Use an effect here, just;
   * because when a property gets changed from outside
   */
  React.useEffect(() => {
    const value = correctNumberValue({
      localValue,
      locale,
      props,
      maskParams,
    })

    setLocalValue(value)

    // Do not set "localValue" and "maskParams" here
  }, [props, context, locale]) // eslint-disable-line

  return { localValue, setLocalValue }
}

/**
 * Create createNumberMask if number mask parameters exists
 *
 * @returns mask function
 */
export const useNumberMask = () => {
  const maskParams = useNumberMaskParams()
  const { props } = React.useContext(InputMaskedContext)

  if (!maskParams || !isRequestingNumberMask(props)) {
    return null
  }

  const mask = createNumberMask(maskParams)

  mask.maskParams = maskParams

  return mask
}

/**
 * Returns either internal mask or given property mask
 *
 * @returns mask function
 */
export const useMask = () => {
  const { props } = React.useContext(InputMaskedContext)

  const numberMask = useNumberMask()
  if (numberMask) {
    return numberMask
  }

  return props.mask
}

/**
 * Returns the final mask params
 *
 * @returns mask params
 */
export const useMaskParams = () => {
  const { props } = React.useContext(InputMaskedContext)

  const {
    keep_char_positions,
    show_guide,
    show_mask,
    placeholder_char,
    placeholder,
  } = props

  const mask = useMask()
  const maskParams = useNumberMaskParams() || {}

  maskParams.showMask = !placeholder && isTrue(show_mask)

  // Revalidated placeholder char to a zero width space
  maskParams.placeholderChar = placeholder_char
  if (typeof mask?.placeholderChar !== 'undefined') {
    maskParams.placeholderChar = mask.placeholderChar
  }
  if (maskParams.placeholderChar === null) {
    maskParams.placeholderChar = invisibleSpace
  }

  if (typeof mask?.showMask !== 'undefined') {
    maskParams.showMask = mask.showMask
  }

  maskParams.showGuide = isTrue(show_guide)
  maskParams.keepCharPositions = isTrue(keep_char_positions)

  return maskParams
}

/**
 * Handle the TextMask dependency
 *
 * @returns React Element
 */
export const useInputElement = () => {
  const { props } = React.useContext(InputMaskedContext)
  const { pipe, inner_ref } = props

  const mask = useMask()
  const { showMask, showGuide, placeholderChar, keepCharPositions } =
    useMaskParams()

  const isFn = typeof inner_ref === 'function'
  const refHook = React.useRef()
  const ref = (!isFn && inner_ref) || refHook

  useLayoutEffect(() => {
    if (isFn) {
      inner_ref?.(ref.current)
    }
  }, [inner_ref, isFn, ref])

  // Create the actual input element
  const inputElementRef = React.useRef(<input ref={ref} />)

  const InputElement = (params, innerRef) => {
    // Set ref for Eufemia input
    innerRef.current = ref.current

    return (
      <TextMask
        inputRef={ref}
        inputElement={inputElementRef.current}
        pipe={pipe}
        mask={mask || []}
        showMask={showMask}
        guide={showGuide}
        keepCharPositions={keepCharPositions}
        placeholderChar={placeholderChar}
        {...getSoftKeyboardAttributes(mask)}
        {...params}
        className={classnames(
          params.className,
          showMask &&
            showGuide &&
            placeholderChar &&
            placeholderChar !== invisibleSpace &&
            'dnb-input-masked--guide' // will use --font-family-monospace
        )}
      />
    )
  }
  return InputElement
}

/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns object of events to handle
 */
export const useEventMapping = ({ setLocalValue }) => {
  const callEvent = useCallEvent({ setLocalValue })

  return {
    onBeforeInput: (event) => callEvent({ event }, 'on_before_input'),
    onFocus: (params) => callEvent(params, 'on_focus'),
    onBlur: (params) => callEvent(params, 'on_blur'),
    onMouseUp: (event) => callEvent({ event }, 'on_mouse_up'),
    onMouseDown: (event) => callEvent({ event }, 'on_mouse_down'),
    onKeyDown: (params) => callEvent(params, 'on_key_down'),
    onSubmit: (params) => callEvent(params, 'on_submit'),
    onChange: (params) => callEvent(params, 'on_change'),

    on_focus: undefined,
    on_blur: undefined,
    on_key_down: undefined,
    on_submit: undefined,
    on_change: undefined,
  }
}

/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns event handler function
 */
const useCallEvent = ({ setLocalValue }) => {
  const { props } = React.useContext(InputMaskedContext)
  const maskParams = useMaskParams()
  const isNumberMask = useNumberMask()

  // Source: https://en.wikipedia.org/wiki/Decimal_separator
  const decimalSeparators = /[,.'·]/
  let isUnidentified = false

  const callEvent = ({ event, value }, name) => {
    value = value || event.target.value
    const selStart = event.target.selectionStart
    let keyCode = keycode(event)

    // Android issue: https://bugs.chromium.org/p/chromium/issues/detail?id=118639
    if (
      name === 'on_key_down' &&
      (event.which === 229 || keyCode === undefined)
    ) {
      isUnidentified = true
    }

    // Android issue: https://bugs.chromium.org/p/chromium/issues/detail?id=118639
    // so we use this solution instead
    if (
      isUnidentified &&
      name === 'on_before_input' &&
      typeof event?.data !== 'undefined'
    ) {
      name = 'on_key_down'
      keyCode = event.data
      isUnidentified = false
    }

    // Prevent entering a leading zero
    if (
      name === 'on_key_down' &&
      !isUnidentified &&
      maskParams?.disallowLeadingZeroes &&
      (keyCode === '0' ||
        keyCode === 'numpad 0' ||
        (value.replace(/[^\d]/g, '') === '' &&
          decimalSeparators.test(keyCode)))
    ) {
      const testValue = (
        value.slice(0, selStart) +
        '0' +
        value.slice(selStart + 1, value.length)
      ).replace(/[^\d]/g, '')

      if (/^0/.test(testValue)) {
        event.preventDefault()
      }
    }

    if (
      name === 'on_key_down' &&
      isNumberMask &&
      !isUnidentified &&
      maskParams?.decimalSymbol
    ) {
      const hasDecimalSymbol = value.includes(maskParams.decimalSymbol)
      const allowedDecimals =
        maskParams.decimalLimit > 0 || maskParams.allowDecimal !== false

      if (!allowedDecimals && decimalSeparators.test(keyCode)) {
        event.preventDefault()
      }

      const charAtSelection = value.slice(selStart, selStart + 1)

      if (allowedDecimals) {
        // if we have already a decimal ...
        if (hasDecimalSymbol && decimalSeparators.test(keyCode)) {
          // ... we set the cursor on after the decimalSeparators
          if (decimalSeparators.test(charAtSelection)) {
            const index = value.indexOf(maskParams.decimalSymbol)
            if (index > -1) {
              safeSetSelection(event.target, index + 1)
            }
          }

          // ... we do not allow to type another
          event.preventDefault()
        }

        // replace other decimal
        else if (
          !hasDecimalSymbol &&
          keyCode !== maskParams.decimalSymbol &&
          decimalSeparators.test(keyCode)
        ) {
          value = value.slice(0, selStart)
          setLocalValue(value + maskParams.decimalSymbol)
          event.target.value = value + maskParams.decimalSymbol
          event.preventDefault()
        }
      }

      // move cursor to right if key is delete and char at selection is thousand separator
      if (
        keyCode === 'delete' &&
        charAtSelection === (maskParams.thousandsSeparatorSymbol || ' ')
      ) {
        safeSetSelection(event.target, selStart + 1)
        event.preventDefault()
      }
    }

    let num = cleanNumber(value, {
      prefix: maskParams.prefix,
      suffix: maskParams.suffix,
      decimalSeparator: maskParams.decimalSymbol || ',',
      thousandsSeparator: maskParams.thousandsSeparatorSymbol || ' ',
    })

    // We don't want to return NaN, so we set it to 0
    if (num === '-') {
      num = -0
    }

    const numberValue = Number(num)

    // Return '' (empty string) when the user has entered something invalid
    const cleanedValue =
      numberValue === 0 && String(num).charAt(0) !== '0' ? '' : num

    switch (name) {
      case 'on_focus':
      case 'on_key_down':
      case 'on_mouse_down':
      case 'on_mouse_up':
        event.target.runCorrectCaretPosition = () =>
          correctCaretPosition(event.target, maskParams, props)
        if (!event.target.__getCorrectCaretPosition) {
          event.target.runCorrectCaretPosition()
        }
        break
    }

    const result = dispatchCustomElementEvent(props, name, {
      event,
      value,
      numberValue,
      cleanedValue,
    })

    if (name === 'on_change') {
      setLocalValue(value)
    }

    return result
  }

  return callEvent
}

/**
 * Returns number mask parameters if requested by the component properties
 *
 * @returns object of number mask parameter
 */
const useNumberMaskParams = () => {
  const { props } = React.useContext(InputMaskedContext)
  const locale = useLocale()

  if (!isRequestingNumberMask(props)) {
    return { ...fromJSON(props.mask_options) }
  }

  let { number_mask, currency_mask, mask_options } = props
  const { as_number, as_percent, as_currency, value } = props

  mask_options = fromJSON(mask_options)
  number_mask = isTrue(number_mask) ? {} : fromJSON(number_mask)
  currency_mask = isTrue(currency_mask)
    ? {}
    : fromJSON(currency_mask, {
        currency: currency_mask,
      })
  if (!currency_mask?.currency) {
    delete currency_mask.currency
  }

  if (isRequestingLocaleSupport(props)) {
    const thousandsSeparatorSymbol = handleThousandsSeparator(locale)
    const decimalSymbol = handleDecimalSeparator(locale)

    if (isTrue(as_number) || isTrue(as_percent)) {
      number_mask = extendPropsWithContext(number_mask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
      })
    } else if (as_currency) {
      currency_mask = extendPropsWithContext(currency_mask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
        currency: getCurrencySymbol(
          locale,
          typeof as_currency === 'string' ? as_currency : null,
          currency_mask?.currencyDisplay,
          value
        ),
      })
    }
  }

  let maskParams = null

  if (number_mask) {
    maskParams = handleNumberMask({
      mask_options,
      number_mask,
    })

    if (isTrue(as_percent)) {
      maskParams = handlePercentMask({ props, locale, maskParams })
    }
  } else if (currency_mask) {
    maskParams = handleCurrencyMask({
      mask_options,
      currency_mask,
    })
  }

  return maskParams
}
