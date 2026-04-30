/**
 * Web GlobalStatus Component
 */

import React, { useCallback, useContext, useRef, useState } from 'react'
import clsx from 'clsx'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useMountEffect from '../../shared/helpers/useMountEffect'
import useUpdateEffect from '../../shared/helpers/useUpdateEffect'
import Context from '../../shared/Context'
import {
  warn,
  makeUniqueId,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { extendPropsWithContext } from '../../shared/helpers/extendPropsWithContext'
import HeightAnimation from '../height-animation/HeightAnimation'
import type {
  HeightAnimationOnStart,
  HeightAnimationOnEnd,
} from '../height-animation/useHeightAnimation'
import {
  skeletonDOMAttributes,
  createSkeletonClass,
} from '../skeleton/SkeletonHelper'
import { applySpacing } from '../space/SpacingUtils'
import Hr from '../../elements/hr/Hr'
import GlobalStatusController, {
  GlobalStatusInterceptor,
  GlobalStatusRemove,
} from './GlobalStatusController'
import GlobalStatusProvider, {
  type GlobalStatusResult,
} from './GlobalStatusProvider'
import Icon from '../icon/Icon'
import { InfoIcon, ErrorIcon, WarnIcon } from '../form-status/FormStatus'
import Section from '../section/Section'
import Button from '../button/Button'
import Space from '../space/Space'
import type { FormStatusText, FormStatusState } from '../FormStatus'
import type { IconIcon, IconSize } from '../Icon'
import type { SkeletonShow } from '../Skeleton'
import type { SpacingProps } from '../../shared/types'

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
export type GlobalStatusState =
  | 'error'
  | 'information'
  | 'warning'
  | 'success'
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

export type GlobalStatusProps = {
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
   * Defines the visual appearance of the status. There are four main statuses `error`, `warning`, `information` and `success`. The default status is `error`.
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
  onAdjust?: (globalStatus: GlobalStatusResult) => void
  onOpen?: (globalStatus: GlobalStatusResult) => void
  onShow?: (globalStatus: GlobalStatusResult) => void
  onClose?: (globalStatus: GlobalStatusResult) => void
  onHide?: (globalStatus: GlobalStatusResult) => void
} & Omit<
  React.HTMLProps<HTMLElement>,
  'ref' | 'children' | 'onClose' | 'onAdjust' | 'onShow' | 'title'
> &
  SpacingProps

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
  onShow?: (globalStatus: GlobalStatusResult) => void
  onHide?: (globalStatus: GlobalStatusResult) => void
  onClose?: (globalStatus: GlobalStatusResult) => void
  /**
   * Set to `true` or `false` to manually make the global status visible. Defaults to `true`.
   */
  show?: boolean
  /**
   * The text appears as the status content. Besides plain text, you can send in a React component as well. Defaults to `null`.
   */
  text?: string
}

const globalStatusDefaultProps: Record<string, unknown> = {
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

function getIcon({
  state,
  icon,
  iconSize,
}: {
  state?: FormStatusState
  icon?: IconIcon
  iconSize?: IconSize
  theme?: string
}): React.ReactNode {
  if (typeof icon === 'string') {
    let IconToLoad: React.ComponentType<{ state?: FormStatusState }> =
      ErrorIcon

    switch (state) {
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

  return icon as React.ReactNode
}

function hasContent(globalStatus: GlobalStatusResult | null | undefined) {
  return Boolean(globalStatus?.items?.length > 0 || globalStatus?.text)
}

function GlobalStatusComponent(ownProps: GlobalStatusProps) {
  const context = useContext(Context)

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null)
  const globalStatusRef = useRef<GlobalStatusResult | null>(null)
  const hadContentRef = useRef(false)
  const initialActiveElementRef = useRef<Element | null>(null)
  const scrollToStatusTimeoutRef = useRef<ReturnType<
    typeof setTimeout
  > | null>(null)
  const propsWithDefaults = {
    ...globalStatusDefaultProps,
    ...ownProps,
  } as GlobalStatusProps
  const propsRef = useRef(propsWithDefaults)
  propsRef.current = propsWithDefaults

  // Provider - created once
  const providerRef = useRef<ReturnType<
    typeof GlobalStatusProvider.create
  > | null>(null)

  // State
  const [providerGlobalStatus, setProviderGlobalStatus] =
    useState<GlobalStatusResult>(() => {
      const provider = GlobalStatusProvider.create(ownProps.id)
      providerRef.current = provider
      const status = provider.init({
        ...ownProps,
        show: ownProps.show ?? 'auto',
      })
      globalStatusRef.current = status
      return status
    })
  const [isActive, setIsActive] = useState(ownProps.show === true)

  const [prevItems, setPrevItems] = useState(ownProps.items)

  let derivedGlobalStatus = providerGlobalStatus
  if (prevItems !== ownProps.items) {
    setPrevItems(ownProps.items)
    derivedGlobalStatus = GlobalStatusProvider.combineMessages([
      providerGlobalStatus,
      ownProps,
    ])
    setProviderGlobalStatus(derivedGlobalStatus)
  }
  if (
    'state' in ownProps &&
    ownProps.state !== derivedGlobalStatus?.state
  ) {
    derivedGlobalStatus = {
      ...derivedGlobalStatus,
      state: ownProps.state,
    }
  }

  // Subscription to provider updates
  useMountEffect(() => {
    const provider = providerRef.current

    provider.onUpdate((status) => {
      // we need the onClose later during the close process
      // so we set this here, because it gets removed from the stack
      if (status.onClose) {
        globalStatusRef.current = status
      }

      // force re-render
      setProviderGlobalStatus(status)

      const props = propsRef.current

      // make sure to show the new status, inc. scroll
      if (
        (props.autoClose &&
          hadContentRef.current &&
          !hasContent(status) &&
          props.show !== true) ||
        (typeof status.show !== 'undefined' && status.show !== true)
      ) {
        setIsActive(false)
      } else if (
        props.show === true ||
        (typeof status.show !== 'undefined' && status.show === true)
      ) {
        hadContentRef.current = hasContent(status)

        // setVisible with isPassive check
        if (props.show === 'auto' || props.show === true) {
          setIsActive(true)
        }
      }
    })

    return () => {
      clearTimeout(scrollToStatusTimeoutRef.current)

      // NB: Never unbind the provider,
      // as a new provider else will be set BEFORE the unmount is called
      // on the other hand; setting up the provider
      // at the stage of mount is too late
      // so we only empty the events
      provider.empty()
    }
  })

  // Handle show prop changes
  useUpdateEffect(() => {
    if (ownProps.show === true) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }, [ownProps.show])

  const setFocus = useCallback(() => {
    if (
      typeof document !== 'undefined' &&
      document.activeElement !== wrapperRef.current
    ) {
      initialActiveElementRef.current = document.activeElement
    }
    if (wrapperRef.current && !propsRef.current.omitSetFocus) {
      wrapperRef.current.focus({ preventScroll: true })
    }
  }, [])

  const closeHandler = useCallback(() => {
    providerRef.current.add({
      statusId: 'internal-close',
      show: false,
    })

    if (initialActiveElementRef.current) {
      try {
        ;(initialActiveElementRef.current as HTMLElement).focus()
        initialActiveElementRef.current = null
      } catch (e) {
        warn(e)
      }
    }

    dispatchCustomElementEvent(
      globalStatusRef.current,
      'onHide',
      globalStatusRef.current
    )
  }, [])

  const scrollToStatus = useCallback(
    async (isDone: ((elem: HTMLElement) => void) | null = null) => {
      if (
        typeof window === 'undefined' ||
        propsRef.current.autoScroll === false
      ) {
        return // stop here
      }
      try {
        const element = wrapperRef.current
        scrollToStatusTimeoutRef.current = isElementVisible(
          element,
          isDone
        )
        if (element && typeof element.scrollIntoView === 'function') {
          // wait a tick, to make sure that the element is visible, as firefox needs that
          await wait(1)
          element.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
          })
        } else {
          const top = element.offsetTop
          window.scrollTo({
            top,
            behavior: 'smooth',
          })
        }
      } catch (e) {
        warn('GlobalStatus: Could not scroll into view!', e)
      }
    },
    []
  )

  const gotoItem = useCallback(
    (
      event: React.MouseEvent | React.KeyboardEvent,
      item: { itemId?: string; [key: string]: unknown }
    ) => {
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
    },
    []
  )

  const onAnimationStart = useCallback(
    (state: HeightAnimationOnStart) => {
      switch (state) {
        case 'opening':
          scrollToStatus()
      }
    },
    [scrollToStatus]
  )

  const onAnimationEnd = useCallback(
    (state: HeightAnimationOnEnd) => {
      switch (state) {
        case 'opened':
          setFocus()

          dispatchCustomElementEvent(
            globalStatusRef.current,
            'onOpen',
            globalStatusRef.current
          )
          break

        case 'adjusted':
          if (!propsRef.current.omitSetFocusOnUpdate) {
            setFocus()
          }

          dispatchCustomElementEvent(
            globalStatusRef.current,
            'onAdjust',
            globalStatusRef.current
          )
          break

        case 'closed':
          dispatchCustomElementEvent(
            globalStatusRef.current,
            'onClose',
            globalStatusRef.current
          )
          break
      }
    },
    [setFocus]
  )

  const onOpen = useCallback((isOpened: boolean) => {
    if (isOpened) {
      dispatchCustomElementEvent(
        globalStatusRef.current,
        'onShow',
        globalStatusRef.current
      )
    }
  }, [])

  // Render

  const fallbackProps = extendPropsWithContext(
    ownProps,
    globalStatusDefaultProps,
    context.getTranslation(ownProps).GlobalStatus
  )

  const props = extendPropsWithContext(
    GlobalStatusProvider.combineMessages([
      (context as Record<string, unknown>)?.globalStatus as
        | Record<string, unknown>
        | undefined,
      derivedGlobalStatus,
    ]),
    globalStatusDefaultProps,
    fallbackProps
  )

  const lang = context.locale

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

    onAdjust: _onAdjust,
    onOpen: _onOpen,
    onShow: _onShow,
    onClose: _onClose,
    onHide: _onHide,

    ...attributes
  } = props as GlobalStatusProps & Record<string, unknown>

  const wrapperParams = applySpacing(props, {
    id,
    className: clsx(
      'dnb-global-status__wrapper',
      'dnb-no-focus',
      createSkeletonClass('font', skeleton, context),
      className
    ),
    'aria-live': (isActive ? 'assertive' : 'off') as 'assertive' | 'off',
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeHandler()
      }
    },
    tabIndex: -1,
  })

  const state = rawState
  const iconToRender = getIcon({
    state,
    icon: icon || fallbackProps.icon,
    iconSize: iconSize || fallbackProps.iconSize,
    theme: context?.theme?.name || 'ui',
  })
  const titleToRender =
    title || fallbackProps.title || fallbackProps.defaultTitle
  const noAnimationUsed = noAnimation
  const itemsToRender = items || []
  const contentToRender = text || children

  const params = {
    className: clsx('dnb-global-status', `dnb-global-status--${state}`),
    ...attributes,
  }

  skeletonDOMAttributes(params, skeleton, context)

  // also used for code markup simulation
  validateDOMAttributes(ownProps, params)

  const itemsRenderHandler = (rawItem: GlobalStatusItem, i: number) => {
    const item = typeof rawItem === 'string' ? { text: rawItem } : rawItem

    const text = item.text

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
        .replace('%s', String(item.statusAnchorLabel || ''))
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
            href={
              useAutolink
                ? `#${item.itemId}`
                : String(item.statusAnchorUrl)
            }
            onClick={(e) => gotoItem(e, item)}
            onKeyDown={(e) => gotoItem(e, item)}
          >
            {anchorText}
          </a>
        )}
      </li>
    )
  }

  const renderedItems = itemsToRender.length > 0 && (
    <ul className="dnb-ul">{itemsToRender.map(itemsRenderHandler)}</ul>
  )

  const hasContentToRender = renderedItems || contentToRender

  const renderedContent = (
    <>
      {title !== false && (
        <>
          <div
            className="dnb-global-status__title"
            role={
              React.isValidElement(titleToRender) ? undefined : 'paragraph'
            }
            lang={lang}
          >
            <span className="dnb-global-status__icon">{iconToRender}</span>
            {titleToRender}
            {!hideCloseButton && (
              <Button
                text={closeText}
                title={
                  typeof closeText === 'string' ? closeText : undefined
                }
                variant={state === 'success' ? 'secondary' : 'tertiary'}
                className="dnb-global-status__close-button"
                icon="close"
                onClick={closeHandler}
                size="medium"
                iconPosition="left"
              />
            )}
          </div>
          {hasContentToRender && (
            <div className="dnb-global-status__message">
              <Space
                element="div"
                bottom={!renderedItems ? 'small' : undefined}
                className="dnb-global-status__message__content"
              >
                {typeof contentToRender === 'string' ? (
                  <p className="dnb-p">{contentToRender}</p>
                ) : (
                  contentToRender
                )}
                {renderedItems}
              </Space>
            </div>
          )}
          <Hr breakout />
        </>
      )}
    </>
  )

  return (
    <div {...wrapperParams} ref={wrapperRef} key="global-status">
      <section {...params}>
        <HeightAnimation
          className="dnb-global-status__shell"
          duration={800}
          delay={delay as number}
          open={isActive}
          animate={!noAnimationUsed}
          onAnimationEnd={onAnimationEnd}
          onAnimationStart={onAnimationStart}
          onOpen={onOpen}
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

GlobalStatusComponent.displayName = 'GlobalStatus'

type GlobalStatusWithStatics = ((
  props: GlobalStatusProps
) => React.ReactNode) & {
  create: (props: GlobalStatusInterceptorProps) => GlobalStatusInterceptor
  // Typed loosely because Update is used both imperatively and as JSX
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Update: (props: GlobalStatusInterceptorProps) => any
  Add: typeof GlobalStatusController
  Remove: typeof GlobalStatusRemove
}

const GlobalStatus: GlobalStatusWithStatics = Object.assign(
  React.memo(GlobalStatusComponent),
  {
    create: (
      props: GlobalStatusInterceptorProps
    ): GlobalStatusInterceptor => new GlobalStatusInterceptor(props),
    Update: null as unknown as GlobalStatusWithStatics['Update'],
    Add: GlobalStatusController,
    Remove: GlobalStatusRemove,
  }
) as unknown as GlobalStatusWithStatics
GlobalStatus.Update = GlobalStatus.create

withComponentMarkers(GlobalStatus, { _supportsSpacingProps: true })

export default GlobalStatus

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
