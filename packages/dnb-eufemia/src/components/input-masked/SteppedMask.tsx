import { Fragment, MutableRefObject, useRef, useState } from 'react'
import Input from '../Input'
import type { InputMaskedSteppedMasked } from './InputMasked'
import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'

type SteppedMaskProps = {
  steps: InputMaskedSteppedMasked
}

function SteppedMask({ steps }: SteppedMaskProps) {
  const [values, setValues] = useState<Record<string, string>>({})

  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <Input
      input_element={steps.map(
        ({ id, label, mask, placeholderCharacter, delimiter }, i) => (
          <Fragment key={`${i}-${id}-${label}`}>
            <TextMask
              id={id}
              className="dnb-input-masked__stepped-input dnb-input__input"
              mask={mask}
              placeholderChar={placeholderCharacter}
              guide={true}
              showMask={true}
              keepCharPositions={false} // so we can overwrite next value, if it already exists
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect="off"
              size={mask.length}
              ref={getInputRef}
              onKeyDown={handleKeydown}
              value={values[id]}
              onChange={(event) =>
                setValues((currentValues) => ({
                  ...currentValues,
                  [id]: removePlaceholder(
                    event.target.value,
                    placeholderCharacter
                  ),
                }))
              }
            />
            <label hidden>{label}</label>
            {delimiter && <span>{delimiter}</span>}
          </Fragment>
        )
      )}
    />
  )

  function getInputRef(ref) {
    const inputRef = ref?.inputRef || undefined

    if (inputRef && !inputRefs.current.includes(inputRef)) {
      inputRefs.current.push(inputRef)
    }
  }

  function removePlaceholder(value, placeholder) {
    return value.replace(RegExp(placeholder, 'gm'), '')
  }
}

export default SteppedMask
