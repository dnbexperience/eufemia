import { clsx } from 'clsx'
import type { SidebarMenuHeaderProps } from './types'

export default function SidebarMenuHeader(props: SidebarMenuHeaderProps) {
  const { className, text, children, headingLevel = 2, ...rest } = props

  return (
    <li {...rest} className={clsx('dnb-sidebar-menu__header', className)}>
      <span role="heading" aria-level={headingLevel}>
        {text ?? children}
      </span>
    </li>
  )
}
