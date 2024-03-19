import React, { useLayoutEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { Icon, Space, Tooltip } from '../../../../components'
import type { SpaceProps } from '../../../../components/Space'
import { check } from '../../../../icons'
import type { SubmitState } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import { useLocale } from '../../../../shared'

export type Props = {
  state: SubmitState
  className?: string
  successLabel?: string
  children?: React.ReactNode
} & SpaceProps

function SubmitIndicator(props: Props) {
  const {
    className,
    children,
    state,
    successLabel = 'Saved',
    ...rest
  } = props
  const tr = useLocale()
  const childrenRef = useRef<HTMLSpanElement>(null)
  const [willWrap, setWillWrap] = useState(false)

  useLayoutEffect(() => {
    if (children && state) {
      setWillWrap(willWordWrap(childrenRef.current, '. . . '))
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

  const ariaAttributes =
    state === 'pending'
      ? {
          role: 'status',
          'aria-busy': true,
          'aria-label': tr.ProgressIndicator.indicator_label,
        }
      : {}

  const dot = <b>.</b>
  const indicator = (
    <span
      className="dnb-form-submit-indicator__content"
      {...ariaAttributes}
      {...omitSpacingProps(rest)}
    >
      {state === 'success' && (
        <Tooltip
          targetElement={
            <span>
              <Icon icon={check} />
            </span>
          }
        >
          {successLabel}
        </Tooltip>
      )}
      {state && state !== 'success' && state !== 'abort' && (
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
      {indicator}
    </Space>
  )
}

function willWordWrap(element: HTMLElement, word: string) {
  if (!element) {
    return
  }

  const { offsetHeight, textContent } = element

  element.textContent += word
  const height = element.offsetHeight
  element.textContent = textContent

  return height > offsetHeight
}

SubmitIndicator._supportsSpacingProps = true
export default SubmitIndicator
