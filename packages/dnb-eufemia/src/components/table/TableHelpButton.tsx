import React from 'react'
import classnames from 'classnames'
import HelpButton from '../help-button/HelpButton'

export default function TableHelpButton({ className = null, ...props }) {
  return (
    <HelpButton
      className={classnames('dnb-table__help-button', className)}
      size="small"
      {...props}
    />
  )
}
