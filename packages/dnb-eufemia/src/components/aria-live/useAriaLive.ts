import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { clsx } from 'clsx'
import type { AriaLiveAllProps } from './types'
import { extendPropsWithContext } from '../../shared/component-helper'

const variantConfig: {
  [key: string]: {
    delay: AriaLiveAllProps['delay']
    showAnnouncement: AriaLiveAllProps['showAnnouncement']
    atomic?: AriaLiveAllProps['atomic']
  }
} = {
  text: {
    delay: 1000,
    atomic: true,
    showAnnouncement: false,
  },
  content: {
    delay: -1,
    atomic: false,
    showAnnouncement: true,
  },
}

const priorityConfig: {
  [key: string]: {
    politeness: AriaLiveAllProps['politeness']
  }
} = {
  low: {
    politeness: 'polite',
  },
  high: {
    politeness: 'assertive',
  },
}

export default function useAriaLive(props: AriaLiveAllProps) {
  const [announcement, setAnnouncement] = useState<ReactNode>('')
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const {
    disabled = false,
    delay,
    atomic,
    politeness,
    relevant,
    className,
    children,
    showAnnouncement,
    variant,
    priority,
    ...rest
  } = extendPropsWithContext(
    props,
    variantConfig[props.variant || 'text'],
    priorityConfig[props.priority || 'low']
  )

  const showTextAnnouncement = delay > -1
  const hasAnnouncement = !(
    children === null ||
    children === undefined ||
    children === false ||
    children === ''
  )

  useEffect(() => {
    if (showTextAnnouncement) {
      setAnnouncement('')

      // An idle live region has nothing to announce, so no timers are needed.
      // This keeps pages with many mounted regions cheap.
      if (!hasAnnouncement) {
        return undefined
      }

      const isTest = process.env.NODE_ENV === 'test'
      const timer = setTimeout(
        () => {
          if (!disabled) {
            setAnnouncement(children)
          }

          clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(
            () => setAnnouncement(''),
            isTest ? 100 : delay + 1000
          )
        },
        (isTest ? 0 : delay) ?? 1000
      )

      return () => {
        clearTimeout(timer)
        clearTimeout(timeoutRef.current)
      }
    }

    return undefined
  }, [delay, children, disabled, hasAnnouncement, showTextAnnouncement])

  return {
    'aria-live': disabled && !showTextAnnouncement ? 'off' : politeness,
    'aria-atomic': atomic,
    'aria-relevant': relevant,
    className: clsx(
      'dnb-aria-live',
      !showAnnouncement && 'dnb-sr-only',
      className
    ),
    children: showTextAnnouncement ? announcement : children,
    ...rest,
  }
}
