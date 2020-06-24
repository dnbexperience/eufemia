/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  // warn,
  isTrue
} from '../../shared/component-helper'
// import { IS_IE11, IS_EDGE } from '../../shared/helpers'
import classnames from 'classnames'
import keycode from 'keycode'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

const propTypes = {
  title: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.string,
  icon_size: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

const defaultProps = {
  title: null,
  icon: null,
  icon_position: null,
  icon_size: null,

  // React props
  className: null,
  children: null
}

export default class AccordionHeader extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = AccordionContext

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
      case 'space':
        this.onClickHandler(event)
        break
    }
  }

  onClickHandler = (event) => {
    const { id, group } = this.context
    const expanded = !this.context.expanded

    this.context.callOnChange({ id, group, expanded, event })
  }

  render() {
    const { children, className, ...rest } = this.props

    const {
      id,
      expanded,
      disabled,
      prerendered // eslint-disable-line
    } = this.context

    const headerParams = {
      disabled,
      className: classnames(
        'dnb-accordion__header',
        // expanded && 'dnb-accordion__content--expanded',
        createSpacingClasses(rest),
        className
      ),
      ...rest
    }

    // legacy borwer support
    headerParams.id = `${id}-header`
    headerParams['aria-controls'] = `${id}-content`

    // use div, only to make it easier to style (legacy borwer support)
    headerParams.role = 'button'
    headerParams.tabIndex = '0'

    if (isTrue(expanded)) {
      headerParams['aria-expanded'] = true
    }

    if (isTrue(disabled)) {
      headerParams.tabIndex = '-1' // make the "button" not accessible for keyboard?
      headerParams.disabled = true
      headerParams['aria-disabled'] = true
    } else {
      headerParams.onClick = this.onClickHandler
      headerParams.onKeyDown = this.onKeyDownHandler
    }

    return (
      <div {...headerParams}>
        <span className="dnb-tabs__button__title">{children}</span>
      </div>
    )
  }
}
