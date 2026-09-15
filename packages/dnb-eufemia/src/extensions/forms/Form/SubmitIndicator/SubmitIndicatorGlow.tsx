import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import type { SubmitState } from '../../types'
import useTranslation from '../../hooks/useTranslation'
import { convertJsxToString } from '../../../../shared/component-helper'

export type SubmitIndicatorGlowProps = {
  state?: SubmitState
  label?: ReactNode
  className?: string
}

function SubmitIndicatorGlow({
  state,
  label: labelProp,
  className,
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

  return (
    <span
      className={clsx(
        'dnb-forms-submit-indicator-glow__status',
        'dnb-sr-only',
        state && `dnb-forms-submit-indicator-glow__status--state-${state}`,
        className
      )}
      {...ariaAttributes}
    />
  )
}

export default SubmitIndicatorGlow
