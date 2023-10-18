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
  makeUniqueId,
  validateDOMAttributes,
  processChildren,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import HeightAnimationInstance from '../height-animation/HeightAnimationInstance'
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
import { pickFormElementProps } from '../../shared/helpers/filterValidProps'

export default class FormStatus extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
      PropTypes.oneOf(['error', 'warn', 'info', 'marketing']),
    ]),
    variant: PropTypes.oneOf(['flat', 'outlined']),
    size: PropTypes.oneOf(['default', 'large']),
    globalStatus: PropTypes.shape({
      id: PropTypes.string,
      message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    }),
    attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text_id: PropTypes.string,
    width_selector: PropTypes.string,
    width_element: PropTypes.object,
    class: PropTypes.string,
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
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
    show: true,
    text: null,
    globalStatus: null,
    label: null,
    icon: 'error',
    icon_size: 'medium',
    size: 'default',
    variant: null,
    state: 'error',
    attributes: null,
    text_id: null,
    width_selector: null,
    width_element: null,
    class: null,
    no_animation: null,
    skeleton: null,
    stretch: null,
    role: null,
    className: null,
    children: null,
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

  static getIcon({ state, icon, icon_size, theme }) {
    if (typeof icon !== 'string') {
      return icon
    }

    let IconToLoad = icon

    switch (FormStatus.correctStatus(state)) {
      case 'info':
      case 'success':
        IconToLoad = InfoIcon
        break
      case 'warn':
        IconToLoad = WarnIcon
        break
      case 'marketing':
        IconToLoad = MarketingIcon
        break
      case 'error':
      default:
        IconToLoad = ErrorIcon
    }

    return (
      <Icon
        icon={<IconToLoad title={null} state={state} theme={theme} />}
        size={icon_size}
        inherit_color={false}
      />
    )
  }

  static getDerivedStateFromProps(props, state) {
    if (state._id !== props.id && props.id) {
      state.id = props.id
    }

    state._id = props.id

    return state
  }

  state = { id: null, keepContentInDom: null }

  constructor(props, context) {
    super(props)

    // we do not use a random ID here, as we don't need it for now
    this.state.id = props.id || makeUniqueId()

    this._globalStatus = GlobalStatusProvider.init(
      props?.globalStatus?.id ||
        context?.FormStatus?.globalStatus?.id ||
        context?.FormRow?.globalStatus?.id ||
        context?.formElement?.globalStatus?.id ||
        'main',
      (provider) => {
        // gets called once ready
        if (this.props.state === 'error' && this.isReadyToGetVisible()) {
          const { state, text, globalStatus, label } = this.props
          provider.add({
            state,
            status_id: this.getStatusId(),
            item: {
              item_id: this.state.id,
              text: globalStatus?.message || text,
              status_anchor_label: label,
              status_anchor_url: true,
            },
          })
        }
      }
    )

    this._ref = React.createRef()

    this._heightAnim = new HeightAnimationInstance({
      animate: props.no_animation === false,

      /** TODO: consider to enable animation by default */
      // animate: !isTrue(props.no_animation),
    })

    this._heightAnim.onStart(() => {
      this.setState({
        isAnimating: true,
        keepContentInDom: true,
      })
    })

    this._heightAnim.onEnd(() => {
      this.setState({
        isAnimating: false,
        keepContentInDom: isTrue(this.props.show),
      })
    })
  }

  init = () => {
    if (this._isMounted) {
      this._globalStatus.isReady()

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
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', this.updateWidth)
    }
  }

  componentWillUnmount() {
    this._isMounted = false
    const status_id = this.getStatusId()
    this._globalStatus.remove(status_id)
    if (typeof window !== 'undefined') {
      window.removeEventListener('load', this.init)
      window.removeEventListener('resize', this.updateWidth)
    }
    this._heightAnim.remove()
  }

  componentDidUpdate(prevProps) {
    const { state, show, text, globalStatus, children, label } = this.props

    if (
      prevProps.text !== text ||
      prevProps.children !== children ||
      prevProps.show !== show ||
      prevProps.state !== state
    ) {
      // ensure we update the content
      this.setState({ keepContentInDom: false })

      if (state === 'error') {
        const status_id = this.getStatusId()

        if (isTrue(show)) {
          this._globalStatus.update(
            status_id,
            {
              state,
              status_id,
              item: {
                item_id: this.state.id,
                text: globalStatus?.message || text,
                status_anchor_label: label,
                status_anchor_url: true,
              },
            },
            {
              preventRestack: true, // because of the internal "close"
            }
          )
        } else if (!FormStatus.getContent(this.props)) {
          const status_id = this.getStatusId()
          this._globalStatus.remove(status_id)
        }
      }

      if (this.isReadyToGetVisible()) {
        this.updateWidth()
        this._heightAnim.setElement(this._ref.current)
        this._heightAnim.open()
      } else {
        this._heightAnim.close()
      }
    }
  }

  getStatusId() {
    return `${this.state.id}-gs`
  }

  updateWidth = () => {
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

  isReadyToGetVisible(props = this.props) {
    return isTrue(props.show) && FormStatus.getContent(props)
      ? true
      : false
  }

  render() {
    const isReadyToGetVisible = this.isReadyToGetVisible()

    if (!isReadyToGetVisible && !this.state.keepContentInDom) {
      return null
    }

    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      FormStatus.defaultProps,
      { skeleton: this.context && this.context.skeleton },
      // Deprecated – can be removed in v11
      pickFormElementProps(this.context?.FormRow),
      pickFormElementProps(this.context?.formElement),
      this.context.FormStatus
    )

    const {
      show, // eslint-disable-line
      title,
      state: rawState,
      size,
      variant,
      className,
      no_animation,
      stretch,
      class: _className,
      text_id,

      label, // eslint-disable-line
      status_id, // eslint-disable-line
      globalStatus, // eslint-disable-line
      id, // eslint-disable-line
      text, // eslint-disable-line
      icon, // eslint-disable-line
      icon_size, // eslint-disable-line
      skeleton, // eslint-disable-line
      children, // eslint-disable-line
      role,

      ...rest
    } = props

    const state = FormStatus.correctStatus(rawState)
    const iconToRender = FormStatus.getIcon({
      state,
      icon,
      icon_size,
      theme: this.context?.theme?.name,
    })

    const contentToRender =
      this.state.keepContentInDom && this._cachedContent
        ? this._cachedContent
        : FormStatus.getContent(this.props)

    // Add a cache, we use this during the "hide" period when animating
    if (!this.state.isAnimating) {
      this._cachedContent = contentToRender
    }

    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      className: classnames(
        'dnb-form-status',
        `dnb-form-status--${state}`,
        `dnb-form-status__size--${size}`,
        variant && `dnb-form-status__variant--${variant}`,
        this.state.isAnimating && 'dnb-form-status--is-animating',
        !isReadyToGetVisible &&
          !this.state.keepContentInDom &&
          'dnb-form-status--hidden',
        !isReadyToGetVisible &&
          this.state.keepContentInDom &&
          'dnb-form-status--disappear',
        isTrue(no_animation) && 'dnb-form-status--no-animation',
        stretch && 'dnb-form-status--stretch',
        hasStringContent ? 'dnb-form-status--has-content' : null,
        createSpacingClasses(props),
        className,
        _className
      ),
      id: !String(id).startsWith('null') ? this.state.id : null,
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
      id: !String(text_id).startsWith('null') ? text_id : null,
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
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
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
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

export const InfoIcon = (props) => {
  const isSbankenTheme = props && props?.theme === 'sbanken'
  let fill = isSbankenTheme ? '#000' : '#007272'
  if (props && props?.state === 'success') {
    fill = isSbankenTheme ? '#02A56A' : '#28B482'
  }

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      {props && props.title && <title>{props.title}</title>}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.268 0a11.25 11.25 0 105.566 21.017l6.112 2.91a.75.75 0 001-1l-2.911-6.112A11.234 11.234 0 0011.268 0z"
        fill={fill}
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
}
InfoIcon.propTypes = {
  title: PropTypes.string,
  state: PropTypes.string,
  theme: PropTypes.string,
}
InfoIcon.defaultProps = {
  title: 'info',
  state: 'info',
  theme: 'ui',
}

export const MarketingIcon = (props) => (
  <svg
    width="24"
    height="24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {props && props.title && <title>{props.title}</title>}
    <path
      d="M6 15.25H4.5c-2.042 0-3.75-1.707-3.75-3.75S2.458 7.75 4.5 7.75H6v7.5ZM7.5 15.25c4.801 0 8.846 1.897 12.75 4.5V3.25c-3.904 2.603-7.949 4.5-12.75 4.5v7.5ZM23.25 10a.75.75 0 0 0-1.5 0h1.5Zm-1.5 3a.75.75 0 0 0 1.5 0h-1.5ZM8.483 21.043a.75.75 0 1 0 1.034-1.086l-1.034 1.086ZM21.75 10v3h1.5v-3h-1.5ZM6 15.25a8.058 8.058 0 0 0 2.483 5.793l1.034-1.086A6.559 6.559 0 0 1 7.5 15.25H6Z"
      fill="#333"
    />
  </svg>
)
MarketingIcon.propTypes = {
  title: PropTypes.string,
}
MarketingIcon.defaultProps = {
  title: 'marketing',
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
    widthSelector = widthSelector || id?.replace('-form-status', '') || id

    let width = sumElementWidth({
      widthElement,
      widthSelector,
    })

    if (width > 40) {
      const maxWidth = 30 * 16 // use 12rem, because that's the default width in chrome for an input
      if (width < maxWidth) {
        width = maxWidth
      }

      const remWidth = `${width / 16}rem`

      const style = window.getComputedStyle(element)
      const hasCustomWidth = element.style.maxWidth
        ? false
        : (style.minWidth !== '' && style.minWidth !== 'auto') ||
          (style.maxWidth !== '' && style.maxWidth !== 'none')

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

FormStatus._supportsSpacingProps = true
