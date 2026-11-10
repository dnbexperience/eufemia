import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import useTranslation from './hooks/useTranslation'
import ai from '../../icons/ai'
import type { ChatSuggestionProps, ChatSuggestionsProps } from './types'

export function ChatSuggestions(props: ChatSuggestionsProps) {
  const { className, ...rest } = props
  const translation = useTranslation().Chat

  const rootProps = useSpacing(props, {
    role: 'group',
    'aria-label': translation.suggestions,
    ...rest,
    className: clsx('dnb-ai-suggestions', className),
  })

  return <div {...rootProps} />
}

export function ChatSuggestion(props: ChatSuggestionProps) {
  const {
    suggestion,
    icon = ai,
    children,
    onClick,
    className,
    ...rest
  } = props

  const content = children ?? suggestion

  return (
    <Button
      variant="secondary"
      size="default"
      icon={icon}
      iconPosition="left"
      className={clsx('dnb-ai-suggestion', className)}
      onClick={({ event }) => onClick?.({ suggestion, event })}
      {...rest}
    >
      {content}
    </Button>
  )
}
