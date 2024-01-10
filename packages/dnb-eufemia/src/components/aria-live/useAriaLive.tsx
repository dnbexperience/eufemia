import React, { useEffect, useState } from 'react'
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

  useEffect(() => {
    if (delay > -1) {
      setAnnouncement('')

      const timer = setTimeout(
        () => setAnnouncement(disabled ? '' : children),
        (process.env.NODE_ENV === 'test' ? 0 : delay) ?? 1000
      )

      return () => clearTimeout(timer)
    }
  }, [disabled, delay, children])

  return {
    'aria-live': !disabled ? politeness : 'off',
    'aria-atomic': atomic,
    'aria-relevant': relevant,
    className: classnames(
      'dnb-aria-live',
      !showAnnouncement && 'dnb-sr-only',
      className
    ),
    children: delay > -1 ? announcement : children,
    ...rest,
  }
}
