import clsx from 'clsx'
import type { ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { ItemContentProps } from './ItemContent'
import ItemContent from './ItemContent'
import { useCallback, useContext, useRef } from 'react'
import type {
  ComponentPropsWithoutRef,
  ElementType,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'
import IconPrimary from '../IconPrimary'
import Anchor from '../Anchor'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'
import FlexItem from '../flex/Item'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type ItemActionIconPosition = 'left' | 'right'

export type ItemActionProps<E extends ElementType = 'a'> = {
  id?: string
  variant?: ListVariant
  selected?: boolean
  disabled?: boolean
  chevronPosition?: ItemActionIconPosition
  icon?: IconIcon
  title?: ReactNode
  href?: string
  to?: string
  element?: E
  elementProps?: Omit<
    ComponentPropsWithoutRef<E>,
    | 'href'
    | 'to'
    | 'target'
    | 'rel'
    | 'children'
    | 'tabIndex'
    | 'aria-disabled'
  >
  target?: string
  rel?: string
} & Omit<ItemContentProps, 'title' | 'element'>

function ItemAction<E extends ElementType = 'a'>(
  props: ItemActionProps<E>
) {
  const {
    className,
    onClick,
    children,
    variant,
    selected,
    pending,
    disabled,
    skeleton,
    chevronPosition = 'right',
    icon,
    title,
    href,
    to,
    element,
    elementProps,
    target,
    rel,
    role: _role,
    ...rest
  } = props

  const inheritedDisabled = useContext(ListContext)?.disabled
  const appliedDisabled = disabled ?? inheritedDisabled
  const isInactive = pending || appliedDisabled

  const handleClick = useCallback(
    (
      event: ReactMouseEvent<
        HTMLDivElement | HTMLAnchorElement,
        MouseEvent
      >
    ) => {
      if (!isInactive) {
        onClick && onClick(event as ReactMouseEvent<HTMLDivElement>)
      }
    },
    [onClick, isInactive]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement | HTMLAnchorElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(
          event as unknown as ReactMouseEvent<
            HTMLDivElement | HTMLAnchorElement,
            MouseEvent
          >
        )
      }
    },
    [handleClick]
  )

  const anchorRef = useRef<HTMLAnchorElement>(null)

  const handleLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      if (!isInactive) {
        onClick?.(event as ReactMouseEvent<HTMLDivElement>)
      }
    },
    [onClick, isInactive]
  )

  const handleLinkKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === ' ') {
        event.preventDefault()
        if (!isInactive) {
          anchorRef.current?.click()
        }
      }
    },
    [isInactive]
  )

  const actionClassName = clsx(
    'dnb-list__item__action',
    chevronPosition === 'left' && 'dnb-list__item--chevron-left',
    (href || to) && 'dnb-list__item__action--href',
    className
  )

  const content = (
    <>
      {chevronPosition === 'left' && <ChevronIcon />}
      {icon !== undefined && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
      {chevronPosition === 'right' && <ChevronIcon />}
    </>
  )

  if (href || to) {
    return (
      <ItemContent
        className={actionClassName}
        onClick={handleLinkClick}
        onKeyDown={handleLinkKeyDown}
        variant={variant}
        selected={selected}
        skeleton={skeleton}
        pending={pending}
        disabled={appliedDisabled}
        {...rest}
      >
        <Anchor
          noStyle
          ref={anchorRef}
          {...(href != null
            ? { href: isInactive ? undefined : href }
            : {})}
          to={isInactive ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          tabIndex={isInactive ? -1 : 0}
          aria-disabled={isInactive ? true : undefined}
          {...elementProps}
        >
          {content}
        </Anchor>
      </ItemContent>
    )
  }

  return (
    <ItemContent
      className={actionClassName}
      variant={variant}
      selected={selected}
      skeleton={skeleton}
      pending={pending}
      disabled={appliedDisabled}
      {...rest}
    >
      <FlexItem
        className="dnb-list__item__action__button"
        role="button"
        tabIndex={isInactive ? -1 : 0}
        aria-disabled={isInactive ? true : undefined}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      >
        {content}
      </FlexItem>
    </ItemContent>
  )
}
withComponentMarkers(ChevronIcon, { _supportsSpacingProps: true })

// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
withComponentMarkers(ItemAction, {
  _supportsSpacingProps: true,
})

export default ItemAction

export function ChevronIcon() {
  return (
    <div className="dnb-list__item__chevron">
      <IconPrimary icon="chevron_right" />
    </div>
  )
}
