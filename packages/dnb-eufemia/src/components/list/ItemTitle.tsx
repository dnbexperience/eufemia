import React from 'react'
import classnames from 'classnames'
import FlexItem from '../flex/Item'
import { ItemContentProps } from './ItemContent'

export type ItemTitleProps = {
  subtitle?: React.ReactNode
} & ItemContentProps

function ItemTitle({
  className,
  children,
  subtitle,
  ...rest
}: ItemTitleProps) {
  return (
    <FlexItem
      innerSpace={{ left: 'small' }}
      className={classnames(
        'dnb-list__item__title',
        subtitle && 'dnb-list__item__title--has-subtitle',
        className
      )}
      {...rest}
    >
      <span className="dnb-t__size--basis">{children}</span>
      {subtitle && (
        <span className="dnb-list__item__subtitle dnb-t__size--small">
          {subtitle}
        </span>
      )}
    </FlexItem>
  )
}
ItemTitle._supportsSpacingProps = true

export default ItemTitle
