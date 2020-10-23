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
  processChildren,
  extendPropsWithContext
} from '../../shared/component-helper'
import {
  skeletonDOMAttributes,
  createSkeletonClass
} from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import GlobalStatusController from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import Icon from '../icon/Icon'
import { InfoIcon, ErrorIcon } from '../form-status/FormStatus'
import Button from '../button/Button'
import Section from '../section/Section'
import Animation from './AnimationHelper'
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
      PropTypes.node
    ]),
    items: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.array
    ]),
    icon: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),
    icon_size: PropTypes.string,
    state: PropTypes.oneOf(['error', 'info']),
    show: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoscroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoclose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    close_text: PropTypes.string,
    hide_close_button: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    omit_set_focus: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    omit_set_focus_on_update: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    status_anchor_text: PropTypes.string,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    class: PropTypes.string,
    demo: PropTypes.bool,

    /** React props */
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node
    ]),

    on_open: PropTypes.func,
    on_show: PropTypes.func,
    on_close: PropTypes.func,
    on_hide: PropTypes.func
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
    show: null,
    autoscroll: true,
    autoclose: true,
    no_animation: false,
    close_text: 'Lukk',
    hide_close_button: false,
    omit_set_focus: false,
    omit_set_focus_on_update: false,
    delay: 10,
    duration: 1e3,
    status_anchor_text: null,
    skeleton: null,
    class: null,
    demo: false,

    /** React props */
    className: null,
    children: null,

    on_open: null,
    on_show: null,
    on_close: null,
    on_hide: null
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
      if (isTrue(props.show)) {
        state.makeMeVisible = true
      } else if (props.show !== null && !isTrue(props.show)) {
        state.makeMeHidden = true
      }
      if (state._items !== props.items) {
        state.globalStatus = GlobalStatusProvider.combineMessages([
          state.globalStatus,
          props
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
    isVisible: false,
    makeMeVisible: false,
    makeMeHidden: false,
    _listenForPropChanges: false
  }

  constructor(props) {
    super(props)

    this._mainRef = React.createRef()
    this._shellRef = React.createRef()
    this._fakeRef = React.createRef()

    this._visibility = new Animation()
    this._height = new Animation()

    this.provider = GlobalStatusProvider.create(props.id)

    // add the props as the first stack
    this.state.globalStatus = this._globalStatus = this.provider.init(
      props
    )

    // and make it visible from start, if needed
    if (isTrue(props.show)) {
      if (isTrue(props.no_animation)) {
        this.state.isActive = true
      } else {
        this.state.makeMeVisible = true
      }
    }

    // force re-render
    this.provider.onUpdate((globalStatus) => {
      // we need the on_close later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.on_close) {
        this._globalStatus = globalStatus
      }

      this.setState({
        globalStatus,
        _listenForPropChanges: false
      })

      const isActive = isTrue(globalStatus.show)
      if (isActive) {
        this.setState({ isActive, _listenForPropChanges: false })
      }

      // make sure to show the new status, inc. scroll
      if (
        globalStatus.items &&
        globalStatus.items.length === 0 &&
        isTrue(this.props.autoclose) &&
        !isTrue(this.props.show)
      ) {
        this.setHidden({ delay: 0 })
      } else if (isTrue(this.props.show) || isTrue(globalStatus.show)) {
        this.setVisible({ delay: 0 })
      }
    })

    this.initialActiveElement = null
  }

  correctStatus(state) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  componentWillUnmount() {
    this._visibility.unbind()
    this._height.unbind()
    clearTimeout(this._scrollToStatusTimeout)
    clearTimeout(this._isDemoHiddenTimeout)
    clearTimeout(this._scrollTimeout)

    // NB: Never unbind the provider,
    // as a new provider else will be set BEFORE thi unmount is called
    // on the other hand; setting up the provider
    // at the stage of componentDidMount is too late
    // this.provider.unbind()

    // so we inly empty the events
    this.provider.empty()
  }

  setVisible = ({
    delay = parseFloat(this.props.delay),
    duration = parseFloat(this.props.duration)
  } = {}) => {
    const { demo: isDemo, no_animation } = this.props
    const noAnimation = isTrue(no_animation)

    if (noAnimation) {
      this.setState({
        isActive: true,
        isVisible: true,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(
        this._globalStatus,
        'on_show',
        this._globalStatus
      )
      dispatchCustomElementEvent(
        this._globalStatus,
        'on_open',
        this._globalStatus
      )
      this.setFocus()
      return // stop here
    }

    const onStart = () => {
      // in order to get the this._shellRef.current
      // we have to make a re-render. scrollToStatus needs the element
      this.setState(
        {
          isActive: true,
          makeMeVisible: true,
          makeMeHidden: false,
          _listenForPropChanges: false
        },
        () => {
          this.setFocus()
          // then scroll to the content
          if (isTrue(this.state.globalStatus.autoscroll) && !isDemo) {
            clearTimeout(this._scrollTimeout)
            this._scrollTimeout = setTimeout(() => {
              this.scrollToStatus(() => {
                this.setHeight('full')
              })
            }, 1) // because we have to wait for the element to be visible to the dom (chrome)
          } else {
            this.setHeight('full')
          }
        }
      )
    }

    const wasVisibleFromBefore = this.state.isVisible

    const onComplete = () => {
      this._setVisibleId = null
      this.setState({
        makeMeVisible: false,
        isVisible: true,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(
        this._globalStatus,
        'on_show',
        this._globalStatus
      )
      if (!wasVisibleFromBefore) {
        dispatchCustomElementEvent(
          this._globalStatus,
          'on_open',
          this._globalStatus
        )
      }
      if (isDemo) {
        this._isDemoHiddenTimeout = setTimeout(this.setHidden, 800)
      }
    }

    this._visibility.add({
      type: 'show',
      onStart,
      onComplete,
      onPartial: () => this.state.makeMeVisible && this.setHeight('full'),
      duration,
      delay
    })
  }

  setHidden = ({
    delay = parseFloat(this.props.delay),
    duration = parseFloat(this.props.duration)
  } = {}) => {
    const { demo: isDemo, no_animation } = this.props
    const noAnimation = isTrue(no_animation)

    this.hadFocus = false

    if (noAnimation) {
      this.setState({
        isActive: false,
        isVisible: false,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(
        this._globalStatus,
        'on_close',
        this._globalStatus
      )
      return // stop here
    }

    const onStart = () => {
      this.setState(
        {
          makeMeVisible: false,
          makeMeHidden: true,
          _listenForPropChanges: false
        },
        () => this.setHeight('zero')
      )
    }

    const onComplete = () => {
      this._setHiddenId = null
      this.setState(
        {
          isActive: false,
          isVisible: false,
          makeMeHidden: false,
          _listenForPropChanges: false
        },
        () => {
          if (this._globalStatus) {
            dispatchCustomElementEvent(
              this._globalStatus,
              'on_close',
              this._globalStatus
            )
          }
          if (isDemo) {
            this._isDemoHiddenTimeout = setTimeout(this.setVisible, 800)
          }
        }
      )
    }

    this._visibility.add({
      type: 'hide',
      onStart,
      onComplete,
      duration,
      delay
    })
  }

  onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'esc':
        e.preventDefault()
        this.closeHandler()
        break
    }
  }

  setHeight = (mode = 'full') => {
    let _mainRef

    const onStart = () => {
      _mainRef =
        this._mainRef.current && this._mainRef.current._ref.current
    }

    const setHeight = () => {
      try {
        if (_mainRef) {
          switch (mode) {
            case 'full':
              {
                const elem = this._fakeRef.current
                const height = elem ? parseFloat(elem.scrollHeight) : 0
                if (height > 0) {
                  const currentHeight = parseFloat(_mainRef.style.height)
                  if (!(currentHeight > 0)) {
                    _mainRef.style.height = 0
                    _mainRef.style.transition = `height ${
                      height * 3
                    }ms ease-in-out`
                  } else {
                    const diff = Math.abs(currentHeight - height)
                    const speed = height * 3 - diff
                    _mainRef.style.transition = `height ${speed}ms ease-in-out`
                  }

                  _mainRef.style.height = `${height}px`
                }
              }
              break

            case 'zero': {
              // reset transition time to default
              _mainRef.style.transition = 'height 800ms ease-in-out'
              _mainRef.style.height = '0'
            }
          }
        }
      } catch (e) {
        warn('GlobalStatus: Could not set height!', e)
      }
    }

    this._height.add({
      type: mode,
      onStart,
      onComplete: setHeight,
      delay: 20 // isReadyToBeHiddendelay to make the change visible to CSS
    })
  }

  setFocus() {
    if (this._shellRef.current && !isTrue(this.props.omit_set_focus)) {
      if (
        isTrue(this.props.omit_set_focus_on_update) ? !this.hadFocus : true
      ) {
        this._shellRef.current.focus({ preventScroll: true })
        this.hadFocus = true
      }
      if (
        typeof document !== 'undefined' &&
        document.activeElement !== this._shellRef.current
      ) {
        this.initialActiveElement = document.activeElement
      }
    }
  }

  closeHandler = () => {
    this.setHidden({ delay: 0 })
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
    try {
      // dispatchCustomElementEvent(this.state.globalStatus, 'on_scroll_to')
      const element = this._shellRef.current
      this._scrollToStatusTimeout = isElementVisible(element, isDone)
      if (element && !IS_IE11) {
        element.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        })
      } else if (typeof window !== 'undefined') {
        const top = element.offsetTop
        if (window.scrollTo) {
          window.scrollTo({
            top,
            behavior: 'smooth'
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
    const keyCode = keycode(event)
    if (
      (item.status_id &&
        typeof document !== 'undefined' &&
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

        // block: 'center' is not suported on IE - now we se the element above
        if (IS_IE11) {
          window.scrollTop = element.offsetTop
        } else {
          // then go there
          element.scrollIntoView({
            block: 'center', // center of page
            behavior: 'smooth'
          })
        }
      } catch (e) {
        warn(e)
      }
    }
  }

  isReadyToBeVisible() {
    const { show } = this.props
    const { isActive, makeMeVisible, isVisible } = this.state
    return makeMeVisible && !isActive && !isVisible && isTrue(show)
  }
  isReadyToBeHidden() {
    const { show } = this.props
    const { isActive, makeMeHidden, isVisible } = this.state
    return makeMeHidden && isActive && isVisible && !isTrue(show)
  }

  showingHasStarted() {
    const { isActive, makeMeVisible, isVisible } = this.state
    return isActive && makeMeVisible && !isVisible
  }
  hidingHasStarted() {
    const { isActive, makeMeHidden, isVisible } = this.state
    return isActive && makeMeHidden && isVisible
  }

  render() {
    if (!this._setVisibleId && this.isReadyToBeVisible()) {
      clearTimeout(this._setVisibleId)
      this._setVisibleId = setTimeout(() => this.setVisible(), 1) // because of render reconciliation
    } else if (!this._setHiddenId && this.isReadyToBeHidden()) {
      clearTimeout(this._setHiddenId)
      this._setHiddenId = setTimeout(() => this.setHidden(), 1) // because of render reconciliation
    }

    const { isActive, makeMeVisible, makeMeHidden, isVisible } = this.state

    const extendedProps = extendPropsWithContext(
      this.state.globalStatus,
      GlobalStatus.defaultProps,
      this.context.translation.GlobalStatus
    )

    const fallbackProps = extendPropsWithContext(
      this.props,
      GlobalStatus.defaultProps,
      this.context.translation.GlobalStatus
    )

    const props = this.context.globalStatus
      ? GlobalStatusProvider.combineMessages([
          this.context.globalStatus,
          extendedProps
        ])
      : extendedProps

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

      id, // eslint-disable-line
      demo, // eslint-disable-line
      item, // eslint-disable-line
      items, // eslint-disable-line
      autoclose, // eslint-disable-line
      show, // eslint-disable-line
      delay, // eslint-disable-line
      duration, // eslint-disable-line
      autoscroll, // eslint-disable-line
      text, // eslint-disable-line
      icon,
      icon_size,
      children, // eslint-disable-line

      ...attributes
    } = props

    const wrapperParams = {
      key: 'global-status',
      className: classnames(
        'dnb-global-status__wrapper',
        'dnb-no-focus',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className,
        _className
      ),
      'aria-live': this.hidingHasStarted() ? 'off' : 'assertive',
      onKeyDown: this.onKeyDownHandler,
      tabIndex: '-1'
    }

    if (!isActive) {
      // because of screen readers will else read the content on page load, if:
      // 1. if "show" is true from beginning, then we never come here
      // to make sure we double check that situation
      return <div {...wrapperParams} />
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon: icon || fallbackProps.icon,
      icon_size: icon_size || fallbackProps.icon_size
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
        this.showingHasStarted() && 'dnb-global-status--fade-in',
        this.hidingHasStarted() && 'dnb-global-status--fade-out',
        noAnimation && 'dnb-global-status--no-animation'
      ),
      ...attributes
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map((item, i) => {
          const id = item.id || makeUniqueId()
          const text = (item && item.text) || item
          const anchorText = String(
            item.status_anchor_text || status_anchor_text
          )
            .replace('%s', item.status_anchor_label || '')
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
      <div className="dnb-global-status__shell">
        <div className="dnb-global-status__content">
          {title !== false && (
            <p className="dnb-p dnb-global-status__title" lang={lang}>
              <span className="dnb-global-status__icon">
                {iconToRender}
              </span>
              {titleToRender}
              {!isTrue(hide_close_button) && (
                <CloseButton
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
              {typeof contentToRender === 'string' ? (
                <p className="dnb-p">{contentToRender}</p>
              ) : (
                contentToRender
              )}
              {renderedItems}
            </Section>
          )}
        </div>
      </div>
    )

    return (
      <div {...wrapperParams} ref={this._shellRef}>
        <Section style_type={style} {...params} ref={this._mainRef}>
          {(makeMeVisible || makeMeHidden || isVisible || noAnimation) &&
            renderedContent}
        </Section>
        {!noAnimation && (
          <div
            className="dnb-global-status dnb-global-status__fake"
            aria-hidden="true"
            ref={this._fakeRef}
          >
            {renderedContent}
          </div>
        )}
      </div>
    )
  }
}

const CloseButton = ({ on_click, text, className = null }) => (
  <Button
    type="button"
    variant="tertiary"
    size="medium"
    className={classnames('dnb-global-status__close-button', className)}
    icon="close"
    icon_size="medium"
    icon_position="left"
    aria-label={text}
    text={text}
    on_click={on_click}
  />
)
CloseButton.propTypes = {
  on_click: PropTypes.func.isRequired,
  className: PropTypes.string,
  text: PropTypes.string
}
CloseButton.defaultProps = {
  className: null,
  text: GlobalStatus.defaultProps.close_text
}

// Extend our component with controllers
GlobalStatus.Set = (...args) => new GlobalStatusController(...args)
GlobalStatus.AddStatus = GlobalStatus.Set
GlobalStatus.Update = GlobalStatusController.Update
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
