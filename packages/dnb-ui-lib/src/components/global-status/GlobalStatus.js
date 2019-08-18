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
  show: false,
  autoscroll: true,
  autoclose: true,
  no_animation: false,
  close_text: 'Lukk', // Close Modal Window
  hide_close_button: false,
  delay: 100,
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
    if (state._listenForPropChanges && isTrue(props.show)) {
      state.isActive = true
    }
    // if (
    //   state._listenForPropChanges &&
    //   state.isVisible &&
    //   !isTrue(props.show)
    // ) {
    //   state.isActive = false
    // }
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
      const isEmptyNow = globalStatus.isEmptyNow
      delete globalStatus.isEmptyNow

      this.setState({ globalStatus })

      if (isEmptyNow && isTrue(this.props.autoclose)) {
        this.setHidden()
      }

      // make sure to show the new status, inc. scroll
      else if (isTrue(globalStatus.show)) {
        this.setVisible()
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
    this._props = null
    clearTimeout(this.delayId)
    clearTimeout(this.setVisibleId)
    clearTimeout(this.setHiddenId)
  }

  setVisible = () => {
    const delay = parseFloat(this.props.delay) || 10

    const run = () => {
      this.setState({
        startShowing: true,
        startHiding: false,
        isActive: true,
        _listenForPropChanges: false
      })

      clearTimeout(this.setVisibleId)
      clearTimeout(this.setHiddenId)

      this.setVisibleId = setTimeout(() => {
        this.setState(
          {
            startShowing: false,
            isVisible: true,
            _listenForPropChanges: false
          },
          () => {
            dispatchCustomElementEvent(this._props, 'on_open', this._props)
            if (!this.props.demo && isTrue(this.props.autoscroll)) {
              this.scrollToStatus()
            }
            if (this.props.demo) {
              this.setHiddenId = setTimeout(() => {
                this.setHidden()
              }, 2e3)
            }
          }
        )
      }, 200)
    }

    if (delay > 0) {
      clearTimeout(this.delayId)
      this.delayId = setTimeout(run, delay)
    } else {
      run()
    }
  }
  setHidden = () => {
    if (isTrue(this.props.no_animation)) {
      this.setState({
        visible: false,
        _listenForPropChanges: false
      })
    } else {
      this.setState({
        startHiding: true,
        startShowing: false,
        _listenForPropChanges: false
      })
    }

    clearTimeout(this.setVisibleId)
    clearTimeout(this.setHiddenId)
    clearTimeout(this.delayId)

    this.setHiddenId = setTimeout(
      () => {
        this.setState(
          {
            startHiding: false, // do not reset startHiding
            isActive: false,
            isVisible: false,
            _listenForPropChanges: false
          },
          () => {
            dispatchCustomElementEvent(this._props, 'on_hide', this._props)
            if (this.props.demo) {
              this.setVisible()
            }
          }
        )
      },
      this.props.demo ? 2e3 : 1200
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
      demo,
      class: _className,
      status_anchor_text,

      id, // eslint-disable-line
      ids, // eslint-disable-line
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

    const { isActive, startShowing, startHiding, isVisible } = this.state

    if (
      ((isActive && !isVisible) || (demo && (!isActive, !isVisible))) &&
      !startShowing &&
      !startHiding &&
      !isTrue(no_animation) &&
      isTrue(show)
    ) {
      this.setVisible()
      // this.setVisibleId = setTimeout(() => {
      // }, 10) // avoid React warning
    }
    // if (
    //   ((isActive && isVisible) || (demo && (isActive, isVisible))) &&
    //   !startShowing &&
    //   !startHiding &&
    //   !isTrue(no_animation)
    //   // !isTrue(show)
    // ) {
    //   // this.setVisibleId = setTimeout(() => {
    //   // }, 10) // avoid React warning
    //   this.setHidden()
    // }

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
        (startShowing || isVisible) &&
          !startHiding &&
          'dnb-global-status--max-height',
        startHiding && isVisible && 'dnb-global-status--zero-height',
        (startShowing || isVisible) &&
          !startHiding &&
          'dnb-global-status--fade-in',
        startHiding && isVisible && 'dnb-global-status--fade-out',
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

    if (!isActive) {
      params['aria-hidden'] = true
    }
    if (isVisible && hasStringContent) {
      // in case we send in a React component, witchs has its own state, then we dont want to have aria-live all the time active
      params['aria-live'] = 'assertive'
    }

    const style = state === 'info' ? null : 'cherry-red'

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)
    // validateDOMAttributes(null, textParams)

    if (!isActive) {
      return <></>
    }

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
                          (item.status_id || item.status_anchor_url) && (
                            <a
                              className="dnb-anchor"
                              href={
                                item.status_id
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
