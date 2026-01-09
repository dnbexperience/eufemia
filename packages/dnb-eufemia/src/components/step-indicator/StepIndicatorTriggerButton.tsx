/**
 * Web StepIndicator Component
 *
 */

import classnames from 'classnames'
import React, { useContext } from 'react'
import type { ButtonProps } from '../button/Button'
import Button from '../button/Button'
import Section from '../section/Section'
import HeightAnimation from '../height-animation/HeightAnimation'
import chevron_down from '../../icons/chevron_down'
import {
  validateDOMAttributes,
  combineDescribedBy,
} from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import FormLabel from '../form-label/FormLabel'
import StepIndicatorContext from './StepIndicatorContext'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

export type StepIndicatorTriggerButtonProps = ButtonProps & {
  isNested?: boolean
  className?: string
}
function StepIndicatorTriggerButton({
  className,
  isNested,
  ...rest
}: StepIndicatorTriggerButtonProps) {
  const {
    data, // eslint-disable-line
    ...contextWithoutData
  } = useContext(StepIndicatorContext)

  const {
    stepsLabel,
    activeStep,
    overviewTitle,
    openState,
    closeHandler,
    openHandler,
    skeleton,
    filterAttributes,
    noAnimation,
    stepTitle, // eslint-disable-line
    ...contextWithoutDataRest
  } = contextWithoutData

  const item = data[activeStep || 0]
  const label = stepsLabel
  const id = useId()

  const triggerParams = {
    ...contextWithoutDataRest,
    className: classnames(
      'dnb-step-indicator__trigger',
      createSkeletonClass('font', skeleton)
    ),
    'aria-live': 'polite',
  } as Omit<React.HTMLProps<HTMLElement>, 'onChange' | 'onClick'>

  const buttonParams = {
    ...rest,
    className: classnames(
      'dnb-step-indicator__trigger__button',
      `dnb-step-indicator__trigger__button--${
        openState ? 'expanded' : 'collapsed'
      }`,
      className
    ),
  }

  buttonParams['aria-describedby'] = combineDescribedBy(
    buttonParams,
    id + '-overview'
  )

  Object.keys(triggerParams).forEach((key) => {
    if (filterAttributes.includes(key)) {
      delete triggerParams[key]
    }
  })

  skeletonDOMAttributes(triggerParams, skeleton)

  // also used for code markup simulation
  validateDOMAttributes(contextWithoutDataRest, triggerParams)

  return (
    <Section
      backgroundColor="var(--step-indicator-trigger-background)"
      outline="transparent"
      innerSpace={{
        top: 'small',
        bottom: 'small',
      }}
      roundedCorner={{
        small: false,
        medium: [true, true, !openState, !openState],
        large: [true, true, !openState, !openState],
      }}
      outset={isNested ? true : undefined}
      aria-label={overviewTitle}
    >
      <HeightAnimation animate={!noAnimation}>
        <div {...(triggerParams as React.HTMLProps<HTMLDivElement>)}>
          <FormLabel
            aria-describedby={id}
            aria-hidden // In order to not duplicate information for screen readers
            className="dnb-step-indicator__label"
            right="x-small"
          >
            {label}
          </FormLabel>
          <Button
            {...buttonParams}
            onClick={() => {
              if (openState) {
                closeHandler()
              } else {
                openHandler()
              }
            }}
            aria-expanded={openState}
            aria-label={label} // To support NVDA properly
            wrap
            variant="tertiary"
            icon={chevron_down}
            iconPosition="right"
          >
            {(typeof item === 'string' ? item : item && item.title) || ''}
          </Button>
        </div>
      </HeightAnimation>
    </Section>
  )
}

export default StepIndicatorTriggerButton
