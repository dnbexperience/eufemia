import React from 'react'
import clsx from 'clsx'
import { TableAccordionContentSingle } from './table-accordion/TableAccordionContent'

export type TableTdProps = {
  /**
   * if set to `true`, no padding will be added
   * Default: `false`
   */
  noSpacing?: boolean

  /**
   * Set to `horizontal` for padding on left and right side
   * Default: `undefined`
   */
  spacing?: 'horizontal'

  /**
   * Vertical alignment of the cell content.
   * Default: `undefined`
   */
  verticalAlign?: 'top' | 'middle' | 'bottom'

  /**
   * The content of the component.
   * Default: `null`
   */
  children?: React.ReactNode
}

export default function Td(
  componentProps: TableTdProps &
    React.TdHTMLAttributes<HTMLTableCellElement>
) {
  const {
    className,
    children,
    noSpacing,
    spacing,
    verticalAlign,
    ...props
  } = componentProps

  return (
    <td
      // eslint-disable-next-line jsx-a11y/no-interactive-element-to-noninteractive-role
      role="cell"
      className={clsx(
        'dnb-table__td',
        noSpacing && 'dnb-table__td--no-spacing',
        spacing && `dnb-table__td--spacing-${spacing}`,
        verticalAlign && `dnb-table__td--vertical-align-${verticalAlign}`,
        className
      )}
      {...props}
    >
      {children}
    </td>
  )
}

Td.AccordionContent = TableAccordionContentSingle
