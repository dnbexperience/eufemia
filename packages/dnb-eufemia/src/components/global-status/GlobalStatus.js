/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContextInClassComponent,
  keycode,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import {
  spacingPropTypes,
  createSpacingClasses,
} from '../space/SpacingHelper'
import Hr from '../../elements/hr/Hr'
import GlobalStatusController, {
  GlobalStatusInterceptor,
} from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import Icon from '../icon/Icon'
import { InfoIcon, ErrorIcon, WarnIcon } from '../form-status/FormStatus'
import Section from '../section/Section'
import Button from '../button/Button'

export default class GlobalStatus extends React.PureComponent {
  static contextType = Context

  static propTypes = {
    id: PropTypes.string,
    status_id: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
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
    state: PropTypes.oneOf(['error', 'info', 'warning', 'success']),
    show: PropTypes.oneOf(['auto', true, false, 'true', 'false']),
    autoscroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    autoclose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    no_animation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    close_text: PropTypes.node,
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
    status_anchor_text: PropTypes.node,
    skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

    ...spacingPropTypes,

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
    icon_size: 'medium',
    state: 'error',
    show: 'auto',
    autoscroll: true,
    autoclose: true,
    no_animation: false,
    close_text: 'Lukk',
    hide_close_button: false,
    omit_set_focus: false,
    omit_set_focus_on_update: true,
    delay: null,
    status_anchor_text: null,
    skeleton: null,

    className: null,
    children: null,

    on_adjust: null,
    on_open: null,
    on_show: null,
    on_close: null,
    on_hide: null,
  }

  static getIcon({ state, icon, icon_size }) {
    if (typeof icon === 'string') {
      let IconToLoad = icon

      switch (state) {
        case 'info':
        case 'information':
        case 'success':
          IconToLoad = InfoIcon
          break
        case 'warning':
        case 'warn':
          IconToLoad = WarnIcon
          break
        case 'error':
        default:
          IconToLoad = ErrorIcon
      }

      icon = (
        <Icon
          icon={<IconToLoad state={state} />}
          size={icon_size}
          inherit_color={false}
        />
      )
    }

    return icon
  }

  static getDerivedStateFromProps(props, state) {
    if (state._items !== props.items) {
      state.globalStatus = GlobalStatusProvider.combineMessages([
        state.globalStatus,
        props,
      ])
    }

    state._items = props.items

    return state
  }

  state = {
    globalStatus: null,
    isActive: false,
  }

  constructor(props) {
    super(props)

    this._wrapperRef = React.createRef()

    this.provider = GlobalStatusProvider.create(props.id)

    // add the props as the first stack
    this.state.globalStatus = this._globalStatus =
      this.provider.init(props)

    // and make it visible from start, if needed
    if (isTrue(props.show)) {
      this.state.isActive = true
    }

    this.provider.onUpdate((globalStatus) => {
      // we need the on_close later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.on_close) {
        this._globalStatus = globalStatus
      }

      // force re-render
      this.setState({
        globalStatus,
      })

      // make sure to show the new status, inc. scroll
      if (
        (isTrue(this.props.autoclose) &&
          this._hadContent &&
          !this.hasContent(globalStatus) &&
          !isTrue(this.props.show)) ||
        (typeof globalStatus.show !== 'undefined' &&
          !isTrue(globalStatus.show))
      ) {
        this.setHidden()
      } else if (
        isTrue(this.props.show) ||
        (typeof globalStatus.show !== 'undefined' &&
          isTrue(globalStatus.show))
      ) {
        this._hadContent = this.hasContent(globalStatus)

        this.setVisible()
      }
    })

    this.initialActiveElement = null
  }

  componentWillUnmount() {
    clearTimeout(this._scrollToStatusTimeout)

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
      const globalStatus = extendPropsWithContextInClassComponent(
        this.props,
        GlobalStatus.defaultProps,
        this.context.globalStatus
      )
      this.setState({
        globalStatus,
      })
    }

    if (prevProps.show !== this.props.show) {
      if (isTrue(this.props.show)) {
        this.setVisible()
      } else {
        this.setHidden()
      }
    }
  }

  hasContent(globalStatus) {
    return Boolean(globalStatus.items?.length > 0 || globalStatus.text)
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

  setVisible = () => {
    if (this.isPassive()) {
      return // stop here
    }

    this.setState({
      isActive: true,
    })
  }

  setHidden = () => {
    this.setState({
      isActive: false,
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
      if (element && typeof element.scrollIntoView === 'function') {
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
      (item.item_id &&
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        keyCode === 'space') ||
      keyCode === 'enter' ||
      typeof keyCode === 'undefined'
    ) {
      event.preventDefault()
      try {
        // find the element
        const element = document.getElementById(item.item_id)

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

        if (typeof element.scrollIntoView === 'function') {
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

  itemsRenderHandler =
    ({ status_anchor_text, lang }) =>
    (item, i) => {
      const text = item?.text
        ? item.text
        : typeof item === 'string'
        ? item
        : null

      if (!text) {
        return null // skip this item if no content is given
      }

      const id =
        item.id || item.item_id ? `${item.item_id}-${i}` : makeUniqueId()

      let anchorText = status_anchor_text

      if (React.isValidElement(item.status_anchor_label)) {
        anchorText = (
          <>
            {typeof status_anchor_text === 'string'
              ? status_anchor_text.replace('%s', '').trim()
              : status_anchor_text}{' '}
            {item.status_anchor_label}
          </>
        )
      } else {
        anchorText = String(item.status_anchor_text || status_anchor_text)
          .replace('%s', item.status_anchor_label || '')
          .replace(/[: ]$/g, '')
      }

      const useAutolink = item.item_id && isTrue(item.status_anchor_url)

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
                useAutolink ? `#${item.item_id}` : item.status_anchor_url
              }
              onClick={(e) => this.gotoItem(e, item)}
              onKeyDown={(e) => this.gotoItem(e, item)}
            >
              {anchorText}
            </a>
          )}
        </li>
      )
    }

  onAnimationStart = (state) => {
    this.setState({
      isAnimating: true,
    })

    switch (state) {
      case 'opening':
        this.scrollToStatus()
    }
  }

  onAnimationEnd = (state) => {
    switch (state) {
      case 'opened':
        this.setFocus()

        dispatchCustomElementEvent(
          this._globalStatus,
          'on_open',
          this._globalStatus
        )
        break

      case 'adjusted':
        if (!isTrue(this.props.omit_set_focus_on_update)) {
          this.setFocus()
        }

        dispatchCustomElementEvent(
          this._globalStatus,
          'on_adjust',
          this._globalStatus
        )
        break

      case 'closed':
        dispatchCustomElementEvent(
          this._globalStatus,
          'on_close',
          this._globalStatus
        )

        break
    }
  }

  onOpen = (isOpened) => {
    if (isOpened) {
      dispatchCustomElementEvent(
        this._globalStatus,
        'on_show',
        this._globalStatus
      )
    }
  }

  render() {
    const { isActive } = this.state

    const fallbackProps = extendPropsWithContextInClassComponent(
      this.props,
      GlobalStatus.defaultProps,
      this.context.getTranslation(this.props).GlobalStatus
    )

    const props = extendPropsWithContextInClassComponent(
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
      status_anchor_text,
      skeleton,

      id,
      item, // eslint-disable-line
      items, // eslint-disable-line
      autoclose, // eslint-disable-line
      show, // eslint-disable-line
      delay,
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
        className
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
      theme: this.context?.theme?.name || 'ui',
    })
    const titleToRender =
      title || fallbackProps.title || fallbackProps.default_title
    const noAnimation = isTrue(no_animation)
    const itemsToRender = props.items || []
    const contentToRender = props.text || props.children

    const params = {
      className: classnames(
        'dnb-global-status',
        `dnb-global-status--${state}`
      ),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map(
          this.itemsRenderHandler({ status_anchor_text, lang })
        )}
      </ul>
    )

    const hasContent = renderedItems || contentToRender

    const renderedContent = (
      <>
        {title !== false && (
          <>
            <div
              className="dnb-global-status__title"
              role={titleToRender?.type ? undefined : 'paragraph'}
              lang={lang}
            >
              <span className="dnb-global-status__icon">
                {iconToRender}
              </span>
              {titleToRender}
              {!isTrue(hide_close_button) && (
                <Button
                  text={close_text}
                  title={close_text}
                  variant="tertiary"
                  className="dnb-global-status__close-button"
                  icon="close"
                  on_click={this.closeHandler}
                  size="medium"
                  icon_position="left"
                />
              )}
            </div>
            {hasContent && (
              <div className="dnb-global-status__message">
                <div className="dnb-global-status__message__content">
                  {typeof contentToRender === 'string' ? (
                    <p className="dnb-p">{contentToRender}</p>
                  ) : (
                    contentToRender
                  )}
                  {renderedItems}
                </div>
              </div>
            )}
            <Hr breakout />
          </>
        )}
      </>
    )

    return (
      <div {...wrapperParams} ref={this._wrapperRef}>
        <section {...params}>
          <HeightAnimation
            className="dnb-global-status__shell"
            duration={800}
            delay={delay}
            open={isActive}
            animate={!noAnimation}
            onAnimationEnd={this.onAnimationEnd}
            onAnimationStart={this.onAnimationStart}
            onOpen={this.onOpen}
          >
            <Section
              element="div"
              variant={state}
              className="dnb-global-status__content"
            >
              {renderedContent}
            </Section>
          </HeightAnimation>
        </section>
      </div>
    )
  }
}

// Extend our component with controllers
GlobalStatus.create = (...args) => new GlobalStatusInterceptor(...args)
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

GlobalStatus._supportsSpacingProps = true
