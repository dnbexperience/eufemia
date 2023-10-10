import { Fragment, MutableRefObject, useRef } from 'react'
import Input from '../Input'

import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'
import FormLabel from '../FormLabel'

type SteppedMaskInput<T extends string> = {
  id: T
  label: string
  mask: RegExp[]
  placeholderCharacter: string
}

export type SteppedMaskValue<T extends string> = {
  // eslint-disable-next-line no-unused-vars
  [K in T]: string
}

type SteppedMaskProps<T extends string> = {
  label: string
  steps: SteppedMaskInput<T>[]
  values: SteppedMaskValue<T>
  delimiter?: string
  onChange?: (values: SteppedMaskValue<T>) => void
}

function SteppedMask<T extends string>({
  label,
  steps,
  values,
  onChange,
  delimiter,
}: SteppedMaskProps<T>) {
  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <fieldset className="dnb-stepped-mask__fieldset">
      <FormLabel
        className="dnb-stepped-mask__legend"
        element="legend"
        onClick={onLegendClick}
      >
        {label}
      </FormLabel>
      <Input
        className="dnb-stepped-mask"
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
                mask={mask}
                value={values[id]}
                onKeyDown={handleKeydown}
                placeholderChar={placeholderCharacter}
                guide={true}
                showMask={true}
                keepCharPositions={false} // so we can overwrite next value, if it already exists
                autoComplete="off"
                autoCapitalize="none"
                spellCheck={false}
                autoCorrect="off"
                size={mask.length}
                onChange={(event) =>
                  onChange({
                    ...values,
                    [id]: removePlaceholder(
                      event.target.value,
                      placeholderCharacter
                    ),
                  })
                }
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
    </fieldset>
  )

  function onLegendClick() {
    const firstInput = inputRefs.current[0].current

    firstInput.focus()
    firstInput.setSelectionRange(0, 0)
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
}

export default SteppedMask
