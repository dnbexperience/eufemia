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
  id: T
  label: string
  mask: RegExp[]
  placeholderCharacter: string
}

export type SteppedMaskValue<T extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]: string
}

export type SteppedMaskProps<T extends string> = {
  label?: string
  steps: SteppedMaskInput<T>[]
  values?: SteppedMaskValue<T>
  delimiter?: string
  onChange?: (values: SteppedMaskValue<T>) => void
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  status_state?: FormStatusState
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref' | 'value'> &
  SpacingProps

function SteppedMask<T extends string>({
  label,
  steps,
  delimiter,
  onChange: onChangeExternal,
  values: defaultValues = {} as SteppedMaskValue<T>,
  disabled,
  ...props
}: SteppedMaskProps<T>) {
  const [values, setValues] = useState<SteppedMaskValue<T>>(defaultValues)

  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])
  const masks = new RegExp(`(${getUniqueMasks().join('|')})`)
  const WrapperElement = label ? 'fieldset' : 'div'

  const { handleKeydown } = useHandleCursorPosition(
    inputRefs.current,
    masks
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
        >
          {label}
        </FormLabel>
      )}
      <Input
        {...restOfProps}
        className={classnames('dnb-stepped-mask', className)}
        disabled={disabled}
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
  function getInputRef(ref: any) {
    const inputRef = ref?.inputRef

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }
  }

  function removePlaceholder(value: string, placeholder: string) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }

  function getUniqueMasks() {
    return (
      steps
        // Merge and flatten mask arrays from steps
        .reduce((masks, { mask }) => {
          // Convert to string to be able to filter out unique patterns later
          const patterns = mask.map((pattern) =>
            String(pattern).replace(/\//gm, '')
          )

          return [...masks, ...patterns]
        }, [] as string[])
        // Filter out unique patterns
        .filter((pattern, index, arr) => arr.indexOf(pattern) === index)
    )
  }
}

export default SteppedMask
