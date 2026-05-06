/**
 * Handle the TextMask dependency
 *
 * @returns React Element
 */

import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect as reactUseLayoutEffect,
  useRef,
} from 'react'
import type { JSX, Ref } from 'react'
import InputMaskedContext from '../InputMaskedContext'
import TextMask from '../TextMask'
import { getSoftKeyboardAttributes } from '../InputMaskedUtils'
import { useMask } from './useMask'
import { useMaskParams } from './useMaskParams'
import { createNumberMask } from './useNumberMask'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? useEffect : reactUseLayoutEffect

export const useInputElement = () => {
  const { props } = useContext(InputMaskedContext)
  const { ref: refProp, allowOverflow, overwriteMode } = props

  const mask = useMask()
  const { showMask } = useMaskParams()

  const isFn = typeof refProp === 'function'
  const refHook = useRef<HTMLInputElement>(null)
  const ref = (!isFn && refProp) || refHook

  useLayoutEffect(() => {
    if (isFn) {
      refProp?.(ref.current)
    }
  }, [refProp, isFn, ref])

  // Create the actual input element
  const inputElementRef = useRef<JSX.Element>(
    <input ref={ref as Ref<HTMLInputElement>} />
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
          mask={mask || createNumberMask()}
          showMask={showMask}
          allowOverflow={allowOverflow}
          overwriteMode={overwriteMode}
          {...(getSoftKeyboardAttributes(mask) || {})}
          {...params}
        />
      )
    },
    [allowOverflow, mask, overwriteMode, ref, showMask]
  )
}
