/**
 * Will map some events we need to map during typing
 *
 * @param {object} param0
 * @property {function} setLocalValue setState handler
 * @returns event handler function
 */

import React from 'react'
import { cleanNumber } from '../../number-format/NumberUtils'
import {
  keycode,
  dispatchCustomElementEvent,
} from '../../../shared/component-helper'
import { safeSetSelection } from '../text-mask/createTextMaskInputElement'
import { isNumber } from '../text-mask/utilities'
import InputMaskedContext from '../InputMaskedContext'
import { correctCaretPosition } from '../InputMaskedUtils'
import { useMaskParams } from './useMaskParams'
import { useNumberMask } from './useNumberMask'

// Local minus class pattern, matches multiple minus-like characters
const NUMBER_MINUS = '-|−|‐|‒|–|—|―'

export const useCallEvent = ({
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
      (name === 'onInput' || name === 'onBlur')
    ) {
      const isNegative = new RegExp(`^${NUMBER_MINUS}`, 'g').test(value)
      if (
        (isNegative ? selStart > 1 : selStart > 0) ||
        name === 'onBlur'
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
      case 'onFocus':
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

    if (name === 'onChange') {
      setLocalValue(value)
    }

    return result
  }

  return callEvent
}
