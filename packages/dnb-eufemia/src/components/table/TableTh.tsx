import React from 'react'
import classnames from 'classnames'
import { convertJsxToString } from '../../shared/component-helper'
import TableContext from './TableContext'
import useMediaQuery from '../../shared/useMediaQuery'

export type TableThProps = {
  /**
   * The content of the table header given as Tr.
   */
  children: React.ReactNode

  /**
   * Custom className on the component root
   * Default: null
   */
  className?: string
}

const Th = (
  componentProps: TableThProps &
    React.ThHTMLAttributes<HTMLTableCellElement>
) => {
  const {
    className,
    children,

    ...props
  } = componentProps
  const tableContext = React.useContext(TableContext)

  const isSmallScreen = useMediaQuery({
    disabled: !tableContext?.responsive,
    matchOnSSR: false,
    when: [{ max: 'small' }],
  })

  const hideTh = tableContext?.responsive && isSmallScreen

  return (
    <th
      role="columnheader"
      className={classnames(
        'dnb-table__th',
        hideTh && 'dnb-sr-only',
        className
      )}
      {...props}
    >
      {hideTh ? convertJsxToString(children) : children}
    </th>
  )
}

export default Th
