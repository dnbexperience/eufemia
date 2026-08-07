import { clsx } from 'clsx'
import Anchor from '../../components/Anchor'
import IconPrimary from '../../components/IconPrimary'
import SidebarMenuBadge from './SidebarMenuBadge'
import SidebarMenuItemContent from './SidebarMenuItemContent'
import {
  SidebarMenuContext,
  useSidebarMenuContext,
} from './SidebarMenuContext'
import type { SidebarMenuGroupProps } from './types'

export default function SidebarMenuGroup(props: SidebarMenuGroupProps) {
  const {
    id,
    className,
    text,
    icon,
    badge,
    suffix,
    badgeProps,
    children,
    style,
    href,
    to,
    element,
    target,
    rel,
    onClick,
    disabled = false,
    ...rest
  } = props
  const context = useSidebarMenuContext()
  const titleId = `${id}-title`
  const hasLink = Boolean(href || to)
  const isSelected = context.selectedItem === id
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    context.selectItem(id)
    onClick?.(event)
  }

  return (
    <li
      {...rest}
      data-sidebar-menu-id={hasLink ? id : undefined}
      data-sidebar-menu-group-id={id}
      className={clsx(
        'dnb-sidebar-menu__group',
        hasLink && 'dnb-sidebar-menu__item',
        isSelected && 'dnb-sidebar-menu__item--selected',
        disabled && 'dnb-sidebar-menu__item--disabled',
        className
      )}
      style={
        {
          ...style,
          '--sidebar-menu-indent': `${context.level * 2}rem`,
        } as React.CSSProperties
      }
    >
      {hasLink ? (
        <Anchor
          noStyle
          id={titleId}
          className="dnb-sidebar-menu__item__action dnb-sidebar-menu__group__link"
          href={disabled ? undefined : href}
          to={disabled ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          aria-current={isSelected ? 'page' : undefined}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleClick}
        >
          <span
            className={clsx(
              'dnb-sidebar-menu__item__selection-indicator',
              icon &&
                'dnb-sidebar-menu__item__selection-indicator--has-icon'
            )}
            aria-hidden="true"
          >
            {icon && (
              <span className="dnb-sidebar-menu__item__original-icon">
                <IconPrimary icon={icon} />
              </span>
            )}
            <span className="dnb-sidebar-menu__item__selection-icon">
              <IconPrimary icon="arrow_right" />
            </span>
          </span>
          <span className="dnb-sidebar-menu__item__content">
            <SidebarMenuItemContent text={text} />
          </span>
          {suffix}
          <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
        </Anchor>
      ) : (
        <div id={titleId} className="dnb-sidebar-menu__group__title">
          {text}
        </div>
      )}
      <SidebarMenuContext value={{ ...context, level: context.level + 1 }}>
        <ul
          className="dnb-sidebar-menu__list dnb-sidebar-menu__group__list"
          aria-labelledby={titleId}
        >
          {children}
        </ul>
      </SidebarMenuContext>
    </li>
  )
}
