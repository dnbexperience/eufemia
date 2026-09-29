import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  KeyboardEvent,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import Anchor from '../../components/Anchor'
import HeightAnimation from '../../components/height-animation/HeightAnimation'
import Icon from '../../components/icon/Icon'
import IconPrimary from '../../components/IconPrimary'
import { chevron_down, chevron_up } from '../../icons'
import {
  SidebarMenuContext,
  useSidebarMenuContext,
} from './SidebarMenuContext'
import { useOptionalSidebarMenuResponsive } from './SidebarMenuResponsiveContext'
import SidebarMenuBadge from './SidebarMenuBadge'
import SidebarMenuItemContent from './SidebarMenuItemContent'
import type { SidebarMenuAccordionProps } from './types'
import useTranslation from '../../shared/useTranslation'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'

const accordionIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})
const linkedAccordionOpenDelay = 250

export default function SidebarMenuAccordion(
  props: SidebarMenuAccordionProps
) {
  const {
    id,
    className,
    children,
    icon,
    badge,
    suffix,
    badgeProps,
    text,
    href,
    to,
    element,
    target,
    rel,
    onClick,
    disabled = false,
    open,
    defaultOpen = false,
    collapsible = true,
    onOpenChange,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    title,
    ...rest
  } = props
  const translation = useTranslation().SidebarMenu
  const context = useSidebarMenuContext()
  const responsive = useOptionalSidebarMenuResponsive()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [delayOpen, setDelayOpen] = useState(false)
  const accordionRef = useRef<HTMLLIElement>(null)
  const scrollAfterOpeningRef = useRef(false)
  const pendingOpenTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const contextControlsOpen = context.openItems.includes(id)
  const isControlled = typeof open === 'boolean'
  const requestedOpen =
    !collapsible ||
    (isControlled
      ? open
      : context.openItemsControlled
        ? contextControlsOpen
        : contextControlsOpen || internalOpen)
  const isOpen = requestedOpen && !delayOpen
  const previousIsOpenRef = useRef(isOpen)
  const startsAnimating = isOpen !== previousIsOpenRef.current
  const [descendantsReady, setDescendantsReady] = useState(isOpen)
  const isSelected = context.selectedItem === id
  const containsSelectedItem = context.selectedItemAncestorIds.includes(id)
  const containsNotification = hasNotificationBadge(children)
  const hasBadge = badge !== undefined && badge !== null
  const hasNotificationBadgeOnAccordion =
    hasBadge &&
    badgeProps?.variant === 'notification' &&
    badgeProps.hideBadge !== true
  const showNotificationIndicator =
    collapsible && containsNotification && !hasNotificationBadgeOnAccordion
  const hasLink = Boolean(href || to)
  const useOpenOnFind = context.openOnFind && collapsible
  const controlsContent = collapsible && (isOpen || useOpenOnFind)
  const clearPendingOpen = useCallback(() => {
    clearTimeout(pendingOpenTimer.current)
    pendingOpenTimer.current = undefined
  }, [])

  const setOpen = useCallback(
    (next: boolean, scrollAfterOpening = false) => {
      clearPendingOpen()
      setDelayOpen(false)
      scrollAfterOpeningRef.current = next && scrollAfterOpening
      if (!isControlled && !context.openItemsControlled) {
        setInternalOpen(next)
      }
      context.toggleItem(id, next)
      onOpenChange?.(next)
    },
    [clearPendingOpen, context, id, isControlled, onOpenChange]
  )
  const scrollOpenedAccordionIntoView = useCallback(() => {
    if (!scrollAfterOpeningRef.current) {
      return
    }

    scrollAfterOpeningRef.current = false
    scrollExpandedContentIntoView(
      accordionRef.current,
      responsive?.isSmallScreen ? responsive.drawerScrollElement : null
    )
  }, [responsive?.drawerScrollElement, responsive?.isSmallScreen])

  useEffect(() => clearPendingOpen, [clearPendingOpen])
  useLayoutEffect(() => {
    if (!isOpen) {
      scrollAfterOpeningRef.current = false
    }
    previousIsOpenRef.current = isOpen
  }, [isOpen])
  useEffect(() => {
    if (!isOpen || !scrollAfterOpeningRef.current) {
      return undefined
    }

    let observer: MutationObserver | undefined
    const frame = requestAnimationFrame(() => {
      const content = accordionRef.current?.querySelector<HTMLElement>(
        ':scope > .dnb-sidebar-menu__accordion__content'
      )
      if (content?.classList.contains('dnb-height-animation--animating')) {
        observer = new MutationObserver(() => {
          if (
            !content.classList.contains('dnb-height-animation--animating')
          ) {
            observer?.disconnect()
            scrollOpenedAccordionIntoView()
          }
        })
        observer.observe(content, {
          attributes: true,
          attributeFilter: ['class'],
        })
        return
      }
      scrollOpenedAccordionIntoView()
    })

    return () => {
      cancelAnimationFrame(frame)
      observer?.disconnect()
    }
  }, [isOpen, scrollOpenedAccordionIntoView])

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      if (
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        onClick?.(event)
        return
      }

      if (isSelected && collapsible) {
        event.preventDefault()
        setOpen(!requestedOpen, !requestedOpen)
        return
      }

      context.selectItem(id)
      onClick?.(event)

      if (!collapsible) {
        return
      }

      if (containsSelectedItem && requestedOpen) {
        setOpen(false)
        return
      }

      if (!isSelected && !requestedOpen) {
        setOpen(true, true)
        setDelayOpen(true)
        pendingOpenTimer.current = setTimeout(
          () => setDelayOpen(false),
          linkedAccordionOpenDelay
        )
        return
      }

      setOpen(true, !requestedOpen)
    },
    [
      collapsible,
      containsSelectedItem,
      context,
      disabled,
      id,
      isSelected,
      onClick,
      requestedOpen,
      setOpen,
    ]
  )

  const handleLinkKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (collapsible && event.key === ' ') {
        event.preventDefault()
        event.currentTarget.click()
      }
    },
    [collapsible]
  )

  const itemStyle = {
    '--sidebar-menu-indent': `${context.indent}rem`,
  } as React.CSSProperties
  const containsCollapsedSelection = containsSelectedItem && !isOpen
  const notificationIndicator = showNotificationIndicator && (
    <span
      className="dnb-sidebar-menu__accordion__notification-indicator"
      role="img"
      aria-label={translation.containsNotifications}
    />
  )
  const content = useMemo(() => {
    const currentDescription = containsCollapsedSelection && (
      <span className="dnb-sr-only">
        {translation.containsCurrentPage}
      </span>
    )

    return (
      <>
        <SidebarMenuItemContent
          icon={icon}
          text={text}
          textSuffix={currentDescription}
        />
        {suffix}
        {!showNotificationIndicator && (
          <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
        )}
      </>
    )
  }, [
    badge,
    badgeProps,
    containsCollapsedSelection,
    icon,
    showNotificationIndicator,
    suffix,
    text,
    translation.containsCurrentPage,
  ])
  const accordionIndicator = collapsible && (
    <span className="dnb-sidebar-menu__accordion__indicator">
      {notificationIndicator}
      <span className="dnb-sidebar-menu__accordion__expand-icon">
        <IconPrimary
          icon={accordionIcon}
          transitionState={isOpen ? 'expanded' : 'collapsed'}
        />
      </span>
    </span>
  )

  return (
    <li
      {...rest}
      ref={accordionRef}
      data-sidebar-menu-id={id}
      data-sidebar-menu-open-controlled={
        isControlled || !collapsible || undefined
      }
      className={clsx(
        'dnb-sidebar-menu__accordion',
        isOpen && collapsible && 'dnb-sidebar-menu__accordion--open',
        containsCollapsedSelection &&
          'dnb-sidebar-menu__accordion--contains-selected',
        isSelected && 'dnb-sidebar-menu__accordion--selected',
        disabled && 'dnb-sidebar-menu__accordion--disabled',
        className
      )}
    >
      {hasLink ? (
        <Anchor
          noStyle
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger dnb-sidebar-menu__accordion__link"
          href={disabled ? undefined : href}
          to={disabled ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          aria-current={isSelected ? 'page' : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled || undefined}
          aria-expanded={collapsible ? isOpen : undefined}
          aria-controls={controlsContent ? `${id}-content` : undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleLinkClick}
          onKeyDown={handleLinkKeyDown}
          title={title}
          style={itemStyle}
        >
          {content}
          {accordionIndicator}
        </Anchor>
      ) : !collapsible ? (
        <div
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger"
          style={itemStyle}
        >
          {content}
        </div>
      ) : (
        <button
          type="button"
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger"
          aria-expanded={isOpen}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-controls={controlsContent ? `${id}-content` : undefined}
          disabled={disabled}
          onClick={() => setOpen(!requestedOpen, !requestedOpen)}
          title={title}
          style={itemStyle}
        >
          {content}
          {accordionIndicator}
        </button>
      )}

      <HeightAnimation
        className="dnb-sidebar-menu__accordion__content"
        open={isOpen}
        animate={
          context.animate && (context.ancestorsOpen || startsAnimating)
        }
        openOnFind={useOpenOnFind}
        onBeforeMatch={() => setOpen(true)}
        onAnimationStart={(state) => {
          if (state === 'opening' || state === 'closing') {
            setDescendantsReady(false)
          }
        }}
        onAnimationEnd={(state) => {
          if (state === 'opened') {
            setDescendantsReady(true)
            scrollOpenedAccordionIntoView()
          }
        }}
      >
        <SidebarMenuContext
          value={{
            ...context,
            indent:
              context.indent + (context.accordionLevel === 0 ? 3 : 1),
            accordionLevel: context.accordionLevel + 1,
            ancestorsOpen:
              context.ancestorsOpen && isOpen && descendantsReady,
          }}
        >
          <ul id={`${id}-content`} className="dnb-sidebar-menu__list">
            {children}
          </ul>
        </SidebarMenuContext>
      </HeightAnimation>
    </li>
  )
}

function scrollExpandedContentIntoView(
  accordion: HTMLElement | null,
  drawerScrollElement: HTMLElement | null
) {
  const scrollView =
    drawerScrollElement ??
    accordion?.closest<HTMLElement>('.dnb-scroll-view')
  const trigger = accordion?.querySelector<HTMLElement>(
    ':scope > .dnb-sidebar-menu__accordion__trigger'
  )
  const content = accordion?.querySelector<HTMLElement>(
    ':scope > .dnb-sidebar-menu__accordion__content'
  )

  if (!trigger || !content) {
    return
  }

  const viewport = scrollView?.getBoundingClientRect() ?? {
    top: 0,
    bottom: window.innerHeight,
  }
  const contentRect = content.getBoundingClientRect()
  const hiddenBelow = contentRect.bottom - viewport.bottom

  if (hiddenBelow <= 0) {
    return
  }

  const triggerRect = trigger.getBoundingClientRect()
  const isCompact = Boolean(
    accordion.closest('[data-sidebar-menu-responsive-compact="true"]')
  )
  const rem =
    Number.parseFloat(
      getComputedStyle(document.documentElement).fontSize
    ) || 16
  const topInset = isCompact ? 4 * rem : rem
  const bottomInset = rem
  const availableAbove = Math.max(
    triggerRect.top - viewport.top - topInset,
    0
  )
  const scrollBy = Math.min(hiddenBelow + bottomInset, availableAbove)

  if (scrollBy < bottomInset) {
    return
  }

  const scrollElement = scrollView ?? window
  scrollElement.scrollTo({
    top: (scrollView?.scrollTop ?? window.scrollY) + scrollBy,
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
  })
}

function prefersReducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

withComponentMarkers(SidebarMenuAccordion, {
  _sidebarMenuRole: 'accordion',
})

function hasNotificationBadge(children: ReactNode): boolean {
  return Children.toArray(children).some((child) => {
    if (!isValidElement(child)) {
      return false
    }

    const element = child as ReactElement<{
      badge?: SidebarMenuAccordionProps['badge']
      badgeProps?: SidebarMenuAccordionProps['badgeProps']
      children?: ReactNode
    }>
    const hasBadge =
      element.props.badge !== undefined &&
      element.props.badge !== null &&
      element.props.badgeProps?.variant === 'notification' &&
      element.props.badgeProps.hideBadge !== true

    return hasBadge || hasNotificationBadge(element.props.children)
  })
}
