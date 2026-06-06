import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import { Space } from '../../../../components'
import type { SpaceProps } from '../../../../components/Space'
import type { SubmitState } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import { convertJsxToString } from '../../../../shared/component-helper'

export type SubmitIndicatorGlowProps = {
  active?: boolean
  state?: SubmitState
  label?: ReactNode
  className?: string
  children?: ReactNode
} & SpaceProps

function SubmitIndicatorGlow({
  active,
  state,
  label: labelProp,
  className,
  children,
  ...rest
}: SubmitIndicatorGlowProps) {
  const translation = useTranslation()
  const label = labelProp ?? translation.SubmitIndicator.label

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

  const indicator = (
    <span
      className={clsx(
        'dnb-forms-submit-indicator-glow__status',
        'dnb-sr-only',
        state && `dnb-forms-submit-indicator-glow__status--state-${state}`,
        !children && className
      )}
      {...ariaAttributes}
    />
  )

  if (!children) {
    return indicator
  }

  return (
    <Space
      element="span"
      className={clsx(
        'dnb-forms-submit-indicator-glow',
        active && 'dnb-forms-submit-indicator-glow--active',
        className
      )}
      {...rest}
    >
      {children}
      {state && indicator}
    </Space>
  )
}

export default SubmitIndicatorGlow
