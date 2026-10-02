import { useState } from 'react'
import type { FormEvent } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import type {
  TextareaChangeEvent,
  TextareaKeyDownEvent,
} from '../../components/textarea/types'
import useTranslation from '../../shared/useTranslation'
import { add, arrow_up, microphone, stop } from '../../icons'
import type { AiPromptInputProps, AiPromptInputSubmitEvent } from './types'

function AiPromptInput(props: AiPromptInputProps) {
  const {
    variant = 'default',
    value: valueProp,
    placeholder,
    label,
    status = 'ready',
    characterCounter,
    disabled,
    textareaProps,
    onChange,
    onSubmit,
    onStop,
    onAttachmentClick,
    onMicrophoneClick,
    className,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const [internalValue, setInternalValue] = useState('')
  const value = valueProp ?? internalValue
  const isBusy = status === 'submitted' || status === 'streaming'
  const isCompact = variant === 'compact'
  const isEmpty = value.trim() === ''

  const submit = (event: AiPromptInputSubmitEvent['event']) => {
    if (isEmpty || isBusy || disabled) {
      return // stop here
    }

    onSubmit?.({ value: value.trim(), event })

    if (valueProp === undefined) {
      setInternalValue('')
    }
  }

  const handleChange = ({ value }: TextareaChangeEvent) => {
    setInternalValue(value)
    onChange?.({ value })
  }

  const handleKeyDown = ({ event }: TextareaKeyDownEvent) => {
    if (
      event.key === 'Enter' &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault()
      submit(event)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(event)
  }

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-prompt-input',
      `dnb-ai-prompt-input--${variant}`,
      disabled && 'dnb-ai-prompt-input--disabled',
      className
    ),
  })

  const textarea = (
    <Textarea
      className="dnb-ai-prompt-input__textarea"
      label={label ?? translation.promptLabel}
      labelSrOnly
      placeholder={placeholder ?? translation.promptPlaceholder}
      value={value}
      rows={1}
      autoResize
      autoResizeMaxRows={isCompact ? 4 : 8}
      hideResizeHandle
      stretch
      characterCounter={characterCounter}
      disabled={disabled}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      {...textareaProps}
    />
  )

  const attachmentButton = onAttachmentClick && (
    <Button
      variant="tertiary"
      size="medium"
      icon={add}
      aria-label={translation.addAttachment}
      tooltip={translation.addAttachment}
      disabled={disabled}
      onClick={onAttachmentClick}
    />
  )

  const microphoneButton = onMicrophoneClick && (
    <Button
      variant="tertiary"
      size="medium"
      icon={microphone}
      aria-label={translation.useMicrophone}
      tooltip={translation.useMicrophone}
      disabled={disabled}
      onClick={onMicrophoneClick}
    />
  )

  const submitButton =
    isBusy && onStop ? (
      <Button
        type="button"
        size="medium"
        className="dnb-ai-prompt-input__stop"
        icon={stop}
        iconPosition="left"
        {...(isCompact
          ? {
              'aria-label': translation.stop,
              tooltip: translation.stop,
            }
          : { text: translation.stop })}
        onClick={onStop}
      />
    ) : (
      <Button
        type="submit"
        size="medium"
        className="dnb-ai-prompt-input__submit"
        {...(isCompact
          ? {
              icon: arrow_up,
              'aria-label': translation.send,
              tooltip: translation.send,
            }
          : { text: translation.send })}
        disabled={disabled || isEmpty || isBusy}
      />
    )

  return (
    <form {...rootProps} onSubmit={handleSubmit}>
      {isCompact ? (
        <>
          {attachmentButton}
          {textarea}
          {microphoneButton}
          {submitButton}
        </>
      ) : (
        <>
          {textarea}
          <div className="dnb-ai-prompt-input__toolbar">
            {attachmentButton}
            <div className="dnb-ai-prompt-input__actions">
              {microphoneButton}
              {submitButton}
            </div>
          </div>
        </>
      )}
    </form>
  )
}

export default AiPromptInput
