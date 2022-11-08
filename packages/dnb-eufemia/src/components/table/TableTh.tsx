import React from 'react'
import classnames from 'classnames'

export type TableThProps = {
  /**
   * The content of the table header given as Tr.
   */
  children: React.ReactNode

  /**
   * Defines the table header as sortable
   * Default: false
   */
  sortable?: boolean

  /**
   * Defines the sortable column as the current active
   * Default: false
   */
  active?: boolean

  /**
   * Defines the sortable column as in reversed order
   * Default: false
   */
  reversed?: boolean

  /**
   * If set to true, the header text will not wrap to new lines
   * Default: false
   */
  noWrap?: boolean
}

const Th = (
  componentProps: TableThProps &
    React.ThHTMLAttributes<HTMLTableCellElement>
) => {
  const {
    className,
    children,
    sortable,
    active,
    reversed,
    noWrap,
    ...props
  } = componentProps

  return (
    <th
      role="columnheader"
      className={classnames(
        'dnb-table__th',
        sortable && 'dnb-table--sortable',
        active && 'dnb-table--active',
        reversed && 'dnb-table--reversed',
        noWrap && 'dnb-table--no-wrap',
        className
      )}
      {...props}
    >
      {children}
    </th>
  )
}

export default Th
