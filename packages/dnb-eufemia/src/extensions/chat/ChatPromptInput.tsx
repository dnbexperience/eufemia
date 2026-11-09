import { useState } from 'react'
import type { FormEvent, MouseEvent } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import mergeProps from '../../shared/helpers/mergeProps'
import Button from '../../components/Button'
import Icon from '../../components/Icon'
import HeightAnimation from '../../components/HeightAnimation'
import Textarea from '../../components/Textarea'
import TextCounter from '../../fragments/TextCounter'
import type {
  TextareaChangeEvent,
  TextareaKeyDownEvent,
} from '../../components/textarea/types'
import useTranslation from './hooks/useTranslation'
import aino_medium from '../../icons/aino_medium'
import arrow_up from '../../icons/arrow_up'
import stop from '../../icons/stop'
import type {
  ChatPromptInputProps,
  ChatPromptInputSubmitEvent,
} from './types'

function ChatPromptInput(props: ChatPromptInputProps) {
  const {
    variant = 'default',
    icon = aino_medium,
    dropShadow = variant === 'compact',
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
    onMouseDown,
    startActions,
    endActions,
    className,
    children,
    ...rest
  } = props

  const translation = useTranslation().Chat
  const [internalValue, setInternalValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const isError =
    Boolean(textareaProps?.status) &&
    (textareaProps.statusState ?? 'error') === 'error'
  const value = valueProp ?? internalValue
  const isCompact = variant === 'compact'
  const isEmpty = value.trim() === ''
  const isTooLong = characterCounter > 0 && value.length > characterCounter
  const isSubmitDisabled = isTooLong || isBusy || disabled

  const submit = (event: ChatPromptInputSubmitEvent['event']) => {
    if (isSubmitDisabled || isEmpty) {
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
      !event.nativeEvent.isComposing &&
      !window.matchMedia?.('(hover: none) and (pointer: coarse)').matches
    ) {
      event.preventDefault()
      submit(event)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submit(event)
    if (!isSubmitDisabled) {
      event.currentTarget
        .querySelector<HTMLTextAreaElement>(
          '.dnb-ai-prompt-input__textarea textarea'
        )
        ?.focus()
    }
  }

  const handleMouseDown = (event: MouseEvent<HTMLFormElement>) => {
    onMouseDown?.(event)
    const control = (event.target as Element).closest(
      'a, button, input, select, textarea, label, summary, [role]:not([role="presentation"], [role="none"], [role="img"]), [tabindex], [contenteditable], .dnb-ai-prompt-input__context'
    )
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      disabled ||
      (control &&
        control !== event.currentTarget &&
        event.currentTarget.contains(control))
    ) {
      return // stop here
    }

    const textarea =
      event.currentTarget.querySelector<HTMLTextAreaElement>(
        '.dnb-ai-prompt-input__textarea textarea'
      )
    if (textarea && !textarea.disabled) {
      event.preventDefault()
      textarea.focus()
      textarea.setSelectionRange(
        textarea.value.length,
        textarea.value.length
      )
    }
  }

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-prompt-input',
      `dnb-ai-prompt-input--${variant}`,
      dropShadow && 'dnb-ai-prompt-input--drop-shadow',
      disabled && 'dnb-ai-prompt-input--disabled',
      isFocused && 'dnb-ai-prompt-input--focus',
      isError && 'dnb-ai-prompt-input--error',
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
          onFocus: () => setIsFocused(true),
          onBlur: () => setIsFocused(false),
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
        disabled={disabled}
        onClick={({ event }) => {
          if (isEmpty && document.activeElement === event.currentTarget) {
            event.currentTarget
              .closest('form')
              ?.querySelector('textarea')
              ?.focus()
          }
          onStop()
        }}
      />
    ) : isCompact && isEmpty ? null : (
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

  const start = startActions && (
    <div className="dnb-ai-prompt-input__start-actions">
      {startActions}
    </div>
  )
  const end = (endActions || submitButton) && (
    <div className="dnb-ai-prompt-input__actions">
      {endActions}
      {submitButton}
    </div>
  )

  return (
    // The card delegates pointer focus to its textarea without adding a tab stop.
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      {...rootProps}
      onSubmit={handleSubmit}
      onMouseDown={handleMouseDown}
    >
      <HeightAnimation open={Boolean(children)} compensateForGap="auto">
        <div className="dnb-ai-prompt-input__context">{children}</div>
      </HeightAnimation>
      {isCompact ? (
        <div className="dnb-ai-prompt-input__compact-row">
          {icon && (
            <Icon
              icon={icon}
              size="medium"
              className="dnb-ai-prompt-input__icon"
              aria-hidden
            />
          )}
          {start}
          {textarea}
          {counter}
          {end}
        </div>
      ) : (
        <>
          <div className="dnb-ai-prompt-input__field">
            {textarea}
            {counter}
          </div>
          <div className="dnb-ai-prompt-input__toolbar">
            {start}
            {end}
          </div>
        </>
      )}
    </form>
  )
}

export default ChatPromptInput
