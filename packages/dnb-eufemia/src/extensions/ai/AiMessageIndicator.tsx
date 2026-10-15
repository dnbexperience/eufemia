import { clsx } from 'clsx'
import useTranslation from './hooks/useTranslation'
import AiMessage from './AiMessage'
import type { AiMessageIndicatorProps } from './types'

function AiMessageIndicator({
  label,
  className,
  ...rest
}: AiMessageIndicatorProps) {
  const translation = useTranslation().Ai

  return (
    <AiMessage
      from="assistant"
      className={clsx('dnb-ai-message-indicator', className)}
      {...rest}
    >
      <span className="dnb-ai-message-indicator__status" role="status">
        <span className="dnb-ai-message-indicator__dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span className="dnb-sr-only">{label ?? translation.loading}</span>
      </span>
    </AiMessage>
  )
}

export default AiMessageIndicator
