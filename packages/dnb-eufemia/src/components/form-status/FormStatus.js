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
  extendPropsWithContext,
} from '../../shared/component-helper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Icon from '../icon/Icon'
import GlobalStatusProvider from '../global-status/GlobalStatusProvider'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
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
      PropTypes.node,
    ]),
    label: PropTypes.node,
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    icon_size: PropTypes.string,
    state: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.oneOf(['error', 'warn', 'info']),
    ]),
    variant: PropTypes.oneOf(['flat', 'outlined']),
    size: PropTypes.oneOf(['default', 'large']),
    // status is Deprecated
    status: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.oneOf(['error', 'warn', 'info']),
    ]),
    global_status_id: PropTypes.string,
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    hidden: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    text_id: PropTypes.string,
    width_selector: PropTypes.string,
    width_element: PropTypes.object,
    class: PropTypes.string,
    animation: PropTypes.string,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    stretch: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    role: PropTypes.string,

    ...spacingPropTypes,

    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
  }

  static defaultProps = {
    id: null,
    title: null,
    text: null,
    label: null,
    icon: 'error',
    icon_size: 'medium',
    size: 'default',
    variant: null,
    state: 'error',
    status: null, // Deprecated
    global_status_id: null,
    attributes: null,
    hidden: false,
    text_id: null,
    width_selector: null,
    width_element: null,
    class: null,
    animation: null, // could be 'fade-in'
    skeleton: null,
    stretch: null,
    role: null,

    className: null,
    children: null,
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

  static correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
      case 'warning':
        state = 'warn'
        break
    }
    return state
  }

  static getIcon({ state, icon, icon_size }) {
    if (typeof icon === 'string') {
      let IconToLoad = icon

      switch (FormStatus.correctStatus(state)) {
        case 'info':
          IconToLoad = InfoIcon
          break
        case 'warn':
          IconToLoad = WarnIcon
          break
        case 'error':
        default:
          IconToLoad = ErrorIcon
      }

      icon = (
        <Icon
          icon={<IconToLoad title={null} />}
          size={icon_size}
          inherit_color={false}
        />
      )
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
              status_anchor_url: true,
            },
          })
        }
      )
    }

    this._ref = React.createRef()
  }

  init = () => {
    if (this._isMounted) {
      if (this.gsProvider) {
        this.gsProvider.isReady()
      }

      this.updateWidth()
    }
  }

  componentDidMount() {
    this._isMounted = true
    if (document.readyState === 'complete') {
      this.init()
    } else if (typeof window !== 'undefined') {
      window.addEventListener('load', this.init)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    if (this.gsProvider) {
      const status_id = `${this.state.id}-gs`
      this.gsProvider.remove(status_id)
    }
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.init)
    }
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
            status_anchor_url: true,
          },
        },
        {
          preventRestack: true, // because of the internal "close"
        }
      )
    }

    this.updateWidth()
  }

  updateWidth() {
    // set max-width to this form-status, using the "linked mother"
    if (this._ref.current) {
      const { width_element, width_selector } = this.props
      setMaxWidthToElement({
        element: this._ref.current,
        widthElement: width_element && width_element.current,
        widthSelector: width_selector,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      FormStatus.defaultProps,
      { skeleton: this.context && this.context.skeleton },
      this.context.FormRow,
      this.context.FormStatus
    )

    const {
      title,
      status: rawStatus,
      state: rawState,
      size,
      variant,
      hidden,
      className,
      animation,
      stretch,
      class: _className,
      text_id,

      status_id, // eslint-disable-line
      id, // eslint-disable-line
      text, // eslint-disable-line
      icon, // eslint-disable-line
      icon_size, // eslint-disable-line
      skeleton, // eslint-disable-line
      children, // eslint-disable-line
      role,

      ...rest
    } = props

    const state = FormStatus.correctStatus(rawStatus || rawState)
    const iconToRender = FormStatus.getIcon({
      state,
      icon,
      icon_size,
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
        `dnb-form-status__size--${size}`,
        variant && `dnb-form-status__variant--${variant}`,
        animation ? `dnb-form-status__animation--${animation}` : null,
        stretch && 'dnb-form-status--stretch',
        hasStringContent ? 'dnb-form-status--has-content' : null,
        createSpacingClasses(props),
        className,
        _className
      ),
      title,
      role,

      ...rest,
    }

    if (!role) {
      switch (state) {
        case 'info':
          params.role = 'status'
          break
        default:
          params.role = 'alert'
      }
    }

    const textParams = {
      className: classnames(
        'dnb-form-status__text',
        createSkeletonClass('font', skeleton, this.context)
      ),
      id: text_id,
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
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    role="presentation"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}

    <path
      d="M23.625 17.864A3.547 3.547 0 0120.45 23H3.548a3.546 3.546 0 01-3.172-5.136l8.45-14.902a3.548 3.548 0 016.347 0l8.452 14.902z"
      fill="#DC2A2A"
    />
    <path
      d="M12 16.286a1.286 1.286 0 100 2.572 1.286 1.286 0 000-2.572z"
      fill="#fff"
    />
    <path
      d="M12 13.818v-5"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
ErrorIcon.propTypes = {
  title: PropTypes.string,
}
ErrorIcon.defaultProps = {
  title: 'error',
}

export const WarnIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    role="presentation"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}

    <path
      d="M23.625 17.864A3.547 3.547 0 0120.45 23H3.548a3.546 3.546 0 01-3.172-5.136l8.45-14.902a3.548 3.548 0 016.347 0l8.452 14.902z"
      fill="#FDBB31"
    />
    <path
      d="M12 16.286a1.286 1.286 0 100 2.572 1.286 1.286 0 000-2.572z"
      fill="#333"
    />
    <path
      d="M12 13.818v-5"
      stroke="#333"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
WarnIcon.propTypes = {
  title: PropTypes.string,
}
WarnIcon.defaultProps = {
  title: 'error',
}

export const InfoIcon = (props) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    role="presentation"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}

    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.268 0a11.25 11.25 0 105.566 21.017l6.112 2.91a.75.75 0 001-1l-2.911-6.112A11.234 11.234 0 0011.268 0z"
      fill="#007272"
    />
    <circle cx="11" cy="6.5" r=".5" fill="#fff" stroke="#fff" />
    <path
      d="M13.75 16H13a1.5 1.5 0 01-1.5-1.5v-3.75a.75.75 0 00-.75-.75H10"
      stroke="#fff"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
InfoIcon.propTypes = {
  title: PropTypes.string,
}
InfoIcon.defaultProps = {
  title: 'info',
}

export function setMaxWidthToElement({
  element,
  id = null,
  widthElement = null,
  widthSelector = null,
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
      widthSelector: widthSelector || id.replace('-form-status', '') || id,
    })

    if (width > 40) {
      const minWidth = 12 * 16 // use 12rem, because that's the default width in chrome for an input
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
