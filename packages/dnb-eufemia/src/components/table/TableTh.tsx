import React from 'react'
import classnames from 'classnames'

export type TableThProps = {
  /**
   * The content of the table header given as Tr.
   */
  children: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const Th = (
  componentProps: TableThProps &
    React.ThHTMLAttributes<HTMLTableCellElement>
) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <th
      role="columnheader"
      className={classnames(
        'dnb-table__th',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export default Th
