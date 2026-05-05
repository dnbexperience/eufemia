import clsx from 'clsx'
import type { MenuDividerProps } from './types'

export default function MenuDivider(props: MenuDividerProps) {
  const { className } = props

  return (
    <li
      role="separator"
      className={clsx('dnb-menu__divider', className)}
    />
  )
}
