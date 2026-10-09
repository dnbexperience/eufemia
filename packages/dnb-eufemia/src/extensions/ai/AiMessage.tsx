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
    aiGenerated,
    actions,
    className,
    children,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const hasHeader = Boolean(avatar || name || timestamp || aiGenerated)

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx(
      'dnb-ai-message',
      `dnb-ai-message--${from}`,
      `dnb-ai-message--${variant}`,
      className
    ),
  })

  return (
    <div {...rootProps}>
      {hasHeader && (
        <div className="dnb-ai-message__header">
          {avatar && (
            <span className="dnb-ai-message__avatar" aria-hidden>
              {avatar}
            </span>
          )}

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
