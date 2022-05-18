import React from 'react'
import classnames from 'classnames'

type TableThProps = {
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
} & React.ThHTMLAttributes<HTMLTableCellElement>

export const defaultProps = {}

const Th = (componentProps: TableThProps) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <th className={classnames('dnb-th', className)} {...props}>
      {children}
    </th>
  )
}

export default Th
