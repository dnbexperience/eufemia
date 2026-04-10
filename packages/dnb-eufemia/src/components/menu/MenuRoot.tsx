import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import clsx from 'clsx'
import Popover from '../popover/Popover'
import {
  MenuContext,
  MenuTriggerContext,
  useMenuContext,
} from './MenuContext'
import type { MenuRootProps, MenuContextValue } from './types'
import type { PopoverTriggerRenderProps } from '../popover/types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import whatInput from '../../shared/helpers/whatInput'
import MenuButton from './MenuButton'
import MenuAction from './MenuAction'
import useIsomorphicLayoutEffect from '../../shared/helpers/useIsomorphicLayoutEffect'

export default function MenuRoot(props: MenuRootProps) {
  const {
    id,
    className,
    children,
    placement = 'bottom',
    arrowPosition = 'center',
    open,
    onOpenChange,
    skipPortal = false,
    noAnimation = false,
    autoAlignMode = 'initial',
  } = props

  // Scan children for trigger (Menu.Button or Menu.Action) and content
  let triggerChild: React.ReactElement | null = null
  const contentChildren: React.ReactNode[] = []

  React.Children.forEach(children, (child) => {
    if (
      !triggerChild &&
      React.isValidElement(child) &&
      (child.type === MenuButton || child.type === MenuAction)
    ) {
      triggerChild = child
    } else {
      contentChildren.push(child)
    }
  })

  const parentContext = useMenuContext()
  const level = parentContext ? parentContext.level + 1 : 0

  const activeIndexRef = useRef(-1)
  const [activeIndex, setActiveIndexState] = useState(-1)
  const itemRefsRef = useRef<Array<React.RefObject<HTMLElement>>>([])
  const nextIndexRef = useRef(0)
  const menuRef = useRef<HTMLUListElement>(null)

  const [isOpenInternal, setIsOpenInternal] = useState(false)
  const isControlled = typeof open === 'boolean'
  const isOpen = isControlled ? open : isOpenInternal

  // Holds Popover's close function so closeAll can use it for focus restore
  const popoverCloseRef = useRef<(() => void) | null>(null)

  const setOpenState = useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setIsOpenInternal(next)
      }
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange]
  )

  const closeAll = useCallback(() => {
    // Use Popover's close which handles both state + focus restore to trigger
    if (popoverCloseRef.current) {
      popoverCloseRef.current()
    } else {
      setOpenState(false)
    }
    parentContext?.closeAll()
  }, [setOpenState, parentContext])

  // Close only this level (e.g. ArrowLeft in sub-menu)
  const closeSelf = useCallback(() => {
    if (popoverCloseRef.current) {
      popoverCloseRef.current()
    } else {
      setOpenState(false)
    }
  }, [setOpenState])

  const setActiveIndex = useCallback((index: number) => {
    activeIndexRef.current = index
    setActiveIndexState(index)
  }, [])

  const registerItem = useCallback((ref: React.RefObject<HTMLElement>) => {
    const index = nextIndexRef.current
    nextIndexRef.current += 1
    itemRefsRef.current[index] = ref
    return index
  }, [])

  const unregisterItem = useCallback((index: number) => {
    itemRefsRef.current[index] =
      undefined as unknown as React.RefObject<HTMLElement>
  }, [])

  const contextValue: MenuContextValue = useMemo(
    () => ({
      level,
      closeAll,
      closeSelf,
      activeIndex,
      setActiveIndex,
      registerItem,
      unregisterItem,
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
      registerItem,
      unregisterItem,
      isOpen,
    ]
  )

  // Reset item registration on each render cycle so indices stay correct
  useEffect(() => {
    if (!isOpen) {
      nextIndexRef.current = 0
      itemRefsRef.current = []
      setActiveIndex(-1)
    }
  }, [isOpen, setActiveIndex])

  // Register arrow/nav keys with whatInput so they count as "keyboard" input.
  // This lets the focus ring show during arrow navigation, even when the menu
  // was opened by mouse click. Uses useLayoutEffect to ensure specificKeys is
  // set before the browser paints, preventing a race on re-open.
  useIsomorphicLayoutEffect(() => {
    if (isOpen) {
      // Tab, Left/Up/Right/Down, PageUp/PageDown, End/Home.
      whatInput.specificKeys([9, 37, 38, 39, 40, 33, 34, 35, 36])
    }

    return () => {
      whatInput.specificKeys([9])
    }
  }, [isOpen])

  // Focus the <ul> when the menu opens — it's always in the DOM before items
  const focusOnOpenElement = useCallback(() => {
    return menuRef.current ?? null
  }, [])

  // For nested menus: after Popover finishes its focus sequence,
  // move focus from the <ul> to the first action item.
  const handleFocusComplete = useCallback(() => {
    if (level === 0) {
      return // stop here
    }

    const firstRef = itemRefsRef.current[0]
    if (firstRef?.current) {
      firstRef.current.focus()
      setActiveIndex(0)
    }
  }, [level, setActiveIndex])

  const handleOpenChange = useCallback(
    (next: boolean) => {
      setOpenState(next)
    },
    [setOpenState]
  )

  // Handle ArrowDown/ArrowUp/ArrowRight on trigger to open menu or move focus into it.
  // ArrowRight is used by nested menus (sub-menu trigger items).
  const handleTriggerKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLElement>) => {
      if (
        event.key === 'ArrowDown' ||
        event.key === 'ArrowUp' ||
        event.key === 'ArrowRight'
      ) {
        event.preventDefault()
        if (!isOpen) {
          handleOpenChange(true)
        }

        // Focus the first menu item — use rAF to wait for render + Popover focus
        requestAnimationFrame(() => {
          const firstRef = itemRefsRef.current[0]
          if (firstRef?.current) {
            firstRef.current.focus()
            setActiveIndex(0)
          }
        })
      }
    },
    [isOpen, handleOpenChange, setActiveIndex]
  )

  // Build the trigger for Popover from Menu.Button or Menu.Action child
  const resolvedTrigger = triggerChild
    ? (renderProps: PopoverTriggerRenderProps) => {
        // Spread only copies enumerable props (ref, aria-*, onKeyDown).
        // Non-enumerable active/open/close/toggle are excluded from spread.
        const domProps = { ...renderProps }
        const {
          active,
          open: openFn,
          close: closeFn,
          toggle: toggleFn,
        } = renderProps

        return (
          <MenuTriggerContext.Provider
            value={{
              active,
              triggerProps: domProps,
              open: openFn,
              close: closeFn,
              toggle: toggleFn,
            }}
          >
            {triggerChild}
          </MenuTriggerContext.Provider>
        )
      }
    : undefined

  return (
    <Popover
      id={id}
      className={clsx('dnb-menu', className)}
      trigger={resolvedTrigger}
      triggerAttributes={{
        'aria-haspopup': 'menu',
        onKeyDown: handleTriggerKeyDown,
      }}
      placement={placement}
      open={isOpen}
      onOpenChange={handleOpenChange}
      skipPortal={level > 0 ? true : skipPortal}
      autoAlignMode={autoAlignMode}
      arrowPosition={arrowPosition}
      noAnimation={noAnimation}
      hideCloseButton
      noInnerSpace
      focusOnOpenElement={focusOnOpenElement}
      onFocusComplete={handleFocusComplete}
      contentClassName="dnb-menu__popover-content"
    >
      {({ close }) => {
        popoverCloseRef.current = close
        return (
          <MenuContext.Provider value={contextValue}>
            {contentChildren}
          </MenuContext.Provider>
        )
      }}
    </Popover>
  )
}

withComponentMarkers(MenuRoot, { _supportsSpacingProps: true })
