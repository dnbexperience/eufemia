import React from 'react'
import classnames from 'classnames'
import { TableTdProps } from './TableTd'

export type TableTrProps = {
  /**
   * The content of the component.
   */
  children:
    | React.ReactElement<TableTdProps>
    | Array<React.ReactElement<TableTdProps>>

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const Tr = (
  componentProps: TableTrProps &
    React.TableHTMLAttributes<HTMLTableRowElement>
) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <tr className={classnames('dnb-table__tr', className)} {...props}>
      {children}
    </tr>
  )
}

export default Tr
