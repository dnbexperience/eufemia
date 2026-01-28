import * as React from 'react'
import classnames from 'classnames'

export type ListItemProps = {
  className?: string
  children?: React.ReactNode
}

function Item(props: ListItemProps) {
  const { className, children, ...rest } = props

  return (
    <div className={classnames('dnb-list__item', className)} {...rest}>
      {children}
    </div>
  )
}

export default Item
