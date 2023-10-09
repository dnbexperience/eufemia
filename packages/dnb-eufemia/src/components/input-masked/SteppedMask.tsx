import { Fragment, MutableRefObject, useRef } from 'react'
import Input from '../Input'
import type { InputMaskedSteppedMasked } from './InputMasked'
import TextMask from './TextMask'
import useHandleCursorPosition from './hooks/useHandleCursorPosition'

type SteppedMaskProps = {
  steps: InputMaskedSteppedMasked
}

function SteppedMask({ steps }: SteppedMaskProps) {
  const inputRefs = useRef<MutableRefObject<HTMLInputElement>[]>([])

  const { handleKeydown } = useHandleCursorPosition(inputRefs.current)

  return (
    <Input
      input_element={steps.map(
        ({ id, label, mask, placeholderCharacter, delimiter }, i) => (
          <Fragment key={`${i}-${id}-${label}`}>
            <TextMask
              id={id}
              mask={mask}
              placeholderChar={placeholderCharacter}
              guide={true}
              showMask={true}
              keepCharPositions={false} // so we can overwrite next value, if it already exists
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              autoCorrect="off"
              size={2}
              ref={(ref) => inputRefs.current.push(ref.inputRef)}
              onKeyDown={handleKeydown}
            />
            <label>{label}</label>
            {i !== steps.length - 1 && delimiter && (
              <span>{delimiter}</span>
            )}
          </Fragment>
        )
      )}
    />
  )
}

export default SteppedMask
