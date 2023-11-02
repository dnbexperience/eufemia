import React, { Fragment, MutableRefObject, useRef } from 'react'
import Input from '../Input'
import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'
import FormLabel from '../FormLabel'
import { SpacingProps } from '../space/types'
import { createSpacingClasses } from '../space/SpacingHelper'
import { FormStatusState, FormStatusText } from '../FormStatus'
import { useMultiInputValue } from './hooks/useMultiInputValues'

export type MultiInputMaskInput<T extends string> = {
  /**
   * Defines the id for the input. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` paramaters.
   */
  id: T
  /**
   * Label used by the input. The label itself is hidden, but required to uphold accesability standards for screen readers.
   */
  label: React.ReactNode
  /**
   * Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The length sets the size of the input, so an array of two items would produce an input of two characters
   */
  mask: RegExp[]
  /**
   * Sets the placeholder character used for the input.
   */
  placeholderCharacter: string
}

export type MultiInputMaskValue<T extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]: string
}

export type MultiInputMaskProps<T extends string> = {
  /**
   * The label describing the group of inputs inside the components.
   */
  label?: React.ReactNode
  /**
   * Use to change the label layout direction. Defaults to `horizontal`.
   */
  labelDirection?: 'vertical' | 'horizontal'
  /**
   * Used to define the different inputs representing the inputs in the component. The id's defined here is used to map input value to correct property in `values` parameters used in `onChange`
   */
  inputs: MultiInputMaskInput<T>[]
  /**
   * Values used for the inputs inside the component. Expects an object with keys matching the id's defined in `inputs`
   */
  values?: MultiInputMaskValue<T>
  /**
   * Defines the delimiter used to seperate the inputs inside the component.
   */
  delimiter?: string
  /**
   * Runs when the input value changes. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
   */
  onChange?: (values: MultiInputMaskValue<T>) => void
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

function MultiInputMask<T extends string>({
  label,
  labelDirection = 'horizontal',
  inputs,
  delimiter,
  onChange: onChangeExternal,
  disabled,
  status,
  statusState,
  values: defaultValues,
  className,
  ...props
}: MultiInputMaskProps<T>) {
  const [values, onChange] = useMultiInputValue({
    inputs,
    defaultValues,
    callback: onChangeExternal,
  })

  const inputRefs = useRef<Array<MutableRefObject<HTMLInputElement>>>([])

  const { onKeyDown } = useHandleCursorPosition(
    inputRefs.current,
    getKeysToHandle()
  )

  const WrapperElement = label ? 'fieldset' : 'div'

  return (
    <WrapperElement
      className={classnames(
        'dnb-multi-input-mask__fieldset',
        labelDirection === 'horizontal' &&
          'dnb-multi-input-mask__fieldset--horizontal',
        createSpacingClasses(props)
      )}
    >
      {label && (
        <FormLabel
          className={classnames(
            'dnb-multi-input-mask__legend',
            labelDirection === 'horizontal' &&
              'dnb-multi-input-mask__legend--horizontal'
          )}
          element="legend"
          onClick={onLegendClick}
          disabled={disabled}
          vertical={labelDirection === 'vertical'}
        >
          {/* This <span/> wrapper is needed to make flexbox work with the legend element */}
          <span>{label}</span>
        </FormLabel>
      )}
      <Input
        {...props}
        className={classnames('dnb-multi-input-mask', className)}
        disabled={disabled}
        status={status}
        status_state={statusState}
        input_element={inputs.map((input, index) => (
          <Fragment key={input.id}>
            <MultiInputMaskInput
              {...input}
              value={values[input.id]}
              delimiter={
                index !== inputs.length - 1 ? delimiter : undefined
              }
              onKeyDown={onKeyDown}
              onChange={onChange}
              disabled={disabled}
              inputRef={getInputRef}
            />
          </Fragment>
        ))}
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

  // Utilites
  function getInputRef(ref: any) {
    const inputRef = ref?.inputRef

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }
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
    return inputs.reduce(
      (keys, { id, mask }) => {
        keys[`${id}__input`] = mask

        return keys
      },
      {} as Record<`${T}__input`, RegExp[]>
    )
  }

  function getUniqueMasks() {
    const masks = new Set()

    inputs.forEach((input) => {
      input.mask.forEach((pattern) => masks.add(String(pattern)))
    })

    return masks
  }
}

type MultiInputMaskInputProps<T extends string> =
  MultiInputMaskInput<T> & {
    id: MultiInputMaskInput<T>['id']
    label: MultiInputMaskInput<T>['label']
    value: string
    mask: MultiInputMaskInput<T>['mask']
    placeholderCharacter: MultiInputMaskInput<T>['placeholderCharacter']
    delimiter?: MultiInputMaskProps<T>['delimiter']
    disabled: boolean
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onChange: (
      id: string,
      placeholderCharacter: MultiInputMaskInput<T>['placeholderCharacter']
    ) => void
    inputRef: any
  }

function MultiInputMaskInput<T extends string>({
  id,
  label,
  value,
  mask,
  placeholderCharacter,
  delimiter,
  disabled,
  inputRef,
  onKeyDown,
  onChange,
}: MultiInputMaskInputProps<T>) {
  return (
    <>
      <TextMask
        id={`${id}__input`}
        className={classnames(
          'dnb-input__input',
          'dnb-multi-input-mask__input',
          value && 'dnb-multi-input-mask__input--highlight'
        )}
        disabled={disabled}
        size={mask.length}
        mask={mask}
        value={value ?? ''}
        placeholderChar={placeholderCharacter}
        guide={true}
        showMask={true}
        keepCharPositions={false} // so we can overwrite next value, if it already exists
        aria-labelledby={`${id}__label`}
        ref={inputRef}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onChange={(event) => {
          onChange(
            id,
            removePlaceholder(event.target.value, placeholderCharacter)
          )
        }}
      />
      <label id={`${id}__label`} htmlFor={`${id}__input`} hidden>
        {label}
      </label>
      {delimiter && (
        <span
          aria-hidden
          className={classnames(
            'dnb-multi-input-mask__delimiter',
            value && 'dnb-multi-input-mask__delimiter--highlight'
          )}
        >
          {delimiter}
        </span>
      )}
    </>
  )

  function removePlaceholder(value: string, placeholder: string) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }

  function onFocus({ target }: React.FocusEvent<HTMLInputElement>) {
    target.focus()
    target.select()
  }
}

export default MultiInputMask
