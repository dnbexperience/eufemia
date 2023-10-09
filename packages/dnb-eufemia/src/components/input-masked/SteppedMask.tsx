import { Fragment, MutableRefObject, useRef } from 'react'
import Input from '../Input'

import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'

type SteppedMaskInput = {
  id: string
  label: string
  mask: RegExp[]
  placeholderCharacter: string
}

type SteppedMaskValue = Record<SteppedMaskInput['id'], string>

type SteppedMaskProps = {
  steps: Array<SteppedMaskInput>
  values: SteppedMaskValue
  delimiter?: string
  onChange?: (values: SteppedMaskValue) => void
}

function SteppedMask({
  steps,
  values,
  onChange,
  delimiter,
}: SteppedMaskProps) {
  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <Input
      className="dnb-input-masked__stepped-mask"
      input_element={steps.map(
        ({ id, label, mask, placeholderCharacter }, index) => (
          <Fragment key={id}>
            <TextMask
              id={id}
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
            />
            <label htmlFor={id} hidden>
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
