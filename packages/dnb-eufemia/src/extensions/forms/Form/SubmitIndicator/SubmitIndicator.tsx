import React, { useMemo, useRef, useState } from 'react'
import classnames from 'classnames'
import { Icon, Space, Tooltip } from '../../../../components'
import type { SpaceProps } from '../../../../components/Space'
import { check } from '../../../../icons'
import type { SubmitState } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import { useTranslation } from '../../../../shared'
import { convertJsxToString } from '../../../../shared/component-helper'

// SSR warning fix: https://gist.github.com/gaearon/e7d97cdf38a2907924ea12e4ebdf3c85
const useLayoutEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect

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
  const translation = useTranslation()
  const childrenRef = useRef<HTMLSpanElement>(null)
  const [willWrap, setWillWrap] = useState(false)
  const key = useMemo(() => convertJsxToString(children), [children])

  useLayoutEffect(() => {
    if (key) {
      setWillWrap(willWordWrap(childrenRef.current, '. . . '))
    }
  }, [key])

  const params = {
    className: classnames(
      'dnb-forms-submit-indicator',
      state && `dnb-forms-submit-indicator--state-${state}`,
      (!state || state === 'complete') &&
        'dnb-forms-submit-indicator--standby',
      willWrap && 'dnb-forms-submit-indicator--inline-wrap',
      className
    ),
    ...pickSpacingProps(rest),
  } as SpaceProps

  const ariaAttributes =
    state === 'pending'
      ? {
          role: 'status',
          'aria-busy': true,
          'aria-label': translation.ProgressIndicator.indicator_label,
        }
      : {}

  const dot = <b>.</b>
  const indicator = (
    <span
      className="dnb-forms-submit-indicator__content"
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
      {children && (
        <span ref={childrenRef} key={key}>
          {children}
        </span>
      )}
      {indicator}
    </Space>
  )
}

function willWordWrap(element: HTMLElement, word: string) {
  if (!element) {
    return
  }

  const { offsetHeight, innerHTML } = element

  const clone = element.cloneNode(true) as HTMLElement
  element.parentElement?.insertBefore(clone, element)

  clone.innerHTML += word
  const height = clone.offsetHeight
  clone.innerHTML = innerHTML

  clone.remove()

  return height > offsetHeight
}

SubmitIndicator._supportsSpacingProps = true
export default SubmitIndicator
