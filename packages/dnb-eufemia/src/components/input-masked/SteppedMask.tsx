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
  steps: SteppedMaskInput<T>[]
  values: SteppedMaskValue<T>
  delimiter?: string
  onChange?: (values: SteppedMaskValue<T>) => void
}

function SteppedMask<T extends string>({
  steps,
  values,
  onChange,
  delimiter,
}: SteppedMaskProps<T>) {
  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <fieldset className="dnb-input-masked__fieldset">
      <FormLabel element="legend">label</FormLabel>
      <Input
        className="dnb-input-masked__stepped-mask"
        input_element={steps.map(
          ({ id, label, mask, placeholderCharacter }, index) => (
            <Fragment key={id}>
              <TextMask
                id={`${id}__input`}
                className={classnames(
                  'dnb-input__input',
                  'dnb-input-masked__stepped-mask-input',
                  values[id] &&
                    'dnb-input-masked__stepped-mask-input--highlight'
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
                    'dnb-input-masked__stepped-mask-delimiter',
                    values[id] &&
                      'dnb-input-masked__stepped-mask-delimiter--highlight'
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

  function getInputRef(ref: any) {
    const inputRef = ref?.inputRef || undefined

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }
  }

  function removePlaceholder(value: string, placeholder: string) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }
}

export default SteppedMask
