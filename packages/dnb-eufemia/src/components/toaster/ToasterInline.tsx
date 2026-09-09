import type { JSX } from 'react'
import HeightAnimation from '../height-animation/HeightAnimation'
import ToasterItem from './ToasterItem'
import { DISMISS_ANIMATION_MS } from './useToasterState'
import type { ToasterMessage } from './types'

export type ToasterInlineProps = {
  messages: ToasterMessage[]
  entered: Set<string>
  dismissing: Set<string>
  onDismiss: (messageId: string) => void
  onVisible: (messageId: string) => void
}

function ToasterInline({
  messages,
  entered,
  dismissing,
  onDismiss,
  onVisible,
}: ToasterInlineProps): JSX.Element {
  return (
    <div role="log">
      <ul className="dnb-toaster__list">
        {messages.map((message) => (
          <HeightAnimation
            key={message.id}
            element="li"
            open={entered.has(message.id) && !dismissing.has(message.id)}
            duration={DISMISS_ANIMATION_MS}
          >
            <ToasterItem
              message={message}
              className={
                dismissing.has(message.id)
                  ? 'dnb-toaster__item--exit'
                  : 'dnb-toaster__item--enter'
              }
              onDismiss={onDismiss}
              onVisible={onVisible}
            />
          </HeightAnimation>
        ))}
      </ul>
    </div>
  )
}

export default ToasterInline
