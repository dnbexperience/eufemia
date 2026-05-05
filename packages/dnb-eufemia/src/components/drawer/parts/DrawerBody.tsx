import type { HTMLProps } from 'react'
import clsx from 'clsx'
import type { ModalInnerProps } from '../../modal/parts/ModalInner'
import ModalInner from '../../modal/parts/ModalInner'

type DrawerBodyProps = {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-drawer__body`).
   */
  className?: string
} & ModalInnerProps

export default function DrawerBody({
  className,
  ref,
  ...props
}: DrawerBodyProps & HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      className={clsx('dnb-drawer__body', className)}
    />
  )
}
