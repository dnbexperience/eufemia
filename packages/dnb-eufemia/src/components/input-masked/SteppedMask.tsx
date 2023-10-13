import React, { Fragment, MutableRefObject, useRef, useState } from 'react'
import Input from '../Input'

import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'
import FormLabel from '../FormLabel'
import { SpacingProps } from '../space/types'
import { createSpacingClasses } from '../space/SpacingHelper'
import { FormStatusState, FormStatusText } from '../FormStatus'

export type SteppedMaskInput<T extends string> = {
  /**
   * Defines the id for the input. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` paramaters.
   */
  id: T
  /**
   * Label used by the input. The label itself is hidden, but required to uphold accesability standards for screen readers.
   */
  label: string
  /**
   * Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The length sets the size of the input, so an array of two items would produce an input of two characters
   */
  mask: RegExp[]
  /**
   * Sets the placeholder character used for the input.
   */
  placeholderCharacter: string
}

export type SteppedMaskValue<T extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]: string
}

export type SteppedMaskProps<T extends string> = {
  /**
   * The label describing the group of inputs inside the components.
   */
  label?: string
  /**
   * Used to define the different inputs representing the steps in the component. The id's defined here is used to map input value to correct property in `values` parameters used in `onChange`
   */
  steps: SteppedMaskInput<T>[]
  /**
   * Values used for the inputs inside the component. Expects an object with keys matching the id's defined in `steps`
   */
  values?: SteppedMaskValue<T>
  /**
   * Defines the delimiter used to seperate the inputs inside the component.
   */
  delimiter?: string
  /**
   * Runs when the input value changes. Has an object parameter with keys matching the id's defined in `steps`. i.e. `{month: string, year: string}`
   */
  onChange?: (values: SteppedMaskValue<T>) => void
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState
} & Omit<
  React.HTMLProps<HTMLInputElement>,
  'onChange' | 'ref' | 'value' | 'label'
> &
  SpacingProps

function SteppedMask<T extends string>({
  label,
  steps,
  delimiter,
  onChange: onChangeExternal,
  disabled,
  status,
  statusState,
  ...props
}: SteppedMaskProps<T>) {
  const [values, setValues] = useState<SteppedMaskValue<T>>(
    getDefaultValues()
  )

  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const WrapperElement = label ? 'fieldset' : 'div'

  const { handleKeydown } = useHandleCursorPosition(
    inputRefs.current,
    getKeysToHandle()
  )

  const { className, ...restOfProps } = props

  return (
    <WrapperElement
      className={classnames(
        'dnb-stepped-mask__fieldset',
        createSpacingClasses(props)
      )}
    >
      {label && (
        <FormLabel
          className="dnb-stepped-mask__legend"
          element="legend"
          onClick={onLegendClick}
          disabled={disabled}
          vertical
        >
          {label}
        </FormLabel>
      )}
      <Input
        {...restOfProps}
        className={classnames('dnb-stepped-mask', className)}
        disabled={disabled}
        status={status}
        status_state={statusState}
        input_element={steps.map(
          ({ id, label, mask, placeholderCharacter }, index) => (
            <Fragment key={id}>
              <TextMask
                id={`${id}__input`}
                className={classnames(
                  'dnb-input__input',
                  'dnb-stepped-mask__input',
                  values[id] && 'dnb-stepped-mask__input--highlight'
                )}
                disabled={disabled}
                size={mask.length}
                mask={mask}
                value={values[id] ?? ''}
                placeholderChar={placeholderCharacter}
                guide={true}
                showMask={true}
                keepCharPositions={false} // so we can overwrite next value, if it already exists
                onKeyDown={handleKeydown}
                onFocus={onInputFocus}
                onChange={(event) => {
                  onChange(
                    id,
                    removePlaceholder(
                      event.target.value,
                      placeholderCharacter
                    )
                  )
                }}
                ref={getInputRef}
                aria-labelledby={`${id}__label`}
              />
              <label id={`${id}__label`} htmlFor={`${id}__input`} hidden>
                {label}
              </label>
              {index !== steps.length - 1 && delimiter && (
                <span
                  aria-hidden
                  className={classnames(
                    'dnb-stepped-mask__delimiter',
                    values[id] && 'dnb-stepped-mask__delimiter--highlight'
                  )}
                >
                  {delimiter}
                </span>
              )}
            </Fragment>
          )
        )}
      />
    </WrapperElement>
  )

  // Event handlers
  function onLegendClick() {
    if (disabled) {
      return
    }

    const firstInput = inputRefs.current[0].current

    firstInput.focus()
    firstInput.setSelectionRange(0, 0)
  }

  function onInputFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    target.focus()
    target.select()
  }

  function onChange(id: string, value: string) {
    const updatedValues = { ...values, [id]: value }

    setValues(updatedValues)
    if (onChangeExternal) {
      onChangeExternal(updatedValues)
    }
  }

  // Utilites
  function getDefaultValues() {
    if (props.values) {
      return props.values
    }

    return steps.reduce((values, step) => {
      values[step.id] = ''

      return values
    }, {} as SteppedMaskValue<T>)
  }

  function getInputRef(ref: any) {
    const inputRef = ref?.inputRef

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }
  }

  function removePlaceholder(value: string, placeholder: string) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }

  function getKeysToHandle() {
    const uniqueMasks = getUniqueMasks()

    // Return the only one RegExp since all the inputs are using the same mask
    if (uniqueMasks.size === 1) {
      const pattern = uniqueMasks.values().next().value.replace(/\//g, '')
      return new RegExp(pattern)
    }

    // If there are multiple types of masks used, then map the maps to an object based on input ids
    // So that useHandleCursorPosition can do a per character test to see if the pressed key should be handeled or not
    return steps.reduce(
      (keys, { id, mask }) => {
        keys[`${id}__input`] = mask

        return keys
      },
      {} as Record<`${T}__input`, RegExp[]>
    )
  }

  function getUniqueMasks() {
    const masks = new Set()

    steps.forEach((step) => {
      step.mask.forEach((pattern) => masks.add(String(pattern)))
    })

    return masks
  }
}

export default SteppedMask
