import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import type { ReactNode, RefObject } from 'react'
import Button from '../../components/button/Button'
import type { ButtonProps } from '../../components/button/Button'
import Drawer from '../../components/drawer/Drawer'
import type { DrawerAllProps } from '../../components/drawer/Drawer'
import useMediaQuery from '../../shared/useMediaQuery'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'
import { hamburger } from '../../icons'
import { clsx } from 'clsx'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from '../../shared/useTranslation'

type SidebarMenuResponsiveContextValue = {
  close: () => void
  drawerScrollElement: HTMLElement | null
  setDrawerScrollElement: (element: HTMLElement | null) => void
  isHydrated: boolean
  isSmallScreen: boolean
  open: boolean
  setOpen: (open: boolean) => void
  toggle: () => void
  triggerRef: RefObject<HTMLElement | null>
  isSmallScreenRef: RefObject<boolean>
}

const ResponsiveContext = createContext<
  SidebarMenuResponsiveContextValue | undefined
>(undefined)

export type SidebarMenuResponsiveValue = Pick<
  SidebarMenuResponsiveContextValue,
  'close' | 'isSmallScreen' | 'open' | 'setOpen' | 'toggle'
>

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
  const isSmallScreen = useMediaQuery({ when: { max: breakpoint } })
  const [isHydrated, setHydrated] = useState(false)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const isSmallScreenRef = useRef(isSmallScreen)
  const triggerRef = useRef<HTMLElement>(null)
  const onOpenChangeRef = useRef(onOpenChange)
  const [drawerScrollElement, setDrawerScrollElementState] =
    useState<HTMLElement | null>(null)
  const setDrawerScrollElement = useCallback(
    (element: HTMLElement | null) => setDrawerScrollElementState(element),
    []
  )
  const resolvedOpen = open ?? internalOpen

  useIsomorphicLayoutEffect(() => {
    isSmallScreenRef.current = isSmallScreen
  }, [isSmallScreen])

  useIsomorphicLayoutEffect(() => {
    onOpenChangeRef.current = onOpenChange
  }, [onOpenChange])

  useIsomorphicLayoutEffect(() => {
    setHydrated(true)
  }, [])

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (open === undefined) {
        setInternalOpen(nextOpen)
      }
      onOpenChangeRef.current?.(nextOpen)
    },
    [open]
  )
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(
    () => setOpen(!resolvedOpen),
    [resolvedOpen, setOpen]
  )

  useEffect(() => {
    if (typeof window !== 'undefined' && !isSmallScreen && resolvedOpen) {
      setOpen(false)
    }
  }, [isSmallScreen, resolvedOpen, setOpen])

  const value = useMemo(
    () => ({
      close,
      drawerScrollElement,
      isHydrated,
      isSmallScreen,
      isSmallScreenRef,
      open: resolvedOpen,
      setOpen,
      setDrawerScrollElement,
      toggle,
      triggerRef,
    }),
    [
      close,
      drawerScrollElement,
      isHydrated,
      isSmallScreen,
      resolvedOpen,
      setDrawerScrollElement,
      setOpen,
      toggle,
    ]
  )

  return <ResponsiveContext value={value}>{children}</ResponsiveContext>
}

export function useSidebarMenuResponsive(): SidebarMenuResponsiveValue {
  const context = useResponsiveContext()
  const { close, isSmallScreen, open, setOpen, toggle } = context

  return useMemo(
    () => ({ close, isSmallScreen, open, setOpen, toggle }),
    [close, isSmallScreen, open, setOpen, toggle]
  )
}

function useResponsiveContext() {
  const context = useContext(ResponsiveContext)
  if (!context) {
    throw new Error(
      'SidebarMenu responsive parts must be inside SidebarMenu.ResponsiveProvider'
    )
  }
  return context
}

export function useOptionalSidebarMenuResponsive() {
  return useContext(ResponsiveContext)
}

export type SidebarMenuResponsiveTriggerProps = Omit<
  ButtonProps,
  'aria-expanded' | 'aria-haspopup'
> & {
  /** Id of the responsive Drawer controlled by this button. */
  controls?: string
}

export function SidebarMenuResponsiveTrigger({
  controls = 'sidebar-menu-responsive-drawer',
  icon,
  ref,
  variant = 'tertiary',
  title,
  onClick,
  ...props
}: SidebarMenuResponsiveTriggerProps) {
  const { isHydrated, isSmallScreen, open, toggle, triggerRef } =
    useResponsiveContext()
  const translation = useTranslation().SidebarMenu
  const combinedRef = useCombinedRef(ref, triggerRef)

  return (
    <Button
      {...props}
      ref={combinedRef}
      className={clsx(
        'dnb-sidebar-menu-responsive-trigger',
        props.className
      )}
      data-sidebar-menu-responsive-visible={
        isHydrated ? String(isSmallScreen) : undefined
      }
      icon={icon ?? hamburger}
      variant={variant}
      title={
        title ?? (open ? translation.closeMenu : translation.openMenu)
      }
      aria-haspopup="dialog"
      aria-controls={controls}
      aria-expanded={open}
      onClick={(event) => {
        onClick?.(event)
        if (!event.event?.defaultPrevented) {
          toggle()
        }
      }}
    />
  )
}

export function SidebarMenuResponsiveInline({
  children,
}: {
  children: ReactNode
}) {
  const { isHydrated, isSmallScreen } = useResponsiveContext()
  if (isHydrated && isSmallScreen) {
    return null
  }

  return (
    <div
      className="dnb-sidebar-menu-responsive-inline"
      data-sidebar-menu-responsive-visible={
        isHydrated ? String(!isSmallScreen) : undefined
      }
    >
      {children}
    </div>
  )
}

export type SidebarMenuResponsiveDrawerProps = Omit<
  DrawerAllProps,
  'onClose' | 'open'
> & {
  onClose?: DrawerAllProps['onClose']
}

export function SidebarMenuResponsiveDrawer({
  id = 'sidebar-menu-responsive-drawer',
  dialogTitle,
  containerPlacement = 'left',
  fullscreen = false,
  minWidth = 'min(80vw, 24rem)',
  maxWidth = 'min(80vw, 24rem)',
  spacing = false,
  scrollbarGutter = 'stable',
  scrollRef,
  className,
  onClose,
  ...props
}: SidebarMenuResponsiveDrawerProps) {
  const translation = useTranslation().SidebarMenu
  const {
    close,
    isSmallScreen,
    isSmallScreenRef,
    open,
    setDrawerScrollElement,
    triggerRef,
  } = useResponsiveContext()
  const combinedScrollRef = useMemo<RefObject<HTMLElement>>(() => {
    let current: HTMLElement | null = null

    return {
      get current() {
        return current
      },
      set current(element) {
        current = element
        if (scrollRef) {
          scrollRef.current = element
        }
        setDrawerScrollElement(element)
      },
    }
  }, [scrollRef, setDrawerScrollElement])
  if (!isSmallScreen) {
    return null
  }

  return (
    <Drawer
      {...props}
      id={id}
      contentId={id}
      dialogTitle={dialogTitle ?? translation.menu}
      open={open}
      onClose={(event) => {
        if (isSmallScreenRef.current) {
          close()
          triggerRef.current?.focus({ preventScroll: true })
        }
        onClose?.(event)
      }}
      omitTriggerButton
      containerPlacement={containerPlacement}
      fullscreen={fullscreen}
      minWidth={minWidth}
      maxWidth={maxWidth}
      spacing={spacing}
      scrollbarGutter={scrollbarGutter}
      scrollRef={combinedScrollRef}
      className={clsx('dnb-sidebar-menu-responsive-drawer', className)}
    />
  )
}
