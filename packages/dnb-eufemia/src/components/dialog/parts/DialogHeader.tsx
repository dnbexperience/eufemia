import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'

interface DialogHeaderProps extends ModalHeaderProps {
  titleClass?: string
}

export default function DialogHeader({
  className,
  titleClass,
  size = 'large',
  ref, // eslint-disable-line
  ...props
}: DialogHeaderProps & Omit<React.HTMLProps<HTMLElement>, 'size'>) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={classnames('dnb-dialog__header', className)}
      title_class={classnames('dnb-dialog__title', titleClass)}
    />
  )
}
