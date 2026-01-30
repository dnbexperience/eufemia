import React from 'react'
import clsx from 'clsx'
import ModalHeaderBar, {
  ModalHeaderBarProps,
} from '../../modal/parts/ModalHeaderBar'
import { DrawerContentContext } from './DrawerContentContext'

export default function DrawerNavigation({
  className,
  ref, //eslint-disable-line
  ...props
}: ModalHeaderBarProps & Omit<React.HTMLProps<HTMLElement>, 'children'>) {
  const contentContext = React.useContext(DrawerContentContext)
  if (contentContext?.navigationElement) {
    return null
  }
  return (
    <ModalHeaderBar
      {...props}
      className={clsx('dnb-drawer__navigation', className)}
      shadowClass="dnb-drawer__navigation--sticky"
    />
  )
}
