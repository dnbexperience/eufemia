import React from 'react'
import classnames from 'classnames'

export type TableTdProps = {
  /**
   * if set to `true`, no padding will be added
   * Default: false
   */
  noSpacing?: boolean

  /**
   * The content of the component.
   * Default: null
   */
  children?: React.ReactNode
}

export default function Td(
  componentProps: TableTdProps &
    React.TdHTMLAttributes<HTMLTableCellElement>
) {
  const { className, children, noSpacing, ...props } = componentProps

  return (
    <td
      role="cell"
      className={classnames(
        'dnb-table__td',
        noSpacing && 'dnb-table__td--no-spacing',
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}
