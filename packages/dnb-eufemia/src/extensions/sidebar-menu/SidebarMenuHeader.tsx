import { Children } from 'react'
import { clsx } from 'clsx'
import type { SidebarMenuHeaderProps } from './types'
import useId from '../../shared/helpers/useId'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const {
    id,
    className,
    text,
    children,
    headingLevel = 2,
    ...rest
  } = props
  const titleId = `${useId(id)}-title`
  const hasText = text !== undefined && text !== null
  const label = hasText ? text : children
  const hasItems = hasText && Children.toArray(children).length > 0
  const hasLabel = Children.toArray(label).length > 0

  if (!hasItems) {
    return (
      <li
        {...rest}
        id={id}
        className={clsx('dnb-sidebar-menu__header', className)}
      >
        {hasLabel && (
          <span role="heading" aria-level={headingLevel}>
            {label}
          </span>
        )}
      </li>
    )
  }

  return (
    <li
      {...rest}
      id={id}
      className={clsx(
        'dnb-sidebar-menu__group dnb-sidebar-menu__header-group',
        className
      )}
    >
      <div
        id={titleId}
        className="dnb-sidebar-menu__header"
        role="heading"
        aria-level={headingLevel}
      >
        {label}
      </div>
      <ul
        className="dnb-sidebar-menu__list dnb-sidebar-menu__group__list"
        aria-labelledby={titleId}
      >
        {children}
      </ul>
    </li>
  )
}
