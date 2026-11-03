import { useEffect, useRef, useState } from 'react'
import AriaLive from '@dnb/eufemia/src/components/AriaLive'

// The application knows when a reply ends, including when it stops early.
export default function ReplyAnnouncement({
  text,
  isBusy,
  messageId,
  outcome,
}: {
  text?: string
  isBusy: boolean
  messageId?: string
  outcome?: string
}) {
  const wasBusy = useRef(false)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (isBusy) {
      setAnnouncement('')
    } else if (wasBusy.current) {
      const content = messageId
        ? document
            .getElementById(messageId)
            ?.querySelector<HTMLElement>('.dnb-ai-message__content')
        : null
      const reply =
        content?.innerText || content?.textContent || text || ''
      setAnnouncement(
        outcome && !reply.includes(outcome)
          ? [outcome, reply].filter(Boolean).join(' ')
          : reply
      )
    }
    wasBusy.current = isBusy
  }, [isBusy, text, messageId, outcome])

  return <AriaLive>{announcement}</AriaLive>
}
