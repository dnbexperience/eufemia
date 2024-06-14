/**
 * Web StepIndicator Component
 *
 */

import React, { HTMLProps, useCallback, useContext, useMemo } from 'react'

import classnames from 'classnames'
import {
  makeUniqueId,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import Button, { ButtonProps } from '../button/Button'
import Icon, { IconIcon } from '../icon/Icon'
import { WarnIcon, InfoIcon, ErrorIcon } from '../form-status/FormStatus'
import StepIndicatorContext from './StepIndicatorContext'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import {
  StepIndicatorMouseEvent,
  StepIndicatorRenderCallback,
} from './StepIndicator'

export type StepIndicatorStatusState = 'warn' | 'info' | 'error'
export type StepIndicatorItemProps = Omit<
  React.HTMLProps<HTMLElement>,
  'title' | 'data'
> & {
  title: string | React.ReactNode
  /**
   * If set to true, this item step will be set as the current current selected step. This can be used instead of `current_step` on the component itself.
   */
  is_current?: boolean
  /**
   * If set to true, this item step will be handled as an inactive step and will not be clickable.
   * Defaults to `false`
   */
  inactive?: boolean
  /**
   * If set to true, this item step will be visible as an disabled button and will not be clickable.
   * Defaults to false.
   */
  disabled?: boolean
  /**
   * Is used to set the status text.
   */
  status?: string | React.ReactNode
  /**
   * Used to set the status state to be either `info`, `error` or `warn`.
   * Defaults to `warn`.
   */
  status_state?: StepIndicatorStatusState
  /**
   * Callback function to manipulate or wrap the step item. Has to return a React Node. You receive an object `{ StepItem, element, attributes, props, context }`.
   */
  on_render?: ({
    StepItem,
    element,
    attributes,
    props,
    context,
  }: StepIndicatorRenderCallback) => React.ReactNode
  /**
   * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
   */
  on_click?: ({
    event,
    item,
    current_step,
    currentStep,
  }: StepIndicatorMouseEvent) => void
  currentItemNum: number
}

function StepIndicatorItem({
  status_state: status_state_default = 'warn',
  inactive: inactive_default = false,
  disabled: disabled_default = false,
  ...restOfProps
}: StepIndicatorItemProps) {
  const props: StepIndicatorItemProps = useMemo(() => {
    return {
      status_state: status_state_default,
      inactive: inactive_default,
      disabled: disabled_default,
      ...restOfProps,
    }
  }, [
    disabled_default,
    inactive_default,
    restOfProps,
    status_state_default,
  ])

  const context = useContext(StepIndicatorContext)

  const onClickHandler = useCallback(
    ({ event, item, currentItemNum }) => {
      const params = {
        event,
        item,
        current_step: currentItemNum,
        currentStep: currentItemNum,
      }

      const onClickItem = dispatchCustomElementEvent(
        {
          context,
          props,
          onClickHandler,
        },
        'on_click',
        params
      )

      const onClickGlobal = dispatchCustomElementEvent(
        context,
        'on_click',
        params
      )

      if (onClickItem === false || onClickGlobal === false) {
        return // stop here
      }

      if (context.activeStep !== currentItemNum) {
        context.setActiveStep(currentItemNum)
        if (typeof context.onChangeState === 'function') {
          context.onChangeState()
        }

        dispatchCustomElementEvent(context, 'on_change', params)
      }
    },
    [context, props]
  )

  const {
    mode,
    filterAttributes,
    activeStep,
    countSteps,
    listOfReachedSteps,
    hide_numbers,
    on_item_render,
    sidebar_id,
    step_title,
  } = context

  const {
    currentItemNum,

    title,
    is_current, // eslint-disable-line
    inactive,
    disabled,
    status,
    status_state,

    on_render,
    on_click, // eslint-disable-line

    ...attributes
  } = props

  Object.keys(attributes).forEach((key) => {
    if (filterAttributes.includes(key)) {
      delete attributes[key]
    }
  })

  const hasPassedAndIsCurrent =
    mode === 'loose' ||
    currentItemNum <= activeStep ||
    listOfReachedSteps.includes(currentItemNum)

  const isNavigatable = mode === 'strict' || mode === 'loose'

  let isInactive =
    inactive || (mode === 'strict' && !hasPassedAndIsCurrent)

  const isVisited = currentItemNum < activeStep

  const id = `${sidebar_id || makeUniqueId()}-${currentItemNum}`
  const ariaLabel = step_title
    ?.replace('%step', String(currentItemNum + 1))
    .replace('%count', String(countSteps))

  const isCurrent = currentItemNum === activeStep

  let element = (
    <StepItemWrapper
      number={currentItemNum + 1}
      hide_numbers={hide_numbers}
      status={status}
    >
      {title}
    </StepItemWrapper>
  ) as React.ReactNode

  const callbackProps = {
    StepItem: StepItemWrapper,
    element,
    attributes,
    props,
    context,
  }

  if (typeof on_render === 'function') {
    element = on_render(callbackProps)
  } else if (typeof on_item_render === 'function') {
    element = on_item_render(callbackProps)
  }

  const itemParams = {} as HTMLProps<HTMLLIElement>
  const buttonParams = {
    icon: 'check',
    status,
    status_state,
    'aria-describedby': id,
  } as StepItemButtonProps

  if (isCurrent) {
    itemParams['aria-current'] = 'step'
  }

  if (disabled) {
    buttonParams.disabled = true
  }

  if (isNavigatable && !isInactive) {
    buttonParams.onClick = ({ event }: never) =>
      onClickHandler({
        event,
        item: props,
        currentItemNum,
      })
  }

  if (!buttonParams.onClick) {
    buttonParams.element = 'span'
    buttonParams.type = ''
    buttonParams.on_click = undefined
    isInactive = true
  }

  return (
    <li
      {...itemParams}
      className={classnames(
        'dnb-step-indicator__item',
        isCurrent && 'dnb-step-indicator__item--current',
        isInactive && 'dnb-step-indicator__item--inactive',
        isVisited && 'dnb-step-indicator__item--visited',
        itemParams.className
      )}
    >
      <StepItemButton {...buttonParams}>{element}</StepItemButton>
      <span id={id} aria-hidden className="dnb-sr-only">
        {ariaLabel}
      </span>
    </li>
  )
}

export type StepItemButtonProps = Omit<ButtonProps, 'status_state'> & {
  status_state?: StepIndicatorStatusState
}

export function StepItemButton({
  children,
  className,
  status,
  status_state,
  inner_ref,
  ...props
}: StepItemButtonProps) {
  const icons: Record<StepIndicatorStatusState, IconIcon> = {
    info: InfoIcon,
    error: ErrorIcon,
    warn: WarnIcon,
  }

  if (status) {
    props.icon = (
      <Icon
        icon={icons[status_state] || icons.warn}
        className="dnb-button__icon"
        size="medium"
        inherit_color={false}
      />
    )
  }

  return (
    <Button
      className={classnames(
        className,
        status && 'dnb-step-indicator__button__status',
        status && `dnb-step-indicator__button__status--${status_state}`
      )}
      wrap
      stretch
      variant="secondary"
      icon_size="medium"
      icon_position="right"
      inner_ref={inner_ref}
      {...props}
    >
      <HeightAnimation>{children}</HeightAnimation>
    </Button>
  )
}

export type StepItemWrapperProps = React.HTMLProps<HTMLElement> & {
  children?: React.ReactNode
  number?: number
  /**
   * Define whether to show automatically counted numbers or not. Defaults to `false`.
   */
  hide_numbers?: boolean
  status?: string | React.ReactNode
}

export function StepItemWrapper({
  children,
  number,
  hide_numbers = stepIndicatorDefaultProps.hide_numbers,
  status,
}: StepItemWrapperProps) {
  return (
    <span className="dnb-step-indicator__item-content">
      {!hide_numbers && (
        <span
          aria-hidden // because we provide the hidden aria-describedby
          className="dnb-step-indicator__item-content__number"
        >
          {number}.
        </span>
      )}
      <span className="dnb-step-indicator__item-content__wrapper">
        <span className="dnb-step-indicator__item-content__text">
          {children}
        </span>
        {status && (
          <span className="dnb-step-indicator__item-content__status">
            {status}
          </span>
        )}
      </span>
    </span>
  )
}

export default StepIndicatorItem
