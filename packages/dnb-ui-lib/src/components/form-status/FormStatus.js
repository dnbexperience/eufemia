/**
 * Web FormStatus Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import IconPrimary from '../icon-primary/IconPrimary'

const renderProps = {
  render_content: null
}

export const propTypes = {
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  icon_size: PropTypes.string,
  state: PropTypes.oneOf(['error', 'info']),
  status: PropTypes.oneOf(['error', 'info']), // Deprecated
  hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text_id: PropTypes.string,
  class: PropTypes.string,
  animation: PropTypes.string,

  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  render_content: PropTypes.func
}

export const defaultProps = {
  title: null,
  text: null,
  icon: 'exclamation',
  icon_size: 'medium',
  state: 'error',
  status: null, // Deprecated
  hidden: false,
  text_id: null,
  class: null,
  animation: null, // could be 'fade-in'

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormStatus extends PureComponent {
  static tagName = 'dnb-form-status'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormStatus.tagName, FormStatus, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  static getIcon({ state, icon, icon_size }) {
    if (typeof icon === 'string') {
      let iconToLoad = icon

      switch (state) {
        case 'info':
        case 'information':
          iconToLoad = 'information'
          break
        case 'error':
        default:
          iconToLoad = 'exclamation'
      }

      icon = <IconPrimary aria-hidden icon={iconToLoad} size={icon_size} />
    }

    return icon
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  render() {
    // consume the formRow context
    const props = this.context.formRow
      ? // use only the props from context, who are available here anyway
        extendPropsWithContext(this.props, this.context.formRow)
      : this.props

    const {
      title,
      status: rawStatus,
      state: rawState,
      hidden,
      className,
      animation,
      class: _className,
      text_id,
      text /* eslint-disable-line */,
      icon /* eslint-disable-line */,
      icon_size /* eslint-disable-line */,
      children /* eslint-disable-line */,
      ...attributes
    } = props

    const state = this.correctStatus(rawStatus || rawState)
    const iconToRender = FormStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const contentToRender = FormStatus.getContent(this.props)
    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      hidden,
      className: classnames(
        'dnb-form-status',
        `dnb-form-status--${state}`,
        animation ? `dnb-form-status--${animation}` : null,
        hasStringContent ? 'dnb-form-status--has-content' : null,
        createSpacingClasses(props),
        className,
        _className
      ),
      title,

      ...attributes
    }
    const textParams = {
      className: 'dnb-form-status--text',
      id: text_id
    }

    if (hidden) {
      params['aria-hidden'] = hidden
    } else if (hasStringContent) {
      // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      params['aria-live'] = 'assertive'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, textParams)

    return (
      <span {...params}>
        <span className="dnb-form-status__shell">
          {iconToRender}
          <span {...textParams}>{contentToRender}</span>
        </span>
      </span>
    )
  }
}
