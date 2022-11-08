import React from 'react'
import classnames from 'classnames'

export type TableTdProps = {
  /**
   * The content of the component.
   * Default: null
   */
  children?: React.ReactNode
}

const Td = (
  componentProps: TableTdProps &
    React.TdHTMLAttributes<HTMLTableCellElement>
) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <td
      role="cell"
      className={classnames('dnb-table__td', className)}
      {...props}
    >
      {children}
    </td>
  )
}

export default Td
