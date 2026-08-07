import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { clsx } from 'clsx'
import Anchor from '../Anchor'
import HeightAnimation from '../height-animation/HeightAnimation'
import Icon from '../icon/Icon'
import IconPrimary from '../IconPrimary'
import { chevron_down, chevron_up, folder } from '../../icons'
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
const linkedAccordionOpenDelay = 500

export default function SidebarMenuAccordion(
  props: SidebarMenuAccordionProps
) {
  const {
    id,
    className,
    children,
    icon = folder,
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
    onOpenChange,
    ...rest
  } = props
  const context = useSidebarMenuContext()
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const pendingOpenTimer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const contextControlsOpen = context.openItems.includes(id)
  const isControlled = typeof open === 'boolean'
  const isOpen = isControlled
    ? open
    : context.openItemsControlled
      ? contextControlsOpen
      : contextControlsOpen || internalOpen
  const isSelected = context.selectedItem === id
  const hasLink = Boolean(href || to)
  const clearPendingOpen = useCallback(() => {
    clearTimeout(pendingOpenTimer.current)
    pendingOpenTimer.current = undefined
  }, [])

  const setOpen = useCallback(
    (next: boolean) => {
      clearPendingOpen()
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
      context.selectItem(id)
      onClick?.(event)

      if (!isSelected && !isOpen) {
        clearPendingOpen()
        pendingOpenTimer.current = setTimeout(
          () => setOpen(true),
          linkedAccordionOpenDelay
        )
        return
      }

      setOpen(isSelected ? !isOpen : true)
    },
    [
      clearPendingOpen,
      context,
      disabled,
      id,
      isOpen,
      isSelected,
      onClick,
      setOpen,
    ]
  )

  const itemStyle = {
    '--sidebar-menu-indent': `${context.level * 2}rem`,
  } as React.CSSProperties
  const label = typeof text === 'string' ? text : 'section'
  const content = useMemo(
    () => (
      <>
        <SidebarMenuItemContent icon={icon} text={text} />
        {suffix}
        <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
      </>
    ),
    [badge, badgeProps, icon, suffix, text]
  )
  const linkContent = useMemo(
    () => (
      <>
        <span
          className="dnb-sidebar-menu__item__selection-indicator dnb-sidebar-menu__item__selection-indicator--has-icon"
          aria-hidden="true"
        >
          <span className="dnb-sidebar-menu__item__original-icon">
            <IconPrimary icon={icon} />
          </span>
          <span className="dnb-sidebar-menu__item__selection-icon">
            <IconPrimary icon="arrow_right" />
          </span>
        </span>
        <span className="dnb-sidebar-menu__item__content">
          <SidebarMenuItemContent text={text} />
        </span>
        {suffix}
        <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
      </>
    ),
    [badge, badgeProps, icon, suffix, text]
  )

  return (
    <li
      {...rest}
      data-sidebar-menu-id={id}
      className={clsx(
        'dnb-sidebar-menu__accordion',
        isOpen && 'dnb-sidebar-menu__accordion--open',
        isSelected && 'dnb-sidebar-menu__accordion--selected',
        hasLink && 'dnb-sidebar-menu__accordion--page',
        disabled && 'dnb-sidebar-menu__accordion--disabled',
        className
      )}
    >
      {hasLink ? (
        <div
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger dnb-sidebar-menu__accordion__split"
          style={itemStyle}
        >
          <Anchor
            noStyle
            className="dnb-sidebar-menu__accordion__link"
            href={disabled ? undefined : href}
            to={disabled ? undefined : to}
            element={element}
            target={target}
            rel={rel}
            aria-current={isSelected ? 'page' : undefined}
            aria-disabled={disabled || undefined}
            tabIndex={disabled ? -1 : undefined}
            onClick={handleLinkClick}
          >
            {linkContent}
          </Anchor>
          <button
            type="button"
            className="dnb-sidebar-menu__accordion__toggle"
            aria-expanded={isOpen}
            aria-controls={`${id}-content`}
            aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${label}`}
            disabled={disabled}
            onClick={() => setOpen(!isOpen)}
          >
            <IconPrimary
              icon={accordionIcon}
              transitionState={isOpen ? 'expanded' : 'collapsed'}
            />
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          disabled={disabled}
          onClick={() => setOpen(!isOpen)}
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

      <HeightAnimation open={isOpen} compensateForGap="auto">
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
