/**
 * Web InputMasked Component
 *
 */

import React, { useCallback } from 'react'
import classnames from 'classnames'
import {
  cleanNumber,
  getCurrencySymbol,
} from '../number-format/NumberUtils'
import {
  isTrue,
  dispatchCustomElementEvent,
  extendPropsWithContext,
  keycode,
} from '../../shared/component-helper'
import { safeSetSelection } from './text-mask/createTextMaskInputElement'
import { isNumber } from './text-mask/utilities'

import TextMask from './TextMask'
import createNumberMask from './addons/createNumberMask'
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

// Local minus class pattern, matches multiple minus-like characters
const NUMBER_MINUS = '-|−|‐|‒|–|—|―'

/**
 * Takes all component properties and filters out all internal used properties
 *
 * @returns object {props, htmlAttributes}
 */
export const useFilteredProps = () => {
  const { props } = React.useContext(InputMaskedContext)

  const {
    mask, // eslint-disable-line
    numberMask, // eslint-disable-line
    currencyMask, // eslint-disable-line
    numberFormat, // eslint-disable-line
    maskOptions, // eslint-disable-line
    asCurrency, // eslint-disable-line
    asNumber, // eslint-disable-line
    asPercent, // eslint-disable-line
    locale, // eslint-disable-line
    showMask, // eslint-disable-line
    showGuide, // eslint-disable-line
    pipe, // eslint-disable-line
    keepCharPositions, // eslint-disable-line
    placeholderChar, // eslint-disable-line

    // Get get rest of possible attributes
    ...attributes
  } = props

  return {
    props,
    htmlAttributes: Object.freeze(attributes as Record<string, unknown>),
  }
}

/**
 * Returns locale from either component or context
 *
 * @returns string
 */
export const useTranslation = () => {
  const { props, context } = React.useContext(InputMaskedContext)

  let { locale } = props
  if (!locale && context?.locale) {
    locale = context.locale
  }

  return locale as string
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
  const locale = useTranslation()

  const [localValue, setLocalValue] = React.useState(() => {
    return correctNumberValue({
      locale,
      props,
      maskParams,
    })
  })

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
    keepCharPositions,
    showGuide,
    showMask,
    placeholderChar,
    placeholder,
  } = props

  const mask = useMask()
  const maskParams = useNumberMaskParams() || {}

  maskParams.showMask = !placeholder && isTrue(showMask)

  // Revalidated placeholder char to a zero width space
  maskParams.placeholderChar = placeholderChar
  if (typeof mask?.placeholderChar !== 'undefined') {
    maskParams.placeholderChar = mask.placeholderChar
  }
  if (maskParams.placeholderChar === null) {
    maskParams.placeholderChar = invisibleSpace
  }

  if (typeof mask?.showMask !== 'undefined') {
    maskParams.showMask = mask.showMask
  }

  maskParams.showGuide = isTrue(showGuide)
  maskParams.keepCharPositions = isTrue(keepCharPositions)

  return maskParams
}

/**
 * Handle the TextMask dependency
 *
 * @returns React Element
 */
export const useInputElement = () => {
  const { props } = React.useContext(InputMaskedContext)
  const { pipe, innerRef } = props

  const mask = useMask()
  const { showMask, showGuide, placeholderChar, keepCharPositions } =
    useMaskParams()

  const isFn = typeof innerRef === 'function'
  const refHook = React.useRef<HTMLInputElement>(null)
  const ref = (!isFn && innerRef) || refHook

  useLayoutEffect(() => {
    if (isFn) {
      innerRef?.(ref.current)
    }
  }, [innerRef, isFn, ref])

  // Create the actual input element
  const inputElementRef = React.useRef<JSX.Element>(
    <input ref={ref as React.Ref<HTMLInputElement>} />
  )

  return useCallback(
    (
      params: Record<string, unknown>,
      innerRef: { current: HTMLInputElement | null }
    ) => {
      // Set ref for Eufemia input
      innerRef.current = ref.current

      return (
        <TextMask
          inputRef={ref}
          inputElement={inputElementRef.current}
          pipe={pipe}
          mask={mask || createNumberMask()}
          showMask={showMask}
          guide={showGuide}
          keepCharPositions={keepCharPositions}
          placeholderChar={placeholderChar}
          {...(getSoftKeyboardAttributes(mask) || {})}
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
    },
    [
      keepCharPositions,
      mask,
      pipe,
      placeholderChar,
      ref,
      showGuide,
      showMask,
    ]
  )
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
    onBeforeInput: (event) => callEvent({ event }, 'onBeforeInput'),
    onInput: (event) => callEvent({ event }, 'onInput'),
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
const useCallEvent = ({
  setLocalValue,
}: {
  setLocalValue: (v: string) => void
}) => {
  const maskParamsRef = React.useRef<ReturnType<
    typeof useMaskParams
  > | null>(null)
  maskParamsRef.current = useMaskParams()

  const { props } = React.useContext(InputMaskedContext)
  const isNumberMask = useNumberMask()

  // Source: https://en.wikipedia.org/wiki/Decimal_separator
  const decimalSeparators = /[,.'·]/
  let isUnidentified = false

  const callEvent = (
    { event, value }: { event: any; value?: any },
    name: string
  ) => {
    const maskParams = maskParamsRef.current as ReturnType<
      typeof useMaskParams
    >
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
      name === 'onBeforeInput' &&
      typeof event?.data !== 'undefined'
    ) {
      name = 'on_key_down'
      keyCode = event.data
      isUnidentified = false
    }

    // Add support for "await userEvent.type(input, '0...')"
    if (isUnidentified && event.key === '0') {
      keyCode = '0'
      isUnidentified = false
    }

    // Prevent entering a leading zero.
    // Also remove leading zeroes when the input is blurred.
    if (
      maskParams?.disallowLeadingZeroes &&
      (name === 'onInput' || name === 'on_blur')
    ) {
      const isNegative = new RegExp(`^${NUMBER_MINUS}`, 'g').test(value)
      if (
        (isNegative ? selStart > 1 : selStart > 0) ||
        name === 'on_blur'
      ) {
        const onlyNumber = value.replace(
          new RegExp(`[^\\d${maskParams.decimalSymbol}]`, 'g'),
          ''
        )
        let leadingZeroes = 0
        for (let i = 0; i < onlyNumber.length - 1; i++) {
          if (
            onlyNumber.charAt(i) === '0' &&
            onlyNumber.charAt(i + 1) !== maskParams.decimalSymbol
          ) {
            leadingZeroes++
          } else {
            break
          }
        }
        let newSelStart = selStart
        let newValue = value
        let firstNumberIndex = 0
        if (leadingZeroes > 0) {
          for (let i = 0; i < value.length; i++) {
            firstNumberIndex = i
            const char = value.charAt(i)

            if (
              (char !== '0' && isNumber(parseInt(char))) ||
              value.charAt(i + 1) === maskParams.decimalSymbol
            ) {
              break
            }
          }
          newValue =
            value.substring(0, isNegative ? 1 : 0) +
            value.substring(firstNumberIndex)

          newSelStart =
            selStart > firstNumberIndex
              ? selStart - (value.length - newValue.length)
              : isNegative
              ? 1
              : 0
        }

        if (newValue !== value) {
          setLocalValue(newValue)
          event.target.value = newValue
          safeSetSelection(event.target, newSelStart)
          value = newValue
        }
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
          correctCaretPosition(event.target, maskParamsRef, props)
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
  const locale = useTranslation()

  if (!isRequestingNumberMask(props)) {
    return { ...(fromJSON(props.maskOptions) as Record<string, unknown>) }
  }

  let { numberMask, currencyMask, maskOptions } = props
  const { asNumber, asPercent, asCurrency, value } = props

  maskOptions = fromJSON(maskOptions) as any
  numberMask = isTrue(numberMask) ? {} : (fromJSON(numberMask) as any)
  currencyMask = isTrue(currencyMask)
    ? {}
    : (fromJSON(currencyMask, {
        currency: currencyMask,
      }) as any)
  if (!currencyMask?.currency) {
    delete currencyMask.currency
  }

  if (isRequestingLocaleSupport(props)) {
    const thousandsSeparatorSymbol = handleThousandsSeparator(locale)
    const decimalSymbol = handleDecimalSeparator(locale)

    if (isTrue(asNumber) || isTrue(asPercent)) {
      numberMask = extendPropsWithContext(numberMask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
      })
    } else if (asCurrency) {
      currencyMask = extendPropsWithContext(currencyMask, null, {
        decimalSymbol,
        thousandsSeparatorSymbol,
        currency: (getCurrencySymbol as any)(
          locale,
          typeof asCurrency === 'string' ? asCurrency : null,
          currencyMask?.currencyDisplay,
          value
        ),
      })
    }
  }

  let maskParams = null

  if (numberMask) {
    maskParams = handleNumberMask({
      maskOptions,
      numberMask,
    })

    if (isTrue(asPercent)) {
      maskParams = handlePercentMask({ props, locale, maskParams })
    }
  } else if (currencyMask) {
    maskParams = handleCurrencyMask({
      maskOptions,
      currencyMask,
    })
  }

  return maskParams
}
