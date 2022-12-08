import React from 'react'
import classnames from 'classnames'
import TableSortButton from './TableSortButton'
import TableHelpButton from './TableHelpButton'

export type TableThChildren =
  | React.ReactNode
  | ReturnType<typeof TableSortButton>
  | ReturnType<typeof TableHelpButton>

export type TableThProps = {
  /**
   * Defines the table header as sortable (ascending)
   * Default: false
   */
  sortable?: boolean

  /**
   * Defines the sortable column as the current active (ascending)
   * Default: false
   */
  active?: boolean

  /**
   * Defines the sortable column as in reversed order (descending)
   * Default: false
   */
  reversed?: boolean

  /**
   * If set to true, the header text will not wrap to new lines
   * Default: false
   */
  noWrap?: boolean

  /**
   * The content of the table header given as Tr.
   */
  children?: TableThChildren | Array<TableThChildren>
}

export default function Th(
  componentProps: TableThProps &
    React.ThHTMLAttributes<HTMLTableCellElement>
) {
  const {
    className,
    children,
    sortable,
    active,
    reversed,
    noWrap,
    ...props
  } = componentProps

  const role = props.scope === 'row' ? 'rowheader' : 'columnheader'
  const scope = props.scope === 'row' ? 'row' : 'col'
  const ariaSort = sortable
    ? reversed
      ? 'descending'
      : 'ascending'
    : undefined

  return (
    <th
      role={role}
      scope={scope}
      aria-sort={ariaSort}
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

function Horizontal({
  className = null,
  ...rest
}: React.ThHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={classnames('dnb-table__th__horizontal', className)}
    />
  )
}

Th.SortButton = TableSortButton
Th.HelpButton = TableHelpButton
Th.Horizontal = Horizontal
