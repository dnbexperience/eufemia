import classnames from 'classnames'
import { ListVariant } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import React, { useCallback } from 'react'
import IconPrimary from '../IconPrimary'
import Anchor from '../Anchor'

export type ItemNavigateIconPosition = 'left' | 'right'

export type ItemNavigateProps = {
  variant?: ListVariant
  selected?: boolean
  iconPosition?: ItemNavigateIconPosition
  href?: string
  target?: string
  rel?: string
} & ItemContentProps

function ItemNavigate(props: ItemNavigateProps) {
  const {
    className,
    onClick,
    children,
    variant,
    selected,
    pending,
    iconPosition = 'right',
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

  const navigateClassName = classnames(
    'dnb-list__item__navigate',
    iconPosition === 'left' && 'dnb-list__item--icon-left',
    href && 'dnb-list__item__navigate--href',
    className
  )

  const content = (
    <>
      {iconPosition === 'left' && <ChevronIcon />}
      {children}
      {iconPosition === 'right' && <ChevronIcon />}
    </>
  )

  if (href) {
    return (
      <ItemContent
        className={navigateClassName}
        pending={pending}
        {...rest}
      >
        <Anchor
          noStyle
          href={href}
          target={target}
          rel={rel}
          aria-disabled={pending ? true : undefined}
          tabIndex={pending ? -1 : undefined}
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
    <IconPrimary
      className="dnb-list__item__chevron"
      icon="chevron_right"
    />
  )
}
// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
ChevronIcon._supportsSpacingProps = true
