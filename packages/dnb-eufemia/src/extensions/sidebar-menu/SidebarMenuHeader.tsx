import { clsx } from 'clsx'
import type { SidebarMenuHeaderProps } from './types'
import useId from '../../shared/helpers/useId'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const {
    id,
    className,
    text,
    children,
    headingLevel: _headingLevel,
    ...rest
  } = props
  const titleId = `${useId(id)}-title`
  const hasText = text !== undefined && text !== null
  const label = hasText ? text : children
  const items = hasText ? children : undefined

  if (!hasText) {
    return (
      <li
        {...rest}
        id={id}
        className={clsx('dnb-sidebar-menu__header', className)}
      >
        {label}
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
      <div id={titleId} className="dnb-sidebar-menu__header">
        {label}
      </div>
      <ul
        className="dnb-sidebar-menu__list dnb-sidebar-menu__group__list"
        aria-labelledby={titleId}
      >
        {items}
      </ul>
    </li>
  )
}
