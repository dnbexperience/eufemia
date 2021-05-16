/**
 * Web StepIndicator Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
  isTrue,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { IS_MAC } from '../../shared/helpers'
// import { Dummy } from '../tabs/Tabs'

export default class StepIndicatorItem extends React.PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    step_title: PropTypes.string,
    hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    use_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]), // Deprecated
    enable_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    on_item_render: PropTypes.func,

    on_render: PropTypes.func,
    on_click: PropTypes.func,
    on_change: PropTypes.func,

    currentItem: PropTypes.number.isRequired,
    activeItem: PropTypes.number,
    setActiveItem: PropTypes.func,
    hasReached: PropTypes.array,
    countSteps: PropTypes.number,
    is_active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    is_current: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    // Deprecated
    url: PropTypes.string, // Deprecated
    // /* Deprecated */
    url_future: PropTypes.string, // Deprecated
    // /* Deprecated */
    url_passed: PropTypes.string, // Deprecated
  }
  static defaultProps = {
    step_title: '%step',
    on_item_render: null,
    hide_numbers: false,
    use_navigation: null, // Deprecated
    enable_navigation: null,

    on_render: null,
    on_click: null,
    on_change: null,

    activeItem: null,
    setActiveItem: null,
    hasReached: [],
    countSteps: null,
    is_active: null,
    is_current: null,

    /* Deprecated */
    url: null, // Deprecated
    // /* Deprecated */
    url_future: null, // Deprecated
    // /* Deprecated */
    url_passed: null, // Deprecated
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  onClickHandler = ({ event, item, currentItem }) => {
    // Deprecated
    const { use_navigation } = this.props
    const { enable_navigation, on_click, setActiveItem } = this.props
    const params = {
      event,
      item,
      currentItem,
    }
    if (
      // Deprecated
      (isTrue(use_navigation) || isTrue(enable_navigation)) &&
      typeof setActiveItem === 'function'
    ) {
      setActiveItem(currentItem)
    }

    const res = dispatchCustomElementEvent(this, 'on_click', params)
    if (typeof on_click === 'function' && res === false) {
      return
    }

    dispatchCustomElementEvent(this, 'on_change', params)

    // because we use a button, the button will normally stay in focus after click
    // but we don't want this, so we blur after the click
    if (this._ref.current) {
      this._ref.current.blur()
    }
  }

  // Deprecated warning
  canWarn = () =>
    typeof process !== 'undefined' &&
    process.env.NODE_ENV === 'development'

  render() {
    const {
      activeItem,
      currentItem,
      countSteps,
      is_active,
      is_current,
      url: _url, // Deprecated
      url_future, // Deprecated
      url_passed, // Deprecated
      hide_numbers,
      title,
      step_title,
      use_navigation, // Deprecated
      enable_navigation,
      on_item_render,
      on_render,
      on_click, // eslint-disable-line
      on_change, // eslint-disable-line
      setActiveItem, // eslint-disable-line
      hasReached,
      ...rest
    } = this.props

    let hasPassedAndIsCurrent = isTrue(is_active)

    // Deprecated
    let url = _url
    if (_url) {
      // deprecated warning
      if (this.canWarn()) {
        warn(
          'StepIndicator: "url", "url_future" and "url_passed" are deprecated. You will have to handle your URLs by yourself in the next major version.'
        )
      }
      if (currentItem > activeItem) {
        url = url_future
        hasPassedAndIsCurrent = true
      }
      if (url_passed && currentItem < activeItem) {
        url = url_passed
        hasPassedAndIsCurrent = true
      }
    }

    if (currentItem <= activeItem) {
      hasPassedAndIsCurrent = true
    }
    if (hasReached.includes(currentItem)) {
      hasPassedAndIsCurrent = true
    }

    const interactiveParams = { ...rest }
    if (
      !hasPassedAndIsCurrent &&
      currentItem > activeItem &&
      !isTrue(is_active)
    ) {
      interactiveParams['disabled'] = true
      interactiveParams['aria-disabled'] = true
    }
    interactiveParams.className = classnames(
      'dnb-anchor',
      interactiveParams['disabled'] && 'dnb-anchor--no-style',
      'dnb-step-indicator__item-content',
      'dnb-step-indicator__item-content--link'
    )
    const aria = step_title
      .replace('%step', currentItem + 1)
      .replace('%count', countSteps)

    const StepItemWrapper = (props) => (
      <>
        {!isTrue(hide_numbers) && (
          <span
            className="dnb-step-indicator__item-content--number"
            aria-label={aria}
            {...props}
          >
            {`${currentItem + 1}. `}
          </span>
        )}
        <span
          className="dnb-step-indicator__item-content--text"
          {...props}
        >
          {title}
        </span>
      </>
    )

    let itemComponent = <StepItemWrapper />

    const props = {
      StepItem: StepItemWrapper,
      itemComponent,
      params: rest,
      props: this.props,
    }

    if (typeof on_render === 'function') {
      itemComponent = on_render(props)
    } else if (typeof on_item_render === 'function') {
      itemComponent = on_item_render(props)
    }

    let child = null
    if (
      // Deprecated
      isTrue(use_navigation) ||
      isTrue(enable_navigation)
    ) {
      child = (
        <button
          type="button"
          onClick={(event) =>
            this.onClickHandler({ event, item: this.props, currentItem })
          }
          {...interactiveParams}
          ref={this._ref}
        >
          {itemComponent}
        </button>
      )
      // Deprecated
    } else if (url) {
      child = (
        <a
          href={url}
          onClick={(event) =>
            this.onClickHandler({ event, item: this.props, currentItem })
          }
          {...interactiveParams}
        >
          {itemComponent}
        </a>
      )
    } else {
      const contentParams = {}

      // To screen readers read both the nr. and the text in one sentence
      if (IS_MAC) {
        contentParams.role = 'text'
      }

      child = (
        <span
          className="dnb-step-indicator__item-content dnb-step-indicator__item-content--static"
          {...contentParams}
        >
          {itemComponent}
        </span>
      )
    }

    const itemParams = {}
    if (currentItem === activeItem || isTrue(is_current)) {
      itemParams['aria-current'] = 'step'
    }

    return (
      <li
        className={classnames(
          'dnb-step-indicator__item',
          currentItem === activeItem || isTrue(is_current)
            ? 'dnb-step-indicator--active'
            : null,
          currentItem < activeItem ? 'dnb-step-indicator--visited' : null
        )}
        {...itemParams}
      >
        {child}
      </li>
    )
  }
}
