/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  isTrue,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  processChildren
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import GlobalStatusController from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import IconPrimary from '../icon-primary/IconPrimary'
import Button from '../button/Button'
import Section from '../section/Section'
import Animation from './AnimationHelper'

const renderProps = {
  on_open: null,
  on_show: null,
  on_close: null,
  on_hide: null,
  render_content: null
}

const propTypes = {
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
  status_anchor_text: PropTypes.string,
  class: PropTypes.string,
  demo: PropTypes.bool,

  /** React props */
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),

  // Web Component props
  on_open: PropTypes.func,
  on_show: PropTypes.func,
  on_close: PropTypes.func,
  on_hide: PropTypes.func,
  render_content: PropTypes.func
}

const defaultProps = {
  id: 'main',
  status_id: 'status-main',
  title: null,
  default_title: 'En feil har skjedd',
  text: null,
  items: [],
  icon: 'error',
  icon_size: 'medium',
  state: 'error',
  show: null,
  autoscroll: true,
  autoclose: true,
  no_animation: false,
  close_text: 'Lukk', // Close Modal Window
  hide_close_button: false,
  delay: 10,
  duration: 1e3,
  status_anchor_text: 'Gå til',
  class: null,
  demo: false,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class GlobalStatus extends React.PureComponent {
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
          iconToLoad = 'error'
      }

      icon = <IconPrimary aria-hidden icon={iconToLoad} size={icon_size} />
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
      state.globalStatus = GlobalStatusProvider.combineMessages([
        state.globalStatus,
        props
      ])
    }

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

    // force rerender
    this.provider.onUpdate((globalStatus, props, { isEmpty = false }) => {
      // we need the on_close later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.on_close) {
        this._globalStatus = globalStatus
      }

      this.setState({ globalStatus, _listenForPropChanges: false })

      const isActive = isTrue(globalStatus.show)
      if (isActive) {
        this.setState({ isActive, _listenForPropChanges: false })
      }

      if (isEmpty && isTrue(globalStatus.autoclose)) {
        this.setHidden({ delay: 0 })
      }

      // make sure to show the new status, inc. scroll
      else if (isTrue(globalStatus.show)) {
        this.setVisible({ delay: 0 })
      }
    })
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
    clearTimeout(this._scrollToStatusId)
    clearTimeout(this._isDemoHiddenId)

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
      return
    }

    const onStart = () => {
      // in order to get the this._shellRef.current
      // we have to make a rerender. scrollToStatus needs the element
      this.setState(
        {
          isActive: true,
          makeMeVisible: true,
          makeMeHidden: false,
          _listenForPropChanges: false
        },
        () => {
          // then scroll to the content
          if (isTrue(this.state.globalStatus.autoscroll) && !isDemo) {
            setTimeout(() => {
              this.scrollToStatus(() => this.setHeight('full'))
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
        this._isDemoHiddenId = setTimeout(this.setHidden, 800)
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
      return
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
            this._isDemoHiddenId = setTimeout(this.setVisible, 800)
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
                    _mainRef.style.transition = `height ${height *
                      3}ms ease-in-out`
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
        console.warn('GlobalStatus: Could not set height!', e)
      }
    }

    this._height.add({
      type: mode,
      onStart,
      onComplete: setHeight,
      delay: 20 // isReadyToBeHiddendelay to make the change visible to CSS
    })
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

  closeHandler = () => {
    this.setHidden({ delay: 0 })
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
      if (element) {
        this._scrollToStatusId = isElementVisible(element, isDone)
        element.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        })
      } else if (typeof window !== 'undefined') {
        const top = 0
        window.scrollTop = top
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
      }
    } catch (e) {
      console.warn('GlobalStatus: Could not scroll into view!', e)
    }
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

    const props = this.context.globalStatus
      ? GlobalStatusProvider.combineMessages([
          this.context.globalStatus,
          this.state.globalStatus
        ])
      : this.state.globalStatus

    const {
      title,
      default_title,
      state: rawState,
      className,
      no_animation,
      hide_close_button,
      close_text,
      class: _className,
      status_anchor_text,

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
      icon, // eslint-disable-line
      icon_size, // eslint-disable-line
      children, // eslint-disable-line

      ...attributes
    } = props

    const wrapperParams = {
      key: 'global-status',
      className: classnames(
        'dnb-global-status__wrapper',
        createSpacingClasses(props),
        className,
        _className
      ),
      'aria-live': this.hidingHasStarted() ? 'off' : 'assertive'
    }

    if (!isActive) {
      // because of screen readers will else read the content on page load, if:
      // 1. if "show" is true from beginning, then we never come here
      // to make sure we double check that situation
      return <div {...wrapperParams}></div>
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const noAnimation = isTrue(no_animation)
    const itemsToRender = props.items || []
    const contentToRender = GlobalStatus.getContent(props)
    const style = state === 'info' ? null : 'cherry-red'

    /**
     * Show aria-live="assertive" when:
     * 1. once "show" is true and before content is aplyed
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

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map((item, i) => {
          return (
            <li key={i}>
              {(item && item.text) || item}
              {item &&
                ((item.status_id && isTrue(item.status_anchor_url)) ||
                  item.status_anchor_url) && (
                  <a
                    className="dnb-anchor"
                    href={
                      isTrue(item.status_anchor_url)
                        ? `#${item.status_id}`
                        : item.status_anchor_url
                    }
                    onClick={e => {
                      if (
                        item.status_id &&
                        typeof document !== 'undefined'
                      ) {
                        e.preventDefault()
                        try {
                          // find the element
                          const element = document.getElementById(
                            item.status_id
                          )

                          if (!element) {
                            return
                          }

                          isElementVisible(element, elem => {
                            try {
                              // remove the blink animation again
                              elem.addEventListener('blur', e => {
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
                              console.warn(e)
                            }
                          })

                          // then go there
                          element.scrollIntoView({
                            block: 'center', // center of page
                            behavior: 'smooth'
                          })
                        } catch (e) {
                          console.warn(e)
                        }
                        return false
                      }
                    }}
                  >
                    {status_anchor_text || item.status_anchor_text}
                  </a>
                )}
            </li>
          )
        })}
      </ul>
    )

    const renderedContent = (
      <div className="dnb-global-status__shell" ref={this._shellRef}>
        <div className="dnb-global-status__content">
          {title !== false && (
            <p className="dnb-global-status__title">
              <span className="dnb-global-status__icon">
                {iconToRender}
              </span>
              {title || default_title}
              {!isTrue(hide_close_button) && (
                <CloseButton
                  on_click={this.closeHandler}
                  title={close_text}
                />
              )}
            </p>
          )}
          <div className="dnb-global-status__message">
            {typeof contentToRender === 'string' ? (
              <p className="dnb-p">{contentToRender}</p>
            ) : (
              contentToRender
            )}
            {renderedItems}
          </div>
        </div>
      </div>
    )

    return (
      <div {...wrapperParams}>
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
  text: defaultProps.close_text
}

// Extend our component with controllers
GlobalStatus.Set = (...args) => new GlobalStatusController(...args)
GlobalStatus.Update = GlobalStatusController
GlobalStatus.Add = GlobalStatusController
GlobalStatus.Remove = GlobalStatusController.Remove

const isElementVisible = (elem, callback, delayFallback = 1e3) => {
  if (typeof IntersectionObserver !== 'undefined') {
    const intersectionObserver = new IntersectionObserver(entries => {
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
