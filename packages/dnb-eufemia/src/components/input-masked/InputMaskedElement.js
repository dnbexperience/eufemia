/**
 * Web InputMasked Component
 *
 */

import React from 'react'
import Input from '../input/Input'
import { isTrue } from '../../shared/component-helper'
import classnames from 'classnames'
import {
  useInputElement,
  useEventMapping,
  useFilteredProps,
  useLocalValue,
} from './InputMaskedHooks'

export default function InputMaskedElement() {
  const inputElement = useInputElement()
  const { localValue, setLocalValue } = useLocalValue()
  const events = useEventMapping({ setLocalValue })

  const { props, htmlAttributes } = useFilteredProps()
  const {
    className, // eslint-disable-line
    show_guide, // eslint-disable-line
    show_mask, // eslint-disable-line
    placeholder_char, // eslint-disable-line
  } = props

  return (
    <Input
      {...htmlAttributes}
      {...events}
      input_element={inputElement}
      value={localValue}
      className={classnames(
        'dnb-input-masked',
        className,
        isTrue(show_mask) &&
          isTrue(show_guide) &&
          placeholder_char === '_' &&
          'dnb-input-masked--guide'
      )}
    />
  )
}
