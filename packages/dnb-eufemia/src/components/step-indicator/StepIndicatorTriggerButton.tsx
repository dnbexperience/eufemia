/**
 * Web StepIndicator Component
 *
 */

import { clsx } from 'clsx'
import { useContext } from 'react'
import type { HTMLProps } from 'react'
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'
import { chevron_down, chevron_up } from '../../icons'
import Icon from '../icon/Icon'
import IconPrimary from '../icon-primary/IconPrimary'
import { validateDOMAttributes } from '../../shared/component-helper'
import StepIndicatorContext from './StepIndicatorContext'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

const chevronIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})

type StepIndicatorTriggerButtonProps = ButtonProps & {
  className?: string
}
function StepIndicatorTriggerButton({
  className,
  ...rest
}: StepIndicatorTriggerButtonProps) {
  const { data: _data, ...contextWithoutData } = useContext(
    StepIndicatorContext
  )

  const {
    stepsLabel,
    activeStep,
    overviewTitle,
    open,
    closeHandler,
    openHandler,
    skeleton,
    filterAttributes,
    noAnimation: _noAnimation,
    stepTitle,
    ...contextWithoutDataRest
  } = contextWithoutData

  const triggerParams = {
    ...contextWithoutDataRest,
    className: clsx(
      'dnb-step-indicator__trigger',
      createSkeletonClass('font', skeleton)
    ),
    'aria-live': 'polite',
  } as Omit<HTMLProps<HTMLElement>, 'onChange' | 'onClick'>

  const buttonParams = {
    ...rest,
    className: clsx(
      'dnb-step-indicator__trigger__button',
      `dnb-step-indicator__trigger__button--${
        open ? 'expanded' : 'collapsed'
      }`,
      className
    ),
  }

  // Cache Object.keys() result for performance
  const triggerParamKeys = Object.keys(triggerParams)
  triggerParamKeys.forEach((key) => {
    if (filterAttributes.includes(key)) {
      delete triggerParams[key]
    }
  })

  skeletonDOMAttributes(triggerParams, skeleton)

  // also used for code markup simulation
  validateDOMAttributes(contextWithoutDataRest, triggerParams)

  return (
    <section aria-label={overviewTitle}>
      <div {...(triggerParams as HTMLProps<HTMLDivElement>)}>
        <Button
          {...buttonParams}
          onClick={() => {
            if (open) {
              closeHandler()
            } else {
              openHandler()
            }
          }}
          aria-expanded={open}
          wrap
          variant="tertiary"
          icon={
            <IconPrimary
              icon={chevronIcon}
              transitionState={open ? 'expanded' : 'collapsed'}
            />
          }
          iconPosition="right"
        >
          {stepsLabel}
        </Button>
      </div>
    </section>
  )
}

export default StepIndicatorTriggerButton
