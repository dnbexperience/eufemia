import { useRef, useState } from 'react'
import type {
  ComponentPropsWithRef,
  CSSProperties,
  HTMLAttributes,
  ReactNode,
} from 'react'
import { clsx } from 'clsx'
import ScrollView from '../../components/scroll-view/ScrollView'
import type { ScrollViewAllProps } from '../../components/scroll-view/ScrollView'
import useCombinedRef from '../../shared/helpers/useCombinedRef'
import useId from '../../shared/helpers/useId'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'
import SidebarMenuResizeHandle from './SidebarMenuResizeHandle'
import type { SidebarMenuResizeHandleProps } from './SidebarMenuResizeHandle'
import {
  SidebarMenuResponsiveInline,
  useSidebarMenuResponsive,
} from './SidebarMenuResponsive'
import type { SidebarMenuResponsiveInlineProps } from './SidebarMenuResponsive'
import { useOptionalSidebarMenuResponsive } from './SidebarMenuResponsiveContext'

export type SidebarMenuResponsiveAsideProps = Omit<
  ComponentPropsWithRef<'aside'>,
  'children'
> & {
  children: ReactNode
  /** Width of the full inline sidebar. Default: 18rem. */
  expandedWidth?: SidebarMenuResponsiveInlineProps['expandedWidth']
  /** Width reserved while the inline sidebar is compact. Minimum and default: 4rem. */
  compactWidth?: SidebarMenuResponsiveInlineProps['compactWidth']
  /** Enables the inline ResizeHandle. Default: false. */
  resizable?: boolean
  /** Properties forwarded to the ScrollView. */
  scrollViewProps?: Omit<ScrollViewAllProps, 'children'>
  /** Properties forwarded to the content wrapper inside ScrollView. */
  contentProps?: HTMLAttributes<HTMLDivElement>
  /** Properties forwarded to ResizeHandle. */
  resizeHandleProps?: Omit<
    SidebarMenuResizeHandleProps,
    'cssProperty' | 'scopeSelector' | 'targetRef'
  >
  /** Called when the width reserved by the inline sidebar changes. */
  onWidthChange?: (width: number) => void
}

export default function SidebarMenuResponsiveAside({
  children,
  expandedWidth = '18rem',
  compactWidth = '4rem',
  resizable = false,
  scrollViewProps,
  contentProps,
  resizeHandleProps,
  onWidthChange,
  className,
  id,
  ref,
  style,
  ...props
}: SidebarMenuResponsiveAsideProps) {
  const asideRef = useRef<HTMLElement>(null)
  const [inlineElement, setInlineElement] =
    useState<HTMLDivElement | null>(null)
  const combinedRef = useCombinedRef(ref, asideRef)
  const responsive = useOptionalSidebarMenuResponsive()
  const internalId = useId(id ?? `${responsive?.scopeId}-responsive-aside`)
  const { collapseInline } = useSidebarMenuResponsive()
  const {
    className: scrollViewClassName,
    interactive = 'auto',
    scrollbarGutter = 'stable',
    ...restScrollViewProps
  } = scrollViewProps ?? {}
  const { className: contentClassName, ...restContentProps } =
    contentProps ?? {}
  const {
    className: resizeHandleClassName,
    minWidth = 240,
    onCollapse,
    ...restResizeHandleProps
  } = resizeHandleProps ?? {}

  useIsomorphicLayoutEffect(() => {
    if (!onWidthChange) {
      return undefined
    }
    if (!inlineElement) {
      onWidthChange(0)
      return undefined
    }

    const reportWidth = () => {
      onWidthChange(inlineElement.getBoundingClientRect().width)
    }
    reportWidth()
    if (typeof ResizeObserver === 'undefined') {
      return undefined
    }
    const observer = new ResizeObserver(reportWidth)
    observer.observe(inlineElement)
    return () => observer.disconnect()
  }, [inlineElement, onWidthChange])

  return (
    <SidebarMenuResponsiveInline
      ref={setInlineElement}
      expandedWidth={expandedWidth}
      compactWidth={compactWidth}
    >
      <aside
        {...props}
        id={internalId}
        ref={combinedRef}
        className={clsx('dnb-sidebar-menu-responsive-aside', className)}
        data-sidebar-menu-responsive-resizable={resizable || undefined}
        style={
          {
            '--sidebar-menu-resize-min-width': `${minWidth}px`,
            ...style,
          } as CSSProperties
        }
      >
        <ScrollView
          {...restScrollViewProps}
          className={clsx(
            'dnb-sidebar-menu-responsive-aside__scroll-view',
            scrollViewClassName
          )}
          interactive={interactive}
          scrollbarGutter={scrollbarGutter}
        >
          <div
            {...restContentProps}
            className={clsx(
              'dnb-sidebar-menu-responsive-aside__content',
              contentClassName
            )}
          >
            {children}
          </div>
        </ScrollView>
        {resizable && (
          <SidebarMenuResizeHandle
            {...restResizeHandleProps}
            className={clsx(
              'dnb-sidebar-menu-responsive-aside__resize-handle',
              resizeHandleClassName
            )}
            targetRef={asideRef}
            scopeSelector={`[data-sidebar-menu-responsive-provider="${responsive?.scopeId}"]`}
            cssProperty="--sidebar-menu-runtime-expanded-width"
            minWidth={minWidth}
            aria-controls={
              restResizeHandleProps['aria-controls'] ?? internalId
            }
            onCollapse={() => {
              onCollapse?.()
              collapseInline()
            }}
          />
        )}
      </aside>
    </SidebarMenuResponsiveInline>
  )
}
