import React from 'react'
import createTextMaskInputElement, {
  type CreateTextMaskConfig,
  type TextMaskInputController,
} from './text-mask/createTextMaskInputElement'
import InputModeNumber from './text-mask/InputModeNumber'
import { isNil } from './text-mask/utilities'
import type { Mask, MaskFunction, Pipe } from './text-mask/types'

export type TextMaskMask =
  | Mask
  | MaskFunction
  | boolean
  | { mask?: Mask | MaskFunction; pipe?: Pipe }
export type TextMaskInputElement = React.ReactElement
export type TextMaskValue = string | number
export interface TextMaskProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'ref'> {
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
}

const TextMask: React.FC<TextMaskProps> = (props) => {
  const {
    inputElement = null,
    inputRef: externalInputRef = null,
    onChange: externalOnChange = null,
    guide = null,
    value = null,
    pipe = null,
    placeholderChar = null,
    keepCharPositions: _keepCharPositions = null,
    showMask = null,
    mask,
    ...restProps
  } = props

  const internalInputRef = React.useRef<HTMLInputElement>(null)
  const inputRef = externalInputRef || internalInputRef
  const textMaskInputElementRef = React.useRef<TextMaskInputController>()
  const inputModeRef = React.useRef<InputModeNumber>()
  const prevPropsRef = React.useRef<TextMaskProps>()

  const initTextMask = React.useCallback(() => {
    const { inputMode } = props
    const inputElement = inputRef.current

    textMaskInputElementRef.current = createTextMaskInputElement({
      ...props,
      inputElement,
    } as unknown as CreateTextMaskConfig)
    textMaskInputElementRef.current.update(value)

    if (!inputMode && inputMode !== 'none') {
      if (!inputModeRef.current) {
        inputModeRef.current = new InputModeNumber()
      }
      inputModeRef.current.setElement(inputElement)
    }
  }, [props, value, inputRef])

  React.useEffect(() => {
    initTextMask()
  }, [initTextMask])

  React.useEffect(() => {
    return () => {
      inputModeRef.current?.remove()
    }
  }, [])

  React.useEffect(() => {
    if (!prevPropsRef.current) {
      prevPropsRef.current = props
      return
    }

    const prevProps = prevPropsRef.current

    // Getting props affecting value
    const settings = { guide, placeholderChar, showMask }

    // Сalculate that settings was changed:
    // - `pipe` converting to string, to compare function content
    // - `mask` converting to string, to compare values or function content
    // - `keepCharPositions` excludes, because it affect only cursor position
    const isPipeChanged =
      typeof pipe === 'function' && typeof prevProps.pipe === 'function'
        ? pipe.toString() !== prevProps.pipe.toString()
        : (isNil(pipe) && !isNil(prevProps.pipe)) ||
          (!isNil(pipe) && isNil(prevProps.pipe))
    const isMaskChanged = mask.toString() !== prevProps.mask.toString()
    const isSettingChanged =
      Object.keys(settings).some(
        (prop) => settings[prop] !== prevProps[prop]
      ) ||
      isMaskChanged ||
      isPipeChanged

    // Сalculate that value was changed
    const isValueChanged =
      value !== inputRef.current!.value || prevProps.value !== value

    // Check value and settings to prevent duplicating update() call
    if (isValueChanged || isSettingChanged) {
      initTextMask()
    }

    prevPropsRef.current = props
  }, [
    props,
    value,
    pipe,
    mask,
    guide,
    placeholderChar,
    showMask,
    inputRef,
    initTextMask,
  ])

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    textMaskInputElementRef.current?.update()

    if (typeof externalOnChange === 'function') {
      return externalOnChange(event)
    }
  }

  const params = {
    onChange,
    ...restProps,
  }

  return inputElement ? (
    React.cloneElement(inputElement, params)
  ) : (
    <input ref={inputRef} {...params} />
  )
}

export default TextMask
