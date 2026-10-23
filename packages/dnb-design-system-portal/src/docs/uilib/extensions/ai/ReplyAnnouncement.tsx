import { useEffect, useRef, useState } from 'react'
import AriaLive from '@dnb/eufemia/src/components/AriaLive'

// The application knows when a reply ends, including when it stops early.
export default function ReplyAnnouncement({
  text,
  isBusy,
}: {
  text: string
  isBusy: boolean
}) {
  const wasBusy = useRef(false)
  const [announcement, setAnnouncement] = useState('')

  useEffect(() => {
    if (isBusy) {
      setAnnouncement('')
    } else if (wasBusy.current) {
      setAnnouncement(text)
    }
    wasBusy.current = isBusy
  }, [isBusy, text])

  return <AriaLive>{announcement}</AriaLive>
}
