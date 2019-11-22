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
          iconToLoad = InfoIcon
          break
        case 'error':
        default:
          iconToLoad = ErrorIcon
      }

      icon = <Icon aria-hidden icon={iconToLoad} size={icon_size} />
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
        provider => {
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
          this._ref.current.style.maxWidth = `${(width +
            (width < 128 ? 32 : 0)) /
            16}rem`
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

export const ErrorIcon = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
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

export const InfoIcon = props => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16 .75C24.422.75 31.25 7.578 31.25 16S24.422 31.25 16 31.25.75 24.422.75 16 7.578.75 16 .75z"
      stroke="#000"
      strokeWidth="1.5"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.904 7a1.385 1.385 0 100 2.77 1.385 1.385 0 000-2.77zM13 13.346a.75.75 0 000 1.5h1.27a.52.52 0 01.519.52v6.346A3.288 3.288 0 0018.076 25h1.27a.75.75 0 000-1.5h-1.27c-.988 0-1.789-.8-1.789-1.788v-6.347a2.02 2.02 0 00-2.019-2.019H13z"
      fill="#000"
    />
  </svg>
)
