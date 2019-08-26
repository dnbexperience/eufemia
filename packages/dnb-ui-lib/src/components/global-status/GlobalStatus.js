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
  on_close: null,
  on_hide: null,
  render_content: null
}

const propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
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
  on_close: PropTypes.func,
  on_hide: PropTypes.func,
  render_content: PropTypes.func
}

const defaultProps = {
  id: 'main',
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
  status_anchor_text: 'Gå til',
  class: null,
  demo: false,

  /** React props */
  className: null,
  children: null,

  // Web Component props
  ...renderProps
}

export default class GlobalStatus extends React.Component {
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

  static getItems(props) {
    let items = []
    if (typeof props.items === 'string' && props.items[0] === '[') {
      items = JSON.parse(props.items)
    }
    if (Array.isArray(props.items)) {
      items = props.items
    }
    if (typeof props.items === 'function') {
      items = props.items()
    }
    return items.map(item => {
      if (typeof item === 'string') {
        item = { text: item, _id: new Date().getTime() }
      }
      return item
    })
  }

  static getDerivedStateFromProps(props, state) {
    // set isActive to true, so the rerender can start showing the status
    // this will also be done by the onUpdate rerender in te constructor
    if (
      state._listenForPropChanges &&
      !state.isVisible &&
      isTrue(props.show)
    ) {
      state.isActive = true
      state.makeMeVisible = true
      if (isTrue(props.no_animation)) {
        state.isVisible = true
      }
    } else if (
      state._listenForPropChanges &&
      state.isVisible &&
      props.show !== null &&
      !isTrue(props.show)
    ) {
      state.makeMeVisible = false
      if (isTrue(props.no_animation)) {
        state.isVisible = false
      }
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
          iconToLoad = 'error'
      }

      icon = <IconPrimary aria-hidden icon={iconToLoad} size={icon_size} />
    }

    return icon
  }

  static Provider = null

  state = {
    globalStatus: null,
    isActive: false,
    isVisible: false,
    makeMeVisible: false,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)

    this._props = props
    this._mainRef = React.createRef()
    this._shellRef = React.createRef()
    this._fakeRef = React.createRef()

    this._visibility = new Animation()
    this._height = new Animation()

    this.provider = GlobalStatusProvider.Factory(props.id)

    // force rerender
    this.provider.onUpdate(globalStatus => {
      // grap that provider only state: globalStatus
      // before we actually set our new state
      const isEmptyNow = globalStatus.isEmptyNow
      delete globalStatus.isEmptyNow

      if (globalStatus.show) {
        const isActive = globalStatus.show
        this.setState({ isActive })
      }

      this.setState({ globalStatus }, () => {
        if (isEmptyNow && isTrue(this._props.autoclose)) {
          this.setHidden()
        }

        // make sure to show the new status, inc. scroll
        else if (isTrue(globalStatus.show)) {
          this.setVisible()
        }
      })
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
  }

  setVisible = () => {
    const { demo: isDemo, autoscroll, no_animation } = this.props
    const noAnimation = isTrue(no_animation)

    if (noAnimation) {
      this.setState({
        isActive: true,
        makeMeVisible: true,
        isVisible: true,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(this._props, 'on_open', this._props)
      return
    }

    // use always a delay, because of the "show" and "rerender"
    const delay = noAnimation ? 0 : parseFloat(this.props.delay) || 10
    const duration = noAnimation ? 0 : 1e3

    const onStart = () => {
      const makeMeVisible = () => {
        this.setState(
          {
            makeMeVisible: true,
            _listenForPropChanges: false
          },
          setHeight
        )
      }

      // in order to get the this._shellRef.current
      // we have to make a rerender. scrollToStatus needs the element
      this.setState(
        {
          isActive: true
        },
        () => {
          // then scroll to the content
          if (!isDemo && isTrue(autoscroll)) {
            this.scrollToStatus(makeMeVisible)
          } else {
            makeMeVisible()
          }
        }
      )
    }

    const onComplete = () => {
      this.setState({
        isVisible: true,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(this._props, 'on_open', this._props)
      if (isDemo) {
        this._isDemoHiddenId = setTimeout(this.setHidden, 800)
      }
    }

    const setHeight = () => {
      const _mainRef =
        this._mainRef.current && this._mainRef.current._ref.current

      const onComplete = () => {
        try {
          if (_mainRef) {
            let height = 0
            const elem = this._fakeRef.current
            if (elem) {
              height = parseFloat(elem.scrollHeight)
            }
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
        } catch (e) {
          console.warn('GlobalStatus: Could not set height!', e)
        }
      }

      this._height.add({
        type: 'full',
        onComplete,
        delay: 20 // delay to make the change visible to CSS
      })
    }

    this._visibility.add({
      type: 'show',
      onComplete,
      onStart,
      onPartial: () => this.state.isVisible && setHeight(),
      duration,
      delay
    })
  }
  setHidden = ({ delay = null } = {}) => {
    const { demo: isDemo, no_animation } = this.props
    const noAnimation = isTrue(no_animation)

    if (noAnimation) {
      this.setState({
        isActive: false,
        makeMeVisible: false,
        isVisible: false,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(this._props, 'on_close', this._props)
      return
    }

    if (delay === null) {
      delay = noAnimation ? 0 : 50
    }
    const duration = noAnimation ? 0 : isDemo ? 1200 : 1e3

    const onStart = () => {
      this.setState(
        {
          makeMeVisible: false,
          _listenForPropChanges: false
        },
        setHeight
      )
    }

    const onComplete = () => {
      this.setState(
        {
          isActive: false,
          isVisible: false,
          _listenForPropChanges: false
        },
        () => {
          dispatchCustomElementEvent(this._props, 'on_hide', this._props)
          if (isDemo) {
            this.setVisible()
          }
        }
      )
    }

    const setHeight = () => {
      const _mainRef =
        this._mainRef.current && this._mainRef.current._ref.current

      const onComplete = () => {
        try {
          if (_mainRef) {
            // reset transition time to default
            _mainRef.style.transition = 'height 800ms ease-in-out'
            _mainRef.style.height = 0
          }
        } catch (e) {
          console.warn('GlobalStatus: Could not reset height to zero!', e)
        }
      }

      this._height.add({
        type: 'zero',
        onComplete,
        delay: 20 // delay to make the change visible to CSS
      })
    }

    this._visibility.add({
      type: 'hide',
      onStart,
      onComplete,
      duration,
      delay
    })
  }

  isReadyToBeVisible() {
    const { show, demo } = this.props
    const { isActive, makeMeVisible, isVisible } = this.state
    return (
      makeMeVisible &&
      ((isActive && !isVisible) || (demo && (!isActive, !isVisible))) &&
      isTrue(show)
    )
  }
  isReadyToBeHidden() {
    const { show, demo } = this.props
    const { isActive, makeMeVisible, isVisible } = this.state
    return (
      !makeMeVisible && isActive && isVisible && !demo && !isTrue(show)
    )
  }

  showingHasStarted() {
    const { isActive, makeMeVisible, isVisible } = this.state
    return isActive && makeMeVisible && !isVisible
  }
  hidingHasStarted() {
    const { isActive, makeMeVisible, isVisible } = this.state
    return isActive && !makeMeVisible && isVisible
  }

  closeHandler = () => {
    this.setHidden({ delay: 0 })
    dispatchCustomElementEvent(this._props, 'on_close', this._props)
  }

  scrollToStatus(isDone = null) {
    try {
      // dispatchCustomElementEvent(this._props, 'on_scroll_to')
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
    const { makeMeVisible, isActive, isVisible } = this.state

    if (!isActive) {
      // because of screen readers will else read the content on page load, if:
      // 1. "show" is true from beginning, then we never come here
      // to make sure we double check that situation
      this.wasHiddenBefore = true
      return <></>
    }

    // consume the globalStatus context (considdering of using extendPropsWithContext)
    const props = Object.assign(
      {},
      this.props,
      this.context.globalStatus,
      this.state.globalStatus
    )
    this._props = props

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
      ids, // eslint-disable-line
      demo, // eslint-disable-line
      item, // eslint-disable-line
      items, // eslint-disable-line
      autoclose, // eslint-disable-line
      show, // eslint-disable-line
      delay, // eslint-disable-line
      autoscroll, // eslint-disable-line
      text, // eslint-disable-line
      icon, // eslint-disable-line
      icon_size, // eslint-disable-line
      children, // eslint-disable-line

      ...attributes
    } = props

    if (this.isReadyToBeVisible()) {
      this.setVisible({ isInRender: true })
    } else if (this.isReadyToBeHidden()) {
      this.setHidden({ isInRender: true })
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const noAnimation = isTrue(no_animation)
    const itemsToRender = GlobalStatus.getItems(props)
    const contentToRender = GlobalStatus.getContent(props)

    const params = {
      element: 'div',
      'aria-live':
        this.hidingHasStarted() || (!this.wasHiddenBefore && isTrue(show))
          ? 'off'
          : 'assertive',
      role: 'status',
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`,
        this.showingHasStarted() && 'dnb-global-status--fade-in',
        this.hidingHasStarted() && 'dnb-global-status--fade-out',
        noAnimation && 'dnb-global-status--no-animation',
        // noAnimation &&
        //   (isActive
        //     ? 'dnb-global-status--visible'
        //     : 'dnb-global-status--hidden'),
        createSpacingClasses(props),
        className,
        _className
      ),
      ...attributes
    }

    const style = state === 'info' ? null : 'cherry-red'

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const Content = (
      <div className="dnb-global-status__shell" ref={this._shellRef}>
        <div className="dnb-global-status__content">
          <p className="dnb-global-status__title">
            <span className="dnb-global-status__icon">{iconToRender}</span>
            {title || default_title}
            {!isTrue(hide_close_button) && (
              <CloseButton
                on_click={this.closeHandler}
                title={close_text}
              />
            )}
          </p>
          <div className="dnb-global-status__message">
            {typeof contentToRender === 'string' ? (
              <p className="dnb-p">{contentToRender}</p>
            ) : (
              contentToRender
            )}

            {itemsToRender.length > 0 && (
              <ul className="dnb-ul">
                {itemsToRender.map((item, i) => {
                  return (
                    <li key={i}>
                      {(item && item.text) || item}
                      {item &&
                        ((item.status_id &&
                          isTrue(item.status_anchor_url)) ||
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
                                          e.target.removeAttribute(
                                            'tabindex'
                                          )
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
            )}
          </div>
        </div>
      </div>
    )

    return (
      <>
        <Section style_type={style} {...params} ref={this._mainRef}>
          {(makeMeVisible || isVisible || noAnimation) && Content}
        </Section>
        {!noAnimation && (
          <div
            className="dnb-global-status dnb-global-status__fake"
            aria-hidden="true"
            ref={this._fakeRef}
          >
            {Content}
          </div>
        )}
      </>
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
    title={text}
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
  text: 'Lukk'
}

// const Update = GlobalStatusController
// export { Update, CloseButton }

// Extend with update handler
GlobalStatus.Update = GlobalStatusController
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
