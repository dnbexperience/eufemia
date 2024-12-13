/**
 * Web StepIndicator Component
 *
 */

import classnames from 'classnames'
import React, { useContext, useRef } from 'react'
import Button, { ButtonProps } from '../button/Button'
import chevron_down from '../../icons/chevron_down'
import chevron_up from '../../icons/chevron_up'
import {
  validateDOMAttributes,
  combineDescribedBy,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import { createSpacingClasses } from '../space/SpacingHelper'
import FormLabel from '../form-label/FormLabel'
import StepIndicatorContext from './StepIndicatorContext'
import { StepItemWrapper } from './StepIndicatorItem'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'

export type StepIndicatorTriggerButtonProps = ButtonProps & {
  /**
   * <em>(required)</em> a unique string-based ID in order to bind together the main component and the sidebar (`<StepIndicator.Sidebar />`). Both have to get the same ID.
   */
  sidebar_id?: string
  className?: string
  inner_ref?: React.RefObject<HTMLAnchorElement>
}
function StepIndicatorTriggerButton(
  props: StepIndicatorTriggerButtonProps
) {
  const context = useContext(StepIndicatorContext)

  const item = context.data[context.activeStep || 0]
  const label = context.stepsLabel

  const {
    data, // eslint-disable-line
    ...contextWithoutData
  } = context

  const triggerParams = {
    ...contextWithoutData,
    className: classnames(
      'dnb-step-indicator__trigger',
      createSkeletonClass('font', context.skeleton)
    ),
    'aria-live': 'polite',
  } as React.HTMLProps<HTMLElement>

  const buttonParams = {
    ...props,
    className: classnames(
      'dnb-step-indicator__trigger__button',
      props.className
    ),
  }

  buttonParams['aria-describedby'] = combineDescribedBy(
    buttonParams,
    context.sidebar_id + '-overview'
  )

  Object.keys(triggerParams).forEach((key) => {
    if (context.filterAttributes.includes(key)) {
      delete triggerParams[key]
    }
  })

  skeletonDOMAttributes(triggerParams, context.skeleton)

  // also used for code markup simulation
  validateDOMAttributes(context, triggerParams)

  return (
    <div {...(triggerParams as React.HTMLProps<HTMLDivElement>)}>
      <span className="dnb-sr-only" id={context.sidebar_id + '-overview'}>
        {context.overview_title}
      </span>
      <FormLabel
        aria-describedby={context.sidebar_id}
        className="dnb-step-indicator__label"
        right="x-small"
      >
        {label}
      </FormLabel>
      <Button
        {...buttonParams}
        wrap
        variant="tertiary"
        icon={context.openState ? chevron_up : chevron_down}
        icon_position="right"
        inner_ref={props.inner_ref}
      >
        <StepItemWrapper
          number={(context.activeStep || 0) + 1}
          hide_numbers={context.hide_numbers}
        >
          {(typeof item === 'string' ? item : item && item.title) || ''}
        </StepItemWrapper>
      </Button>
    </div>
  )
}

export default StepIndicatorTriggerButton
