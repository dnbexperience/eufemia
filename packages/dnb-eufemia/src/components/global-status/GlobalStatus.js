/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  convertJsxToString,
  processChildren,
  extendPropsWithContext,
} from '../../shared/component-helper'
import AnimateHeight from '../../shared/AnimateHeight'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import GlobalStatusController, {
  GlobalStatusInterceptor,
} from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import Icon from '../icon/Icon'
/**
 * Because of the new icons, which do not fit into the current GlobalStatus UI,
 * we have to have them inlined here in this component. Down below.
 */
// import { InfoIcon, ErrorIcon } from '../form-status/FormStatus'
import { CloseButton } from '../modal/Modal'
import Section from '../section/Section'
import { IS_IE11 } from '../../shared/helpers'

export default class GlobalStatus extends React.PureComponent {
  static tagName = 'dnb-global-status'
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    status_id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    default_title: PropTypes.string,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    items: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.array,
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),
    icon_size: PropTypes.string,
    state: PropTypes.oneOf(['error', 'info']),
    show: PropTypes.oneOf(['auto', true, false, 'true', 'false']),
    autoscroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoclose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    close_text: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    omit_set_focus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    omit_set_focus_on_update: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    status_anchor_text: PropTypes.string,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

    class: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
    ]),

    on_adjust: PropTypes.func,
    on_open: PropTypes.func,
    on_show: PropTypes.func,
    on_close: PropTypes.func,
    on_hide: PropTypes.func,
  }

  static defaultProps = {
    id: 'main',
    status_id: 'status-main',
    title: null,
    default_title: null,
    text: null,
    items: [],
    icon: 'error',
    icon_size: 'large',
    state: 'error',
    show: 'auto',
    autoscroll: true,
    autoclose: true,
    no_animation: false,
    close_text: 'Lukk',
    hide_close_button: false,
    omit_set_focus: false,
    omit_set_focus_on_update: true,
    delay: 0,
    status_anchor_text: null,
    skeleton: null,
    class: null,

    className: null,
    children: null,

    on_adjust: null,
    on_open: null,
    on_show: null,
    on_close: null,
    on_hide: null,
  }

  static enableWebComponent() {
    registerElement(
      GlobalStatus.tagName,
      GlobalStatus,
      GlobalStatus.defaultProps
    )
  }

  static getContent(props) {
    if (props.text) return props.text
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
    if (state._listenForPropChanges) {
      if (state._items !== props.items) {
        state.globalStatus = GlobalStatusProvider.combineMessages([
          state.globalStatus,
          props,
        ])
      }
    }

    state._items = props.items
    state._listenForPropChanges = true

    return state
  }

  state = {
    globalStatus: null,
    isActive: false,
    isAnimating: false,
    keepContentVisible: false,
    _listenForPropChanges: false,
  }

  constructor(props) {
    super(props)

    this._mainRef = React.createRef()
    this._wrapperRef = React.createRef()
    this._shellRef = React.createRef()

    this.anim = new AnimateHeight({
      animate: !isTrue(props.no_animation),
    })

    this.anim.onStart((state) => {
      this.setState({
        isAnimating: true,
        _listenForPropChanges: false,
      })
      if (state === 'opening') {
        this.scrollToStatus()
      }
    })

    this.anim.onEnd((state) => {
      this.setState({
        isAnimating: false,
        _listenForPropChanges: false,
      })

      if (this.state.isActive) {
        this.setState({
          keepContentVisible: true,
          _listenForPropChanges: false,
        })

        dispatchCustomElementEvent(
          this._globalStatus,
          'on_show',
          this._globalStatus
        )

        if (state === 'opened') {
          this.setFocus()

          dispatchCustomElementEvent(
            this._globalStatus,
            'on_open',
            this._globalStatus
          )
        }

        if (state === 'adjusted') {
          if (!isTrue(this.props.omit_set_focus_on_update)) {
            this.setFocus()
          }

          dispatchCustomElementEvent(
            this._globalStatus,
            'on_adjust',
            this._globalStatus
          )
        }
      } else {
        this.setState({
          keepContentVisible: false,
          _listenForPropChanges: false,
        })
        dispatchCustomElementEvent(
          this._globalStatus,
          'on_close',
          this._globalStatus
        )
      }
    })

    this.provider = GlobalStatusProvider.create(props.id)

    // add the props as the first stack
    this.state.globalStatus = this._globalStatus =
      this.provider.init(props)

    // and make it visible from start, if needed
    if (isTrue(props.show)) {
      if (isTrue(props.no_animation)) {
        this.state.isActive = true
      }
    }

    this.provider.onUpdate((globalStatus) => {
      // we need the on_close later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.on_close) {
        this._globalStatus = globalStatus
      }

      this.adjustHeight = this.anim.adjustFrom()

      // force re-render
      this.setState({
        globalStatus,
        _listenForPropChanges: false,
      })

      const isActive = isTrue(globalStatus.show)
      if (isActive && !this.isPassive()) {
        this.setState({ isActive, _listenForPropChanges: false })
      }

      // make sure to show the new status, inc. scroll
      if (
        (isTrue(this.props.autoclose) &&
          this.hadContent &&
          !this.hasContent(globalStatus) &&
          !isTrue(this.props.show)) ||
        (typeof globalStatus.show !== 'undefined' &&
          !isTrue(globalStatus.show))
      ) {
        this.setHidden({ delay: 0 })
      } else if (
        isTrue(this.props.show) ||
        (typeof globalStatus.show !== 'undefined' &&
          isTrue(globalStatus.show))
      ) {
        this.hadContent = this.hasContent(globalStatus)
        this.setVisible({ delay: 0 })
      }
    })

    this.initialActiveElement = null
  }

  componentDidMount() {
    this.anim.setElement(this._shellRef.current)

    const isActive = isTrue(this.props.show)
    if (isActive) {
      this.setVisible()
    }
  }

  componentWillUnmount() {
    this.anim.remove()
    clearTimeout(this._scrollToStatusTimeout)
    clearTimeout(this._visibleTimeout)
    clearTimeout(this._hiddenTimeout)

    // NB: Never unbind the provider,
    // as a new provider else will be set BEFORE thi unmount is called
    // on the other hand; setting up the provider
    // at the stage of componentDidMount is too late
    // this.provider.unbind()

    // so we inly empty the events
    this.provider.empty()
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const globalStatus = extendPropsWithContext(
        this.props,
        GlobalStatus.defaultProps,
        this.state.globalStatus
      )
      this.setState({
        globalStatus,
      })
    }
    if (prevProps.show !== this.props.show) {
      const isActive = isTrue(this.props.show)
      if (isActive) {
        this.setVisible()
      } else {
        this.setHidden()
      }
    }
  }

  hasContent(globalStatus) {
    return globalStatus.items?.length > 0 || globalStatus.text
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  isPassive = () => {
    return this.props.show !== 'auto' && isTrue(this.props.show) === false
  }

  setVisible = ({ delay = parseFloat(this.props.delay) } = {}) => {
    if (this.isPassive()) {
      return // stop here
    }

    const { isActive, initialOpened } = this.state

    if (isActive === true && initialOpened) {
      if (!this.adjustHeight) {
        this.adjustHeight = this.anim.adjustFrom()
      }

      // just because we want to run "adjust" after the content has been set
      this.setState(
        {
          keepContentVisible: true,
          _listenForPropChanges: false,
        },
        () => {
          this.anim.adjustTo(this.adjustHeight, null, {})
        }
      )

      return // stop here
    }

    const run = () => {
      this.setState(
        {
          isActive: true,
          initialOpened: true,
          _listenForPropChanges: false,
        },
        () => {
          this.anim.open()
        }
      )
    }

    if (delay > 0) {
      clearTimeout(this._visibleTimeout)
      this._visibleTimeout = setTimeout(() => {
        run()
      }, delay)
    } else {
      run()
    }
  }

  setHidden = ({ delay = parseFloat(this.props.delay) } = {}) => {
    const { isActive } = this.state

    if (isActive === false) {
      return // stop here
    }

    const run = () => {
      this.setState(
        {
          isActive: false,
          initialOpened: false,
          _listenForPropChanges: false,
        },
        () => {
          this.anim.close()
        }
      )
    }

    if (delay > 0) {
      clearTimeout(this._hiddenTimeout)
      this._hiddenTimeout = setTimeout(() => {
        run()
      }, delay)
    } else {
      run()
    }
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault()
        this.closeHandler()
        break
    }
  }

  setFocus() {
    if (
      typeof document !== 'undefined' &&
      document.activeElement !== this._wrapperRef.current
    ) {
      this.initialActiveElement = document.activeElement
    }
    if (this._wrapperRef.current && !isTrue(this.props.omit_set_focus)) {
      this._wrapperRef.current.focus({ preventScroll: true })
    }
  }

  closeHandler = () => {
    this.provider.add({
      status_id: 'internal-close',
      show: false,
    })

    if (this.initialActiveElement) {
      try {
        this.initialActiveElement.focus()
        this.initialActiveElement = null
      } catch (e) {
        warn(e)
      }
    }

    dispatchCustomElementEvent(
      this._globalStatus,
      'on_hide',
      this._globalStatus
    )
  }

  scrollToStatus(isDone = null) {
    if (
      typeof window === 'undefined' ||
      isTrue(this.state.globalStatus.autoscroll) === false
    ) {
      return // stop here
    }
    try {
      const element = this._wrapperRef.current
      this._scrollToStatusTimeout = isElementVisible(element, isDone)
      if (
        element &&
        !IS_IE11 &&
        typeof element.scrollIntoView === 'function'
      ) {
        element.scrollIntoView({
          block: 'center',
          behavior: 'smooth',
        })
      } else {
        const top = element.offsetTop
        if (window.scrollTo) {
          window.scrollTo({
            top,
            behavior: 'smooth',
          })
        } else {
          window.scrollTop = top
        }
      }
    } catch (e) {
      warn('GlobalStatus: Could not scroll into view!', e)
    }
  }

  gotoItem = (event, item) => {
    event.persist()
    const keyCode = keycode(event)
    if (
      (item.status_id &&
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        keyCode === 'space') ||
      keyCode === 'enter' ||
      typeof keyCode === 'undefined'
    ) {
      event.preventDefault()
      try {
        // find the element
        const element = document.getElementById(item.status_id)

        if (!element) {
          return
        }

        isElementVisible(element, (elem) => {
          try {
            // remove the blink animation again
            elem.addEventListener('blur', (e) => {
              if (e.target.classList) {
                e.target.removeAttribute('tabindex')
              }
            })

            // we don't want a visual focus style, we have our own
            elem.classList.add('dnb-no-focus')

            // in order to use the blur event
            elem.setAttribute('tabindex', '-1')

            // now show the animation
            // we use "attention-focus" in #form-status theme
            elem.focus({ preventScroll: true })
          } catch (e) {
            warn(e)
          }
        })

        // block: 'center' is not supported on IE - now we se the element above
        if (IS_IE11) {
          window.scrollTop = element.offsetTop
        } else if (typeof element.scrollIntoView === 'function') {
          // then go there
          element.scrollIntoView({
            block: 'center', // center of page
            behavior: 'smooth',
          })
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  render() {
    const { isActive, isAnimating, keepContentVisible } = this.state

    const fallbackProps = extendPropsWithContext(
      this.props,
      GlobalStatus.defaultProps,
      this.context.getTranslation(this.props).GlobalStatus
    )

    const props = extendPropsWithContext(
      GlobalStatusProvider.combineMessages([
        this.context.globalStatus,
        this.state.globalStatus,
      ]),
      GlobalStatus.defaultProps,
      fallbackProps
    )

    const lang = this.context.locale

    const {
      title,
      default_title, // eslint-disable-line
      state: rawState,
      className,
      no_animation,
      hide_close_button,
      close_text,
      class: _className,
      status_anchor_text,
      skeleton,

      id,
      item, // eslint-disable-line
      items, // eslint-disable-line
      autoclose, // eslint-disable-line
      show, // eslint-disable-line
      delay, // eslint-disable-line
      autoscroll, // eslint-disable-line
      text, // eslint-disable-line
      icon,
      icon_size,
      children, // eslint-disable-line

      ...attributes
    } = props

    const wrapperParams = {
      id,
      key: 'global-status',
      className: classnames(
        'dnb-global-status__wrapper',
        'dnb-no-focus',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      'aria-live': isActive ? 'assertive' : 'off',
      onKeyDown: this.onKeyDownHandler,
      tabIndex: '-1',
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon: icon || fallbackProps.icon,
      icon_size: icon_size || fallbackProps.icon_size,
    })
    const titleToRender =
      title || fallbackProps.title || fallbackProps.default_title
    const noAnimation = isTrue(no_animation)
    const itemsToRender = props.items || []
    const contentToRender = GlobalStatus.getContent(props)
    const style = state === 'info' ? null : 'fire-red'

    /**
     * Show aria-live="assertive" when:
     * 1. once "show" is true and before content is applied
     * so "isActive" has to have been false on first render
     */

    /**
     * Show aria-live="off" when:
     * 1. start hiding
     * 2. "show" is true from beginning+
     * + and "isActive" is also true from beginning
     * NB: This is to avoid SR reading the content once it's appearing
     */

    const params = {
      element: 'div',
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`,
        !isActive && 'dnb-global-status--hidden',
        isActive && keepContentVisible && 'dnb-global-status--visible',
        isAnimating && 'dnb-global-status--is-animating',
        noAnimation && 'dnb-global-status--no-animation'
      ),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map((item, i) => {
          const id =
            item.id || item.status_id
              ? `${item.status_id}-${i}`
              : makeUniqueId()
          const text = (item && item.text) || item
          const label = React.isValidElement(item.status_anchor_label)
            ? convertJsxToString(item.status_anchor_label)
            : item.status_anchor_label || ''
          const anchorText = String(
            item.status_anchor_text || status_anchor_text
          )
            .replace('%s', label)
            .replace(/[: ]$/g, '')
          const useAutolink =
            item.status_id && isTrue(item.status_anchor_url)

          return (
            <li key={i}>
              <p id={id} className="dnb-p">
                {text}
              </p>

              {item && (useAutolink || item.status_anchor_url) && (
                <a
                  className="dnb-anchor"
                  aria-describedby={id}
                  lang={lang}
                  href={
                    useAutolink
                      ? `#${item.status_id}`
                      : item.status_anchor_url
                  }
                  onClick={(e) => this.gotoItem(e, item)}
                  onKeyDown={(e) => this.gotoItem(e, item)}
                >
                  {anchorText}
                </a>
              )}
            </li>
          )
        })}
      </ul>
    )

    const hasContent = renderedItems || contentToRender

    const renderedContent = (
      <div className="dnb-global-status__content">
        {title !== false && (
          <p className="dnb-p dnb-global-status__title" lang={lang}>
            <span className="dnb-global-status__icon">{iconToRender}</span>
            {titleToRender}
            {!isTrue(hide_close_button) && (
              <CloseButton
                className="dnb-global-status__close-button"
                on_click={this.closeHandler}
                text={close_text}
                title={close_text}
              />
            )}
          </p>
        )}
        {hasContent && (
          <Section
            element="div"
            style_type="white"
            className="dnb-global-status__message"
          >
            <div className="dnb-global-status__message__content">
              {typeof contentToRender === 'string' ? (
                <p className="dnb-p">{contentToRender}</p>
              ) : (
                contentToRender
              )}
              {renderedItems}
            </div>
          </Section>
        )}
      </div>
    )

    return (
      <div {...wrapperParams} ref={this._wrapperRef}>
        <Section style_type={style} {...params} ref={this._mainRef}>
          <div className="dnb-global-status__shell" ref={this._shellRef}>
            {(isAnimating || keepContentVisible || isActive) &&
              renderedContent}
          </div>
        </Section>
      </div>
    )
  }
}

// Extend our component with controllers
GlobalStatus.create = (...args) => new GlobalStatusInterceptor(...args)
GlobalStatus.Set = GlobalStatus.create // Deprecated
GlobalStatus.AddStatus = GlobalStatus.create // Deprecated
GlobalStatus.Update = GlobalStatus.create
GlobalStatus.Add = GlobalStatusController
GlobalStatus.Remove = GlobalStatusController.Remove

const isElementVisible = (elem, callback, delayFallback = 1e3) => {
  if (typeof IntersectionObserver !== 'undefined') {
    const intersectionObserver = new IntersectionObserver((entries) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        intersectionObserver.unobserve(elem)
        if (typeof callback === 'function') {
          callback(elem)
        }
      }
    })
    // start observing
    intersectionObserver.observe(elem)
  } else {
    if (typeof callback === 'function') {
      return setTimeout(() => callback(elem), delayFallback)
    }
  }
  return null
}

const ErrorIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
  title: PropTypes.string,
}
ErrorIcon.defaultProps = {
  title: 'error',
}

const InfoIcon = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
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
  title: PropTypes.string,
}
InfoIcon.defaultProps = {
  title: 'info',
}
