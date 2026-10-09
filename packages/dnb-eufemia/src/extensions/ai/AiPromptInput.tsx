import { useState } from 'react'
import type { FormEvent } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import mergeProps from '../../shared/helpers/mergeProps'
import Button from '../../components/Button'
import Textarea from '../../components/Textarea'
import TextCounter from '../../fragments/TextCounter'
import type {
  TextareaChangeEvent,
  TextareaKeyDownEvent,
} from '../../components/textarea/types'
import useTranslation from './hooks/useTranslation'
import { add, arrow_up, microphone, stop } from '../../icons'
import type { AiPromptInputProps, AiPromptInputSubmitEvent } from './types'

function AiPromptInput(props: AiPromptInputProps) {
  const {
    variant = 'default',
    value: valueProp,
    placeholder,
    label,
    isBusy = false,
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
  const isCompact = variant === 'compact'
  const isEmpty = value.trim() === ''
  const isTooLong = characterCounter > 0 && value.length > characterCounter
  const isSubmitDisabled = isEmpty || isTooLong || isBusy || disabled

  const submit = (event: AiPromptInputSubmitEvent['event']) => {
    if (isSubmitDisabled) {
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
      {...mergeProps(
        {
          className: 'dnb-ai-prompt-input__textarea',
          label: label ?? translation.promptLabel,
          labelSrOnly: true,
          placeholder: placeholder ?? translation.promptPlaceholder,
          value,
          rows: 1,
          autoResize: true,
          autoResizeMaxRows: isCompact ? 4 : 8,
          hideResizeHandle: true,
          stretch: true,
          disabled,
          onChange: handleChange,
          onKeyDown: handleKeyDown,
        },
        textareaProps
      )}
    />
  )

  // The visible count is short, and screen readers get the full text
  const counter = characterCounter > 0 && (
    <div
      className={clsx(
        'dnb-ai-prompt-input__counter',
        isTooLong && 'dnb-ai-prompt-input__counter--exceeded'
      )}
    >
      <span aria-hidden>
        {value.length}/{characterCounter}
      </span>
      <TextCounter
        variant="up"
        text={value}
        max={characterCounter}
        className="dnb-sr-only"
      />
    </div>
  )

  const iconButtonSize = isCompact ? 'medium' : 'small'

  const attachmentButton = onAttachmentClick && (
    <Button
      variant="tertiary"
      size={iconButtonSize}
      className="dnb-ai-prompt-input__icon-button"
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
      size={iconButtonSize}
      className="dnb-ai-prompt-input__icon-button"
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
        size={isCompact ? 'medium' : undefined}
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
        size={isCompact ? 'medium' : undefined}
        className="dnb-ai-prompt-input__submit"
        icon={arrow_up}
        iconPosition="right"
        {...(isCompact
          ? {
              'aria-label': translation.send,
              tooltip: translation.send,
            }
          : { text: translation.send })}
        disabled={isSubmitDisabled}
      />
    )

  return (
    <form {...rootProps} onSubmit={handleSubmit}>
      {isCompact ? (
        <>
          {attachmentButton}
          {textarea}
          {counter}
          {microphoneButton}
          {submitButton}
        </>
      ) : (
        <>
          <div className="dnb-ai-prompt-input__field">
            {textarea}
            {counter}
          </div>
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
