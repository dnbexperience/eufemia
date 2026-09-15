import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
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
import Context from '../../shared/Context'
import { defaultBreakpoints } from '../../shared/MediaQueryUtils'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'
import { hamburger } from '../../icons'
import { clsx } from 'clsx'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from '../../shared/useTranslation'

type SidebarMenuResponsiveContextValue = {
  close: () => void
  drawerScrollElement: HTMLElement | null
  drawerOpeningRef: RefObject<boolean>
  setDrawerScrollElement: (element: HTMLElement | null) => void
  isHydrated: boolean
  inlineCollapsed: boolean
  isSmallScreen: boolean
  open: boolean
  openRef: RefObject<boolean>
  setOpen: (open: boolean) => void
  toggle: () => void
  collapseInline: () => void
  restoreInline: () => void
  triggerRef: RefObject<HTMLElement | null>
  isSmallScreenRef: RefObject<boolean>
  scopeId: string
}

const ResponsiveContext = createContext<
  SidebarMenuResponsiveContextValue | undefined
>(undefined)

export type SidebarMenuResponsiveValue = Pick<
  SidebarMenuResponsiveContextValue,
  | 'close'
  | 'collapseInline'
  | 'inlineCollapsed'
  | 'isSmallScreen'
  | 'open'
  | 'restoreInline'
  | 'setOpen'
  | 'toggle'
>

export type SidebarMenuResponsiveProviderProps = {
  children: ReactNode
  /** Maximum viewport width at which the mobile navigation is used. */
  breakpoint?: MediaQuerySizes | `${number}em`
  /** CSP nonce forwarded to custom first-paint breakpoint CSS. */
  styleNonce?: string
  /** Controlled Drawer state. */
  open?: boolean
  /** Initial uncontrolled Drawer state. */
  defaultOpen?: boolean
  /** Called whenever the responsive Drawer opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Controlled desktop inline navigation state. */
  inlineCollapsed?: boolean
  /** Initial uncontrolled desktop inline navigation state. */
  defaultInlineCollapsed?: boolean
  /** Called whenever the desktop inline navigation collapses or restores. */
  onInlineCollapsedChange?: (collapsed: boolean) => void
}

export function SidebarMenuResponsiveProvider({
  children,
  breakpoint = 'medium',
  styleNonce,
  open,
  defaultOpen = false,
  onOpenChange,
  inlineCollapsed,
  defaultInlineCollapsed = false,
  onInlineCollapsedChange,
}: SidebarMenuResponsiveProviderProps) {
  const { breakpoints } = useContext(Context)
  const configuredBreakpoint =
    breakpoints?.[breakpoint] ??
    defaultBreakpoints[breakpoint as MediaQuerySizes] ??
    breakpoint
  const resolvedBreakpoint = /^\d+(?:\.\d+)?em$/.test(
    String(configuredBreakpoint)
  )
    ? String(configuredBreakpoint)
    : (defaultBreakpoints.medium ?? '60em')
  const isSmallScreen = useMediaQuery({
    when: { max: resolvedBreakpoint },
  })
  const scopeId = `sidebar-menu-${useId().replace(/:/g, '')}`
  const [isHydrated, setHydrated] = useState(false)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [internalInlineCollapsed, setInternalInlineCollapsed] = useState(
    defaultInlineCollapsed
  )
  const isSmallScreenRef = useRef(isSmallScreen)
  const triggerRef = useRef<HTMLElement>(null)
  const onOpenChangeRef = useRef(onOpenChange)
  const onInlineCollapsedChangeRef = useRef(onInlineCollapsedChange)
  const [drawerScrollElement, setDrawerScrollElementState] =
    useState<HTMLElement | null>(null)
  const setDrawerScrollElement = useCallback(
    (element: HTMLElement | null) => setDrawerScrollElementState(element),
    []
  )
  const resolvedOpen = open ?? internalOpen
  const openRef = useRef(resolvedOpen)
  const drawerOpeningRef = useRef(false)
  const resolvedInlineCollapsed =
    inlineCollapsed ?? internalInlineCollapsed

  useIsomorphicLayoutEffect(() => {
    isSmallScreenRef.current = isSmallScreen
  }, [isSmallScreen])

  useIsomorphicLayoutEffect(() => {
    onOpenChangeRef.current = onOpenChange
  }, [onOpenChange])

  useIsomorphicLayoutEffect(() => {
    openRef.current = resolvedOpen
  }, [resolvedOpen])

  useIsomorphicLayoutEffect(() => {
    onInlineCollapsedChangeRef.current = onInlineCollapsedChange
  }, [onInlineCollapsedChange])

  useIsomorphicLayoutEffect(() => {
    setHydrated(true)
  }, [])

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      openRef.current = nextOpen
      drawerOpeningRef.current = nextOpen
      if (open === undefined) {
        setInternalOpen(nextOpen)
      }
      onOpenChangeRef.current?.(nextOpen)
    },
    [open]
  )
  const close = useCallback(() => setOpen(false), [setOpen])
  const setInlineCollapsed = useCallback(
    (collapsed: boolean) => {
      if (inlineCollapsed === undefined) {
        setInternalInlineCollapsed(collapsed)
      }
      onInlineCollapsedChangeRef.current?.(collapsed)
    },
    [inlineCollapsed]
  )
  const collapseInline = useCallback(
    () => setInlineCollapsed(true),
    [setInlineCollapsed]
  )
  const restoreInline = useCallback(
    () => setInlineCollapsed(false),
    [setInlineCollapsed]
  )
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
      collapseInline,
      drawerScrollElement,
      drawerOpeningRef,
      isHydrated,
      inlineCollapsed: resolvedInlineCollapsed,
      isSmallScreen,
      isSmallScreenRef,
      open: resolvedOpen,
      openRef,
      setOpen,
      setDrawerScrollElement,
      toggle,
      restoreInline,
      scopeId,
      triggerRef,
    }),
    [
      close,
      collapseInline,
      drawerScrollElement,
      isHydrated,
      resolvedInlineCollapsed,
      isSmallScreen,
      resolvedOpen,
      setDrawerScrollElement,
      setOpen,
      toggle,
      restoreInline,
      scopeId,
    ]
  )

  const firstPaintCss = getFirstPaintCss(scopeId, resolvedBreakpoint)

  return (
    <ResponsiveContext value={value}>
      {firstPaintCss && <style nonce={styleNonce}>{firstPaintCss}</style>}
      {children}
    </ResponsiveContext>
  )
}

export function useSidebarMenuResponsive(): SidebarMenuResponsiveValue {
  const context = useResponsiveContext()
  const {
    close,
    collapseInline,
    inlineCollapsed,
    isSmallScreen,
    open,
    restoreInline,
    setOpen,
    toggle,
  } = context

  return useMemo(
    () => ({
      close,
      collapseInline,
      inlineCollapsed,
      isSmallScreen,
      open,
      restoreInline,
      setOpen,
      toggle,
    }),
    [
      close,
      collapseInline,
      inlineCollapsed,
      isSmallScreen,
      open,
      restoreInline,
      setOpen,
      toggle,
    ]
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
  /** Id of the desktop inline navigation restored by this button. */
  inlineControls?: string
}

export function SidebarMenuResponsiveTrigger({
  controls = 'sidebar-menu-responsive-drawer',
  inlineControls,
  icon,
  ref,
  variant = 'tertiary',
  title,
  onClick,
  ...props
}: SidebarMenuResponsiveTriggerProps) {
  const {
    inlineCollapsed,
    isHydrated,
    isSmallScreen,
    open,
    restoreInline,
    toggle,
    triggerRef,
    scopeId,
  } = useResponsiveContext()
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
        isHydrated ? String(isSmallScreen || inlineCollapsed) : undefined
      }
      data-sidebar-menu-responsive-scope={scopeId}
      icon={icon ?? hamburger}
      variant={variant}
      title={
        title ?? (open ? translation.closeMenu : translation.openMenu)
      }
      aria-haspopup={!isHydrated || isSmallScreen ? 'dialog' : undefined}
      aria-controls={
        !isHydrated || isSmallScreen
          ? controls
          : (inlineControls ?? controls)
      }
      aria-expanded={
        !isHydrated || isSmallScreen ? open : !inlineCollapsed
      }
      onClick={(event) => {
        onClick?.(event)
        if (!event.event?.defaultPrevented) {
          if (isSmallScreen) {
            toggle()
          } else {
            restoreInline()
          }
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
  const { inlineCollapsed, isHydrated, isSmallScreen, scopeId } =
    useResponsiveContext()
  if (isHydrated && isSmallScreen) {
    return null
  }

  return (
    <div
      className="dnb-sidebar-menu-responsive-inline"
      data-sidebar-menu-responsive-visible={
        isHydrated ? String(!isSmallScreen && !inlineCollapsed) : undefined
      }
      data-sidebar-menu-responsive-scope={scopeId}
      inert={isHydrated && inlineCollapsed}
      aria-hidden={isHydrated && inlineCollapsed ? 'true' : undefined}
    >
      {children}
    </div>
  )
}

function getFirstPaintCss(scopeId: string, breakpoint: string) {
  if (breakpoint === defaultBreakpoints.medium) {
    return undefined
  }

  const em = Number.parseFloat(breakpoint)
  if (!/^\d+(?:\.\d+)?em$/.test(breakpoint) || !Number.isFinite(em)) {
    return undefined
  }

  const minWidth = `${Number((em + 0.00625).toFixed(5))}em`
  const scope = `[data-sidebar-menu-responsive-scope="${scopeId}"]`
  const unresolved = ':not([data-sidebar-menu-responsive-visible])'

  return `@media (max-width: ${breakpoint}){${scope}.dnb-sidebar-menu-responsive-trigger${unresolved}{display:inline-flex}${scope}.dnb-sidebar-menu-responsive-inline${unresolved}{display:none}}@media (min-width: ${minWidth}){${scope}.dnb-sidebar-menu-responsive-trigger${unresolved}{display:none}${scope}.dnb-sidebar-menu-responsive-inline${unresolved}{display:contents}}`
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
  onOpen,
  onClose,
  ...props
}: SidebarMenuResponsiveDrawerProps) {
  const translation = useTranslation().SidebarMenu
  const {
    close,
    drawerOpeningRef,
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
      onOpen={(event) => {
        drawerOpeningRef.current = false
        onOpen?.(event)
      }}
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
