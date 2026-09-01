import { clsx } from 'clsx'
import Anchor from '../../components/Anchor'
import SidebarMenuBadge from './SidebarMenuBadge'
import SidebarMenuItemContent from './SidebarMenuItemContent'
import { useSidebarMenuContext } from './SidebarMenuContext'
import type { SidebarMenuItemProps } from './types'

export default function SidebarMenuItem(props: SidebarMenuItemProps) {
  const {
    id,
    className,
    children,
    text,
    icon,
    badge,
    suffix,
    badgeProps,
    href,
    to,
    element,
    target,
    rel,
    disabled = false,
    active = false,
    onClick,
    ...rest
  } = props
  const context = useSidebarMenuContext()
  const { indent } = context
  const isSelected = context.selectedItem === id

  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (disabled) {
      event.preventDefault()
      return
    }
    context.selectItem(id)
    onClick?.(event)
  }
  const hasLink = Boolean(href || to)
  const content = (
    <>
      <span className="dnb-sidebar-menu__item__content">
        <SidebarMenuItemContent icon={icon} text={text}>
          {children}
        </SidebarMenuItemContent>
      </span>
      {suffix}
      <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
    </>
  )

  return (
    <li
      {...rest}
      data-sidebar-menu-id={id}
      className={clsx(
        'dnb-sidebar-menu__item',
        active && 'dnb-sidebar-menu__item--active',
        isSelected && 'dnb-sidebar-menu__item--selected',
        disabled && 'dnb-sidebar-menu__item--disabled',
        className
      )}
      style={
        {
          ...rest.style,
          '--sidebar-menu-indent': `${indent}rem`,
        } as React.CSSProperties
      }
    >
      {hasLink ? (
        <Anchor
          noStyle
          className="dnb-sidebar-menu__item__action"
          href={disabled ? undefined : href}
          to={disabled ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          aria-current={isSelected || active ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleClick}
        >
          {content}
        </Anchor>
      ) : (
        <button
          className="dnb-sidebar-menu__item__action"
          type="button"
          disabled={disabled}
          aria-current={isSelected || active ? 'page' : undefined}
          onClick={handleClick}
        >
          {content}
        </button>
      )}
    </li>
  )
}
