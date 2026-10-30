import { useCallback, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import Space from '../../space/Space'
import type { SpaceProps } from '../../space/Space'
import type { SubmitState } from '../../../extensions/forms/types'
import { omitSpacingProps, pickSpacingProps } from '../../flex/utils'
import useTranslation from '../../../shared/useTranslation'
import { convertJsxToString } from '../../../shared/component-helper'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../../shared/helpers/useIsomorphicLayoutEffect'
import withComponentMarkers from '../../../shared/helpers/withComponentMarkers'

export type SubmitIndicatorProps = {
  state: SubmitState
  id?: string
  label?: ReactNode
  showLabel?: boolean
  className?: string
  children?: ReactNode
} & SpaceProps

function SubmitIndicator(props: SubmitIndicatorProps) {
  const translation = useTranslation().SubmitIndicator

  const {
    id,
    className,
    children,
    state,
    showLabel,
    label = translation.label,
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

    return undefined
  }, [key, recalculate])

  const params = {
    id,
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

  const dot = <b />
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
    return undefined
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
