import { clsx } from 'clsx'
import useTranslation from './hooks/useTranslation'
import ChatMessage from './ChatMessage'
import DotsIndicator from '../../shared/internal/DotsIndicator'
import type { ChatMessageIndicatorProps } from './types'

function ChatMessageIndicator({
  label,
  className,
  ...rest
}: ChatMessageIndicatorProps) {
  const translation = useTranslation().Chat

  return (
    <ChatMessage
      from="assistant"
      className={clsx('dnb-ai-message-indicator', className)}
      {...rest}
    >
      <span className="dnb-ai-message-indicator__status" role="status">
        <span className="dnb-ai-message-indicator__dots" aria-hidden>
          <DotsIndicator />
        </span>
        <span className="dnb-sr-only">{label ?? translation.loading}</span>
      </span>
    </ChatMessage>
  )
}

export default ChatMessageIndicator
