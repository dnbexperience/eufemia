import { useEffect, useRef } from 'react'
import StringComponent, { Props as StringComponentProps } from './String'

type ExpiryPlaceholderType = 'dashes' | 'spaces' | 'letters'

export type ExpiryValue = {
  month: string
  year: string
  raw: string
  formatted: string
}

type ExpiryProps = Omit<
  StringComponentProps,
  'placeholder' | 'onChange'
> & {
  placeholder?: ExpiryPlaceholderType
  onChange?: ({ month, year, raw, formatted }: ExpiryValue) => void
}

const placeholders: Record<ExpiryPlaceholderType, string> = {
  dashes: '-- / --',
  spaces: '   /   ',
  letters: 'mm / yy',
}

function Expiry({
  placeholder = 'dashes',
  keep_placeholder = true,
  ...props
}: ExpiryProps) {
  const inputRef = useRef(null)

  // Probably better to replace this with an onKey prop for StringComponent?
  useEffect(() => {
    const inputElement = inputRef.current as HTMLInputElement

    if (!inputElement) {
      return
    }

    inputElement.addEventListener('keydown', onTab)

    return () => {
      inputElement.removeEventListener('keydown', onTab)
    }
  }, [])

  function onChange(value: string) {
    if (value.length < 4) return

    const month = `${value.charAt(0)}${value.charAt(1)}`
    const year = `${value.charAt(2)}${value.charAt(3)}`
    const formatted = `${month} / ${year}`

    if (props?.onChange) {
      props.onChange({ month, year, raw: value, formatted })
    }
  }

  function onTab(event: KeyboardEvent) {
    if (event.key !== 'Tab') {
      return
    }

    event.preventDefault()

    const input = event.target as HTMLInputElement

    const { start, end } = getSelectionRange(
      input.value,
      input.selectionStart,
      input.selectionEnd,
      event.shiftKey
    )

    input.setSelectionRange(start, end)
  }

  function getSelectionRange(
    value: string,
    selectionStart: number,
    selectionEnd: number,
    shiftKey: boolean
  ): { start: number; end: number } {
    if (shiftKey) {
      return { start: selectionStart - 1, end: selectionStart }
    }

    if (selectionStart === 0 && selectionEnd === 0) {
      return { start: selectionStart, end: selectionStart + 1 }
    }

    return { start: selectionStart + 1, end: selectionStart + 2 }
  }

  return (
    <StringComponent
      {...props}
      width="stretch"
      mask={[/[0-1]/, /[1-2]/, ' ', '/', ' ', /\d/, /\d/]}
      placeholder={placeholders[placeholder]}
      keep_placeholder={keep_placeholder}
      onChange={onChange}
      innerRef={inputRef}
    />
  )
}

export default Expiry
