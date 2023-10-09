import { Fragment, MutableRefObject, useRef, useState } from 'react'
import Input from '../Input'

import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'
import classnames from 'classnames'

type SteppedMaskInput = {
  id: string
  mask: RegExp[]
  label: string
  placeholderCharacter: string
  delimiter?: string
}

type SteppedMaskProps = {
  steps: Array<SteppedMaskInput>
}

function SteppedMask({ steps }: SteppedMaskProps) {
  const [values, setValues] = useState<Record<string, string>>({})

  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <Input
      className="dnb-input-masked__stepped-mask"
      input_element={steps.map(
        ({ id, label, mask, placeholderCharacter, delimiter }, i) => (
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
                setValues((currentValues) => ({
                  ...currentValues,
                  [id]: removePlaceholder(
                    event.target.value,
                    placeholderCharacter
                  ),
                }))
              }
              ref={getInputRef}
            />
            <label hidden>{label}</label>
            {delimiter && (
              <span
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
