/**
 * Handle the TextMask dependency
 *
 * @returns React Element
 */

import React, { useCallback } from 'react'
import classnames from 'classnames'
import InputMaskedContext from '../InputMaskedContext'
import TextMask from '../TextMask'
import {
  invisibleSpace,
  getSoftKeyboardAttributes,
} from '../InputMaskedUtils'
import { useMask } from './useMask'
import { useMaskParams } from './useMaskParams'
import { createNumberMask } from './useNumberMask'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

export const useInputElement = () => {
  const { props } = React.useContext(InputMaskedContext)
  const { innerRef } = props

  const mask = useMask()
  const { showMask, placeholderChar } = useMaskParams()

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
          mask={mask || createNumberMask()}
          showMask={showMask}
          placeholderChar={placeholderChar}
          {...(getSoftKeyboardAttributes(mask) || {})}
          {...params}
          className={classnames(
            params.className,
            showMask &&
              placeholderChar &&
              placeholderChar !== invisibleSpace &&
              'dnb-input-masked--guide' // will use --font-family-monospace
          )}
        />
      )
    },
    [mask, placeholderChar, ref, showMask]
  )
}
