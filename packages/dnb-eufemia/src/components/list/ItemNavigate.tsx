import classnames from 'classnames'
import { ListVariant } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import React, { useCallback } from 'react'
import IconPrimary from '../IconPrimary'

export type ItemNavigateIconPosition = 'left' | 'right'

export type ItemNavigateProps = {
  variant?: ListVariant
  selected?: boolean
  iconPosition?: ItemNavigateIconPosition
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
    ...rest
  } = props

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!pending) {
        onClick && onClick(event)
      }
    },
    [onClick, pending]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(
          event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>
        )
      }
    },
    [handleClick]
  )

  return (
    <ItemContent
      className={classnames(
        'dnb-list__item__navigate',
        iconPosition === 'left' && 'dnb-list__item__navigate--icon-left',
        className
      )}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      pending={pending}
      {...rest}
    >
      {iconPosition === 'left' && <ChevronIcon iconPosition="left" />}
      {children}
      {iconPosition === 'right' && <ChevronIcon iconPosition="right" />}
    </ItemContent>
  )
}
ItemNavigate._supportsSpacingProps = true

export default ItemNavigate

export function ChevronIcon({
  iconPosition,
}: {
  iconPosition: ItemNavigateIconPosition
}) {
  return (
    <IconPrimary
      className="dnb-list__item__chevron"
      icon="chevron_right"
      right={iconPosition === 'right'}
      left={iconPosition === 'left'}
    />
  )
}
// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
ChevronIcon._supportsSpacingProps = true
