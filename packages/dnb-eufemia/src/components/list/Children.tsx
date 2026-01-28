import * as React from 'react'
import classnames from 'classnames'

export type ListChildrenProps = {
  className?: string
  children?: React.ReactNode
}

function Children(props: ListChildrenProps) {
  const { className, children, ...rest } = props

  return (
    <div
      className={classnames('dnb-list', 'dnb-list__children', className)}
      {...rest}
    >
      {children}
    </div>
  )
}

export default Children
