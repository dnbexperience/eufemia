/**
 * Web Slider Component
 *
 */

import React from 'react'
import classnames from 'classnames'
import { isTrue } from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  createSkeletonClass,
  skeletonDOMAttributes,
} from '../skeleton/SkeletonHelper'

import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'
import Button from '../button/Button'
import FormLabel from '../form-label/FormLabel'
import FormStatus from '../form-status/FormStatus'

import {
  SliderMainTrack,
  SliderTrackAfter,
  SliderTrackBefore,
} from './SliderTrack'
import { SliderThumb } from './SliderThumb'
import { useSliderProps } from './hooks/useSliderProps'
import { clamp, getHumanNumber } from './SliderHelpers'

export function SliderInstance() {
  const context = React.useContext(Context)

  const { isReverse, isVertical, showButtons, showStatus, allProps } =
    useSliderProps()

  const {
    id,
    label,
    labelSrOnly,
    labelDirection,
    status,
    statusProps,
    statusState,
    statusNoAnimation,
    globalStatusId,
    stretch,
    skeleton,
    disabled,
    className,
  } = allProps

  const mainParams = {
    className: classnames(
      'dnb-slider',
      isVertical && 'dnb-slider--vertical',
      disabled && 'dnb-slider__state--disabled',
      !showButtons && 'dnb-slider--no-buttons',
      isTrue(stretch) && 'dnb-slider--stretch',
      label && labelDirection && `dnb-slider__label--${labelDirection}`,
      showStatus && 'dnb-slider__form-status',
      status && `dnb-slider__status--${statusState}`,
      'dnb-form-component',
      createSkeletonClass(null, skeleton),
      createSpacingClasses(allProps),
      className
    ),
  }

  const subtractButton = showButtons ? <SubtractButton /> : null
  const addButton = showButtons ? <AddButton /> : null

  skeletonDOMAttributes(mainParams, skeleton, context)

  return (
    <span {...mainParams}>
      {label && (
        // do not use "for_id" as the ID element is not a fo
        <FormLabel
          id={id + '-label'}
          text={label}
          disabled={disabled}
          skeleton={skeleton}
          label_direction={labelDirection}
          sr_only={labelSrOnly}
        />
      )}

      <span className="dnb-slider__wrapper">
        <AlignmentHelper />

        <FormStatus
          show={showStatus}
          id={id + '-form-status'}
          global_status_id={globalStatusId}
          label={label}
          text_id={id + '-status'} // used for "aria-describedby"
          text={status}
          status={statusState}
          no_animation={statusNoAnimation}
          skeleton={skeleton}
          {...statusProps}
        />

        <span className="dnb-slider__inner">
          {showButtons && (isReverse ? addButton : subtractButton)}

          <SliderMainTrack>
            <SliderThumb />
            <SliderTrackBefore />
            <SliderTrackAfter />
          </SliderMainTrack>

          {showButtons && (isReverse ? subtractButton : addButton)}

          <SliderSuffix />
        </span>
      </span>
    </span>
  )
}

function SliderSuffix() {
  const { allProps } = useSliderProps()
  const { id, suffix } = allProps

  return suffix ? (
    <Suffix
      className="dnb-slider__suffix"
      id={id + '-suffix'} // used for "aria-describedby"
      context={allProps}
    >
      {suffix}
    </Suffix>
  ) : null
}

function SubtractButton() {
  const { emitChange, value, isReverse, attributes, allProps } =
    useSliderProps()
  const {
    step,
    min,
    max,
    disabled,
    skeleton,
    subtractTitle,
    numberFormat,
  } = allProps

  const onSubtractClickHandler = (event: MouseEvent | TouchEvent) => {
    let newValue = clamp((value as number) - (step || 1), min, max)

    if (isReverse) {
      newValue = max - newValue
    }

    emitChange(event, newValue)
  }

  const subtractParams = {}

  if (typeof attributes['aria-hidden'] !== 'undefined') {
    subtractParams['aria-hidden'] = attributes['aria-hidden']
  }

  const humanNumber = getHumanNumber(value as number, numberFormat)

  return (
    <Button
      className="dnb-slider__button dnb-slider__button--subtract"
      variant="secondary"
      icon="subtract"
      size="small"
      aria-label={subtractTitle?.replace('%s', humanNumber)}
      on_click={onSubtractClickHandler}
      disabled={disabled}
      skeleton={skeleton}
      {...subtractParams}
    />
  )
}

function AddButton() {
  const { emitChange, value, isReverse, attributes, allProps } =
    useSliderProps()
  const { step, min, max, disabled, skeleton, addTitle, numberFormat } =
    allProps

  const onAddClickHandler = (event: MouseEvent | TouchEvent) => {
    let newValue = clamp((value as number) + (step || 1), min, max)

    if (isReverse) {
      newValue = max - newValue
    }

    emitChange(event, newValue)
  }

  const addParams = {}

  if (typeof attributes['aria-hidden'] !== 'undefined') {
    addParams['aria-hidden'] = attributes['aria-hidden']
  }

  const humanNumber = getHumanNumber(value as number, numberFormat)

  return (
    <Button
      className="dnb-slider__button dnb-slider__button--add"
      variant="secondary"
      icon="add"
      size="small"
      aria-label={addTitle?.replace('%s', humanNumber)}
      on_click={onAddClickHandler}
      disabled={disabled}
      skeleton={skeleton}
      {...addParams}
    />
  )
}
