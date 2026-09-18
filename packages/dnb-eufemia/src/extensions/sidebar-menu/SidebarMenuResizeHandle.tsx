import { useCallback, useEffect, useRef, useState } from 'react'
import type {
  ButtonHTMLAttributes,
  CSSProperties,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  PointerEvent as ReactPointerEvent,
  RefObject,
} from 'react'
import { clsx } from 'clsx'
import { useIsomorphicLayoutEffect as useLayoutEffect } from '../../shared/helpers/useIsomorphicLayoutEffect'
import useTranslation from '../../shared/useTranslation'
import { useOptionalSidebarMenuResponsive } from './SidebarMenuResponsive'

const collapseRubberBandRatio = 0.1

export type SidebarMenuResizeHandleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDoubleClick' | 'onKeyDown' | 'onMouseDown' | 'onPointerDown'
> & {
  /** Element whose rendered width is used while resizing. */
  targetRef: RefObject<HTMLElement | null>
  /** CSS custom property updated with the new width. */
  cssProperty?: `--${string}`
  /** Closest ancestor receiving cssProperty. Defaults to the target element. */
  scopeSelector?: string
  /** Smallest allowed width in pixels. Default: 240. */
  minWidth?: number
  /** Largest allowed width in pixels. Default: 560. */
  maxWidth?: number
  /** Width in pixels at which continued pointer dragging collapses the sidebar. Default: half of minWidth. */
  collapseThreshold?: number
  /** Called when pointer dragging reaches collapseThreshold. */
  onCollapse?: () => void
  /** Keyboard resize step in pixels. Default: 16. */
  step?: number
  /** Keyboard resize step in pixels when Shift is pressed. Default: 48. */
  largeStep?: number
}

export default function SidebarMenuResizeHandle({
  targetRef,
  cssProperty = '--sidebar-menu-width',
  scopeSelector,
  minWidth = 240,
  maxWidth = 560,
  collapseThreshold = minWidth / 2,
  onCollapse,
  step = 16,
  largeStep = 48,
  className,
  style,
  'aria-label': ariaLabel,
  ...rest
}: SidebarMenuResizeHandleProps) {
  const translation = useTranslation().SidebarMenu
  const cleanupResizeRef = useRef<() => void>(undefined)
  const resetFrameRef = useRef<number>(undefined)
  const initialMeasureFrameRef = useRef<number>(undefined)
  const resetTransitionCleanupRef = useRef<() => void>(undefined)
  const handleRef = useRef<HTMLButtonElement>(null)
  const writtenWidthRef = useRef<number>(undefined)
  const [currentWidth, setCurrentWidth] = useState(minWidth)
  const [resolvedMaxWidth, setResolvedMaxWidth] = useState(
    maxWidth ?? minWidth
  )
  const handleStyle = {
    ...style,
    '--sidebar-menu-resize-handle-position': 'var(' + cssProperty + ')',
  } as CSSProperties
  const responsive = useOptionalSidebarMenuResponsive()

  useEffect(
    () => () => {
      cleanupResizeRef.current?.()
      cancelAnimationFrame(resetFrameRef.current)
      cancelAnimationFrame(initialMeasureFrameRef.current)
      resetTransitionCleanupRef.current?.()
    },
    []
  )

  function getTargetWidth() {
    return targetRef.current?.getBoundingClientRect().width || 0
  }

  function getRootElement() {
    const target = targetRef.current

    return (
      (scopeSelector && target?.closest<HTMLElement>(scopeSelector)) ||
      target ||
      document.documentElement
    )
  }

  const getMaximumWidth = useCallback(() => {
    const viewportWidth =
      typeof window === 'undefined' ? minWidth : window.innerWidth
    const computedMaxWidth = targetRef.current
      ? getComputedStyle(targetRef.current).maxWidth
      : ''
    const layoutMaxWidth = computedMaxWidth.endsWith('px')
      ? Number.parseFloat(computedMaxWidth)
      : Infinity

    return Math.max(
      minWidth,
      Math.min(
        maxWidth,
        viewportWidth,
        Number.isFinite(layoutMaxWidth) ? layoutMaxWidth : Infinity
      )
    )
  }, [maxWidth, minWidth, targetRef])

  useLayoutEffect(() => {
    const measure = () => {
      if (!targetRef.current) {
        return
      }
      const targetWidth = targetRef.current.getBoundingClientRect().width
      if (targetWidth > 0) {
        writtenWidthRef.current = targetWidth
        setHandlePosition(targetWidth)
        setResolvedMaxWidth(getMaximumWidth())
      }
    }

    measure()
    initialMeasureFrameRef.current = requestAnimationFrame(measure)
    return () => cancelAnimationFrame(initialMeasureFrameRef.current)
  }, [getMaximumWidth, targetRef])

  useEffect(() => {
    const handleResize = () => {
      const maximumWidth = getMaximumWidth()
      setResolvedMaxWidth(maximumWidth)
      if (writtenWidthRef.current !== undefined) {
        setWidth(writtenWidthRef.current)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  function setWidth(width: number) {
    if (getTargetWidth() <= 0) {
      return
    }

    const nextWidth = Math.round(
      Math.min(Math.max(width, minWidth), getMaximumWidth())
    )
    const value = String(nextWidth) + 'px'
    getRootElement().style.setProperty(cssProperty, value)
    writtenWidthRef.current = nextWidth
    setResolvedMaxWidth(getMaximumWidth())
    setHandlePosition(nextWidth)
  }

  function setRubberBandWidth(width: number) {
    const distance = minWidth - width
    const nextWidth = Math.round(
      minWidth - distance * collapseRubberBandRatio
    )
    getRootElement().style.setProperty(
      cssProperty,
      String(nextWidth) + 'px'
    )
    writtenWidthRef.current = minWidth
    setHandlePosition(nextWidth)
  }

  function setHandlePosition(width: number) {
    setCurrentWidth(Math.round(width))
    handleRef.current?.style.setProperty(
      '--sidebar-menu-resize-handle-position',
      String(Math.round(width)) + 'px'
    )
  }

  function resetWidth() {
    getRootElement().style.removeProperty(cssProperty)
    writtenWidthRef.current = undefined
    handleRef.current?.style.setProperty(
      '--sidebar-menu-resize-handle-position',
      'var(' + cssProperty + ')'
    )

    const updatePosition = () => {
      const targetWidth = getTargetWidth()
      if (targetWidth > 0) {
        setCurrentWidth(Math.round(targetWidth))
        setResolvedMaxWidth(getMaximumWidth())
      }
    }

    cancelAnimationFrame(resetFrameRef.current)
    resetTransitionCleanupRef.current?.()
    const target = targetRef.current
    if (target) {
      const handleTransitionEnd = (event: TransitionEvent) => {
        if (event.propertyName === 'width') {
          resetTransitionCleanupRef.current?.()
          updatePosition()
        }
      }
      target.addEventListener('transitionend', handleTransitionEnd)
      target.addEventListener('transitioncancel', handleTransitionEnd)
      resetTransitionCleanupRef.current = () => {
        target.removeEventListener('transitionend', handleTransitionEnd)
        target.removeEventListener('transitioncancel', handleTransitionEnd)
        resetTransitionCleanupRef.current = undefined
      }
    }

    if (scopeSelector) {
      updatePosition()
      if (getTargetWidth() <= 0) {
        resetFrameRef.current = requestAnimationFrame(updatePosition)
      }
    } else {
      setHandlePosition(getTargetWidth())
    }
  }
  const resetWidthRef = useRef(resetWidth)
  resetWidthRef.current = resetWidth

  useLayoutEffect(() => {
    return responsive?.registerInlineReset(() => resetWidthRef.current())
  }, [responsive?.registerInlineReset])

  function startResize(
    clientX: number,
    addListeners: (
      handleMove: (event: MouseEvent | PointerEvent) => void,
      handleEnd: () => void
    ) => () => void
  ) {
    cleanupResizeRef.current?.()
    cancelAnimationFrame(initialMeasureFrameRef.current)
    cancelAnimationFrame(resetFrameRef.current)
    resetTransitionCleanupRef.current?.()
    const rootElement = getRootElement()
    rootElement.classList.add(
      'dnb-sidebar-menu-resize-handle--transition-ready'
    )
    rootElement.classList.add('dnb-sidebar-menu-resize-handle--dragging')
    const pointerOffset = clientX - getTargetWidth()
    let rubberBandActive = false
    const handleMove = (event: MouseEvent | PointerEvent) => {
      document.documentElement.classList.add(
        'dnb-sidebar-menu-resize-handle--resizing'
      )
      const width = event.clientX - pointerOffset
      if (onCollapse && width <= collapseThreshold) {
        rubberBandActive = false
        const minimumWidth = String(minWidth) + 'px'
        getRootElement().style.setProperty(cssProperty, minimumWidth)
        writtenWidthRef.current = minWidth
        setHandlePosition(minWidth)
        cleanup()
        onCollapse()
        return
      }
      if (onCollapse && width < minWidth) {
        rubberBandActive = true
        setRubberBandWidth(width)
        return
      }
      rubberBandActive = false
      setWidth(width)
    }
    let removeListeners = () => undefined
    const cleanup = () => {
      removeListeners()
      document.documentElement.classList.remove(
        'dnb-sidebar-menu-resize-handle--resizing'
      )
      rootElement.classList.remove(
        'dnb-sidebar-menu-resize-handle--dragging'
      )
      if (rubberBandActive) {
        rubberBandActive = false
        setWidth(minWidth)
      }
      cleanupResizeRef.current = undefined
    }

    removeListeners = addListeners(handleMove, cleanup)
    cleanupResizeRef.current = cleanup
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    if (event.button !== 0) {
      return
    }

    event.preventDefault()
    event.currentTarget.setPointerCapture?.(event.pointerId)
    startResize(event.clientX, (handleMove, handleEnd) => {
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleEnd, { once: true })
      window.addEventListener('pointercancel', handleEnd, { once: true })

      return () => {
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('pointerup', handleEnd)
        window.removeEventListener('pointercancel', handleEnd)
      }
    })
  }

  function handleMouseDown(event: ReactMouseEvent<HTMLButtonElement>) {
    if (event.button !== 0 || typeof window.PointerEvent !== 'undefined') {
      return
    }

    event.preventDefault()
    startResize(event.clientX, (handleMove, handleEnd) => {
      window.addEventListener('mousemove', handleMove)
      window.addEventListener('mouseup', handleEnd, { once: true })

      return () => {
        window.removeEventListener('mousemove', handleMove)
        window.removeEventListener('mouseup', handleEnd)
      }
    })
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const keyboardStep = event.shiftKey ? largeStep : step

    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      setWidth(
        (writtenWidthRef.current ?? getTargetWidth()) - keyboardStep
      )
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setWidth(
        (writtenWidthRef.current ?? getTargetWidth()) + keyboardStep
      )
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      resetWidth()
    }
  }

  return (
    <button
      {...rest}
      ref={handleRef}
      type="button"
      className={clsx('dnb-sidebar-menu-resize-handle', className)}
      style={handleStyle}
      // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
      role="separator"
      aria-label={ariaLabel ?? translation.resizeSidebar}
      aria-orientation="vertical"
      aria-valuemin={minWidth}
      aria-valuemax={resolvedMaxWidth}
      aria-valuenow={currentWidth}
      onPointerDown={handlePointerDown}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      onDoubleClick={resetWidth}
    />
  )
}
