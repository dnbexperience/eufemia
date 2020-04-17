/**
 * Web FormStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  makeUniqueId,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Icon from '../icon/Icon'
import GlobalStatusProvider from '../global-status/GlobalStatusProvider'

const renderProps = {
  render_content: null
}

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.func,
    PropTypes.node
  ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  icon_size: PropTypes.string,
  state: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.oneOf(['error', 'info'])
  ]),
  // status is Deprecated
  status: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
    PropTypes.oneOf(['error', 'info'])
  ]),
  global_status_id: PropTypes.string,
  hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  text_id: PropTypes.string,
  width_selector: PropTypes.string,
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

const defaultProps = {
  id: null,
  title: null,
  text: null,
  icon: 'error',
  icon_size: 'large',
  state: 'error',
  status: null, // Deprecated
  global_status_id: null,
  hidden: false,
  text_id: null,
  width_selector: null,
  class: null,
  animation: null, // could be 'fade-in'

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class FormStatus extends React.PureComponent {
  static tagName = 'dnb-form-status'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(FormStatus.tagName, FormStatus, defaultProps)
  }

  static getContent(props) {
    if (props.text) {
      if (isTrue(props.text)) {
        return null
      }
      return props.text
    }
    if (typeof props.render_content === 'function')
      props.render_content(props)
    return processChildren(props)
  }

  static getIcon({ state, icon, icon_size }) {
    if (typeof icon === 'string') {
      let IconToLoad = icon

      switch (state) {
        case 'info':
        case 'information':
          IconToLoad = InfoIcon
          break
        case 'error':
        default:
          IconToLoad = ErrorIcon
      }

      icon = (
        <Icon
          icon={<IconToLoad title={null} />}
          size={icon_size}
          aria-hidden
        />
      )
    }

    return icon
  }

  constructor(props) {
    super(props)

    // we do not use a random ID here, as we don't need it for now
    this._id = props.id || makeUniqueId()

    if (props.status !== 'info') {
      this.gsProvider = GlobalStatusProvider.init(
        props.global_status_id || 'main',
        (provider) => {
          // gets called once ready
          const { text, state } = this.props
          const status_id = this._id
          provider.add({
            state,
            status_id,
            item: { text, status_id, status_anchor_url: true }
          })
        }
      )
    }

    this._ref = React.createRef()
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  componentDidMount() {
    if (this.gsProvider) {
      this.gsProvider.isReady()
    }

    // set max-width to this form-status, using the "linked mother"
    this.setMaxWidth()
  }

  componentWillUnmount() {
    if (this.gsProvider) {
      this.gsProvider.remove(this._id)
    }
  }

  setMaxWidth(elem = null) {
    const { text_id, width_selector } = this.props
    if (text_id && this._ref.current && typeof document !== 'undefined') {
      try {
        const width = this.sumElementWidth(
          elem ||
            width_selector ||
            (text_id.match(/^([a-z0-9]+)/) || [])[1],
          this._ref.current
        )
        if (width >= 64) {
          this._ref.current.style.maxWidth = `${
            (width + (width < 128 ? 32 : 0)) / 16
          }rem`
        }
      } catch (e) {
        console.warn(e)
      }
    }
  }

  sumElementWidth = (selector, targetElement) => {
    let width = 0
    try {
      // hide and show the target, so it don't distract the calculation
      const display = targetElement.style.display
      targetElement.style.display = 'none'

      if (selector && selector.offsetWidth) {
        width = selector.offsetWidth
      } else {
        // beside "width_selector" - witch is straight forward, we
        // also check if we can get an ID given by text_id
        const ids = /,/.test(selector) ? selector.split(', ') : [selector]

        width = ids.reduce((acc, cur) => {
          const elem =
            cur[0] === '.'
              ? document.querySelector(cur)
              : document.getElementById(cur)

          if (elem && elem.offsetWidth > 0) {
            // add additional one more spacing unit
            // to make it more correct for small elements
            if (acc > 0) {
              acc += 16
            }
            acc += elem.offsetWidth
          }

          return acc
        }, width)
      }

      // and show it again
      targetElement.style.display = display
    } catch (e) {
      console.warn(e)
    }

    return width
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow
    )

    const {
      title,
      status: rawStatus,
      state: rawState,
      hidden,
      className,
      animation,
      class: _className,
      text_id,

      status_id, // eslint-disable-line
      id, // eslint-disable-line
      text, // eslint-disable-line
      icon, // eslint-disable-line
      icon_size, // eslint-disable-line
      children, // eslint-disable-line

      ...attributes
    } = props

    const state = this.correctStatus(rawStatus || rawState)
    const iconToRender = FormStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const contentToRender = FormStatus.getContent(this.props)

    // stop here if we don't have content
    if (contentToRender === null) {
      return <></>
    }

    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      id: this._id,
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
      // Deprecated: use the GlobalStatus and aria-live
      // } else if (hasStringContent) {
      //   // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      //   params['aria-live'] = 'assertive'
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    validateDOMAttributes(null, textParams)

    return (
      <span {...params} ref={this._ref}>
        <span className="dnb-form-status__shell">
          {iconToRender}
          <span {...textParams}>{contentToRender}</span>
        </span>
      </span>
    )
  }
}

export const ErrorIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}
    <path
      d="M16 25a.5.5 0 100 1 .5.5 0 000-1v0"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 21V11"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      clipRule="evenodd"
      d="M18.161 2.347a2.408 2.408 0 00-4.322 0L1.208 28.077A2.028 2.028 0 003.029 31h25.942a2.028 2.028 0 001.821-2.923l-12.63-25.73z"
      stroke="#000"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
ErrorIcon.propTypes = {
  title: PropTypes.string
}
ErrorIcon.defaultProps = {
  title: 'error'
}

export const InfoIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.1 1.08A14.75 14.75 0 00.26 15.01a14.73 14.73 0 0022.16 12.74l8.27 3.94a.75.75 0 001-1l-3.94-8.27A14.75 14.75 0 0010.1 1.08zM1.76 15.01a13.25 13.25 0 1124.5 6.97.75.75 0 00-.04.72l3.2 6.73-6.72-3.2a.75.75 0 00-.72.04A13.23 13.23 0 011.76 15zM13.38 7.9a1.31 1.31 0 112.63 0 1.31 1.31 0 01-2.63 0zm-1.13 5.07c0-.41.34-.75.75-.75h1.13c1.04 0 1.88.85 1.88 1.88v5.64c0 .84.67 1.51 1.5 1.51h1.13a.75.75 0 110 1.5h-1.13a3 3 0 01-3-3V14.1c0-.2-.17-.38-.38-.38H13a.75.75 0 01-.75-.75z"
      fill="#000"
    />
  </svg>
)
InfoIcon.propTypes = {
  title: PropTypes.string
}
InfoIcon.defaultProps = {
  title: 'info'
}
