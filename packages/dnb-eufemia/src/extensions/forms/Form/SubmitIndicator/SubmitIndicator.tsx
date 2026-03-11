import React, { useCallback, useMemo, useRef, useState } from 'react'
import clsx from 'clsx'
import { Space } from '../../../../components'
import type { SpaceProps } from '../../../../components/Space'
import type { SubmitState } from '../../types'
import {
  omitSpacingProps,
  pickSpacingProps,
} from '../../../../components/flex/utils'
import useTranslation from '../../hooks/useTranslation'
import { convertJsxToString } from '../../../../shared/component-helper'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../../../shared/helpers/withComponentMarkers'

export type Props = {
  state: SubmitState
  label?: React.ReactNode
  showLabel?: boolean
  className?: string
  children?: React.ReactNode
} & SpaceProps

function SubmitIndicator(props: Props) {
  const translation = useTranslation()

  const {
    className,
    children,
    state,
    showLabel,
    label = translation.SubmitIndicator.label,
    ...rest
  } = props
  const childrenRef = useRef<HTMLSpanElement>(null)
  const [willWrap, setWillWrap] = useState(false)
  const key = useMemo(() => convertJsxToString(children), [children])

  const recalculate = useCallback(() => {
    setWillWrap(willWordWrap(childrenRef.current, '. . . '))
  }, [childrenRef])

  useLayoutEffect(() => {
    if (key) {
      recalculate()

      window.addEventListener('resize', recalculate)
      return () => {
        window.removeEventListener('resize', recalculate)
      }
    }
  }, [key, recalculate])

  const params = {
    className: clsx(
      'dnb-forms-submit-indicator',
      state && `dnb-forms-submit-indicator--state-${state}`,
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
          'aria-label': convertJsxToString(label),
        }
      : {
          'aria-hidden': true,
        }

  const dot = <b>.</b>
  const indicator = (
    <span
      className="dnb-forms-submit-indicator__content"
      {...ariaAttributes}
      {...omitSpacingProps(rest)}
    >
      {showLabel && (
        <span className="dnb-forms-submit-indicator__label">{label}</span>
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

  const { offsetHeight } = element

  const clone = element.cloneNode(true) as HTMLElement
  element.parentElement?.insertBefore(clone, element)

  clone.appendChild(document.createTextNode(word))
  const height = clone.offsetHeight

  clone.remove()

  return height > offsetHeight
}

withComponentMarkers(SubmitIndicator, {
  _supportsSpacingProps: true,
})

export default SubmitIndicator
