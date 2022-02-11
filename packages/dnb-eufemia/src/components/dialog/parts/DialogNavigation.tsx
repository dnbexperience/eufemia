import React from 'react'
import classnames from 'classnames'
import ModalHeaderBar, {
  ModalHeaderBarProps,
} from '../../modal/parts/ModalHeaderBar'

export default function DialogNavigation({
  className,
  ref, //eslint-disable-line
  ...props
}: ModalHeaderBarProps) {
  return (
    <ModalHeaderBar
      {...props}
      className={classnames('dnb-dialog__navigation', className)}
    />
  )
}
