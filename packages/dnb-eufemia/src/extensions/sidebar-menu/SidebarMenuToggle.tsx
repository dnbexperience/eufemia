import { useContext } from 'react'
import { clsx } from 'clsx'
import Button from '../../components/button/Button'
import type { ButtonProps } from '../../components/button/Button'
import { sidebar } from '../../icons'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import { useSharedState } from '../../shared/helpers/useSharedState'
import useTranslation from '../../shared/useTranslation'
import {
  SidebarMenuInlineToggleContext,
  sidebarMenuResponsiveStateOptions,
  useOptionalSidebarMenuResponsive,
} from './SidebarMenuResponsiveContext'
import type { SidebarMenuResponsiveContextValue } from './SidebarMenuResponsiveContext'

export type SidebarMenuToggleProps = Omit<
  ButtonProps,
  'aria-expanded' | 'aria-haspopup' | 'aria-controls'
> & {
  /** scopeId of the ResponsiveProvider to control from outside its context. */
  scopeId?: string
  /** Overrides the aria-controls Drawer id. Defaults to the ResponsiveDrawer id. */
  controls?: string
  /** Id of the inline navigation. Defaults to the ResponsiveAside id. */
  inlineControls?: string
}

export default function SidebarMenuToggle({
  scopeId,
  controls,
  inlineControls,
  icon = sidebar,
  variant = 'tertiary',
  className,
  onClick,
  ref,
  ...props
}: SidebarMenuToggleProps) {
  const parentContext = useOptionalSidebarMenuResponsive()
  const { data: targetContext } =
    useSharedState<SidebarMenuResponsiveContextValue>(
      scopeId && scopeId !== parentContext?.scopeId ? scopeId : undefined,
      undefined,
      null,
      sidebarMenuResponsiveStateOptions
    )
  const context =
    !scopeId || scopeId === parentContext?.scopeId
      ? parentContext
      : targetContext
  const inlineContext = useContext(SidebarMenuInlineToggleContext)
  const inline = context === parentContext ? inlineContext : undefined
  const combinedRef = useCombinedRef(
    ref,
    inline ? undefined : context?.triggerRef
  )
  const expanded = context
    ? (inline?.open ??
      (context.isSmallScreen ? context.open : !context.inlineCollapsed))
    : undefined
  const translation = useTranslation().SidebarMenu

  if (!context && !scopeId) {
    throw new Error(
      'SidebarMenu.Toggle requires ResponsiveProvider or a scopeId targeting one'
    )
  }

  return (
    <Button
      {...props}
      disabled={props.disabled || !context}
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
      aria-haspopup={
        !inline && context?.isSmallScreen ? 'dialog' : undefined
      }
      aria-controls={
        inline?.controls ??
        (context?.isSmallScreen
          ? (controls ??
            context.drawerId ??
            'sidebar-menu-responsive-drawer')
          : (inlineControls ?? context?.inlineId))
      }
      onClick={(event) => {
        onClick?.(event)
        if (event.event?.defaultPrevented || !context) {
          return
        }
        if (inline) {
          inline.toggle()
        } else if (context.isSmallScreen) {
          context.triggerRef.current = event.event.currentTarget
          context.toggle()
        } else if (context.inlineCollapsed) {
          context.restoreInline()
        } else {
          context.collapseInline()
        }
      }}
    />
  )
}
