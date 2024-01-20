import React, { useContext, useMemo } from 'react'
import classnames from 'classnames'
import { toPascalCase } from '../../shared/component-helper'
import Context from '../../shared/Context'
import Space, { SpaceProps } from '../../components/Space'
import AriaLive from '../../components/AriaLive'
import type { LocaleProps } from '../../shared/types'

export type TextCounterProps = {
  variant?: 'down' | 'up' | true
  text: string
  max: number
  bypassAriaLive?: boolean
} & React.HTMLAttributes<HTMLSpanElement> &
  LocaleProps &
  SpaceProps

export default function TextCounter(localProps: TextCounterProps) {
  const context = useContext(Context)
  const {
    variant,
    text,
    max,
    bypassAriaLive = false,
    className,
    locale, // eslint-disable-line
    ...rest
  } = localProps

  const length = (text || '').length

  const message = useMemo(() => {
    if (!(max > 0)) {
      return ''
    }

    let count = variant === 'down' ? max - length : length
    if (count > max) {
      count = max
    } else if (count < 0) {
      count = 0
    }

    return context
      .getTranslation(localProps)
      .TextCounter[`character${toPascalCase(variant || 'down')}`].replace(
        '%count',
        String(count)
      )
      .replace('%max', String(max))
  }, [variant, max, length, context, localProps])

  return (
    <Space
      element="span"
      className={classnames('dnb-text-counter', className)}
      {...rest}
    >
      <span className="dnb-text-counter__message">{message}</span>
      <AriaLive disabled={length > 0 && bypassAriaLive} delay={2000}>
        {message}
      </AriaLive>
    </Space>
  )
}
