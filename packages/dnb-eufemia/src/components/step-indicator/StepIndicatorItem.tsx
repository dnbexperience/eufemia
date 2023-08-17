/**
 * Web StepIndicator Component
 *
 */

import React, {
  HTMLProps,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import classnames from 'classnames'
import {
  makeUniqueId,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import HeightAnimationInstance from '../height-animation/HeightAnimationInstance'
import Button, { ButtonProps } from '../button/Button'
import Icon, { IconIcon } from '../icon/Icon'
import { WarnIcon, InfoIcon, ErrorIcon } from '../form-status/FormStatus'
import StepIndicatorContext from './StepIndicatorContext'
import { StepIndicatorMode } from './StepIndicator'

export type StepIndicatorStatusState = 'warn' | 'info' | 'error'
export type StepIndicatorItemProps = React.HTMLProps<HTMLElement> & {
  /**
   * <em>(required)</em> defines how the StepIndicator should work. Use `static` for non-interactive steps. Use `strict` for a chronological step order, also, the user can navigate between visited steps. Use `loose` if the user should be able to navigate freely.
   */
  mode?: StepIndicatorMode
  title: string | React.ReactNode
  step_title?: string
  /**
   * Define whether to show automatically counted numbers or not. Defaults to `false`.
   */
  hide_numbers?: boolean
  /**
   * Callback function to manipulate or wrap every item. Has to return a React Node. You receive an object you can use in your custom HOC `{ StepItem, element, attributes, props, context }`.
   */
  on_item_render?: (...args: any[]) => any
  /**
   * Will be called once the user visits actively a new step. Will be emitted only once. Returns an object `{ event, item, current_step }`.
   */
  on_change?: (...args: any[]) => any
  on_render?: (...args: any[]) => any
  /**
   * Will be called once the user clicks on the current or another step. Will be emitted on every click. Returns an object `{ event, item, current_step }`.
   */
  on_click?: (...args: any[]) => any
  is_current?: boolean
  inactive?: boolean
  disabled?: boolean
  status?: string | React.ReactNode
  status_state?: StepIndicatorStatusState
  currentItemNum: number
}

function StepIndicatorItem({
  step_title: step_title_prop = '%step',
  hide_numbers: hide_numbers_prop = false,
  status_state: status_state_prop = 'warn',
  ...restOfProps
}: StepIndicatorItemProps) {
  const props = {
    step_title: step_title_prop,
    hide_numbers: hide_numbers_prop,
    status_state: status_state_prop,
    ...restOfProps,
  }

  const context = useContext(StepIndicatorContext)

  const [previousStep, setPreviousStep] = useState<number>(
    context.activeStep
  )

  const heightAnim = useRef(
    new HeightAnimationInstance({
      animate:
        context?.no_animation !== undefined ? context.no_animation : false,
    })
  ).current

  const ref = useRef(null)

  const thisReference = {
    context,
    props,
    onClickHandler,
  }

  // Mount and Dismount
  useEffect(() => {
    heightAnim.setElement(ref.current)

    return () => {
      heightAnim.remove()
    }
  }, [])

  // Effect used to keep track of previous activeStep from context
  useEffect(() => {
    if (previousStep !== context.activeStep) {
      setPreviousStep(context.activeStep)
    }
  }, [context.activeStep])

  useLayoutEffect(() => {
    const height = heightAnim.getHeight()

    if (
      previousStep !== context.activeStep &&
      (props.currentItemNum === previousStep ||
        props.currentItemNum === context.activeStep)
    ) {
      const toHeight = heightAnim.getUnknownHeight()
      if (height !== toHeight) {
        heightAnim.adjustTo(height, toHeight)
      }
    }
  }, [previousStep, context.activeStep, heightAnim, props.currentItemNum])

  function onClickHandler({ event, item, currentItemNum }) {
    const params = {
      event,
      item,
      current_step: currentItemNum,
      currentStep: currentItemNum,
    }

    const onClickItem = dispatchCustomElementEvent(
      thisReference,
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
        context.onChangeState(currentItemNum)
      }

      dispatchCustomElementEvent(context, 'on_change', params)
    }
  }

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
    is_current,
    inactive,
    disabled,
    status,
    status_state,

    on_render,
    on_click, // eslint-disable-line
    on_change, // eslint-disable-line

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
  const isNavigateable = mode === 'strict' || mode === 'loose'
  let isInactive =
    inactive || (mode === 'strict' && !hasPassedAndIsCurrent)
  const isVisited = currentItemNum < activeStep

  const id = `${sidebar_id || makeUniqueId()}-${currentItemNum}`
  const ariaLabel = step_title
    ?.replace('%step', currentItemNum + 1)
    .replace('%count', countSteps)

  const isCurrent =
    currentItemNum === activeStep ||
    (is_current && isNaN(parseFloat(activeStep)))

  let element = (
    <StepItemWrapper
      number={currentItemNum + 1}
      hide_numbers={hide_numbers}
      status={status}
    >
      {title}
    </StepItemWrapper>
  )

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

  if (isNavigateable && !isInactive) {
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
      <StepItemButton {...buttonParams} inner_ref={ref}>
        {element}
      </StepItemButton>
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
  let iconElement: IconIcon

  if (status) {
    let icon = null
    switch (status_state) {
      case 'info':
        icon = InfoIcon
        break
      case 'error':
        icon = ErrorIcon
        break
      case 'warn':
      default:
        icon = WarnIcon
        break
    }

    iconElement = (
      <Icon
        icon={icon}
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
      icon={iconElement}
      {...props}
    >
      {children}
    </Button>
  )
}

export type StepItemWrapperProps = {
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
  hide_numbers = false,
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
