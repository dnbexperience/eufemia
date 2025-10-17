/**
 * Web StepIndicator Component
 *
 */

import React, { HTMLProps, useCallback, useContext, useMemo } from 'react'

import classnames from 'classnames'
import { dispatchCustomElementEvent } from '../../shared/component-helper'
import useId from '../../shared/helpers/useId'
import Anchor, { AnchorAllProps } from '../anchor/Anchor'
import Icon, { IconIcon } from '../icon/Icon'
import IconPrimary from '../icon/IconPrimary'
import FormStatus, {
  WarnIcon,
  InfoIcon,
  ErrorIcon,
} from '../form-status/FormStatus'
import StepIndicatorContext from './StepIndicatorContext'
import { stepIndicatorDefaultProps } from './StepIndicatorProps'
import { StepIndicatorMouseEvent } from './StepIndicator'
import Context from '../../shared/Context'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'

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
   * If set to true, this item step will not be clickable. Same as `inactive`, but will also add the `aria-disabled="true"` .
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
  const globalContext = React.useContext(Context)

  const props: StepIndicatorItemProps = useMemo(() => {
    return {
      status_state: status_state_default,
      inactive: inactive_default,
      disabled: globalContext?.formElement?.disabled ?? disabled_default,
      ...restOfProps,
    }
  }, [
    disabled_default,
    inactive_default,
    restOfProps,
    status_state_default,
    globalContext?.formElement?.disabled,
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
        dispatchCustomElementEvent(context, 'on_change', params)
      }
    },
    [context, props]
  )

  const {
    mode,
    activeStep,
    countSteps,
    listOfReachedSteps,
    hide_numbers = stepIndicatorDefaultProps.hide_numbers,
    step_title,
    no_animation,
    skeleton,
  } = context

  const {
    currentItemNum,

    title,
    is_current, // eslint-disable-line
    inactive,
    disabled,
    status,
    status_state = 'warn',

    on_click, // eslint-disable-line
  } = props

  const hasPassedAndIsCurrent =
    mode === 'loose' ||
    currentItemNum <= activeStep ||
    listOfReachedSteps.includes(currentItemNum)

  const isNavigatable = mode === 'strict' || mode === 'loose'

  let isInactive =
    inactive || disabled || (mode === 'strict' && !hasPassedAndIsCurrent)

  const isVisited = currentItemNum < activeStep

  const id = `${useId()}-${currentItemNum}`
  const ariaLabel = step_title
    ?.replace('%step', String(currentItemNum + 1))
    .replace('%count', String(countSteps))

  const isCurrent = currentItemNum === activeStep

  const element = (
    <StepItemWrapper>{title}</StepItemWrapper>
  ) as React.ReactNode

  const itemParams = {} as HTMLProps<HTMLLIElement>
  const buttonParams = {
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
    buttonParams.onClick = (event: never) =>
      onClickHandler({
        event,
        item: props,
        currentItemNum,
      })
  }

  if (!buttonParams.onClick) {
    buttonParams.onClick = undefined
    isInactive = true
  }

  const stateIcons: Record<StepIndicatorStatusState, IconIcon> = {
    info: InfoIcon,
    error: ErrorIcon,
    warn: WarnIcon,
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
      <div
        className={classnames(
          'dnb-step-indicator__item__wrapper',
          !status &&
            isVisited &&
            'dnb-step-indicator__item__wrapper--check'
        )}
      >
        <span
          className={classnames(
            'dnb-step-indicator__item__bullet',
            isCurrent
              ? 'dnb-step-indicator__item__bullet--current'
              : !status &&
                  (isVisited
                    ? 'dnb-step-indicator__item__bullet--check'
                    : 'dnb-step-indicator__item__bullet--empty'),
            createSkeletonClass('shape', skeleton)
          )}
        >
          {status && !isCurrent ? (
            <Icon
              icon={stateIcons[status_state] || stateIcons.warn}
              className="dnb-step-indicator__item__icon"
              size="medium"
              inheritColor={false}
            />
          ) : (
            <IconPrimary
              icon="check"
              className={classnames(
                'dnb-step-indicator__item__icon',
                !isVisited && 'dnb-step-indicator__item__icon--hidden'
              )}
              size="auto"
            />
          )}
        </span>
        <div
          className={classnames(
            'dnb-step-indicator__item-content',
            createSkeletonClass('font', skeleton)
          )}
        >
          {!hide_numbers && (
            <span
              className="dnb-step-indicator__item-content__number"
              aria-hidden
            >
              {`${currentItemNum + 1}.`}
            </span>
          )}
          <div className="dnb-step-indicator__item-content__wrapper">
            <StepItemButton {...buttonParams}>{element}</StepItemButton>
            <FormStatus
              shellSpace={{ top: '1rem' }}
              no_animation={no_animation}
              state={status && status_state}
              variant="outlined"
              className="dnb-step-indicator__item-content__status"
              text={status}
            />
          </div>
        </div>
      </div>
      <span id={id} aria-hidden className="dnb-sr-only">
        {ariaLabel}
      </span>
    </li>
  )
}

export type StepItemButtonProps = AnchorAllProps &
  Pick<StepIndicatorItemProps, 'status' | 'status_state'>

export function StepItemButton({
  children,
  className,
  status,
  status_state = 'warn',
  innerRef,
  ...props
}: StepItemButtonProps) {
  const notClickable = !props.onClick

  return (
    <Anchor
      element={notClickable ? 'span' : 'button'}
      type={notClickable ? undefined : 'button'}
      className={classnames(
        className,
        'dnb-step-indicator__button',
        status &&
          `dnb-step-indicator__button--has-status dnb-step-indicator__button--${status_state}`
      )}
      noStyle={notClickable}
      innerRef={innerRef}
      {...props}
    >
      {children}
    </Anchor>
  )
}

export type StepItemWrapperProps = React.HTMLProps<HTMLElement> & {
  /** Content inside the step button */
  children?: React.ReactNode
  /** @deprecated can only change the render of content inside the button */
  number?: number
  /** @deprecated can only hide numbers in main component */
  hide_numbers?: boolean
  /** @deprecated can only change the render of content inside the button */
  status?: string | React.ReactNode
}

export function StepItemWrapper({ children }: StepItemWrapperProps) {
  return <>{children}</>
}

export default StepIndicatorItem
