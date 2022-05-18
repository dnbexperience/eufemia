import React from 'react'
import classnames from 'classnames'

type TableTdProps = {
  /**
   * The content of the component.
   * Default: null
   */
  children?: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
} & React.TdHTMLAttributes<HTMLTableCellElement>

export const defaultProps = {}

const Td = (componentProps: TableTdProps) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <td className={classnames('dnb-td', className)} {...props}>
      {children}
    </td>
  )
}

export default Td
