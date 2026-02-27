/**
 * Handle the TextMask dependency
 *
 * @returns React Element
 */

import React, { useCallback } from 'react'
import clsx from 'clsx'
import InputMaskedContext from '../InputMaskedContext'
import TextMask from '../TextMask'
import createNumberMask from '../addons/createNumberMask'
import {
  invisibleSpace,
  getSoftKeyboardAttributes,
} from '../InputMaskedUtils'
import { useMask } from './useMask'
import { useMaskParams } from './useMaskParams'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export const useInputElement = () => {
  const { props } = React.useContext(InputMaskedContext)
  const { pipe, ref: refProp } = props

  const mask = useMask()
  const { showMask, showGuide, placeholderChar, keepCharPositions } =
    useMaskParams()

  const isFn = typeof refProp === 'function'
  const refHook = React.useRef<HTMLInputElement>(null)
  const ref = (!isFn && refProp) || refHook

  useLayoutEffect(() => {
    if (isFn) {
      refProp?.(ref.current)
    }
  }, [refProp, isFn, ref])

  // Create the actual input element
  const inputElementRef = React.useRef<React.JSX.Element>(
    <input ref={ref as React.Ref<HTMLInputElement>} />
  )

  return useCallback(
    (
      params: Record<string, unknown>,
      inputRef: { current: HTMLInputElement | null }
    ) => {
      // Set ref for Eufemia input
      inputRef.current = ref.current

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
          className={clsx(
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
