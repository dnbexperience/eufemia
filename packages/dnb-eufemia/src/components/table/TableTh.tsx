import { useContext, useState } from 'react'
import type { ReactNode, ThHTMLAttributes } from 'react'
import { clsx } from 'clsx'
import TableSortButton from './TableSortButton'
import TableHelpButton from './TableHelpButton'
import { TableTrContext } from './TableTrContext'
import { TableThContext } from './TableThContext'

export type TableThChildren =
  | ReactNode
  | ReturnType<typeof TableSortButton>
  | ReturnType<typeof TableHelpButton>

export type TableThProps = {
  /**
   * Defines the table header as sortable if set to `true`. Use it together with `Th.SortButton`.
   * Default: `false`
   */
  sortable?: boolean

  /**
   * Defines the sortable column as the currently sorted column. Shows the sort icon and sets `aria-sort`. The sort direction is ascending unless `reversed` is set.
   * Default: `false`
   */
  active?: boolean

  /**
   * Defines the sort direction of the active column as descending.
   * Default: `false`
   */
  reversed?: boolean

  /**
   * If set to `true`, the header text will not wrap to new lines.
   * Default: `false`
   */
  noWrap?: boolean

  /**
   * If set to `true`, the header cell and all `<Td>` cells in the same column receive a highlighted background. Also inherited from the parent `<Tr>` when it has `highlight`.
   * Default: `false`
   */
  highlight?: boolean

  /**
   * Defines the visual style of the table header. Use `subtle` for a lighter appearance with reduced font-weight, smaller font-size, and muted text color.
   * Default: `"emphasis"`
   */
  variant?: 'emphasis' | 'subtle'

  /**
   * The content of the component.
   */
  children?: TableThChildren | Array<TableThChildren>

  /**
   * Indicates that the column was previously sorted but returned to unsorted.
   * Set automatically by `useHandleSortState`.
   * @internal
   */
  sortedBefore?: boolean
}

export default function Th(
  componentProps: TableThProps & ThHTMLAttributes<HTMLTableCellElement>
) {
  const {
    className,
    children,
    sortable,
    active,
    reversed,
    noWrap,
    highlight: highlightProp,
    variant,
    sortedBefore,
    onMouseEnter,
    onMouseLeave,
    ...props
  } = componentProps

  const trContext = useContext(TableTrContext)
  const highlight = highlightProp || trContext?.highlight

  // Hides the sort preview icon after a click until the pointer leaves the header
  const [sortClicked, setSortClicked] = useState(false)

  const role =
    props.scope === 'row' || props.scope === 'rowgroup'
      ? 'rowheader'
      : 'columnheader'
  const scope = props.scope === 'row' ? 'row' : props.scope || 'col'
  const ariaSort =
    sortable && active
      ? reversed
        ? 'descending'
        : 'ascending'
      : undefined

  return (
    <th
      role={role}
      scope={scope}
      aria-sort={ariaSort}
      className={clsx(
        'dnb-table__th',
        sortable && 'dnb-table--sortable',
        active && 'dnb-table--active',
        reversed && 'dnb-table--reversed',
        (sortedBefore || sortClicked) && !active && 'dnb-table--sort-off',
        noWrap && 'dnb-table--no-wrap',
        highlight && 'dnb-table__th--highlight',
        variant && `dnb-table__th--${variant}`,
        className
      )}
      onMouseEnter={(event) => {
        setSortClicked(false)
        onMouseEnter?.(event)
      }}
      onMouseLeave={(event) => {
        setSortClicked(false)
        onMouseLeave?.(event)
      }}
      {...props}
    >
      <TableThContext
        value={{ reversed, onSortClick: () => setSortClicked(true) }}
      >
        {children}
      </TableThContext>
    </th>
  )
}

function Horizontal({
  className = null,
  ...rest
}: ThHTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...rest}
      className={clsx('dnb-table__th__horizontal', className)}
    />
  )
}

Th.SortButton = TableSortButton
Th.HelpButton = TableHelpButton
Th.Horizontal = Horizontal
