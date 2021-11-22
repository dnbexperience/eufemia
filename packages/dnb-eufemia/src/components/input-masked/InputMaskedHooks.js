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
} from '../../shared/component-helper'
import Context from '../../shared/Context'

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
  getInputModeFromMask,
  handleThousandsSeparator,
  handleDecimalSeparator,
  fromJSON,
  invisibleSpace,
} from './InputMaskedUtils'

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
 * Returns either given component property ref or new internal ref
 *
 * @returns React ref
 */
export const useInputElementRef = () => {
  const { props } = React.useContext(InputMaskedContext)
  return typeof props?.inner_ref?.current !== 'undefined'
    ? props?.inner_ref
    : React.createRef()
}

/**
 * Returns locale from either component or context
 *
 * @returns string
 */
export const useLocale = () => {
  const { props } = React.useContext(InputMaskedContext)
  const context = React.useContext(Context)

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
  const { props } = React.useContext(InputMaskedContext)
  const context = React.useContext(Context)
  const maskParams = useNumberMaskParams()
  const locale = useLocale()

  const [localValue, setLocalValue] = React.useState(() =>
    correctNumberValue({
      props,
      context,
      locale,
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
      props,
      context,
      locale,
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

  if (!maskParams) {
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
export const useInternalMask = () => {
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

  const mask = useInternalMask()
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
  const ref = useInputElementRef()
  const { props } = React.useContext(InputMaskedContext)

  const { pipe } = props

  const mask = useInternalMask()
  const { showMask, showGuide, placeholderChar, keepCharPositions } =
    useMaskParams()

  // Create the actual input element
  const inputElementRef = React.useRef(<input ref={ref} />)

  const InputElement = (params, innerRef) => {
    // Set ref for Eufemia input
    innerRef.current = ref.current

    // Set "inputMode"
    if (!params.inputMode) {
      params.inputMode = getInputModeFromMask(mask)
    }

    return (
      <TextMask
        inputRef={ref}
        inputElement={inputElementRef.current}
        pipe={pipe}
        mask={mask}
        showMask={showMask}
        guide={showGuide}
        keepCharPositions={keepCharPositions}
        placeholderChar={placeholderChar}
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
    onMouseUp: (event) => callEvent({ event }, 'on_mouse_up'),
    on_focus: (params) => callEvent(params, 'on_focus'),
    on_key_down: (params) => callEvent(params, 'on_key_down'),
    on_submit: (params) => callEvent(params, 'on_submit'),
    on_blur: (params) => callEvent(params, 'on_blur'),
    on_change: (params) => callEvent(params, 'on_change'),
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

  // Return empty func if no number mask is used
  if (!maskParams) {
    return () => {}
  }

  // Source: https://en.wikipedia.org/wiki/Decimal_separator
  const decimalSeparators = /[,.'·]/

  const callEvent = ({ event, value }, name) => {
    value = value || event.target.value
    const keyCode = keycode(event)
    const selStart = event.target.selectionStart
    const isUnidentified = event.which === 229 || keyCode === undefined // Android issue

    // Prevent entering a leading zero
    if (
      name === 'on_key_down' &&
      !isUnidentified &&
      !maskParams?.allowLeadingZeroes &&
      (keyCode === '0' ||
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
        return // stop here
      }
    }

    if (
      name === 'on_key_down' &&
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
              event.target.setSelectionRange(index + 1, index + 1)
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
        }
      }
    }

    const num = cleanNumber(value, {
      prefix: maskParams.prefix,
      suffix: maskParams.suffix,
      decimalSeparator: maskParams.decimalSymbol || ',',
      thousandsSeparator: maskParams.thousandsSeparatorSymbol || ' ',
    })

    const numberValue = Number(num)
    const cleanedValue = numberValue === 0 ? '' : num
    const cleaned_value = cleanedValue // Deprecated

    if (name === 'on_change' && numberValue === 0) {
      correctCaretPosition(event.target, maskParams)
    }

    const result = dispatchCustomElementEvent(props, name, {
      event,
      value,
      numberValue,
      cleanedValue,
      cleaned_value, // Deprecated
    })

    if (name === 'on_change') {
      setLocalValue(value)
    }

    if (
      (name === 'on_focus' || name === 'on_mouse_up') &&
      !props.selectall
    ) {
      // Also correct here, because of additional click inside the field
      correctCaretPosition(event.target, maskParams)
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
  const context = React.useContext(Context)
  const locale = useLocale()

  if (!isRequestingNumberMask(props)) {
    return null
  }

  let { number_mask, currency_mask, mask_options } = props

  const { as_number, as_percent, as_currency } = props

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
      number_mask = {
        decimalSymbol,
        thousandsSeparatorSymbol,
        ...number_mask,
      }
    } else if (as_currency) {
      currency_mask = {
        decimalSymbol,
        thousandsSeparatorSymbol,
        currency: getCurrencySymbol(
          locale,
          typeof as_currency === 'string' ? as_currency : null
        ),
        ...currency_mask,
      }
    }
  }

  let maskParams = null

  if (number_mask) {
    maskParams = handleNumberMask({
      context,
      mask_options,
      number_mask,
    })

    if (isTrue(as_percent)) {
      maskParams = handlePercentMask({ props, locale, maskParams })
    }
  } else if (currency_mask) {
    maskParams = handleCurrencyMask({
      context,
      mask_options,
      currency_mask,
    })
  }

  return maskParams
}
