import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'

interface DrawerHeaderProps extends ModalHeaderProps {
  titleClass?: string
}

export default function DrawerHeader({
  className,
  titleClass,
  size = 'x-large',
  ref, // eslint-disable-line
  ...props
}: DrawerHeaderProps & Omit<React.HTMLProps<HTMLElement>, 'size'>) {
  return (
    <ModalHeader
      {...props}
      size={size}
      className={classnames('dnb-drawer__header', className)}
      title_class={classnames('dnb-drawer__title', titleClass)}
    />
  )
}
