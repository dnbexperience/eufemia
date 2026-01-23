/**
 * Web GlobalStatus Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Context from '../../shared/Context'
import {
  warn,
  isTrue,
  makeUniqueId,
  validateDOMAttributes,
  dispatchCustomElementEvent,
  extendPropsWithContext,
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

const propTypes = {
  id: PropTypes.string,
  statusId: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.bool]),
  defaultTitle: PropTypes.string,
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
  iconSize: PropTypes.string,
  state: PropTypes.oneOf(['error', 'info', 'warning', 'success']),
  show: PropTypes.oneOf(['auto', true, false, 'true', 'false']),
  autoscroll: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  autoclose: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  noAnimation: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  delay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  closeText: PropTypes.node,
  hideCloseButton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  omitSetFocus: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  omitSetFocusOnUpdate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]),
  statusAnchorText: PropTypes.node,
  skeleton: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  ...spacingPropTypes,

  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node,
  ]),

  onAdjust: PropTypes.func,
  onOpen: PropTypes.func,
  onShow: PropTypes.func,
  onClose: PropTypes.func,
  onHide: PropTypes.func,
}

const defaultProps = {
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
  autoscroll: true,
  autoclose: true,
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

const getIcon = ({ state, icon, iconSize }) => {
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
        size={iconSize}
        inheritColor={false}
      />
    )
  }

  return icon
}

function GlobalStatus(localProps) {
  const sharedContext = React.useContext(Context)

  // Merge props early
  const fallbackProps = extendPropsWithContext(
    localProps,
    defaultProps,
    sharedContext.getTranslation(localProps).GlobalStatus
  )

  const providerRef = React.useRef(null)
  const _wrapperRef = React.useRef(null)
  const _globalStatusRef = React.useRef(null)
  const _scrollToStatusTimeoutRef = React.useRef(null)
  const _hadContentRef = React.useRef(false)
  const initialActiveElementRef = React.useRef(null)
  const propsRef = React.useRef(fallbackProps)
  const isInitializedRef = React.useRef(false)

  // Keep propsRef updated during render (not in effect) so callbacks see current props
  propsRef.current = fallbackProps

  // Initialize provider synchronously during first render (like constructor did)
  if (!isInitializedRef.current) {
    isInitializedRef.current = true
    providerRef.current = GlobalStatusProvider.create(localProps.id)
  }

  const [globalStatus, setGlobalStatus] = React.useState(() => {
    // Initialize global status during first render
    const provider = providerRef.current
    const initialStatus = provider.init(localProps)
    _globalStatusRef.current = initialStatus
    return initialStatus
  })
  const [isActive, setIsActive] = React.useState(() =>
    isTrue(localProps.show)
  )
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_isAnimating, setIsAnimating] = React.useState(false)

  const prevItemsRef = React.useRef(localProps.items)

  // Setup provider update handler and cleanup
  React.useEffect(() => {
    const provider = providerRef.current

    // Setup provider update handler
    provider.onUpdate((updatedGlobalStatus) => {
      // we need the onClose later during the close process
      // so we set this here, because it gets removed from the stack
      if (updatedGlobalStatus.onClose) {
        _globalStatusRef.current = updatedGlobalStatus
      }

      // force re-render
      setGlobalStatus(updatedGlobalStatus)

      // make sure to show the new status, inc. scroll
      if (
        (isTrue(propsRef.current.autoclose) &&
          _hadContentRef.current &&
          !hasContent(updatedGlobalStatus) &&
          !isTrue(propsRef.current.show)) ||
        (typeof updatedGlobalStatus.show !== 'undefined' &&
          !isTrue(updatedGlobalStatus.show))
      ) {
        setIsActive(false)
      } else if (
        isTrue(propsRef.current.show) ||
        (typeof updatedGlobalStatus.show !== 'undefined' &&
          isTrue(updatedGlobalStatus.show))
      ) {
        _hadContentRef.current = hasContent(updatedGlobalStatus)
        setIsActive(true)
      } else if (
        propsRef.current.show === 'auto' &&
        hasContent(updatedGlobalStatus)
      ) {
        // When show="auto", show if there's content
        _hadContentRef.current = true
        setIsActive(true)
      } else if (
        propsRef.current.show === 'auto' &&
        !hasContent(updatedGlobalStatus)
      ) {
        // When show="auto", hide if there's no content
        setIsActive(false)
      }
    })

    return () => {
      clearTimeout(_scrollToStatusTimeoutRef.current)
      provider.empty()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // getDerivedStateFromProps equivalent - handle items changes
  React.useEffect(() => {
    if (prevItemsRef.current !== localProps.items) {
      const combinedStatus = GlobalStatusProvider.combineMessages([
        globalStatus,
        localProps,
      ])
      setGlobalStatus(combinedStatus)
    }
    prevItemsRef.current = localProps.items
  }, [localProps.items, localProps, globalStatus])

  // componentDidUpdate equivalent - handle props changes
  const prevPropsRef = React.useRef(localProps)
  React.useEffect(() => {
    if (prevPropsRef.current !== localProps) {
      const updatedStatus = extendPropsWithContext(
        localProps,
        defaultProps,
        sharedContext.getTranslation(localProps).GlobalStatus
      )
      setGlobalStatus(updatedStatus)
      prevPropsRef.current = localProps
    }
  }, [localProps, sharedContext])

  // componentDidUpdate equivalent - handle show prop changes
  React.useEffect(() => {
    if (isTrue(localProps.show)) {
      setIsActive(true)
    } else if (localProps.show === false || localProps.show === 'false') {
      setIsActive(false)
    }
  }, [localProps.show])

  const hasContent = (status) => {
    return Boolean(status?.items?.length > 0 || status?.text)
  }

  const correctStatus = (state) => {
    switch (state) {
      case 'information':
        return 'info'
      default:
        return state
    }
  }

  const onKeyDownHandler = (e) => {
    switch (keycode(e)) {
      case 'escape':
      case 'esc':
        e.preventDefault()
        closeHandler()
        break
    }
  }

  const setFocus = () => {
    if (
      typeof document !== 'undefined' &&
      document.activeElement !== _wrapperRef.current
    ) {
      initialActiveElementRef.current = document.activeElement
    }
    if (_wrapperRef.current && !isTrue(localProps.omitSetFocus)) {
      _wrapperRef.current.focus({ preventScroll: true })
    }
  }

  const closeHandler = () => {
    if (providerRef.current) {
      providerRef.current.add({
        statusId: 'internal-close',
        show: false,
      })
    }

    if (initialActiveElementRef.current) {
      try {
        initialActiveElementRef.current.focus()
        initialActiveElementRef.current = null
      } catch (e) {
        warn(e)
      }
    }

    if (_globalStatusRef.current) {
      dispatchCustomElementEvent(
        _globalStatusRef.current,
        'onHide',
        _globalStatusRef.current
      )
    }
  }

  const scrollToStatus = async (isDone = null) => {
    // Get the current combined props
    const currentProps = extendPropsWithContext(
      GlobalStatusProvider.combineMessages([
        sharedContext.globalStatus,
        globalStatus,
      ]),
      defaultProps,
      fallbackProps
    )

    if (
      typeof window === 'undefined' ||
      isTrue(currentProps.autoscroll) === false
    ) {
      return // stop here
    }
    try {
      const element = _wrapperRef.current
      _scrollToStatusTimeoutRef.current = isElementVisible(element, isDone)
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
          window.scrollTop = top
        }
      }
    } catch (e) {
      warn('GlobalStatus: Could not scroll into view!', e)
    }
  }

  const gotoItem = (event, item) => {
    event.persist()
    const keyCode = keycode(event)
    if (
      (item.itemId &&
        typeof document !== 'undefined' &&
        typeof window !== 'undefined' &&
        keyCode === 'space') ||
      keyCode === 'enter' ||
      typeof keyCode === 'undefined'
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

  const itemsRenderHandler =
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

      const useAutolink = item.itemId && isTrue(item.statusAnchorUrl)

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
              onClick={(e) => gotoItem(e, item)}
              onKeyDown={(e) => gotoItem(e, item)}
            >
              {anchorText}
            </a>
          )}
        </li>
      )
    }

  const onAnimationStart = (state) => {
    setIsAnimating(true)

    switch (state) {
      case 'opening':
        scrollToStatus()
    }
  }

  const onAnimationEnd = (state) => {
    switch (state) {
      case 'opened':
        setFocus()

        if (_globalStatusRef.current) {
          dispatchCustomElementEvent(
            _globalStatusRef.current,
            'onOpen',
            _globalStatusRef.current
          )
        }
        break

      case 'adjusted':
        if (!isTrue(localProps.omitSetFocusOnUpdate)) {
          setFocus()
        }

        if (_globalStatusRef.current) {
          dispatchCustomElementEvent(
            _globalStatusRef.current,
            'onAdjust',
            _globalStatusRef.current
          )
        }
        break

      case 'closed':
        if (_globalStatusRef.current) {
          dispatchCustomElementEvent(
            _globalStatusRef.current,
            'onClose',
            _globalStatusRef.current
          )
        }

        break
    }
  }

  const onOpen = (isOpened) => {
    if (isOpened && _globalStatusRef.current) {
      dispatchCustomElementEvent(
        _globalStatusRef.current,
        'onShow',
        _globalStatusRef.current
      )
    }
  }

  // Merge props for rendering
  const props = extendPropsWithContext(
    GlobalStatusProvider.combineMessages([
      sharedContext.globalStatus,
      globalStatus,
    ]),
    defaultProps,
    fallbackProps
  )

  const lang = sharedContext.locale

  const {
    title,
    defaultTitle, // eslint-disable-line
    state: rawState,
    className,
    noAnimation,
    hideCloseButton,
    closeText,
    statusAnchorText,
    skeleton,

    id,
    item, // eslint-disable-line
    items, // eslint-disable-line
    autoclose, // eslint-disable-line
    show, // eslint-disable-line
    delay,
    autoscroll, // eslint-disable-line
    text, // eslint-disable-line
    omitSetFocus, // eslint-disable-line
    omitSetFocusOnUpdate, // eslint-disable-line
    statusId, // eslint-disable-line
    icon,
    iconSize,
    children, // eslint-disable-line
    removeOnUnmount, //eslint-disable-line

    onAdjust, // eslint-disable-line
    onOpen: _onOpen, // eslint-disable-line
    onShow, // eslint-disable-line
    onClose, // eslint-disable-line
    onHide, // eslint-disable-line

    ...attributes
  } = props

  const wrapperParams = {
    id,
    key: 'global-status',
    className: clsx(
      'dnb-global-status__wrapper',
      'dnb-no-focus',
      createSkeletonClass('font', skeleton, sharedContext),
      createSpacingClasses(props),
      className
    ),
    'aria-live': isActive ? 'assertive' : 'off',
    onKeyDown: onKeyDownHandler,
    tabIndex: '-1',
  }

  const state = correctStatus(rawState)
  const iconToRender = getIcon({
    state,
    icon: icon || fallbackProps.icon,
    iconSize: iconSize || fallbackProps.iconSize,
    theme: sharedContext?.theme?.name || 'ui',
  })
  const titleToRender =
    title || fallbackProps.title || fallbackProps.defaultTitle
  const noAnimationUsed = isTrue(noAnimation)
  const itemsToRender = props.items || []
  const contentToRender = props.text || props.children

  const params = {
    className: clsx('dnb-global-status', `dnb-global-status--${state}`),
    ...attributes,
  }

  skeletonDOMAttributes(params, skeleton, sharedContext)

  // also used for code markup simulation
  validateDOMAttributes(localProps, params)

  const renderedItems = itemsToRender.length > 0 && (
    <ul className="dnb-ul">
      {itemsToRender.map(itemsRenderHandler({ statusAnchorText, lang }))}
    </ul>
  )

  const hasContentToRender = renderedItems || contentToRender

  const renderedContent = (
    <>
      {title !== false && (
        <>
          <div
            className="dnb-global-status__title"
            role={titleToRender?.type ? undefined : 'paragraph'}
            lang={lang}
          >
            <span className="dnb-global-status__icon">{iconToRender}</span>
            {titleToRender}
            {!isTrue(hideCloseButton) && (
              <Button
                text={closeText}
                title={closeText}
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
    <div {...wrapperParams} ref={_wrapperRef}>
      <section {...params}>
        <HeightAnimation
          className="dnb-global-status__shell"
          duration={800}
          delay={delay}
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

GlobalStatus.propTypes = propTypes
GlobalStatus.defaultProps = defaultProps
GlobalStatus.getIcon = getIcon

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

const wait = (duration) => new Promise((r) => setTimeout(r, duration))

GlobalStatus._supportsSpacingProps = true

export default GlobalStatus
