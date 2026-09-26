import { clsx } from 'clsx'
import type { SidebarMenuHeaderProps } from './types'
import useId from '../../shared/helpers/useId'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const { id, className, text, children, ...rest } = props
  const titleId = `${useId(id)}-title`

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
        {text}
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
