import { clsx } from 'clsx'
import type { SidebarMenuDividerProps } from './types'

export default function SidebarMenuDivider(
  props: SidebarMenuDividerProps
) {
  const { className, ...rest } = props

  return (
    <li {...rest} className="dnb-sidebar-menu__divider-item">
      <div
        role="separator"
        className={clsx('dnb-sidebar-menu__divider', className)}
      />
    </li>
  )
}
