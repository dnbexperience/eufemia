import React from 'react'
import classnames from 'classnames'
import { warn, isTrue, makeUniqueId } from '../../shared/component-helper'

export class deprecated_v1 {
  constructor(inst) {
    for (let i in inst) {
      this[i] = inst[i]
    }

    const {
      filterAttributes,
      activeStep,
      countSteps,
      listOfReachedSteps,

      step_title,

      use_navigation, // Deprecated
      hide_numbers,
      on_item_render,
    } = this.context

    const {
      currentItemNum,

      url: _url, // Deprecated
      url_future, // Deprecated
      url_passed, // Deprecated

      inactive, // eslint-disable-line
      is_active,
      is_current,
      title,

      on_render,

      on_click, // eslint-disable-line
      on_change, // eslint-disable-line

      ...attributes
    } = this.props

    const id =
      (this.context.internalId || makeUniqueId()) + '-' + currentItemNum

    Object.keys(attributes).forEach((key) => {
      if (filterAttributes.includes(key)) {
        delete attributes[key]
      }
    })

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
      if (currentItemNum > activeStep) {
        url = url_future
        hasPassedAndIsCurrent = true
      }
      if (url_passed && currentItemNum < activeStep) {
        url = url_passed
        hasPassedAndIsCurrent = true
      }
    }

    if (currentItemNum <= activeStep) {
      hasPassedAndIsCurrent = true
    }
    if (listOfReachedSteps.includes(currentItemNum)) {
      hasPassedAndIsCurrent = true
    }

    if (
      !hasPassedAndIsCurrent &&
      currentItemNum > activeStep &&
      !isTrue(is_active)
    ) {
      attributes['disabled'] = true
      attributes['aria-disabled'] = true
    }
    attributes.className = classnames(
      'dnb-anchor',
      attributes['disabled'] && 'dnb-anchor--no-style',
      'dnb-step-indicator__item-content',
      'dnb-step-indicator__item-content--link'
    )
    const aria = step_title
      ?.replace('%step', currentItemNum + 1)
      .replace('%count', countSteps)

    const StepItemWrapper = (props) => (
      <>
        {!isTrue(hide_numbers) && (
          <span
            className="dnb-step-indicator__item-content--number"
            {...props}
          >
            {`${currentItemNum + 1}. `}
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
      element: itemComponent,
      params: attributes,
      attributes,
      props: this.props,
      context: this.context,
    }

    if (typeof on_render === 'function') {
      itemComponent = on_render(props)
    } else if (typeof on_item_render === 'function') {
      itemComponent = on_item_render(props)
    }

    let child = null
    if (
      // Deprecated
      isTrue(use_navigation)
    ) {
      child = (
        <button
          type="button"
          aria-describedby={id}
          onClick={(event) =>
            this.onClickHandler({
              event,
              item: props,
              currentItemNum,
            })
          }
          {...attributes}
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
          aria-describedby={id}
          onClick={(event) =>
            this.onClickHandler({
              event,
              item: props,
              currentItemNum,
            })
          }
          {...attributes}
        >
          {itemComponent}
        </a>
      )
    } else {
      const contentParams = {}

      // To screen readers read both the nr. and the text in one sentence
      contentParams.role = 'text'

      child = (
        <span
          className="dnb-step-indicator__item-content dnb-step-indicator__item-content--static"
          aria-describedby={id}
          {...contentParams}
        >
          {itemComponent}
        </span>
      )
    }

    const itemParams = {}
    if (currentItemNum === activeStep || isTrue(is_current)) {
      itemParams['aria-current'] = 'step'
    }

    return (
      <li
        className={classnames(
          'dnb-step-indicator__item',
          currentItemNum === activeStep || isTrue(is_current)
            ? 'dnb-step-indicator--active'
            : null,
          currentItemNum < activeStep
            ? 'dnb-step-indicator--visited'
            : null
        )}
        {...itemParams}
      >
        {child}
        <span id={id} aria-hidden className="dnb-sr-only">
          {aria}
        </span>
      </li>
    )
  }
}
