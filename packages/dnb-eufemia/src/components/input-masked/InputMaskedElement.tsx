/**
 * Web InputMasked Component
 *
 */

import React from 'react'
import Input from '../input/Input'
import clsx from 'clsx'
import {
  useInputElement,
  useEventMapping,
  useFilteredProps,
  useLocalValue,
} from './hooks'

export default function InputMaskedElement(): React.JSX.Element {
  const inputElement = useInputElement()
  const { localValue, setLocalValue } = useLocalValue()
  const events = useEventMapping({ setLocalValue })

  const { props, htmlAttributes } = useFilteredProps()
  const {
    className, // eslint-disable-line
  } = props

  // ref is handled directly by useInputElement (which attaches
  // it to the underlying <input> element), so we omit it here
  // to avoid the Input wrapper's callback ref from overwriting it.
  const { ref: _ref, ...inputAttributes } = htmlAttributes as Record<
    string,
    unknown
  >

  return (
    <Input
      {...inputAttributes}
      {...events}
      inputElement={inputElement}
      value={localValue}
      className={clsx('dnb-input-masked', className)}
    />
  )
}
