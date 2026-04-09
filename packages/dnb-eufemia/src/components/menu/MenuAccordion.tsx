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
import MenuList from './MenuList'
import type { MenuAccordionProps, MenuContextValue } from './types'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export default function MenuAccordion(props: MenuAccordionProps) {
  const {
    id,
    className,
    children,
    icon,
    text,
    disabled = false,
    ...rest
  } = props

  const parentContext = useMenuContext()
  const level = parentContext ? parentContext.level + 1 : 1

  const [isOpen, setIsOpen] = useState(false)

  // Reset when parent menu closes
  const parentIsOpen = parentContext?.isOpen
  useEffect(() => {
    if (!parentIsOpen) {
      setIsOpen(false)
    }
  }, [parentIsOpen])

  // Register trigger in parent context as a menu item
  const triggerRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(-1)

  const registerItem = parentContext?.registerItem
  const unregisterItem = parentContext?.unregisterItem

  useIsomorphicLayoutEffect(() => {
    if (!registerItem || !unregisterItem || !parentIsOpen) {
      return undefined // stop here
    }

    indexRef.current = registerItem(
      triggerRef as React.RefObject<HTMLElement>
    )

    return () => {
      unregisterItem(indexRef.current)
    }
  }, [registerItem, unregisterItem, parentIsOpen])

  const isActive = parentContext?.activeIndex === indexRef.current

  // Child context management
  const activeIndexRef = useRef(-1)
  const [activeIndex, setActiveIndexState] = useState(-1)
  const itemRefsRef = useRef<Array<React.RefObject<HTMLElement>>>([])
  const nextIndexRef = useRef(0)
  const menuRef = useRef<HTMLUListElement>(null)

  const setActiveIndex = useCallback((index: number) => {
    activeIndexRef.current = index
    setActiveIndexState(index)
  }, [])

  const registerChildItem = useCallback(
    (ref: React.RefObject<HTMLElement>) => {
      const index = nextIndexRef.current
      nextIndexRef.current += 1
      itemRefsRef.current[index] = ref
      return index
    },
    []
  )

  const unregisterChildItem = useCallback((index: number) => {
    itemRefsRef.current[index] =
      undefined as unknown as React.RefObject<HTMLElement>
  }, [])

  const closeAll = useCallback(() => {
    setIsOpen(false)
    parentContext?.closeAll()
  }, [parentContext])

  // Close only this accordion and restore focus to trigger
  const closeSelf = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus({ preventScroll: true })
  }, [])

  const childContextValue: MenuContextValue = useMemo(
    () => ({
      level,
      closeAll,
      closeSelf,
      activeIndex,
      setActiveIndex,
      registerItem: registerChildItem,
      unregisterItem: unregisterChildItem,
      itemRefs: itemRefsRef,
      menuRef,
      isOpen,
    }),
    [
      level,
      closeAll,
      closeSelf,
      activeIndex,
      setActiveIndex,
      registerChildItem,
      unregisterChildItem,
      isOpen,
    ]
  )

  // Reset child registration when accordion closes
  useEffect(() => {
    if (!isOpen) {
      nextIndexRef.current = 0
      itemRefsRef.current = []
      setActiveIndex(-1)
    }
  }, [isOpen, setActiveIndex])

  const handleClick = useCallback(() => {
    if (disabled) {
      return // stop here
    }
    setIsOpen((prev) => !prev)
  }, [disabled])

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

        const setFocus = () => {
          const firstRef = itemRefsRef.current[0]
          if (firstRef?.current) {
            firstRef.current.focus({ preventScroll: true })
            setActiveIndex(0)
          }
        }

        if (!isOpen) {
          setIsOpen(true)

          // Focus the first child item after render
          requestAnimationFrame(() => {
            setFocus()
          })
        } else if (event.key === 'ArrowRight') {
          // Already open — focus first child
          setFocus()
        }
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        event.stopPropagation()
        setIsOpen(false)
      }
    },
    [disabled, isOpen, setActiveIndex]
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
        {icon && (
          <span className="dnb-menu__action__icon">
            <IconPrimary icon={icon} />
          </span>
        )}

        {text && <span className="dnb-menu__action__text">{text}</span>}

        <span className="dnb-menu__accordion__indicator">
          <IconPrimary icon="chevron_right" />
        </span>
      </div>

      <HeightAnimation open={isOpen}>
        <MenuContext.Provider value={childContextValue}>
          <MenuList
            aria-label={typeof text === 'string' ? text : undefined}
          >
            {children}
          </MenuList>
        </MenuContext.Provider>
      </HeightAnimation>
    </li>
  )
}
