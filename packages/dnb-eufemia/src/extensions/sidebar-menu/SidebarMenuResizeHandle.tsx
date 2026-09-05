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

export type SidebarMenuResizeHandleProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'onDoubleClick' | 'onKeyDown' | 'onMouseDown' | 'onPointerDown'
> & {
  /** Element whose rendered width is used while resizing. */
  targetRef: RefObject<HTMLElement | null>
  /** CSS custom property updated with the new width. */
  cssProperty?: `--${string}`
  /** Closest ancestor receiving cssProperty. Defaults to the target element. */
  rootSelector?: string
  /** Smallest allowed width in pixels. Default: 1. */
  minWidth?: number
  /** Largest allowed width in pixels. Defaults to the browser viewport width. */
  maxWidth?: number
  /** Keyboard resize step in pixels. Default: 16. */
  step?: number
  /** Keyboard resize step in pixels when Shift is pressed. Default: 48. */
  largeStep?: number
}

export default function SidebarMenuResizeHandle({
  targetRef,
  cssProperty = '--sidebar-menu-width',
  rootSelector,
  minWidth = 1,
  maxWidth,
  step = 16,
  largeStep = 48,
  className,
  style,
  'aria-label': ariaLabel = 'Resize sidebar',
  ...rest
}: SidebarMenuResizeHandleProps) {
  const cleanupResizeRef = useRef<() => void>(undefined)
  const handleRef = useRef<HTMLButtonElement>(null)
  const [currentWidth, setCurrentWidth] = useState(minWidth)
  const [resolvedMaxWidth, setResolvedMaxWidth] = useState(
    maxWidth ?? minWidth
  )
  const handleStyle = {
    ...style,
    '--sidebar-menu-resize-handle-position': 'var(' + cssProperty + ')',
  } as CSSProperties

  useEffect(() => () => cleanupResizeRef.current?.(), [])

  function getTargetWidth() {
    return targetRef.current?.getBoundingClientRect().width || 0
  }

  function getRootElement() {
    const target = targetRef.current

    return (
      (rootSelector && target?.closest<HTMLElement>(rootSelector)) ||
      target ||
      document.documentElement
    )
  }

  const getMaximumWidth = useCallback(() => {
    const viewportWidth =
      typeof window === 'undefined' ? minWidth : window.innerWidth

    return Math.max(minWidth, maxWidth ?? viewportWidth)
  }, [maxWidth, minWidth])

  useLayoutEffect(() => {
    if (targetRef.current) {
      setHandlePosition(targetRef.current.getBoundingClientRect().width)
      setResolvedMaxWidth(getMaximumWidth())
    }
  }, [getMaximumWidth, targetRef])

  function setWidth(width: number) {
    const nextWidth = Math.round(
      Math.min(Math.max(width, minWidth), getMaximumWidth())
    )
    const value = String(nextWidth) + 'px'
    getRootElement().style.setProperty(cssProperty, value)
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
    if (rootSelector) {
      setCurrentWidth(Math.round(getTargetWidth()))
      handleRef.current?.style.setProperty(
        '--sidebar-menu-resize-handle-position',
        'var(' + cssProperty + ')'
      )
    } else {
      setHandlePosition(getTargetWidth())
    }
  }

  function startResize(
    clientX: number,
    addListeners: (
      handleMove: (event: MouseEvent | PointerEvent) => void,
      handleEnd: () => void
    ) => () => void
  ) {
    cleanupResizeRef.current?.()
    const pointerOffset = clientX - getTargetWidth()
    const handleMove = (event: MouseEvent | PointerEvent) => {
      document.documentElement.classList.add(
        'dnb-sidebar-menu-resize-handle--resizing'
      )
      setWidth(event.clientX - pointerOffset)
    }
    let removeListeners = () => undefined
    const cleanup = () => {
      removeListeners()
      document.documentElement.classList.remove(
        'dnb-sidebar-menu-resize-handle--resizing'
      )
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
    startResize(event.clientX, (handleMove, handleEnd) => {
      window.addEventListener('pointermove', handleMove)
      window.addEventListener('pointerup', handleEnd, { once: true })

      return () => {
        window.removeEventListener('pointermove', handleMove)
        window.removeEventListener('pointerup', handleEnd)
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
      setWidth(getTargetWidth() - keyboardStep)
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault()
      setWidth(getTargetWidth() + keyboardStep)
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
      aria-label={ariaLabel}
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
