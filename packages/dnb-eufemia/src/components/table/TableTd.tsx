import React from 'react'
import classnames from 'classnames'
import TableTdMainCell from './TableTdMainCell'

// POC: If we would use TableToggleButton inside second td
// import  { TableToggleButton } from './TableTdMainCell'

export type TableTdProps = {
  /**
   * The content of the component.
   * Default: null
   */
  children?: React.ReactNode

  info?: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const Td = (
  componentProps: TableTdProps &
    React.TdHTMLAttributes<HTMLTableCellElement>
) => {
  const {
    className,
    children,
    info,

    ...props
  } = componentProps

  return (
    <td
      role="cell"
      className={classnames('dnb-table__td', className)}
      {...props}
    >
      {/* POC: If we would use TableToggleButton inside second td */}
      {/* {showTableToggleButton && <TableToggleButton />} */}

      <div className="dnb-table__td__vertical">
        {/* Use CSS order to have info first in the DOM to enhance a11y */}
        {info && <span className="dnb-table__td__info dnb-p">{info}</span>}
        <div className="dnb-table__td__children">{children}</div>
      </div>
    </td>
  )
}

Td.MainCell = TableTdMainCell

export default Td
