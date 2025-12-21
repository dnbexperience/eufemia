import React, {
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
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
import { isiOS, isAndroid } from '../../shared/helpers'

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
   * Controls how Maskito handles typing over existing characters.
   * `shift` (default) moves to the next slot, while `replace` keeps the caret in place while overwriting.
   */
  overwriteMode?: MaskitoOptions['overwriteMode']
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
  /**
   * Refers to the scope element that contains the input fields.
   */
  scopeRef?: MutableRefObject<HTMLElement | null>
  /**
   * Optional enhancer applied to Maskito options before they reach TextMask.
   */
  optionsEnhancer?: (
    options: MaskitoOptions | null
  ) => MaskitoOptions | null
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
  Pick<InputProps, 'size' | 'omitInputShellClass'>

function MultiInputMask<T extends string>(props: MultiInputMaskProps<T>) {
  const fallbackId = useId(props?.id)
  const fallbackFieldsetRef = useRef<HTMLElement | null>(null)
  const {
    id = fallbackId,
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
    omitInputShellClass,
    scopeRef = fallbackFieldsetRef,
    size,
    suffix,
    onBlur,
    onFocus,
    overwriteMode = 'shift',
    optionsEnhancer,
    ...rest
  } = props

  const [values, onChangeBase] = useMultiInputValue({
    inputs,
    defaultValues,
  })

  const inputRefs = useRef<Array<MutableRefObject<HTMLInputElement>>>([])
  // Keep a ref of the latest values to ensure blur handlers see up-to-date state
  const valuesRef = useRef(values)
  valuesRef.current = values
  const areInputsInFocus = useRef<boolean>(false)

  // Event handlers
  const onLegendClick = useCallback(() => {
    if (disabled) {
      return
    }

    const byRef = inputRefs.current[0]?.current
    const byId = document.getElementById(
      `${id}-${inputs[0]?.id}`
    ) as HTMLInputElement | null
    const firstInput = byRef || byId

    if (!firstInput) {
      return
    }

    firstInput.focus()
    firstInput.setSelectionRange(0, 0)
  }, [disabled, id, inputs])

  // Utilities
  const getInputRef = useCallback(
    (ref?: { inputRef?: MutableRefObject<HTMLInputElement> }) => {
      const inputRef = ref?.inputRef

      if (inputRef && !inputRefs.current.includes(inputRef)) {
        inputRefs.current.push(inputRef)
      }

      return inputRef
    },
    []
  )

  const getUniqueMasks = useCallback(() => {
    const masks = new Set()

    inputs.forEach((input) => {
      input.mask.forEach((pattern) => masks.add(String(pattern)))
    })

    return masks
  }, [inputs])

  const getKeysToHandle = useCallback(() => {
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
  }, [getUniqueMasks, inputs])

  const { onKeyDown } = useHandleCursorPosition(
    getKeysToHandle(),
    scopeRef
  )

  const onChange = useCallback(
    (id: string, value: string) => {
      // Update local ref immediately to avoid stale reads during blur
      const updatedValues = {
        ...valuesRef.current,
        [id]: value,
      } as MultiInputMaskValue<T>
      valuesRef.current = updatedValues

      onChangeBase(updatedValues)

      // Call external onChange callback synchronously so parents relying on
      // immediate emissions (e.g., DatePicker tests) see the update without delays
      if (typeof onChangeExternal === 'function') {
        onChangeExternal(updatedValues)
      }
    },
    [onChangeBase, onChangeExternal]
  )

  const WrapperElement: 'fieldset' | 'div' = label ? 'fieldset' : 'div'

  return (
    <WrapperElement
      ref={(el: HTMLFieldSetElement | HTMLDivElement | null) => {
        if (!scopeRef.current) {
          scopeRef.current = el as HTMLElement | null
        }
      }}
      className={classnames(
        'dnb-multi-input-mask__fieldset',
        labelDirection === 'horizontal' &&
          'dnb-multi-input-mask__fieldset--horizontal',
        createSpacingClasses(rest)
      )}
    >
      <Input
        {...rest}
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
        omitInputShellClass={omitInputShellClass}
        size={size}
        labelDirection={labelDirection}
        disabled={disabled}
        status={status}
        statusState={statusState}
        suffix={suffix}
        stretch={stretch}
        inputElement={inputs.map(
          ({ id: inputId, onFocus: _a, onBlur: _b, ...cbRest }, index) => {
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
                overwriteMode={overwriteMode}
                optionsEnhancer={optionsEnhancer}
                onFocus={() => {
                  if (!areInputsInFocus.current) {
                    onFocus?.(valuesRef.current)
                  }

                  areInputsInFocus.current = true
                }}
                onBlur={(e) => {
                  if (!e.relatedTarget?.id?.includes(id)) {
                    // Defer to allow any pending masking/state updates to settle
                    const run = () => onBlur?.(valuesRef.current)
                    if (isiOS()) {
                      setTimeout(run, 10)
                    } else {
                      window.requestAnimationFrame(run)
                    }
                    areInputsInFocus.current = false
                  }
                }}
                getInputRef={getInputRef}
                {...cbRest}
                {...rest}
                value={values[inputId]}
              />
            )
          }
        )}
      />
    </WrapperElement>
  )
}

type MultiInputMaskInputProps<T extends string> = Omit<
  MultiInputMaskInput<T>,
  'onFocus' | 'onBlur'
> & {
  id: MultiInputMaskInput<T>['id']
  inputId: MultiInputMaskInput<T>['id']
  omitInputShellClass?: boolean
  label: MultiInputMaskInput<T>['label']
  value: string
  mask: MultiInputMaskInput<T>['mask']
  delimiter?: MultiInputMaskProps<T>['delimiter']
  disabled: boolean
  onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void
  onChange: (id: string, value: string) => void
  overwriteMode?: MaskitoOptions['overwriteMode']
  optionsEnhancer?: (
    options: MaskitoOptions | null
  ) => MaskitoOptions | null
  getInputRef: ({
    inputRef,
  }: {
    inputRef: MutableRefObject<HTMLInputElement>
  }) => void
  onFocus?: () => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
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
  onFocus: onInputFocus,
  overwriteMode,
  optionsEnhancer,
  ...attributes
}: MultiInputMaskInputProps<T>) {
  const inputRefObj = useRef<HTMLInputElement>(null)
  // Register ref with parent so group can read current values on blur
  useEffect(() => {
    getInputRef({ inputRef: inputRefObj })
  }, [getInputRef])
  const {
    className: extClassName,
    placeholder: placeholderProp,
    value: _ignoredValue,
    onFocus: _ignoredOnFocus,
    onBlur: _ignoredOnBlur,
    ...restAttributes
  } = attributes as React.HTMLProps<HTMLInputElement>

  // Prepare ghost placeholder and enhancer (optional)
  const placeholderText = String(placeholderProp || '')
  const ghost = useMemo(() => {
    if (!placeholderText) {
      return ''
    }
    // Avoid using a ghost that equals an allowed literal char (prevents change events)
    if (
      placeholderText.length === 1 &&
      mask[0] instanceof RegExp &&
      mask[0].test(placeholderText[0])
    ) {
      return ''
    }
    if (placeholderText.length >= mask.length) {
      return placeholderText
    }
    const ch = placeholderText[0]
    return ch ? ch.repeat(mask.length) : ''
  }, [placeholderText, mask])

  const stripValue = useCallback(
    (display: string | undefined) => {
      // Extract only characters matching per-position mask
      const chars = Array.from(display ?? '')
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

  const [initialSlots] = useState(() =>
    createSlotsFromValue(value, mask.length)
  )
  const slotValuesRef = useRef<string[]>(initialSlots)
  const lastKeydownHandledRef = useRef(false)

  useLayoutEffect(() => {
    const current = collectValueFromSlots(slotValuesRef.current)
    if (
      slotValuesRef.current.length !== mask.length ||
      current !== value
    ) {
      slotValuesRef.current = createSlotsFromValue(value, mask.length)
    }
  }, [value, mask.length])

  // Check if there's actual typed content (not just ghost placeholders)
  const shouldHighlight = !disabled && stripValue(value).length > 0

  const ghostOptionsEnhancer = useCallback(
    (opts: MaskitoOptions | null): MaskitoOptions | null => {
      if (!opts || !ghost) {
        return opts
      }
      const post = (elementState: {
        value: string
        selection: readonly [number, number]
      }) => {
        const composed = composeDisplayValue({
          ghost,
          maskLength: mask.length,
          slots: slotValuesRef.current,
        })
        return { ...elementState, value: composed }
      }
      return {
        ...opts,
        postprocessors: [...(opts.postprocessors || []), post],
      }
    },
    [ghost, mask.length]
  )

  const mergedOptionsEnhancer = useCallback(
    (opts: MaskitoOptions | null) => {
      const withGhost = ghostOptionsEnhancer(opts)
      if (typeof optionsEnhancer === 'function') {
        return optionsEnhancer(withGhost)
      }
      return withGhost
    },
    [ghostOptionsEnhancer, optionsEnhancer]
  )

  return (
    <>
      <TextMask
        id={`${id}-${inputId}`}
        data-mask-id={inputId}
        placeholder={placeholderProp}
        className={classnames(
          'dnb-input__input',
          'dnb-multi-input-mask__input',
          shouldHighlight && 'dnb-multi-input-mask__input--highlight',
          extClassName
        )}
        disabled={disabled}
        size={mask.length}
        mask={mask}
        value={value}
        showMask={true}
        optionsEnhancer={mergedOptionsEnhancer}
        ghostPlaceholder={ghost || undefined}
        overwriteMode={overwriteMode}
        stripValue={stripValue}
        aria-label={label}
        inputRef={inputRefObj}
        onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
          onKeyDown(event)
          if (event.defaultPrevented) {
            lastKeydownHandledRef.current = false
            return
          }
          if (
            updateSlotsFromKeyEvent({
              event,
              mask,
              slotsRef: slotValuesRef,
            })
          ) {
            lastKeydownHandledRef.current = true
          } else {
            lastKeydownHandledRef.current = false
          }
        }}
        onInput={(event: React.FormEvent<HTMLInputElement>) => {
          const target = event.currentTarget
          // Add support for "backspace" on Android virtual keyboard
          const nativeEvt = event.nativeEvent as InputEvent &
            Partial<{ inputType: string }>
          const inputType = nativeEvt?.inputType
          if (
            isAndroid() &&
            inputType === 'deleteContentBackward' &&
            target.selectionStart === 0 &&
            target.selectionEnd === 0
          ) {
            type SyntheticKeyDown = {
              key: string
              target: HTMLInputElement
              currentTarget: HTMLInputElement
              defaultPrevented: boolean
              preventDefault: () => void
            }
            const synthetic: SyntheticKeyDown = {
              key: 'Backspace',
              target,
              currentTarget: target,
              defaultPrevented: false,
              preventDefault() {
                this.defaultPrevented = true
              },
            }
            onKeyDown(
              synthetic as unknown as React.KeyboardEvent<HTMLInputElement>
            )
          }

          syncSlotsOnInput({
            handledByKeyDown: lastKeydownHandledRef.current,
            inputType: nativeEvt?.inputType,
            maskLength: mask.length,
            slotsRef: slotValuesRef,
            stripValue,
            target,
          })
          lastKeydownHandledRef.current = false
        }}
        onBlur={onBlur}
        onFocus={({ target }) => {
          // Select the entire input on focus, but only when there is content
          try {
            target.focus()
            if ((target as HTMLInputElement).value.length > 0) {
              window.requestAnimationFrame(() => {
                const start = 0
                const end = (target as HTMLInputElement).value.length
                ;(target as HTMLInputElement).setSelectionRange(start, end)
              })
            }
          } catch {
            // ignore
          }
          onInputFocus?.()
        }}
        onMouseUp={undefined}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
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

function createSlotsFromValue(value: string, size: number) {
  const slots = Array.from({ length: size }, () => '')
  const chars = Array.from(value || '')
  for (let i = 0; i < size && i < chars.length; i++) {
    slots[i] = chars[i]
  }
  return slots
}

function collectValueFromSlots(slots: string[]) {
  return slots.filter(Boolean).join('')
}

function composeDisplayValue({
  slots,
  ghost,
  maskLength,
}: {
  slots: string[]
  ghost: string
  maskLength: number
}) {
  if (!ghost) {
    return slots.slice(0, maskLength).join('')
  }
  return slots
    .slice(0, maskLength)
    .map((char, index) => {
      if (char) {
        return char
      }
      const ghostIndex = Math.min(index, ghost.length - 1)
      return ghost[ghostIndex] ?? ''
    })
    .join('')
}

function ensureSlotArray(slots: string[], size: number) {
  if (slots.length === size) {
    return slots
  }
  if (slots.length < size) {
    while (slots.length < size) {
      slots.push('')
    }
    return slots
  }
  slots.length = size
  return slots
}

function clearRange(slots: string[], start: number, end: number) {
  if (start > end) {
    return clearRange(slots, end, start)
  }
  let changed = false
  for (let i = start; i < end && i < slots.length; i++) {
    if (slots[i]) {
      slots[i] = ''
      changed = true
    }
  }
  return changed
}

function clearForBackspace(slots: string[], start: number, end: number) {
  if (start === 0 && end === 0) {
    return false
  }
  if (start !== end) {
    return clearRange(slots, start, end)
  }
  const index = start - 1
  if (index < 0 || index >= slots.length) {
    return false
  }
  if (!slots[index]) {
    return false
  }
  slots[index] = ''
  return true
}

function clearForDelete(
  slots: string[],
  start: number,
  end: number,
  size: number
) {
  if (start !== end) {
    return clearRange(slots, start, end)
  }
  if (start < 0 || start >= size) {
    return false
  }
  if (!slots[start]) {
    return false
  }
  slots[start] = ''
  return true
}

function insertChar(
  slots: string[],
  char: string,
  start: number,
  end: number,
  size: number
) {
  if (start >= size) {
    return false
  }
  if (start !== end) {
    clearRange(slots, start, end)
  }
  slots[start] = char
  return true
}

function updateSlotsFromKeyEvent({
  event,
  slotsRef,
  mask,
}: {
  event: React.KeyboardEvent<HTMLInputElement>
  slotsRef: React.MutableRefObject<string[]>
  mask: RegExp[]
}) {
  if (event.altKey || event.metaKey || event.ctrlKey) {
    return false
  }

  const key = event.key
  const target = event.currentTarget
  const start = target.selectionStart ?? 0
  const end = target.selectionEnd ?? start
  const slots = ensureSlotArray(slotsRef.current, mask.length)

  if (key === 'Backspace') {
    return clearForBackspace(slots, start, end)
  }

  if (key === 'Delete') {
    return clearForDelete(slots, start, end, mask.length)
  }

  if (key.length === 1) {
    const index = Math.min(start, mask.length - 1)
    const token = mask[index]
    if (!(token instanceof RegExp) || !token.test(key)) {
      return false
    }
    return insertChar(slots, key, start, end, mask.length)
  }

  return false
}

function syncSlotsOnInput({
  handledByKeyDown,
  inputType,
  maskLength,
  slotsRef,
  stripValue,
  target,
}: {
  handledByKeyDown: boolean
  inputType?: string
  maskLength: number
  slotsRef: React.MutableRefObject<string[]>
  stripValue: (display: string) => string
  target: HTMLInputElement
}) {
  const controlledTypes = new Set([
    'insertText',
    'insertReplacementText',
    'deleteContentBackward',
    'deleteContentForward',
  ])
  const type = inputType || ''
  if (handledByKeyDown && (type === '' || controlledTypes.has(type))) {
    return
  }
  const stripped = stripValue(target.value)
  slotsRef.current = createSlotsFromValue(stripped, maskLength)
}
