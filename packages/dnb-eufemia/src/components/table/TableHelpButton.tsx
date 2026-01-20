import React from 'react'
import clsx from 'clsx'
import HelpButton from '../help-button/HelpButton'

export default function TableHelpButton({ className = null, ...props }) {
  return (
    <HelpButton
      className={clsx('dnb-table__help-button', className)}
      size="small"
      {...props}
    />
  )
}
