import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react'
import createTextMaskInputElement, {
  type CreateTextMaskConfig,
  type TextMaskInputController,
} from './text-mask/createTextMaskInputElement'
import InputModeNumber from './text-mask/InputModeNumber'
import type { Mask, MaskFunction, Pipe } from './text-mask/types'

export type TextMaskMask =
  | Mask
  | MaskFunction
  | boolean
  | { mask?: Mask | MaskFunction; pipe?: Pipe }
export type TextMaskInputElement = React.ReactElement
export type TextMaskValue = string | number
export type TextMaskProps = {
  mask: TextMaskMask
  inputRef?: React.RefObject<HTMLInputElement>
  inputElement?: TextMaskInputElement
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  guide?: boolean
  value?: TextMaskValue
  pipe?: Pipe
  placeholderChar?: string
  keepCharPositions?: boolean
  showMask?: boolean
  ref?: React.Ref<TextMaskHandle>
} & Omit<React.HTMLProps<HTMLInputElement>, 'ref'>

export type TextMaskHandle = {
  inputRef: React.RefObject<HTMLInputElement>
}

export default function TextMask({
  inputElement = null,
  inputRef: externalInputRef = null,
  mask,
  guide = null,
  pipe = null,
  placeholderChar = null,
  keepCharPositions = null,
  value = null,
  onChange = null,
  showMask = null,
  ref,
  ...props
}: TextMaskProps): React.JSX.Element {
  const internalRef = useRef<HTMLInputElement>(null)
  const inputRefToUse = externalInputRef || internalRef

  const textMaskRef = useRef<TextMaskInputController | undefined>(
    undefined
  )
  const inputModeRef = useRef<InputModeNumber | undefined>(undefined)

  useImperativeHandle(
    ref,
    () => ({
      inputRef: inputRefToUse,
    }),
    [inputRefToUse]
  )

  const initTextMask = useCallback(() => {
    const inputEl = inputRefToUse.current

    textMaskRef.current = createTextMaskInputElement({
      mask,
      guide,
      pipe,
      placeholderChar,
      keepCharPositions,
      showMask,
      value,
      inputElement: inputEl,
      ...props,
    } as unknown as CreateTextMaskConfig)
    textMaskRef.current.update(value)

    const { inputMode } = props as { inputMode?: string }
    if (!inputMode && inputMode !== 'none') {
      if (!inputModeRef.current) {
        inputModeRef.current = new InputModeNumber()
      }
    }

    inputModeRef.current?.setElement(inputEl)
  }, [
    mask,
    guide,
    pipe,
    placeholderChar,
    keepCharPositions,
    showMask,
    value,
    inputRefToUse,
    props,
  ])

  useEffect(() => {
    initTextMask()
  }, [initTextMask])

  // Clean up InputModeNumber only on unmount,
  // matching the original componentWillUnmount behavior
  useEffect(() => {
    return () => {
      inputModeRef.current?.remove()
    }
  }, [])

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    textMaskRef.current?.update()

    if (typeof onChange === 'function') {
      return onChange(event)
    }
  }

  const params = {
    onChange: handleChange,
    ...props,
  }

  return inputElement ? (
    React.createElement(inputElement.type as React.ComponentType<any>, {
      ...(inputElement.props as Record<string, unknown>),
      ...params,
    })
  ) : (
    <input ref={inputRefToUse} {...params} />
  )
}
