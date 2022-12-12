import React from 'react'
import classnames from 'classnames'
import TableAccordionContent from './TableAccordionContent'

export type TableTdProps = {
  /**
   * if set to `true`, no padding will be added
   * Default: false
   */
  noSpacing?: boolean

  /**
   * Set to `horizontal` for padding on left and right side
   * Default: false
   */
  spacing?: 'horizontal'

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
  const { className, children, noSpacing, spacing, ...props } =
    componentProps

  return (
    <td
      role="cell"
      className={classnames(
        'dnb-table__td',
        noSpacing && 'dnb-table__td--no-spacing',
        spacing && `dnb-table__td--spacing-${spacing}`,
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

Td.AccordionContent = TableAccordionContent
