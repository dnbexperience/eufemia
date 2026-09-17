/**
 * Web InputMasked Component
 */

import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useContext, useMemo } from 'react'
import { extendPropsWithContext } from '../../shared/component-helper'
import InputMaskedContext from './InputMaskedContext'
import InputMaskedElement from './InputMaskedElement'
import { inputDefaultProps } from '../input/Input'
import Context from '../../shared/Context'
import type { InputMaskedProps } from './types'

export type * from './types'

function InputMasked({ ref, ...restProps }: InputMaskedProps) {
  const context = useContext(Context)

  // Remove masks defined in Provider/Context, because it overwrites a custom mask
  const contextInputMasked = useMemo(() => {
    if (!restProps?.mask || !context?.InputMasked) {
      return context?.InputMasked
    }

    const clone = { ...context.InputMasked }
    for (const key in clone) {
      // Anchor every alternative so the match is "starts with", not "contains".
      if (/^(?:as[_A-Z]|numberMask|currencyMask)/.test(key)) {
        delete clone[key]
      }
    }

    return clone
  }, [context?.InputMasked, restProps?.mask])

  const contextAndProps = useMemo(() => {
    const propsWithRef = {
      ...restProps,
      ref,
    }

    return extendPropsWithContext(
      propsWithRef,
      inputMaskedDefaultProps,
      contextInputMasked
    )
  }, [contextInputMasked, restProps, ref])

  return (
    <InputMaskedContext value={{ props: contextAndProps, context }}>
      <InputMaskedElement />
    </InputMaskedContext>
  )
}

const { onKeyDown: _, ...inputBaseDefaults } = inputDefaultProps
const inputMaskedDefaultProps: Partial<InputMaskedProps> = {
  ...inputBaseDefaults,
  mask: null,
  numberMask: null,
  currencyMask: null,
  maskOptions: null,
  numberFormat: null,
  asCurrency: null,
  asNumber: null,
  asPercent: null,
  locale: null,
  showMask: false,
  allowOverflow: false,
  overwriteMode: null,
  onChange: null,
  onSubmit: null,
  onFocus: null,
  onBlur: null,
  onSubmitFocus: null,
  onSubmitBlur: null,
}

withComponentMarkers(InputMasked, {
  _formElement: true,
  _supportsSpacingProps: true,
})

export default InputMasked
