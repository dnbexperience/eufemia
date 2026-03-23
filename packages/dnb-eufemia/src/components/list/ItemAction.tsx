import classnames from 'classnames'
import { ListVariant, ListContext } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import React, { useCallback, useContext, useRef } from 'react'
import IconPrimary from '../IconPrimary'
import Anchor from '../Anchor'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'

export type ItemActionIconPosition = 'left' | 'right'

export type ItemActionProps = {
  variant?: ListVariant
  selected?: boolean
  disabled?: boolean
  chevronPosition?: ItemActionIconPosition
  icon?: IconIcon
  title?: React.ReactNode
  href?: string
  target?: string
  rel?: string
} & Omit<ItemContentProps, 'title'>

function ItemAction(props: ItemActionProps) {
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
    target,
    rel,
    ...rest
  } = props

  const inheritedDisabled = useContext(ListContext)?.disabled
  const appliedDisabled = disabled ?? inheritedDisabled
  const isInactive = pending || appliedDisabled

  const handleClick = useCallback(
    (
      event: React.MouseEvent<
        HTMLDivElement | HTMLAnchorElement,
        MouseEvent
      >
    ) => {
      if (!isInactive) {
        onClick && onClick(event as React.MouseEvent<HTMLDivElement>)
      }
    },
    [onClick, isInactive]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement | HTMLAnchorElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(
          event as unknown as React.MouseEvent<
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
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (!isInactive) {
        onClick?.(event)
      }
    },
    [onClick, isInactive]
  )

  const handleLinkKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (!isInactive) {
          anchorRef.current?.click()
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }
    },
    [onClick, isInactive]
  )

  const actionClassName = classnames(
    'dnb-list__item__action',
    chevronPosition === 'left' && 'dnb-list__item--chevron-left',
    href && 'dnb-list__item__action--href',
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

  if (href) {
    return (
      <ItemContent
        className={actionClassName}
        role="link"
        tabIndex={isInactive ? -1 : 0}
        aria-disabled={isInactive ? true : undefined}
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
          href={isInactive ? undefined : href}
          target={target}
          rel={rel}
          tabIndex={-1}
          aria-disabled={isInactive ? true : undefined}
        >
          {content}
        </Anchor>
      </ItemContent>
    )
  }

  return (
    <ItemContent
      className={actionClassName}
      role="button"
      tabIndex={isInactive ? -1 : 0}
      aria-disabled={isInactive ? true : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      variant={variant}
      selected={selected}
      skeleton={skeleton}
      pending={pending}
      disabled={appliedDisabled}
      {...rest}
    >
      {content}
    </ItemContent>
  )
}
ItemAction._supportsSpacingProps = true

export default ItemAction

export function ChevronIcon() {
  return (
    <div className="dnb-list__item__chevron">
      <IconPrimary icon="chevron_right" />
    </div>
  )
}

// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
ChevronIcon._supportsSpacingProps = true
