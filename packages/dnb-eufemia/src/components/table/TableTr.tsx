import React from 'react'
import classnames from 'classnames'

type TableTrProps = {
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
} & React.TableHTMLAttributes<HTMLTableRowElement>

export const defaultProps = {}

const Tr = (componentProps: TableTrProps) => {
  const {
    className,
    children,

    ...props
  } = componentProps

  return (
    <tr className={classnames('dnb-tr', className)} {...props}>
      {children}
    </tr>
  )
}

export default Tr
