/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import AnimateHeight from '../../shared/AnimateHeight'
import Button from '../button/Button'
import Icon from '../icon/Icon'
import {
  WarnIcon,
  InfoIcon,
  ErrorIcon,
} from '../../components/form-status/FormStatus'
import EventEmitter from '../../shared/EventEmitter'
import StepIndicatorContext from './StepIndicatorContext'

// Deprecated
import { deprecated_v1 } from './StepIndicatorItem-v1'

export default class StepIndicatorItem extends React.PureComponent {
  static contextType = StepIndicatorContext

  static propTypes = {
    mode: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node])
      .isRequired,
    step_title: PropTypes.string,
    hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    on_item_render: PropTypes.func,
    on_change: PropTypes.func,

    on_render: PropTypes.func,
    on_click: PropTypes.func,

    is_current: PropTypes.bool,
    inactive: PropTypes.bool,
    disabled: PropTypes.bool,
    status: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    status_state: PropTypes.oneOf(['warn', 'info', 'error']),

    currentItemNum: PropTypes.number.isRequired,

    /* Deprecated */
    use_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    /* Deprecated */
    is_active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /* Deprecated */
    url: PropTypes.string,
    /* Deprecated */
    url_future: PropTypes.string,
    /* Deprecated */
    url_passed: PropTypes.string,
  }

  static defaultProps = {
    mode: null,
    step_title: '%step',
    hide_numbers: false,

    on_item_render: null,
    on_change: null,

    on_render: null,
    on_click: null,

    is_current: null,
    inactive: null,
    disabled: null,
    status: null,
    status_state: 'warn',

    /* Deprecated */
    use_navigation: null,
    /* Deprecated */
    is_active: null,
    /* Deprecated */
    url: null,
    /* Deprecated */
    url_future: null,
    /* Deprecated */
    url_passed: null,
  }

  constructor(props, context) {
    super(props)

    this._eventEmitter = EventEmitter.createInstance(context.sidebar_id)
    this._heightAnim = new AnimateHeight({
      animate: !isTrue(context.no_animation),
    })
    this._ref = React.createRef()
  }

  componentDidMount() {
    this._heightAnim.setElement(this._ref.current)
    this._prevStep = this.context.activeStep
  }

  componentWillUnmount() {
    this._heightAnim.remove()
    this._eventEmitter.remove()
  }

  getSnapshotBeforeUpdate() {
    return this._heightAnim.getHeight()
  }

  componentDidUpdate(a, b, height) {
    if (
      this._prevStep !== this.context.activeStep &&
      (this.props.currentItemNum === this._prevStep ||
        this.props.currentItemNum === this.context.activeStep)
    ) {
      const toHeight = this._heightAnim.getUnknownHeight()
      if (height !== toHeight) {
        this._heightAnim.adjustTo(height, toHeight)
      }
    }
    this._prevStep = this.context.activeStep
  }

  onClickHandler = ({ event, item, currentItemNum }) => {
    const params = {
      event,
      item,
      current_step: currentItemNum,
      currentStep: currentItemNum,
      currentItem: currentItemNum, // deprecated
    }
    const onClickItem = dispatchCustomElementEvent(
      this,
      'on_click',
      params
    )
    const onClickGlobal = dispatchCustomElementEvent(
      this.context,
      'on_click',
      params
    )
    if (onClickItem === false || onClickGlobal === false) {
      return // stop here
    }

    if (this.context.activeStep !== currentItemNum) {
      this.context.setActiveStep(currentItemNum)
      if (typeof this.context.onChangeState === 'function') {
        this.context.onChangeState(currentItemNum)
      }

      dispatchCustomElementEvent(this.context, 'on_change', params)
    }
  }

  // Deprecated warning
  canWarn = () =>
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'

  render() {
    // Deprecated
    if (this.context.isV1) {
      return new deprecated_v1(this)
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
    } = this.context

    const {
      currentItemNum,

      title,
      is_current,
      is_active, // Deprecated
      inactive,
      disabled,
      status,
      status_state,

      on_render,
      on_click, // eslint-disable-line
      on_change, // eslint-disable-line

      ...attributes
    } = this.props

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
      isTrue(inactive) ||
      is_active === false /* deprecated */ ||
      (mode === 'strict' && !hasPassedAndIsCurrent)
    let isVisited = currentItemNum < activeStep // mode === 'strict' &&

    const id = `${sidebar_id || makeUniqueId()}-${currentItemNum}`
    const ariaLabel = step_title
      ?.replace('%step', currentItemNum + 1)
      .replace('%count', countSteps)

    const isCurrent = currentItemNum === activeStep || isTrue(is_current)
    let element = (
      <StepItemWrapper
        number={currentItemNum + 1}
        hide_numbers={hide_numbers}
        status={status}
        status_state={status_state}
      >
        {title}
      </StepItemWrapper>
    )

    const callbackProps = {
      StepItem: StepItemWrapper,
      element,
      attributes,
      props: this.props,
      context: this.context,
    }

    if (typeof on_render === 'function') {
      element = on_render(callbackProps)
    } else if (typeof on_item_render === 'function') {
      element = on_item_render(callbackProps)
    }

    const itemParams = {}
    const buttonParams = {
      icon: 'check',
      status,
      status_state,
      'aria-describedby': id,
    }

    if (isCurrent) {
      itemParams['aria-current'] = 'step'
    }

    if (isTrue(disabled)) {
      buttonParams['disabled'] = true
    }

    if (
      (isNavigateable && !isInactive) ||
      // Deprecated
      isTrue(this.context.use_navigation)
    ) {
      buttonParams.onClick = (event) =>
        this.onClickHandler({
          event,
          item: this.props,
          currentItemNum,
        })
    }

    if (!buttonParams.onClick) {
      buttonParams.element = 'span'
      buttonParams.type = ''
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
        <StepItemButton {...buttonParams} inner_ref={this._ref}>
          {element}
        </StepItemButton>
        <span id={id} aria-hidden className="dnb-sr-only">
          {ariaLabel}
        </span>
      </li>
    )
  }
}

export const StepItemButton = ({
  children,
  className,
  status,
  status_state,
  inner_ref,
  ...props
}) => {
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
    props.icon = (
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
      {...props}
    >
      {children}
    </Button>
  )
}
StepItemButton.propTypes = {
  children: PropTypes.node,
  inner_ref: PropTypes.object,
  className: PropTypes.string,
  status: PropTypes.string,
  status_state: PropTypes.string,
}
StepItemButton.defaultProps = {
  children: null,
  inner_ref: null,
  className: null,
  status: null,
  status_state: null,
}

export const StepItemWrapper = ({
  children,
  number,
  hide_numbers,
  status,
}) => {
  return (
    <span className="dnb-step-indicator__item-content">
      {!isTrue(hide_numbers) && (
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
StepItemWrapper.propTypes = {
  children: PropTypes.node,
  number: PropTypes.number,
  hide_numbers: PropTypes.bool,
  status: PropTypes.string,
}
StepItemWrapper.defaultProps = {
  children: null,
  number: null,
  hide_numbers: null,
  status: null,
}
