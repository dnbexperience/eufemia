import { useContext } from 'react'
import { clsx } from 'clsx'
import Button from '../../components/button/Button'
import type { ButtonProps } from '../../components/button/Button'
import { sidebar } from '../../icons'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useTranslation from '../../shared/useTranslation'
import {
  SidebarMenuInlineToggleContext,
  useSidebarMenuResponsiveContext,
} from './SidebarMenuResponsiveContext'

export type SidebarMenuToggleProps = Omit<
  ButtonProps,
  'aria-expanded' | 'aria-haspopup' | 'aria-controls'
> & {
  /** Id of the mobile Drawer. Default: sidebar-menu-responsive-drawer. */
  controls?: string
  /** Id of the desktop navigation. Defaults to the ResponsiveAside id. */
  inlineControls?: string
}

export default function SidebarMenuToggle({
  controls = 'sidebar-menu-responsive-drawer',
  inlineControls,
  icon = sidebar,
  variant = 'tertiary',
  className,
  onClick,
  ref,
  ...props
}: SidebarMenuToggleProps) {
  const {
    inlineCollapsed,
    inlineId,
    isSmallScreen,
    open,
    collapseInline,
    restoreInline,
    toggle,
    triggerRef,
  } = useSidebarMenuResponsiveContext()
  const inline = useContext(SidebarMenuInlineToggleContext)
  const combinedRef = useCombinedRef(ref, inline ? undefined : triggerRef)
  const expanded =
    inline?.open ?? (isSmallScreen ? open : !inlineCollapsed)
  const translation = useTranslation().SidebarMenu

  return (
    <Button
      {...props}
      ref={combinedRef}
      className={clsx('dnb-sidebar-menu-toggle', className)}
      icon={icon}
      variant={variant}
      aria-label={
        props['aria-label'] ??
        (props.text || props.children
          ? undefined
          : expanded
            ? translation.closeMenu
            : translation.openMenu)
      }
      aria-expanded={expanded}
      aria-haspopup={!inline && isSmallScreen ? 'dialog' : undefined}
      aria-controls={
        inline?.controls ??
        (isSmallScreen ? controls : (inlineControls ?? inlineId))
      }
      onClick={(event) => {
        onClick?.(event)
        if (event.event?.defaultPrevented) {
          return
        }
        if (inline) {
          inline.toggle()
        } else if (isSmallScreen) {
          toggle()
        } else if (inlineCollapsed) {
          restoreInline()
        } else {
          collapseInline()
        }
      }}
    />
  )
}
