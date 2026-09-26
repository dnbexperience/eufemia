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
import { hamburger, sidebar } from '../../icons'
import { clsx } from 'clsx'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from '../../shared/useTranslation'
import {
  SidebarMenuResponsiveInlineCompactContext,
  SidebarMenuResponsiveContext,
  useSidebarMenuResponsiveContext,
} from './SidebarMenuResponsiveContext'
import type { SidebarMenuResponsiveContextValue } from './SidebarMenuResponsiveContext'

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

export type SidebarMenuResponsiveProviderProps = {
  children: ReactNode
  /** Stable scope used by generated first-paint CSS. */
  scopeId?: string
  /** Maximum viewport width at which the mobile Drawer is used. */
  drawerAt?: MediaQuerySizes | `${number}em`
  /** @deprecated Use drawerAt instead. */
  breakpoint?: MediaQuerySizes | `${number}em`
  /** Maximum available content width at which the inline menu becomes icon-only. */
  compactAt?: MediaQuerySizes | `${number}em`
  /** Additional viewport width added to the compactAt threshold. */
  compactOffset?: `${number}em`
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
  onInlineCollapsedChange,
}: SidebarMenuResponsiveProviderProps) {
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
  const registerInlineReset = useCallback((reset: () => void) => {
    inlineResetRef.current = reset
    return () => {
      if (inlineResetRef.current === reset) {
        inlineResetRef.current = undefined
      }
    }
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
      isSmallScreen,
      isSmallScreenRef,
      open: resolvedOpen,
      openRef,
      registerInlineReset,
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
      isSmallScreen,
      resolvedOpen,
      registerInlineReset,
      setDrawerScrollElement,
      setOpen,
      toggle,
      restoreInline,
      scopeId,
    ]
  )

  const firstPaintCss = getFirstPaintCss(
    scopeId,
    resolvedDrawerAt,
    resolvedCompactAt
  )

  return (
    <SidebarMenuResponsiveContext value={value}>
      <div
        className="dnb-sidebar-menu-responsive-provider"
        data-sidebar-menu-responsive-provider={scopeId}
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
  } = useSidebarMenuResponsiveContext()
  const translation = useTranslation().SidebarMenu
  const combinedRef = useCombinedRef(ref, triggerRef)
  const resolvedInlineControls =
    inlineControls ?? `${scopeId}-responsive-aside`

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
        !isHydrated || isSmallScreen ? controls : resolvedInlineControls
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
}

export function SidebarMenuResponsiveInline({
  children,
  expandedWidth = '18rem',
  compactWidth = '4rem',
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
    scopeId,
  } = useSidebarMenuResponsiveContext()
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
    compactExpanded || (compactHovered && !compactDismissed)
  const contentId = `${scopeId}-responsive-inline-content`
  const translation = useTranslation().SidebarMenu
  const compactOpenRef = useRef(compactOpen)

  useEffect(() => {
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
    if (!isCompact) {
      setCompactExpanded(false)
      setCompactDismissed(false)
      setCompactHovered(false)
      setCompactScrolled(false)
      setCompactClosing(false)
      setTooltipTarget(undefined)
    }
  }, [isCompact])

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
      if (!inlineRef.current?.contains(event.target as Node)) {
        setCompactExpanded(false)
      }
    }
    document.addEventListener('pointerdown', handlePointerDown, true)
    return () =>
      document.removeEventListener('pointerdown', handlePointerDown, true)
  }, [compactExpanded])

  if (isHydrated && isSmallScreen) {
    return null
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
            '.dnb-sidebar-menu__item__action'
          )
        ) {
          setCompactExpanded(true)
          setCompactDismissed(false)
        }
      }}
      onBlurCapture={(event) => {
        onBlurCapture?.(event)
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setCompactExpanded(false)
        }
      }}
      onKeyDownCapture={(event) => {
        onKeyDownCapture?.(event)
        if (isCompact && event.key === 'Escape') {
          setCompactExpanded(false)
          setCompactDismissed(true)
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
      {hasCompact ? (
        <div className="dnb-sidebar-menu-responsive-inline__content">
          <div
            className="dnb-sidebar-menu-responsive-inline__toggle-island"
            style={{
              boxShadow: compactScrolled ? 'var(--shadow-sharp)' : 'none',
            }}
          >
            <Button
              ref={compactToggleRef}
              className="dnb-sidebar-menu-responsive-inline__toggle"
              icon={sidebar}
              variant="tertiary"
              aria-label={
                compactOpen ? translation.closeMenu : translation.openMenu
              }
              aria-controls={contentId}
              aria-expanded={compactOpen}
              onClick={() => {
                const wasOpen =
                  compactExpanded ||
                  (compactHoveredRef.current && !compactDismissed)
                setTooltipTarget(undefined)
                setCompactExpanded(!wasOpen)
                setCompactDismissed(wasOpen)
              }}
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
          <div
            id={contentId}
            className="dnb-sidebar-menu-responsive-inline__body"
          >
            {responsiveChildren}
          </div>
          {isCompact && tooltipTarget && tooltipLabel && !compactOpen && (
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
  value: MediaQuerySizes | `${number}em`,
  breakpoints?: Record<string, string>,
  fallback = defaultBreakpoints.large ?? '72em'
) {
  const configured =
    breakpoints?.[value] ??
    defaultBreakpoints[value as MediaQuerySizes] ??
    value

  return isEmValue(String(configured)) ? String(configured) : fallback
}

function toCssLength(value: CSSProperties['width']) {
  return typeof value === 'number' ? `${value}px` : value
}

function addEmValues(first: string, second: string) {
  if (!isEmValue(first) || !isEmValue(second)) {
    return first
  }

  return `${Number.parseFloat(first) + Number.parseFloat(second)}em`
}

function isEmValue(value: string) {
  return /^\d+(?:\.\d+)?em$/.test(value)
}

function getFirstPaintCss(
  scopeId: string,
  drawerAt: string,
  compactAt?: string
) {
  const em = Number.parseFloat(drawerAt)
  if (!isEmValue(drawerAt) || !Number.isFinite(em)) {
    return undefined
  }

  const minWidth = `${Number((em + 0.00625).toFixed(5))}em`
  const scope = `[data-sidebar-menu-responsive-scope="${scopeId}"]`
  const unresolved = ':not([data-sidebar-menu-responsive-visible])'

  const drawerCss =
    drawerAt === defaultBreakpoints.medium
      ? ''
      : `@media (max-width: ${drawerAt}){${scope}.dnb-sidebar-menu-responsive-trigger${unresolved}{display:inline-flex}${scope}.dnb-sidebar-menu-responsive-inline${unresolved}{display:none}}@media (min-width: ${minWidth}){${scope}.dnb-sidebar-menu-responsive-trigger${unresolved}{display:none}${scope}.dnb-sidebar-menu-responsive-inline${unresolved}{display:contents}}`
  const compactCss = compactAt
    ? getCompactFirstPaintCss(scope, minWidth, compactAt)
    : ''

  return drawerCss + compactCss || undefined
}

function getCompactFirstPaintCss(
  scope: string,
  minWidth: string,
  compactAt: string
) {
  const inline = `${scope}.dnb-sidebar-menu-responsive-inline:not([data-sidebar-menu-responsive-compact])`
  const content = `${inline}>.dnb-sidebar-menu-responsive-inline__content`
  const menu = `${content} .dnb-sidebar-menu`
  const toggle = `${content}>.dnb-sidebar-menu-responsive-inline__toggle-island`
  const informationBadge = `${menu} .dnb-sidebar-menu__badge:not(:has(.dnb-badge--variant-notification))`
  const notificationBadge = `${menu} .dnb-badge--variant-notification`
  const notificationIndicator = `${menu} .dnb-sidebar-menu__accordion__notification-indicator`
  const sections = `${menu} .dnb-sidebar-menu__sections.dnb-dropdown`
  const heading = `${menu} :is(.dnb-sidebar-menu__group__title,.dnb-sidebar-menu__header)`
  const textOnlySelected = `${menu} :is(.dnb-sidebar-menu__item--active,.dnb-sidebar-menu__item--selected)>.dnb-sidebar-menu__item__action:not(:has(.dnb-sidebar-menu__item__icon))`
  const media = `@media (min-width:${minWidth}) and (max-width:${compactAt})`

  return `${media}{${inline}{display:block;width:var(--sidebar-menu-compact-width)}${inline}::after{opacity:1}${content}{clip-path:inset(0 calc(var(--sidebar-menu-expanded-width) - var(--sidebar-menu-compact-width)) 0 0)}${content}:dir(rtl){clip-path:inset(0 0 0 calc(var(--sidebar-menu-expanded-width) - var(--sidebar-menu-compact-width)))}${toggle}{display:inline-flex}${content} .dnb-sidebar-menu-responsive-aside__content{padding:4rem 0 2.5rem}${content} .dnb-sidebar-menu-responsive-aside .dnb-sidebar-menu{width:100%;margin-inline:0}${content} .dnb-sidebar-menu-responsive-aside__resize-handle{display:none}${menu} .dnb-sidebar-menu__item__action{width:2.75rem;margin-inline-start:calc(.375rem + var(--sidebar-menu-compact-offset));padding-inline:.625rem;border-radius:var(--sidebar-menu-action-border-radius)}${menu} .dnb-sidebar-menu__item__content{flex:0 0 auto}${menu} .dnb-sidebar-menu__item__text{max-width:0;overflow:hidden;white-space:nowrap;opacity:0}${menu} .dnb-sidebar-menu__item__action:not(:has(.dnb-sidebar-menu__item__icon)) .dnb-sidebar-menu__item__text{max-width:2.25rem;opacity:.8;mask-image:linear-gradient(to right,#000 35%,transparent 100%)}${menu} .dnb-sidebar-menu__item__action:not(:has(.dnb-sidebar-menu__item__icon)) .dnb-sidebar-menu__item__text:dir(rtl){mask-image:linear-gradient(to left,#000 35%,transparent 100%)}${textOnlySelected}{box-shadow:none;background-color:transparent;background-image:linear-gradient(to right,var(--sidebar-menu-action-background-color--selected) 0 35%,transparent 100%);border-radius:var(--sidebar-menu-action-border-radius) 0 0 var(--sidebar-menu-action-border-radius)}${textOnlySelected}:dir(rtl){background-image:linear-gradient(to left,var(--sidebar-menu-action-background-color--selected) 0 35%,transparent 100%);border-radius:0 var(--sidebar-menu-action-border-radius) var(--sidebar-menu-action-border-radius) 0}${menu} .dnb-sidebar-menu__accordion .dnb-sidebar-menu__list .dnb-sidebar-menu__item__action:not([aria-current]){opacity:var(--sidebar-menu-opacity)}${menu} .dnb-sidebar-menu__accordion__indicator{margin-inline-start:0}${menu} .dnb-sidebar-menu__accordion__expand-icon{width:0;overflow:hidden;opacity:0}${informationBadge}{display:none}${notificationBadge}{position:absolute;inset-block-start:-.25rem;inset-inline-end:-.375rem}${notificationIndicator}{position:absolute;inset-block-start:50%;inset-inline:auto -.125rem;transform:translateY(-50%)}${sections}{--dropdown-button-padding:.625rem;padding-inline:.25rem}${sections} .dnb-dropdown__trigger{width:2.75rem;margin-inline-start:.375rem}${sections}.dnb-sidebar-menu__sections--has-icon .dnb-dropdown__icon{width:0;overflow:hidden;opacity:0}${heading}{width:4rem;white-space:nowrap;opacity:.8;mask-image:linear-gradient(to right,#000 35%,transparent 100%)}${heading}:dir(rtl){mask-image:linear-gradient(to left,#000 35%,transparent 100%)}${menu} .dnb-sidebar-menu__divider{width:2.5rem;margin:1rem 0 1rem calc(.5rem + var(--sidebar-menu-compact-offset))}}`
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
    setDrawerScrollElement,
    triggerRef,
  } = useSidebarMenuResponsiveContext()
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
