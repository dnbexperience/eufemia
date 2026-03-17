import React from 'react'
import clsx from 'clsx'
import type { ModalHeaderProps } from '../../modal/parts/ModalHeader'
import ModalHeader from '../../modal/parts/ModalHeader'
import { DrawerContentContext } from './DrawerContentContext'

type DrawerHeaderProps = {
  titleClass?: string
} & ModalHeaderProps

export default function DrawerHeader({
  className,
  titleClass,
  size = 'x-large',
  ref,
  ...props
}: DrawerHeaderProps &
  Omit<React.HTMLProps<HTMLElement>, 'size' | 'children'>) {
  const contentContext = React.useContext(DrawerContentContext)
  if (contentContext?.headerElement) {
    return null
  }
  return (
    <ModalHeader
      {...props}
      size={size}
      className={clsx('dnb-drawer__header', className)}
      titleClass={clsx('dnb-drawer__title', titleClass)}
    />
  )
}
