import React from 'react'
import clsx from 'clsx'
import type { ModalInnerProps } from '../../modal/parts/ModalInner'
import ModalInner from '../../modal/parts/ModalInner'
import type { SectionBackgroundColor } from '../../Section'

type DrawerBodyProps = {
  /**
   * Give the inner content wrapper a class name (maps to `dnb-drawer__body`).
   */
  className?: string

  /**
   * Background color of the drawer body.
   */
  backgroundColor?: SectionBackgroundColor
} & ModalInnerProps

export default function DrawerBody({
  className,
  backgroundColor,
  ref,
  ...props
}: DrawerBodyProps & React.HTMLProps<HTMLElement>) {
  return (
    <ModalInner
      {...props}
      backgroundColor={backgroundColor}
      className={clsx('dnb-drawer__body', className)}
    />
  )
}
