import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
} from 'react'
import Input from '../Input'
import type { InputProps } from '../Input'
import TextMask from './TextMask'
import type { MaskitoOptions } from '@maskito/core'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'
import FormLabel from '../FormLabel'
import { SpacingProps } from '../space/types'
import { createSpacingClasses } from '../space/SpacingHelper'
import { FormStatusState, FormStatusText } from '../FormStatus'
import { useMultiInputValue } from './hooks/useMultiInputValues'
import useId from '../../shared/helpers/useId'
import { IS_ANDROID } from '../../shared/helpers'

export type MultiInputMaskInput<T extends string> = {
  /**
   * Defines the id for the input. This id is also used to map the input value to the correct property on the objects used for `values` and `onChange` parameters.
   */
  id: T
  /**
   * Label used by the input. The label itself is hidden, but required to uphold accessibility standards for screen readers.
   */
  label: React.ReactNode
  /**
   * Each RegExp item in the array defines what the mask should be for each subsequent character in the input. The length sets the size of the input, so an array of two items would produce an input of two characters
   */
  mask: RegExp[]
} & Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'ref'>

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
   * Defines the delimiter used to separate the inputs inside the component.
   */
  delimiter?: string
  /**
   * Runs when the input value changes. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
   */
  onChange?: (values: MultiInputMaskValue<T>) => void
  /**
   * Runs when the input gains focus. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
   */
  onFocus?: (values: MultiInputMaskValue<T>) => void
  /**
   * Runs when the input loses focus. Has an object parameter with keys matching the id's defined in `inputs`. i.e. `{month: string, year: string}`
   */
  onBlur?: (values: MultiInputMaskValue<T>) => void
  /**
   * Text with a status message. The style defaults to an error message. You can use `true` to only get the status color, without a message.
   */
  status?: FormStatusText
  /**
   * Defines the state of the status. Currently, there are two statuses `[error, info]`. Defaults to `error`.
   */
  statusState?: FormStatusState
  /**
   * Set it to `true` in order to stretch the input to the available space. Defaults to false.
   */
  stretch?: boolean
  /**
   * Text describing the content of the input more than the label. you can also send in a React component, so it gets wrapped inside the Input component.
   */
  suffix?: React.ReactNode
} & Omit<
  React.HTMLProps<HTMLInputElement>,
  | 'onChange'
  | 'onFocus'
  | 'onBlur'
  | 'ref'
  | 'value'
  | 'label'
  | 'placeholder'
  | 'size'
> &
  SpacingProps &
  Pick<InputProps, 'size'>

function MultiInputMask<T extends string>({
  id,
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
  stretch,
  inputMode,
  suffix,
  onBlur,
  onFocus,
  ...props
}: MultiInputMaskProps<T>) {
  id = useId(id)

  const [values, onChange] = useMultiInputValue({
    inputs,
    defaultValues,
    callback: onChangeExternal,
  })

  const inputRefs = useRef<Array<MutableRefObject<HTMLInputElement>>>([])
  const areInputsInFocus = useRef<boolean>(false)

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
      <Input
        {...props}
        id={id}
        label={
          label && (
            <FormLabel
              element="legend"
              forId={`${id}-${inputs[0]?.id}`}
              disabled={disabled}
              labelDirection={labelDirection}
              onClick={onLegendClick}
            >
              {label}
            </FormLabel>
          )
        }
        className={classnames('dnb-multi-input-mask', className)}
        labelDirection={labelDirection}
        disabled={disabled}
        status={status}
        statusState={statusState}
        suffix={suffix}
        stretch={stretch}
        inputElement={inputs.map(({ id: inputId, ...rest }, index) => {
          return (
            <MultiInputMaskInput
              key={inputId}
              id={id}
              inputId={inputId}
              delimiter={
                index !== inputs.length - 1 ? delimiter : undefined
              }
              disabled={disabled}
              inputMode={inputMode}
              onKeyDown={onKeyDown}
              onChange={onChange}
              onFocus={() => {
                if (!areInputsInFocus.current) {
                  onFocus?.(values)
                }

                areInputsInFocus.current = true
              }}
              onBlur={(e) => {
                if (!e.relatedTarget?.id?.includes(id)) {
                  onBlur?.(values)
                  areInputsInFocus.current = false
                }
              }}
              getInputRef={getInputRef}
              {...rest}
              value={values[inputId]}
            />
          )
        })}
      />
    </WrapperElement>
  )

  // Event handlers
  function onLegendClick() {
    if (disabled) {
      return
    }

    const byRef = inputRefs.current[0]?.current
    const byId = document.getElementById(
      `${id}-${inputs[0]?.id}`
    ) as HTMLInputElement | null
    const firstInput = byRef || byId

    if (!firstInput) return

    firstInput.focus()
    firstInput.setSelectionRange(0, 0)
  }

  // Utilities
  function getInputRef(ref?: {
    inputRef?: MutableRefObject<HTMLInputElement>
  }) {
    const inputRef = ref?.inputRef

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }

    return inputRef
  }

  function getKeysToHandle() {
    const uniqueMasks = getUniqueMasks()

    // Return the only one RegExp since all the inputs are using the same mask
    if (uniqueMasks.size === 1) {
      const pattern = uniqueMasks.values().next().value.replace(/\//g, '')
      return new RegExp(pattern)
    }

    // If there are multiple types of masks used, then map the maps to an object based on input ids
    // So that useHandleCursorPosition can do a per character test to see if the pressed key should be handled or not
    return inputs.reduce(
      (keys, { id, mask }) => {
        keys[id] = mask

        return keys
      },
      {} as Record<T, RegExp[]>
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
    inputId: MultiInputMaskInput<T>['id']
    label: MultiInputMaskInput<T>['label']
    value: string
    mask: MultiInputMaskInput<T>['mask']
    delimiter?: MultiInputMaskProps<T>['delimiter']
    disabled: boolean
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
    onChange: (id: string, value: string) => void
    getInputRef: () => MutableRefObject<HTMLInputElement>
  }

function MultiInputMaskInput<T extends string>({
  id,
  inputId,
  label,
  value,
  mask,
  delimiter,
  disabled,
  getInputRef,
  onKeyDown,
  onChange,
  onBlur,
  onFocus,
  ...attributes
}: MultiInputMaskInputProps<T>) {
  const shouldHighlight = !disabled && /\w+/.test(value)
  const { className: extClassName, ...restAttributes } = attributes as any

  // Prepare ghost placeholder and enhancer (optional)
  const placeholderText = String((attributes as any).placeholder || '')
  const ghost = useMemo(() => {
    if (!placeholderText) return ''
    // Avoid using a ghost that equals an allowed literal char (prevents change events)
    if (
      placeholderText.length === 1 &&
      mask[0] instanceof RegExp &&
      (mask[0] as RegExp).test(placeholderText[0])
    ) {
      return ''
    }
    if (placeholderText.length >= mask.length) return placeholderText
    const ch = placeholderText[0]
    return ch ? ch.repeat(mask.length) : ''
  }, [placeholderText, mask])

  const stripValue = useCallback(
    (display: string) => {
      // Extract only characters matching per-position mask
      const chars = Array.from(display)
      const out: string[] = []
      for (let i = 0; i < Math.min(chars.length, mask.length); i++) {
        const c = chars[i]
        const m = mask[i]
        if (m instanceof RegExp && m.test(c)) {
          out.push(c)
        }
      }
      return out.join('')
    },
    [mask]
  )

  const optionsEnhancer = useCallback(
    (opts: MaskitoOptions | null): MaskitoOptions | null => {
      if (!opts || !ghost) return opts
      const post = (elementState: {
        value: string
        selection: readonly [number, number]
      }) => {
        const v = elementState.value || ''
        const padded = (v + ghost.slice(v.length)).slice(0, mask.length)
        return { ...elementState, value: padded }
      }
      return {
        ...opts,
        postprocessors: [...(opts.postprocessors || []), post],
      }
    },
    [ghost, mask.length]
  )

  return (
    <>
      <TextMask
        id={`${id}-${inputId}`}
        data-mask-id={inputId}
        className={classnames(
          'dnb-input__input',
          'dnb-multi-input-mask__input',
          shouldHighlight && 'dnb-multi-input-mask__input--highlight',
          extClassName
        )}
        disabled={disabled}
        size={mask.length}
        mask={mask}
        value={value ?? ''}
        showMask={true}
        optionsEnhancer={optionsEnhancer}
        ghostPlaceholder={ghost || undefined}
        stripValue={stripValue}
        aria-label={label}
        inputRef={getInputRef()}
        onKeyDown={onKeyDown}
        onInput={(event) => {
          const target = event.currentTarget as HTMLInputElement
          // Add support for "backspace" on Android virtual keyboard
          if (
            IS_ANDROID &&
            (event as any).nativeEvent?.inputType ===
              'deleteContentBackward' &&
            target.selectionStart === 0 &&
            target.selectionEnd === 0
          ) {
            onKeyDown({
              ...(event as any),
              key: 'Backspace',
              target,
            } as any)
          }
        }}
        onBlur={onBlur}
        onFocus={({ target, ...event }) => {
          target.focus()
          // When input is empty on focus, always place caret at the start (position 0)
          // Use same deferred approach as on iOS focus handling for reliability
          window.requestAnimationFrame(() => {
            const defer = (ms: number) =>
              setTimeout(() => {
                try {
                  // Treat ghost-only value as empty using stripValue
                  const typedLen = stripValue(target.value || '').length
                  if (typedLen === 0) {
                    target.setSelectionRange(0, 0)
                  }
                } catch {}
              }, ms)

            let isiOS = false
            try {
              // Lazy import to avoid circular deps in tests
              // eslint-disable-next-line @typescript-eslint/no-var-requires
              const helpers = require('../../shared/helpers')
              isiOS = !!helpers?.IS_IOS
            } catch {}

            defer(isiOS ? 10 : 1)
          })

          if (onFocus) {
            onFocus({ target, ...event })
          }
        }}
        onMouseUp={undefined}
        onChange={(event) => {
          onChange(inputId, event.target.value)
        }}
        {...restAttributes}
      />
      {delimiter && (
        <span
          aria-hidden
          className={classnames(
            'dnb-multi-input-mask__delimiter',
            shouldHighlight && 'dnb-multi-input-mask__delimiter--highlight'
          )}
        >
          {delimiter}
        </span>
      )}
    </>
  )
}

export default MultiInputMask

MultiInputMask._formElement = true
MultiInputMask._supportsSpacingProps = true
