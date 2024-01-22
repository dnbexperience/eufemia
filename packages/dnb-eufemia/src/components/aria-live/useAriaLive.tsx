import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { AriaLiveAllProps } from './types'
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
  const [announcement, setAnnouncement] = useState<React.ReactNode>('')
  const timeoutRef = useRef(null)

  const {
    disabled = false,
    delay,
    atomic,
    politeness,
    relevant,
    className,
    children,
    showAnnouncement,
    variant, // eslint-disable-line
    priority, // eslint-disable-line
    ...rest
  } = extendPropsWithContext(
    props,
    variantConfig[props.variant || 'text'],
    priorityConfig[props.priority || 'low']
  )

  const showTextAnnouncement = delay > -1

  useEffect(() => {
    if (showTextAnnouncement) {
      setAnnouncement('')

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
  }, [delay, children, disabled, showTextAnnouncement])

  return {
    'aria-live': disabled && !showTextAnnouncement ? 'off' : politeness,
    'aria-atomic': atomic,
    'aria-relevant': relevant,
    className: classnames(
      'dnb-aria-live',
      !showAnnouncement && 'dnb-sr-only',
      className
    ),
    children: showTextAnnouncement ? announcement : children,
    ...rest,
  }
}
