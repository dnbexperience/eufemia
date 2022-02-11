import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'

export default function DialogHeader({
  className,
  titleClass,
  size = 'large',
  ...props
}: ModalHeaderProps) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={classnames('dnb-dialog__header', className)}
      title_class={classnames('dnb-dialog__title', titleClass)}
    />
  )
}
