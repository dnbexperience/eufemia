/**
 * Web GlobalStatus Component
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import IconPrimary from '../icon-primary/IconPrimary'
import Button from '../button/Button'
import Section from '../section/Section'

const renderProps = {
  render_content: null
}

export const propTypes = {
  title: PropTypes.string,
  default_title: PropTypes.string,
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
  show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  // hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
  default_title: 'En feil har skjedd',
  text: null,
  icon: 'exclamation',
  icon_size: 'medium',
  state: 'error',
  show: false,
  // hidden: false,
  text_id: null,
  class: null,
  animation: null, // could be 'fade-in'

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class GlobalStatus extends PureComponent {
  static tagName = 'dnb-global-status'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(GlobalStatus.tagName, GlobalStatus, defaultProps)
  }

  static getContent(props) {
    if (props.text) return props.text
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  state = { visible: false }
  static getDerivedStateFromProps(props, state) {
    // const value = GlobalStatus.getValue(props)
    // if (state._listenForPropChanges && value !== state.value) {
    //   state.value = value
    // }
    if (isTrue(props.show)) {
      state.visible = true
    }
    state._listenForPropChanges = true
    return state
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
      default_title,
      state: rawState,
      show,
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

    const { visible } = this.state

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const contentToRender = GlobalStatus.getContent(this.props)
    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      // hidden,
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`,
        visible && 'dnb-global-status--visible',
        animation ? `dnb-global-status--${animation}` : null,
        hasStringContent ? 'dnb-global-status--has-content' : null,
        createSpacingClasses(props),
        className,
        _className
      ),
      // title,

      ...attributes
    }
    // const textParams = {
    //   // className: 'dnb-global-status--text',
    //   id: text_id
    // }

    if (!visible) {
      params['aria-hidden'] = true
    } else if (hasStringContent) {
      // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      params['aria-live'] = 'assertive'
    }

    const style = state === 'info' ? null : 'cherry-red'

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    // validateDOMAttributes(null, textParams)

    return (
      <Section element="div" style_type={style} {...params}>
        {show && (
          <div className="dnb-global-status__shell">
            {iconToRender}
            <div className="dnb-global-status__content">
              <p className="dnb-global-status__title">
                {title || default_title}
              </p>
              <p
                className="dnb-global-status__message"
                id={text_id}
                // {...textParams}
              >
                {contentToRender}
                <ul className="dnb-ul">
                  <li>
                    list item{' '}
                    <Button variant="tertiary" href="#id" text="Gå til" />
                  </li>
                </ul>
              </p>
            </div>
          </div>
        )}
      </Section>
    )
  }
}
