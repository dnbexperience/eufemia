import { clsx } from 'clsx'
import type { SidebarMenuHeaderProps } from './types'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const { className, text, children, ...rest } = props

  return (
    <li {...rest} className={clsx('dnb-sidebar-menu__header', className)}>
      {text ?? children}
    </li>
  )
}
