import {
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import type {
  ComponentPropsWithRef,
  CSSProperties,
  ReactNode,
  RefObject,
} from 'react'
import {
  compactFirstPaintCss,
  drawerFirstPaintCss,
} from './SidebarMenuFirstPaintCss'
import Button from '../../components/button/Button'
import type { ButtonProps } from '../../components/button/Button'
import type { IconSVGProps } from '../../components/icon/Icon'
import Tooltip from '../../components/tooltip/Tooltip'
import Drawer from '../../components/drawer/Drawer'
import type { DrawerAllProps } from '../../components/drawer/Drawer'
import useMediaQuery from '../../shared/useMediaQuery'
import Context from '../../shared/Context'
import { defaultBreakpoints } from '../../shared/MediaQueryUtils'
import type { MediaQuerySizes } from '../../shared/MediaQueryUtils'
import { hamburger } from '../../icons'
import { clsx } from 'clsx'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useUniqueId from '../../shared/helpers/useId'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import { useSharedState } from '../../shared/helpers/useSharedState'
import {
  getWebStorage,
  readWebStorageJSON,
} from '../../shared/helpers/webStorage'
import type { WebStorageType } from '../../shared/helpers/webStorage'
import useTranslation from '../../shared/useTranslation'
import {
  SidebarMenuInlineToggleContext,
  SidebarMenuResponsiveAsideContext,
  SidebarMenuResponsiveInlineCompactContext,
  SidebarMenuResponsiveContext,
  sidebarMenuResponsiveStateOptions,
  useSidebarMenuResponsiveContext,
} from './SidebarMenuResponsiveContext'
import type { SidebarMenuResponsiveContextValue } from './SidebarMenuResponsiveContext'
import SidebarMenuToggle from './SidebarMenuToggle'
import { useSidebarMenuProps } from './SidebarMenuController'

// Was exported from this module in v11.15, so keep the import path working.
export { useOptionalSidebarMenuResponsive } from './SidebarMenuResponsiveContext'

const animatedHamburger = (props?: IconSVGProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 2h14"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 8h14"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M1 14h14"
    />
  </svg>
)

export type SidebarMenuResponsiveValue = Pick<
  SidebarMenuResponsiveContextValue,
  | 'close'
  | 'collapseInline'
  | 'inlineCollapsed'
  | 'isCompact'
  | 'isSmallScreen'
  | 'open'
  | 'restoreInline'
  | 'setOpen'
  | 'toggle'
>

type BreakpointLength = `${number}em` | `${number}rem`

export type SidebarMenuResponsiveProviderProps = {
  children: ReactNode
  /** Named controller shared with other applications in the same window. */
  controllerId?: string
  /** Unique scope used by first-paint CSS and Toggles outside this provider. */
  scopeId?: string
  /** Maximum viewport width at which the Drawer is used. */
  drawerAt?: MediaQuerySizes | BreakpointLength
  /** @deprecated Use drawerAt instead. */
  breakpoint?: MediaQuerySizes | BreakpointLength
  /** Maximum viewport width at which the inline menu becomes icon-only. */
  compactAt?: MediaQuerySizes | BreakpointLength
  /** Additional viewport width added to the compactAt threshold. */
  compactOffset?: BreakpointLength
  /** CSP nonce forwarded to custom first-paint breakpoint CSS. */
  styleNonce?: string
  /** Controlled Drawer state. */
  open?: boolean
  /** Initial uncontrolled Drawer state. */
  defaultOpen?: boolean
  /** Called whenever the responsive Drawer opens or closes. */
  onOpenChange?: (open: boolean) => void
  /** Controlled collapsed state of the inline navigation. */
  inlineCollapsed?: boolean
  /** Initial uncontrolled collapsed state of the inline navigation. */
  defaultInlineCollapsed?: boolean
  /** Storage key used to persist uncontrolled inline dismissal. */
  inlineCollapsedStorageKey?: string
  /** Storage used for inline dismissal. Default: session. */
  inlineCollapsedStorage?: WebStorageType
  /** Called whenever the inline navigation collapses or restores. */
  onInlineCollapsedChange?: (collapsed: boolean) => void
}
export function SidebarMenuResponsiveProvider(
  props: SidebarMenuResponsiveProviderProps
) {
  const {
    children,
    scopeId: scopeIdProp,
    drawerAt,
    breakpoint,
    compactAt,
    compactOffset = '0em',
    styleNonce,
    open,
    defaultOpen = false,
    onOpenChange,
    inlineCollapsed,
    defaultInlineCollapsed = false,
    inlineCollapsedStorageKey,
    inlineCollapsedStorage = 'session',
    onInlineCollapsedChange,
  } = useSidebarMenuProps(props.controllerId, props, 'responsive')
  const { breakpoints } = useContext(Context)
  const resolvedDrawerAt = resolveBreakpoint(
    drawerAt ?? breakpoint ?? 'medium',
    breakpoints,
    defaultBreakpoints.medium ?? '60em'
  )
  const resolvedCompactAt = compactAt
    ? addEmValues(resolveBreakpoint(compactAt, breakpoints), compactOffset)
    : undefined
  const isSmallScreen = useMediaQuery({
    when: { max: resolvedDrawerAt },
  })
  const matchesCompactAt = useMediaQuery({
    when: { max: resolvedCompactAt ?? '0em' },
    disabled: !resolvedCompactAt,
  })
  const isCompact = Boolean(
    resolvedCompactAt && matchesCompactAt && !isSmallScreen
  )
  const hasCompact = Boolean(resolvedCompactAt)
  const generatedScopeId = `sidebar-menu-${useId().replace(/:/g, '')}`
  const scopeId = scopeIdProp ?? generatedScopeId
  const [isHydrated, setHydrated] = useState(false)
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const [internalInlineCollapsed, setInternalInlineCollapsed] = useState(
    defaultInlineCollapsed
  )
  const isSmallScreenRef = useRef(isSmallScreen)
  const triggerRef = useRef<HTMLElement>(null)
  const onOpenChangeRef = useRef(onOpenChange)
  const onInlineCollapsedChangeRef = useRef(onInlineCollapsedChange)
  const inlineResetRef = useRef<() => void>(undefined)
  const [inlineIds, setInlineIds] = useState<string[]>([])
  const inlineIdCounts = useRef(new Map<string, number>())
  const [drawerId, setDrawerId] = useState<string>()
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
  const persistedInlineStorageKey =
    inlineCollapsed === undefined ? inlineCollapsedStorageKey : undefined
  const inlineStorageId = persistedInlineStorageKey
    ? `${inlineCollapsedStorage}:${persistedInlineStorageKey}`
    : undefined
  const loadedInlineStorageIdRef = useRef<string>(undefined)

  useIsomorphicLayoutEffect(() => {
    if (!inlineStorageId) {
      loadedInlineStorageIdRef.current = undefined
      return
    }
    if (loadedInlineStorageIdRef.current === inlineStorageId) {
      return
    }
    const stored = readWebStorageJSON(
      inlineCollapsedStorage,
      persistedInlineStorageKey
    )
    loadedInlineStorageIdRef.current = inlineStorageId
    setInternalInlineCollapsed(
      typeof stored === 'boolean' ? stored : defaultInlineCollapsed
    )
  }, [
    defaultInlineCollapsed,
    inlineCollapsedStorage,
    inlineStorageId,
    persistedInlineStorageKey,
  ])

  useIsomorphicLayoutEffect(() => {
    document
      .querySelectorAll('[data-sidebar-menu-inline-pre-hydration]')
      .forEach((element) => {
        if (
          element.getAttribute(
            'data-sidebar-menu-inline-pre-hydration'
          ) === persistedInlineStorageKey
        ) {
          element.remove()
        }
      })
  }, [persistedInlineStorageKey])

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
        if (inlineCollapsedStorageKey) {
          try {
            getWebStorage(inlineCollapsedStorage)?.setItem(
              inlineCollapsedStorageKey,
              JSON.stringify(collapsed)
            )
          } catch {
            // Storage can become unavailable after it was resolved.
          }
        }
      }
      onInlineCollapsedChangeRef.current?.(collapsed)
    },
    [inlineCollapsed, inlineCollapsedStorage, inlineCollapsedStorageKey]
  )
  const collapseInline = useCallback(
    () => setInlineCollapsed(true),
    [setInlineCollapsed]
  )
  const registerInlineReset = useCallback((reset: () => void) => {
    inlineResetRef.current = reset
    return () => {
      if (inlineResetRef.current === reset) {
        inlineResetRef.current = undefined
      }
    }
  }, [])
  const registerInlineId = useCallback((id: string) => {
    // Inline owners can briefly overlap when an aside moves between them.
    const counts = inlineIdCounts.current
    const count = counts.get(id) ?? 0
    counts.set(id, count + 1)
    if (count === 0) {
      setInlineIds((current) => [...current, id])
    }
    return () => {
      const remaining = (counts.get(id) ?? 1) - 1
      if (remaining > 0) {
        counts.set(id, remaining)
      } else {
        counts.delete(id)
        setInlineIds((current) => current.filter((value) => value !== id))
      }
    }
  }, [])
  const registerDrawerId = useCallback((id: string) => {
    setDrawerId(id)
    return () =>
      setDrawerId((current) => (current === id ? undefined : current))
  }, [])
  const restoreInline = useCallback(() => {
    inlineResetRef.current?.()
    setInlineCollapsed(false)
  }, [setInlineCollapsed])
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
      isCompact,
      hasCompact,
      inlineCollapsed: resolvedInlineCollapsed,
      inlineId: inlineIds[0],
      drawerId,
      isSmallScreen,
      isSmallScreenRef,
      open: resolvedOpen,
      openRef,
      registerInlineReset,
      registerInlineId,
      registerDrawerId,
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
      isCompact,
      hasCompact,
      resolvedInlineCollapsed,
      inlineIds,
      drawerId,
      isSmallScreen,
      resolvedOpen,
      registerInlineReset,
      registerInlineId,
      registerDrawerId,
      setDrawerScrollElement,
      setOpen,
      toggle,
      restoreInline,
      scopeId,
    ]
  )

  const { update } = useSharedState<SidebarMenuResponsiveContextValue>(
    typeof window === 'undefined' ? undefined : scopeIdProp,
    undefined,
    null,
    sidebarMenuResponsiveStateOptions
  )

  useIsomorphicLayoutEffect(() => {
    update(value)
  }, [update, value])

  useIsomorphicLayoutEffect(() => () => update(undefined), [update])

  const firstPaintCss = useMemo(
    () => getFirstPaintCss(scopeId, resolvedDrawerAt, resolvedCompactAt),
    [scopeId, resolvedDrawerAt, resolvedCompactAt]
  )

  return (
    <SidebarMenuResponsiveContext value={value}>
      <div
        className="dnb-sidebar-menu-responsive-provider"
        data-sidebar-menu-responsive-provider={scopeId}
        data-inline-collapsed-storage-key={persistedInlineStorageKey}
        data-inline-collapsed-storage={
          persistedInlineStorageKey ? inlineCollapsedStorage : undefined
        }
      >
        {firstPaintCss && (
          <style nonce={styleNonce}>{firstPaintCss}</style>
        )}
        {children}
      </div>
    </SidebarMenuResponsiveContext>
  )
}

export function useSidebarMenuResponsive(): SidebarMenuResponsiveValue {
  const context = useSidebarMenuResponsiveContext()
  const {
    close,
    collapseInline,
    inlineCollapsed,
    isCompact,
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
      isCompact,
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
      isCompact,
      isSmallScreen,
      open,
      restoreInline,
      setOpen,
      toggle,
    ]
  )
}

export type SidebarMenuResponsiveTriggerProps = Omit<
  ButtonProps,
  'aria-expanded' | 'aria-haspopup'
> & {
  /** Overrides the aria-controls Drawer id. Defaults to the ResponsiveDrawer id. */
  controls?: string
  /** Id of the inline navigation restored by this button. */
  inlineControls?: string
}

export function SidebarMenuResponsiveTrigger({
  controls,
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
    inlineId,
    drawerId,
  } = useSidebarMenuResponsiveContext()
  const translation = useTranslation().SidebarMenu
  const combinedRef = useCombinedRef(ref, triggerRef)
  const resolvedControls =
    controls ?? drawerId ?? 'sidebar-menu-responsive-drawer'
  const resolvedInlineControls = inlineControls ?? inlineId

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
      data-sidebar-menu-responsive-animate-hamburger={
        isHydrated &&
        !isSmallScreen &&
        inlineCollapsed &&
        (icon === undefined || icon === null)
          ? true
          : undefined
      }
      data-sidebar-menu-responsive-scope={scopeId}
      icon={
        icon ??
        (!isSmallScreen && inlineCollapsed ? animatedHamburger : hamburger)
      }
      variant={variant}
      title={
        title ?? (open ? translation.closeMenu : translation.openMenu)
      }
      aria-haspopup={!isHydrated || isSmallScreen ? 'dialog' : undefined}
      aria-controls={
        !isHydrated || isSmallScreen
          ? resolvedControls
          : resolvedInlineControls
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

export type SidebarMenuResponsiveInlineProps = Omit<
  ComponentPropsWithRef<'div'>,
  'children'
> & {
  children: ReactNode
  /** Width of the full inline menu. Default: 18rem. */
  expandedWidth?: CSSProperties['width']
  /** Width reserved while the inline menu is compact. Minimum and default: 4rem. */
  compactWidth?: CSSProperties['width']
  /** Show an embedded toggle at full width. Compact mode always includes its toggle. */
  showToggle?: boolean
}

// The section list is portaled, so it is outside the inline menu in the DOM
function isInsideInlineMenu(
  inline: HTMLElement | null,
  target: EventTarget | null
) {
  return (
    target instanceof Element &&
    (Boolean(inline?.contains(target)) ||
      Boolean(target.closest('.dnb-sidebar-menu__sections-portal')))
  )
}

export function SidebarMenuResponsiveInline({
  children,
  expandedWidth = '18rem',
  compactWidth = '4rem',
  showToggle = false,
  ref,
  className,
  style,
  onClick,
  onClickCapture,
  onFocusCapture,
  onBlurCapture,
  onKeyDownCapture,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  ...props
}: SidebarMenuResponsiveInlineProps) {
  const {
    hasCompact,
    inlineCollapsed,
    isCompact,
    isHydrated,
    isSmallScreen,
    registerInlineId,
    scopeId,
    collapseInline,
    triggerRef,
  } = useSidebarMenuResponsiveContext()
  const isAside = useContext(SidebarMenuResponsiveAsideContext)
  const hasSurface = isAside || hasCompact || showToggle
  const inlineRef = useRef<HTMLDivElement>(null)
  const combinedRef = useCombinedRef(ref, inlineRef)
  const [compactExpanded, setCompactExpanded] = useState(false)
  const [compactDismissed, setCompactDismissed] = useState(false)
  const [compactHovered, setCompactHovered] = useState(false)
  const [compactScrolled, setCompactScrolled] = useState(false)
  const [compactOpening, setCompactOpening] = useState(false)
  const [compactClosing, setCompactClosing] = useState(false)
  const [transitionsReady, setTransitionsReady] = useState(false)
  const compactHoveredRef = useRef(false)
  const compactToggleRef = useRef<HTMLElement>(null)
  const [tooltipTarget, setTooltipTarget] = useState<HTMLElement>()
  const [tooltipLabel, setTooltipLabel] = useState('')
  const compactOpen =
    !inlineCollapsed &&
    (compactExpanded || (compactHovered && !compactDismissed))
  const contentId = `responsive-inline-content-${useUniqueId()}`
  const translation = useTranslation().SidebarMenu
  const compactOpenRef = useRef(compactOpen)

  useIsomorphicLayoutEffect(() => {
    const inline = inlineRef.current
    if (!inline || !isHydrated || isSmallScreen) {
      return undefined
    }

    const provider = inline.closest(
      '.dnb-sidebar-menu-responsive-provider'
    )
    const registrations = new Map<string, () => void>()
    const updateIds = () => {
      const ids = new Set(
        Array.from(inline.querySelectorAll<HTMLElement>('aside[id]'))
          .filter(
            (aside) =>
              aside.closest('.dnb-sidebar-menu-responsive-inline') ===
                inline &&
              aside.closest('.dnb-sidebar-menu-responsive-provider') ===
                provider
          )
          .map((aside) => aside.id)
          .filter(Boolean)
      )
      registrations.forEach((unregister, id) => {
        if (!ids.has(id)) {
          unregister()
          registrations.delete(id)
        }
      })
      ids.forEach((id) => {
        if (!registrations.has(id)) {
          registrations.set(id, registerInlineId(id))
        }
      })
    }
    updateIds()

    // A custom surface can change its aside from a child's local state.
    const observer =
      typeof MutationObserver === 'undefined'
        ? undefined
        : new MutationObserver(updateIds)
    observer?.observe(inline, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['id'],
    })
    return () => {
      observer?.disconnect()
      registrations.forEach((unregister) => unregister())
    }
  }, [isHydrated, isSmallScreen, registerInlineId])

  useIsomorphicLayoutEffect(() => {
    const wasOpen = compactOpenRef.current
    compactOpenRef.current = compactOpen
    if (compactOpen === wasOpen) {
      return undefined
    }

    setCompactOpening(compactOpen)
    setCompactClosing(!compactOpen)
    const timeout = setTimeout(() => {
      setCompactOpening(false)
      setCompactClosing(false)
    }, 240)
    return () => clearTimeout(timeout)
  }, [compactOpen])

  useEffect(() => {
    if (!isHydrated) {
      return undefined
    }
    const frame = requestAnimationFrame(() => setTransitionsReady(true))
    return () => cancelAnimationFrame(frame)
  }, [isHydrated])

  useEffect(() => {
    if (!isCompact || inlineCollapsed) {
      compactHoveredRef.current = false
      setCompactExpanded(false)
      setCompactDismissed(false)
      setCompactHovered(false)
      setCompactScrolled(false)
      setCompactClosing(false)
      setTooltipTarget(undefined)
    }
  }, [isCompact, inlineCollapsed])

  useIsomorphicLayoutEffect(() => {
    if (
      inlineCollapsed &&
      inlineRef.current?.contains(document.activeElement)
    ) {
      triggerRef.current?.focus({ preventScroll: true })
    }
  }, [inlineCollapsed, triggerRef])

  useIsomorphicLayoutEffect(() => {
    if (compactOpen) {
      return
    }

    const sectionTrigger = inlineRef.current?.querySelector<HTMLElement>(
      '.dnb-sidebar-menu__sections .dnb-dropdown__trigger[aria-expanded="true"]'
    )
    sectionTrigger?.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    )
  }, [compactOpen])

  useEffect(() => {
    if (!isCompact) {
      return undefined
    }

    const scrollView = inlineRef.current?.querySelector<HTMLElement>(
      '.dnb-sidebar-menu-responsive-aside__scroll-view'
    )
    if (!scrollView) {
      return undefined
    }

    const handleScroll = () => setCompactScrolled(scrollView.scrollTop > 0)
    handleScroll()
    scrollView.addEventListener('scroll', handleScroll, { passive: true })
    return () => scrollView.removeEventListener('scroll', handleScroll)
  }, [isCompact])

  useEffect(() => {
    if (!compactExpanded) {
      return undefined
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!isInsideInlineMenu(inlineRef.current, event.target)) {
        setCompactExpanded(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [compactExpanded])

  useEffect(() => {
    if (!isCompact || !compactOpen) {
      return undefined
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setCompactExpanded(false)
        setCompactDismissed(true)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [compactOpen, isCompact])

  if (isHydrated && isSmallScreen) {
    return null
  }

  const toggleInline = () => {
    setTooltipTarget(undefined)
    if (!isCompact) {
      collapseInline()
      return
    }
    const wasOpen =
      compactExpanded || (compactHoveredRef.current && !compactDismissed)
    setCompactExpanded(!wasOpen)
    setCompactDismissed(wasOpen)
  }

  const responsiveChildren = (
    <SidebarMenuResponsiveInlineCompactContext value={isCompact}>
      {children}
    </SidebarMenuResponsiveInlineCompactContext>
  )

  return (
    <div
      {...props}
      ref={combinedRef}
      className={clsx(
        'dnb-sidebar-menu-responsive-inline',
        compactOpen && 'dnb-sidebar-menu-responsive-inline--expanded',
        compactClosing && 'dnb-sidebar-menu-responsive-inline--closing',
        transitionsReady &&
          'dnb-sidebar-menu-responsive-inline--transitions-ready',
        className
      )}
      data-sidebar-menu-responsive-visible={
        isHydrated ? String(!isSmallScreen && !inlineCollapsed) : undefined
      }
      data-sidebar-menu-responsive-compact={
        isHydrated ? String(isCompact) : undefined
      }
      data-sidebar-menu-responsive-has-compact={hasCompact || undefined}
      data-sidebar-menu-responsive-surface={hasSurface || undefined}
      data-sidebar-menu-responsive-expanded={compactOpen || undefined}
      data-sidebar-menu-responsive-scope={scopeId}
      inert={isHydrated && inlineCollapsed}
      aria-hidden={isHydrated && inlineCollapsed ? 'true' : undefined}
      onClickCapture={(event) => {
        onClickCapture?.(event)
        if (!isCompact || event.defaultPrevented) {
          return
        }

        if (
          !compactOpen &&
          (event.target as Element).closest(
            '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
          )
        ) {
          setTooltipTarget(undefined)
          setCompactExpanded(true)
          setCompactDismissed(false)
        }

        const accordion = (event.target as Element).closest<HTMLElement>(
          '.dnb-sidebar-menu__accordion__trigger'
        )
        const isAccordionLink = accordion?.classList.contains(
          'dnb-sidebar-menu__accordion__link'
        )
        if (accordion && !isAccordionLink && !compactOpen) {
          if (accordion.getAttribute('aria-expanded') === 'true') {
            event.preventDefault()
            event.stopPropagation()
          }
          setTooltipTarget(undefined)
          setCompactExpanded(true)
          setCompactDismissed(false)
        }
      }}
      onClick={(event) => {
        onClick?.(event)
        if (!isCompact) {
          return
        }

        const action = (event.target as Element).closest<HTMLElement>(
          '.dnb-sidebar-menu__item__action'
        )
        const isAccordionTrigger = action?.classList.contains(
          'dnb-sidebar-menu__accordion__trigger'
        )
        const isDisabled =
          action?.matches(':disabled, [aria-disabled="true"]') ?? false
        if (action && !isAccordionTrigger && !isDisabled) {
          setTooltipTarget(undefined)
          setCompactExpanded(false)
          setCompactDismissed(true)
        }
      }}
      onFocusCapture={(event) => {
        onFocusCapture?.(event)
        if (
          isCompact &&
          document.documentElement.dataset.whatinput === 'keyboard' &&
          (event.target as Element).closest(
            '.dnb-sidebar-menu__item__action, .dnb-sidebar-menu__sections .dnb-dropdown__trigger'
          )
        ) {
          setCompactExpanded(true)
          setCompactDismissed(false)
        }
      }}
      onBlurCapture={(event) => {
        onBlurCapture?.(event)
        if (
          !isInsideInlineMenu(event.currentTarget, event.relatedTarget)
        ) {
          setCompactExpanded(false)
        }
      }}
      onKeyDownCapture={(event) => {
        onKeyDownCapture?.(event)
        if (isCompact && event.key === 'Escape') {
          setCompactExpanded(false)
          setCompactDismissed(true)
        }

        if (
          isCompact &&
          !compactOpen &&
          ['Enter', ' ', 'ArrowDown', 'ArrowUp'].includes(event.key) &&
          (event.target as Element).closest(
            '.dnb-sidebar-menu__sections .dnb-dropdown__trigger'
          )
        ) {
          setTooltipTarget(undefined)
          setCompactExpanded(true)
          setCompactDismissed(false)
        }
      }}
      onPointerEnter={(event) => {
        onPointerEnter?.(event)
        if (hasCompact && event.pointerType !== 'touch') {
          compactHoveredRef.current = true
          setCompactHovered(true)
        }
      }}
      onPointerLeave={(event) => {
        onPointerLeave?.(event)
        if (!hasCompact) {
          return
        }
        compactHoveredRef.current = false
        setCompactHovered(false)
        setCompactDismissed(false)
        setTooltipTarget(undefined)
      }}
      onPointerMove={(event) => {
        onPointerMove?.(event)
        if (!isCompact || compactOpen || event.pointerType === 'touch') {
          return
        }

        const action = (event.target as Element).closest<HTMLElement>(
          '.dnb-sidebar-menu__item__action'
        )
        if (action) {
          if (tooltipTarget !== action) {
            setTooltipTarget(action)
            setTooltipLabel(getActionLabel(action))
          }
        } else {
          setTooltipTarget(undefined)
        }
      }}
      style={
        {
          ...style,
          '--sidebar-menu-default-expanded-width':
            toCssLength(expandedWidth),
          '--sidebar-menu-compact-width': `max(4rem, ${toCssLength(
            compactWidth
          )})`,
          '--sidebar-menu-opacity': compactOpen ? 1 : 0.55,
          '--sidebar-menu-item-white-space':
            compactOpen && !compactOpening ? 'normal' : 'nowrap',
        } as CSSProperties
      }
    >
      {hasSurface ? (
        <SidebarMenuInlineToggleContext
          value={{
            open: isCompact ? compactOpen : !inlineCollapsed,
            controls: contentId,
            toggle: toggleInline,
          }}
        >
          <div className="dnb-sidebar-menu-responsive-inline__content">
            {(hasCompact || showToggle) && (
              <div
                className="dnb-sidebar-menu-responsive-inline__toggle-island"
                data-sidebar-menu-responsive-toggle-full-width={
                  showToggle || undefined
                }
                style={{
                  boxShadow: compactScrolled
                    ? 'var(--shadow-sharp)'
                    : 'none',
                }}
              >
                <SidebarMenuToggle
                  ref={compactToggleRef}
                  className="dnb-sidebar-menu-responsive-inline__toggle"
                />
                {isCompact && !compactOpen && compactToggleRef.current && (
                  <Tooltip
                    targetElement={compactToggleRef.current}
                    tooltip={translation.openMenu}
                    placement="right"
                    triggerOffset={8}
                    omitDescribedBy
                  />
                )}
              </div>
            )}
            <div
              id={contentId}
              className="dnb-sidebar-menu-responsive-inline__body"
            >
              {responsiveChildren}
            </div>
            {isCompact &&
              tooltipTarget &&
              tooltipLabel &&
              !compactOpen && (
                <Tooltip
                  open
                  targetElement={tooltipTarget}
                  tooltip={tooltipLabel}
                  placement="right"
                  triggerOffset={8}
                  omitDescribedBy
                />
              )}
          </div>
        </SidebarMenuInlineToggleContext>
      ) : (
        responsiveChildren
      )}
    </div>
  )
}

function getActionLabel(action: HTMLElement) {
  const ariaLabel = action.getAttribute('aria-label')
  if (ariaLabel) {
    return ariaLabel
  }

  const label = action.querySelector<HTMLElement>(
    '.dnb-sidebar-menu__item__text'
  )
  const clone = label?.cloneNode(true) as HTMLElement | undefined
  clone?.querySelectorAll('.dnb-sr-only').forEach((element) => {
    element.remove()
  })
  return clone?.textContent?.trim() ?? ''
}

function resolveBreakpoint(
  value: MediaQuerySizes | BreakpointLength,
  breakpoints?: Record<string, string>,
  fallback = defaultBreakpoints.large ?? '72em'
) {
  const configured = String(
    breakpoints?.[value] ??
      defaultBreakpoints[value as MediaQuerySizes] ??
      value
  )
  // In media queries, rem and em both use the initial font size.
  return isBreakpointLength(configured)
    ? configured.replace('rem', 'em')
    : fallback
}

function toCssLength(value: CSSProperties['width']) {
  return typeof value === 'number' ? `${value}px` : value
}

function addEmValues(first: string, second: string) {
  if (!isBreakpointLength(first) || !isBreakpointLength(second)) {
    return first
  }

  return `${Number.parseFloat(first) + Number.parseFloat(second)}em`
}

function isBreakpointLength(value: string) {
  // eslint-disable-next-line security/detect-unsafe-regex -- the optional group does not repeat
  return /^\d+(?:\.\d+)?r?em$/.test(value)
}

// Keeps a custom scopeId inside the quoted attribute selector
function escapeCssString(value: string) {
  return String(value).replace(
    /["\\\n\r\f]/g,
    (char) => `\\${char.charCodeAt(0).toString(16)} `
  )
}

function getFirstPaintCss(
  scopeId: string,
  drawerAt: string,
  compactAt?: string
) {
  const em = Number.parseFloat(drawerAt)
  if (!isBreakpointLength(drawerAt) || !Number.isFinite(em)) {
    return undefined
  }

  const values = {
    '{{scope}}': escapeCssString(scopeId),
    __DNB_SIDEBAR_DRAWER__: drawerAt,
    __DNB_SIDEBAR_MIN__: Number((em + 0.00625).toFixed(5)) + 'em',
    __DNB_SIDEBAR_MAX__: compactAt,
  }
  const css = [
    drawerAt !== defaultBreakpoints.medium ? drawerFirstPaintCss : '',
    compactAt && isBreakpointLength(compactAt) ? compactFirstPaintCss : '',
  ].join('')

  return (
    css.replace(
      /{{scope}}|__DNB_SIDEBAR_(DRAWER|MIN|MAX)__/g,
      (key) => values[key]
    ) || undefined
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
  minWidth = 'min(90vw, 24rem)',
  maxWidth = 'min(90vw, 24rem)',
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
    registerDrawerId,
    setDrawerScrollElement,
    triggerRef,
  } = useSidebarMenuResponsiveContext()

  useIsomorphicLayoutEffect(
    () => registerDrawerId(id),
    [id, registerDrawerId]
  )

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
      restoreFocusTo={
        props.restoreFocusTo ??
        (() => (isSmallScreenRef.current ? triggerRef.current : null))
      }
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
