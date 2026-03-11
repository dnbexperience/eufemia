/**
 * Web GlobalStatus Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context from '../../shared/Context'
import {
  warn,
  makeUniqueId,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContextInClassComponent,
} from '../../shared/component-helper'
import HeightAnimation from '../height-animation/HeightAnimation'
import type {
  HeightAnimationOnStartTypes,
  HeightAnimationOnEndTypes,
} from '../height-animation/useHeightAnimation'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { createSpacingClasses } from '../space/SpacingHelper'
import Hr from '../../elements/hr/Hr'
import GlobalStatusController, {
  GlobalStatusInterceptor,
  GlobalStatusRemove,
} from './GlobalStatusController'
import GlobalStatusProvider from './GlobalStatusProvider'
import Icon from '../icon/Icon'
import { InfoIcon, ErrorIcon, WarnIcon } from '../form-status/FormStatus'
import Section from '../section/Section'
import Button from '../button/Button'
import type { FormStatusText } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../space/types'

export type GlobalStatusTitle = React.ReactNode | boolean
export type GlobalStatusText = string | React.ReactNode
export type GlobalStatusItem =
  | string
  | {
      text?: React.ReactNode
      id?: string | number
      itemId?: string
      statusAnchorLabel?: React.ReactNode
      statusAnchorText?: string
      statusAnchorUrl?: string | boolean
      [key: string]: unknown
    }
export type GlobalStatusState = 'error' | 'info' | 'warning' | 'success'
export type GlobalStatusShow = 'auto' | boolean
export type GlobalStatusDelay = string | number
export type GlobalStatusConfigObject = {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string
  message?: FormStatusText
}
export type GlobalStatusChildren = string | React.ReactNode

export interface GlobalStatusProps
  extends Omit<
      React.HTMLProps<HTMLElement>,
      'ref' | 'children' | 'onClose' | 'onAdjust' | 'onShow' | 'title'
    >,
    SpacingProps {
  /**
   * The main ID. Defaults to `main`.
   */
  id?: string
  statusId?: string
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: GlobalStatusTitle
  defaultTitle?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: GlobalStatusText
  /**
   * The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[]
  /**
   * The icon shown before the status title. Defaults to `exclamation`.
   */
  icon?: IconIcon
  /**
   * The icon size of the title icon shows. Defaults to `medium`.
   */
  iconSize?: IconSize
  /**
   * Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `info` and `success`. The default status is `error`.
   */
  state?: GlobalStatusState
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: GlobalStatusShow
  /**
   * Set to `true` to automatically scroll the page to the appeared global status. Defaults to `true`.
   */
  autoScroll?: boolean
  /**
   * Set to `true` to automatically close the global status if there are no more left items in the provider stack. Defaults to `true`.
   */
  autoClose?: boolean
  /**
   * Set to `true` to disable the show/hide/slide/fade/grow/shrink animation. Defaults to `false`.
   */
  noAnimation?: boolean
  /**
   * Defines the delay on how long the automated visibility should wait before it appears to the user. Defaults to `200ms`.
   */
  delay?: GlobalStatusDelay
  /**
   * Text of the close button. Defaults to `Lukk`.
   */
  closeText?: React.ReactNode
  /**
   * Set to `true` if the close button should be hidden for the user. Defaults to `false`.
   */
  hideCloseButton?: boolean
  /**
   * Set to `true` to omit setting the focus during visibility. Defaults to `false`. Additionally, there is `omitSetFocusOnUpdate` which is set to `true` by default.
   */
  omitSetFocus?: boolean
  /**
   * Set to `true` to omit setting the focus during update. Defaults to `true`.
   */
  omitSetFocusOnUpdate?: boolean
  /**
   * Defines the anchor text showing up after every item, in case there is a `statusId` defined. Defaults to `Gå til %s`. The `%s` represents the optional and internal handled label addition.
   */
  statusAnchorText?: React.ReactNode
  /**
   * If set to `true`, an overlaying skeleton with animation will be shown.
   */
  skeleton?: SkeletonShow
  className?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  children?: GlobalStatusChildren
  onAdjust?: (globalStatus: Record<string, unknown>) => void
  onOpen?: (globalStatus: Record<string, unknown>) => void
  onShow?: (globalStatus: Record<string, unknown>) => void
  onClose?: (globalStatus: Record<string, unknown>) => void
  onHide?: (globalStatus: Record<string, unknown>) => void
}

export type GlobalStatusStatusId = string
export type GlobalStatusAddProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  statusId: GlobalStatusStatusId
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string
  item?: GlobalStatusItem
  /**
   * The items (list items) appear as a part of the status content. you can both use an JSON array, or a vanilla array with a string or an object content. See **Item Object** example below.
   */
  items?: GlobalStatusItem[]
  onClose?: ({ statusId }: { statusId: GlobalStatusStatusId }) => void
}
export type GlobalStatusUpdateProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text: string
}
export type GlobalStatusRemoveProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  statusId: GlobalStatusStatusId
  bufferDelay?: number
}
export type GlobalStatusInterceptorProps = {
  /**
   * The main ID. Defaults to `main`.
   */
  id: string
  /**
   * The title appears as a part of the status content. Defaults to `En feil har skjedd`.
   */
  title?: string
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string
  statusId?: GlobalStatusStatusId
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean
  item?: GlobalStatusItem
}
export type GlobalStatusInterceptorUpdateEvents = {
  onShow?: (globalStatus: Record<string, unknown>) => void
  onHide?: (globalStatus: Record<string, unknown>) => void
  onClose?: (globalStatus: Record<string, unknown>) => void
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string
}

interface GlobalStatusComponentState {
  globalStatus: any
  isActive: boolean
  isAnimating?: boolean
}

export default class GlobalStatus extends React.PureComponent<
  GlobalStatusProps,
  GlobalStatusComponentState
> {
  static contextType = Context
  context!: React.ContextType<typeof Context>

  static create: (props: GlobalStatusInterceptorProps) => any
  static Update: (props: GlobalStatusInterceptorProps) => any
  static Add: typeof GlobalStatusController
  static Remove: typeof GlobalStatusRemove

  _wrapperRef: React.RefObject<HTMLDivElement | null>
  provider: ReturnType<typeof GlobalStatusProvider.create>
  _globalStatus: any
  _hadContent: boolean
  initialActiveElement: Element | null
  _scrollToStatusTimeout: ReturnType<typeof setTimeout> | null

  static defaultProps = {
    id: 'main',
    statusId: 'status-main',
    title: null,
    defaultTitle: null,
    text: null,
    items: [],
    icon: 'error',
    iconSize: 'medium',
    state: 'error',
    show: 'auto',
    autoScroll: true,
    autoClose: true,
    noAnimation: false,
    closeText: 'Lukk',
    hideCloseButton: false,
    omitSetFocus: false,
    omitSetFocusOnUpdate: true,
    delay: null,
    statusAnchorText: null,
    skeleton: null,

    className: null,
    children: null,

    onAdjust: null,
    onOpen: null,
    onShow: null,
    onClose: null,
    onHide: null,
  }

  static getIcon({
    state,
    icon,
    iconSize,
  }: {
    state?: string
    icon?: any
    iconSize?: IconSize
    theme?: string
  }) {
    if (typeof icon === 'string') {
      let IconToLoad: React.ComponentType<any> = ErrorIcon

      switch (state) {
        case 'info':
        case 'information':
        case 'success':
          IconToLoad = InfoIcon
          break
        case 'warning':
          IconToLoad = WarnIcon
          break
        case 'error':
        default:
          IconToLoad = ErrorIcon
      }

      icon = (
        <Icon
          icon={<IconToLoad state={state} />}
          size={iconSize}
          inheritColor={false}
        />
      )
    }

    return icon
  }

  static getDerivedStateFromProps(
    props: GlobalStatusProps,
    state: GlobalStatusComponentState & { _items?: GlobalStatusItem[] }
  ) {
    let globalStatus = state.globalStatus

    if (state._items !== props.items) {
      globalStatus = GlobalStatusProvider.combineMessages([
        state.globalStatus,
        props,
      ])
    }

    if (props.state !== globalStatus?.state) {
      globalStatus = { ...globalStatus, state: props.state }
    }

    return {
      globalStatus,
      _items: props.items,
    }
  }

  state = {
    globalStatus: null,
    isActive: false,
  }

  constructor(props: GlobalStatusProps) {
    super(props)

    this._wrapperRef = React.createRef()

    this.provider = GlobalStatusProvider.create(props.id)

    // add the props as the first stack
    this.state.globalStatus = this._globalStatus =
      this.provider.init(props)

    // and make it visible from start, if needed
    if (props.show === true) {
      this.state.isActive = true
    }

    this.provider.onUpdate((globalStatus) => {
      // we need the onClose later during the close process
      // so we set this here, because it gets removed from the stack
      if (globalStatus.onClose) {
        this._globalStatus = globalStatus
      }

      // force re-render
      this.setState({
        globalStatus,
      })

      // make sure to show the new status, inc. scroll
      if (
        (this.props.autoClose &&
          this._hadContent &&
          !this.hasContent(globalStatus) &&
          this.props.show !== true) ||
        (typeof globalStatus.show !== 'undefined' && !globalStatus.show)
      ) {
        this.setHidden()
      } else if (
        this.props.show === true ||
        (typeof globalStatus.show !== 'undefined' && globalStatus.show)
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

  componentDidUpdate(prevProps: GlobalStatusProps) {
    if (prevProps.show !== this.props.show) {
      if (this.props.show === true) {
        this.setVisible()
      } else {
        this.setHidden()
      }
    }
  }

  hasContent(globalStatus: Record<string, any>) {
    return Boolean(globalStatus.items?.length > 0 || globalStatus.text)
  }

  correctStatus(state: string | undefined) {
    switch (state) {
      case 'information':
        state = 'info'
        break
    }
    return state
  }

  isPassive = () => {
    return this.props.show !== 'auto' && this.props.show !== true
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

  onKeyDownHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault()
      this.closeHandler()
    }
  }

  setFocus() {
    if (
      typeof document !== 'undefined' &&
      document.activeElement !== this._wrapperRef.current
    ) {
      this.initialActiveElement = document.activeElement
    }
    if (this._wrapperRef.current && !this.props.omitSetFocus) {
      this._wrapperRef.current.focus({ preventScroll: true })
    }
  }

  closeHandler = () => {
    this.provider.add({
      statusId: 'internal-close',
      show: false,
    })

    if (this.initialActiveElement) {
      try {
        ;(this.initialActiveElement as HTMLElement).focus()
        this.initialActiveElement = null
      } catch (e) {
        warn(e)
      }
    }

    dispatchCustomElementEvent(
      this._globalStatus,
      'onHide',
      this._globalStatus
    )
  }

  async scrollToStatus(
    isDone: ((elem: HTMLElement) => void) | null = null
  ) {
    if (
      typeof window === 'undefined' ||
      this.state.globalStatus.autoScroll === false
    ) {
      return // stop here
    }
    try {
      const element = this._wrapperRef.current
      this._scrollToStatusTimeout = isElementVisible(element, isDone)
      if (element && typeof element.scrollIntoView === 'function') {
        // wait a tick, to make sure that the element is visible, as firefox needs that
        // or else it reports:
        // scroll anchoring was disabled in a scroll container because of too many consecutive adjustments
        await wait(1)
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
          window.scrollTo({ top })
        }
      }
    } catch (e) {
      warn('GlobalStatus: Could not scroll into view!', e)
    }
  }

  gotoItem = (
    event: React.MouseEvent | React.KeyboardEvent,
    item: Record<string, any>
  ) => {
    event.persist()
    const key = (event as React.KeyboardEvent).key
    if (
      (item.itemId &&
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        key === ' ') ||
      key === 'Enter' ||
      key === undefined
    ) {
      event.preventDefault()
      try {
        // find the element
        const element = document.getElementById(item.itemId)

        if (!element) {
          return
        }

        isElementVisible(element, (elem) => {
          try {
            // remove the blink animation again
            elem.addEventListener('blur', (e) => {
              if ((e.target as HTMLElement).classList) {
                ;(e.target as HTMLElement).removeAttribute('tabindex')
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
    ({ statusAnchorText, lang }) =>
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
        item.id || item.itemId ? `${item.itemId}-${i}` : makeUniqueId()

      let anchorText = statusAnchorText

      if (React.isValidElement(item.statusAnchorLabel)) {
        anchorText = (
          <>
            {typeof statusAnchorText === 'string'
              ? statusAnchorText.replace('%s', '').trim()
              : statusAnchorText}{' '}
            {item.statusAnchorLabel}
          </>
        )
      } else {
        anchorText = String(item.statusAnchorText || statusAnchorText)
          .replace('%s', item.statusAnchorLabel || '')
          .replace(/[: ]$/g, '')
      }

      const useAutolink = item.itemId && item.statusAnchorUrl === true

      return (
        <li key={i}>
          <p id={id} className="dnb-p">
            {text}
          </p>

          {item && (useAutolink || item.statusAnchorUrl) && (
            <a
              className="dnb-anchor"
              aria-describedby={id}
              lang={lang}
              href={useAutolink ? `#${item.itemId}` : item.statusAnchorUrl}
              onClick={(e) => this.gotoItem(e, item)}
              onKeyDown={(e) => this.gotoItem(e, item)}
            >
              {anchorText}
            </a>
          )}
        </li>
      )
    }

  onAnimationStart = (state: HeightAnimationOnStartTypes) => {
    this.setState({
      isAnimating: true,
    })

    switch (state) {
      case 'opening':
        this.scrollToStatus()
    }
  }

  onAnimationEnd = (state: HeightAnimationOnEndTypes) => {
    switch (state) {
      case 'opened':
        this.setFocus()

        dispatchCustomElementEvent(
          this._globalStatus,
          'onOpen',
          this._globalStatus
        )
        break

      case 'adjusted':
        if (!this.props.omitSetFocusOnUpdate) {
          this.setFocus()
        }

        dispatchCustomElementEvent(
          this._globalStatus,
          'onAdjust',
          this._globalStatus
        )
        break

      case 'closed':
        dispatchCustomElementEvent(
          this._globalStatus,
          'onClose',
          this._globalStatus
        )

        break
    }
  }

  onOpen = (isOpened: boolean) => {
    if (isOpened) {
      dispatchCustomElementEvent(
        this._globalStatus,
        'onShow',
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
        (this.context as Record<string, unknown>)?.globalStatus as
          | Record<string, unknown>
          | undefined,
        this.state.globalStatus,
      ]),
      GlobalStatus.defaultProps,
      fallbackProps
    )

    const lang = this.context.locale

    const {
      title,
      defaultTitle,
      state: rawState,
      className,
      noAnimation,
      hideCloseButton,
      closeText,
      statusAnchorText,
      skeleton,

      id,
      item,
      items,
      autoClose,
      show,
      delay,
      autoScroll,
      text,
      omitSetFocus,
      omitSetFocusOnUpdate,
      statusId,
      icon,
      iconSize,
      children,
      removeOnUnmount,

      onAdjust,
      onOpen,
      onShow,
      onClose,
      onHide,

      ...attributes
    } = props as Record<string, any>

    const wrapperParams = {
      id,
      className: clsx(
        'dnb-global-status__wrapper',
        'dnb-no-focus',
        createSkeletonClass('font', skeleton, this.context),
        createSpacingClasses(props),
        className
      ),
      'aria-live': (isActive ? 'assertive' : 'off') as 'assertive' | 'off',
      onKeyDown: this.onKeyDownHandler,
      tabIndex: -1,
    }

    const state = this.correctStatus(rawState)
    const iconToRender = GlobalStatus.getIcon({
      state,
      icon: icon || fallbackProps.icon,
      iconSize: iconSize || fallbackProps.iconSize,
      theme: this.context?.theme?.name || 'ui',
    })
    const titleToRender =
      title || fallbackProps.title || fallbackProps.defaultTitle
    const noAnimationUsed = noAnimation
    const itemsToRender = props.items || []
    const contentToRender = props.text || props.children

    const params = {
      className: clsx('dnb-global-status', `dnb-global-status--${state}`),
      ...attributes,
    }

    skeletonDOMAttributes(params, skeleton, this.context)

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    const renderedItems = itemsToRender.length > 0 && (
      <ul className="dnb-ul">
        {itemsToRender.map(
          this.itemsRenderHandler({ statusAnchorText, lang })
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
              {!hideCloseButton && (
                <Button
                  text={closeText}
                  title={closeText}
                  variant={state === 'success' ? 'secondary' : 'tertiary'}
                  className="dnb-global-status__close-button"
                  icon="close"
                  onClick={this.closeHandler}
                  size="medium"
                  iconPosition="left"
                />
              )}
            </div>
            {hasContent && (
              <div className="dnb-global-status__message">
                <div
                  className={clsx(
                    'dnb-global-status__message__content',
                    !renderedItems && 'dnb-space__bottom--small'
                  )}
                >
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
      <div {...wrapperParams} ref={this._wrapperRef} key="global-status">
        <section {...params}>
          <HeightAnimation
            className="dnb-global-status__shell"
            duration={800}
            delay={delay}
            open={isActive}
            animate={!noAnimationUsed}
            onAnimationEnd={this.onAnimationEnd}
            onAnimationStart={this.onAnimationStart as any}
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
GlobalStatus.create = (
  props: GlobalStatusInterceptorProps
): GlobalStatusInterceptor => new GlobalStatusInterceptor(props)
GlobalStatus.Update = GlobalStatus.create
GlobalStatus.Add = GlobalStatusController
GlobalStatus.Remove = GlobalStatusRemove

withComponentMarkers(GlobalStatus, { _supportsSpacingProps: true })

const isElementVisible = (
  elem: HTMLElement,
  callback?: ((elem: HTMLElement) => void) | null,
  delayFallback = 1e3
) => {
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

const wait = (duration: number) =>
  new Promise((r) => setTimeout(r, duration))
