/**
 * Web StepIndicator Component
 *
 */

import classnames from 'classnames'
import React, { useContext } from 'react'
import Button, { ButtonProps } from '../button/Button'
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
  className?: string
}
function StepIndicatorTriggerButton({
  className,
  ...rest
}: StepIndicatorTriggerButtonProps) {
  const {
    data, // eslint-disable-line
    ...contextWithoutData
  } = useContext(StepIndicatorContext)

  const {
    stepsLabel,
    activeStep,
    overview_title,
    openState,
    closeHandler,
    openHandler,
    skeleton,
    filterAttributes,
    no_animation,
  } = contextWithoutData

  const item = data[activeStep || 0]
  const label = stepsLabel
  const id = useId()

  const triggerParams = {
    ...contextWithoutData,
    className: classnames(
      'dnb-step-indicator__trigger',
      createSkeletonClass('font', skeleton)
    ),
    'aria-live': 'polite',
  } as React.HTMLProps<HTMLElement>

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
  validateDOMAttributes(contextWithoutData, triggerParams)

  return (
    <Section
      backgroundColor="var(--step-indicator-trigger-background)"
      innerSpace={{
        top: 'small',
        bottom: 'small',
      }}
      roundedCorner={{
        small: false,
        medium: [true, true, !openState, !openState],
        large: [true, true, !openState, !openState],
      }}
    >
      <HeightAnimation animate={!no_animation}>
        <div {...(triggerParams as React.HTMLProps<HTMLDivElement>)}>
          <span className="dnb-sr-only" id={id + '-overview'}>
            {overview_title}
          </span>
          <FormLabel
            aria-describedby={id}
            forId={id}
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
            id={id}
            wrap
            variant="tertiary"
            icon={chevron_down}
            icon_position="right"
          >
            {(typeof item === 'string' ? item : item && item.title) || ''}
          </Button>
        </div>
      </HeightAnimation>
    </Section>
  )
}

export default StepIndicatorTriggerButton
