import { useRef, useState } from 'react'
import { clsx } from 'clsx'
import { useSpacing } from '../../components/space/SpacingUtils'
import Button from '../../components/Button'
import ScrollView from '../../components/ScrollView'
import useTranslation from '../../shared/useTranslation'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import { arrow_down } from '../../icons'
import type { AiConversationProps } from './types'

// Distance in px from the bottom that still counts as being at the bottom
const BOTTOM_THRESHOLD = 32

function AiConversation(props: AiConversationProps) {
  const { label, className, children, ...rest } = props

  const translation = useTranslation().Ai
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const isAtBottomRef = useRef(true)
  const [isAtBottom, setIsAtBottom] = useState(true)

  const scrollToBottom = (behavior: ScrollBehavior = 'auto') => {
    const element = scrollRef.current
    element?.scrollTo?.({ top: element.scrollHeight, behavior })
  }

  // Follow new and streamed content while the user is at the bottom
  useLayoutEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      return undefined // stop here
    }

    const observer = new ResizeObserver(() => {
      if (isAtBottomRef.current) {
        scrollToBottom()
      }
    })
    observer.observe(contentRef.current)

    return () => observer.disconnect()
  }, [])

  const handleScroll = () => {
    const { scrollHeight, scrollTop, clientHeight } = scrollRef.current
    const atBottom =
      scrollHeight - scrollTop - clientHeight <= BOTTOM_THRESHOLD
    isAtBottomRef.current = atBottom
    setIsAtBottom(atBottom)
  }

  const handleScrollToBottom = () => {
    isAtBottomRef.current = true
    setIsAtBottom(true)
    scrollToBottom('smooth')
  }

  const rootProps = useSpacing(props, {
    ...rest,
    className: clsx('dnb-ai-conversation', className),
  })

  return (
    <div {...rootProps}>
      <ScrollView
        ref={scrollRef}
        interactive="auto"
        className="dnb-ai-conversation__scroll"
        role="log"
        aria-label={label ?? translation.conversationLabel}
        onScroll={handleScroll}
      >
        <div ref={contentRef} className="dnb-ai-conversation__content">
          {children}
        </div>
      </ScrollView>

      {!isAtBottom && (
        <Button
          variant="secondary"
          size="medium"
          icon={arrow_down}
          className="dnb-ai-conversation__scroll-button"
          aria-label={translation.scrollToBottom}
          tooltip={translation.scrollToBottom}
          onClick={handleScrollToBottom}
        />
      )}
    </div>
  )
}

export default AiConversation
