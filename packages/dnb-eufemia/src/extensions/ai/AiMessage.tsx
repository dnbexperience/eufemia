import { clsx } from 'clsx'
import type { UIMessage } from 'ai'
import { useSpacing } from '../../components/space/SpacingUtils'
import Tag from '../../components/Tag'
import useTranslation from '../../shared/useTranslation'
import AiResponse from './AiResponse'
import AiSources from './AiSources'
import type { AiMessageProps } from './types'

function AiMessage(props: AiMessageProps) {
  const {
    from: fromProp,
    variant = 'bubble',
    name,
    timestamp,
    avatar,
    aiGenerated,
    message,
    actions,
    className,
    children,
    ...rest
  } = props

  const translation = useTranslation().Ai
  const from =
    fromProp ?? (message?.role === 'user' ? 'user' : 'assistant')
  const content = message ? renderParts(message, from) : children
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

      {content && <div className="dnb-ai-message__content">{content}</div>}

      {message && <AiSources message={message} />}

      {actions && <div className="dnb-ai-message__actions">{actions}</div>}
    </div>
  )
}

function renderParts(message: UIMessage, from: AiMessageProps['from']) {
  const texts = message.parts.filter((part) => part.type === 'text')
  if (texts.length === 0) {
    return null
  }

  // User input is shown as written, assistant output as markdown
  if (from === 'user') {
    return (
      <span className="dnb-ai-message__text">
        {texts.map((part) => part.text).join('\n\n')}
      </span>
    )
  }

  return texts.map((part, index) => (
    <AiResponse
      key={index}
      parseIncompleteMarkdown={part.state !== 'done'}
    >
      {part.text}
    </AiResponse>
  ))
}

export default AiMessage
