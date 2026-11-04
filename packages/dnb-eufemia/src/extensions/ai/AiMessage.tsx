import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Tag from '../../components/Tag'
import useTranslation from './hooks/useTranslation'
import type { AiMessageProps } from './types'

function AiMessage(props: AiMessageProps) {
  const {
    from = 'assistant',
    variant = 'bubble',
    name,
    timestamp,
    avatar,
    grouped,
    aiGenerated,
    actions,
    className,
    children,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const hasHeader = Boolean(name || timestamp || aiGenerated)

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-message',
      `dnb-ai-message--${from}`,
      `dnb-ai-message--${variant}`,
      avatar && 'dnb-ai-message--has-avatar',
      grouped && 'dnb-ai-message--grouped',
      hasHeader && 'dnb-ai-message--has-header',
      className
    ),
  })

  return (
    <div {...rootProps}>
      {avatar && (
        <span className="dnb-ai-message__avatar" aria-hidden>
          {avatar}
        </span>
      )}
      {hasHeader && (
        <div className="dnb-ai-message__header">
          {(name || timestamp) && (
            <span className="dnb-ai-message__meta">
              {name}
              {name && timestamp && ' - '}
              {timestamp}
            </span>
          )}

          {aiGenerated && (
            <Tag hasLabel className="dnb-ai-message__tag">
              {translation.aiGenerated}
            </Tag>
          )}
        </div>
      )}

      {children != null && (
        <div className="dnb-ai-message__content">
          {typeof children === 'string' ? (
            <span className="dnb-ai-message__text">{children}</span>
          ) : (
            children
          )}
        </div>
      )}

      {actions && <div className="dnb-ai-message__actions">{actions}</div>}
    </div>
  )
}

export default AiMessage
