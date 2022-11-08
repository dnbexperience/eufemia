import React from 'react'
import classnames from 'classnames'
import Button from '../button/Button'

export default function TableSortButton({ className = null, ...props }) {
  return (
    <Button
      className={classnames('dnb-table__sort-button', className)}
      variant="tertiary"
      icon="arrow-down"
      wrap
      {...props}
    />
  )
}
