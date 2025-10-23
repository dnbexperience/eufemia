import * as React from 'react'
import { useRef, useCallback } from 'react'
import { useMaskito } from '@maskito/react'
import type { Mask, MaskFunction, Pipe } from './text-mask/types'
import { MaskitoConverter } from './MaskitoConverter'

export type MaskitoTextMaskMask =
  | Mask
  | MaskFunction
  | boolean
  | { mask?: Mask | MaskFunction; pipe?: Pipe }
export type MaskitoTextMaskInputElement = React.ReactElement
export type MaskitoTextMaskValue = string | number
export interface MaskitoTextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
  mask: MaskitoTextMaskMask
  inputRef?: React.RefObject<HTMLInputElement>
  inputElement?: MaskitoTextMaskInputElement
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  guide?: boolean
  value?: MaskitoTextMaskValue
  pipe?: Pipe
  placeholderChar?: string
  keepCharPositions?: boolean
  showMask?: boolean
}

export default function MaskitoTextMask({
  mask,
  inputRef,
  inputElement,
  onChange,
  guide = true,
  value,
  pipe,
  placeholderChar = '_',
  keepCharPositions = false,
  showMask = false,
  ...props
}: MaskitoTextMaskProps): JSX.Element {
  const internalRef = useRef<HTMLInputElement>(null)
  const ref = (inputRef ||
    internalRef) as React.MutableRefObject<HTMLInputElement | null>

  const maskitoOptions = MaskitoConverter.convertToMaskitoOptions(
    mask,
    pipe,
    guide,
    placeholderChar,
    keepCharPositions,
    showMask
  )

  const maskedRef = useMaskito({ options: maskitoOptions })

  // Handle ref merging
  const handleRef = useCallback(
    (element: HTMLInputElement | null) => {
      // Call Maskito ref
      maskedRef(element)

      // Call original ref
      if (ref) {
        ref.current = element
      }
    },
    [maskedRef, ref]
  )

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onChange) {
        onChange(event)
      }
    },
    [onChange]
  )

  const inputProps = {
    ...props,
    ref: handleRef,
    onChange: handleChange,
    value: value || '',
  }

  return inputElement ? (
    React.cloneElement(inputElement, inputProps)
  ) : (
    <input {...inputProps} />
  )
}
