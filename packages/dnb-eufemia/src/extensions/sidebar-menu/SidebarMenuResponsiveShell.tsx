import type { ComponentPropsWithRef } from 'react'
import { clsx } from 'clsx'
import { useSidebarMenuResponsiveContext } from './SidebarMenuResponsiveContext'

export type SidebarMenuResponsiveShellProps = ComponentPropsWithRef<'div'>

export default function SidebarMenuResponsiveShell({
  className,
  style,
  ...props
}: SidebarMenuResponsiveShellProps) {
  const { isSmallScreen } = useSidebarMenuResponsiveContext()

  return (
    <div
      {...props}
      className={clsx('dnb-sidebar-menu-responsive-shell', className)}
      data-sidebar-menu-responsive-small-screen={
        isSmallScreen || undefined
      }
      style={style}
    />
  )
}
