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
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'

export default class FormStatus extends React.PureComponent {
  static tagName = 'dnb-form-status'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.func,
      PropTypes.node
    ]),
    label: PropTypes.node,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    icon_size: PropTypes.string,
    state: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.oneOf(['error', 'warn', 'info'])
    ]),
    // status is Deprecated
    status: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.oneOf(['error', 'warn', 'info'])
    ]),
    global_status_id: PropTypes.string,
    hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    text_id: PropTypes.string,
    width_selector: PropTypes.string,
    width_element: PropTypes.object,
    class: PropTypes.string,
    animation: PropTypes.string,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ])
  }

  static defaultProps = {
    id: null,
    title: null,
    text: null,
    label: null,
    icon: 'error',
    icon_size: 'large',
    state: 'error',
    status: null, // Deprecated
    global_status_id: null,
    hidden: false,
    text_id: null,
    width_selector: null,
    width_element: null,
    class: null,
    animation: null, // could be 'fade-in'
    skeleton: null,

    /** React props */
    className: null,
    children: null
  }

  static enableWebComponent() {
    registerElement(
      FormStatus.tagName,
      FormStatus,
      FormStatus.defaultProps
    )
  }

  static getContent(props) {
    if (props.text) {
      if (isTrue(props.text)) {
        return null
      }
      return props.text
    }
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

      icon = <Icon icon={<IconToLoad title={null} />} size={icon_size} />
    }

    return icon
  }

  static getDerivedStateFromProps(props, state) {
    if (state._id !== props.id) {
      state.id = props.id
    }

    state._id = props.id

    return state
  }

  state = { id: null }

  constructor(props) {
    super(props)

    // we do not use a random ID here, as we don't need it for now
    this.state.id = props.id || makeUniqueId()

    if (props.status !== 'info') {
      this.gsProvider = GlobalStatusProvider.init(
        props.global_status_id || 'main',
        (provider) => {
          // gets called once ready
          const { state, text, label } = this.props
          provider.add({
            state,
            status_id: `${this.state.id}-gs`,
            // show: true,
            item: {
              status_id: this.state.id,
              text,
              status_anchor_label: label,
              status_anchor_url: true
            }
          })
        }
      )
    }

    this._ref = React.createRef()
  }

  componentDidMount() {
    if (this.gsProvider) {
      this.gsProvider.isReady()
    }

    this.updateWidth()
  }

  componentDidUpdate(prevProps) {
    if (
      this.gsProvider &&
      (prevProps.text !== this.props.text ||
        prevProps.state !== this.props.state)
    ) {
      const { state, text, label } = this.props
      const status_id = `${this.state.id}-gs`
      this.gsProvider.update(
        status_id,
        {
          state,
          item: {
            status_id: this.state.id,
            text,
            status_anchor_label: label,
            status_anchor_url: true
          }
        },
        {
          preventRestack: true // because of the internal "close"
        }
      )
    }

    this.updateWidth()
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  updateWidth() {
    // set max-width to this form-status, using the "linked mother"
    if (this._ref.current) {
      const { width_element, width_selector } = this.props
      setMaxWidthToElement({
        element: this._ref.current,
        widthElement: width_element && width_element.current,
        widthSelector: width_selector
      })
    }
  }

  componentWillUnmount() {
    if (this.gsProvider) {
      const status_id = `${this.state.id}-gs`
      this.gsProvider.remove(status_id)
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      FormStatus.defaultProps,
      { skeleton: this.context && this.context.skeleton },
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
      skeleton, // eslint-disable-line
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
      id: this.state.id,
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
      className: classnames(
        'dnb-form-status--text',
        createSkeletonClass('font', skeleton, this.context)
      ),
      id: text_id
    }

    if (hidden) {
      params['aria-hidden'] = hidden
    }

    skeletonDOMAttributes(params, skeleton, this.context)

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
    role="presentation"
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

export const WarnIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    role="presentation"
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
WarnIcon.propTypes = {
  title: PropTypes.string
}
WarnIcon.defaultProps = {
  title: 'error'
}

export const InfoIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    role="presentation"
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

FormStatus.setMaxWidthToElement = setMaxWidthToElement

function setMaxWidthToElement({
  element,
  id = null,
  widthElement = null,
  widthSelector = null
}) {
  if (!(element && typeof window !== 'undefined')) {
    return // stop here
  }
  try {
    if (!id && !widthSelector) {
      id = element.getAttribute('id')
    }

    let width = sumElementWidth({
      widthElement,
      widthSelector: widthSelector || id.replace('-form-status', '') || id
    })

    if (width > 40) {
      const minWidth = 12 * 16 // use 12rem, because thats the default width in chrome for an input
      if (width < minWidth) {
        width = minWidth
      }

      const remWidth = `${width / 16}rem`

      const cS = window.getComputedStyle(element)
      const hasCustomWidth = element.style.maxWidth
        ? false
        : (cS.minWidth !== '' && cS.minWidth !== 'auto') ||
          (cS.maxWidth !== '' && cS.maxWidth !== 'none')

      if (!hasCustomWidth) {
        element.style.maxWidth = remWidth
      }
    }
  } catch (e) {
    // skip logging
  }
}

function sumElementWidth({ widthElement, widthSelector }) {
  let width = 0
  if (typeof document === 'undefined') {
    return width // stop here
  }
  try {
    // beside "selector" - which is straight forward, we
    // also check if we can get an ID given by text_id
    const ids = widthElement
      ? [widthElement]
      : widthSelector.split(/, |,/g)

    width = ids.reduce((acc, cur) => {
      const elem =
        typeof cur === 'string'
          ? cur[0] === '.'
            ? document.querySelector(cur)
            : document.getElementById(cur)
          : cur

      let width =
        (elem && elem.offsetWidth) || window.getComputedStyle(elem).width
      if (/em|rem/.test(width)) {
        width = parseFloat(width) * 16
      }

      if (width > 0) {
        // add additional one more spacing unit
        // to make it more correct for small elements
        if (acc > 0) {
          acc += 16
        }
        acc += width
      }

      return acc
    }, width)
  } catch (e) {
    // skip logging
  }

  return width
}
