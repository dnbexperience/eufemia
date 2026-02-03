import classnames from 'classnames'
import { ListVariant } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import React, { useCallback, useRef } from 'react'
import IconPrimary from '../IconPrimary'
import Anchor from '../Anchor'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'

export type ItemNavigateIconPosition = 'left' | 'right'

export type ItemNavigateProps = {
  variant?: ListVariant
  selected?: boolean
  iconPosition?: ItemNavigateIconPosition
  icon?: IconIcon
  title?: React.ReactNode
  href?: string
  target?: string
  rel?: string
} & Omit<ItemContentProps, 'title'>

function ItemNavigate(props: ItemNavigateProps) {
  const {
    className,
    onClick,
    children,
    variant,
    selected,
    pending,
    iconPosition = 'right',
    icon,
    title,
    href,
    target,
    rel,
    ...rest
  } = props

  const handleClick = useCallback(
    (
      event: React.MouseEvent<
        HTMLDivElement | HTMLAnchorElement,
        MouseEvent
      >
    ) => {
      if (!pending) {
        onClick && onClick(event as React.MouseEvent<HTMLDivElement>)
      }
    },
    [onClick, pending]
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

  const handleLinkKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        if (!pending) {
          anchorRef.current?.click()
          onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>)
        }
      }
    },
    [onClick, pending]
  )

  const navigateClassName = classnames(
    'dnb-list__item__navigate',
    iconPosition === 'left' && 'dnb-list__item--chevron-left',
    href && 'dnb-list__item__navigate--href',
    className
  )

  const content = (
    <>
      {iconPosition === 'left' && <ChevronIcon />}
      {icon !== undefined && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
      {iconPosition === 'right' && <ChevronIcon />}
    </>
  )

  if (href) {
    return (
      <ItemContent
        className={navigateClassName}
        role="link"
        tabIndex={pending ? -1 : 0}
        aria-disabled={pending ? true : undefined}
        onKeyDown={handleLinkKeyDown}
        pending={pending}
        {...rest}
      >
        <Anchor
          noStyle
          ref={anchorRef}
          href={href}
          target={target}
          rel={rel}
          tabIndex={-1}
        >
          {content}
        </Anchor>
      </ItemContent>
    )
  }

  return (
    <ItemContent
      className={navigateClassName}
      role="button"
      tabIndex={pending ? -1 : 0}
      aria-disabled={pending ? true : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      pending={pending}
      {...rest}
    >
      {content}
    </ItemContent>
  )
}
ItemNavigate._supportsSpacingProps = true

export default ItemNavigate

export function ChevronIcon() {
  return (
    <div className="dnb-list__item__chevron">
      <IconPrimary icon="chevron_right" />
    </div>
  )
}

// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
ChevronIcon._supportsSpacingProps = true
