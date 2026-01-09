import React from 'react'
import classnames from 'classnames'
import type { ModalHeaderBarProps } from '../../modal/parts/ModalHeaderBar'
import ModalHeaderBar from '../../modal/parts/ModalHeaderBar'
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
      className={classnames('dnb-drawer__navigation', className)}
      shadow_class="dnb-drawer__navigation--sticky"
    />
  )
}
