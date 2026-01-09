import React from 'react'
import classnames from 'classnames'
import type { ModalHeaderBarProps } from '../../modal/parts/ModalHeaderBar'
import ModalHeaderBar from '../../modal/parts/ModalHeaderBar'

export default function DialogNavigation({
  className,
  ref, //eslint-disable-line
  ...props
}: ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>) {
  return (
    <ModalHeaderBar
      {...props}
      className={classnames('dnb-dialog__navigation', className)}
    />
  )
}
