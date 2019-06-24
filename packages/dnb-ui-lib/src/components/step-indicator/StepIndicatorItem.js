/**
 * Web StepIndicator Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { Dummy } from '../tabs/Tabs'

export default class StepItem extends PureComponent {
  static propTypes = {
    activeItem: PropTypes.number.isRequired,
    currentItem: PropTypes.number.isRequired,
    hide_numbers: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    use_navigation: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    on_item_render: PropTypes.func,
    on_render: PropTypes.func,
    on_click: PropTypes.func,
    on_change: PropTypes.func,
    setActimeItem: PropTypes.func,
    hasReached: PropTypes.array,
    is_active: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    is_current: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    url: PropTypes.string,
    url_future: PropTypes.string,
    url_passed: PropTypes.string,
    title: PropTypes.string.isRequired
  }
  static defaultProps = {
    on_item_render: null,
    on_render: null,
    on_click: null,
    on_change: null,
    setActimeItem: null,
    hasReached: [],
    hide_numbers: false,
    use_navigation: false,
    is_active: null,
    is_current: null,
    url: null,
    url_future: null,
    url_passed: null
  }

  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }

  onClickHandler = ({ event, item, currentItem }) => {
    const {
      use_navigation,
      on_click,
      on_change,
      setActimeItem
    } = this.props
    const params = {
      event,
      item,
      currentItem
    }
    if (isTrue(use_navigation) && typeof setActimeItem === 'function') {
      setActimeItem(currentItem)
    }
    if (typeof on_click === 'function') {
      const res = dispatchCustomElementEvent(this, 'on_click', params)
      if (res === false) {
        return
      }
    }
    if (typeof on_change === 'function') {
      dispatchCustomElementEvent(this, 'on_change', params)
    }

    // because we use a button, the button will normally stay in focus after click
    // but we don't want this, so we blur after the click
    if (this._ref.current) {
      this._ref.current.blur()
    }
  }

  render() {
    const {
      activeItem,
      currentItem,
      is_active,
      is_current,
      url: _url,
      url_future,
      url_passed,
      hide_numbers,
      title,
      use_navigation,
      on_item_render,
      on_render,
      on_click, // eslint-disable-line
      on_change, // eslint-disable-line
      setActimeItem, // eslint-disable-line
      hasReached,
      ...rest
    } = this.props

    let hasPassedAndIsCurrent = isTrue(is_active)
    let url = _url

    if (_url) {
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

    const params = {
      ...rest
    }
    if (currentItem == activeItem || isTrue(is_current)) {
      params['aria-current'] = 'step'
    }
    if (
      !hasPassedAndIsCurrent &&
      currentItem > activeItem &&
      !isTrue(is_active)
    ) {
      params['aria-disabled'] = true
    }

    const StepItemWrapper = props => (
      <>
        {!isTrue(hide_numbers) && (
          <span
            className="dnb-step-indicator__item-content--number"
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
          <Dummy>{title}</Dummy>
        </span>
      </>
    )
    let itemComponent = <StepItemWrapper />

    const props = {
      StepItem: StepItemWrapper,
      itemComponent,
      params,
      props: this.props
    }

    if (typeof on_render === 'function') {
      itemComponent = on_render(props)
    } else if (typeof on_item_render === 'function') {
      itemComponent = on_item_render(props)
    }

    let child = null
    if (hasPassedAndIsCurrent && isTrue(use_navigation)) {
      child = (
        <button
          className="dnb-anchor dnb-step-indicator__item-content dnb-step-indicator__item-content--link"
          onClick={event =>
            this.onClickHandler({ event, item: this.props, currentItem })
          }
          {...params}
          ref={this._ref}
        >
          {itemComponent}
        </button>
      )
    } else if (hasPassedAndIsCurrent && url) {
      child = (
        <a
          className="dnb-anchor dnb-step-indicator__item-content dnb-step-indicator__item-content--link"
          href={url}
          onClick={event =>
            this.onClickHandler({ event, item: this.props, currentItem })
          }
          {...params}
        >
          {itemComponent}
        </a>
      )
    } else {
      // to screen readers read both the nr. and the text in one sentence
      params.role = 'text'
      child = (
        <span
          className="dnb-step-indicator__item-content dnb-step-indicator__item-content--static"
          {...params}
        >
          {itemComponent}
        </span>
      )
    }

    return (
      <li
        // In case we do not use the role="tab" - we could use aria-current instead of aria-selected
        // role="tab"
        // aria-selected={i === activeItem}
        className={classnames(
          'dnb-step-indicator__item',
          currentItem === activeItem || isTrue(props.current)
            ? 'dnb-step-indicator--active'
            : null,
          currentItem < activeItem ? 'dnb-step-indicator--visited' : null
        )}
      >
        {child}
      </li>
    )
  }
}
