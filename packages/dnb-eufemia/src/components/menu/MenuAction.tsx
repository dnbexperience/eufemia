import { useCallback, useRef } from 'react'
import type { KeyboardEvent, MouseEvent, Ref } from 'react'
import clsx from 'clsx'
import IconPrimary from '../IconPrimary'
import Anchor from '../Anchor'
import { useMenuTriggerContext } from './MenuContext'
import useMenuItemRegistration from './useMenuItemRegistration'
import MenuItemContent from './MenuItemContent'
import type { MenuActionProps } from './types'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import useCombinedRef from '../../shared/helpers/useCombinedRef'

function MenuAction(props: MenuActionProps) {
  const {
    id,
    className,
    children,
    icon,
    text,
    onClick,
    href,
    to,
    element,
    target,
    rel,
    disabled = false,
    hasSubMenu: hasSubMenuProp = false,
    onKeyDown: externalOnKeyDown,
    ref: externalRef,
    ...rest
  } = props as MenuActionProps & { ref?: Ref<HTMLLIElement> }

  const triggerContext = useMenuTriggerContext()

  // Auto-detect sub-menu trigger from context
  const hasSubMenu = triggerContext ? true : hasSubMenuProp
  const isSubMenuOpen = triggerContext?.active ?? false

  // Extract trigger props for Popover integration
  const triggerProps = triggerContext?.triggerProps
  const triggerRef = triggerProps?.ref as Ref<HTMLLIElement> | undefined
  const triggerOnKeyDown = triggerProps?.onKeyDown as
    | ((e: KeyboardEvent<HTMLElement>) => void)
    | undefined
  const triggerOnClick = triggerProps?.onClick as
    | ((e: MouseEvent<HTMLElement>) => void)
    | undefined

  // Pick only ARIA attributes from trigger props — skip DOM props like
  // className, role, tabIndex, title that would override the <li> semantics
  const triggerAriaProps: Record<string, unknown> = {}
  if (triggerProps) {
    for (const [key, value] of Object.entries(triggerProps)) {
      if (key === 'aria-controls' || key === 'aria-expanded') {
        triggerAriaProps[key] = value
      }
    }
  }

  const itemRef = useRef<HTMLLIElement>(null)
  const combinedRef = useCombinedRef(itemRef, externalRef, triggerRef)
  const anchorRef = useRef<HTMLAnchorElement>(null)

  const { isActive, context } = useMenuItemRegistration(itemRef)

  const handleClick = useCallback(
    (event: MouseEvent<HTMLLIElement>) => {
      if (disabled) {
        event.preventDefault()
        return // stop here
      }

      // Sub-menu trigger: let Popover's click handler toggle it
      triggerOnClick?.(event as unknown as MouseEvent<HTMLElement>)

      onClick?.(event)

      // Close all menus after action unless this opens a sub-menu
      if (!hasSubMenu) {
        context?.closeAll()
      }
    },
    [disabled, onClick, hasSubMenu, context, triggerOnClick]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLLIElement>) => {
      if (disabled) {
        return // stop here
      }

      // Sub-menu trigger: delegate Enter/Space/ArrowRight to open the sub-menu
      // Do not preventDefault here — let Popover's handler manage open/close
      if (
        hasSubMenu &&
        (event.key === 'Enter' ||
          event.key === ' ' ||
          event.key === 'ArrowRight')
      ) {
        event.stopPropagation()
        const keyDownHandler = triggerOnKeyDown || externalOnKeyDown
        keyDownHandler?.(event)
        return // stop here
      }

      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()

        if ((href || to) && anchorRef.current) {
          anchorRef.current.click()
        } else {
          onClick?.(event as unknown as MouseEvent<HTMLLIElement>)
        }

        context?.closeAll()
      }

      // ArrowLeft closes current sub-menu level only
      if (event.key === 'ArrowLeft' && context && context.level > 0) {
        event.preventDefault()
        event.stopPropagation()
        if (context.closeSelf) {
          context.closeSelf()
        } else {
          context.closeAll()
        }
      }
    },
    [
      disabled,
      href,
      to,
      onClick,
      hasSubMenu,
      context,
      triggerOnKeyDown,
      externalOnKeyDown,
    ]
  )

  const content = (
    <>
      <MenuItemContent icon={icon} text={text}>
        {children}
      </MenuItemContent>
      {hasSubMenu && (
        <span className="dnb-menu__action__submenu-indicator">
          <IconPrimary icon="chevron_right" />
        </span>
      )}
    </>
  )

  const hasLink = Boolean(href || to)

  const actionClassName = clsx(
    'dnb-menu__action',
    disabled && 'dnb-menu__action--disabled',
    isSubMenuOpen && 'dnb-menu__action--active-trigger',
    hasLink && 'dnb-menu__action--link',
    hasSubMenu && 'dnb-menu__action--has-submenu',
    className
  )

  return (
    <li
      id={id}
      ref={combinedRef}
      role="menuitem"
      className={actionClassName}
      tabIndex={isActive ? 0 : -1}
      aria-disabled={disabled || undefined}
      aria-haspopup={hasSubMenu ? 'menu' : undefined}
      {...rest}
      {...triggerAriaProps}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {hasLink ? (
        <Anchor
          noStyle
          ref={anchorRef}
          href={disabled ? undefined : href}
          to={disabled ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          tabIndex={-1}
          aria-disabled={disabled || undefined}
          className="dnb-menu__action__link"
        >
          {content}
        </Anchor>
      ) : (
        content
      )}
    </li>
  )
}

withComponentMarkers(MenuAction, { _supportsSpacingProps: true })

export default MenuAction
