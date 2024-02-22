import React, { useLayoutEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Space } from '../../../../components'
import type { SpaceProps } from '../../../../components/Space'
import type { SubmitState } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import { useLocale } from '../../../../shared'

export type Props = {
  state: SubmitState
  className?: string
  children?: React.ReactNode
} & SpaceProps

function SubmitIndicator(props: Props) {
  const { className, children, state, ...rest } = props
  const tr = useLocale()
  const childrenRef = useRef<HTMLSpanElement>(null)
  const [willWrap, setWillWrap] = useState(false)

  useLayoutEffect(() => {
    if (children && state) {
      setWillWrap(willWordWrap(childrenRef.current, '. . .'))
    }
  }, [children, state])

  const params = {
    className: classnames(
      'dnb-form-submit-indicator',
      state && `dnb-form-submit-indicator--state-${state}`,
      willWrap && 'dnb-form-submit-indicator--inline-wrap',
      className
    ),
    ...pickSpacingProps(rest),
  } as SpaceProps

  const dot = <span>.</span>
  const dots = (
    <span
      className="dnb-form-submit-indicator__dots"
      aria-busy={true}
      aria-label={tr.ProgressIndicator.indicator_label}
      {...omitSpacingProps(rest)}
    >
      {state && (
        <>
          {dot}
          {dot}
          {dot}
        </>
      )}
    </span>
  )

  return (
    <Space {...params} element="span">
      {children && <span ref={childrenRef}>{children}</span>}
      {dots}
    </Space>
  )
}

function willWordWrap(element: HTMLElement, word: string) {
  if (!element) {
    return
  }

  const { offsetHeight, textContent } = element

  element.textContent += ' ' + word
  const height = element.offsetHeight
  element.textContent = textContent

  return height > offsetHeight
}

SubmitIndicator._supportsSpacingProps = true
export default SubmitIndicator
