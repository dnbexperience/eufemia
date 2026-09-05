import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import Button from '../../components/button/Button'
import type { ButtonProps } from '../../components/button/Button'
import Drawer from '../../components/drawer/Drawer'
import type { DrawerAllProps } from '../../components/drawer/Drawer'
import Icon from '../../components/icon/Icon'
import useMediaQuery from '../../shared/useMediaQuery'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'
import { hamburger } from '../../icons'
import { close as closeIcon } from '../../icons/primary_icons'
import { clsx } from 'clsx'

const responsiveTriggerIcon = Icon.transition({
  closed: hamburger,
  open: closeIcon,
})

type ResponsiveContextValue = {
  close: () => void
  isMobile: boolean
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
}

const ResponsiveContext = createContext<
  ResponsiveContextValue | undefined
>(undefined)

export type SidebarMenuResponsiveProviderProps = {
  children: ReactNode
  /** Maximum viewport width at which the mobile navigation is used. */
  breakpoint?: MediaQuerySizes | number | string
  /** Controlled Drawer state. */
  open?: boolean
  /** Initial uncontrolled Drawer state. */
  defaultOpen?: boolean
  /** Called whenever the responsive Drawer opens or closes. */
  onOpenChange?: (open: boolean) => void
}

export function SidebarMenuResponsiveProvider({
  children,
  breakpoint = 'medium',
  open,
  defaultOpen = false,
  onOpenChange,
}: SidebarMenuResponsiveProviderProps) {
  const isMobile = useMediaQuery({ when: { max: breakpoint } })
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const resolvedOpen = open ?? internalOpen

  const setOpen = (nextOpen: boolean) => {
    if (open === undefined) {
      setInternalOpen(nextOpen)
    }
    onOpenChange?.(nextOpen)
  }

  useEffect(() => {
    if (typeof window !== 'undefined' && !isMobile && resolvedOpen) {
      setOpen(false)
    }
  }, [isMobile, resolvedOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  const value = useMemo(
    () => ({
      close: () => setOpen(false),
      isMobile,
      open: resolvedOpen,
      setOpen,
      toggle: () => setOpen(!resolvedOpen),
    }),
    [isMobile, resolvedOpen] // eslint-disable-line react-hooks/exhaustive-deps
  )

  return <ResponsiveContext value={value}>{children}</ResponsiveContext>
}

export function useSidebarMenuResponsive() {
  const context = useContext(ResponsiveContext)
  if (!context) {
    throw new Error(
      'SidebarMenu responsive parts must be inside SidebarMenu.ResponsiveProvider'
    )
  }
  return context
}

export type SidebarMenuResponsiveTriggerProps = ButtonProps & {
  /** Id of the responsive Drawer controlled by this button. */
  controls?: string
}

export function SidebarMenuResponsiveTrigger({
  controls = 'sidebar-menu-responsive-drawer',
  icon,
  transitionState,
  variant = 'tertiary',
  title,
  ...props
}: SidebarMenuResponsiveTriggerProps) {
  const { isMobile, open, toggle } = useSidebarMenuResponsive()
  if (!isMobile) {
    return null
  }

  return (
    <Button
      {...props}
      icon={icon ?? responsiveTriggerIcon}
      transitionState={
        icon === undefined || icon === null
          ? open
            ? 'open'
            : 'closed'
          : transitionState
      }
      variant={variant}
      title={title ?? (open ? 'Close menu' : 'Open menu')}
      aria-haspopup="dialog"
      aria-controls={controls}
      aria-expanded={open}
      onClick={toggle}
    />
  )
}

export function SidebarMenuResponsiveInline({
  children,
}: {
  children: ReactNode
}) {
  return useSidebarMenuResponsive().isMobile ? null : children
}

export type SidebarMenuResponsiveDrawerProps = Omit<
  DrawerAllProps,
  'onClose' | 'open'
> & {
  onClose?: DrawerAllProps['onClose']
}

export function SidebarMenuResponsiveDrawer({
  id = 'sidebar-menu-responsive-drawer',
  dialogTitle = 'Menu',
  containerPlacement = 'left',
  fullscreen = false,
  minWidth = 'min(80vw, 24rem)',
  maxWidth = 'min(80vw, 24rem)',
  spacing = false,
  scrollbarGutter = 'stable',
  className,
  onClose,
  ...props
}: SidebarMenuResponsiveDrawerProps) {
  const { close, isMobile, open } = useSidebarMenuResponsive()
  if (!isMobile) {
    return null
  }

  return (
    <Drawer
      {...props}
      id={id}
      dialogTitle={dialogTitle}
      open={open}
      onClose={(event) => {
        close()
        onClose?.(event)
      }}
      omitTriggerButton
      containerPlacement={containerPlacement}
      fullscreen={fullscreen}
      minWidth={minWidth}
      maxWidth={maxWidth}
      spacing={spacing}
      scrollbarGutter={scrollbarGutter}
      className={clsx('dnb-sidebar-menu-responsive-drawer', className)}
    />
  )
}
