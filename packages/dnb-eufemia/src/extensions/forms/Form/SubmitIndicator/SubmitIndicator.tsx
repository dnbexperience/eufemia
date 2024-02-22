import React, { useLayoutEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Space } from '../../../../components'
import { pickSpacingProps } from '../../../../components/flex/utils'
import { SpaceProps } from '../../../../components/Space'
import { SubmitState } from '../../types'

export type Props = {
  state: SubmitState
  className?: string
  children?: React.ReactNode
} & SpaceProps

function SubmitIndicator(props: Props) {
  const { className, children, state, ...rest } = props
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

  const dots = (
    <span className="dnb-form-submit-indicator__dots" aria-hidden>
      {state && (
        <>
          <i>.</i>
          <i>.</i>
          <i>.</i>
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

  const { offsetHeight } = element

  element.textContent += ' ' + word
  const newWidth = element.offsetHeight

  element.textContent = element.textContent.replace(' ' + word, '')

  return newWidth > offsetHeight
}

SubmitIndicator._supportsSpacingProps = true
export default SubmitIndicator
