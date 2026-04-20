import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import IconPrimary from '../IconPrimary'
import HeightAnimation from '../height-animation/HeightAnimation'
import { MenuContext, useMenuContext } from './MenuContext'
import MenuItemContent from './MenuItemContent'
import useMenuItemRegistration from './useMenuItemRegistration'
import type { MenuAccordionProps, MenuContextValue } from './types'

export default function MenuAccordion(props: MenuAccordionProps) {
  const {
    id,
    className,
    children,
    icon,
    text,
    disabled = false,
    onOpenChange,
    ...rest
  } = props

  const parentContext = useMenuContext()
  const level = parentContext ? parentContext.level + 1 : 1

  const [isOpen, setIsOpenState] = useState(false)

  const setIsOpen = useCallback(
    (next: boolean | ((prev: boolean) => boolean)) => {
      setIsOpenState((prev) => {
        const value = typeof next === 'function' ? next(prev) : next
        if (value !== prev) {
          onOpenChange?.(value)
        }
        return value
      })
    },
    [onOpenChange]
  )

  // Reset when parent menu closes
  const parentIsOpen = parentContext?.isOpen
  useEffect(() => {
    if (!parentIsOpen) {
      setIsOpen(false)
    }
  }, [parentIsOpen, setIsOpen])

  // Register trigger in parent context as a menu item
  const triggerRef = useRef<HTMLDivElement>(null)
  const { isActive } = useMenuItemRegistration(triggerRef)

  const contentRef = useRef<HTMLUListElement>(null)

  const closeAll = useCallback(() => {
    setIsOpen(false)
    parentContext?.closeAll()
  }, [parentContext, setIsOpen])

  // Close only this accordion and restore focus to trigger
  const closeSelf = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }, [setIsOpen])

  // Inherit parent navigation (registerItem, itemRefs, activeIndex, etc.)
  // and only override level, closeSelf, and closeAll for this accordion
  const childContextValue: MenuContextValue | null = useMemo(() => {
    if (!parentContext) {
      return null
    }
    return {
      ...parentContext,
      level,
      closeAll,
      closeSelf,
    }
  }, [parentContext, level, closeAll, closeSelf])

  const handleClick = useCallback(() => {
    if (disabled) {
      return // stop here
    }
    setIsOpen((prev) => !prev)
  }, [disabled, setIsOpen])

  const focusFirstChild = useCallback(() => {
    const firstChild = contentRef.current?.querySelector<HTMLElement>(
      '[role="menuitem"]:not([aria-disabled="true"])'
    )
    if (firstChild && parentContext) {
      firstChild.focus({ preventScroll: true })
      const refIndex = parentContext.itemRefs.current.findIndex(
        (r) => r?.current === firstChild
      )
      if (refIndex !== -1) {
        parentContext.setActiveIndex(refIndex)
      }
    }
  }, [parentContext])

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) {
        return // stop here
      }

      if (
        event.key === 'Enter' ||
        event.key === ' ' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault()
        event.stopPropagation()

        if (!isOpen) {
          setIsOpen(true)

          // Focus the first child item after render
          requestAnimationFrame(() => {
            focusFirstChild()
          })
        } else if (event.key === 'ArrowRight') {
          // Already open — focus first child
          focusFirstChild()
        } else {
          // Already open — Enter/Space toggles closed
          setIsOpen(false)
        }
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
      }
    },
    [disabled, isOpen, setIsOpen, focusFirstChild]
  )

  return (
    <li
      role="none"
      className={clsx(
        'dnb-menu__accordion',
        isOpen && 'dnb-menu__accordion--open',
        disabled && 'dnb-menu__accordion--disabled',
        className
      )}
    >
      <div
        id={id}
        ref={triggerRef}
        role="menuitem"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-disabled={disabled || undefined}
        tabIndex={isActive ? 0 : -1}
        className="dnb-menu__action dnb-menu__accordion__trigger"
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        <MenuItemContent icon={icon} text={text} />

        <span className="dnb-menu__accordion__indicator">
          <IconPrimary icon="chevron_right" />
        </span>
      </div>

      <HeightAnimation open={isOpen}>
        {childContextValue && (
          <MenuContext value={childContextValue}>
            <ul
              ref={contentRef}
              role="group"
              aria-label={typeof text === 'string' ? text : undefined}
              className="dnb-menu__list"
            >
              {children}
            </ul>
          </MenuContext>
        )}
      </HeightAnimation>
    </li>
  )
}
