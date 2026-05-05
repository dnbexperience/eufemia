import { useContext } from 'react'
import type { HTMLProps } from 'react'
import clsx from 'clsx'
import type { ModalHeaderBarProps } from '../../modal/parts/ModalHeaderBar'
import ModalHeaderBar from '../../modal/parts/ModalHeaderBar'
import { DrawerContentContext } from './DrawerContentContext'

export default function DrawerNavigation({
  className,
  ref,
  ...props
}: ModalHeaderBarProps & Omit<HTMLProps<HTMLElement>, 'children'>) {
  const contentContext = useContext(DrawerContentContext)
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
