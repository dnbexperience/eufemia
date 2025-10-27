/**
 * Web InputMasked Component
 *
 */

import React from 'react'
import Input from '../input/Input'
import classnames from 'classnames'
import {
  useInputElement,
  useEventMapping,
  useFilteredProps,
  useLocalValue,
} from './hooks'

export default function InputMaskedElement(): JSX.Element {
  const inputElement = useInputElement()
  const { localValue, setLocalValue } = useLocalValue()
  const events = useEventMapping({ setLocalValue })

  const { props, htmlAttributes } = useFilteredProps()
  const {
    className, // eslint-disable-line
  } = props

  return (
    <Input
      {...htmlAttributes}
      {...events}
      inputElement={inputElement}
      value={localValue}
      className={classnames('dnb-input-masked', className)}
    />
  )
}
