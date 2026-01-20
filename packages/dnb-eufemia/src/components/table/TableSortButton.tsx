import React from 'react'
import clsx from 'clsx'
import Button from '../button/Button'

export default function TableSortButton({ className = null, ...props }) {
  return (
    <Button
      className={clsx('dnb-table__sort-button', className)}
      variant="tertiary"
      icon="arrow-down"
      wrap
      {...props}
    />
  )
}
