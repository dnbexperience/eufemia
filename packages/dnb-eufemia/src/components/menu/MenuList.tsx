import React, { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import { useMenuContext } from './MenuContext'
import type { MenuListProps } from './types'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export default function MenuList(props: MenuListProps) {
  const { children, className, maxVisibleListItems, style, ...rest } =
    props

  const context = useMenuContext()
  const ulRef = useRef<HTMLUListElement>(null)

  const hasValidMaxVisibleListItems =
    typeof maxVisibleListItems === 'number' &&
    Number.isFinite(maxVisibleListItems) &&
    maxVisibleListItems > 0

  const fallbackMaxHeight = hasValidMaxVisibleListItems
    ? `calc(var(--menu-action-min-height, 2.5rem) * ${maxVisibleListItems} + var(--menu-content-padding, 0.25rem) * 2)`
    : undefined

  const [measuredMaxHeight, setMeasuredMaxHeight] = useState<
    string | undefined
  >(undefined)

  const measureMaxHeight = useCallback(() => {
    if (!hasValidMaxVisibleListItems || style?.maxHeight) {
      setMeasuredMaxHeight(undefined)
      return
    }

    const height = getVisibleMenuItemsHeight(
      ulRef.current,
      maxVisibleListItems,
    )

    setMeasuredMaxHeight(height ? `${height}px` : undefined)
  }, [hasValidMaxVisibleListItems, maxVisibleListItems, style?.maxHeight])

  useIsomorphicLayoutEffect(() => {
    measureMaxHeight()
  }, [children, measureMaxHeight])

  useIsomorphicLayoutEffect(() => {
    if (!hasValidMaxVisibleListItems || style?.maxHeight) {
      return undefined
    }

    window.addEventListener('resize', measureMaxHeight)

    return () => {
      window.removeEventListener('resize', measureMaxHeight)
    }
  }, [hasValidMaxVisibleListItems, measureMaxHeight, style?.maxHeight])

  // Share the <ul> ref with the context so MenuRoot can use it for focusOnOpenElement
  useIsomorphicLayoutEffect(() => {
    if (context?.menuRef) {
      context.menuRef.current = ulRef.current
    }
  })

  const getNavigableItems = useCallback(() => {
    const menuEl = ulRef.current
    if (!menuEl) {
      return []
    }
    return Array.from(
      menuEl.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])',
      ),
    )
  }, [])

  const focusByDomOrder = useCallback(
    (element: HTMLElement) => {
      if (!context) {
        return
      }
      element.focus({ preventScroll: true })
      const refIndex = context.itemRefs.current.findIndex(
        (r) => r?.current === element,
      )
      if (refIndex !== -1) {
        context.setActiveIndex(refIndex)
      }
    },
    [context],
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (!context) {
        return
      }

      const items = getNavigableItems()
      if (items.length === 0) {
        return
      }

      let currentIdx = items.indexOf(document.activeElement as HTMLElement)

      // Fallback: use activeIndex to locate the current item in DOM order
      if (currentIdx === -1 && context.activeIndex >= 0) {
        const activeRef = context.itemRefs.current[context.activeIndex]
        if (activeRef?.current) {
          currentIdx = items.indexOf(activeRef.current)
        }
      }

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault()
          event.stopPropagation()
          if (currentIdx === -1) {
            focusByDomOrder(items[0])
          } else {
            focusByDomOrder(items[(currentIdx + 1) % items.length])
          }
          break
        }

        case 'ArrowUp': {
          event.preventDefault()
          event.stopPropagation()
          if (currentIdx === -1) {
            focusByDomOrder(items[items.length - 1])
          } else {
            focusByDomOrder(
              items[(currentIdx - 1 + items.length) % items.length],
            )
          }
          break
        }

        case 'Home':
        case 'PageUp': {
          event.preventDefault()
          event.stopPropagation()
          focusByDomOrder(items[0])
          break
        }

        case 'End':
        case 'PageDown': {
          event.preventDefault()
          event.stopPropagation()
          focusByDomOrder(items[items.length - 1])
          break
        }

        case 'Escape':
        case 'Tab': {
          // Let Popover handle close and focus restore to trigger
          break
        }

        default: {
          // Type-ahead: jump to first item starting with pressed character
          if (event.key.length === 1 && !event.ctrlKey && !event.metaKey) {
            const char = event.key.toLowerCase()
            const startIdx =
              currentIdx === -1 ? 0 : (currentIdx + 1) % items.length

            for (let i = 0; i < items.length; i++) {
              const idx = (startIdx + i) % items.length
              const text = items[idx].textContent?.trim().toLowerCase()
              if (text?.startsWith(char)) {
                focusByDomOrder(items[idx])
                break
              }
            }
          }
        }
      }
    },
    [context, getNavigableItems, focusByDomOrder],
  )

  const resolvedMaxHeight = style?.maxHeight
    ? undefined
    : measuredMaxHeight || fallbackMaxHeight

  const listStyle: React.CSSProperties = {
    ...(resolvedMaxHeight
      ? {
          maxHeight: resolvedMaxHeight,
          overflowY: 'auto',
        }
      : null),
    ...style,
  }

  return (
    <ul
      ref={ulRef}
      role="menu"
      tabIndex={-1}
      className={clsx('dnb-menu__list', 'dnb-no-focus', className)}
      style={Object.keys(listStyle).length > 0 ? listStyle : undefined}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </ul>
  )
}

function getVisibleMenuItemsHeight(
  ulElement: HTMLUListElement | null,
  maxVisibleListItems: number,
) {
  if (!ulElement) {
    return null
  }

  const items = Array.from(ulElement.children).filter(
    (element): element is HTMLElement => element instanceof HTMLElement,
  )

  const firstVisibleItem = items[0]
  const lastVisibleItem = items[maxVisibleListItems - 1]

  if (!firstVisibleItem || !lastVisibleItem) {
    return null
  }

  const contentHeight = Math.ceil(
    lastVisibleItem.offsetTop +
      lastVisibleItem.offsetHeight -
      firstVisibleItem.offsetTop,
  )

  const computedStyle = getComputedStyle(ulElement)
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0

  return contentHeight + paddingTop + paddingBottom
}
