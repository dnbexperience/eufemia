import React, { useCallback, useRef, useLayoutEffect } from 'react'
import clsx from 'clsx'
import { useMenuContext } from './MenuContext'
import type { MenuListProps } from './types'

export default function MenuList(props: MenuListProps) {
  const {
    children,
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props

  const context = useMenuContext()
  const ulRef = useRef<HTMLUListElement>(null)

  // Share the <ul> ref with the context so MenuRoot can use it for focusOnOpenElement
  useLayoutEffect(() => {
    if (context?.menuRef) {
      context.menuRef.current = ulRef.current
    }
  })

  const getValidItemCount = useCallback(() => {
    if (!context) {
      return 0
    }
    return context.itemRefs.current.filter((ref) => ref?.current != null)
      .length
  }, [context])

  const focusItem = useCallback(
    (index: number, direction: 1 | -1 = 1) => {
      if (!context) {
        return
      }
      const refs = context.itemRefs.current
      const slots = refs.length
      if (slots === 0) {
        return
      }

      // Find next valid index
      let target = ((index % slots) + slots) % slots
      let attempts = 0
      while (attempts < slots) {
        const ref = refs[target]
        if (ref?.current && !ref.current.getAttribute('aria-disabled')) {
          ref.current.focus({ preventScroll: true })
          context.setActiveIndex(target)
          return
        }
        target = (target + direction + slots) % slots
        attempts++
      }
    },
    [context]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLUListElement>) => {
      if (!context) {
        return
      }

      const count = getValidItemCount()
      if (count === 0) {
        return
      }

      const { activeIndex } = context

      switch (event.key) {
        case 'ArrowDown': {
          event.preventDefault()
          event.stopPropagation()
          const nextDown = activeIndex === -1 ? 0 : activeIndex + 1
          focusItem(nextDown, 1)
          break
        }

        case 'ArrowUp': {
          event.preventDefault()
          event.stopPropagation()
          const nextUp = activeIndex === -1 ? count - 1 : activeIndex - 1
          focusItem(nextUp, -1)
          break
        }

        case 'Home':
        case 'PageUp': {
          event.preventDefault()
          event.stopPropagation()
          focusItem(0, 1)
          break
        }

        case 'End':
        case 'PageDown': {
          event.preventDefault()
          event.stopPropagation()
          focusItem(count - 1, -1)
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
            const refs = context.itemRefs.current
            const startIndex = (activeIndex + 1) % count

            for (let i = 0; i < count; i++) {
              const index = (startIndex + i) % count
              const ref = refs[index]
              const text = ref?.current?.textContent?.trim().toLowerCase()
              if (text?.startsWith(char)) {
                focusItem(index)
                break
              }
            }
          }
        }
      }
    },
    [context, focusItem, getValidItemCount]
  )

  return (
    <ul
      ref={ulRef}
      role="menu"
      tabIndex={-1}
      className={clsx('dnb-menu__list', 'dnb-no-focus', className)}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </ul>
  )
}
