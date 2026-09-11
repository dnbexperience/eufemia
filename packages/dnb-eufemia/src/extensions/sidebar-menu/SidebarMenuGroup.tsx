import { clsx } from 'clsx'
import Anchor from '../../components/Anchor'
import SidebarMenuBadge from './SidebarMenuBadge'
import SidebarMenuItemContent from './SidebarMenuItemContent'
import {
  SidebarMenuContext,
  useSidebarMenuContext,
} from './SidebarMenuContext'
import type { SidebarMenuGroupProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useId from '../../shared/helpers/useId'

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
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    title,
    ...rest
  } = props
  const context = useSidebarMenuContext()
  const resolvedId = useId(id)
  const titleId = `${resolvedId}-title`
  const hasLink = Boolean(href || to)
  const isSelected = context.selectedItem === resolvedId
  const handleClick: React.MouseEventHandler<HTMLElement> = (event) => {
    if (disabled) {
      event.preventDefault()
      return
    }

    context.selectItem(resolvedId)
    onClick?.(event)
  }

  return (
    <li
      {...rest}
      data-sidebar-menu-id={hasLink ? resolvedId : undefined}
      data-sidebar-menu-group-id={resolvedId}
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
          '--sidebar-menu-indent': `${context.indent}rem`,
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
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-disabled={disabled || undefined}
          tabIndex={disabled ? -1 : undefined}
          onClick={handleClick}
          title={title}
        >
          <span className="dnb-sidebar-menu__item__content">
            <SidebarMenuItemContent icon={icon} text={text} />
          </span>
          {suffix}
          <SidebarMenuBadge badge={badge} badgeProps={badgeProps} />
        </Anchor>
      ) : text ? (
        <div id={titleId} className="dnb-sidebar-menu__group__title">
          {text}
        </div>
      ) : null}
      <SidebarMenuContext
        value={{ ...context, indent: context.indent + 1 }}
      >
        <ul
          className="dnb-sidebar-menu__list dnb-sidebar-menu__group__list"
          aria-labelledby={text ? titleId : undefined}
        >
          {children}
        </ul>
      </SidebarMenuContext>
    </li>
  )
}

withComponentMarkers(SidebarMenuGroup, { _sidebarMenuRole: 'group' })
