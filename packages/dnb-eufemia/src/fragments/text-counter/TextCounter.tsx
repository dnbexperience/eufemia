import React, { useContext, useMemo, useRef } from 'react'
import classnames from 'classnames'
import { toPascalCase } from '../../shared/component-helper'
import Context from '../../shared/Context'
import AriaLive from '../../components/AriaLive'
import Icon from '../../components/icon/Icon'
import { exclamation_triangle } from '../../icons'
import type { LocaleProps, SpacingProps } from '../../shared/types'
import P from '../../elements/P'

export type TextCounterProps = {
  variant?: 'down' | 'up' | true
  text: string
  max: number
} & React.HTMLAttributes<HTMLParagraphElement> &
  LocaleProps &
  SpacingProps

export default function TextCounter(localProps: TextCounterProps) {
  const context = useContext(Context)

  const {
    variant: _variant,
    text,
    max,
    className,
    locale, // eslint-disable-line
    ...rest
  } = localProps

  const textRef = useRef(text)
  const variant = /up|down/.test(String(_variant)) ? _variant : 'down'
  const length = (text || '').length
  const message = useMemo(() => {
    if (!(max > 0)) {
      return ''
    }

    const count = variant === 'down' ? Math.abs(max - length) : length
    const key = `character${
      length > max ? 'Exceeded' : toPascalCase(variant)
    }`

    return context
      .getTranslation(localProps)
      .TextCounter[key].replace('%count', String(count))
      .replace('%max', String(max))
  }, [max, length, variant, context, localProps])

  const bypassAria = useMemo(() => {
    const bypass = textRef.current === text
    textRef.current = text
    return bypass
  }, [text])

  return (
    <P
      size="small"
      className={classnames(
        'dnb-text-counter',
        length > max && 'dnb-text-counter--exceeded',
        className
      )}
      {...rest}
    >
      <Icon icon={exclamation_triangle} />
      {message}
      <AriaLive element="span" disabled={bypassAria} delay={2000}>
        {message}
      </AriaLive>
    </P>
  )
}
