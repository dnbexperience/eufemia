import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
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
import SidebarMenuBadge from './SidebarMenuBadge'
import SidebarMenuItemContent from './SidebarMenuItemContent'
import type { SidebarMenuAccordionProps } from './types'

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
    ...rest
  } = props
  const context = useSidebarMenuContext()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [delayOpen, setDelayOpen] = useState(false)
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
  const isSelected = context.selectedItem === id
  const containsSelectedItem = context.selectedItemAncestorIds.includes(id)
  const hasLink = Boolean(href || to)
  const useUntilFound = context.untilFound && collapsible
  const clearPendingOpen = useCallback(() => {
    clearTimeout(pendingOpenTimer.current)
    pendingOpenTimer.current = undefined
  }, [])

  const setOpen = useCallback(
    (next: boolean) => {
      clearPendingOpen()
      setDelayOpen(false)
      if (!isControlled && !context.openItemsControlled) {
        setInternalOpen(next)
      }
      context.toggleItem(id, next)
      onOpenChange?.(next)
    },
    [clearPendingOpen, context, id, isControlled, onOpenChange]
  )

  useEffect(() => clearPendingOpen, [clearPendingOpen])

  const handleLinkClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      if (disabled) {
        event.preventDefault()
        return
      }

      if (isSelected && collapsible) {
        event.preventDefault()
        setOpen(!requestedOpen)
        return
      }

      context.selectItem(id)
      onClick?.(event)

      if (!collapsible) {
        return
      }

      if (!isSelected && !requestedOpen) {
        setOpen(true)
        setDelayOpen(true)
        pendingOpenTimer.current = setTimeout(
          () => setDelayOpen(false),
          linkedAccordionOpenDelay
        )
        return
      }

      setOpen(true)
    },
    [
      collapsible,
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
    '--sidebar-menu-indent': `${context.level * 2.5}rem`,
  } as React.CSSProperties
  const currentIndicator = containsSelectedItem && !isOpen && (
    <span
      className="dnb-sidebar-menu__accordion__current-indicator"
      role="img"
      aria-label="Contains current page"
    />
  )
  const content = useMemo(
    () => (
      <>
        <SidebarMenuItemContent
          icon={icon}
          text={text}
          textSuffix={currentIndicator}
        />
        {suffix}
        <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
      </>
    ),
    [badge, badgeProps, currentIndicator, icon, suffix, text]
  )
  return (
    <li
      {...rest}
      data-sidebar-menu-id={id}
      className={clsx(
        'dnb-sidebar-menu__accordion',
        isOpen && collapsible && 'dnb-sidebar-menu__accordion--open',
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
          aria-disabled={disabled || undefined}
          aria-expanded={collapsible ? isOpen : undefined}
          aria-controls={collapsible ? `${id}-content` : undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleLinkClick}
          onKeyDown={handleLinkKeyDown}
          style={itemStyle}
        >
          {content}
          {collapsible && (
            <span className="dnb-sidebar-menu__accordion__indicator">
              <IconPrimary
                icon={accordionIcon}
                transitionState={isOpen ? 'expanded' : 'collapsed'}
              />
            </span>
          )}
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
          aria-controls={`${id}-content`}
          disabled={disabled}
          onClick={() => setOpen(!requestedOpen)}
          style={itemStyle}
        >
          {content}
          <span className="dnb-sidebar-menu__accordion__indicator">
            <IconPrimary
              icon={accordionIcon}
              transitionState={isOpen ? 'expanded' : 'collapsed'}
            />
          </span>
        </button>
      )}

      <HeightAnimation
        open={isOpen}
        untilFound={useUntilFound}
        onBeforeMatch={() => setOpen(true)}
        compensateForGap="auto"
      >
        <SidebarMenuContext
          value={{ ...context, level: context.level + 1 }}
        >
          <ul id={`${id}-content`} className="dnb-sidebar-menu__list">
            {children}
          </ul>
        </SidebarMenuContext>
      </HeightAnimation>
    </li>
  )
}
