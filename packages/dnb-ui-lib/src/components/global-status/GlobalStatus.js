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
  icon: 'exclamation',
  icon_size: 'medium',
  state: 'error',
  show: null,
  autoscroll: true,
  autoclose: true,
  no_animation: false,
  close_text: 'Lukk', // Close Modal Window
  hide_close_button: false,
  delay: 200,
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
      state.startShowing = true
      if (isTrue(props.no_animation)) {
        state.isVisible = true
      }
    } else if (
      state._listenForPropChanges &&
      state.isVisible &&
      props.show !== null &&
      !isTrue(props.show)
    ) {
      state.startHiding = true
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
          iconToLoad = 'exclamation'
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
    startShowing: false,
    startHiding: false,
    _listenForPropChanges: true
  }

  constructor(props) {
    super(props)

    this._props = props
    this._ref = React.createRef()
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

      this.setState({ globalStatus })

      if (isEmptyNow && isTrue(this._props.autoclose)) {
        this.setHidden()
      }

      // make sure to show the new status, inc. scroll
      else if (isTrue(globalStatus.show)) {
        this.setVisible()
      }
    })

    this.animation = new Animation()
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
    this.animation.unbind()
  }

  setVisible = ({ isInRender = false } = {}) => {
    const { demo: isDemo, autoscroll, no_animation } = this.props
    const noAnimation = isTrue(no_animation)
    if (isInRender && noAnimation) {
      return
    }
    const delay = noAnimation ? 0 : parseFloat(this.props.delay) || 200
    const duration = noAnimation ? 0 : 1e3
    const onStart = () => {
      this.setState({
        isActive: true,
        startShowing: true,
        startHiding: false,
        _listenForPropChanges: false
      })
    }
    const onComplete = () => {
      this.setState({
        startShowing: false,
        isVisible: true,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(this._props, 'on_open', this._props)
      if (!isDemo && isTrue(autoscroll)) {
        this.scrollToStatus()
      }
      if (isDemo) {
        this.setHiddenId = setTimeout(() => {
          this.setHidden()
        }, 2e3)
      }
    }

    this.animation.add({
      type: 'show',
      onComplete,
      onStart,
      duration,
      delay
    })
  }
  setHidden = ({ isInRender = false } = {}) => {
    const { demo: isDemo, no_animation } = this.props
    const noAnimation = isTrue(no_animation)
    if (isInRender && noAnimation) {
      return
    }
    const delay = noAnimation ? 0 : 200
    const duration = noAnimation ? 0 : isDemo ? 2e3 : 1e3
    const onStart = () => {
      this.setState({
        startHiding: true,
        startShowing: false,
        _listenForPropChanges: false
      })
    }
    const onComplete = () => {
      this.setState({
        startHiding: false, // do not reset startHiding
        isActive: false,
        isVisible: false,
        _listenForPropChanges: false
      })
      dispatchCustomElementEvent(this._props, 'on_hide', this._props)
      if (isDemo) {
        this.setVisible()
      }
    }

    this.animation.add({
      type: 'hide',
      onComplete,
      onStart,
      duration,
      delay
    })
  }

  isBeforeVisibleState() {
    const { show, demo } = this.props
    const { isActive, startShowing, startHiding, isVisible } = this.state
    return (
      startShowing &&
      !startHiding &&
      ((isActive && !isVisible) || (demo && (!isActive, !isVisible))) &&
      isTrue(show)
    )
  }
  isAfterVisibleState() {
    const { show, demo } = this.props
    const { isActive, startShowing, startHiding, isVisible } = this.state
    return (
      !startShowing &&
      startHiding &&
      isActive &&
      isVisible &&
      !demo &&
      !isTrue(show)
    )
  }

  isBeforeAnimationState() {
    const { isActive, startShowing, startHiding, isVisible } = this.state
    return isActive && (startShowing || isVisible) && !startHiding
  }
  isAfterAnimationState() {
    const { isActive, startShowing, startHiding, isVisible } = this.state
    return (
      isActive &&
      startHiding &&
      !startShowing && // was not used before!
      isVisible
    )
  }

  closeHandler = () => {
    dispatchCustomElementEvent(this._props, 'on_close', this._props)
    this.setHidden()
  }

  scrollToStatus() {
    if (typeof window === 'undefined') {
      return
    }
    try {
      // dispatchCustomElementEvent(this._props, 'on_scroll_to')
      if (this._ref.current) {
        this._ref.current.scrollIntoView({
          block: 'center',
          behavior: 'smooth'
        })
      } else {
        const top = 0
        window.scrollTop = top
        window.scrollTo({
          top,
          behavior: 'smooth'
        })
      }
    } catch (e) {
      console.warn('Could not scroll to top', e)
    }
  }

  render() {
    const { isActive, isVisible } = this.state

    if (!isActive) {
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

    if (this.isBeforeVisibleState()) {
      this.setVisible({ isInRender: true })
    } else if (this.isAfterVisibleState()) {
      this.setHidden({ isInRender: true })
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon,
      icon_size
    })
    const itemsToRender = GlobalStatus.getItems(props)
    const contentToRender = GlobalStatus.getContent(props)
    const hasStringContent =
      typeof contentToRender === 'string' && contentToRender.length > 0

    const params = {
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`,
        this.isBeforeAnimationState() && 'dnb-global-status--max-height',
        this.isAfterAnimationState() && 'dnb-global-status--zero-height',
        this.isBeforeAnimationState() && 'dnb-global-status--fade-in',
        this.isAfterAnimationState() && 'dnb-global-status--fade-out',
        isTrue(no_animation) && 'dnb-global-status--no-animation',
        isTrue(no_animation) &&
          (isActive
            ? 'dnb-global-status--visible'
            : 'dnb-global-status--hidden'),
        createSpacingClasses(props),
        className,
        _className
      ),

      ...attributes
    }

    // check for isVisible, so we realert the user for content change
    if (isVisible && hasStringContent) {
      // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      params['aria-live'] = 'assertive'
    }

    const style = state === 'info' ? null : 'cherry-red'

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    // validateDOMAttributes(null, textParams)

    return (
      <Section element="div" style_type={style} {...params}>
        <div className="dnb-global-status__shell" ref={this._ref}>
          <div className="dnb-global-status__content">
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

                                    // remove the blink animation again
                                    element.addEventListener('blur', e => {
                                      if (e.target.classList) {
                                        e.target.removeAttribute(
                                          'tabindex'
                                        )
                                      }
                                    })

                                    // we don't want a visual focus style, we have our own
                                    element.classList.add('dnb-no-focus')

                                    // in order to use the blur event
                                    element.setAttribute('tabindex', '-1')
                                    element.focus({ preventScroll: true })

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
                              {status_anchor_text ||
                                item.status_anchor_text}
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
      </Section>
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
