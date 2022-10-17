import React from 'react'
import classnames from 'classnames'
import ModalHeader, {
  ModalHeaderProps,
} from '../../modal/parts/ModalHeader'
import { DrawerContentContext } from './DrawerContentContext'

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
  const contentContext = React.useContext(DrawerContentContext)
  if (contentContext?.headerElement) {
    return null
  }
  return (
    <ModalHeader
      {...props}
      size={size}
      className={classnames('dnb-drawer__header', className)}
      title_class={classnames('dnb-drawer__title', titleClass)}
    />
  )
}
